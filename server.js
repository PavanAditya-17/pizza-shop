// ============================================================
//  PIZZACRAFT — Express Backend Server
//  Handles: Menu API, Order Submission, Order Storage
// ============================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// ── In-Memory Order Storage (+ JSON file backup) ──────────────
const ORDERS_FILE = path.join(__dirname, "orders.json");

// Load existing orders from file, or start fresh
let orders = [];
if (fs.existsSync(ORDERS_FILE)) {
  try {
    orders = JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
  } catch {
    orders = [];
  }
}

// Helper: save orders to JSON file
function saveOrders() {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// ── Pizza Menu Data ───────────────────────────────────────────
const menu = [
  {
    id: 1,
    name: "Inferno Supreme",
    description: "Triple pepperoni, jalapeños, ghost pepper sauce, mozzarella",
    price: 549,
    category: "Non-Veg",
    tag: "🔥 Bestseller",
    emoji: "🍕",
    color: "#FF3B3B",
  },
  {
    id: 2,
    name: "Truffle Royale",
    description: "Black truffle oil, wild mushrooms, parmesan, arugula",
    price: 699,
    category: "Veg",
    tag: "⭐ Chef's Pick",
    emoji: "🫒",
    color: "#C9A84C",
  },
  {
    id: 3,
    name: "BBQ Smokehouse",
    description: "Slow-smoked chicken, caramelized onions, BBQ base, smoked gouda",
    price: 619,
    category: "Non-Veg",
    tag: "🏆 Top Rated",
    emoji: "🍗",
    color: "#E07B39",
  },
  {
    id: 4,
    name: "Garden of Eden",
    description: "Roasted bell peppers, sun-dried tomato, zucchini, ricotta cheese",
    price: 479,
    category: "Veg",
    tag: "🌿 Healthy",
    emoji: "🥦",
    color: "#4CAF50",
  },
  {
    id: 5,
    name: "Seafood Fiesta",
    description: "Jumbo shrimp, squid rings, garlic cream base, lemon zest",
    price: 749,
    category: "Non-Veg",
    tag: "🦐 New",
    emoji: "🦐",
    color: "#2196F3",
  },
  {
    id: 6,
    name: "Paneer Tikka Blaze",
    description: "Tandoori paneer, mint chutney base, onions, capsicum, masala",
    price: 519,
    category: "Veg",
    tag: "🇮🇳 Desi Fav",
    emoji: "🧀",
    color: "#FF9800",
  },
  {
    id: 7,
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, fontina, parmesan — pure cheese heaven",
    price: 589,
    category: "Veg",
    tag: "🧀 Classic",
    emoji: "🍕",
    color: "#F5D042",
  },
  {
    id: 8,
    name: "Meat Apocalypse",
    description: "Beef keema, lamb sausage, chicken tikka, spicy salami",
    price: 799,
    category: "Non-Veg",
    tag: "💀 Ultimate",
    emoji: "🥩",
    color: "#9C1C1C",
  },
  {
    id: 9,
    name: "Margherita Classica",
    description: "San Marzano tomato, fresh basil, buffalo mozzarella, EVOO",
    price: 399,
    category: "Veg",
    tag: "🍃 Original",
    emoji: "🍅",
    color: "#E53935",
  },
  {
    id: 10,
    name: "Dragon's Breath",
    description: "Sriracha chicken, pickled daikon, gochujang base, sesame",
    price: 649,
    category: "Non-Veg",
    tag: "🐉 Spicy",
    emoji: "🌶️",
    color: "#FF5722",
  },
];

// ── API: GET /menu ────────────────────────────────────────────
app.get("/menu", (req, res) => {
  res.json({ success: true, data: menu });
});

// ── API: POST /order ──────────────────────────────────────────
app.post("/order", (req, res) => {
  const { name, phone, address, items, total } = req.body;

  // Basic validation
  if (!name || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  // Build order object
  const newOrder = {
    id: `ORD-${Date.now()}`,
    customer: { name, phone, address },
    items,
    total,
    status: "Confirmed",
    placedAt: new Date().toISOString(),
  };

  // Store the order
  orders.push(newOrder);
  saveOrders();

  console.log(`\n✅ New Order: ${newOrder.id} | ${name} | ₹${total}`);

  res.json({
    success: true,
    message: "Order placed successfully!",
    orderId: newOrder.id,
  });
});

// ── API: GET /orders (admin view) ─────────────────────────────
app.get("/orders", (req, res) => {
  res.json({ success: true, total: orders.length, data: orders });
});

// ── Catch-all: serve index.html ───────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🍕 PizzaCraft server running at http://localhost:${PORT}`);
  console.log(`📦 Orders stored in: orders.json\n`);
});
