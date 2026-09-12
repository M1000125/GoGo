# 🛵 Courier — HackMTY 2026

**Infosys Challenge Track** · AI-powered delivery courier optimizer for Monterrey, NL

Two agents. One 4-hour shift. Real Distrito Tec streets. Pick a vehicle, run a shift, and watch an efficiency-optimized agent stack multi-stop deliveries against a greedy baseline — live on a map.

---

## Demo

- **Smart Agent** — Evaluates every order on net MXN/min efficiency, stacking potential, fuel cost, surge positioning, and road closures. Makes accept/skip decisions with structured reasoning.
- **Baseline Agent** — Accepts any single order with payout ≥ 30 MXN. Stacks add-ons only when they lift net route efficiency past a fixed threshold. No surge awareness, no contextual reasoning.

Surge zones activate at **T+2h** and a road closure hits at **T+2h 10m**. The Smart Agent adapts; the Baseline does not.

---

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd courier
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com) → Create project
2. Enable **Firestore** (production mode is fine, deploy `firebase/firestore.rules`)
3. Get your web app config

### 3. Get API keys (optional but recommended)

| Key | Where | Why |
|-----|-------|-----|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | Powers the Smart Agent's reasoning (free tier) |
| `GOOGLE_MAPS_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) | Traffic-aware routing with simulated departure times. Falls back to OSRM (free) if not set |

### 4. Set environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), select a vehicle capacity, and click **Start Shift**.

---

## Key Features

### Vehicle capacity selector
Choose 2–8 packages before starting. Capacity determines vehicle type (Motorcycle → Van/SUV) and fuel economy — higher capacity means more batch bonus per multi-stop run, but worse km/L.

### Multi-stop route solver
Held-Karp dynamic programming over stop subsets (≤16 stops). Respects pickup-before-dropoff precedence, penalises non-consecutive pickups, and computes dead-km, total km, and total minutes for any carried load.

### Batch bonus economics
Stacking 2+ orders in a single run earns $8 MXN per extra order. Both agents can stack — the difference is *when* they choose to.

### Traffic-aware routing
When `GOOGLE_MAPS_API_KEY` is set, the routing proxy calls the Google Maps Directions API with a simulated departure timestamp (tomorrow 08:00 AM Monterrey time) so the shift runs against predicted traffic. Falls back to the [OSRM public demo server](https://router.project-osrm.org) (always free) if the key is missing or the call fails. Results are cached in-memory.

### Shift simulation
A 4-hour (14,400 s) shift runs at adjustable speed up to 300×. Real mock orders from `data/mock_orders.json` (500 Distrito Tec deliveries) are presented every ~10 simulated minutes with ±5 min jitter. Surge zones and road closures are scripted at fixed shift-elapsed timestamps.

---

## Architecture

```
app/
├── page.tsx                      ← Main page (idle / live / summary)
├── api/
│   ├── agent/decide/             ← Smart Agent decision endpoint (local heuristic; Gemini-ready)
│   ├── routing/                  ← Routing proxy (Google Maps with traffic → OSRM fallback)
│   └── simulation/               ← Order generator from mock data
components/
├── DualAgentView.tsx             ← Side-by-side agent panels + shift header
├── AgentPanel.tsx                ← Earnings, map, reasoning log per agent
├── ShiftMap.tsx                  ← Leaflet map (OSM tiles, surge zones, routes)
├── OrderPing.tsx                 ← Incoming order with 15s countdown
├── EarningsTicker.tsx            ← Animated earnings counter (gross + net)
├── EventAlert.tsx                ← Surge / closure alert banners
└── ShiftSummary.tsx              ← End-of-shift bar chart comparison
lib/
├── hooks/useShift.ts             ← Core shift state machine (client-side)
├── types.ts                      ← Shared TypeScript types
├── simulation/
│   ├── monterreyPois.ts          ← 50 real Monterrey POI coordinates
│   ├── orderGenerator.ts         ← Generates realistic orders with surge pricing + tips
│   ├── shiftEngine.ts            ← Shift state helpers + simulated departure time
│   ├── surgeZones.ts             ← Surge zone polygons + road closures
│   ├── economics.ts              ← Vehicle/fuel model, batch bonus, tip/prep params
│   ├── mapBounds.ts              ← Distrito Tec bounding box
│   └── nanoid.ts                 ← ID generation
├── agents/
│   ├── smartAgent.ts             ← Builds prompt with add-on efficiency context
│   ├── baselineAgent.ts          ← Greedy baseline with add-on stacking gate
│   └── scoring.ts                ← Route-level net MXN/min comparison
└── routing/
    ├── osrm.ts                   ← OSRM public API client (+ haversine fallback)
    ├── googleMaps.ts             ← Google Maps Directions API (traffic-aware, polyline decode)
    └── routeSolver.ts            ← Held-Karp DP route planner + efficiency calculator
