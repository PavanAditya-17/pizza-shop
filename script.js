// ============================================================
//  PIZZACRAFT — Main Script (Static / GitHub Pages version)
//  Cart uses localStorage only — no backend required
// ============================================================

// ── Loader ───────────────────────────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 700);
});

// ── Sticky Navbar ─────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ── Mobile Menu ───────────────────────────────────────────────
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburger.textContent = mobileMenu.classList.contains("open") ? "✕" : "☰";
  });
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => { mobileMenu.classList.remove("open"); hamburger.textContent = "☰"; });
  });
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, duration = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// ── Cart (localStorage) ───────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem("pizzaCart")) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("pizzaCart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const cart     = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
    showToast(`🍕 +1 ${name} — ×${existing.qty} in cart!`);
  } else {
    cart.push({ id, name, price, qty: 1 });
    showToast(`🍕 ${name} added to cart!`);
  }
  saveCart(cart);
  updateCartCount();
  // Bounce animation on cart button
  const btn = document.querySelector(".cart-btn");
  if (btn) { btn.style.transform = "scale(1.2)"; setTimeout(() => btn.style.transform = "", 200); }
}

function updateCartCount() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = total;
}

// Run on every page load
updateCartCount();

// ── Scroll-reveal animations ──────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("fade-in"); observer.unobserve(e.target); } });
}, { threshold: 0.12 });

document.querySelectorAll(".pizza-card, .why-card, .review-card").forEach(el => observer.observe(el));

// ── Smooth anchor scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  });
});
