"use client";

import { useEffect, useRef } from "react";
import type { AgentState, Coords, SurgeZone, RoadClosure } from "@/lib/types";
import { DISTRITO_TEC_BOUNDS, DISTRITO_TEC_CENTER } from "@/lib/simulation/mapBounds";

interface ShiftMapProps {
  agentState: AgentState;
  activeSurgeZones: SurgeZone[];
  activeClosures: RoadClosure[];
  agentColor: string;
  mapId: string;
  previewMode?: boolean;
  className?: string;
}

// Haversine distance in km between two coords
function distKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sa = Math.sin(dLat / 2);
  const sb = Math.sin(dLng / 2);
  const c =
    sa * sa +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sb * sb;
  return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}

// Interpolate a point at `progress` (0–1) along a route array
function interpolateRoute(route: Coords[], progress: number): Coords {
  if (!route.length) return { lat: 0, lng: 0 };
  if (progress <= 0) return route[0];
  if (progress >= 1) return route[route.length - 1];

  // Precompute cumulative distances
  const dists = [0];
  for (let i = 1; i < route.length; i++) {
    dists.push(dists[i - 1] + distKm(route[i - 1], route[i]));
  }
  const total = dists[dists.length - 1];
  const target = total * progress;

  let seg = 0;
  while (seg < dists.length - 2 && dists[seg + 1] < target) seg++;

  const segLen = dists[seg + 1] - dists[seg];
  const t = segLen > 0 ? (target - dists[seg]) / segLen : 0;
  return {
    lat: route[seg].lat + (route[seg + 1].lat - route[seg].lat) * t,
    lng: route[seg].lng + (route[seg + 1].lng - route[seg].lng) * t,
  };
}

