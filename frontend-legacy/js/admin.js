// admin.js - Administrative Operations Console for MediSource
// Handles role-based access checks, metrics dashboard, product inventory management,
// order inspection, and product modals.

let currentTab = "dashboard";
let categoryCache = [];
let allAdminProducts = [];

function guardAdmin() {
  const guard = document.getElementById("admin-guard");
  if (!guard) return false;

  if (!Session.isLoggedIn()) {
    guard.innerHTML = `
      <div class="empty-state" style="max-width:560px; margin:40px auto;">
        <div class="icon">🔒</div>
        <h3>Admin Authentication Required</h3>
        <p>Please sign in with administrator credentials to access the MediSource Operations Console.</p>
        <a href="login.html?next=admin.html" class="btn btn-primary" style="margin-top:12px;">Sign In to Console</a>
      </div>
    `;
    return false;
  }

  if (!Session.isAdmin()) {
    guard.innerHTML = `
      <div class="empty-state" style="max-width:560px; margin:40px auto;">
        <div class="icon">⛔</div>
        <h3>Access Restricted</h3>
        <p>Your authenticated account does not possess administrator privileges for MRT Enterprises.</p>
        <div style="margin-top:14px; display:flex; gap:10px; justify-content:center;">
          <a href="index.html" class="btn btn-primary">Return to Storefront</a>
          <a href="login.html" class="btn btn-outline-dark">Switch Account</a>
        </div>
      </div>
    `;
    return false;
  }

  guard.innerHTML = "";
  return true;
}

// Sidebar Tab Navigation
document.querySelectorAll(".admin-sidebar a[data-tab]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".admin-sidebar a").forEach((x) => x.classList.remove("active"));
    a.classList.add("active");
    currentTab = a.dataset.tab;
    renderTab();
  });
});

async function ensureCategories() {
  if (categoryCache.length) return categoryCache;
  try {
    const res = await api("/categories");
    categoryCache = (res && res.categories) ? res.categories : [];
  } catch (err) {
    categoryCache = [
      { id: "diagnostic", name: "Diagnostic Equipment" },
      { id: "icu", name: "ICU & Emergency" },
      { id: "surgical", name: "Surgical Instruments" },
      { id: "dental", name: "Dental Equipment" },
      { id: "furniture", name: "Hospital Furniture" },
      { id: "lab", name: "Laboratory Equipment" },
      { id: "orthopedic", name: "Orthopedic & Rehab" },
      { id: "disposables", name: "Disposables & PPE" },
    ];
  }
  return categoryCache;
}

function categoryName(id) {
  const c = categoryCache.find((cat) => String(cat.id).toLowerCase() === String(id).toLowerCase());
  return c ? c.name : `Category ${id}`;
}

async function renderTab() {
  if (!guardAdmin()) {
    document.getElementById("admin-content").innerHTML = "";
    return;
  }
  await ensureCategories();
  if (currentTab === "dashboard") return renderDashboard();
  if (currentTab === "products") return renderProducts();
  if (currentTab === "orders") return renderOrders();
}

