module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/routing/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$osrm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/routing/osrm.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$googleMaps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/routing/googleMaps.ts [app-route] (ecmascript)");
;
;
;
let _routingModeLogged = false;
async function POST(req) {
    const { from, to, departureTime } = await req.json();
    if (!from || !to) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing from/to coords"
        }, {
            status: 400
        });
    }
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!_routingModeLogged) {
        _routingModeLogged = true;
        if (mapsKey) {
            console.log("🗺️  [routing] Google Maps API key detected — using traffic-aware routing");
        } else {
            console.log("🗺️  [routing] No GOOGLE_MAPS_API_KEY — using OSRM (no live traffic)");
        }
    }
    // Use Google Maps (with simulated-time traffic) when the key is configured
    if (mapsKey) {
        try {
            const route = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$googleMaps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchRouteWithTraffic"])(from, to, mapsKey, departureTime);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...route,
                source: "google"
            });
        } catch (err) {
            console.warn(`⚠️  [routing] Google Maps failed (${err.message}) — falling back to OSRM`);
        }
    }
    // Fallback: OSRM (no traffic, always free)
    const route = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$osrm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchRoute"])(from, to);
    console.log(`🗺️  [routing] OSRM — ${route.km} km, ${route.minutes} min`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ...route,
        source: "osrm"
    });
}
}),
"[project]/lib/routing/googleMaps.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchRouteWithTraffic",
    ()=>fetchRouteWithTraffic
]);
const DIRECTIONS_BASE = "https://maps.googleapis.com/maps/api/directions/json";
// In-memory cache keyed by coords + departure hour so traffic varies by time of day
const routeCache = new Map();
function cacheKey(from, to, departureHour) {
    return `${from.lat.toFixed(4)},${from.lng.toFixed(4)}->${to.lat.toFixed(4)},${to.lng.toFixed(4)}@h${departureHour}`;
}
/**
 * Decode a Google Maps encoded polyline into {lat, lng} pairs.
 */ function decodePolyline(encoded) {
    const coords = [];
    let index = 0;
    let lat = 0;
    let lng = 0;
    while(index < encoded.length){
        let result = 0;
        let shift = 0;
        let byte;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        }while (byte >= 0x20)
        lat += result & 1 ? ~(result >> 1) : result >> 1;
        result = 0;
        shift = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        }while (byte >= 0x20)
        lng += result & 1 ? ~(result >> 1) : result >> 1;
        coords.push({
            lat: lat / 1e5,
            lng: lng / 1e5
        });
    }
    return coords;
}
async function fetchRouteWithTraffic(from, to, apiKey, /** Unix seconds for the simulated departure time. Falls back to "now". */ departureTime) {
    // Round to the hour so we don't create a new cache entry every simulated minute
    const deptHour = departureTime ? Math.floor(departureTime / 3600) : Math.floor(Date.now() / 3_600_000);
    const key = cacheKey(from, to, deptHour);
    const cached = routeCache.get(key);
    if (cached) return cached;
    // Google Maps requires departure_time to be an integer unix timestamp OR "now"
    const deptParam = departureTime ? String(departureTime) : "now";
    const params = new URLSearchParams({
        origin: `${from.lat},${from.lng}`,
        destination: `${to.lat},${to.lng}`,
        departure_time: deptParam,
        traffic_model: "best_guess",
        key: apiKey
    });
    const url = `${DIRECTIONS_BASE}?${params}`;
    const res = await fetch(url, {
        signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) throw new Error(`Google Maps HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== "OK" || !data.routes.length) {
        throw new Error(`Google Maps status: ${data.status}`);
    }
    const leg = data.routes[0].legs[0];
    const polyline = data.routes[0].overview_polyline.points;
    const coords = decodePolyline(polyline);
    const km = Math.round(leg.distance.value / 1000 * 10) / 10;
    // Prefer traffic-aware duration when available
    const hasLiveTraffic = leg.duration_in_traffic !== undefined;
    const durationSeconds = hasLiveTraffic ? leg.duration_in_traffic.value : leg.duration.value;
    const minutes = Math.round(durationSeconds / 60);
    const deptLabel = deptParam === "now" ? "now" : new Date(departureTime * 1000).toLocaleString("en-US", {
        timeZone: "America/Monterrey",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
    const trafficTag = hasLiveTraffic ? "🚦 live traffic" : "⚠️  no traffic data";
    console.log(`✅ [googleMaps] ${km} km · ${minutes} min · ${trafficTag} · departs ${deptLabel}`);
    const result = {
        coords,
        km,
        minutes
    };
    routeCache.set(key, result);
    return result;
}
}),
"[project]/lib/routing/osrm.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchRoute",
    ()=>fetchRoute
]);
const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";
// Simple in-memory cache keyed by "lat1,lng1->lat2,lng2"
const routeCache = new Map();
function cacheKey(from, to) {
    return `${from.lat.toFixed(4)},${from.lng.toFixed(4)}->${to.lat.toFixed(4)},${to.lng.toFixed(4)}`;
}
async function fetchRoute(from, to) {
    const key = cacheKey(from, to);
    const cached = routeCache.get(key);
    if (cached) return cached;
    const url = `${OSRM_BASE}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    try {
        const res = await fetch(url, {
            signal: AbortSignal.timeout(5000)
        });
        if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`);
        const data = await res.json();
        if (data.code !== "Ok" || !data.routes.length) throw new Error("No route found");
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map(([lng, lat])=>({
                lat,
                lng
            }));
        const km = Math.round(route.distance / 1000 * 10) / 10;
        const minutes = Math.round(route.duration / 60);
        const result = {
            coords,
            km,
            minutes
        };
        routeCache.set(key, result);
        return result;
    } catch  {
        // Fallback: straight line
        return {
            coords: [
                from,
                to
            ],
            km: Math.round(haversineKm(from, to) * 1.4 * 10) / 10,
            minutes: Math.round(haversineKm(from, to) * 1.4 / 25 * 60)
        };
    }
}
function haversineKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const sinLat = Math.sin(dLat / 2);
    const sinLng = Math.sin(dLng / 2);
    const c = sinLat * sinLat + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * sinLng * sinLng;
    return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16mfl7c._.js.map