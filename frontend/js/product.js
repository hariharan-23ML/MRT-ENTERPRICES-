// product.js - Product Details Page (PDP) logic for MediSource
// Handles fetching product by ID, quantity stepper with stock constraints,
// Add-to-cart, Buy-now, specification rendering, and related products.

const productId = new URLSearchParams(window.location.search).get("id");
let currentQty = 1;
let currentProduct = null;

// Search bar in header
const searchFormEl = document.getElementById("search-form");
if (searchFormEl) {
  searchFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("search-input").value.trim();
    window.location.href = "index.html?search=" + encodeURIComponent(q);
  });
}

// Fallback products if backend is in offline preview mode
const FALLBACK_PRODUCTS = [
  { id: 1, name: "Digital X-Ray Machine DX-200", category: "diagnostic", price: 845000, mrp: 920000, stock: 6, brand: "Radiotech", sku: "DX-200", rating: 4.6, desc: "High-frequency digital radiography system with flat-panel detector, automated exposure control, and DICOM 3.0 network output.", image: "xray" },
  { id: 2, name: "Portable Ultrasound Scanner US-7", category: "diagnostic", price: 312000, mrp: 349000, stock: 14, brand: "Sonoline", sku: "US-7", rating: 4.4, desc: "Compact color doppler ultrasound system with 12-inch high-resolution touchscreen, 3 probe connectors, and built-in battery.", image: "ultrasound" },
  { id: 3, name: "12-Lead ECG Machine EC-12", category: "diagnostic", price: 48500, mrp: 55000, stock: 32, brand: "Cardiomax", sku: "EC-12", rating: 4.7, desc: "Interpretive 12-channel electrocardiograph with high-speed thermal array printer and 8-hour rechargeable lithium backup.", image: "ecg" },
  { id: 4, name: "Multi-Para Patient Monitor PM-500", category: "icu", price: 76500, mrp: 84000, stock: 21, brand: "Vitalcare", sku: "PM-500", rating: 4.5, desc: "Continuous SpO2, NIBP, ECG, respiration and dual temperature monitoring on a vibrant 15-inch anti-glare TFT display.", image: "monitor" },
  { id: 5, name: "ICU Ventilator V-Air 3", category: "icu", price: 415000, mrp: 460000, stock: 5, brand: "Pulmotech", sku: "VAIR-3", rating: 4.8, desc: "Adult and pediatric invasive/non-invasive intensive care ventilator with SIMV, PSV, and CPAP respiratory delivery modes.", image: "ventilator" },
  { id: 6, name: "Defibrillator DF-100 Biphasic", category: "icu", price: 168000, mrp: 185000, stock: 9, brand: "Cardiomax", sku: "DF-100", rating: 4.6, desc: "Biphasic defibrillator with manual and automated AED modes, integrated ECG waveform monitor, and pediatric paddles.", image: "defib" },
  { id: 7, name: "Electrosurgical Unit ES-300", category: "surgical", price: 92000, mrp: 101000, stock: 11, brand: "Suretech", sku: "ES-300", rating: 4.3, desc: "300W micro-controlled surgical cut and coagulation unit supporting monopolar cutting, blending, and bipolar coag modes.", image: "surgical" },
  { id: 8, name: "OT Surgical Light SL-Twin", category: "surgical", price: 138000, mrp: 152000, stock: 7, brand: "Luxmed", sku: "SLTWIN", rating: 4.5, desc: "Dual-dome ceiling-mounted surgical LED operating light delivering 160,000 lux shadowless clinical illumination with color temp control.", image: "light" },
  { id: 9, name: "Surgical Instrument Kit (Basic, 42pc)", category: "surgical", price: 14200, mrp: 16500, stock: 60, brand: "Suretech", sku: "SIK-42", rating: 4.2, desc: "Surgical-grade stainless steel general surgery kit with scalpel handles, hemostatic forceps, scissors, and autoclavable case.", image: "kit" },
  { id: 10, name: "Dental Chair Unit DC-Pro", category: "dental", price: 225000, mrp: 250000, stock: 8, brand: "Smileline", sku: "DCPRO", rating: 4.6, desc: "Fully motorized ergonomic dental operatory chair with LED sensor dental light, 3-way syringe, saliva ejector, and doctor stool.", image: "dental-chair" },
  { id: 11, name: "Dental Autoclave Sterilizer 18L", category: "dental", price: 38500, mrp: 43000, stock: 18, brand: "Smileline", sku: "AC-18", rating: 4.4, desc: "Class B hospital vacuum autoclave with 18-litre medical-grade 304 stainless chamber, pre-vacuum cycle, and vacuum dry.", image: "autoclave" },
  { id: 12, name: "Electric Wheelchair EW-Comfort", category: "orthopedic", price: 62000, mrp: 69000, stock: 15, brand: "Mobilease", sku: "EWC-1", rating: 4.3, desc: "Lightweight foldable electric wheelchair with 25km range per charge, intelligent electromagnetic braking, and 360-degree joystick.", image: "wheelchair" },
  { id: 13, name: "CPM Knee Rehab Machine", category: "orthopedic", price: 89000, mrp: 98000, stock: 6, brand: "Rehabflex", sku: "CPM-K1", rating: 4.5, desc: "Continuous passive motion rehabilitation device for post-operative knee and hip joint recovery with programmable angular flexion.", image: "cpm" },
  { id: 14, name: "Nitrile Examination Gloves (Box of 100)", category: "disposables", price: 320, mrp: 380, stock: 800, brand: "Safehand", sku: "NEG-100", rating: 4.1, desc: "Medical examination grade powder-free blue nitrile gloves with micro-textured fingertips for high tactile sensitivity.", image: "gloves" },
  { id: 15, name: "3-Ply Surgical Face Mask (Box of 50)", category: "disposables", price: 180, mrp: 220, stock: 1200, brand: "Safehand", sku: "SFM-50", rating: 4.0, desc: "High filtration BFE >= 98% 3-ply surgical masks with meltblown filter layer, soft earloops, and malleable nose bridge.", image: "mask" },
  { id: 16, name: "Digital Analytical Balance AB-220", category: "lab", price: 41500, mrp: 46000, stock: 10, brand: "Precilab", sku: "AB-220", rating: 4.6, desc: "0.1mg readability precision electromagnetic analytical balance with internal motorized calibration and RS-232 interface.", image: "balance" },
  { id: 17, name: "Biochemistry Analyzer BC-240", category: "lab", price: 385000, mrp: 425000, stock: 4, brand: "Precilab", sku: "BC-240", rating: 4.7, desc: "Fully automated clinical chemistry analyzer with 240 tests per hour throughput, refrigerated reagent compartment, and barcode reader.", image: "analyzer" },
  { id: 18, name: "Hospital Bed HB-Electric 3F", category: "furniture", price: 58000, mrp: 65000, stock: 13, brand: "Comfortcare", sku: "HB3F", rating: 4.4, desc: "Three-function electric ICU hospital bed with motorized backrest, knee-rest, and height adjustment with central locking castors.", image: "bed" },
  { id: 19, name: "Bedside Locker with Overbed Table", category: "furniture", price: 9800, mrp: 11500, stock: 40, brand: "Comfortcare", sku: "BL-OT", rating: 4.2, desc: "Antimicrobial powder-coated medical steel bedside cabinet with drawer, cabinet storage, towel rails, and gas-spring overbed tray.", image: "locker" },
  { id: 20, name: "IV Stand Trolley (Stainless, 5-hook)", category: "furniture", price: 2100, mrp: 2600, stock: 150, brand: "Comfortcare", sku: "IVS-5", rating: 4.0, desc: "Heavy-duty 304 stainless steel height-adjustable intravenous infusion stand with 5 rams-horn hooks and five antistatic castors.", image: "iv-stand" },
];

