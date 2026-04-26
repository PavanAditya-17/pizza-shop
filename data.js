// ============================================================
//  PIZZACRAFT — Static Menu Data (replaces backend API)
//  Used by all pages: index, menu, cart, checkout
// ============================================================

const MENU_DATA = [
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

/**
 * Generate pizza card HTML (shared across pages)
 */
function pizzaCardHTML(p) {
  const vegClass = p.category === "Veg" ? "veg" : "nonveg";
  const vegDot   = p.category === "Veg" ? "🟢" : "🔴";
  return `
    <div class="pizza-card">
      <div class="pizza-card-top" style="background: radial-gradient(circle at 60% 40%, ${p.color}33, #1a0a0a)">
        <span class="pizza-tag">${p.tag}</span>
        <div class="pizza-emoji">${p.emoji}</div>
      </div>
      <div class="pizza-card-body">
        <div class="pizza-meta">
          <span class="pizza-category ${vegClass}">${vegDot} ${p.category}</span>
        </div>
        <h3 class="pizza-name">${p.name}</h3>
        <p class="pizza-desc">${p.description}</p>
        <div class="pizza-footer">
          <span class="pizza-price">₹${p.price}</span>
          <button class="btn-add" onclick="addToCart(${p.id}, '${p.name.replace(/'/g,"\\'")}', ${p.price})">
            Add to Cart +
          </button>
        </div>
      </div>
    </div>`;
}
