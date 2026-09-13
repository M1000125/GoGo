import json
import math
import os
import random

# ── Config ───────────────────────────────────────────────────────────────────
NUMBER_OF_ORDERS = 1000
RANDOM_SEED = 42
EARTH_RADIUS_KM = 6371.0
# ── Tier-based order sizes (mirrors lib/places/priceTiers.ts) ────────────
# Tier 1: fast food / tacos / café  → 150–280 MXN
# Tier 2: sit-down restaurant / bar → 280–550 MXN
# Tier 3: steak / seafood / fine    → 550–1200 MXN
# With SLOT_VALUE_MXN=400 this gives slots 1–3.
ORDER_TIERS = {
    "tier1": {"min": 150, "max": 280, "prob": 0.50},
    "tier2": {"min": 280, "max": 550, "prob": 0.35},
    "tier3": {"min": 550, "max": 1200, "prob": 0.15},
}
BASE_DRIVER_PAY = 25
PAY_PER_KM = 9
PAY_VARIATION_MIN = -12
PAY_VARIATION_MAX = 18
MIN_DRIVER_PAY = 25
OUTPUT_PATH = os.path.join("data", "mock_orders.json")
MAX_PLACEMENT_ATTEMPTS = 60

# Strict delivery-zone bounds (Distrito Tec, Monterrey) — every customer must
# land inside this box so no order spawns outside the zone.
ZONE_BOUNDS = {
    "north": 25.6650,
    "south": 25.6380,
    "east": -100.2730,
    "west": -100.3020,
}

# Delivery-distance buckets (km). Ranges sized to fit the zone box (~1.5 km
# from center), so most placements land in-bounds on the first try.
DISTANCE_BUCKETS = [
    (0.45, 0.4, 1.5),
    (0.35, 1.5, 2.6),
    (0.15, 2.6, 3.8),
    (0.05, 3.8, 5.0),
]

RESTAURANTS = [
    {
        "id": "REST-001",
        "name": "Taquería Orinoco TEC",
        "address": "Av. Del Estado 221, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65001,
        "longitude": -100.29399,
    },
    {
        "id": "REST-002",
        "name": "Brutal Kitchen Bar",
        "address": "Av. Del Estado 223, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65000,
        "longitude": -100.29410,
    },
    {
        "id": "REST-003",
        "name": "El Torito Sinaloense - Sucursal TEC",
        "address": "Av. Del Estado 307, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.64921,
        "longitude": -100.29503,
    },
    {
        "id": "REST-004",
        "name": "Catrinas Chilaquiles TEC",
        "address": "Av. Del Estado 317, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.64915,
        "longitude": -100.29520,
    },
    {
        "id": "REST-005",
        "name": "Muncher House Tec",
        "address": "Paseo Tec II, Av. Eugenio Garza Sada Sur 2408, Monterrey, N.L.",
        "latitude": 25.65280,
        "longitude": -100.29430,
    },
    {
        "id": "REST-006",
        "name": "Mr Brown PASEO TEC II",
        "address": "Av. Eugenio Garza Sada Sur 2408, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65282,
        "longitude": -100.29428,
    },
    {
        "id": "REST-007",
        "name": "DOLCE BISQUET - PASEO TEC",
        "address": "Av. Eugenio Garza Sada 2410, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.652925,
        "longitude": -100.294227,
    },
    {
        "id": "REST-008",
        "name": "El Señor Limón Suc. Tec",
        "address": "Av. Eugenio Garza Sada 2410, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65294,
        "longitude": -100.29418,
    },
    {
        "id": "REST-009",
        "name": "Yulia Paseo Tec",
        "address": "Av. Eugenio Garza Sada 2410, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65290,
        "longitude": -100.29410,
    },
    {
        "id": "REST-010",
        "name": "Las 3 Abuelas",
        "address": "Av. Eugenio Garza Sada 2410 Local 11, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65288,
        "longitude": -100.29425,
    },
    {
        "id": "REST-011",
        "name": "Firehouse Subs Paseo Tec",
        "address": "Paseo Tec, Av. Eugenio Garza Sada 2410, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.65297,
        "longitude": -100.29420,
    },
    {
        "id": "REST-012",
        "name": "Noreste Grill Paseo Tec",
        "address": "Av. Eugenio Garza Sada 2411 y 2413, Tecnológico, Distrito Tec, Monterrey, N.L.",
        "latitude": 25.654546,
        "longitude": -100.293998,
    },
]


def choose_restaurant():
    return random.choice(RESTAURANTS)


def choose_delivery_distance():
    roll = random.random()
    cumulative = 0.0
    for probability, min_km, max_km in DISTANCE_BUCKETS:
        cumulative += probability
        if roll <= cumulative:
            return random.uniform(min_km, max_km)
    _, min_km, max_km = DISTANCE_BUCKETS[-1]
    return random.uniform(min_km, max_km)


def _in_zone(latitude, longitude):
    return (
        ZONE_BOUNDS["south"] <= latitude <= ZONE_BOUNDS["north"]
        and ZONE_BOUNDS["west"] <= longitude <= ZONE_BOUNDS["east"]
    )


def _clamp_to_zone(latitude, longitude):
    return {
        "latitude": min(max(latitude, ZONE_BOUNDS["south"]), ZONE_BOUNDS["north"]),
        "longitude": min(max(longitude, ZONE_BOUNDS["west"]), ZONE_BOUNDS["east"]),
    }


