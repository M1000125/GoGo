import type { CarriedOrder, Coords, RouteStop } from "@/lib/types";
import {
  AVG_SPEED_KMH,
  BATCH_BONUS_PER_EXTRA,
  estimateKm,
  fuelCostMxn,
  maintenanceCostMxn,
} from "@/lib/simulation/economics";

// Penalty (km) for dropping an order before all pickups are done — biases toward
// consecutive pickups followed by consecutive dropoffs.
const CONSECUTIVE_PICKUP_PENALTY_KM = 0.8;

interface SolverNode {
  key: string;
  orderId: string;
  kind: "pickup" | "dropoff";
  coord: Coords;
  label: string;
  pickupKey: string | null; // dropoff whose pickup is still pending
  prepMinutes: number;
}

export interface RoutePlan {
  stops: RouteStop[];
  deadKm: number;
  totalKm: number;
  totalMinutes: number;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Solve the optimal stop ordering for up to `capacity` carried orders.
 * Respects precedence (pickup before dropoff per order) and walks a
 * Held-Karp-style DP over stop subsets (<= 16 stops), so cost is trivial.
 */
export function solveRoutePlan(
  carried: CarriedOrder[],
  startPos: Coords
): RoutePlan {
  const nodes: SolverNode[] = [];
  for (const co of carried) {
    if (!co.pickedUp) {
      nodes.push({
        key: `p-${co.order.id}`,
        orderId: co.order.id,
        kind: "pickup",
        coord: co.order.pickupCoords,
        label: co.order.pickupLabel,
        pickupKey: null,
        prepMinutes: co.order.prepMinutes,
      });
    }
    nodes.push({
      key: `d-${co.order.id}`,
      orderId: co.order.id,
      kind: "dropoff",
      coord: co.order.dropoffCoords,
      label: co.order.dropoffLabel,
      pickupKey: co.pickedUp ? null : `p-${co.order.id}`,
      prepMinutes: 0,
    });
  }

  const n = nodes.length;
  if (n === 0) return { stops: [], deadKm: 0, totalKm: 0, totalMinutes: 0 };
  if (n === 1) {
    const stop: RouteStop = {
      kind: nodes[0].kind,
      coord: nodes[0].coord,
      label: nodes[0].label,
      orderId: nodes[0].orderId,
      done: false,
    };
    return {
      stops: [stop],
      deadKm: round1(estimateKm(startPos, nodes[0].coord)),
      totalKm: round1(estimateKm(startPos, nodes[0].coord)),
      totalMinutes: Math.round(
        (estimateKm(startPos, nodes[0].coord) / AVG_SPEED_KMH) * 60 +
          nodes.reduce((s, x) => s + x.prepMinutes, 0)
      ),
    };
  }

  const keyToIdx = new Map(nodes.map((nd, i) => [nd.key, i]));
  const distStart = nodes.map((nd) => estimateKm(startPos, nd.coord));
  const dist: number[][] = nodes.map((a) =>
    nodes.map((b) => estimateKm(a.coord, b.coord))
  );

  const full = (1 << n) - 1;
  const INF = Infinity;
  const dp: number[][] = Array.from({ length: 1 << n }, () =>
    Array(n).fill(INF)
  );
  const parent = new Map<number, { mask: number; prev: number }>();

  const pickupComplete = (mask: number): boolean => {
    for (let i = 0; i < n; i++) {
      if (nodes[i].kind === "pickup" && !(mask & (1 << i))) return false;
    }
    return true;
  };

  const canVisit = (idx: number, mask: number): boolean => {
    const nd = nodes[idx];
    if (nd.kind === "pickup") return true;
    if (!nd.pickupKey) return true; // pickup already done before this solve
    const pickIdx = keyToIdx.get(nd.pickupKey)!;
    return (mask & (1 << pickIdx)) !== 0;
  };

  const dropPenalty = (idx: number, mask: number): number => {
    const nd = nodes[idx];
    if (nd.kind !== "dropoff") return 0;
    const m = mask | (1 << idx);
    if (pickupComplete(m)) return 0;
    return CONSECUTIVE_PICKUP_PENALTY_KM;
  };

  for (let i = 0; i < n; i++) {
    dp[1 << i][i] = distStart[i] + dropPenalty(i, 0);
  }

  for (let mask = 1; mask <= full; mask++) {
    for (let last = 0; last < n; last++) {
      const cur = dp[mask][last];
      if (cur === INF) continue;
      for (let next = 0; next < n; next++) {
        const bit = 1 << next;
        if (mask & bit) continue;
        if (!canVisit(next, mask)) continue;
        const nMask = mask | bit;
        const cost = cur + dist[last][next] + dropPenalty(next, mask);
        if (cost < dp[nMask][next]) {
          dp[nMask][next] = cost;
          parent.set(nMask * n + next, { mask, prev: last });
        }
      }
    }
  }

  // Find best full path
  let best = Infinity;
  let last = -1;
  for (let i = 0; i < n; i++) {
    if (dp[full][i] < best) {
      best = dp[full][i];
      last = i;
    }
  }

  const orderIdx: number[] = [];
  let mask = full;
  while (mask > 0) {
    orderIdx.unshift(last);
    const p = parent.get(mask * n + last);
    if (!p) break;
    mask = p.mask;
    last = p.prev;
  }

  const stops: RouteStop[] = orderIdx.map((i) => ({
    kind: nodes[i].kind,
    coord: nodes[i].coord,
    label: nodes[i].label,
    orderId: nodes[i].orderId,
    done: false,
  }));

  let totalKm = distStart[orderIdx[0]];
  for (let i = 1; i < orderIdx.length; i++) {
    totalKm += dist[orderIdx[i - 1]][orderIdx[i]];
  }
  totalKm = round1(totalKm);

  const prepMinutes = nodes.reduce((s, x) => s + x.prepMinutes, 0);
  const totalMinutes =
    Math.round((totalKm / AVG_SPEED_KMH) * 60) + prepMinutes;

  return {
    stops,
    deadKm: round1(distStart[orderIdx[0]]),
    totalKm,
    totalMinutes,
  };
}

export interface Efficiency {
  grossMxn: number;
  netMxn: number;
  totalKm: number;
  totalMinutes: number;
  netMxnMin: number;
  grossMxnMin: number;
  fuelMxn: number;
  maintenanceMxn: number;
  batchBonusMxn: number;
  expectedTipMxn: number;
  deadKm: number;
}

/** Net MXN-per-minute efficiency of the current carried load, given the vehicle capacity. */
export function planEfficiency(
  carried: CarriedOrder[],
  startPos: Coords,
  capacity: number
): Efficiency {
  const plan = solveRoutePlan(carried, startPos);
  const payout = carried.reduce((s, c) => s + c.order.payout, 0);
  const tip = carried.reduce((s, c) => s + c.order.tip, 0);
  const n = carried.length;
  const bonus = n >= 2 ? (n - 1) * BATCH_BONUS_PER_EXTRA : 0;
  const fuel = fuelCostMxn(plan.totalKm, capacity);
  const maint = maintenanceCostMxn(plan.totalKm);
  const gross = payout + tip + bonus;
  const net = gross - fuel - maint;
  const mins = plan.totalMinutes > 0 ? plan.totalMinutes : 1;

  return {
    grossMxn: round1(gross),
    netMxn: round1(net),
    totalKm: plan.totalKm,
    totalMinutes: plan.totalMinutes,
    netMxnMin: round1(net / mins),
    grossMxnMin: round1(gross / mins),
    fuelMxn: round1(fuel),
    maintenanceMxn: round1(maint),
    batchBonusMxn: bonus,
    expectedTipMxn: tip,
    deadKm: plan.deadKm,
  };
}