// app.js - Homepage & catalog logic for MediSource
// Handles category navigation, client-side filtering, sorting, price filtering,
// search, responsive catalog updates, and add-to-cart interactions.

const params = new URLSearchParams(window.location.search);
let state = {
  search: params.get("search") || "",
  category: params.get("category") || "",
  sort: "",
  minPrice: "",
  maxPrice: "",
};

let allProducts = [];
let categoryList = [];

// Realistic fallback data matching backend db.js for offline development / UI preview
const FALLBACK_CATEGORIES = [
  { id: "diagnostic", name: "Diagnostic Equipment", description: "Imaging & physiological diagnostic equipment" },
  { id: "icu", name: "ICU & Emergency", description: "Critical care ventilators, monitors, and defibrillators" },
  { id: "surgical", name: "Surgical Instruments", description: "Operating theater lights, cautery, and instrument kits" },
  { id: "dental", name: "Dental Equipment", description: "Operatory dental chairs and Class B autoclaves" },
  { id: "furniture", name: "Hospital Furniture", description: "ICU motorized beds, lockers, and mobile IV stands" },
  { id: "lab", name: "Laboratory Equipment", description: "Biochemistry analyzers and analytical balances" },
  { id: "orthopedic", name: "Orthopedic & Rehab", description: "Mobility wheelchairs and CPM rehabilitation devices" },
  { id: "disposables", name: "Disposables & PPE", description: "Sterile examination gloves and surgical masks" },
];