def generate_customer_location(restaurant_latitude, restaurant_longitude, distance_km):
    """Sample a customer point inside the delivery zone (rejection sampling).

    Out-of-zone samples are rolled again up to MAX_PLACEMENT_ATTEMPTS; the very
    rare straggler (long-distance draw) is clamped onto the zone edge so the
    dataset is strictly bounded.
    """
    for _ in range(MAX_PLACEMENT_ATTEMPTS):
        bearing_rad = math.radians(random.uniform(0, 360))
        lat1 = math.radians(restaurant_latitude)
        lon1 = math.radians(restaurant_longitude)
        angular_distance = distance_km / EARTH_RADIUS_KM

        lat2 = math.asin(
            math.sin(lat1) * math.cos(angular_distance)
            + math.cos(lat1) * math.sin(angular_distance) * math.cos(bearing_rad)
        )
        lon2 = lon1 + math.atan2(
            math.sin(bearing_rad) * math.sin(angular_distance) * math.cos(lat1),
            math.cos(angular_distance) - math.sin(lat1) * math.sin(lat2),
        )

        latitude = math.degrees(lat2)
        longitude = math.degrees(lon2)
        if _in_zone(latitude, longitude):
            return {
                "latitude": round(latitude, 6),
                "longitude": round(longitude, 6),
            }

    clamped = _clamp_to_zone(latitude, longitude)
    return {
        "latitude": round(clamped["latitude"], 6),
        "longitude": round(clamped["longitude"], 6),
    }


def _choose_order_tier():
    roll = random.random()
    cumulative = 0.0
    for name, tier in ORDER_TIERS.items():
        cumulative += tier["prob"]
        if roll <= cumulative:
            return name, tier["min"], tier["max"]
    last = list(ORDER_TIERS.values())[-1]
    return list(ORDER_TIERS.keys())[-1], last["min"], last["max"]


def generate_order_total():
    _, lo, hi = _choose_order_tier()
    return round(random.uniform(lo, hi), 2)
def generate_driver_pay(distance_km):
    variation = random.uniform(PAY_VARIATION_MIN, PAY_VARIATION_MAX)
    pay = BASE_DRIVER_PAY + (distance_km * PAY_PER_KM) + variation
    return round(max(pay, MIN_DRIVER_PAY), 2)


def generate_order(order_number):
    restaurant = choose_restaurant()
    distance_km = choose_delivery_distance()
    customer = generate_customer_location(
        restaurant["latitude"],
        restaurant["longitude"],
        distance_km,
    )
    order_total = generate_order_total()
    order = {
        "id": f"ORD-{order_number:04d}",
        "restaurant": {
            "id": restaurant["id"],
            "name": restaurant["name"],
            "latitude": restaurant["latitude"],
            "longitude": restaurant["longitude"],
        },
        "customer": customer,
        "deliveryDistanceKm": round(distance_km, 2),
        "orderTotal": order_total,
        "driverPay": generate_driver_pay(distance_km),
    }
    _validate_order(order)
    return order


def generate_orders(number_of_orders):
    return [generate_order(i) for i in range(1, number_of_orders + 1)]


def save_orders_to_json(orders, filepath):
    directory = os.path.dirname(filepath)
    if directory:
        os.makedirs(directory, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as file:
        json.dump(orders, file, indent=2, ensure_ascii=False)


def _validate_distance_buckets():
    total = sum(bucket[0] for bucket in DISTANCE_BUCKETS)
    if abs(total - 1.0) > 1e-6:
        raise ValueError(f"DISTANCE_BUCKETS probabilities must sum to 1.0, got {total}")


def _validate_order_tiers():
    total = sum(tier["prob"] for tier in ORDER_TIERS.values())
    if abs(total - 1.0) > 1e-6:
        raise ValueError(f"ORDER_TIERS probabilities must sum to 1.0, got {total}")


def _validate_order(order):
    lat = order["customer"]["latitude"]
    lon = order["customer"]["longitude"]
    if not isinstance(lat, (int, float)) or not isinstance(lon, (int, float)):
        raise ValueError("Customer coordinates must be numeric")
    if not _in_zone(lat, lon):
        raise ValueError("Customer must be inside the Distrito Tec delivery zone")
    if not (0.3 <= order["deliveryDistanceKm"] <= 5.0):
        raise ValueError("deliveryDistanceKm must be between 0.3 and 5 km")
    if not (150 <= order["orderTotal"] <= 1200):
        raise ValueError("orderTotal must be between 150 and 1200 (tier ranges)")
    if order["orderTotal"] <= 0:
        raise ValueError("orderTotal must be positive")
    if order["driverPay"] < MIN_DRIVER_PAY:
        raise ValueError("driverPay must be at least MIN_DRIVER_PAY")


if __name__ == "__main__":
    random.seed(RANDOM_SEED)
    _validate_distance_buckets()
    _validate_order_tiers()
    orders = generate_orders(NUMBER_OF_ORDERS)
    save_orders_to_json(orders, OUTPUT_PATH)

    in_zone = sum(
        1
        for o in orders
        if _in_zone(o["customer"]["latitude"], o["customer"]["longitude"])
    )
    total_vals = [o["orderTotal"] for o in orders]
    print(
        f"Generated {len(orders)} mock orders ({in_zone}/{len(orders)} in zone).\n"
        f"Order totals: min ${min(total_vals):.0f} · max ${max(total_vals):.0f} "
        f"· avg ${sum(total_vals)/len(total_vals):.0f} MXN"
    )
    print(f"Saved to {OUTPUT_PATH}")