firebase/
├── config.ts                     ← Firebase initialization
├── shiftRepo.ts                  ← Firestore read/write helpers
└── firestore.rules               ← Security rules
data/
└── mock_orders.json              ← 500 pre-generated Distrito Tec delivery orders
```

---

## Economics Model

| Constant | Value | Notes |
|----------|-------|-------|
| Base payout | 25 + 8×km MXN | ±20% random jitter |
| Surge multiplier | ×2 | Active zones amplify pickup payout |
| Tip chance | 40% | $5–15 MXN, realised at dropoff |
| Prep time | 0–5 sim min | Per-order restaurant wait |
| Batch bonus | $8 / extra order | ≥2 orders in a single run |
| Efficiency gate | +$0.50 MXN/min | Min net gain to justify stacking an add-on |
| Baseline payout floor | $30 MXN | Accepts single orders above this |
| Avg speed | 25 km/h | Monterrey city driving estimate |
| Fuel price | $23 MXN/L | |

Vehicle fuel economy scales by capacity:

| Capacity | Vehicle | km/L |
|----------|---------|------|
| 2 | Motorcycle | ~40 |
| 4 | Compact Car | ~26 |
| 6 | Small Van | ~16 |
| 8 | Van / SUV | ~10 |

---

## Routing

Two routing backends, selected automatically at runtime:

1. **Google Maps** (when `GOOGLE_MAPS_API_KEY` is set) — traffic-aware Directions API with a simulated departure timestamp, polyline decode, and per-hour in-memory cache.
2. **OSRM** (always available, free) — [public demo server](https://router.project-osrm.org) with real OSM street data. Falls back to straight-line haversine if the server is unreachable.

Both cache results in-memory by origin→destination (Google Maps additionally keys on departure hour to vary traffic).

---

## Route Solver

The Held-Karp DP in `lib/routing/routeSolver.ts` finds the optimal stop ordering for up to 16 carried stops. It respects:

- **Precedence** — dropoff cannot be visited before its pickup
- **Consecutive pickup bias** — penalty for dropping off before all pickups are complete, pushing routes toward efficient pickup-first runs
- **Full cost accounting** — fuel, maintenance, batch bonus, and tip are all folded into the net MXN/min efficiency metric

This solver is used by both agents' add-on scoring logic and is the core of the Smart Agent's prompt context.

---

## Judging Criteria Mapping

| Criterion | How we address it |
|-----------|------------------|
| **Results** | End-of-shift summary compares gross/net earnings, orders, km, fuel cost |
| **Judgment** | Smart Agent decision reason shown live for every order; structured prompt with 7 decision criteria |
| **Feasibility** | Uses free APIs (OSRM, OSM, Gemini free tier); Google Maps optional |
| **Clarity** | Side-by-side panels, animated gross/net ticker, full decision history |

---

Built for HackMTY 2026 · Infosys Last-Mile Delivery Challenge
