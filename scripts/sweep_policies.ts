/**
 * Headless 4-hour shift replay: greedy baseline vs smart burst ranking.
 *
 *   npx tsx scripts/sweep_policies.ts
 */
import mockOrdersData from "../data/mock_orders.json";
import { baselineDecide } from "../lib/agents/baselineAgent";
import {
  DEFAULT_SMART_KNOBS,
  decideSmartBurst,
  type SmartKnobs,
} from "../lib/agents/smartPolicy";
import { planEfficiency } from "../lib/routing/routeSolver";
import { RESTAURANT_MASS_CENTER } from "../lib/simulation/restaurantCentroid";
import {
  DEFAULT_CAPACITY,
  estimateKm,
  fuelCostMxn,
  maintenanceCostMxn,
  orderSlots,
  quotePayout,
} from "../lib/simulation/economics";
import { createInitialShiftState, SHIFT_DURATION_SECONDS } from "../lib/simulation/shiftEngine";
import type { AgentState, Order } from "../lib/types";

interface MockOrder {
  id: string;
  restaurant: { name: string; latitude: number; longitude: number };
  customer: { latitude: number; longitude: number };
  deliveryDistanceKm: number;
  orderTotal: number;
}

const pool = mockOrdersData as MockOrder[];

function toOrder(raw: MockOrder, index: number, tipSeed: number): Order {
  const orderSizeMxn = Math.round(raw.orderTotal);
  const estimatedKm = raw.deliveryDistanceKm;
  const estimatedMinutes = Math.max(2, Math.round((estimatedKm / 25) * 60));
  const payout = quotePayout(orderSizeMxn, estimatedKm);
  const tip = 8 + (tipSeed % 20);
  return {
    id: `${raw.id}-${index}`,
    pickupCoords: { lat: raw.restaurant.latitude, lng: raw.restaurant.longitude },
    dropoffCoords: { lat: raw.customer.latitude, lng: raw.customer.longitude },
    pickupLabel: raw.restaurant.name,
    dropoffLabel: `Cliente · ${estimatedKm.toFixed(1)} km`,
    payout,
    estimatedKm,
    estimatedMinutes,
    expiresAt: 0,
    isSurge: false,
    prepMinutes: tipSeed % 5,
    tip,
    orderSizeMxn,
    slots: orderSlots(orderSizeMxn),
  };
}

function goHomeIfIdle(agent: AgentState): void {
  if (agent.carriedOrders.length > 0) return;
  const km = estimateKm(agent.position, RESTAURANT_MASS_CENTER);
  if (km < 0.35) return;
  const fuel = fuelCostMxn(km, agent.capacity);
  const maint = maintenanceCostMxn(km);
  agent.kmDriven = Math.round((agent.kmDriven + km) * 10) / 10;
  agent.deadMilesKm = Math.round((agent.deadMilesKm + km) * 10) / 10;
  agent.netEarnings = Math.round((agent.netEarnings - fuel - maint) * 10) / 10;
  agent.expenses = {
    fuelLiters: agent.expenses.fuelLiters,
    fuelMxn: agent.expenses.fuelMxn + fuel,
    maintenanceMxn: agent.expenses.maintenanceMxn + maint,
  };
  agent.position = { ...RESTAURANT_MASS_CENTER };
}

function settleIfDue(agent: AgentState, elapsed: number, busyUntil: { t: number }): void {
  if (agent.carriedOrders.length === 0 || busyUntil.t > elapsed) return;
  const start = agent.position;
  const last = agent.carriedOrders[agent.carriedOrders.length - 1];
  const drop = last.order.dropoffCoords;
  const eff = planEfficiency(agent.carriedOrders, start, agent.capacity);
  agent.earnings += eff.grossMxn;
  agent.netEarnings += eff.netMxn;
  agent.ordersCompleted += agent.carriedOrders.length;
  agent.kmDriven = Math.round((agent.kmDriven + eff.totalKm) * 10) / 10;
  agent.tipsEarned += eff.expectedTipMxn;
  agent.batchBonusEarned += eff.batchBonusMxn;
  agent.expenses = {
    fuelLiters: agent.expenses.fuelLiters,
    fuelMxn: agent.expenses.fuelMxn + eff.fuelMxn,
    maintenanceMxn: agent.expenses.maintenanceMxn + eff.maintenanceMxn,
  };
  agent.carriedOrders = [];
  agent.position = drop;
  agent.isMoving = false;
  busyUntil.t = 0;
}

function offerToBaseline(agent: AgentState, order: Order, busyUntil: { t: number }, elapsed: number): void {
  const d = baselineDecide(order, agent);
  if (d.decision === "accept") {
    agent.carriedOrders = [...agent.carriedOrders, { order, pickedUp: false }];
    agent.acceptCount += 1;
    const eff = planEfficiency(agent.carriedOrders, agent.position, agent.capacity);
    busyUntil.t = elapsed + Math.max(60, eff.totalMinutes * 60);
    agent.isMoving = true;
  } else {
    agent.skipCount += 1;
  }
}