async function loadProduct() {
  const el = document.getElementById("pdp-content");
  if (!productId) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="icon">❓</div>
        <h3>No Equipment Selected</h3>
        <p>Please browse our catalog and select a medical equipment item to view full specifications.</p>
        <a href="index.html#catalog" class="btn btn-primary">Browse Catalog</a>
      </div>
    `;
    return;
  }

  let p;
  try {
    p = await api(`/products/${productId}`);
  } catch (err) {
    console.warn("Could not fetch product from backend API, checking fallback:", err.message);
    p = FALLBACK_PRODUCTS.find((item) => String(item.id) === String(productId));
    if (!p) {
      el.innerHTML = `
        <div class="empty-state">
          <div class="icon">❓</div>
          <h3>Equipment Not Found</h3>
          <p>The medical device you requested could not be located in our catalog.</p>
          <a href="index.html#catalog" class="btn btn-primary">Return to Catalog</a>
        </div>
      `;
      return;
    }
  }

  currentProduct = p;
  const stock = Number(p.stock || 0);
  const outOfStock = stock <= 0;
  const lowStock = stock > 0 && stock < 10;
  
  let stockClass = "ok";
  let stockText = `${stock} Units Available for Dispatch`;
  if (outOfStock) {
    stockClass = "out";
    stockText = "Currently Out of Stock";
  } else if (lowStock) {
    stockClass = "low";
    stockText = `Limited Stock: Only ${stock} units remaining`;
  }

  const discount = (p.mrp && p.mrp > p.price)
    ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
    : 0;

  // Render Product Details Layout
  el.innerHTML = `
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span class="sep">/</span>
      <a href="index.html?category=${encodeURIComponent(p.category || "")}">Catalog</a>
      <span class="sep">/</span>
      <span class="current">${escapeHtml(p.name)}</span>
    </nav>

    <div class="pdp">
      <!-- Left Column: Visual Showcase -->
      <div class="pdp-image-container">
        <div class="pdp-image">
          <div class="pdp-badges-row">
            <span class="stamp">✓ Verified Supplier</span>
            ${discount > 0 ? `<span class="stamp-discount">Save ${discount}%</span>` : ""}
          </div>
          ${productVisualHtml(p.image)}
        </div>
        
        <!-- Trust Points -->
        <div class="pdp-trust-grid">
          <div class="pdp-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>1-Year Comprehensive Warranty</span>
          </div>
          <div class="pdp-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            <span>24-48h Calibrated Dispatch</span>
          </div>
          <div class="pdp-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
            <span>GST B2B Invoice with HSN Code</span>
          </div>
          <div class="pdp-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon></svg>
            <span>Secure Pan-India Freight</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Meta & Purchase Controls -->
      <div class="pdp-info">
        <div class="product-sku">
          SKU: <strong>${escapeHtml(displaySku(p))}</strong> · Manufacturer: <strong>${escapeHtml(p.brand || "Certified Generic")}</strong>
        </div>
        <h1>${escapeHtml(p.name)}</h1>
        
        <div class="pdp-price-card">
          <div class="pdp-price-row">
            <span class="pdp-price">${formatPrice(p.price)}</span>
            ${p.mrp && p.mrp > p.price ? `<span class="mrp" style="font-size:16px;">${formatPrice(p.mrp)}</span>` : ""}
            <span class="tax-badge" style="font-size:12px;">Exclusive of Applicable GST</span>
          </div>
          <div class="pdp-gst-note">
            Institutional HSN tax invoice will be generated upon checkout with Input Tax Credit (ITC) eligibility.
          </div>
        </div>

        <div class="stock-note ${stockClass}" style="font-size:13.5px;">
          ${stockText}
        </div>

        <p class="pdp-desc">
          ${escapeHtml(p.desc || "High-precision commercial medical equipment engineered for institutional hospital and clinic workflows. Certified for performance and patient safety.")}
        </p>

        <!-- Quantity Selector & Actions -->
        <div>
          <label style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; color:var(--secondary-text); display:block; margin-bottom:8px;">
            Procurement Quantity (Units)
          </label>
          <div class="qty-stepper" id="qty-stepper">
            <button type="button" id="qty-dec" aria-label="Decrease quantity" ${outOfStock ? "disabled" : ""}>−</button>
            <span id="qty-val">1</span>
            <button type="button" id="qty-inc" aria-label="Increase quantity" ${outOfStock ? "disabled" : ""}>+</button>
          </div>
          ${outOfStock ? `<div style="font-size:12px; color:var(--danger); margin-top:4px;">Cannot order out of stock items</div>` : ""}
        </div>

        <div style="display:flex; gap:12px; margin-top:12px; flex-wrap:wrap;">
          <button class="btn btn-primary btn-lg" id="add-cart-btn" style="flex:1;" ${outOfStock ? "disabled" : ""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Add to Procurement Cart
          </button>
          <button class="btn btn-dark btn-lg" id="buy-now-btn" style="flex:1;" ${outOfStock ? "disabled" : ""}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Below: Specifications & Technical Details -->
    <div style="margin-top:48px;">
      <div class="section-head">
        <div class="section-title-wrap">
          <span class="section-eyebrow">Technical Parameters</span>
          <h2>Product Specifications &amp; Compliance</h2>
        </div>
      </div>

      <table class="spec-table">
        <tbody>
          <tr>
            <td>Manufacturer Brand</td>
            <td>${escapeHtml(p.brand || "Certified Generic")}</td>
          </tr>
          <tr>
            <td>Product Model / SKU</td>
            <td>${escapeHtml(displaySku(p))}</td>
          </tr>
          <tr>
            <td>Clinical Category</td>
            <td style="text-transform:capitalize;">${escapeHtml(p.category || "General Medical Equipment")}</td>
          </tr>
          <tr>
            <td>Operating Standard</td>
            <td>CE Mark / ISO 13485 Quality Management Certified</td>
          </tr>
          <tr>
            <td>Electrical Rating</td>
            <td>220V - 240V AC, 50/60 Hz Standard Medical Grade Isolated Supply</td>
          </tr>
          <tr>
            <td>Warranty Coverage</td>
            <td>12 Months Comprehensive On-Site Warranty via Certified Engineers</td>
          </tr>
          <tr>
            <td>Availability Status</td>
            <td class="stock-note ${stockClass}">${stockText}</td>
          </tr>
          <tr>
            <td>Documentation Included</td>
            <td>Factory Calibration Certificate, Operator Manual, Warranty Certificate, Tax Invoice</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // Attach Stepper Handlers respecting stock
  const decBtn = document.getElementById("qty-dec");
  const incBtn = document.getElementById("qty-inc");
  const valSpan = document.getElementById("qty-val");

  if (incBtn && decBtn && valSpan) {
    incBtn.addEventListener("click", () => {
      if (stock > 0 && currentQty < stock) {
        currentQty++;
        valSpan.textContent = String(currentQty);
      } else {
        toast(`Maximum available stock is ${stock} units`, "info");
      }
    });

    decBtn.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        valSpan.textContent = String(currentQty);
      }
    });
  }

  // Bind Add to Cart
  const addBtn = document.getElementById("add-cart-btn");
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      const orig = addBtn.innerHTML;
      addBtn.disabled = true;
      addBtn.textContent = "Adding to Cart...";
      try {
        await api("/cart/items", {
          method: "POST",
          auth: true,
          body: { productId: p.id, qty: currentQty },
        });
        toast(`Added ${currentQty} item${currentQty > 1 ? "s" : ""} to cart`, "success");
        refreshCartBadge();
        addBtn.disabled = false;
        addBtn.innerHTML = orig;
      } catch (err) {
        addBtn.disabled = false;
        addBtn.innerHTML = orig;
        if (err.message !== "Not authenticated") {
          toast(err.message, "error");
        }
      }
    });
  }

  // Bind Buy Now (adds to cart and navigates to cart.html)
  const buyBtn = document.getElementById("buy-now-btn");
  if (buyBtn) {
    buyBtn.addEventListener("click", async () => {
      buyBtn.disabled = true;
      buyBtn.textContent = "Processing...";
      try {
        await api("/cart/items", {
          method: "POST",
          auth: true,
          body: { productId: p.id, qty: currentQty },
        });
        window.location.href = "cart.html";
      } catch (err) {
        buyBtn.disabled = false;
        buyBtn.textContent = "Proceed to Checkout";
        if (err.message !== "Not authenticated") {
          toast(err.message, "error");
        }
      }
    });
  }

  // Load related equipment
  loadRelatedProducts(p);
}

