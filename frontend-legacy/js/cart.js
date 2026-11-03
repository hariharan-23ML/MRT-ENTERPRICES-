// cart.js - Shopping Cart management for MediSource
// Handles fetching cart, quantity updates, line item removal, subtotal calculation,
// and cart badge synchronization.

async function loadCart() {
  const linesEl = document.getElementById("cart-lines");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!linesEl) return;

  if (!Session.isLoggedIn()) {
    linesEl.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔒</div>
        <h3>Authentication Required</h3>
        <p>Please sign in with your institutional or hospital account to access your procurement cart.</p>
        <a href="login.html?next=cart.html" class="btn btn-primary" style="margin-top:12px;">Sign In to Account</a>
      </div>
    `;
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = "none";
      checkoutBtn.style.opacity = "0.5";
    }
    updateSummaryUI(0, 0);
    return;
  }

  let cart;
  try {
    cart = await api("/cart", { auth: true });
  } catch (err) {
    linesEl.innerHTML = `
      <div class="empty-state">
        <div class="icon">⚠️</div>
        <h3>Could Not Load Cart</h3>
        <p>${escapeHtml(err.message)}</p>
        <button class="btn btn-outline-dark" onclick="loadCart()" style="margin-top:12px;">Try Again</button>
      </div>
    `;
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = "none";
      checkoutBtn.style.opacity = "0.5";
    }
    return;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    linesEl.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <h3>Your Procurement Cart is Empty</h3>
        <p>Explore our catalog of certified medical equipment, ICU devices, diagnostic systems, and clinical supplies.</p>
        <a href="index.html#catalog" class="btn btn-primary" style="margin-top:12px;">Browse Medical Equipment</a>
      </div>
    `;
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = "none";
      checkoutBtn.style.opacity = "0.5";
    }
    updateSummaryUI(0, 0);
    refreshCartBadge();
    return;
  }

  // Active items in cart
  if (checkoutBtn) {
    checkoutBtn.style.pointerEvents = "auto";
    checkoutBtn.style.opacity = "1";
  }

  linesEl.innerHTML = cart.items.map((i) => `
    <div class="cart-line" data-id="${i.product.id}">
      <div class="thumb-mini">
        ${productVisualHtml(i.product.image)}
      </div>
      <div>
        <a href="product.html?id=${i.product.id}" class="cart-line-title">
          ${escapeHtml(i.product.name)}
        </a>
        <div class="cart-line-sku">
          SKU: <strong>${escapeHtml(displaySku(i.product))}</strong> · ${formatPrice(i.product.price)} each
        </div>
      </div>
      <div class="qty-stepper">
        <button type="button" class="qty-dec" aria-label="Decrease quantity">−</button>
        <span>${i.qty}</span>
        <button type="button" class="qty-inc" aria-label="Increase quantity">+</button>
      </div>
      <div class="price">
        ${formatPrice(i.lineTotal)}
      </div>
      <button type="button" class="remove-link" title="Remove item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        <span>Remove</span>
      </button>
    </div>
  `).join("");

  // Attach button event listeners
  linesEl.querySelectorAll(".cart-line").forEach((line) => {
    const id = line.dataset.id;
    const incBtn = line.querySelector(".qty-inc");
    const decBtn = line.querySelector(".qty-dec");
    const rmBtn = line.querySelector(".remove-link");

    if (incBtn) incBtn.addEventListener("click", () => updateQty(id, 1));
    if (decBtn) decBtn.addEventListener("click", () => updateQty(id, -1));
    if (rmBtn) rmBtn.addEventListener("click", () => removeItem(id));
  });

  const totalCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
  updateSummaryUI(totalCount, cart.total || 0);
  refreshCartBadge();
}

function updateSummaryUI(count, total) {
  const sumCountEl = document.getElementById("sum-count");
  const sumSubtotalEl = document.getElementById("sum-subtotal");
  const sumTotalEl = document.getElementById("sum-total");

  if (sumCountEl) sumCountEl.textContent = String(count);
  if (sumSubtotalEl) sumSubtotalEl.textContent = formatPrice(total);
  if (sumTotalEl) sumTotalEl.textContent = formatPrice(total);
}

async function updateQty(productId, delta) {
  try {
    const cart = await api("/cart", { auth: true });
    const line = cart.items.find((i) => String(i.product.id) === String(productId));
    const newQty = (line ? line.qty : 0) + delta;
    
    await api(`/cart/items/${productId}`, {
      method: "PUT",
      auth: true,
      body: { qty: newQty },
    });
    loadCart();
  } catch (err) {
    toast(err.message, "error");
  }
}

async function removeItem(productId) {
  try {
    await api(`/cart/items/${productId}`, {
      method: "DELETE",
      auth: true,
    });
    toast("Item removed from procurement cart", "info");
    loadCart();
  } catch (err) {
    toast(err.message, "error");
  }
}

loadCart();
