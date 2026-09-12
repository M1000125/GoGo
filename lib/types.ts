export type AgentType = "smart" | "baseline";

export interface Coords {
  lat: number;
  lng: number;
}

export interface Order {
  id: string;
  pickupCoords: Coords;
  dropoffCoords: Coords;
  pickupLabel: string;
  dropoffLabel: string;
  payout: number;
  estimatedKm: number;
  estimatedMinutes: number;
  expiresAt: number; // timestamp ms
  isSurge: boolean;
  prepMinutes: number; // pickup prep time, sim minutes
  tip: number; // MXN realized at dropoff, 0 if no tip
}

export interface RouteStop {
  kind: "pickup" | "dropoff";
  coord: Coords;
  label: string;
  orderId: string;
  done: boolean;
}

export interface CarriedOrder {
  order: Order;
  pickedUp: boolean;
}

export interface ExpenseSnapshot {
  fuelLiters: number;
  fuelMxn: number;
  maintenanceMxn: number;
}

export interface EarningsPoint {
  at: number; // elapsed shift seconds
  gross: number;
  net: number;
}

export interface AgentDecision {
  orderId: string;
  decision: "accept" | "skip";
  reason: string;
  confidence: number;
  timestamp: number;
  // Order context — populated for full history display
  pickupLabel: string;
  dropoffLabel: string;
  payout: number;
  estimatedMinutes: number;
}

export interface RouteMeta {
  startedAt: number;   // ms timestamp when delivery began
  durationMs: number;  // total animation duration in ms
  pickupIndex: number; // index in currentRoute where pickup→dropoff begins
}

export interface AgentState {
  type: AgentType;
  position: Coords;
  earnings: number; // gross (payout + tip + batch bonus)
  netEarnings: number;
  ordersCompleted: number;
  kmDriven: number;
  carriedOrders: CarriedOrder[];
  stops: RouteStop[];
  currentRoute: Coords[];
  currentRouteMeta: RouteMeta | null;
  capacity: number;
  runOrderCount: number; // orders in current multi-stop run (bonus basis)
  batchBonusEarned: number;
  tipsEarned: number;
  waitMinutes: number;
  acceptCount: number;
  skipCount: number;
  deadMilesKm: number;
  surgeOrdersAccepted: number;
  expenses: ExpenseSnapshot;
  earningsHistory: EarningsPoint[];
  lastDecision: AgentDecision | null;
  decisionHistory: AgentDecision[]; // full history, never truncated
  isMoving: boolean;
}

export interface SurgeZone {
  id: string;
  label: string;
  center: Coords;
  radiusKm: number;
  multiplier: number;
  activeAt: number; // seconds from shift start
}

export interface RoadClosure {
  id: string;
  label: string;
  coords: Coords[];
  activeAt: number; // seconds from shift start
}

export interface ShiftEvent {
  type: "surge" | "closure" | "order";
  label: string;
  timestamp: number;
  agentType?: AgentType;
}

export interface ShiftState {
  id: string;
  status: "idle" | "running" | "paused" | "ended";
  capacity: number;
  startedAt: number | null;
  elapsedSeconds: number;
  durationSeconds: number;
  /** Unix ms timestamp of the simulated shift start (used for Google Maps traffic) */
  simShiftStart: number;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  eventLog: ShiftEvent[];
  smartAgent: AgentState;
  baselineAgent: AgentState;
}