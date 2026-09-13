# 🛵 Courier — HackMTY 2026

**Infosys Challenge Track** · AI-powered delivery courier optimizer for Monterrey, NL

Two agents. One 4-hour shift. Real Distrito Tec streets and prices. Pick a vehicle, run a shift, and watch an efficiency-optimized agent stack multi-stop deliveries against a greedy baseline — live on a map.

---

## Demo

- **Smart Agent** — a heuristic that evaluates every order on net MXN/min (after fuel + maintenance), stacking potential, batch bonus, dead-head and the **cost of moving away from the center of demand**, surge positioning, and shift-endgame risk. It accepts/skips with structured reasoning, bound by the vehicle's **slot capacity**, and evaluates whole bursts of simultaneous offers as a batch.
- **Baseline Agent** — accepts any single order with payout ≥ 40 MXN. Stacks add-ons only when they lift net route efficiency past a fixed threshold. No surge awareness, no positioning, no endgame guard.

Surge zones activate at **T+2h** and a road closure hits at **T+2h 10m**: orders then spawn in **simultaneous bursts** at shorter intervals with surge payouts. The Smart Agent adapts; the Baseline does not.

---

## Setup

```bash
git clone <repo>
cd courier
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), select a vehicle capacity, and click **Start Shift**.

### Environment variables

| Key | Required | Why |
|-----|----------|-----|
| `GOOGLE_MAPS_API_KEY` | No | `Places API` pricing model + traffic-aware Google Directions routing. Without it, routing falls back to the free OSRM public server and the bundled mock order dataset is used. |
| `NEXT_PUBLIC_COMPETE_MODE` | No | Set to `false` to let both agents evaluate every order instead of competing for exclusive claims (default: compete mode ON). |

No Firebase, no other keys. The whole demo runs from a bundled order dataset.

---

## Key Features

### Vehicle capacity selector
Choose 2–8 **slots** before starting (1 slot ≈ $400 MXN of cargo, orders span 1–3 slots). Capacity determines vehicle type (Motorcycle → Van/SUV) and fuel economy — higher capacity stacks more simultaneously but gets worse km/L.

### Order source: a curated, zone-locked dataset
Orders come from `data/mock_orders.json` — **500 real-priced orders** built around actual restaurants on Av. Eugenio Garza Sada (Taquería Orinoco, Firehouse Subs, El Señor Limón …). Every pickup **and** dropoff is strictly inside the **Distrito Tec bounding box**; the server additionally rejects any out-of-zone order as defense-in-depth. Prices are calibrated from real Monterrey consumer spending (fast food / sit-down / fine dining tiers), so payouts feel like a real Mexican gig shift.

### Simultaneous offers & surge bursts
Multiple orders can be pending at once (each with its own speed-scaled countdown) and both agents evaluate every offer independently. During surge, spawn cadence tightens (≈4 min sim → bursts of 1–3); normally it's ~10 min ±4.

### Center-of-demand steering (Smart Agent)
The Smart Agent is drawn toward the **geographic center of where future orders are likely to appear** — a weighted centroid of active surge-zone centers (weighted by their multiplier), the current burst's pickup points, and the courier's own position. Pickups that would drag the courier **away** from that center are charged extra repositioning km (fuel + time), which lowers their effective net rate. Far-from-demand orders get skipped; near-demand orders get taken. With no surge and no pending offers the cost is zero, so idle behavior matches plain dead-head accounting.

### Multi-stop route solver
Held-Karp dynamic programming over stop subsets (≤16 stops). Respects pickup-before-dropoff precedence, penalises non-consecutive pickups, and computes dead-km, total km, and total minutes for any carried load.

### Batch bonus economics
Stacking 2+ orders in a single run earns **$15 MXN per extra order**. Both agents can stack — the difference is *when* they choose to.

### Traffic-aware routing
When `GOOGLE_MAPS_API_KEY` is set, the routing proxy calls the Google Maps Directions API with a simulated departure timestamp (tomorrow 08:00 AM Monterrey time) so the shift runs against predicted traffic. Falls back to the [OSRM public demo server](https://router.project-osrm.org) (always free) if the key is missing or the call fails. Results are cached in-memory.

### Shift simulation
A 4-hour (14,400 s) shift runs at adjustable speed up to 300×. Orders are presented every ~10 simulated minutes (±5 min), faster during surge. Accepted orders are animated leg-by-leg along real routes with pickup-before-dropoff settlement: payout, tip and batch bonus are credited at each dropoff, fuel/maintenance charged per leg. Surge zones and road closures are scripted at fixed shift-elapsed timestamps.

---

## Architecture

```
app/
├── page.tsx                      ← Main page (idle / live / summary)
├── api/
│   ├── agent/decide/             ← Smart Agent decision API (same policy as the client)
│   ├── routing/                  ← Routing proxy (Google Maps with traffic → OSRM fallback)
│   └── simulation/               ← Order generator from bundled mock data (zone-locked)
components/
├── DualAgentView.tsx             ← Side-by-side agent panels + shift header
├── AgentPanel.tsx                ← Earnings, map, reasoning log per agent
├── ShiftMap.tsx                  ← Leaflet map (OSM tiles, surge zones, routes)
├── OrderPing.tsx                 ← Incoming order with countdown + progress bar
├── EarningsTicker.tsx            ← Animated earnings counter (gross + net)
├── EventAlert.tsx                ← Surge / closure alert banners
└── ShiftSummary.tsx              ← End-of-shift bar chart comparison
lib/
├── hooks/useShift.ts             ← Core shift state machine (client-side) — offers, delivery runs, surge bursts
├── types.ts                      ← Shared TypeScript types
├── agents/
│   ├── decisionCore.ts           ← Smart + baseline policies (net MXN/min gates, endgame, surge reserve)
│   ├── positioning.ts            ← Center-of-demand centroid + repositioning cost
│   ├── agentConfig.ts            ← Tunable policy constants
│   └── scoring.ts                ← Add-on route-efficiency comparison
├── places/                       ← Places API pricing model (reference for price calibration)
├── simulation/
│   ├── monterreyPois.ts          ← Bundled Monterrey POI coordinates
│   ├── orderGenerator.ts         ← Catalog-based order generator (reference — runtime uses mock data)
│   ├── shiftEngine.ts            ← Shift state helpers + simulated departure time
│   ├── surgeZones.ts             ← Surge zone polygons + road closures
│   ├── economics.ts              ← Slot/fuel/tip model, batch bonus, bounds helpers
│   ├── mapBounds.ts              ← Distrito Tec bounding box
│   └── nanoid.ts                 ← ID generation
└── routing/
    ├── osrm.ts                   ← OSRM public API client (+ haversine fallback)
    ├── googleMaps.ts             ← Google Maps Directions API (traffic-aware, polyline decode)
    └── routeSolver.ts            ← Held-Karp DP route planner + efficiency calculator