function offerToSmart(
  agent: AgentState,
  burst: Order[],
  remaining: number,
  knobs: SmartKnobs,
  busyUntil: { t: number },
  elapsed: number
): void {
  const decisions = decideSmartBurst(burst, agent, remaining, knobs);
  let any = false;
  for (let i = 0; i < burst.length; i++) {
    if (decisions[i].decision === "accept") {
      agent.carriedOrders = [...agent.carriedOrders, { order: burst[i], pickedUp: false }];
      agent.acceptCount += 1;
      any = true;
    } else {
      agent.skipCount += 1;
    }
  }
  if (any) {
    const eff = planEfficiency(agent.carriedOrders, agent.position, agent.capacity);
    busyUntil.t = elapsed + Math.max(60, eff.totalMinutes * 60);
    agent.isMoving = true;
  }
}

function replay(burstSize: number, knobs: SmartKnobs, spawnEverySimS: number): {
  smart: AgentState;
  baseline: AgentState;
} {
  const shift = createInitialShiftState(DEFAULT_CAPACITY);
  const smart = structuredClone(shift.smartAgent) as AgentState;
  const baseline = structuredClone(shift.baselineAgent) as AgentState;
  const smartBusy = { t: 0 };
  const baseBusy = { t: 0 };
  let poolIndex = 0;
  let orderSeq = 0;

  for (let elapsed = 0; elapsed < SHIFT_DURATION_SECONDS; elapsed += 30) {
    settleIfDue(smart, elapsed, smartBusy);
    if (smart.carriedOrders.length === 0) goHomeIfIdle(smart);
    settleIfDue(baseline, elapsed, baseBusy);
    if (elapsed % spawnEverySimS !== 0) continue;

    const burst: Order[] = [];
    for (let i = 0; i < burstSize; i++) {
      const raw = pool[poolIndex % pool.length];
      poolIndex += 1;
      burst.push(toOrder(raw, orderSeq++, elapsed + i));
    }

    const remaining = SHIFT_DURATION_SECONDS - elapsed;
    offerToSmart(smart, burst, remaining, knobs, smartBusy, elapsed);
    for (const order of burst) {
      offerToBaseline(baseline, order, baseBusy, elapsed);
    }
  }

  settleIfDue(smart, SHIFT_DURATION_SECONDS, { t: 0 });
  goHomeIfIdle(smart);
  settleIfDue(baseline, SHIFT_DURATION_SECONDS, { t: 0 });
  return { smart, baseline };
}

function line(label: string, a: AgentState): string {
  const total = a.acceptCount + a.skipCount;
  const rate = total ? Math.round((a.acceptCount / total) * 100) : 0;
  return `${label.padEnd(12)} net $${a.netEarnings.toFixed(0).padStart(5)}  gross $${a.earnings.toFixed(0).padStart(5)}  orders ${String(a.ordersCompleted).padStart(3)}  accept ${rate}%  km ${a.kmDriven}`;
}

function main(): void {
  const spawnEvery = 10 * 60;
  const idleFloors = [2.6, 3.0, 3.2, 3.5];
  const bursts = [2, 3, 4];

  console.log(
    `Restaurant mass center: ${RESTAURANT_MASS_CENTER.lat.toFixed(5)}, ${RESTAURANT_MASS_CENTER.lng.toFixed(5)}`
  );
  console.log("Headless 4h replay. Smart: cluster perception (ranking only), return-to-mass-center.\n");

  let bestDelta = -Infinity;
  let bestLabel = "";

  for (const burst of bursts) {
    for (const idle of idleFloors) {
      const knobs: SmartKnobs = { ...DEFAULT_SMART_KNOBS, idleEfficiency: idle };
      const { smart, baseline } = replay(burst, knobs, spawnEvery);
      const delta = smart.netEarnings - baseline.netEarnings;
      const tag = `burst=${burst} idleEff=${idle.toFixed(1)}`;
      console.log(tag);
      console.log("  " + line("Smart", smart));
      console.log("  " + line("Baseline", baseline));
      console.log(`  delta (smart - baseline) = $${delta.toFixed(0)}\n`);
      if (delta > bestDelta) {
        bestDelta = delta;
        bestLabel = tag;
      }
    }
  }

  console.log(`Best smart edge: ${bestLabel}  ($${bestDelta.toFixed(0)} net)`);
  if (bestDelta <= 0) {
    console.log("WARNING: smart did not beat baseline in this sweep — lower idleEff or raise burst size.");
    process.exitCode = 1;
  }
}

main();