const FALLBACK_PRODUCTS = [
  { id: 1, name: "Digital X-Ray Machine DX-200", category: "diagnostic", price: 845000, mrp: 920000, stock: 6, brand: "Radiotech", sku: "DX-200", rating: 4.6, desc: "High-frequency digital radiography system with flat-panel detector and DICOM output.", image: "xray" },
  { id: 2, name: "Portable Ultrasound Scanner US-7", category: "diagnostic", price: 312000, mrp: 349000, stock: 14, brand: "Sonoline", sku: "US-7", rating: 4.4, desc: "Compact color doppler ultrasound with 12-inch touchscreen and 3 probe ports.", image: "ultrasound" },
  { id: 3, name: "12-Lead ECG Machine EC-12", category: "diagnostic", price: 48500, mrp: 55000, stock: 32, brand: "Cardiomax", sku: "EC-12", rating: 4.7, desc: "Interpretive 12-channel ECG with thermal printer and battery backup.", image: "ecg" },
  { id: 4, name: "Multi-Para Patient Monitor PM-500", category: "icu", price: 76500, mrp: 84000, stock: 21, brand: "Vitalcare", sku: "PM-500", rating: 4.5, desc: "SpO2, NIBP, ECG, respiration and temperature monitoring on a 15-inch display.", image: "monitor" },
  { id: 5, name: "ICU Ventilator V-Air 3", category: "icu", price: 415000, mrp: 460000, stock: 5, brand: "Pulmotech", sku: "VAIR-3", rating: 4.8, desc: "Invasive/non-invasive ventilation with SIMV, PSV and CPAP modes.", image: "ventilator" },
  { id: 6, name: "Defibrillator DF-100 Biphasic", category: "icu", price: 168000, mrp: 185000, stock: 9, brand: "Cardiomax", sku: "DF-100", rating: 4.6, desc: "Biphasic defibrillator with manual and AED modes, built-in ECG.", image: "defib" },
  { id: 7, name: "Electrosurgical Unit ES-300", category: "surgical", price: 92000, mrp: 101000, stock: 11, brand: "Suretech", sku: "ES-300", rating: 4.3, desc: "300W cut/coagulation unit with monopolar and bipolar output.", image: "surgical" },
  { id: 8, name: "OT Surgical Light SL-Twin", category: "surgical", price: 138000, mrp: 152000, stock: 7, brand: "Luxmed", sku: "SLTWIN", rating: 4.5, desc: "Dual-dome LED operating light, 160,000 lux, shadow-free illumination.", image: "light" },
  { id: 9, name: "Surgical Instrument Kit (Basic, 42pc)", category: "surgical", price: 14200, mrp: 16500, stock: 60, brand: "Suretech", sku: "SIK-42", rating: 4.2, desc: "Stainless steel general surgery kit, autoclavable, 42 pieces.", image: "kit" },
  { id: 10, name: "Dental Chair Unit DC-Pro", category: "dental", price: 225000, mrp: 250000, stock: 8, brand: "Smileline", sku: "DCPRO", rating: 4.6, desc: "Fully electric dental chair with LED light and 3-way syringe.", image: "dental-chair" },
  { id: 11, name: "Dental Autoclave Sterilizer 18L", category: "dental", price: 38500, mrp: 43000, stock: 18, brand: "Smileline", sku: "AC-18", rating: 4.4, desc: "Class B autoclave, 18-litre chamber, drying cycle included.", image: "autoclave" },
  { id: 12, name: "Electric Wheelchair EW-Comfort", category: "orthopedic", price: 62000, mrp: 69000, stock: 15, brand: "Mobilease", sku: "EWC-1", rating: 4.3, desc: "Foldable electric wheelchair, 25km range, joystick control.", image: "wheelchair" },
  { id: 13, name: "CPM Knee Rehab Machine", category: "orthopedic", price: 89000, mrp: 98000, stock: 6, brand: "Rehabflex", sku: "CPM-K1", rating: 4.5, desc: "Continuous passive motion device for post-surgical knee rehabilitation.", image: "cpm" },
  { id: 14, name: "Nitrile Examination Gloves (Box of 100)", category: "disposables", price: 320, mrp: 380, stock: 800, brand: "Safehand", sku: "NEG-100", rating: 4.1, desc: "Powder-free nitrile gloves, textured fingertips, box of 100.", image: "gloves" },
  { id: 15, name: "3-Ply Surgical Face Mask (Box of 50)", category: "disposables", price: 180, mrp: 220, stock: 1200, brand: "Safehand", sku: "SFM-50", rating: 4.0, desc: "BFE 98% surgical masks with adjustable nose clip, box of 50.", image: "mask" },
  { id: 16, name: "Digital Analytical Balance AB-220", category: "lab", price: 41500, mrp: 46000, stock: 10, brand: "Precilab", sku: "AB-220", rating: 4.6, desc: "0.1mg readability analytical balance with internal calibration.", image: "balance" },
  { id: 17, name: "Biochemistry Analyzer BC-240", category: "lab", price: 385000, mrp: 425000, stock: 4, brand: "Precilab", sku: "BC-240", rating: 4.7, desc: "Fully automatic biochemistry analyzer, 240 tests/hour.", image: "analyzer" },
  { id: 18, name: "Hospital Bed HB-Electric 3F", category: "furniture", price: 58000, mrp: 65000, stock: 13, brand: "Comfortcare", sku: "HB3F", rating: 4.4, desc: "3-function electric hospital bed with side rails and castors.", image: "bed" },
  { id: 19, name: "Bedside Locker with Overbed Table", category: "furniture", price: 9800, mrp: 11500, stock: 40, brand: "Comfortcare", sku: "BL-OT", rating: 4.2, desc: "Powder-coated steel bedside locker with adjustable overbed table.", image: "locker" },
  { id: 20, name: "IV Stand Trolley (Stainless, 5-hook)", category: "furniture", price: 2100, mrp: 2600, stock: 150, brand: "Comfortcare", sku: "IVS-5", rating: 4.0, desc: "Height-adjustable stainless steel IV stand with 5 hooks and castors.", image: "iv-stand" },
];

const searchInputEl = document.getElementById("search-input");
if (searchInputEl) {
  searchInputEl.value = state.search;
}