// 1. Dashboard Overview Tab
async function renderDashboard() {
  const content = document.getElementById("admin-content");
  content.innerHTML = `<div class="skeleton" style="height:140px; margin-bottom:24px;"></div>`;

  let stats = { productCount: 0, orderCount: 0, revenue: 0, lowStock: 0 };
  try {
    stats = await api("/admin/stats", { auth: true });
  } catch (err) {
    console.warn("Could not load real-time admin stats:", err.message);
  }

  content.innerHTML = `
    <div class="section-head">
      <div class="section-title-wrap">
        <span class="section-eyebrow">Enterprise Telemetry</span>
        <h2>Operations Overview</h2>
      </div>
      <button class="btn btn-primary btn-sm" id="quick-add-btn">
        <span>+ Add Medical Product</span>
      </button>
    </div>

    <!-- Stat Grid -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <div>
          <div class="v">${stats.productCount}</div>
          <div class="l">Active Catalog Products</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        </div>
        <div>
          <div class="v">${stats.orderCount}</div>
          <div class="l">Total Purchase Orders</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
        </div>
        <div>
          <div class="v">${formatPrice(stats.revenue)}</div>
          <div class="l">Gross Invoiced Volume</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon warning">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div>
          <div class="v" style="color:var(--warning);">${stats.lowStock}</div>
          <div class="l">Low Stock Alerts (&lt; 10)</div>
        </div>
      </div>
    </div>

    <!-- Quick Operations Card -->
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:24px; box-shadow:var(--shadow-xs);">
      <h3 style="font-family:var(--font-display); font-size:16px; font-weight:700; color:var(--primary-navy); margin-bottom:12px;">
        Institutional Supply Chain Status
      </h3>
      <p style="font-size:13.5px; color:var(--secondary-text); line-height:1.5; margin-bottom:18px;">
        All product additions, price updates, and inventory changes synchronize directly with the persistent database. Review stock levels and fulfill pending purchase orders using the navigation tabs.
      </p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn btn-outline-dark btn-sm" id="btn-goto-products">Manage Inventory</button>
        <button class="btn btn-outline-dark btn-sm" id="btn-goto-orders">Review Orders</button>
      </div>
    </div>
  `;

  const quickAdd = document.getElementById("quick-add-btn");
  if (quickAdd) quickAdd.addEventListener("click", () => openProductModal());

  const gotoProds = document.getElementById("btn-goto-products");
  if (gotoProds) {
    gotoProds.addEventListener("click", () => {
      document.querySelector('.admin-sidebar a[data-tab="products"]').click();
    });
  }

  const gotoOrders = document.getElementById("btn-goto-orders");
  if (gotoOrders) {
    gotoOrders.addEventListener("click", () => {
      document.querySelector('.admin-sidebar a[data-tab="orders"]').click();
    });
  }
}

// 2. Product Management Tab
async function renderProducts() {
  const content = document.getElementById("admin-content");
  content.innerHTML = `<div class="skeleton" style="height:320px; border-radius:var(--radius-lg);"></div>`;

  let products = [];
  try {
    products = await api("/admin/products", { auth: true });
    allAdminProducts = products;
  } catch (err) {
    content.innerHTML = `
      <div class="empty-state">
        <div class="icon">⚠️</div>
        <h3>Failed to Load Products</h3>
        <p>${escapeHtml(err.message)}</p>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="section-head">
      <div class="section-title-wrap">
        <span class="section-eyebrow">Catalog Administration</span>
        <h2>Medical Equipment Inventory (${products.length})</h2>
      </div>
      <button class="btn btn-primary" id="new-product-btn">
        <span>+ Add Medical Product</span>
      </button>
    </div>

    <!-- Admin Filter Bar -->
    <div style="display:flex; gap:12px; margin-bottom:18px; flex-wrap:wrap;">
      <input type="text" id="admin-product-search" placeholder="Filter by product name, SKU, or brand…" style="flex:1; min-width:240px; padding:10px 14px; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-size:13.5px;">
    </div>

    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name &amp; Brand</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Stock Status</th>
            <th style="text-align:right;">Actions</th>
          </tr>
        </thead>
        <tbody id="admin-products-tbody">
          ${renderProductRows(products)}
        </tbody>
      </table>
    </div>
  `;

  bindProductTableActions(products);

  // Search filter inside admin products
  const searchEl = document.getElementById("admin-product-search");
  if (searchEl) {
    searchEl.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = allAdminProducts.filter((p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        displaySku(p).toLowerCase().includes(q)
      );
      document.getElementById("admin-products-tbody").innerHTML = renderProductRows(filtered);
      bindProductTableActions(filtered);
    });
  }

  const newBtn = document.getElementById("new-product-btn");
  if (newBtn) newBtn.addEventListener("click", () => openProductModal());
}

