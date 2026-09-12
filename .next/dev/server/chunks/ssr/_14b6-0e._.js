module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useShift$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useShift.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DualAgentView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DualAgentView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ShiftSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ShiftSummary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/economics.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Home() {
    const { shift, currentOrder, orderExpiry, isSmartDeciding, speed, setSpeed, simulatedNow, startShift, resetShift } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useShift$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShift"])();
    const [capacity, setCapacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CAPACITY"]);
    if (shift.status === "ended") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-[#0a0a14]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ShiftSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                shift: shift,
                onReset: resetShift
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#0a0a14]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "land-item land-d0 border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: "🛵"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-display font-black text-white text-xl uppercase tracking-wide",
                                children: "Courier"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white/30 border border-white/10 px-2 py-0.5 rounded-full",
                                children: "HackMTY 2026"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            shift.status === "running" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetShift,
                                className: "text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 border border-white/10 rounded-lg",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            shift.status === "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>startShift(),
                                className: "px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-colors",
                                children: "Start Shift"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-4 py-6",
                children: shift.status === "idle" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IdleScreen, {
                    onStart: ()=>startShift(),
                    capacity: capacity,
                    onCapacityChange: setCapacity
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DualAgentView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    shift: shift,
                    currentOrder: currentOrder,
                    orderExpiry: orderExpiry,
                    isSmartDeciding: isSmartDeciding,
                    speed: speed,
                    setSpeed: setSpeed,
                    simulatedNow: simulatedNow
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function IdleScreen({ onStart, capacity, onCapacityChange }) {
    const caps = Array.from({
        length: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CAPACITY_MAX"] - __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CAPACITY_MIN"] + 1
    }, (_, i)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CAPACITY_MIN"] + i);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-[80vh] text-center gap-8 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "land-item land-d0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "scooter-float text-6xl select-none",
                    role: "img",
                    "aria-label": "scooter",
                    children: "🛵"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "land-item land-d1 font-display text-6xl md:text-7xl font-black text-white leading-none tracking-tight uppercase",
                        children: [
                            "Can AI beat a",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 107,
                                columnNumber: 24
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-400",
                                children: "Monterrey courier?"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "land-item land-d2 text-white/50 text-lg max-w-[44ch] mx-auto leading-relaxed",
                        children: "Two agents. One 4-hour shift. Real Distrito Tec streets. Crisis hits at mid-shift — watch who adapts and who doesn't."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "land-item land-d3 flex flex-wrap justify-center gap-3",
                children: [
                    {
                        icon: "⚡",
                        label: "Surge zones at mid-shift (T+2h)"
                    },
                    {
                        icon: "🚧",
                        label: "Road closure at T+2h 10min"
                    },
                    {
                        icon: "📦",
                        label: "500 real Distrito Tec orders"
                    },
                    {
                        icon: "🎛️",
                        label: "Adjustable speed: up to 300×"
                    }
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-2 text-sm text-white/60 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 hover:text-white/80 transition-colors duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this),
                            item.label
                        ]
                    }, item.label, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "land-item land-d4 bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/40 uppercase tracking-wider mb-3",
                        children: [
                            "Vehicle capacity — ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vehicleLabelForCapacity"])(capacity),
                            " (",
                            capacity,
                            " packages)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between gap-2",
                        children: caps.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onCapacityChange(c),
                                className: `w-10 h-10 rounded-lg text-sm font-bold transition-colors ${c === capacity ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"}`,
                                children: c
                            }, c, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-white/30 mt-3",
                        children: [
                            "Higher capacity = more orders per run, higher fuel costs. Default: ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CAPACITY"],
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "land-item-scale land-d6 flex flex-col items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onStart,
                        className: "\n            group relative px-12 py-4 bg-blue-600 text-white text-lg font-black rounded-2xl\n            transition-all duration-150\n            hover:bg-blue-500\n            active:scale-[0.97] active:bg-blue-700\n            hover:scale-[1.03]\n            focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400\n          ",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative inline-flex items-center gap-2",
                            children: [
                                "Start Shift",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "transition-transform duration-200 group-hover:translate-x-1",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/20 text-xs",
                        children: "Infosys Challenge Track · HackMTY 2026 · Monterrey, NL"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/AgentPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AgentPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EarningsTicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/EarningsTicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/economics.ts [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
const ShiftMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/ShiftMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
// Live progress bar driven by rAF — no React state updates on every frame
function DeliveryProgress({ meta, pickupLabel, dropoffLabel, accentColor }) {
    const [pct, setPct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const tick = ()=>{
            const elapsed = Date.now() - meta.startedAt;
            const next = Math.min(elapsed / meta.durationMs * 100, 100);
            setPct(next);
            if (next < 100) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return ()=>{
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [
        meta
    ]);
    const phase = pct < meta.pickupIndex / Math.max(1, 100) * 100 ? "heading to pickup" : "delivering";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-white/10 bg-white/5 rounded-xl p-4 text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/60 font-medium",
                        children: [
                            "🛵 ",
                            phase === "heading to pickup" ? `To pickup: ${pickupLabel}` : `Delivering to ${dropoffLabel}`
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/40 tabular-nums",
                        children: [
                            Math.round(pct),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 bg-white/10 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-none",
                    style: {
                        width: `${pct}%`,
                        backgroundColor: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/components/AgentPanel.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AgentPanel.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function AgentPanel({ agentState, activeSurgeZones, activeClosures, label, accentColor, mapId, elapsedSeconds, isDeciding = false }) {
    const lastDecision = agentState.lastDecision;
    // Full history, newest first
    const fullHistory = [
        ...agentState.decisionHistory
    ].reverse();
    const acceptRate = agentState.acceptCount + agentState.skipCount > 0 ? Math.round(agentState.acceptCount / (agentState.acceptCount + agentState.skipCount) * 100) : 0;
    const elapsedMin = Math.max(elapsedSeconds / 60, 1 / 60);
    const netPerMin = agentState.netEarnings / elapsedMin;
    const vehicle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vehicleLabelForCapacity"])(agentState.capacity);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-3 h-3 rounded-full ring-2 ring-white/20",
                        style: {
                            backgroundColor: accentColor
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-display text-xl font-black text-white uppercase tracking-wide",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    isDeciding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"
                            }, void 0, false, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            "thinking…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    !isDeciding && agentState.isMoving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full animate-pulse",
                        children: "on route…"
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 border border-white/10 rounded-xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/50 uppercase tracking-wider mb-1",
                        children: "Net Earnings"
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EarningsTicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        value: agentState.netEarnings,
                        className: "font-display text-4xl font-black text-white tabular-nums"
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/40 mt-1",
                        children: [
                            "Gross $",
                            agentState.earnings,
                            " · ",
                            vehicle,
                            " (",
                            agentState.capacity,
                            " cap) ·",
                            " ",
                            agentState.expenses.fuelLiters.toFixed(1),
                            " L fuel"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex gap-4 text-sm text-white/60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    agentState.ordersCompleted,
                                    " orders"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    agentState.kmDriven,
                                    " km"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "$",
                                    netPerMin.toFixed(1),
                                    "/min"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    acceptRate,
                                    "% accept"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex gap-4 text-xs text-white/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Fuel $",
                                    agentState.expenses.fuelMxn.toFixed(1)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Maint $",
                                    agentState.expenses.maintenanceMxn.toFixed(1)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Tips $",
                                    agentState.tipsEarned
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Bonus $",
                                    agentState.batchBonusEarned
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            agentState.carriedOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 border border-white/10 rounded-xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-white/50 uppercase tracking-wider",
                                children: "Carried load"
                            }, void 0, false, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white/40",
                                children: [
                                    agentState.carriedOrders.length,
                                    "/",
                                    agentState.capacity,
                                    " capacity"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: agentState.carriedOrders.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs text-white/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: c.pickedUp ? "w-1.5 h-1.5 rounded-full bg-green-400" : "w-1.5 h-1.5 rounded-full bg-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AgentPanel.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: [
                                            c.pickedUp ? "▼" : "▲",
                                            " ",
                                            c.order.dropoffLabel,
                                            " · $",
                                            c.order.payout
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AgentPanel.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, c.order.id, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    agentState.expenses.fuelMxn + agentState.expenses.maintenanceMxn > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-white/40",
                        children: [
                            "Total expenses $",
                            (agentState.expenses.fuelMxn + agentState.expenses.maintenanceMxn).toFixed(1),
                            " MXN"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShiftMap, {
                agentState: agentState,
                activeSurgeZones: activeSurgeZones,
                activeClosures: activeClosures,
                agentColor: accentColor,
                mapId: mapId
            }, void 0, false, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            agentState.currentRouteMeta && lastDecision?.decision === "accept" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeliveryProgress, {
                meta: agentState.currentRouteMeta,
                pickupLabel: lastDecision.pickupLabel,
                dropoffLabel: lastDecision.dropoffLabel,
                accentColor: accentColor
            }, void 0, false, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this),
            lastDecision && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `border rounded-xl p-4 text-sm ${lastDecision.decision === "accept" ? "border-green-500/30 bg-green-950/30" : "border-white/10 bg-white/5"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-bold text-xs uppercase tracking-wider ${lastDecision.decision === "accept" ? "text-green-400" : "text-white/50"}`,
                                children: lastDecision.decision === "accept" ? "✓ Accepted" : "✗ Skipped"
                            }, void 0, false, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white/30",
                                children: [
                                    Math.round(lastDecision.confidence * 100),
                                    "% confidence"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/80 leading-snug",
                        children: lastDecision.reason
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this),
            fullHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/30 uppercase tracking-wider",
                        children: [
                            "Decision history (",
                            fullHistory.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-y-auto max-h-64 pr-1 space-y-1.5 scrollbar-thin",
                        children: fullHistory.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-lg p-3 text-xs border ${d.decision === "accept" ? "border-green-500/20 bg-green-950/20" : "border-white/5 bg-white/3"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `mt-0.5 shrink-0 font-bold ${d.decision === "accept" ? "text-green-400" : "text-white/30"}`,
                                                children: d.decision === "accept" ? "✓" : "✗"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AgentPanel.tsx",
                                                lineNumber: 241,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/80 font-medium truncate",
                                                        children: d.pickupLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AgentPanel.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/40 truncate",
                                                        children: [
                                                            "→ ",
                                                            d.dropoffLabel
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AgentPanel.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AgentPanel.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AgentPanel.tsx",
                                        lineNumber: 240,
                                        columnNumber: 17
                                    }, this),
                                    d.decision === "accept" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex items-center gap-3 pl-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/40",
                                                children: [
                                                    "~",
                                                    d.estimatedMinutes,
                                                    " min"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AgentPanel.tsx",
                                                lineNumber: 257,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-400 font-semibold",
                                                children: [
                                                    "+$",
                                                    d.payout,
                                                    " MXN"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AgentPanel.tsx",
                                                lineNumber: 260,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AgentPanel.tsx",
                                        lineNumber: 256,
                                        columnNumber: 19
                                    }, this),
                                    d.decision === "skip" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1.5 pl-5 text-white/30 italic leading-snug",
                                        children: d.reason
                                    }, void 0, false, {
                                        fileName: "[project]/components/AgentPanel.tsx",
                                        lineNumber: 268,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, `${d.orderId}-${i}`, true, {
                                fileName: "[project]/components/AgentPanel.tsx",
                                lineNumber: 231,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AgentPanel.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AgentPanel.tsx",
                lineNumber: 224,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AgentPanel.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/DualAgentView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DualAgentView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AgentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AgentPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderPing$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OrderPing.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EventAlert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/EventAlert.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const SPEED_OPTIONS = [
    1,
    10,
    30,
    60,
    120,
    300
];
/** Format simulated seconds into H:MM */ function formatSimTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, "0");
    return `${h}:${m}`;
}
/** Format a unix-ms timestamp into "Mon · 08:23 AM" (Monterrey time) */ function formatSimClock(ms) {
    return new Date(ms).toLocaleString("en-US", {
        timeZone: "America/Monterrey",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}
function DualAgentView({ shift, currentOrder, orderExpiry, isSmartDeciding = false, speed, setSpeed, simulatedNow }) {
    const elapsed = shift.elapsedSeconds;
    const remaining = shift.durationSeconds - elapsed;
    const progress = elapsed / shift.durationSeconds * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 border border-white/10 rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-green-400 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/DualAgentView.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display uppercase tracking-wide text-sm font-bold text-white/60",
                                                children: "Live Shift"
                                            }, void 0, false, {
                                                fileName: "[project]/components/DualAgentView.tsx",
                                                lineNumber: 62,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DualAgentView.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full",
                                        children: [
                                            "🕐 ",
                                            formatSimClock(simulatedNow)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DualAgentView.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DualAgentView.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display font-black text-3xl text-white tabular-nums",
                                                children: formatSimTime(remaining)
                                            }, void 0, false, {
                                                fileName: "[project]/components/DualAgentView.tsx",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white/40 ml-1",
                                                children: "remaining"
                                            }, void 0, false, {
                                                fileName: "[project]/components/DualAgentView.tsx",
                                                lineNumber: 78,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DualAgentView.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white/30 uppercase tracking-wider mr-1",
                                                children: "Speed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/DualAgentView.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this),
                                            SPEED_OPTIONS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSpeed(s),
                                                    className: `text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${speed === s ? "bg-blue-600 text-white" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"}`,
                                                    children: [
                                                        s,
                                                        "×"
                                                    ]
                                                }, s, true, {
                                                    fileName: "[project]/components/DualAgentView.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/DualAgentView.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/DualAgentView.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/DualAgentView.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 bg-white/10 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-blue-500 rounded-full transition-all duration-1000",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/DualAgentView.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/DualAgentView.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    (shift.activeSurgeZones.length > 0 || shift.activeClosures.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-2",
                        children: [
                            shift.activeSurgeZones.map((z)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30",
                                    children: [
                                        "⚡ ",
                                        z.label
                                    ]
                                }, z.id, true, {
                                    fileName: "[project]/components/DualAgentView.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this)),
                            shift.activeClosures.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30",
                                    children: [
                                        "🚧 ",
                                        c.label
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/components/DualAgentView.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/DualAgentView.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/DualAgentView.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            currentOrder && orderExpiry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OrderPing$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                order: currentOrder,
                expiresAt: orderExpiry,
                carriedCount: shift.smartAgent.carriedOrders.length,
                capacity: shift.capacity
            }, void 0, false, {
                fileName: "[project]/components/DualAgentView.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EventAlert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                events: shift.eventLog
            }, void 0, false, {
                fileName: "[project]/components/DualAgentView.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 border border-blue-500/20 rounded-2xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AgentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            agentState: shift.smartAgent,
                            activeSurgeZones: shift.activeSurgeZones,
                            activeClosures: shift.activeClosures,
                            label: "Smart Agent (AI)",
                            accentColor: "#3b82f6",
                            mapId: "map-smart",
                            elapsedSeconds: elapsed,
                            isDeciding: isSmartDeciding
                        }, void 0, false, {
                            fileName: "[project]/components/DualAgentView.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/DualAgentView.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 border border-white/10 rounded-2xl p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AgentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            agentState: shift.baselineAgent,
                            activeSurgeZones: shift.activeSurgeZones,
                            activeClosures: shift.activeClosures,
                            label: "Baseline (Greedy)",
                            accentColor: "#6b7280",
                            mapId: "map-baseline",
                            elapsedSeconds: elapsed
                        }, void 0, false, {
                            fileName: "[project]/components/DualAgentView.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/DualAgentView.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/DualAgentView.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/DualAgentView.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/EarningsTicker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EarningsTicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function EarningsTicker({ value, className = "" }) {
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value);
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fromRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const from = fromRef.current;
        const to = value;
        if (from === to) return;
        const duration = 600;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        startRef.current = null;
        const animate = (ts)=>{
            if (!startRef.current) startRef.current = ts;
            const elapsed = ts - startRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplayValue(Math.round(from + (to - from) * eased));
            if (progress < 1) {
                animRef.current = requestAnimationFrame(animate);
            } else {
                fromRef.current = to;
            }
        };
        animRef.current = requestAnimationFrame(animate);
        return ()=>{
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: [
            "$",
            displayValue.toLocaleString(),
            " MXN"
        ]
    }, void 0, true, {
        fileName: "[project]/components/EarningsTicker.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/EventAlert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const EVENT_ICONS = {
    surge: "⚡",
    closure: "🚧",
    order: "📦"
};
const EVENT_COLORS = {
    surge: "text-amber-300 border-amber-500/30 bg-amber-950/40",
    closure: "text-red-300 border-red-500/30 bg-red-950/40",
    order: "text-white/70 border-white/10 bg-white/5"
};
function EventAlert({ events }) {
    const significant = events.filter((e)=>e.type !== "order").slice(0, 3);
    if (significant.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: significant.map((event, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${EVENT_COLORS[event.type]}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: EVENT_ICONS[event.type]
                    }, void 0, false, {
                        fileName: "[project]/components/EventAlert.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: event.label
                    }, void 0, false, {
                        fileName: "[project]/components/EventAlert.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/EventAlert.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/EventAlert.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/OrderPing.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderPing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function OrderPing({ order, expiresAt, carriedCount = 0, capacity = 4 }) {
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
            setTimeLeft(remaining);
            if (remaining === 0) clearInterval(interval);
        }, 250);
        return ()=>clearInterval(interval);
    }, [
        expiresAt
    ]);
    const urgency = timeLeft <= 5 ? "border-red-500/60 bg-red-950/40" : "border-amber-500/40 bg-amber-950/30";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border rounded-xl p-4 animate-pulse-once transition-colors ${urgency}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-amber-400 uppercase tracking-wider",
                        children: "📦 New Order Ping"
                    }, void 0, false, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    carriedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full",
                        children: [
                            "stackable · ",
                            carriedCount,
                            "/",
                            capacity,
                            " carried"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-bold tabular-nums ${timeLeft <= 5 ? "text-red-400" : "text-amber-300"}`,
                        children: [
                            timeLeft,
                            "s"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrderPing.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-400",
                                children: "▲"
                            }, void 0, false, {
                                fileName: "[project]/components/OrderPing.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80",
                                children: order.pickupLabel
                            }, void 0, false, {
                                fileName: "[project]/components/OrderPing.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-400",
                                children: "▼"
                            }, void 0, false, {
                                fileName: "[project]/components/OrderPing.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80",
                                children: order.dropoffLabel
                            }, void 0, false, {
                                fileName: "[project]/components/OrderPing.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrderPing.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xl font-bold ${order.isSurge ? "text-amber-300" : "text-white"}`,
                        children: [
                            "$",
                            order.payout,
                            " MXN",
                            order.isSurge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 text-xs font-semibold text-amber-400",
                                children: "⚡ SURGE"
                            }, void 0, false, {
                                fileName: "[project]/components/OrderPing.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/50 text-xs",
                        children: [
                            order.estimatedKm,
                            " km · ",
                            order.estimatedMinutes,
                            " min"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OrderPing.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OrderPing.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 h-1 bg-white/10 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full bg-amber-400 rounded-full transition-all duration-250",
                    style: {
                        width: `${timeLeft / 15 * 100}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/OrderPing.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/OrderPing.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/OrderPing.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ShiftSummary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShiftSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
"use client";
;
;
function mergeEarningsHistory(smart, baseline) {
    const times = Array.from(new Set([
        ...smart.map((p)=>p.at),
        ...baseline.map((p)=>p.at)
    ])).sort((a, b)=>a - b);
    let sg = 0;
    let bg = 0;
    let si = 0;
    let bi = 0;
    return times.map((t)=>{
        while(si < smart.length && smart[si].at <= t){
            sg = smart[si].net;
            si++;
        }
        while(bi < baseline.length && baseline[bi].at <= t){
            bg = baseline[bi].net;
            bi++;
        }
        return {
            t,
            smart: sg,
            baseline: bg
        };
    });
}
function ShiftSummary({ shift, onReset }) {
    const smart = shift.smartAgent;
    const baseline = shift.baselineAgent;
    const smartNet = smart.netEarnings;
    const baselineNet = baseline.netEarnings;
    const netImprovement = baselineNet > 0 ? Math.round((smartNet - baselineNet) / baselineNet * 100) : smartNet > 0 ? 100 : 0;
    const chartData = [
        {
            name: "Net Earnings (MXN)",
            "Smart Agent": smartNet,
            Baseline: baselineNet
        },
        {
            name: "Gross Earnings",
            "Smart Agent": smart.earnings,
            Baseline: baseline.earnings
        },
        {
            name: "Orders Completed",
            "Smart Agent": smart.ordersCompleted,
            Baseline: baseline.ordersCompleted
        },
        {
            name: "Fuel (L)",
            "Smart Agent": Math.round(smart.expenses.fuelLiters),
            Baseline: Math.round(baseline.expenses.fuelLiters)
        }
    ];
    const elapsedMin = Math.max(shift.elapsedSeconds / 60, 1 / 60);
    const smartNetPerMin = smartNet / elapsedMin;
    const baselineNetPerMin = baselineNet / elapsedMin;
    const historyData = mergeEarningsHistory(smart.earningsHistory, baseline.earningsHistory);
    const stats = [
        {
            label: "Net Earnings",
            smart: `$${smartNet.toFixed(0)} MXN`,
            baseline: `$${baselineNet.toFixed(0)} MXN`
        },
        {
            label: "Gross Earnings",
            smart: `$${smart.earnings} MXN`,
            baseline: `$${baseline.earnings} MXN`
        },
        {
            label: "Net / min",
            smart: `$${smartNetPerMin.toFixed(1)}`,
            baseline: `$${baselineNetPerMin.toFixed(1)}`
        },
        {
            label: "Orders Completed",
            smart: smart.ordersCompleted,
            baseline: baseline.ordersCompleted
        },
        {
            label: "Km Driven",
            smart: `${smart.kmDriven} km`,
            baseline: `${baseline.kmDriven} km`
        },
        {
            label: "Fuel / Maint",
            smart: `$${smart.expenses.fuelMxn.toFixed(0)} / $${smart.expenses.maintenanceMxn.toFixed(0)}`,
            baseline: `$${baseline.expenses.fuelMxn.toFixed(0)} / $${baseline.expenses.maintenanceMxn.toFixed(0)}`
        },
        {
            label: "Tips / Batch Bonus",
            smart: `$${smart.tipsEarned} / $${smart.batchBonusEarned}`,
            baseline: `$${baseline.tipsEarned} / $${baseline.batchBonusEarned}`
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto space-y-8 py-8 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-white mb-2",
                        children: "Shift Complete"
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/50",
                        children: [
                            Math.round(shift.durationSeconds / 60),
                            "-minute shift · capacity",
                            " ",
                            shift.capacity
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-2xl p-6 text-center border ${smartNet >= baselineNet ? "bg-blue-950/50 border-blue-500/30" : "bg-white/5 border-white/10"}`,
                children: smartNet > baselineNet ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-blue-300 font-semibold text-lg mb-1",
                            children: "🏆 Smart Agent wins"
                        }, void 0, false, {
                            fileName: "[project]/components/ShiftSummary.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/70",
                            children: [
                                "+",
                                netImprovement,
                                "% more net earnings ($",
                                (smartNet - baselineNet).toFixed(0),
                                " MXN extra)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ShiftSummary.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ShiftSummary.tsx",
                    lineNumber: 149,
                    columnNumber: 11
                }, this) : smartNet === baselineNet ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/70 font-semibold text-lg",
                    children: "Tie — equal net this shift"
                }, void 0, false, {
                    fileName: "[project]/components/ShiftSummary.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-amber-300 font-semibold text-lg mb-1",
                            children: "Baseline wins this shift"
                        }, void 0, false, {
                            fileName: "[project]/components/ShiftSummary.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/70",
                            children: "Smart Agent is still learning this route pattern."
                        }, void 0, false, {
                            fileName: "[project]/components/ShiftSummary.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ShiftSummary.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: stats.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 border border-white/10 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-white/40 uppercase tracking-wider mb-3",
                                children: row.label
                            }, void 0, false, {
                                fileName: "[project]/components/ShiftSummary.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-blue-400 mb-1",
                                                children: "Smart"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShiftSummary.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-white",
                                                children: row.smart
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShiftSummary.tsx",
                                                lineNumber: 173,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ShiftSummary.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-white/40 mb-1",
                                                children: "Baseline"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShiftSummary.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-white/60",
                                                children: row.baseline
                                            }, void 0, false, {
                                                fileName: "[project]/components/ShiftSummary.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ShiftSummary.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ShiftSummary.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        ]
                    }, row.label, true, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 border border-white/10 rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-white/60 uppercase tracking-wider mb-4",
                        children: "Performance Comparison"
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 220,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: chartData,
                            margin: {
                                top: 0,
                                right: 0,
                                left: -10,
                                bottom: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    stroke: "rgba(255,255,255,0.08)"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "name",
                                    tick: {
                                        fill: "rgba(255,255,255,0.5)",
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tick: {
                                        fill: "rgba(255,255,255,0.5)",
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        background: "#1a1a2e",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        color: "white"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                    wrapperStyle: {
                                        color: "rgba(255,255,255,0.6)",
                                        fontSize: 12
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "Smart Agent",
                                    fill: "#3b82f6",
                                    radius: [
                                        4,
                                        4,
                                        0,
                                        0
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "Baseline",
                                    fill: "rgba(255,255,255,0.2)",
                                    radius: [
                                        4,
                                        4,
                                        0,
                                        0
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ShiftSummary.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            historyData.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 border border-white/10 rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-white/60 uppercase tracking-wider mb-4",
                        children: "Cumulative Net Earnings Over Time"
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 220,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineChart"], {
                            data: historyData,
                            margin: {
                                top: 0,
                                right: 0,
                                left: -10,
                                bottom: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    stroke: "rgba(255,255,255,0.08)"
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "t",
                                    tick: {
                                        fill: "rgba(255,255,255,0.5)",
                                        fontSize: 11
                                    },
                                    tickFormatter: (v)=>`${Math.floor(v / 60)}m`
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                    tick: {
                                        fill: "rgba(255,255,255,0.5)",
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        background: "#1a1a2e",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        color: "white"
                                    },
                                    labelFormatter: (v)=>`t+${v}s`
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Legend"], {
                                    wrapperStyle: {
                                        color: "rgba(255,255,255,0.6)",
                                        fontSize: 12
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "smart",
                                    name: "Smart Agent",
                                    stroke: "#3b82f6",
                                    strokeWidth: 2,
                                    dot: false
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                                    type: "monotone",
                                    dataKey: "baseline",
                                    name: "Baseline",
                                    stroke: "rgba(255,255,255,0.4)",
                                    strokeWidth: 2,
                                    dot: false
                                }, void 0, false, {
                                    fileName: "[project]/components/ShiftSummary.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ShiftSummary.tsx",
                            lineNumber: 216,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this),
            shift.eventLog.filter((e)=>e.type !== "order").length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 border border-white/10 rounded-2xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-white/60 uppercase tracking-wider mb-4",
                        children: "Shift Events"
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: shift.eventLog.filter((e)=>e.type !== "order").map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: e.type === "surge" ? "⚡" : "🚧"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShiftSummary.tsx",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/70",
                                        children: e.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/ShiftSummary.tsx",
                                        lineNumber: 253,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/ShiftSummary.tsx",
                                lineNumber: 251,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ShiftSummary.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onReset,
                    className: "px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors",
                    children: "Run Another Shift"
                }, void 0, false, {
                    fileName: "[project]/components/ShiftSummary.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ShiftSummary.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ShiftSummary.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/agents/baselineAgent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baselineDecide",
    ()=>baselineDecide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2f$scoring$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agents/scoring.ts [app-ssr] (ecmascript)");
;
const MINIMUM_PAYOUT = 30; // MXN
function baselineDecide(order, agent) {
    const isAddon = agent.carriedOrders.length > 0;
    if (!isAddon) {
        const accept = order.payout >= MINIMUM_PAYOUT;
        return {
            orderId: order.id,
            decision: accept ? "accept" : "skip",
            reason: accept ? `Payout ${order.payout} MXN ≥ ${MINIMUM_PAYOUT} MXN threshold — accepted.` : `Payout ${order.payout} MXN < ${MINIMUM_PAYOUT} MXN threshold — skipped.`,
            confidence: 0.6,
            timestamp: Date.now(),
            pickupLabel: order.pickupLabel,
            dropoffLabel: order.dropoffLabel,
            payout: order.payout,
            estimatedMinutes: order.estimatedMinutes
        };
    }
    const candidate = [
        ...agent.carriedOrders,
        {
            order,
            pickedUp: false
        }
    ];
    const { current, candidate: cand, deltaMxnMin, accept } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2f$scoring$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scoreAddon"])(agent.carriedOrders, candidate, agent.position, agent.capacity);
    const candNet = cand.totalMinutes > 0 ? cand.netMxnMin : 0;
    return {
        orderId: order.id,
        decision: accept ? "accept" : "skip",
        reason: accept ? `Add-on lifts route to ${candNet.toFixed(1)} MXN/min (+${deltaMxnMin.toFixed(1)}) — stacking.` : `Add-on only ${candNet.toFixed(1)} vs ${current.netMxnMin.toFixed(1)} MXN/min — not worth it.`,
        confidence: 0.5,
        timestamp: Date.now(),
        pickupLabel: order.pickupLabel,
        dropoffLabel: order.dropoffLabel,
        payout: order.payout,
        estimatedMinutes: order.estimatedMinutes
    };
}
}),
"[project]/lib/agents/scoring.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreAddon",
    ()=>scoreAddon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$routeSolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/routing/routeSolver.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/economics.ts [app-ssr] (ecmascript)");
;
;
function scoreAddon(carried, candidate, position, capacity) {
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$routeSolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["planEfficiency"])(carried, position, capacity);
    const candidateEff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routing$2f$routeSolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["planEfficiency"])(candidate, position, capacity);
    const deltaMxnMin = round1(candidateEff.netMxnMin - current.netMxnMin);
    return {
        current,
        candidate: candidateEff,
        deltaMxnMin,
        accept: deltaMxnMin >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EFFICIENCY_GATE_MXN_MIN"]
    };
}
function round1(n) {
    return Math.round(n * 10) / 10;
}
}),
"[project]/lib/hooks/useShift.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useShift",
    ()=>useShift
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/shiftEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2f$baselineAgent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agents/baselineAgent.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$surgeZones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/surgeZones.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
/** One order every ~10 simulated minutes (600 sim-seconds). */ const ORDER_INTERVAL_SIM_S = 10 * 60;
function useShift() {
    const [shift, setShift] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialShiftState"])());
    const [currentOrder, setCurrentOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [orderExpiry, setOrderExpiry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSmartDeciding, setIsSmartDeciding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Speed: simulated-seconds that advance per real second
    const [speed, _setSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(60); // default 60× → 4h shift in 4 real minutes
    const speedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(60);
    const setSpeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((n)=>{
        speedRef.current = n;
        _setSpeed(n);
    }, []);
    const tickRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const orderTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevElapsedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // ── Derived simulated time ─────────────────────────────────────────────
    // Unix ms: what "now" is in the simulated world
    const simulatedNow = shift.simShiftStart + shift.elapsedSeconds * 1000;
    // ── Fetch helpers ──────────────────────────────────────────────────────
    const fetchOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (activeSurgeZones)=>{
        const res = await fetch("/api/simulation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activeSurgeZones
            })
        });
        return res.json();
    }, []);
    const fetchRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (from, to, departureTime // unix seconds for the simulated time
    )=>{
        try {
            const res = await fetch("/api/routing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from,
                    to,
                    departureTime
                })
            });
            return res.json();
        } catch  {
            return {
                coords: [
                    from,
                    to
                ],
                km: 1,
                minutes: 3
            };
        }
    }, []);
    // ── Smart agent API call ───────────────────────────────────────────────
    const smartDecide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (order, agentState, remainingSeconds, activeSurgeZones, activeClosures, recentDecisions)=>{
        try {
            const res = await fetch("/api/agent/decide", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order,
                    agentState,
                    remainingSeconds,
                    activeSurgeZones,
                    activeClosures,
                    recentDecisions
                })
            });
            return res.json();
        } catch  {
            return {
                orderId: order.id,
                decision: "skip",
                reason: "Network error — defaulting to skip.",
                confidence: 0.1,
                timestamp: Date.now(),
                pickupLabel: order.pickupLabel,
                dropoffLabel: order.dropoffLabel,
                payout: order.payout,
                estimatedMinutes: order.estimatedMinutes
            };
        }
    }, []);
    const enrichDecision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((decision, order)=>({
            ...decision,
            pickupLabel: order.pickupLabel,
            dropoffLabel: order.dropoffLabel,
            payout: order.payout,
            estimatedMinutes: order.estimatedMinutes
        }), []);
    // ── Apply a decision: fetch routes, animate courier, settle earnings ───
    const applyDecision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (agentKey, decision, order, currentShift)=>{
        if (decision.decision !== "accept") return;
        // Simulated departure timestamp (unix seconds) for traffic-aware routing
        const departureTime = Math.floor((currentShift.simShiftStart + currentShift.elapsedSeconds * 1000) / 1000);
        const agent = currentShift[agentKey];
        const [routeToPickup, routeToDropoff] = await Promise.all([
            fetchRoute(agent.position, order.pickupCoords, departureTime),
            fetchRoute(order.pickupCoords, order.dropoffCoords, departureTime)
        ]);
        const totalKm = routeToPickup.km + routeToDropoff.km;
        const pickupIndex = routeToPickup.coords.length;
        const fullRoute = [
            ...routeToPickup.coords,
            ...routeToDropoff.coords
        ];
        // Real-time animation duration: scale inversely with speed, cap at 20s
        const travelMs = Math.min(order.estimatedMinutes * 60_000 / speedRef.current, 20_000);
        setShift((prev)=>({
                ...prev,
                [agentKey]: {
                    ...prev[agentKey],
                    earnings: prev[agentKey].earnings + order.payout,
                    ordersCompleted: prev[agentKey].ordersCompleted + 1,
                    kmDriven: Math.round((prev[agentKey].kmDriven + totalKm) * 10) / 10,
                    currentRoute: fullRoute,
                    currentRouteMeta: {
                        startedAt: Date.now(),
                        durationMs: travelMs,
                        pickupIndex
                    },
                    currentOrder: order,
                    isMoving: true,
                    lastDecision: decision,
                    decisionHistory: [
                        ...prev[agentKey].decisionHistory,
                        decision
                    ]
                }
            }));
        // Snap position to dropoff when delivery animation completes
        setTimeout(()=>{
            setShift((prev)=>({
                    ...prev,
                    [agentKey]: {
                        ...prev[agentKey],
                        currentOrder: null,
                        currentRoute: [],
                        currentRouteMeta: null,
                        isMoving: false,
                        position: order.dropoffCoords
                    }
                }));
        }, travelMs);
    }, [
        fetchRoute
    ]);
    // ── Present a new order to both agents ────────────────────────────────
    const presentOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (order, currentShift)=>{
        setCurrentOrder(order);
        setOrderExpiry(order.expiresAt);
        const remainingSeconds = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHIFT_DURATION_SECONDS"] - currentShift.elapsedSeconds;
        // Smart agent — async
        setIsSmartDeciding(true);
        smartDecide(order, currentShift.smartAgent, remainingSeconds, currentShift.activeSurgeZones, currentShift.activeClosures, currentShift.smartAgent.decisionHistory).then((rawDecision)=>{
            setIsSmartDeciding(false);
            const decision = enrichDecision(rawDecision, order);
            setShift((prev)=>{
                applyDecision("smartAgent", decision, order, prev);
                return {
                    ...prev,
                    smartAgent: {
                        ...prev.smartAgent,
                        lastDecision: decision,
                        decisionHistory: [
                            ...prev.smartAgent.decisionHistory,
                            decision
                        ]
                    },
                    eventLog: [
                        {
                            type: "order",
                            label: `Smart: ${decision.decision.toUpperCase()} — ${order.pickupLabel} → ${order.dropoffLabel}`,
                            timestamp: Date.now(),
                            agentType: "smart"
                        },
                        ...prev.eventLog.slice(0, 29)
                    ]
                };
            });
        });
        // Baseline agent — sync
        const baseDecision = enrichDecision((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agents$2f$baselineAgent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baselineDecide"])(order, currentShift.baselineAgent), order);
        setShift((prev)=>{
            applyDecision("baselineAgent", baseDecision, order, prev);
            return {
                ...prev,
                baselineAgent: {
                    ...prev.baselineAgent,
                    lastDecision: baseDecision,
                    decisionHistory: [
                        ...prev.baselineAgent.decisionHistory,
                        baseDecision
                    ]
                },
                eventLog: [
                    {
                        type: "order",
                        label: `Baseline: ${baseDecision.decision.toUpperCase()} — ${order.pickupLabel} → ${order.dropoffLabel}`,
                        timestamp: Date.now(),
                        agentType: "baseline"
                    },
                    ...prev.eventLog.slice(0, 29)
                ]
            };
        });
        // Clear order ping
        setTimeout(()=>setCurrentOrder(null), 15_000);
    }, [
        smartDecide,
        applyDecision,
        enrichDecision
    ]);
    // ── Start shift ────────────────────────────────────────────────────────
    const startShift = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        prevElapsedRef.current = 0;
        setShift((prev)=>({
                ...prev,
                status: "running",
                startedAt: Date.now(),
                elapsedSeconds: 0
            }));
        // Counter-based clock: advance simulated time by `speed` each real second
        tickRef.current = setInterval(()=>{
            setShift((prev)=>{
                if (prev.status !== "running") return prev;
                const newElapsed = Math.min(prev.elapsedSeconds + speedRef.current, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHIFT_DURATION_SECONDS"]);
                const { surgeZones, closures } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEventsForElapsed"])(newElapsed, prevElapsedRef.current);
                prevElapsedRef.current = newElapsed;
                const newActiveSurgeZones = [
                    ...prev.activeSurgeZones,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$surgeZones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SURGE_ZONES"].filter((z)=>surgeZones.some((sz)=>sz.id === z.id) && !prev.activeSurgeZones.some((az)=>az.id === z.id))
                ];
                const newActiveClosures = [
                    ...prev.activeClosures,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$surgeZones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROAD_CLOSURES"].filter((c)=>closures.some((cl)=>cl.id === c.id) && !prev.activeClosures.some((ac)=>ac.id === c.id))
                ];
                const newEventLog = [
                    ...surgeZones.map((z)=>({
                            type: "surge",
                            label: `⚡ ${z.label}`,
                            timestamp: Date.now()
                        })),
                    ...closures.map((c)=>({
                            type: "closure",
                            label: `🚧 ${c.label}`,
                            timestamp: Date.now()
                        })),
                    ...prev.eventLog
                ].slice(0, 30);
                if (newElapsed >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHIFT_DURATION_SECONDS"]) {
                    clearInterval(tickRef.current);
                    clearTimeout(orderTimerRef.current);
                    return {
                        ...prev,
                        status: "ended",
                        elapsedSeconds: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SHIFT_DURATION_SECONDS"],
                        activeSurgeZones: newActiveSurgeZones,
                        activeClosures: newActiveClosures,
                        eventLog: newEventLog
                    };
                }
                return {
                    ...prev,
                    elapsedSeconds: newElapsed,
                    activeSurgeZones: newActiveSurgeZones,
                    activeClosures: newActiveClosures,
                    eventLog: newEventLog
                };
            });
        }, 1000);
        // Order generator: one order every ORDER_INTERVAL_SIM_S simulated seconds
        // Real delay = (sim interval / speed) × 1000 ms
        let firstOrder = true;
        const scheduleNextOrder = ()=>{
            const simJitterS = Math.random() * 5 * 60; // ±0–5 simulated minutes jitter
            const realDelayMs = firstOrder ? 2_000 : (ORDER_INTERVAL_SIM_S + simJitterS) / speedRef.current * 1000;
            firstOrder = false;
            orderTimerRef.current = setTimeout(()=>{
                setShift((prev)=>{
                    if (prev.status !== "running") return prev;
                    fetchOrder(prev.activeSurgeZones).then((order)=>{
                        setShift((s)=>{
                            if (s.status === "running") presentOrder(order, s);
                            return s;
                        });
                    });
                    return prev;
                });
                scheduleNextOrder();
            }, realDelayMs);
        };
        scheduleNextOrder();
    }, [
        fetchOrder,
        presentOrder
    ]);
    // ── Reset ──────────────────────────────────────────────────────────────
    const resetShift = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearInterval(tickRef.current);
        clearTimeout(orderTimerRef.current);
        prevElapsedRef.current = 0;
        setCurrentOrder(null);
        setOrderExpiry(null);
        setShift((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$shiftEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInitialShiftState"])());
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            clearInterval(tickRef.current);
            clearTimeout(orderTimerRef.current);
        };
    }, []);
    return {
        shift,
        currentOrder,
        orderExpiry,
        isSmartDeciding,
        speed,
        setSpeed,
        simulatedNow,
        startShift,
        resetShift
    };
}
}),
"[project]/lib/routing/routeSolver.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "planEfficiency",
    ()=>planEfficiency,
    "solveRoutePlan",
    ()=>solveRoutePlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/economics.ts [app-ssr] (ecmascript)");
;
// Penalty (km) for dropping an order before all pickups are done — biases toward
// consecutive pickups followed by consecutive dropoffs.
const CONSECUTIVE_PICKUP_PENALTY_KM = 0.8;
function round1(n) {
    return Math.round(n * 10) / 10;
}
function solveRoutePlan(carried, startPos) {
    const nodes = [];
    for (const co of carried){
        if (!co.pickedUp) {
            nodes.push({
                key: `p-${co.order.id}`,
                orderId: co.order.id,
                kind: "pickup",
                coord: co.order.pickupCoords,
                label: co.order.pickupLabel,
                pickupKey: null,
                prepMinutes: co.order.prepMinutes
            });
        }
        nodes.push({
            key: `d-${co.order.id}`,
            orderId: co.order.id,
            kind: "dropoff",
            coord: co.order.dropoffCoords,
            label: co.order.dropoffLabel,
            pickupKey: co.pickedUp ? null : `p-${co.order.id}`,
            prepMinutes: 0
        });
    }
    const n = nodes.length;
    if (n === 0) return {
        stops: [],
        deadKm: 0,
        totalKm: 0,
        totalMinutes: 0
    };
    if (n === 1) {
        const stop = {
            kind: nodes[0].kind,
            coord: nodes[0].coord,
            label: nodes[0].label,
            orderId: nodes[0].orderId,
            done: false
        };
        return {
            stops: [
                stop
            ],
            deadKm: round1((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateKm"])(startPos, nodes[0].coord)),
            totalKm: round1((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateKm"])(startPos, nodes[0].coord)),
            totalMinutes: Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateKm"])(startPos, nodes[0].coord) / __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVG_SPEED_KMH"] * 60 + nodes.reduce((s, x)=>s + x.prepMinutes, 0))
        };
    }
    const keyToIdx = new Map(nodes.map((nd, i)=>[
            nd.key,
            i
        ]));
    const distStart = nodes.map((nd)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateKm"])(startPos, nd.coord));
    const dist = nodes.map((a)=>nodes.map((b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateKm"])(a.coord, b.coord)));
    const full = (1 << n) - 1;
    const INF = Infinity;
    const dp = Array.from({
        length: 1 << n
    }, ()=>Array(n).fill(INF));
    const parent = new Map();
    const pickupComplete = (mask)=>{
        for(let i = 0; i < n; i++){
            if (nodes[i].kind === "pickup" && !(mask & 1 << i)) return false;
        }
        return true;
    };
    const canVisit = (idx, mask)=>{
        const nd = nodes[idx];
        if (nd.kind === "pickup") return true;
        if (!nd.pickupKey) return true; // pickup already done before this solve
        const pickIdx = keyToIdx.get(nd.pickupKey);
        return (mask & 1 << pickIdx) !== 0;
    };
    const dropPenalty = (idx, mask)=>{
        const nd = nodes[idx];
        if (nd.kind !== "dropoff") return 0;
        const m = mask | 1 << idx;
        if (pickupComplete(m)) return 0;
        return CONSECUTIVE_PICKUP_PENALTY_KM;
    };
    for(let i = 0; i < n; i++){
        dp[1 << i][i] = distStart[i] + dropPenalty(i, 0);
    }
    for(let mask = 1; mask <= full; mask++){
        for(let last = 0; last < n; last++){
            const cur = dp[mask][last];
            if (cur === INF) continue;
            for(let next = 0; next < n; next++){
                const bit = 1 << next;
                if (mask & bit) continue;
                if (!canVisit(next, mask)) continue;
                const nMask = mask | bit;
                const cost = cur + dist[last][next] + dropPenalty(next, mask);
                if (cost < dp[nMask][next]) {
                    dp[nMask][next] = cost;
                    parent.set(nMask * n + next, {
                        mask,
                        prev: last
                    });
                }
            }
        }
    }
    // Find best full path
    let best = Infinity;
    let last = -1;
    for(let i = 0; i < n; i++){
        if (dp[full][i] < best) {
            best = dp[full][i];
            last = i;
        }
    }
    const orderIdx = [];
    let mask = full;
    while(mask > 0){
        orderIdx.unshift(last);
        const p = parent.get(mask * n + last);
        if (!p) break;
        mask = p.mask;
        last = p.prev;
    }
    const stops = orderIdx.map((i)=>({
            kind: nodes[i].kind,
            coord: nodes[i].coord,
            label: nodes[i].label,
            orderId: nodes[i].orderId,
            done: false
        }));
    let totalKm = distStart[orderIdx[0]];
    for(let i = 1; i < orderIdx.length; i++){
        totalKm += dist[orderIdx[i - 1]][orderIdx[i]];
    }
    totalKm = round1(totalKm);
    const prepMinutes = nodes.reduce((s, x)=>s + x.prepMinutes, 0);
    const totalMinutes = Math.round(totalKm / __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AVG_SPEED_KMH"] * 60) + prepMinutes;
    return {
        stops,
        deadKm: round1(distStart[orderIdx[0]]),
        totalKm,
        totalMinutes
    };
}
function planEfficiency(carried, startPos, capacity) {
    const plan = solveRoutePlan(carried, startPos);
    const payout = carried.reduce((s, c)=>s + c.order.payout, 0);
    const tip = carried.reduce((s, c)=>s + c.order.tip, 0);
    const n = carried.length;
    const bonus = n >= 2 ? (n - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BATCH_BONUS_PER_EXTRA"] : 0;
    const fuel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fuelCostMxn"])(plan.totalKm, capacity);
    const maint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maintenanceCostMxn"])(plan.totalKm);
    const gross = payout + tip + bonus;
    const net = gross - fuel - maint;
    const mins = plan.totalMinutes > 0 ? plan.totalMinutes : 1;
    return {
        grossMxn: round1(gross),
        netMxn: round1(net),
        totalKm: plan.totalKm,
        totalMinutes: plan.totalMinutes,
        netMxnMin: round1(net / mins),
        grossMxnMin: round1(gross / mins),
        fuelMxn: round1(fuel),
        maintenanceMxn: round1(maint),
        batchBonusMxn: bonus,
        expectedTipMxn: tip,
        deadKm: plan.deadKm
    };
}
}),
"[project]/lib/simulation/economics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// --- Capacity (2-8, selectable per shift) ---
__turbopack_context__.s([
    "AVG_SPEED_KMH",
    ()=>AVG_SPEED_KMH,
    "BASE_KM_PER_LITER",
    ()=>BASE_KM_PER_LITER,
    "BATCH_BONUS_PER_EXTRA",
    ()=>BATCH_BONUS_PER_EXTRA,
    "CAPACITY_MAX",
    ()=>CAPACITY_MAX,
    "CAPACITY_MIN",
    ()=>CAPACITY_MIN,
    "DEFAULT_CAPACITY",
    ()=>DEFAULT_CAPACITY,
    "EFFICIENCY_GATE_MXN_MIN",
    ()=>EFFICIENCY_GATE_MXN_MIN,
    "FUEL_EFFICIENCY_MULT",
    ()=>FUEL_EFFICIENCY_MULT,
    "FUEL_PRICE_PER_LITER",
    ()=>FUEL_PRICE_PER_LITER,
    "MAINTENANCE_PER_KM",
    ()=>MAINTENANCE_PER_KM,
    "PREP_MIN_MAX",
    ()=>PREP_MIN_MAX,
    "PREP_MIN_MIN",
    ()=>PREP_MIN_MIN,
    "ROAD_FACTOR",
    ()=>ROAD_FACTOR,
    "TIP_CHANCE",
    ()=>TIP_CHANCE,
    "TIP_MAX",
    ()=>TIP_MAX,
    "TIP_MIN",
    ()=>TIP_MIN,
    "clampCapacity",
    ()=>clampCapacity,
    "estimateKm",
    ()=>estimateKm,
    "estimateMinutes",
    ()=>estimateMinutes,
    "fuelCostMxn",
    ()=>fuelCostMxn,
    "fuelLitersForKm",
    ()=>fuelLitersForKm,
    "haversineKm",
    ()=>haversineKm,
    "kmPerLiterForCapacity",
    ()=>kmPerLiterForCapacity,
    "maintenanceCostMxn",
    ()=>maintenanceCostMxn,
    "vehicleLabelForCapacity",
    ()=>vehicleLabelForCapacity
]);
const CAPACITY_MIN = 2;
const CAPACITY_MAX = 8;
const DEFAULT_CAPACITY = 4;
function clampCapacity(capacity) {
    return Math.min(CAPACITY_MAX, Math.max(CAPACITY_MIN, Math.round(capacity)));
}
const BASE_KM_PER_LITER = 40;
const FUEL_EFFICIENCY_MULT = 0.8;
const FUEL_PRICE_PER_LITER = 23; // MXN
const MAINTENANCE_PER_KM = 0.8; // MXN, amortized
function kmPerLiterForCapacity(capacity) {
    const c = clampCapacity(capacity);
    return BASE_KM_PER_LITER * Math.pow(FUEL_EFFICIENCY_MULT, c - CAPACITY_MIN);
}
function fuelLitersForKm(km, capacity) {
    return km / kmPerLiterForCapacity(capacity);
}
function fuelCostMxn(km, capacity) {
    return fuelLitersForKm(km, capacity) * FUEL_PRICE_PER_LITER;
}
function maintenanceCostMxn(km) {
    return km * MAINTENANCE_PER_KM;
}
function vehicleLabelForCapacity(capacity) {
    switch(clampCapacity(capacity)){
        case 2:
            return "Motorcycle";
        case 3:
            return "Scooter";
        case 4:
            return "Compact Car";
        case 5:
            return "Hatchback";
        case 6:
            return "Small Van";
        case 7:
            return "Crossover";
        case 8:
            return "Van / SUV";
        default:
            return "Courier";
    }
}
const BATCH_BONUS_PER_EXTRA = 8; // MXN per extra order in a run (>= 2 orders)
const EFFICIENCY_GATE_MXN_MIN = 0.5; // min net MXN/min gain to justify an add-on
const TIP_CHANCE = 0.4;
const TIP_MIN = 5;
const TIP_MAX = 15;
const PREP_MIN_MIN = 0;
const PREP_MIN_MAX = 6;
const AVG_SPEED_KMH = 25;
const ROAD_FACTOR = 1.4;
function haversineKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const sinLat = Math.sin(dLat / 2);
    const sinLng = Math.sin(dLng / 2);
    const c = sinLat * sinLat + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * sinLng * sinLng;
    return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}
function estimateKm(a, b) {
    return Math.round(haversineKm(a, b) * ROAD_FACTOR * 10) / 10;
}
function estimateMinutes(km) {
    return Math.round(km / AVG_SPEED_KMH * 60);
}
}),
"[project]/lib/simulation/mapBounds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DISTRITO_TEC_BOUNDS",
    ()=>DISTRITO_TEC_BOUNDS,
    "DISTRITO_TEC_CENTER",
    ()=>DISTRITO_TEC_CENTER,
    "autocompleteOptions",
    ()=>autocompleteOptions,
    "isInBounds",
    ()=>isInBounds
]);
const DISTRITO_TEC_BOUNDS = {
    north: 25.6650,
    south: 25.6380,
    east: -100.2730,
    west: -100.3020
};
const DISTRITO_TEC_CENTER = {
    lat: (DISTRITO_TEC_BOUNDS.north + DISTRITO_TEC_BOUNDS.south) / 2,
    lng: (DISTRITO_TEC_BOUNDS.east + DISTRITO_TEC_BOUNDS.west) / 2
};
const autocompleteOptions = {
    bounds: DISTRITO_TEC_BOUNDS,
    locationRestriction: DISTRITO_TEC_BOUNDS,
    componentRestrictions: {
        country: "mx"
    }
};
function isInBounds(coords) {
    return coords.lat >= DISTRITO_TEC_BOUNDS.south && coords.lat <= DISTRITO_TEC_BOUNDS.north && coords.lng >= DISTRITO_TEC_BOUNDS.west && coords.lng <= DISTRITO_TEC_BOUNDS.east;
}
}),
"[project]/lib/simulation/monterreyPois.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MONTERREY_CENTER",
    ()=>MONTERREY_CENTER,
    "MONTERREY_POIS",
    ()=>MONTERREY_POIS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/mapBounds.ts [app-ssr] (ecmascript)");
;
const MONTERREY_POIS = [
    // ITESM Campus
    {
        label: "ITESM — Rectoría",
        coords: {
            lat: 25.6513,
            lng: -100.2891
        },
        neighborhood: "ITESM"
    },
    {
        label: "ITESM — Biblioteca Central",
        coords: {
            lat: 25.6510,
            lng: -100.2875
        },
        neighborhood: "ITESM"
    },
    {
        label: "ITESM — Centro de Biotecnología FEMSA",
        coords: {
            lat: 25.6480,
            lng: -100.2895
        },
        neighborhood: "ITESM"
    },
    {
        label: "ITESM — CEDES",
        coords: {
            lat: 25.6500,
            lng: -100.2882
        },
        neighborhood: "ITESM"
    },
    {
        label: "ITESM — Cancha Borregos",
        coords: {
            lat: 25.6525,
            lng: -100.2900
        },
        neighborhood: "ITESM"
    },
    // Av. Eugenio Garza Sada — restaurants & food
    {
        label: "Starbucks Garza Sada",
        coords: {
            lat: 25.6530,
            lng: -100.2876
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "McDonald's Garza Sada",
        coords: {
            lat: 25.6545,
            lng: -100.2860
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "OXXO Garza Sada Norte",
        coords: {
            lat: 25.6555,
            lng: -100.2848
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Subway Garza Sada",
        coords: {
            lat: 25.6522,
            lng: -100.2872
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Domino's Pizza Garza Sada",
        coords: {
            lat: 25.6460,
            lng: -100.2942
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "El Tizoncito Tec",
        coords: {
            lat: 25.6505,
            lng: -100.2900
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Tacos Don Rolando",
        coords: {
            lat: 25.6478,
            lng: -100.2918
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Taconazo del Tec",
        coords: {
            lat: 25.6494,
            lng: -100.2906
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Lonchería El Rincón",
        coords: {
            lat: 25.6488,
            lng: -100.2872
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Burguer Bros",
        coords: {
            lat: 25.6474,
            lng: -100.2932
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Korean BBQ Tec",
        coords: {
            lat: 25.6540,
            lng: -100.2855
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Sushi Time Tec",
        coords: {
            lat: 25.6508,
            lng: -100.2842
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "Pizzería Campus",
        coords: {
            lat: 25.6503,
            lng: -100.2862
        },
        neighborhood: "Garza Sada"
    },
    {
        label: "OXXO Garza Sada Sur",
        coords: {
            lat: 25.6400,
            lng: -100.2988
        },
        neighborhood: "Garza Sada"
    },
    // Residencial / departamentos (delivery hotspots)
    {
        label: "Residencial del Parque",
        coords: {
            lat: 25.6495,
            lng: -100.2852
        },
        neighborhood: "Residencial"
    },
    {
        label: "Torre Estudiantil Tec",
        coords: {
            lat: 25.6518,
            lng: -100.2862
        },
        neighborhood: "Residencial"
    },
    {
        label: "Departamentos Sertoma",
        coords: {
            lat: 25.6505,
            lng: -100.2782
        },
        neighborhood: "Sertoma"
    },
    {
        label: "Condominios Del Peñón",
        coords: {
            lat: 25.6534,
            lng: -100.2822
        },
        neighborhood: "Del Peñón"
    },
    {
        label: "Villas del Tec",
        coords: {
            lat: 25.6488,
            lng: -100.2798
        },
        neighborhood: "Del Peñón"
    },
    {
        label: "Privada San Carlos",
        coords: {
            lat: 25.6462,
            lng: -100.2812
        },
        neighborhood: "Del Peñón"
    },
    {
        label: "Torres Cumbres del Tec",
        coords: {
            lat: 25.6550,
            lng: -100.2835
        },
        neighborhood: "Residencial"
    },
    // Comercial / servicios
    {
        label: "Soriana Tecnológico",
        coords: {
            lat: 25.6440,
            lng: -100.2972
        },
        neighborhood: "Comercial"
    },
    {
        label: "Farmacias del Ahorro Tec",
        coords: {
            lat: 25.6450,
            lng: -100.2958
        },
        neighborhood: "Comercial"
    },
    {
        label: "Clínica Médica Tec",
        coords: {
            lat: 25.6520,
            lng: -100.2832
        },
        neighborhood: "Comercial"
    },
    {
        label: "Gasolinera Pemex Garza Sada",
        coords: {
            lat: 25.6465,
            lng: -100.2946
        },
        neighborhood: "Comercial"
    },
    {
        label: "7-Eleven Sertoma",
        coords: {
            lat: 25.6512,
            lng: -100.2790
        },
        neighborhood: "Sertoma"
    },
    {
        label: "Farmacias Guadalajara Tec",
        coords: {
            lat: 25.6535,
            lng: -100.2868
        },
        neighborhood: "Garza Sada"
    },
    // Zona Sur del Tec (cerca de Blvd. Acapulco)
    {
        label: "Cafetería Universitaria Sur",
        coords: {
            lat: 25.6395,
            lng: -100.2975
        },
        neighborhood: "Sur Tec"
    },
    {
        label: "Restaurante Los Arcos",
        coords: {
            lat: 25.6412,
            lng: -100.2962
        },
        neighborhood: "Sur Tec"
    },
    {
        label: "Heladería Yogen Früz",
        coords: {
            lat: 25.6425,
            lng: -100.2950
        },
        neighborhood: "Sur Tec"
    }
];
const MONTERREY_CENTER = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$mapBounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DISTRITO_TEC_CENTER"];
}),
"[project]/lib/simulation/nanoid.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nanoid",
    ()=>nanoid
]);
function nanoid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
}),
"[project]/lib/simulation/shiftEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHIFT_DURATION_SECONDS",
    ()=>SHIFT_DURATION_SECONDS,
    "createInitialShiftState",
    ()=>createInitialShiftState,
    "getEventsForElapsed",
    ()=>getEventsForElapsed,
    "nextShiftStart",
    ()=>nextShiftStart,
    "shouldGenerateOrder",
    ()=>shouldGenerateOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$monterreyPois$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/monterreyPois.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$surgeZones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/surgeZones.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$nanoid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/nanoid.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation/economics.ts [app-ssr] (ecmascript)");
;
;
;
;
const SHIFT_DURATION_SECONDS = 4 * 60 * 60; // 14 400 simulated seconds
function nextShiftStart() {
    const now = new Date();
    // Move to Monterrey local time (UTC-6) to set hours correctly
    const mty = new Date(now.toLocaleString("en-US", {
        timeZone: "America/Monterrey"
    }));
    mty.setDate(mty.getDate() + 1);
    mty.setHours(8, 0, 0, 0);
    // Convert back to UTC by reversing the local offset
    const offset = now.getTime() - new Date(now.toLocaleString("en-US", {
        timeZone: "America/Monterrey"
    })).getTime();
    return mty.getTime() + offset;
}
function initialAgentState(type, capacity) {
    return {
        type,
        position: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$monterreyPois$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MONTERREY_CENTER"]
        },
        earnings: 0,
        netEarnings: 0,
        ordersCompleted: 0,
        kmDriven: 0,
        carriedOrders: [],
        stops: [],
        currentRoute: [],
        currentRouteMeta: null,
        capacity,
        runOrderCount: 0,
        batchBonusEarned: 0,
        tipsEarned: 0,
        waitMinutes: 0,
        acceptCount: 0,
        skipCount: 0,
        deadMilesKm: 0,
        surgeOrdersAccepted: 0,
        expenses: {
            fuelLiters: 0,
            fuelMxn: 0,
            maintenanceMxn: 0
        },
        earningsHistory: [],
        lastDecision: null,
        decisionHistory: [],
        isMoving: false
    };
}
function createInitialShiftState(capacity = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CAPACITY"]) {
    const cap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$economics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampCapacity"])(capacity);
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$nanoid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nanoid"])(),
        status: "idle",
        capacity: cap,
        startedAt: null,
        elapsedSeconds: 0,
        durationSeconds: SHIFT_DURATION_SECONDS,
        simShiftStart: nextShiftStart(),
        activeSurgeZones: [],
        activeClosures: [],
        eventLog: [],
        smartAgent: initialAgentState("smart", cap),
        baselineAgent: initialAgentState("baseline", cap)
    };
}
function getEventsForElapsed(elapsedSeconds, previousElapsed) {
    const newSurgeZones = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$surgeZones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SURGE_ZONES"].filter((z)=>z.activeAt > previousElapsed && z.activeAt <= elapsedSeconds);
    const newClosures = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2f$surgeZones$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROAD_CLOSURES"].filter((c)=>c.activeAt > previousElapsed && c.activeAt <= elapsedSeconds);
    return {
        surgeZones: newSurgeZones,
        closures: newClosures
    };
}
function shouldGenerateOrder(elapsedSeconds) {
    // Generate an order roughly every 8–15 seconds (handled by client timer)
    // This function is a gate check — always returns true for the generator to decide
    return elapsedSeconds > 0;
}
}),
"[project]/lib/simulation/surgeZones.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROAD_CLOSURES",
    ()=>ROAD_CLOSURES,
    "SURGE_ZONES",
    ()=>SURGE_ZONES,
    "isInSurgeZone",
    ()=>isInSurgeZone
]);
// Mid-shift = T+2h = 7 200 simulated seconds into a 4-hour shift
const MID_SHIFT = 2 * 60 * 60; // 7 200 s
const SURGE_ZONES = [
    {
        id: "surge-itesm-entrance",
        label: "ITESM Entrada Principal — Lunch surge 2×",
        center: {
            lat: 25.6513,
            lng: -100.2891
        },
        radiusKm: 0.4,
        multiplier: 2.0,
        activeAt: MID_SHIFT
    },
    {
        id: "surge-garza-sada-sur",
        label: "Garza Sada Sur — Dinner rush 1.5×",
        center: {
            lat: 25.6450,
            lng: -100.2958
        },
        radiusKm: 0.35,
        multiplier: 1.5,
        activeAt: MID_SHIFT + 8 * 60
    }
];
const ROAD_CLOSURES = [
    {
        id: "closure-garza-sada",
        label: "Av. Garza Sada — Accidente, carril cerrado",
        coords: [
            {
                lat: 25.6500,
                lng: -100.2905
            },
            {
                lat: 25.6480,
                lng: -100.2920
            },
            {
                lat: 25.6460,
                lng: -100.2940
            }
        ],
        activeAt: MID_SHIFT + 10 * 60
    }
];
function isInSurgeZone(coords, surgeZones) {
    for (const zone of surgeZones){
        const distKm = haversineKm(coords, zone.center);
        if (distKm <= zone.radiusKm) return zone;
    }
    return null;
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

//# sourceMappingURL=_14b6-0e._.js.map