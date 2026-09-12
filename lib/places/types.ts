import type { Coords } from "@/lib/types";

export type PriceTier = 1 | 2 | 3;

export interface Producer {
  id: string;
  name: string;
  coords: Coords;
  priceTier: PriceTier;
  avgPrepMinutes: number; // simulated minutes a courier waits at pickup
  types: string[];
}

export interface Consumer {
  id: string;
  name: string;
  coords: Coords;
  kind: "poi" | "residential";
  /** Multiplicative bias applied to the producer's order-size range (1 = standard). */
  sizeMultiplier: number;
  tipPropensity: number; // 0–1 baseline
}

export interface PlacesCatalog {
  producers: Producer[];
  consumers: Consumer[];
  source: "places" | "fallback";
}