function renderProductRows(products) {
  if (products.length === 0) {
    return `<tr><td colspan="6" style="text-align:center; padding:32px; color:var(--secondary-text);">No equipment records matched.</td></tr>`;
  }

  return products.map((p) => {
    const stock = Number(p.stock || 0);
    const lowStock = stock < 10;
    return `
      <tr>
        <td class="product-sku" style="font-weight:700;">${escapeHtml(displaySku(p))}</td>
        <td>
          <div style="font-weight:600; color:var(--primary-navy);">${escapeHtml(p.name)}</div>
          <div style="font-size:11.5px; color:var(--secondary-text);">${escapeHtml(p.brand || "Certified Generic")}</div>
        </td>
        <td>${escapeHtml(categoryName(p.category))}</td>
        <td style="font-weight:700;">${formatPrice(p.price)}</td>
        <td>
          <span class="stock-note ${stock <= 0 ? "out" : lowStock ? "low" : "ok"}">
            ${stock <= 0 ? "Out of Stock" : lowStock ? `Low (${stock})` : `${stock} Units`}
          </span>
        </td>
        <td style="text-align:right; white-space:nowrap;">
          <button class="icon-btn edit-btn" data-id="${p.id}" title="Edit product parameters">Edit</button>
          <button class="icon-btn delete-btn" data-id="${p.id}" title="Delete product">Delete</button>
        </td>
      </tr>
    `;
  }).join("");
}

function bindProductTableActions(products) {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = products.find((p) => String(p.id) === String(btn.dataset.id));
      if (product) openProductModal(product);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const pId = btn.dataset.id;
      const target = products.find((p) => String(p.id) === String(pId));
      const pName = target ? target.name : `Product #${pId}`;

      if (!confirm(`Are you sure you want to permanently delete "${pName}" from the medical catalog? This cannot be undone.`)) {
        return;
      }

      try {
        await api(`/admin/products/${pId}`, { method: "DELETE", auth: true });
        toast("Product deleted from catalog", "info");
        renderProducts();
      } catch (err) {
        toast(err.message, "error");
      }
    });
  });
}

