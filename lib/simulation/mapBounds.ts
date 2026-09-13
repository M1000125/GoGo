import type { Coords } from "@/lib/types";

// Bounding Box para la zona de Distrito Tec (Monterrey)
export const DISTRITO_TEC_BOUNDS = {
  north: 25.6650, // Límite Norte (aprox. Av. Morones Prieto)
  south: 25.6380, // Límite Sur (aprox. Av. Alfonso Reyes / Blvd. Acapulco)
  east: -100.2730, // Límite Este (aprox. Av. Revolución)
  west: -100.3020, // Límite Oeste (aprox. Av. Eugenio Garza Sada)
};

/** ~550 m of map around the neighborhood so the courier marker stays on-screen. */
const DISPLAY_PAD_DEG = 0.005;

export const DISPLAY_BOUNDS = {
  north: DISTRITO_TEC_BOUNDS.north + DISPLAY_PAD_DEG,
  south: DISTRITO_TEC_BOUNDS.south - DISPLAY_PAD_DEG,
  east: DISTRITO_TEC_BOUNDS.east + DISPLAY_PAD_DEG,
  west: DISTRITO_TEC_BOUNDS.west - DISPLAY_PAD_DEG,
};

// Center of the bounding box
export const DISTRITO_TEC_CENTER: Coords = {
  lat: (DISTRITO_TEC_BOUNDS.north + DISTRITO_TEC_BOUNDS.south) / 2, // 25.6515
  lng: (DISTRITO_TEC_BOUNDS.east + DISTRITO_TEC_BOUNDS.west) / 2,   // -100.2875
};

// Opciones para Autocomplete de direcciones
export const autocompleteOptions = {
  bounds: DISTRITO_TEC_BOUNDS,
  locationRestriction: DISTRITO_TEC_BOUNDS,
  componentRestrictions: { country: "mx" },
};

/** Returns true if coords fall inside the Distrito Tec bounding box */
export function isInBounds(coords: Coords): boolean {
  return (
    coords.lat >= DISTRITO_TEC_BOUNDS.south &&
    coords.lat <= DISTRITO_TEC_BOUNDS.north &&
    coords.lng >= DISTRITO_TEC_BOUNDS.west &&
    coords.lng <= DISTRITO_TEC_BOUNDS.east
  );
}