async function loadRelatedProducts(currentP) {
  let products = [];
  try {
    const res = await api("/products");
    products = (res && res.products) ? res.products : [];
  } catch (e) {
    products = FALLBACK_PRODUCTS;
  }

  const related = products.filter((item) =>
    String(item.category).toLowerCase() === String(currentP.category).toLowerCase() &&
    String(item.id) !== String(currentP.id)
  ).slice(0, 4);

  if (related.length > 0) {
    const container = document.getElementById("pdp-related");
    const grid = document.getElementById("related-grid");
    if (container && grid) {
      container.style.display = "block";
      grid.innerHTML = related.map((p) => {
        const stock = Number(p.stock || 0);
        return `
          <div class="product-card">
            <a href="product.html?id=${p.id}">
              <div class="product-thumb">
                ${productVisualHtml(p.image)}
                <span class="stamp">✓ Verified</span>
              </div>
            </a>
            <div class="product-body">
              <div class="product-meta-row">
                <span class="product-sku">SKU ${escapeHtml(displaySku(p))}</span>
                <span class="product-brand">${escapeHtml(p.brand || "Generic")}</span>
              </div>
              <a href="product.html?id=${p.id}"><h3 class="product-name">${escapeHtml(p.name)}</h3></a>
              <div class="product-price-row">
                <span class="price">${formatPrice(p.price)}</span>
              </div>
              <div class="stock-note ${stock < 10 ? "low" : "ok"}">${stock < 10 ? `Only ${stock} left` : `${stock} in stock`}</div>
              <div class="product-card-footer">
                <a href="product.html?id=${p.id}" class="btn btn-outline-dark btn-block btn-sm">View Details</a>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

loadProduct();
