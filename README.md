# 🛵 Courier — HackMTY 2026

**Infosys Challenge Track** · AI-powered delivery courier optimizer for Monterrey, NL

Two agents. One 4-hour shift. Real Distrito Tec streets — pulled live from the Google Places API. Pick a vehicle, run a shift, and watch an efficiency-optimized agent stack multi-stop deliveries against a greedy baseline — live on a map.

---

## Demo

- **Smart Agent** — Evaluates every order on net MXN/min efficiency, stacking potential, fuel cost, surge positioning, and road closures. Makes accept/skip decisions with structured reasoning, bound by the vehicle's **slot capacity**.
- **Baseline Agent** — Accepts any single order with payout ≥ 30 MXN. Stacks add-ons only when they lift net route efficiency past a fixed threshold. No surge awareness, no contextual reasoning.

Surge zones activate at **T+2h** and a road closure hits at **T+2h 10m**: orders spawn in **simultaneous bursts** at shorter intervals and are quoted with surge payouts. The Smart Agent adapts; the Baseline does not.

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
|-----|-------|------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | Powers the Smart Agent's reasoning (free tier) |
| `GOOGLE_MAPS_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) | **Places API** (Nearby Search, drives live producers/consumers) + traffic-aware routing. Any key that enables Places API works on the free "basic" SKUs |

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
Choose 2–8 **slots** before starting (1 slot ≈ a $100 MXN medium meal, orders span 1–3 slots). Capacity determines vehicle type (Motorcycle → Van/SUV) and fuel economy — higher capacity stacks more simultaneously but gets worse km/L.

### Live Places API order generation
When `GOOGLE_MAPS_API_KEY` is set, orders come from two live sources: **food producers** from a Nearby Search around Distrito Tec (basic SKUs: id, name, location, types) and **consumers** scattered across 8 hand-curated residential colonias. Price tier (55–220 MXN) is approximated from the place's business types. The catalog is cached to `data/places_cache.json` (gitignored) and reused within a day; without a key it falls back to a synthesized catalog from 50 built-in Monterrey POIs — offline always works.

### Simultaneous offers & surge bursts
Offers no longer serialize: multiple orders can be pending at once (each with its own 15 s countdown) and both agents evaluate every offer independently. During surge, spawn cadence tightens (≈4 min sim → ~1–3 at a time); normally it's ~10 min ±4.

### Multi-stop route solver
Held-Karp dynamic programming over stop subsets (≤16 stops). Respects pickup-before-dropoff precedence, penalises non-consecutive pickups, and computes dead-km, total km, and total minutes for any carried load.

### Batch bonus economics
Stacking 2+ orders in a single run earns $8 MXN per extra order. Both agents can stack — the difference is *when* they choose to.

### Traffic-aware routing
When `GOOGLE_MAPS_API_KEY` is set, the routing proxy calls the Google Maps Directions API with a simulated departure timestamp (tomorrow 08:00 AM Monterrey time) so the shift runs against predicted traffic. Falls back to the [OSRM public demo server](https://router.project-osrm.org) (always free) if the key is missing or the call fails. Results are cached in-memory.

### Shift simulation
A 4-hour (14,400 s) shift runs at adjustable speed up to 300×. Orders are generated live from the Places catalog and presented every ~10 simulated minutes (±5 min), faster during surge. Accepted orders are animated leg-by-leg along real routes with pickup-before-dropoff settlement: payout, tip and batch bonus are credited at each dropoff, fuel/maintenance charged per leg. Surge zones and road closures are scripted at fixed shift-elapsed timestamps.

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
├── hooks/useShift.ts             ← Core shift state machine (client-side) — offers, delivery runs, surge bursts
├── types.ts                      ← Shared TypeScript types
├── places/                       ← Google Places catalog stack
│   ├── nearbySearch.ts           ← Places API Nearby Search (basic SKUs, in-memory cache)
│   ├── priceTiers.ts             ← Business-type → price tier → order $ and slots
│   ├── residentialZones.ts       ← 8 hand-curated colonias → consumer homes
│   ├── catalog.ts                ← Merged producer/consumer catalog + date-hashed file cache
│   └── types.ts                  ← Producer / Consumer / PlacesCatalog types
├── simulation/
│   ├── monterreyPois.ts          ← 50 real Monterrey POI coordinates (offline fallback)
│   ├── orderGenerator.ts         ← Generates orders from the Places catalog (surge, tips, slots)
│   ├── shiftEngine.ts            ← Shift state helpers + simulated departure time
│   ├── surgeZones.ts             ← Surge zone polygons + road closures
│   ├── economics.ts              ← Slot/fuel/tip model, batch bonus
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
├── places_cache.json             ← Runtime Places catalog cache (gitignored)
└── mock_orders.json              ← 500 pre-generated orders (offline fallback asset)
```

---

## Economics Model

| Constant | Value | Notes |
|----------|-------|-------|
| Slot anchor | $100 MXN | 1 capacity slot ≈ one medium meal order |
| Order size | tier1 55–85 · tier2 95–115 · tier3 140–220 MXN | From producer price tier (consumer multiplier varies) |
| Slots / order | 1–3 | = `Math.ceil(units / 50)` from order size |
| Base payout | 18 + 6×km MXN (min 25) | ±20% random jitter |
| Surge multiplier | ×2 | Active zones amplify pickup payout |
| Tip | 6–12% of order size, clipped $5–40 | Realised at dropoff |
| Prep time | 0–8 sim min | Per-order restaurant wait |
| Batch bonus | $8 / extra order | ≥2 orders in a single run |
| Efficiency gate | +$1.50 MXN/min | Min net gain to justify stacking an add-on |
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

Both cache results in-memory by origin→destination (Google Maps additionally keys on departure hour to vary traffic). Multi-stop runs are fetched leg-by-leg as the courier drives, so stacking a second order re-plans the whole route mid-run.

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
| **Feasibility** | Uses free APIs (OSRM, OSM, Places API basic SKUs, Gemini free tier); Google Maps optional |
| **Clarity** | Side-by-side panels, animated gross/net ticker, full decision history |

---

Built for HackMTY 2026 · Infosys Last-Mile Delivery Challenge
