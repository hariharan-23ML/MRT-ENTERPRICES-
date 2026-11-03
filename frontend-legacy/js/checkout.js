// checkout.js - Checkout flow and order placement for MediSource
// Handles pre-filling user info, cart line summary, validation, and placing orders.

if (!Session.isLoggedIn()) {
  window.location.href = "login.html?next=checkout.html";
}

// Pre-fill user profile info if available
document.addEventListener("DOMContentLoaded", () => {
  const user = Session.getUser();
  if (user && user.name) {
    const nameEl = document.getElementById("f-name");
    if (nameEl && !nameEl.value) {
      nameEl.value = user.name;
    }
  }

  try {
    const rawProfile = localStorage.getItem("mrt_org_profile");
    if (rawProfile) {
      const profile = JSON.parse(rawProfile);
      const gstEl = document.getElementById("f-gst");
      if (gstEl && profile.gstin) gstEl.value = profile.gstin;
    }
  } catch (e) {}
});

async function loadSummary() {
  const summary = document.getElementById("checkout-summary");
  const content = document.getElementById("checkout-content");

  let cart;
  try {
    cart = await api("/cart", { auth: true });
  } catch (err) {
    if (content) {
      content.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="icon">⚠️</div>
          <h3>Unable to Load Order Items</h3>
          <p>${escapeHtml(err.message)}</p>
          <a href="cart.html" class="btn btn-primary" style="margin-top:12px;">Return to Cart</a>
        </div>
      `;
    }
    return;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    if (content) {
      content.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="icon">🛒</div>
          <h3>Your Procurement Cart is Empty</h3>
          <p>You have no equipment items in your cart to check out.</p>
          <a href="index.html#catalog" class="btn btn-primary" style="margin-top:12px;">Browse Medical Equipment</a>
        </div>
      `;
    }
    return;
  }

  summary.innerHTML = `
    <h3>Order Summary</h3>
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px; max-height:260px; overflow-y:auto; padding-right:4px;">
      ${cart.items.map((i) => `
        <div class="summary-row" style="padding:4px 0;">
          <div style="max-width:180px;">
            <div style="font-weight:600; font-size:13px; line-height:1.3;">${escapeHtml(i.product.name)}</div>
            <div style="font-size:11.5px; color:var(--secondary-text);">Qty: ${i.qty} · ${formatPrice(i.product.price)}</div>
          </div>
          <div style="font-weight:600; font-size:13.5px;">${formatPrice(i.lineTotal)}</div>
        </div>
      `).join("")}
    </div>

    <div class="summary-row">
      <span>Subtotal (${cart.items.reduce((s, i) => s + i.qty, 0)} items)</span>
      <span>${formatPrice(cart.total)}</span>
    </div>
    <div class="summary-row">
      <span>Pan-India Medical Freight</span>
      <span style="color:var(--success); font-weight:600;">Complimentary</span>
    </div>
    <div class="summary-row">
      <span>B2B Tax Invoicing</span>
      <span style="color:var(--primary-blue); font-weight:600;">Included</span>
    </div>
    
    <div class="summary-row total">
      <span>Total Payable</span>
      <span>${formatPrice(cart.total)}</span>
    </div>

    <div class="summary-badge-strip">
      <div class="summary-badge-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        <span>256-Bit SSL Encrypted Healthcare Checkout</span>
      </div>
      <div class="summary-badge-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        <span>GST Invoice Generated with HSN/SAC</span>
      </div>
    </div>
  `;
}

// Checkout Form Submission
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById("checkout-error");
    errorEl.innerHTML = "";

    const btn = document.getElementById("place-order-btn");
    
    const name = document.getElementById("f-name").value.trim();
    const line1 = document.getElementById("f-line1").value.trim();
    const city = document.getElementById("f-city").value.trim();
    const pin = document.getElementById("f-pin").value.trim();
    const phone = document.getElementById("f-phone").value.trim();
    const paymentMethod = document.getElementById("f-payment").value;
    const gstin = document.getElementById("f-gst") ? document.getElementById("f-gst").value.trim() : "";

    // Field Validation
    if (!name || !line1 || !city || !pin || !phone) {
      errorEl.innerHTML = `<div class="error-box">Please fill in all mandatory fields: Facility Contact, Address, City, PIN, and Phone.</div>`;
      return;
    }

    // Prevent duplicate submissions
    btn.disabled = true;
    btn.textContent = "Placing order with facility verification…";

    const address = {
      name,
      line1,
      city,
      pin,
      phone,
      gstin: gstin || undefined,
    };

    try {
      const order = await api("/orders/checkout", {
        method: "POST",
        auth: true,
        body: { address, paymentMethod },
      });

      toast("Order confirmed successfully!", "success");
      setTimeout(() => {
        window.location.href = `order-confirmation.html?id=${order.id}`;
      }, 350);
    } catch (err) {
      errorEl.innerHTML = `<div class="error-box">${escapeHtml(err.message)}</div>`;
      btn.disabled = false;
      btn.textContent = "Confirm & Place Order";
    }
  });
}

loadSummary();