// 3. Product Add / Edit Modal
function openProductModal(product) {
  const isEdit = !!product;
  const root = document.getElementById("modal-root");

  root.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop" role="dialog" aria-modal="true">
      <div class="modal">
        <div class="modal-header">
          <h2>${isEdit ? "Edit Medical Equipment" : "Add New Medical Equipment"}</h2>
          <button type="button" class="modal-close-btn" id="modal-close-x" aria-label="Close dialog">✕</button>
        </div>

        <div id="modal-error"></div>

        <form id="product-form" novalidate>
          <div class="form-field">
            <label for="m-name">
              <span>Equipment Name</span>
              <span class="req">*</span>
            </label>
            <input type="text" id="m-name" value="${isEdit ? escapeHtml(product.name) : ""}" placeholder="e.g. Digital X-Ray Machine DX-200" required>
          </div>

          <div class="form-grid">
            <div class="form-field">
              <label for="m-brand">Manufacturer Brand</label>
              <input type="text" id="m-brand" value="${isEdit ? escapeHtml(product.brand || "") : ""}" placeholder="e.g. Radiotech">
            </div>

            <div class="form-field">
              <label for="m-category">
                <span>Clinical Category</span>
                <span class="req">*</span>
              </label>
              <select id="m-category" required>
                ${categoryCache.map((c) => `
                  <option value="${c.id}" ${isEdit && String(product.category).toLowerCase() === String(c.id).toLowerCase() ? "selected" : ""}>
                    ${escapeHtml(c.name)}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-field">
              <label for="m-price">
                <span>Unit Price (₹)</span>
                <span class="req">*</span>
              </label>
              <input type="number" id="m-price" min="0" value="${isEdit ? product.price : ""}" placeholder="e.g. 845000" required>
            </div>

            <div class="form-field">
              <label for="m-stock">Available Stock Units</label>
              <input type="number" id="m-stock" min="0" value="${isEdit ? product.stock : "10"}" placeholder="10">
            </div>
          </div>

          <div class="form-field">
            <label for="m-image">Product Image / Visual Slug</label>
            <input type="text" id="m-image" value="${isEdit ? escapeHtml(product.image || "") : ""}" placeholder="e.g. xray, monitor, or https://…">
          </div>

          <div class="form-field">
            <label for="m-desc">Technical &amp; Clinical Description</label>
            <textarea id="m-desc" rows="3" placeholder="Enter specifications, certifications, and clinical workflows…">${isEdit ? escapeHtml(product.desc || "") : ""}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; padding-top:14px; border-top:1px solid var(--border);">
            <button type="button" class="btn btn-outline-dark" id="modal-cancel">Cancel</button>
            <button type="submit" class="btn btn-primary" id="modal-submit-btn">
              ${isEdit ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const closeModal = () => { root.innerHTML = ""; };

  document.getElementById("modal-cancel").addEventListener("click", closeModal);
  document.getElementById("modal-close-x").addEventListener("click", closeModal);
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });

  // Modal Submit Handler
  document.getElementById("product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById("modal-error");
    errorEl.innerHTML = "";
    const submitBtn = document.getElementById("modal-submit-btn");

    const name = document.getElementById("m-name").value.trim();
    const brand = document.getElementById("m-brand").value.trim();
    const category = document.getElementById("m-category").value;
    const price = Number(document.getElementById("m-price").value);
    const stock = Number(document.getElementById("m-stock").value || 0);
    const image = document.getElementById("m-image").value.trim();
    const desc = document.getElementById("m-desc").value.trim();

    if (!name || isNaN(price) || price < 0) {
      errorEl.innerHTML = `<div class="error-box">Please specify a valid product name and non-negative price.</div>`;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Saving…";

    const body = {
      name,
      brand: brand || "Certified Generic",
      category,
      price,
      stock,
      image: image || "placeholder",
      desc,
    };

    try {
      if (isEdit) {
        await api(`/admin/products/${product.id}`, { method: "PUT", auth: true, body });
      } else {
        await api("/admin/products", { method: "POST", auth: true, body });
      }
      toast(isEdit ? "Product parameters updated" : "Medical product created", "success");
      closeModal();
      renderProducts();
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = isEdit ? "Save Changes" : "Create Product";
      errorEl.innerHTML = `<div class="error-box">${escapeHtml(err.message)}</div>`;
    }
  });
}

// 4. Order Management Tab
async function renderOrders() {
  const content = document.getElementById("admin-content");
  content.innerHTML = `<div class="skeleton" style="height:320px; border-radius:var(--radius-lg);"></div>`;

  let orders = [];
  try {
    orders = await api("/admin/orders", { auth: true });
  } catch (err) {
    content.innerHTML = `
      <div class="empty-state">
        <div class="icon">⚠️</div>
        <h3>Failed to Load Orders</h3>
        <p>${escapeHtml(err.message)}</p>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="section-head">
      <div class="section-title-wrap">
        <span class="section-eyebrow">Procurement Operations</span>
        <h2>Healthcare Purchase Orders (${orders.length})</h2>
      </div>
    </div>

    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Consignee / Destination</th>
            <th>Equipment Items</th>
            <th>Total Amount</th>
            <th>Order Status</th>
            <th style="text-align:right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${orders.length === 0 ? `
            <tr><td colspan="7" style="text-align:center; padding:36px; color:var(--secondary-text);">No purchase orders placed yet.</td></tr>
          ` : orders.map((o) => {
            const dateStr = new Date(o.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const status = String(o.status || "confirmed").toLowerCase();
            const itemCount = (o.items || []).reduce((sum, item) => sum + item.qty, 0);

            return `
              <tr>
                <td class="product-sku" style="font-weight:700;">#MED-${o.id}</td>
                <td style="white-space:nowrap;">${dateStr}</td>
                <td>
                  <div style="font-weight:600; color:var(--primary-navy);">${escapeHtml((o.address && o.address.name) || "Consignee")}</div>
                  <div style="font-size:11.5px; color:var(--secondary-text);">${escapeHtml((o.address && o.address.city) || "")}</div>
                </td>
                <td>
                  <span style="font-weight:600;">${itemCount} unit${itemCount === 1 ? "" : "s"}</span>
                  <div style="font-size:11px; color:var(--secondary-text); max-width:200px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                    ${(o.items || []).map(i => escapeHtml(i.name)).join(", ")}
                  </div>
                </td>
                <td style="font-weight:700;">${formatPrice(o.total)}</td>
                <td>
                  <span class="status-badge ${status}">● ${escapeHtml(status)}</span>
                </td>
                <td style="text-align:right;">
                  <a href="order-confirmation.html?id=${o.id}" class="icon-btn" target="_blank" title="View tax invoice receipt">
                    Invoice
                  </a>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

renderTab();
