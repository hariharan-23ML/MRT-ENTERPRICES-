// app.js - homepage/catalog logic
// NOTE: GET /api/products returns the full catalog with no server-side
// search/filter/sort support, so all of that is applied client-side here.

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

document.getElementById("search-input").value = state.search;

async function loadCategories() {
  const res = await api("/categories");
  categoryList = res.categories || [];
}

function renderCategoryNav() {
  const nav = document.getElementById("category-nav-list");
  const filterList = document.getElementById("filter-categories");

  const counts = {};
  allProducts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

  nav.innerHTML = `<a href="index.html" class="${!state.category ? "active" : ""}" data-cat="">All Equipment</a>` +
    categoryList.map(c => `<a href="?category=${c.id}" class="${String(state.category) === String(c.id) ? "active" : ""}" data-cat="${c.id}">${escapeHtml(c.name)}</a>`).join("");

  filterList.innerHTML = categoryList.map(c => `
    <div class="filter-option" data-cat="${c.id}">
      <span>${escapeHtml(c.name)}</span>
      <span class="n">${counts[c.id] || 0}</span>
    </div>
  `).join("");

  filterList.querySelectorAll(".filter-option").forEach(el => {
    el.addEventListener("click", () => {
      state.category = String(state.category) === el.dataset.cat ? "" : el.dataset.cat;
      renderProducts();
      highlightActiveCategory();
    });
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      state.category = a.dataset.cat;
      renderProducts();
      highlightActiveCategory();
    });
  });
}

function highlightActiveCategory() {
  document.querySelectorAll("#category-nav-list a").forEach(a => {
    a.classList.toggle("active", a.dataset.cat === String(state.category));
  });
}

function productCard(p) {
  const lowStock = p.stock < 10;
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}">
        <div class="product-thumb">
          ${productVisualHtml(p.image)}
          <span class="stamp">Verified</span>
        </div>
      </a>
      <div class="product-body">
        <div class="product-sku">SKU ${escapeHtml(displaySku(p))}</div>
        <a href="product.html?id=${p.id}"><div class="product-name">${escapeHtml(p.name)}</div></a>
        <div class="product-brand">${escapeHtml(p.brand || "Generic")}</div>
        <div class="product-price-row">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.mrp && p.mrp > p.price ? `<span class="mrp">${formatPrice(p.mrp)}</span>` : ""}
        </div>
        <div class="stock-note ${lowStock ? "low" : "ok"}">${lowStock ? `Only ${p.stock} left` : `${p.stock} in stock`}</div>
        <button class="btn btn-dark btn-block add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

function applyFilters() {
  let result = [...allProducts];

  if (state.search) {
    const q = state.search.toLowerCase();
    result = result.filter(p =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.desc || "").toLowerCase().includes(q)
    );
  }
  if (state.category) {
    result = result.filter(p => String(p.category) === String(state.category));
  }
  if (state.minPrice) result = result.filter(p => p.price >= Number(state.minPrice));
  if (state.maxPrice) result = result.filter(p => p.price <= Number(state.maxPrice));

  if (state.sort === "price_asc") result.sort((a, b) => a.price - b.price);
  else if (state.sort === "price_desc") result.sort((a, b) => b.price - a.price);

  return result;
}

function renderProducts() {
  const filtered = applyFilters();
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  document.getElementById("result-count").textContent = `— ${filtered.length} item${filtered.length === 1 ? "" : "s"}`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = filtered.map(productCard).join("");
  }

  grid.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await api("/cart/items", { method: "POST", auth: true, body: { productId: btn.dataset.id, qty: 1 } });
        toast("Added to cart");
        refreshCartBadge();
      } catch (err) {
        if (err.message !== "Not authenticated") toast(err.message);
      }
    });
  });

  renderCategoryNav();
}

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.search = document.getElementById("search-input").value.trim();
  renderProducts();
});

document.getElementById("sort-select").addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderProducts();
});

document.getElementById("apply-price").addEventListener("click", () => {
  state.minPrice = document.getElementById("min-price").value;
  state.maxPrice = document.getElementById("max-price").value;
  renderProducts();
});

async function init() {
  const grid = document.getElementById("product-grid");
  try {
    const [categoriesRes, productsRes] = await Promise.all([
      api("/categories"),
      api("/products"),
    ]);
    categoryList = categoriesRes.categories || [];
    allProducts = productsRes.products || [];
    renderProducts();
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><div class="icon">⚠️</div><p>Couldn't load the catalog: ${escapeHtml(err.message)}</p></div>`;
  }
}

init();