function renderCategoryNav() {
  const nav = document.getElementById("category-nav-list");
  const filterList = document.getElementById("filter-categories");

  if (!nav || !filterList) return;

  const counts = {};
  allProducts.forEach((p) => {
    const cat = String(p.category || "").toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  });

  nav.innerHTML = `
    <a href="index.html" class="${!state.category ? "active" : ""}" data-cat="">All Equipment</a>
    ${categoryList.map((c) => {
      const isActive = String(state.category).toLowerCase() === String(c.id).toLowerCase();
      return `<a href="?category=${encodeURIComponent(c.id)}" class="${isActive ? "active" : ""}" data-cat="${escapeHtml(c.id)}">${escapeHtml(c.name)}</a>`;
    }).join("")}
  `;

  filterList.innerHTML = categoryList.map((c) => {
    const catId = String(c.id).toLowerCase();
    const isActive = String(state.category).toLowerCase() === catId;
    const count = counts[catId] || 0;
    return `
      <div class="filter-option ${isActive ? "active" : ""}" data-cat="${escapeHtml(c.id)}">
        <span>${escapeHtml(c.name)}</span>
        <span class="n">${count}</span>
      </div>
    `;
  }).join("");

  // Attach filter click handlers
  filterList.querySelectorAll(".filter-option").forEach((el) => {
    el.addEventListener("click", () => {
      const selected = el.dataset.cat;
      state.category = String(state.category).toLowerCase() === String(selected).toLowerCase() ? "" : selected;
      renderProducts();
      highlightActiveCategory();
    });
  });

  // Attach top category nav handlers
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      state.category = a.dataset.cat || "";
      renderProducts();
      highlightActiveCategory();
      const catalogEl = document.getElementById("catalog");
      if (catalogEl && window.innerWidth < 860) {
        catalogEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function highlightActiveCategory() {
  const current = String(state.category || "").toLowerCase();
  document.querySelectorAll("#category-nav-list a").forEach((a) => {
    const aCat = String(a.dataset.cat || "").toLowerCase();
    a.classList.toggle("active", aCat === current);
  });
  document.querySelectorAll("#filter-categories .filter-option").forEach((el) => {
    const elCat = String(el.dataset.cat || "").toLowerCase();
    el.classList.toggle("active", elCat === current);
  });
}

function productCard(p) {
  const stock = Number(p.stock || 0);
  const lowStock = stock > 0 && stock < 10;
  const outOfStock = stock <= 0;
  
  let stockClass = "ok";
  let stockText = `${stock} in stock`;
  if (outOfStock) {
    stockClass = "out";
    stockText = "Out of stock";
  } else if (lowStock) {
    stockClass = "low";
    stockText = `Only ${stock} left`;
  }

  const discount = (p.mrp && p.mrp > p.price)
    ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
    : 0;

  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}" aria-label="View ${escapeHtml(p.name)}">
        <div class="product-thumb">
          ${productVisualHtml(p.image)}
          <span class="stamp">✓ Verified</span>
          ${discount > 0 ? `<span class="stamp-discount">-${discount}%</span>` : ""}
        </div>
      </a>
      <div class="product-body">
        <div class="product-meta-row">
          <span class="product-sku">SKU ${escapeHtml(displaySku(p))}</span>
          <span class="product-brand">${escapeHtml(p.brand || "Generic")}</span>
        </div>
        <a href="product.html?id=${p.id}">
          <h3 class="product-name">${escapeHtml(p.name)}</h3>
        </a>
        <div class="product-price-row">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.mrp && p.mrp > p.price ? `<span class="mrp">${formatPrice(p.mrp)}</span>` : ""}
          <span class="tax-badge">Excl. GST</span>
        </div>
        <div class="stock-note ${stockClass}">${stockText}</div>
        <div class="product-card-footer">
          <button class="btn btn-dark btn-block add-to-cart" data-id="${p.id}" ${outOfStock ? "disabled" : ""}>
            ${outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  `;
}

function applyFilters() {
  let result = [...allProducts];

  // 1. Text Search across name, brand, desc, SKU
  if (state.search) {
    const q = state.search.toLowerCase().trim();
    result = result.filter((p) =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.desc || "").toLowerCase().includes(q) ||
      displaySku(p).toLowerCase().includes(q)
    );
  }

  // 2. Category Filter
  if (state.category) {
    const cat = String(state.category).toLowerCase().trim();
    result = result.filter((p) => String(p.category).toLowerCase().trim() === cat);
  }

  // 3. Price Filter
  if (state.minPrice !== "" && !isNaN(Number(state.minPrice))) {
    result = result.filter((p) => p.price >= Number(state.minPrice));
  }
  if (state.maxPrice !== "" && !isNaN(Number(state.maxPrice))) {
    result = result.filter((p) => p.price <= Number(state.maxPrice));
  }

  // 4. Sorting
  if (state.sort === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sort === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (state.sort === "name_asc") {
    result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  return result;
}

function renderProducts() {
  const filtered = applyFilters();
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  const countEl = document.getElementById("result-count");

  if (!grid || !empty) return;

  if (countEl) {
    countEl.textContent = `— ${filtered.length} equipment item${filtered.length === 1 ? "" : "s"}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = filtered.map(productCard).join("");
  }

  // Bind Add to Cart buttons
  grid.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const pId = btn.dataset.id;
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Adding...";
      
      try {
        await api("/cart/items", {
          method: "POST",
          auth: true,
          body: { productId: Number(pId), qty: 1 },
        });
        toast("Added to cart", "success");
        refreshCartBadge();
        btn.disabled = false;
        btn.textContent = originalText;
      } catch (err) {
        btn.disabled = false;
        btn.textContent = originalText;
        if (err.message !== "Not authenticated") {
          toast(err.message, "error");
        }
      }
    });
  });

  renderCategoryNav();
}

