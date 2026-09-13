import json
import math
import os
import random

# ── Config ───────────────────────────────────────────────────────────────────
NUMBER_OF_ORDERS = 1000
RANDOM_SEED = 42
EARTH_RADIUS_KM = 6371.0
OUTPUT_PATH = os.path.join("data", "mock_orders.json")

# Distance distribution: (probability, min_km, max_km)
# Distrito Tec is dense — most deliveries are under 3 km.
DISTANCE_BUCKETS = [
    (0.55, 0.5, 2.5),   # short: 55% of orders
    (0.35, 2.5, 5.5),   # medium: 35%
    (0.10, 5.5, 9.0),   # long: 10%
]

# Order total tiers (consumer spend in MXN).
# Bimodal: most orders are cheap (baseline grabs them eagerly);
# a meaningful minority are premium (smart agent waits for these).
#
#   Tier A — cheap/fast food: $100–280 MXN  (60% of pool)
#   Tier B — mid restaurant:  $300–520 MXN  (25% of pool)
#   Tier C — premium/fine:    $550–900 MXN  (15% of pool)
ORDER_TIERS = [
    (0.60, 100,  280),
    (0.25, 300,  520),
    (0.15, 550,  900),
]

# Driver pay is only used as a reference in the JSON.
# The actual payout shown in-game is computed by quotePayout() in economics.ts
# using orderTotal as the consumer spend.
BASE_DRIVER_PAY = 35
PAY_PER_KM = 11
PAY_VARIATION_MIN = -8
PAY_VARIATION_MAX = 20
MIN_DRIVER_PAY = 30

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


def choose_order_total():
    """Bimodal distribution: mostly cheap, some premium."""
    roll = random.random()
    cumulative = 0.0
    for probability, min_mxn, max_mxn in ORDER_TIERS:
        cumulative += probability
        if roll <= cumulative:
            return round(random.uniform(min_mxn, max_mxn), 2)
    _, min_mxn, max_mxn = ORDER_TIERS[-1]
    return round(random.uniform(min_mxn, max_mxn), 2)


def generate_customer_location(restaurant_latitude, restaurant_longitude, distance_km):
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

    return {
        "latitude": round(math.degrees(lat2), 6),
        "longitude": round(math.degrees(lon2), 6),
    }


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
    order_total = choose_order_total()
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
    total = sum(t[0] for t in ORDER_TIERS)
    if abs(total - 1.0) > 1e-6:
        raise ValueError(f"ORDER_TIERS probabilities must sum to 1.0, got {total}")


def _validate_order(order):
    lat = order["customer"]["latitude"]
    lon = order["customer"]["longitude"]
    if not isinstance(lat, (int, float)) or not isinstance(lon, (int, float)):
        raise ValueError("Customer coordinates must be numeric")
    if not (0.3 <= order["deliveryDistanceKm"] <= 10.0):
        raise ValueError("deliveryDistanceKm must be between 0.3 and 10 km")
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

    totals = [o["orderTotal"] for o in orders]
    tier_a = sum(1 for t in totals if t < 300)
    tier_b = sum(1 for t in totals if 300 <= t < 550)
    tier_c = sum(1 for t in totals if t >= 550)
    print(f"Generated {NUMBER_OF_ORDERS} mock orders → {OUTPUT_PATH}")
    print(f"  Tier A (cheap,   $100–280):  {tier_a} orders ({tier_a/NUMBER_OF_ORDERS*100:.0f}%)")
    print(f"  Tier B (mid,     $300–520):  {tier_b} orders ({tier_b/NUMBER_OF_ORDERS*100:.0f}%)")
    print(f"  Tier C (premium, $550–900):  {tier_c} orders ({tier_c/NUMBER_OF_ORDERS*100:.0f}%)")
    print(f"  orderTotal: min=${min(totals):.0f}  max=${max(totals):.0f}  avg=${sum(totals)/len(totals):.0f} MXN")
