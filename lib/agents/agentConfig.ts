// ── Agent competition configuration ─────────────────────────────────────────
// Build-time default lives on the server env; the runtime value is held in
// useShift state (initialized here) and toggleable in-app before a shift.
// Compete is opt-in: unset/any value except "true" runs shared "compare" mode.

/** Offer exclusivity. When ON, each order is claimed by exactly one agent and
 *  the two couriers genuinely compete (a "smart-only" charity button is not
 *  needed — the better policy wins on the margin). When OFF, both agents see
 *  every order and may both carry it (pre-compete / compare behaviour). */
export const COMPETE_MODE = process.env.NEXT_PUBLIC_COMPETE_MODE === "true";

// ── Smart policy gates (net MXN/min after fuel + maintenance) ──────────────
/** Minimum net MXN/min for a standalone (first-impact) order. The economy pays
 *  ~$1.5–5 net/min on real Distrito Tec hops, so this cleans out only the
 *  genuinely bad orders the greedy baseline gobbles up. */
export const SMART_STANDALONE_GATE = 1.5;
/** Lower gate applied around active/upcoming surge zones or surged orders —
 *  extra volume beats selectivity there. */
export const SMART_SURGE_GATE = 1.0;
/** Floor for an add-on route's net MXN/min that stacking must not drop below
 *  the current route. Smart stacks enthusiastically (delta of ~0 accepted)
 *  because the batch bonus + tips make multi-stop runs the real money maker. */
export const SMART_ADDON_FLOOR = 0.8;
/** Allow an add-on that marginally dilutes the route (net/min must not fall
 *  below current minus this tolerance). Generous: batch bonus + tips make
 *  even slightly dilutive stacks net-positive. */
export const SMART_ADDON_TOLERANCE = -0.5;

// ── Smart endgame / surge positioning ───────────────────────────────────────
/** Buffer (sim minutes) added on top of estimated completion time; orders that
 *  could not finish within the remaining shift are declined. Without this the
 *  greedy baseline laps up orders it never delivers (unfinished runs pay $0). */
export const ENDGAME_BUFFER_MIN = 30;
/** Reserve at least this many capacity slots for an imminent/active surge
 *  before loading up on regular add-ons mid-run. */
export const SURGE_RESERVE_SLOTS = 1;
/** Surge look-ahead window (sim minutes): a zone activating within this window
 *  is treated as "surge soon" for gates and the slot reserve. */
export const SURGE_LOOKAHEAD_MIN = 10;
/** Distance factor (zone radius) inside which a pickup counts as "surge
 *  positioning" and benefits from the lowered surge gate. */
export const SURGE_POSITION_FACTOR = 1.5;

// ── Crisis / supply tension (tuning) ────────────────────────────────────────
/** Chance that a non-surge spawn is delayed by a "slow window" — stretches of
 *  scarce orders reward couriers who avoid dead-head and stick near demand. */
export const SLOW_WINDOW_PROBABILITY = 0.06;
export const SLOW_WINDOW_EXTRA_SIM_S = 240; // +4 min of quiet