function setupEventListeners() {
  // Search Form
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = document.getElementById("search-input").value.trim();
      state.search = val;
      renderProducts();
      const catalogEl = document.getElementById("catalog");
      if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderProducts();
    });
  }

  // Price Range
  const applyPriceBtn = document.getElementById("apply-price");
  if (applyPriceBtn) {
    applyPriceBtn.addEventListener("click", () => {
      state.minPrice = document.getElementById("min-price").value;
      state.maxPrice = document.getElementById("max-price").value;
      renderProducts();
    });
  }

  // Reset Filters
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => resetAllFilters());
  }

  const emptyResetBtn = document.getElementById("empty-reset-btn");
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener("click", () => resetAllFilters());
  }

  // Category Showcase Cards on Homepage
  document.querySelectorAll("[data-cat-select]").forEach((cardLink) => {
    cardLink.addEventListener("click", (e) => {
      e.preventDefault();
      state.category = cardLink.dataset.catSelect;
      renderProducts();
      highlightActiveCategory();
      const catalogEl = document.getElementById("catalog");
      if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function resetAllFilters() {
  state.search = "";
  state.category = "";
  state.sort = "";
  state.minPrice = "";
  state.maxPrice = "";
  
  if (document.getElementById("search-input")) document.getElementById("search-input").value = "";
  if (document.getElementById("sort-select")) document.getElementById("sort-select").value = "";
  if (document.getElementById("min-price")) document.getElementById("min-price").value = "";
  if (document.getElementById("max-price")) document.getElementById("max-price").value = "";

  renderProducts();
  highlightActiveCategory();
}

async function init() {
  setupEventListeners();

  try {
    const [categoriesRes, productsRes] = await Promise.all([
      api("/categories"),
      api("/products"),
    ]);
    categoryList = (categoriesRes && categoriesRes.categories) ? categoriesRes.categories : FALLBACK_CATEGORIES;
    allProducts = (productsRes && productsRes.products) ? productsRes.products : FALLBACK_PRODUCTS;
    renderProducts();
  } catch (err) {
    // If backend is currently offline or unreachable during isolated preview,
    // load verified fallback catalog data so all UI features can be evaluated smoothly.
    console.warn("API server offline or unreachable:", err.message);
    categoryList = FALLBACK_CATEGORIES;
    allProducts = FALLBACK_PRODUCTS;
    renderProducts();
    toast("Running with preview catalog (Backend offline)", "info");
  }
}

init();
