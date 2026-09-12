# 🛵 Courier — HackMTY 2026

**Infosys Challenge Track** · AI-powered delivery courier optimizer for Monterrey, NL

Two agents. One 20-minute shift. Real Monterrey streets. The AI agent uses Gemini 2.0 Flash to make smarter order decisions while the baseline grabs anything above 30 MXN.

---

## Demo

- **Smart Agent** — Calls Gemini 2.0 Flash with current shift state, surge zones, road closures, and recent decisions. Gets a structured JSON response with `decision`, `reason`, and `confidence`.
- **Baseline Agent** — Accepts any order with payout ≥ 30 MXN. No surge awareness, no efficiency scoring.

At **T+5 minutes**, a surge zone activates in Cumbres (2× multiplier). At **T+10 minutes**, a road closure hits Constitución Ave. The Smart Agent adapts — the Baseline does not.

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

### 3. Get a Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a free API key (Gemini 2.0 Flash is on the free tier)

### 4. Set environment variables

Copy `.env.local` and fill in your values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

GEMINI_API_KEY=...
```

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Start Shift**.

---

## Architecture

```
app/
├── page.tsx                  ← Main page (idle / live / summary)
├── api/
│   ├── agent/decide/         ← Gemini decision endpoint
│   ├── routing/              ← OSRM routing proxy (with cache)
│   └── simulation/           ← Order generator
components/
├── DualAgentView.tsx         ← Side-by-side agent panels + shift header
├── AgentPanel.tsx            ← Earnings, map, reasoning log per agent
├── ShiftMap.tsx              ← Leaflet map (OSM tiles, surge zones, routes)
├── OrderPing.tsx             ← Incoming order with 15s countdown
├── EarningsTicker.tsx        ← Animated earnings counter
├── EventAlert.tsx            ← Surge / closure alert banners
└── ShiftSummary.tsx          ← End-of-shift bar chart comparison
lib/
├── hooks/useShift.ts         ← Core shift state machine (client-side)
├── simulation/
│   ├── monterreyPois.ts      ← 50 real Monterrey POI coordinates
│   ├── orderGenerator.ts     ← Generates realistic orders with surge pricing
│   ├── shiftEngine.ts        ← Shift state helpers
│   └── surgeZones.ts         ← Surge zone polygons + road closures
├── agents/
│   ├── smartAgent.ts         ← Builds Gemini prompt
│   ├── baselineAgent.ts      ← Greedy baseline logic
│   └── scoring.ts            ← Payout/time efficiency scoring
└── routing/osrm.ts           ← OSRM public API client (+ fallback)
firebase/
├── config.ts                 ← Firebase initialization
├── shiftRepo.ts              ← Firestore read/write helpers
└── firestore.rules           ← Security rules
```

## Routing

Uses the [OSRM public demo server](https://router.project-osrm.org) with real Monterrey street data from OpenStreetMap. Falls back to a straight-line haversine estimate if OSRM is unavailable.

Results are cached in-memory so the same origin→destination pair only calls OSRM once.

## Gemini Prompt

The Smart Agent receives:
- Current shift state (earnings, time remaining, current delivery)
- The order offer (payout, pickup/dropoff, estimated km/min, surge flag)
- Active surge zones and road closures
- Last 3 decisions for context

It returns `{ decision, reason, confidence }` — the reason is shown live in the reasoning panel, directly addressing the judges' "Judgment" and "Clarity" criteria.

## Judging Criteria Mapping

| Criterion | How we address it |
|-----------|------------------|
| **Results** | End-of-shift summary compares total earnings, orders, km driven |
| **Judgment** | Gemini reason string shown live for every decision |
| **Feasibility** | Uses free APIs (Gemini free tier, OSRM, OSM) — deployable today |
| **Clarity** | Side-by-side panels, animated earnings ticker, decision history |

---

Built for HackMTY 2026 · Infosys Last-Mile Delivery Challenge
