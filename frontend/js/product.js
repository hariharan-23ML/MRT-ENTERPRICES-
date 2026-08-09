const productId = new URLSearchParams(window.location.search).get("id");
let currentQty = 1;

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("search-input").value.trim();
  window.location.href = "index.html?search=" + encodeURIComponent(q);
});

async function load() {
  const el = document.getElementById("pdp-content");
  if (!productId) {
    el.innerHTML = `<div class="empty-state"><div class="icon">❓</div><p>No product specified.</p></div>`;
    return;
  }
  let p;
  try {
    p = await api(`/products/${productId}`);
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><div class="icon">❓</div><p>Product not found.</p></div>`;
    return;
  }

  const stock = Number(p.stock || 0);

  el.innerHTML = `
    <div class="pdp-image">${productVisualHtml(p.image)}</div>
    <div class="pdp-info">
      <div class="product-sku">SKU ${escapeHtml(displaySku(p))} · ${escapeHtml(p.brand || "Generic")}</div>
      <h1>${escapeHtml(p.name)}</h1>
      <div class="product-price-row">
        <span class="price" style="font-size:26px">${formatPrice(p.price)}</span>
        ${p.mrp && p.mrp > p.price ? `<span class="mrp">${formatPrice(p.mrp)}</span>` : ""}
      </div>
      <p>${escapeHtml(p.desc || "No description available.")}</p>
      <table class="spec-table">
        <tr><td>Brand</td><td>${escapeHtml(p.brand || "Generic")}</td></tr>
        <tr><td>Availability</td><td class="${stock < 10 ? "stock-note low" : "stock-note ok"}">${stock < 10 ? `Only ${stock} left` : `${stock} in stock`}</td></tr>
        ${p.rating ? `<tr><td>Rating</td><td>${"★".repeat(Math.round(p.rating))} ${p.rating}</td></tr>` : ""}
      </table>
      <div class="qty-stepper" id="qty-stepper">
        <button id="qty-dec">−</button>
        <span id="qty-val">1</span>
        <button id="qty-inc">+</button>
      </div>
      <div style="display:flex; gap:12px; margin-top:18px">
        <button class="btn btn-primary" id="add-cart-btn" ${stock <= 0 ? "disabled" : ""}>Add to Cart</button>
        <button class="btn btn-outline" style="color:var(--navy); border-color:var(--border)" id="buy-now-btn" ${stock <= 0 ? "disabled" : ""}>Buy Now</button>
      </div>
    </div>
  `;

  document.getElementById("qty-inc").addEventListener("click", () => {
    currentQty = Math.min(currentQty + 1, Math.max(stock, 1));
    document.getElementById("qty-val").textContent = currentQty;
  });
  document.getElementById("qty-dec").addEventListener("click", () => {
    currentQty = Math.max(currentQty - 1, 1);
    document.getElementById("qty-val").textContent = currentQty;
  });
  const addBtn = document.getElementById("add-cart-btn");
  const buyBtn = document.getElementById("buy-now-btn");
  if (addBtn) addBtn.addEventListener("click", async () => {
    try {
      await api("/cart/items", { method: "POST", auth: true, body: { productId: p.id, qty: currentQty } });
      toast("Added to cart");
      refreshCartBadge();
    } catch (err) {
      if (err.message !== "Not authenticated") toast(err.message);
    }
  });
  if (buyBtn) buyBtn.addEventListener("click", async () => {
    try {
      await api("/cart/items", { method: "POST", auth: true, body: { productId: p.id, qty: currentQty } });
      window.location.href = "cart.html";
    } catch (err) {
      if (err.message !== "Not authenticated") toast(err.message);
    }
  });
}

load();