export default function ShiftMap({
  agentState,
  activeSurgeZones,
  activeClosures,
  agentColor,
  mapId,
  previewMode = false,
  className,
}: ShiftMapProps) {
  const mapRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);
  const traveledLayerRef = useRef<unknown>(null);
  const remainingLayerRef = useRef<unknown>(null);
  const pickupMarkerRef = useRef<unknown>(null);
  const dropoffMarkerRef = useRef<unknown>(null);
  const surgeLayersRef = useRef<unknown[]>([]);
  const closureLayersRef = useRef<unknown[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  // ── Initialize map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const bounds = L.latLngBounds(
        [DISTRITO_TEC_BOUNDS.south, DISTRITO_TEC_BOUNDS.west],
        [DISTRITO_TEC_BOUNDS.north, DISTRITO_TEC_BOUNDS.east]
      );

      const map = L.map(mapId, {
        center: [DISTRITO_TEC_CENTER.lat, DISTRITO_TEC_CENTER.lng],
        zoom: 15,
        minZoom: 14,
        maxZoom: 18,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map as unknown as import("leaflet").Map);

      const agentIcon = L.divIcon({
        html: `<div style="
          width:22px;height:22px;border-radius:50%;
          background:${agentColor};
          border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.5);
          transition:background 0.2s;
        "></div>`,
        className: "",
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      const marker = L.marker(
        [agentState.position.lat, agentState.position.lng],
        { icon: agentIcon, zIndexOffset: 1000 }
      ).addTo(map as unknown as import("leaflet").Map);

      mapRef.current = map;
      markerRef.current = marker;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId]);

  // ── Route animation loop ─────────────────────────────────────────────────
  useEffect(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const route = agentState.currentRoute;
    const meta = agentState.currentRouteMeta;

    // No route / delivery done — snap marker to current position
    if (!route.length || !meta || !mapRef.current || !markerRef.current) {
      if (markerRef.current) {
        (markerRef.current as import("leaflet").Marker).setLatLng([
          agentState.position.lat,
          agentState.position.lng,
        ]);
      }
      // Clear route lines
      import("leaflet").then((L) => {
        const map = mapRef.current as import("leaflet").Map;
        if (!map) return;
        if (traveledLayerRef.current) {
          map.removeLayer(traveledLayerRef.current as import("leaflet").Layer);
          traveledLayerRef.current = null;
        }
        if (remainingLayerRef.current) {
          map.removeLayer(remainingLayerRef.current as import("leaflet").Layer);
          remainingLayerRef.current = null;
        }
        if (pickupMarkerRef.current) {
          map.removeLayer(pickupMarkerRef.current as import("leaflet").Layer);
          pickupMarkerRef.current = null;
        }
        if (dropoffMarkerRef.current) {
          map.removeLayer(dropoffMarkerRef.current as import("leaflet").Layer);
          dropoffMarkerRef.current = null;
        }
      });
      return;
    }

    // Draw initial route and pickup/dropoff markers
    import("leaflet").then((L) => {
      const map = mapRef.current as import("leaflet").Map;
      if (!map) return;

      // Clear previous layers
      [traveledLayerRef, remainingLayerRef, pickupMarkerRef, dropoffMarkerRef].forEach((ref) => {
        if (ref.current) {
          map.removeLayer(ref.current as import("leaflet").Layer);
          ref.current = null;
        }
      });

      // Remaining route (full route initially, bright)
      remainingLayerRef.current = L.polyline(
        route.map((c) => [c.lat, c.lng] as [number, number]),
        { color: agentColor, weight: 4, opacity: 0.85 }
      ).addTo(map);

      // Traveled portion (starts empty)
      traveledLayerRef.current = L.polyline([], {
        color: agentColor,
        weight: 4,
        opacity: 0.25,
        dashArray: "4 4",
      }).addTo(map);

      // Pickup marker (green dot)
      const pickupCoord = route[meta.pickupIndex] ?? route[0];
      pickupMarkerRef.current = L.circleMarker(
        [pickupCoord.lat, pickupCoord.lng],
        { radius: 9, color: "#F46A1F", fillColor: "#F46A1F", fillOpacity: 1, weight: 2 }
      ).addTo(map).bindTooltip(`📦 ${agentState.lastDecision?.pickupLabel ?? "Pickup"}`);

      // Dropoff marker (red dot)
      const dropoffCoord = route[route.length - 1];
      dropoffMarkerRef.current = L.circleMarker(
        [dropoffCoord.lat, dropoffCoord.lng],
        { radius: 9, color: "#ef4444", fillColor: "#ef4444", fillOpacity: 1, weight: 2 }
      ).addTo(map).bindTooltip(`🏠 ${agentState.lastDecision?.dropoffLabel ?? "Dropoff"}`);

      map.fitBounds(
        L.latLngBounds(route.map((c) => [c.lat, c.lng] as [number, number])),
        { padding: [28, 28], maxZoom: 16 }
      );

      if (previewMode) return;

      // Start the rAF animation
      const { startedAt, durationMs } = meta;

      const tick = () => {
        if (!markerRef.current || !mapRef.current) return;

        const elapsed = Date.now() - startedAt;
        const progress = Math.min(elapsed / durationMs, 1);

        // Interpolated position on the route
        const pos = interpolateRoute(route, progress);
        (markerRef.current as import("leaflet").Marker).setLatLng([pos.lat, pos.lng]);

        // Split route into traveled (0→progress) and remaining (progress→1)
        // Build the traveled segment: all points up to current + interpolated point
        const traveledPts: [number, number][] = [];
        const remainingPts: [number, number][] = [[pos.lat, pos.lng]];

        // Find which segment index the current progress falls on
        const dists = [0];
        for (let i = 1; i < route.length; i++) {
          dists.push(dists[i - 1] + distKm(route[i - 1], route[i]));
        }
        const totalDist = dists[dists.length - 1];
        const traveledDist = totalDist * progress;

        for (let i = 0; i < route.length; i++) {
          if (dists[i] <= traveledDist) {
            traveledPts.push([route[i].lat, route[i].lng]);
          } else {
            remainingPts.push([route[i].lat, route[i].lng]);
          }
        }
        traveledPts.push([pos.lat, pos.lng]);

        (traveledLayerRef.current as import("leaflet").Polyline)?.setLatLngs(traveledPts);
        (remainingLayerRef.current as import("leaflet").Polyline)?.setLatLngs(remainingPts);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    });

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentState.currentRoute, agentState.currentRouteMeta, previewMode]);

  // ── Surge zones ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      const map = mapRef.current as import("leaflet").Map;
      surgeLayersRef.current.forEach((l) => map.removeLayer(l as import("leaflet").Layer));
      surgeLayersRef.current = [];
      activeSurgeZones.forEach((zone) => {
        const circle = L.circle([zone.center.lat, zone.center.lng], {
          radius: zone.radiusKm * 1000,
          color: "#f97316",
          fillColor: "#f97316",
          fillOpacity: 0.15,
          weight: 2,
          dashArray: "6 4",
        }).addTo(map).bindTooltip(`⚡ ${zone.label}`);
        surgeLayersRef.current.push(circle);
      });
    });
  }, [activeSurgeZones]);

  // ── Road closures ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      const map = mapRef.current as import("leaflet").Map;
      closureLayersRef.current.forEach((l) => map.removeLayer(l as import("leaflet").Layer));
      closureLayersRef.current = [];
      activeClosures.forEach((closure) => {
        const poly = L.polyline(
          closure.coords.map((c) => [c.lat, c.lng] as [number, number]),
          { color: "#ef4444", weight: 8, opacity: 0.7, dashArray: "10 6" }
        ).addTo(map).bindTooltip(`🚧 ${closure.label}`);
        closureLayersRef.current.push(poly);
      });
    });
  }, [activeClosures]);

  return (
    <div
      id={mapId}
      className={className ?? "w-full h-72 sm:h-96 rounded-[1.25rem] overflow-hidden"}
    />
  );
}
