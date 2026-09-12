(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ShiftMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShiftMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/mapBounds.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Haversine distance in km between two coords
function distKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const sa = Math.sin(dLat / 2);
    const sb = Math.sin(dLng / 2);
    const c = sa * sa + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * sb * sb;
    return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}
// Interpolate a point at `progress` (0–1) along a route array
function interpolateRoute(route, progress) {
    if (!route.length) return {
        lat: 0,
        lng: 0
    };
    if (progress <= 0) return route[0];
    if (progress >= 1) return route[route.length - 1];
    // Precompute cumulative distances
    const dists = [
        0
    ];
    for(let i = 1; i < route.length; i++){
        dists.push(dists[i - 1] + distKm(route[i - 1], route[i]));
    }
    const total = dists[dists.length - 1];
    const target = total * progress;
    let seg = 0;
    while(seg < dists.length - 2 && dists[seg + 1] < target)seg++;
    const segLen = dists[seg + 1] - dists[seg];
    const t = segLen > 0 ? (target - dists[seg]) / segLen : 0;
    return {
        lat: route[seg].lat + (route[seg + 1].lat - route[seg].lat) * t,
        lng: route[seg].lng + (route[seg + 1].lng - route[seg].lng) * t
    };
}
function ShiftMap({ agentState, activeSurgeZones, activeClosures, agentColor, mapId }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const traveledLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const remainingLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pickupMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropoffMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const surgeLayersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const closureLayersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initializedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // ── Initialize map once ──────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShiftMap.useEffect": ()=>{
            if (initializedRef.current) return;
            initializedRef.current = true;
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "ShiftMap.useEffect": (L)=>{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    delete L.Icon.Default.prototype._getIconUrl;
                    L.Icon.Default.mergeOptions({
                        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
                    });
                    const bounds = L.latLngBounds([
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRITO_TEC_BOUNDS"].south,
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRITO_TEC_BOUNDS"].west
                    ], [
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRITO_TEC_BOUNDS"].north,
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRITO_TEC_BOUNDS"].east
                    ]);
                    const map = L.map(mapId, {
                        center: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRITO_TEC_CENTER"].lat,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISTRITO_TEC_CENTER"].lng
                        ],
                        zoom: 15,
                        minZoom: 14,
                        maxZoom: 18,
                        maxBounds: bounds,
                        maxBoundsViscosity: 1.0,
                        zoomControl: true,
                        attributionControl: false
                    });
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        maxZoom: 18
                    }).addTo(map);
                    const agentIcon = L.divIcon({
                        html: `<div style="
          width:22px;height:22px;border-radius:50%;
          background:${agentColor};
          border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.5);
          transition:background 0.2s;
        "></div>`,
                        className: "",
                        iconSize: [
                            22,
                            22
                        ],
                        iconAnchor: [
                            11,
                            11
                        ]
                    });
                    const marker = L.marker([
                        agentState.position.lat,
                        agentState.position.lng
                    ], {
                        icon: agentIcon,
                        zIndexOffset: 1000
                    }).addTo(map);
                    mapRef.current = map;
                    markerRef.current = marker;
                }
            }["ShiftMap.useEffect"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ShiftMap.useEffect"], [
        mapId
    ]);
    // ── Route animation loop ─────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShiftMap.useEffect": ()=>{
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
            }
            const route = agentState.currentRoute;
            const meta = agentState.currentRouteMeta;
            // No route / delivery done — snap marker to current position
            if (!route.length || !meta || !mapRef.current || !markerRef.current) {
                if (markerRef.current) {
                    markerRef.current.setLatLng([
                        agentState.position.lat,
                        agentState.position.lng
                    ]);
                }
                // Clear route lines
                __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                    "ShiftMap.useEffect": (L)=>{
                        const map = mapRef.current;
                        if (!map) return;
                        if (traveledLayerRef.current) {
                            map.removeLayer(traveledLayerRef.current);
                            traveledLayerRef.current = null;
                        }
                        if (remainingLayerRef.current) {
                            map.removeLayer(remainingLayerRef.current);
                            remainingLayerRef.current = null;
                        }
                        if (pickupMarkerRef.current) {
                            map.removeLayer(pickupMarkerRef.current);
                            pickupMarkerRef.current = null;
                        }
                        if (dropoffMarkerRef.current) {
                            map.removeLayer(dropoffMarkerRef.current);
                            dropoffMarkerRef.current = null;
                        }
                    }
                }["ShiftMap.useEffect"]);
                return;
            }
            // Draw initial route and pickup/dropoff markers
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "ShiftMap.useEffect": (L)=>{
                    const map = mapRef.current;
                    if (!map) return;
                    // Clear previous layers
                    [
                        traveledLayerRef,
                        remainingLayerRef,
                        pickupMarkerRef,
                        dropoffMarkerRef
                    ].forEach({
                        "ShiftMap.useEffect": (ref)=>{
                            if (ref.current) {
                                map.removeLayer(ref.current);
                                ref.current = null;
                            }
                        }
                    }["ShiftMap.useEffect"]);
                    // Remaining route (full route initially, bright)
                    remainingLayerRef.current = L.polyline(route.map({
                        "ShiftMap.useEffect": (c)=>[
                                c.lat,
                                c.lng
                            ]
                    }["ShiftMap.useEffect"]), {
                        color: agentColor,
                        weight: 4,
                        opacity: 0.85
                    }).addTo(map);
                    // Traveled portion (starts empty)
                    traveledLayerRef.current = L.polyline([], {
                        color: agentColor,
                        weight: 4,
                        opacity: 0.25,
                        dashArray: "4 4"
                    }).addTo(map);
                    // Pickup marker (green dot)
                    const pickupCoord = route[meta.pickupIndex] ?? route[0];
                    pickupMarkerRef.current = L.circleMarker([
                        pickupCoord.lat,
                        pickupCoord.lng
                    ], {
                        radius: 9,
                        color: "#22c55e",
                        fillColor: "#22c55e",
                        fillOpacity: 1,
                        weight: 2
                    }).addTo(map).bindTooltip(`📦 ${agentState.lastDecision?.pickupLabel ?? "Pickup"}`);
                    // Dropoff marker (red dot)
                    const dropoffCoord = route[route.length - 1];
                    dropoffMarkerRef.current = L.circleMarker([
                        dropoffCoord.lat,
                        dropoffCoord.lng
                    ], {
                        radius: 9,
                        color: "#ef4444",
                        fillColor: "#ef4444",
                        fillOpacity: 1,
                        weight: 2
                    }).addTo(map).bindTooltip(`🏠 ${agentState.lastDecision?.dropoffLabel ?? "Dropoff"}`);
                    // Start the rAF animation
                    const { startedAt, durationMs } = meta;
                    const tick = {
                        "ShiftMap.useEffect.tick": ()=>{
                            if (!markerRef.current || !mapRef.current) return;
                            const elapsed = Date.now() - startedAt;
                            const progress = Math.min(elapsed / durationMs, 1);
                            // Interpolated position on the route
                            const pos = interpolateRoute(route, progress);
                            markerRef.current.setLatLng([
                                pos.lat,
                                pos.lng
                            ]);
                            // Split route into traveled (0→progress) and remaining (progress→1)
                            // Build the traveled segment: all points up to current + interpolated point
                            const traveledPts = [];
                            const remainingPts = [
                                [
                                    pos.lat,
                                    pos.lng
                                ]
                            ];
                            // Find which segment index the current progress falls on
                            const dists = [
                                0
                            ];
                            for(let i = 1; i < route.length; i++){
                                dists.push(dists[i - 1] + distKm(route[i - 1], route[i]));
                            }
                            const totalDist = dists[dists.length - 1];
                            const traveledDist = totalDist * progress;
                            for(let i = 0; i < route.length; i++){
                                if (dists[i] <= traveledDist) {
                                    traveledPts.push([
                                        route[i].lat,
                                        route[i].lng
                                    ]);
                                } else {
                                    remainingPts.push([
                                        route[i].lat,
                                        route[i].lng
                                    ]);
                                }
                            }
                            traveledPts.push([
                                pos.lat,
                                pos.lng
                            ]);
                            traveledLayerRef.current?.setLatLngs(traveledPts);
                            remainingLayerRef.current?.setLatLngs(remainingPts);
                            if (progress < 1) {
                                animFrameRef.current = requestAnimationFrame(tick);
                            }
                        }
                    }["ShiftMap.useEffect.tick"];
                    animFrameRef.current = requestAnimationFrame(tick);
                }
            }["ShiftMap.useEffect"]);
            return ({
                "ShiftMap.useEffect": ()=>{
                    if (animFrameRef.current) {
                        cancelAnimationFrame(animFrameRef.current);
                        animFrameRef.current = null;
                    }
                }
            })["ShiftMap.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ShiftMap.useEffect"], [
        agentState.currentRoute,
        agentState.currentRouteMeta
    ]);
    // ── Surge zones ──────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShiftMap.useEffect": ()=>{
            if (!mapRef.current) return;
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "ShiftMap.useEffect": (L)=>{
                    const map = mapRef.current;
                    surgeLayersRef.current.forEach({
                        "ShiftMap.useEffect": (l)=>map.removeLayer(l)
                    }["ShiftMap.useEffect"]);
                    surgeLayersRef.current = [];
                    activeSurgeZones.forEach({
                        "ShiftMap.useEffect": (zone)=>{
                            const circle = L.circle([
                                zone.center.lat,
                                zone.center.lng
                            ], {
                                radius: zone.radiusKm * 1000,
                                color: "#f97316",
                                fillColor: "#f97316",
                                fillOpacity: 0.15,
                                weight: 2,
                                dashArray: "6 4"
                            }).addTo(map).bindTooltip(`⚡ ${zone.label}`);
                            surgeLayersRef.current.push(circle);
                        }
                    }["ShiftMap.useEffect"]);
                }
            }["ShiftMap.useEffect"]);
        }
    }["ShiftMap.useEffect"], [
        activeSurgeZones
    ]);
    // ── Road closures ────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShiftMap.useEffect": ()=>{
            if (!mapRef.current) return;
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "ShiftMap.useEffect": (L)=>{
                    const map = mapRef.current;
                    closureLayersRef.current.forEach({
                        "ShiftMap.useEffect": (l)=>map.removeLayer(l)
                    }["ShiftMap.useEffect"]);
                    closureLayersRef.current = [];
                    activeClosures.forEach({
                        "ShiftMap.useEffect": (closure)=>{
                            const poly = L.polyline(closure.coords.map({
                                "ShiftMap.useEffect.poly": (c)=>[
                                        c.lat,
                                        c.lng
                                    ]
                            }["ShiftMap.useEffect.poly"]), {
                                color: "#ef4444",
                                weight: 8,
                                opacity: 0.7,
                                dashArray: "10 6"
                            }).addTo(map).bindTooltip(`🚧 ${closure.label}`);
                            closureLayersRef.current.push(poly);
                        }
                    }["ShiftMap.useEffect"]);
                }
            }["ShiftMap.useEffect"]);
        }
    }["ShiftMap.useEffect"], [
        activeClosures
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: mapId,
        className: "w-full h-96 rounded-xl overflow-hidden border border-white/10"
    }, void 0, false, {
        fileName: "[project]/components/ShiftMap.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_s(ShiftMap, "mK3EQ9hwxm7y4y5Vq/N1VUh7RFI=");
_c = ShiftMap;
var _c;
__turbopack_context__.k.register(_c, "ShiftMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ShiftMap.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/ShiftMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_ShiftMap_tsx_05d6fxm._.js.map