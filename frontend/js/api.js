// api.js - shared helpers for talking to the backend and managing session state.
const API_BASE = "/api";

const Session = {
  getToken() { return localStorage.getItem("mrt_token"); },
  getUser() {
    const raw = localStorage.getItem("mrt_user");
    return raw ? JSON.parse(raw) : null;
  },
  save(token, user) {
    localStorage.setItem("mrt_token", token);
    localStorage.setItem("mrt_user", JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem("mrt_token");
    localStorage.removeItem("mrt_user");
  },
  isLoggedIn() { return !!this.getToken(); },
  isAdmin() {
    const u = this.getUser();
    if (!u || !u.role) return false;
    return String(u.role).toLowerCase() === "admin";
  },
};

async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = Session.getToken();
    if (!token) {
      window.location.href = "login.html?next=" + encodeURIComponent(window.location.pathname + window.location.search);
      throw new Error("Not authenticated");
    }
    headers.Authorization = "Bearer " + token;
  }
  
  let res;
  try {
    res = await fetch(API_BASE + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (netErr) {
    throw new Error("Backend server unreachable. Please verify that the API server is running at http://localhost:4000.");
  }

  let data = null;
  try { data = await res.json(); } catch (e) { /* no json body */ }
  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

function formatPrice(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}

// Crisp Medical Equipment Vector SVGs for clinical presentation
const SVG_ICONS = {
  xray: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="8" y="10" width="48" height="38" rx="4" stroke="currentColor" stroke-width="2.5" fill="#EFF6FF"/>
    <path d="M22 22L42 36M42 22L22 36" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="29" r="4" fill="#0D9488"/>
    <path d="M14 48H50M32 48V56M24 56H40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  ultrasound: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="12" y="10" width="40" height="30" rx="3" stroke="currentColor" stroke-width="2.5" fill="#EFF6FF"/>
    <path d="M20 25C24 20 32 20 36 25M24 28C26 25 30 25 32 28" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M26 40V54H38V40" stroke="currentColor" stroke-width="2"/>
    <rect x="18" y="44" width="8" height="14" rx="2" fill="#0D9488" stroke="currentColor" stroke-width="1.5"/>
    <path d="M22 44C22 36 12 36 12 28" stroke="#0D9488" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  ecg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="8" y="14" width="48" height="36" rx="4" stroke="currentColor" stroke-width="2.5" fill="#F0FDFA"/>
    <path d="M12 32H22L26 20L32 44L38 24L42 32H52" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="48" cy="20" r="2.5" fill="#2563EB"/>
  </svg>`,
  monitor: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="10" y="12" width="44" height="32" rx="3" stroke="currentColor" stroke-width="2.5" fill="#EFF6FF"/>
    <path d="M16 24H24L27 18L31 30L34 24H48" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 34H28L30 31L33 36L35 34H48" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 44L20 54H44L40 44" stroke="currentColor" stroke-width="2.5"/>
  </svg>`,
  ventilator: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="16" y="8" width="32" height="42" rx="4" stroke="currentColor" stroke-width="2.5" fill="#F8FAFC"/>
    <rect x="22" y="14" width="20" height="14" rx="2" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
    <path d="M24 21C26 18 30 18 32 21" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="24" cy="36" r="3" fill="#0D9488"/>
    <circle cx="34" cy="36" r="3" fill="#2563EB"/>
    <path d="M48 24C54 24 54 36 48 40" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 50V56M40 50V56M18 56H46" stroke="currentColor" stroke-width="2.5"/>
  </svg>`,
  defib: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="12" y="14" width="40" height="34" rx="4" stroke="currentColor" stroke-width="2.5" fill="#FEF3C7"/>
    <path d="M34 18L26 31H34L30 44L42 29H34L38 18H34Z" fill="#D97706" stroke="#B45309" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M22 14V10C22 8.89543 22.8954 8 24 8H40C41.1046 8 42 8.89543 42 10V14" stroke="currentColor" stroke-width="2.5"/>
  </svg>`,
  surgical: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <path d="M14 50L36 28M42 22L48 16C50 14 53 14 55 16C57 18 57 21 55 23L48 30L42 22Z" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 52L22 42" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <circle cx="48" cy="46" r="6" stroke="#0D9488" stroke-width="2"/>
    <circle cx="36" cy="48" r="4" stroke="#0D9488" stroke-width="2"/>
  </svg>`,
  light: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <circle cx="32" cy="26" r="16" stroke="currentColor" stroke-width="2.5" fill="#FEF9C3"/>
    <circle cx="32" cy="26" r="6" fill="#F59E0B"/>
    <path d="M32 10V6M48 26H52M32 42V46M16 26H12M43 15L46 12M21 37L18 40M43 37L46 40M21 15L18 12" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 6V2M32 2H48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  kit: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="10" y="18" width="44" height="34" rx="4" stroke="currentColor" stroke-width="2.5" fill="#F0FDFA"/>
    <path d="M22 18V12C22 10.8954 22.8954 10 24 10H40C41.1046 10 42 10.8954 42 12V18" stroke="currentColor" stroke-width="2.5"/>
    <rect x="29" y="27" width="6" height="16" rx="1" fill="#0D9488"/>
    <rect x="24" y="32" width="16" height="6" rx="1" fill="#0D9488"/>
  </svg>`,
  "dental-chair": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <path d="M14 24L26 28L38 24L48 30L44 38L32 36L20 40L14 34V24Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M32 36V50M22 50H42" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M46 14C46 14 50 20 48 28" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="48" cy="12" r="3" fill="#0D9488"/>
  </svg>`,
  autoclave: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="12" y="12" width="40" height="40" rx="6" stroke="currentColor" stroke-width="2.5" fill="#F8FAFC"/>
    <circle cx="32" cy="32" r="13" stroke="#2563EB" stroke-width="2.5" fill="#EFF6FF"/>
    <circle cx="32" cy="32" r="4" fill="#0D9488"/>
    <path d="M32 19V22M32 42V45M19 32H22M42 32H45" stroke="#2563EB" stroke-width="2"/>
    <circle cx="44" cy="18" r="2" fill="#16A34A"/>
  </svg>`,
  wheelchair: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <circle cx="32" cy="40" r="14" stroke="#2563EB" stroke-width="2.5"/>
    <circle cx="32" cy="40" r="4" fill="#2563EB"/>
    <path d="M24 16C24 13.7909 25.7909 12 28 12C30.2091 12 32 13.7909 32 16C32 18.2091 30.2091 20 28 20" stroke="currentColor" stroke-width="2"/>
    <path d="M28 24V38H42L48 52" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  cpm: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <path d="M10 44L24 24L40 38L54 20" stroke="#0D9488" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="8" y="44" width="48" height="8" rx="2" stroke="currentColor" stroke-width="2" fill="#E2E8F0"/>
    <circle cx="24" cy="24" r="4" fill="#2563EB"/>
    <circle cx="40" cy="38" r="4" fill="#2563EB"/>
  </svg>`,
  gloves: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <path d="M22 48V32C22 28 18 28 18 24C18 20 22 14 26 14C28 14 30 18 30 20C30 17 33 14 36 14C39 14 41 18 41 20C41 17 44 15 47 16C50 17 50 22 49 26L46 48H22Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="18" y="48" width="32" height="6" rx="2" fill="#0D9488" stroke="currentColor" stroke-width="1.5"/>
  </svg>`,
  mask: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="14" y="20" width="36" height="24" rx="4" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5"/>
    <path d="M14 26H50M14 32H50M14 38H50" stroke="#93C5FD" stroke-width="1.5"/>
    <path d="M14 24C8 26 8 38 14 40M50 24C56 26 56 38 50 40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  balance: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="10" y="38" width="44" height="14" rx="2" stroke="currentColor" stroke-width="2.5" fill="#F8FAFC"/>
    <rect x="16" y="16" width="32" height="22" rx="2" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="2 2"/>
    <path d="M24 38V30H40V38" stroke="currentColor" stroke-width="2"/>
    <rect x="22" y="44" width="20" height="4" rx="1" fill="#0D9488"/>
  </svg>`,
  analyzer: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="10" y="14" width="44" height="38" rx="4" stroke="currentColor" stroke-width="2.5" fill="#F0FDFA"/>
    <rect x="16" y="20" width="18" height="14" rx="2" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
    <circle cx="42" cy="27" r="5" stroke="#0D9488" stroke-width="2"/>
    <path d="M16 42H48" stroke="currentColor" stroke-width="2"/>
    <circle cx="22" cy="42" r="2" fill="#2563EB"/>
    <circle cx="32" cy="42" r="2" fill="#0D9488"/>
    <circle cx="42" cy="42" r="2" fill="#F59E0B"/>
  </svg>`,
  bed: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <path d="M8 20V46M8 36H56M56 26V46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="14" y="28" width="36" height="8" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
    <circle cx="16" cy="24" r="3" fill="#0D9488"/>
    <path d="M22 36L30 24H44" stroke="#2563EB" stroke-width="1.8"/>
    <circle cx="12" cy="48" r="2" fill="currentColor"/>
    <circle cx="52" cy="48" r="2" fill="currentColor"/>
  </svg>`,
  locker: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="18" y="10" width="28" height="44" rx="3" stroke="currentColor" stroke-width="2.5" fill="#F8FAFC"/>
    <line x1="18" y1="24" x2="46" y2="24" stroke="currentColor" stroke-width="2"/>
    <circle cx="24" cy="18" r="1.5" fill="#2563EB"/>
    <circle cx="24" cy="34" r="1.5" fill="#0D9488"/>
    <line x1="14" y1="16" x2="18" y2="16" stroke="#2563EB" stroke-width="2.5"/>
  </svg>`,
  "iv-stand": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <path d="M32 10V52M20 54L32 52L44 54M32 52L32 58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 14C26 14 24 8 20 10M32 14C38 14 40 8 44 10" stroke="#0D9488" stroke-width="2" stroke-linecap="round"/>
    <rect x="22" y="14" width="6" height="12" rx="2" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
    <circle cx="20" cy="56" r="2" fill="currentColor"/>
    <circle cx="44" cy="56" r="2" fill="currentColor"/>
  </svg>`,
  placeholder: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-visual-svg">
    <rect x="12" y="14" width="40" height="38" rx="4" stroke="currentColor" stroke-width="2.5" fill="#F1F5F9"/>
    <path d="M26 33H38M32 27V39" stroke="#2563EB" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="32" cy="33" r="10" stroke="#0D9488" stroke-width="1.5" stroke-dasharray="3 3"/>
  </svg>`,
};

function iconFor(image) {
  const map = {
    xray: "☢", ultrasound: "📡", ecg: "📈", monitor: "🖥",
    ventilator: "🫁", defib: "⚡", surgical: "🔪", light: "💡",
    kit: "🧰", "dental-chair": "🦷", autoclave: "🧫", wheelchair: "♿",
    cpm: "🦵", gloves: "🧤", mask: "😷", balance: "⚖", analyzer: "🧪",
    bed: "🛏", locker: "🗄", "iv-stand": "💧", placeholder: "📦",
  };
  return map[image] || "📦";
}

function productVisualHtml(image) {
  if (image && /^https?:\/\//i.test(image)) {
    return `<img src="${escapeHtml(image)}" alt="Medical equipment" loading="lazy" style="max-width:90%; max-height:90%; object-fit:contain;">`;
  }
  const cleanKey = String(image || "placeholder").toLowerCase().trim();
  const svg = SVG_ICONS[cleanKey] || SVG_ICONS.placeholder;
  return `<div class="product-visual-wrap">${svg}</div>`;
}

function displaySku(product) {
  return product.sku || `MED-${product.id}`;
}

function toast(message, type = "info") {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  
  const icon = type === "success" ? "✓ " : type === "error" ? "⚠️ " : "ℹ️ ";
  el.textContent = icon + message;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2600);
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

async function refreshCartBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  if (!Session.isLoggedIn()) {
    el.textContent = "0";
    return;
  }
  try {
    const cart = await api("/cart", { auth: true });
    const count = (cart && cart.items) ? cart.items.reduce((sum, i) => sum + i.qty, 0) : 0;
    el.textContent = String(count);
  } catch (e) {
    /* ignore session or network errors */
  }
}

function renderHeaderAuthState() {
  const el = document.getElementById("auth-slot");
  if (!el) return;
  const user = Session.getUser();
  if (user) {
    const firstName = escapeHtml((user.name || "User").split(" ")[0]);
    el.innerHTML = `
      <a href="orders.html" class="header-action-item" title="Order Tracking">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        <span>Orders</span>
      </a>
      ${Session.isAdmin() ? `
        <a href="admin.html" class="header-action-item" title="Admin Console" style="color:var(--primary-blue)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Admin</span>
        </a>
      ` : ""}
      <div style="display:inline-flex; align-items:center; gap:8px; margin-left:4px;">
        <span style="font-size:12.5px; font-weight:700; color:var(--primary-navy)">${firstName}</span>
        <button id="logout-link" class="btn btn-ghost btn-sm" style="padding:4px 8px; font-size:12px; color:var(--danger)">Sign out</button>
      </div>
    `;
    const logoutBtn = document.getElementById("logout-link");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        Session.clear();
        toast("Signed out successfully", "success");
        setTimeout(() => window.location.href = "index.html", 400);
      });
    }
  } else {
    el.innerHTML = `
      <a href="login.html" class="btn btn-outline-dark btn-sm" style="font-weight:600">Sign in</a>
      <a href="register.html" class="btn btn-primary btn-sm" style="font-weight:600">Register</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderAuthState();
  refreshCartBadge();
});