data/
├── mock_orders.json              ← 500 curated, zone-locked orders (runtime source)
└── places_cache.json             ← Optional Places cache (gitignored, generated)
scripts/
└── generate_mock_orders.py       ← Regenerates mock_orders.json (deterministic seed, bounded zone)
```

---

## Economics Model

| Constant | Value | Notes |
|----------|-------|-------|
| Slot anchor | $400 MXN | 1 capacity slot ≈ one bundle of meals' cargo space |
| Order size | tier1 150–280 · tier2 280–550 · tier3 550–1200 MXN | From producer price tier (consumer multiplier varies) |
| Slots / order | 1–3 (capped) | = `Math.ceil(orderSizeMxn / 400)`, max 3 per order |
| Base payout | `min(8% × size + 35 + 10×km, 220)` MXN, floor 40 | Commission + base fee + per-km |
| Surge multiplier | ×2 (ITESM) / ×1.5 (Garza Sada Sur) | Active zones amplify pickup payout |
| Tip | 5–12% of order size, clipped $8–60 | Realised at dropoff |
| Prep time | 0–8 sim min | Per-order restaurant wait |
| Batch bonus | $15 / extra order | ≥2 orders in a single run |
| Smart standalone gate | $1.5 MXN/min | Lowered to $1.0 around surge |
| Smart add-on floor | $1.0 MXN/min | Min route rate a stack must keep |
| Baseline payout floor | $40 MXN | Accepts single orders above this |
| Avg speed | 25 km/h | Monterrey city driving estimate |
| Fuel price | $23 MXN/L · maint $0.8/km | |

Vehicle fuel economy scales by capacity (each +1 slot = −20%):

| Capacity | Vehicle | km/L |
|----------|---------|------|
| 2 | Motorcycle | ~40 |
| 3 | Scooter | ~32 |
| 4 | Compact Car | ~26 |
| 5 | Hatchback | ~20 |
| 6 | Small Van | ~16 |
| 7 | Crossover | ~13 |
| 8 | Van / SUV | ~10 |

---

## Routing

Two routing backends, selected automatically at runtime:

1. **Google Maps** (when `GOOGLE_MAPS_API_KEY` is set) — traffic-aware Directions API with a simulated departure timestamp, polyline decode, and per-hour in-memory cache.
2. **OSRM** (always available, free) — [public demo server](https://router.project-osrm.org) with real OSM street data. Falls back to straight-line haversine if the server is unreachable.

Both cache results in-memory by origin→destination (Google Maps additionally keys on departure hour to vary traffic). Multi-stop runs are fetched leg-by-leg as the courier drives, so stacking a second order re-plans the whole route mid-run.

> Note: in-memory caches live per server instance, so on serverless (e.g. Vercel) they reset on cold starts — harmless for a demo.

---

## Route Solver

The Held-Karp DP in `lib/routing/routeSolver.ts` finds the optimal stop ordering for up to 16 carried stops. It respects:

- **Precedence** — dropoff cannot be visited before its pickup
- **Consecutive pickup bias** — penalty for dropping off before all pickups are complete
- **Full cost accounting** — fuel, maintenance, batch bonus, and tip are all folded into the net MXN/min efficiency metric

This solver is used by both agents' add-on scoring logic.

---

## Deployment (Vercel)

- Push the repo and import into Vercel; no build config needed (`next build`).
- Set `GOOGLE_MAPS_API_KEY` in the project environment variables to enable traffic-aware routing and live pricing.
- The app works fully without it (OSRM + bundled orders), so the demo never breaks.

---

## Judging Criteria Mapping

| Criterion | How we address it |
|-----------|------------------|
| **Results** | End-of-shift summary compares gross/net earnings, orders, km, fuel cost |
| **Judgment** | Smart Agent decision reason shown live for every order; transparent gates + center-of-demand steering |
| **Feasibility** | Free APIs only (OSRM, OSM tiles); Google Maps optional; no paid SKUs |
| **Clarity** | Side-by-side panels, animated gross/net ticker, full decision history |

---

Built for HackMTY 2026 · Infosys Last-Mile Delivery Challenge