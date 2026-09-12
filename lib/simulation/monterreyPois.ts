import type { Coords } from "@/lib/types";
import { DISTRITO_TEC_CENTER } from "./mapBounds";

export interface POI {
  label: string;
  coords: Coords;
  neighborhood: string;
}

// All POIs are within the Distrito Tec bounding box
// Bounds: lat 25.638–25.665 | lng -100.302 – -100.273
export const MONTERREY_POIS: POI[] = [
  // ITESM Campus
  { label: "ITESM — Rectoría", coords: { lat: 25.6513, lng: -100.2891 }, neighborhood: "ITESM" },
  { label: "ITESM — Biblioteca Central", coords: { lat: 25.6510, lng: -100.2875 }, neighborhood: "ITESM" },
  { label: "ITESM — Centro de Biotecnología FEMSA", coords: { lat: 25.6480, lng: -100.2895 }, neighborhood: "ITESM" },
  { label: "ITESM — CEDES", coords: { lat: 25.6500, lng: -100.2882 }, neighborhood: "ITESM" },
  { label: "ITESM — Cancha Borregos", coords: { lat: 25.6525, lng: -100.2900 }, neighborhood: "ITESM" },

  // Av. Eugenio Garza Sada — restaurants & food
  { label: "Starbucks Garza Sada", coords: { lat: 25.6530, lng: -100.2876 }, neighborhood: "Garza Sada" },
  { label: "McDonald's Garza Sada", coords: { lat: 25.6545, lng: -100.2860 }, neighborhood: "Garza Sada" },
  { label: "OXXO Garza Sada Norte", coords: { lat: 25.6555, lng: -100.2848 }, neighborhood: "Garza Sada" },
  { label: "Subway Garza Sada", coords: { lat: 25.6522, lng: -100.2872 }, neighborhood: "Garza Sada" },
  { label: "Domino's Pizza Garza Sada", coords: { lat: 25.6460, lng: -100.2942 }, neighborhood: "Garza Sada" },
  { label: "El Tizoncito Tec", coords: { lat: 25.6505, lng: -100.2900 }, neighborhood: "Garza Sada" },
  { label: "Tacos Don Rolando", coords: { lat: 25.6478, lng: -100.2918 }, neighborhood: "Garza Sada" },
  { label: "Taconazo del Tec", coords: { lat: 25.6494, lng: -100.2906 }, neighborhood: "Garza Sada" },
  { label: "Lonchería El Rincón", coords: { lat: 25.6488, lng: -100.2872 }, neighborhood: "Garza Sada" },
  { label: "Burguer Bros", coords: { lat: 25.6474, lng: -100.2932 }, neighborhood: "Garza Sada" },
  { label: "Korean BBQ Tec", coords: { lat: 25.6540, lng: -100.2855 }, neighborhood: "Garza Sada" },
  { label: "Sushi Time Tec", coords: { lat: 25.6508, lng: -100.2842 }, neighborhood: "Garza Sada" },
  { label: "Pizzería Campus", coords: { lat: 25.6503, lng: -100.2862 }, neighborhood: "Garza Sada" },
  { label: "OXXO Garza Sada Sur", coords: { lat: 25.6400, lng: -100.2988 }, neighborhood: "Garza Sada" },

  // Residencial / departamentos (delivery hotspots)
  { label: "Residencial del Parque", coords: { lat: 25.6495, lng: -100.2852 }, neighborhood: "Residencial" },
  { label: "Torre Estudiantil Tec", coords: { lat: 25.6518, lng: -100.2862 }, neighborhood: "Residencial" },
  { label: "Departamentos Sertoma", coords: { lat: 25.6505, lng: -100.2782 }, neighborhood: "Sertoma" },
  { label: "Condominios Del Peñón", coords: { lat: 25.6534, lng: -100.2822 }, neighborhood: "Del Peñón" },
  { label: "Villas del Tec", coords: { lat: 25.6488, lng: -100.2798 }, neighborhood: "Del Peñón" },
  { label: "Privada San Carlos", coords: { lat: 25.6462, lng: -100.2812 }, neighborhood: "Del Peñón" },
  { label: "Torres Cumbres del Tec", coords: { lat: 25.6550, lng: -100.2835 }, neighborhood: "Residencial" },

  // Comercial / servicios
  { label: "Soriana Tecnológico", coords: { lat: 25.6440, lng: -100.2972 }, neighborhood: "Comercial" },
  { label: "Farmacias del Ahorro Tec", coords: { lat: 25.6450, lng: -100.2958 }, neighborhood: "Comercial" },
  { label: "Clínica Médica Tec", coords: { lat: 25.6520, lng: -100.2832 }, neighborhood: "Comercial" },
  { label: "Gasolinera Pemex Garza Sada", coords: { lat: 25.6465, lng: -100.2946 }, neighborhood: "Comercial" },
  { label: "7-Eleven Sertoma", coords: { lat: 25.6512, lng: -100.2790 }, neighborhood: "Sertoma" },
  { label: "Farmacias Guadalajara Tec", coords: { lat: 25.6535, lng: -100.2868 }, neighborhood: "Garza Sada" },

  // Zona Sur del Tec (cerca de Blvd. Acapulco)
  { label: "Cafetería Universitaria Sur", coords: { lat: 25.6395, lng: -100.2975 }, neighborhood: "Sur Tec" },
  { label: "Restaurante Los Arcos", coords: { lat: 25.6412, lng: -100.2962 }, neighborhood: "Sur Tec" },
  { label: "Heladería Yogen Früz", coords: { lat: 25.6425, lng: -100.2950 }, neighborhood: "Sur Tec" },
];

// Use Distrito Tec center instead of downtown Monterrey
export const MONTERREY_CENTER = DISTRITO_TEC_CENTER;
