// ============================================================
//  PIZZACRAFT — Main Script
//  Handles: Cart, Toast Notifications, Navbar, Loader
// ============================================================

// ── Loader ───────────────────────────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 800);
});

// ── Sticky Navbar on Scroll ───────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// ── Mobile Menu Toggle ────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburger.textContent = mobileMenu.classList.contains("open") ? "✕" : "☰";
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.textContent = "☰";
    });
  });
}

// ── Toast Notification ────────────────────────────────────────
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// ── Cart Helpers (localStorage) ───────────────────────────────

/**
 * Get current cart array from localStorage.
 * Each item: { id, name, price, qty }
 */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("pizzaCart")) || [];
  } catch {
    return [];
  }
}

/**
 * Save cart array back to localStorage.
 */
function saveCart(cart) {
  localStorage.setItem("pizzaCart", JSON.stringify(cart));
}

/**
 * Add a pizza to the cart (or increment qty if already there).
 * @param {number} id - Pizza ID
 * @param {string} name - Pizza name
 * @param {number} price - Pizza price
 */
function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.qty += 1;
    showToast(`🍕 +1 ${name} — now × ${existing.qty} in cart!`);
  } else {
    cart.push({ id, name, price, qty: 1 });
    showToast(`🍕 ${name} added to cart!`);
  }

  saveCart(cart);
  updateCartCount();
  animateCartBtn();
}

/**
 * Update the cart count badge in the navbar.
 */
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = totalItems;
}

/**
 * Animate the cart button when item is added.
 */
function animateCartBtn() {
  const cartBtn = document.querySelector(".cart-btn");
  if (!cartBtn) return;
  cartBtn.style.transform = "scale(1.2)";
  setTimeout(() => (cartBtn.style.transform = "scale(1)"), 200);
}

// ── Init: Update Cart Count on Every Page Load ─────────────────
updateCartCount();

// ── Scroll Animations (Intersection Observer) ─────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// Observe all cards and sections
document.querySelectorAll(".pizza-card, .why-card, .review-card, .stat").forEach((el) => {
  observer.observe(el);
});

// ── Smooth Scroll for Anchor Links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
