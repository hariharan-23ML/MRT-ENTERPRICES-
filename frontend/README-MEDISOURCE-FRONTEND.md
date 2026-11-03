# MediSource – Premium B2B Medical Equipment Marketplace
## MRT Enterprises Healthcare Wholesale Frontend Application

Welcome to the **MediSource** enterprise frontend application built for **MRT Enterprises**. This application is an enterprise-grade B2B medical equipment procurement platform engineered with **React 18**, **Vite**, **TypeScript (Strict Mode)**, **React Router DOM**, **Axios**, and **Lucide React**.

---

## 1. Executive Summary & Architecture

The application redesigns the customer storefront and administrative operations console according to modern healthcare procurement standards:
- **Design Alignment**: Clean purple-to-deep-violet header & announcement bar, responsive hero banner with value indicators, dynamic "Why Choose MRT Enterprises" proposition card, 12-category horizontal strip, and an interactive 6-column product catalogue grid at 1600px desktop.
- **Catalogue Grounding**: Fully imported and validated against the source Excel workbook (`product categories and samples.xlsx`), featuring **12 categories**, **60 medical equipment products**, and **311 linked technical specifications**.
- **Commercial Compliance**: All unverified sample prices, ratings, and stock values are strictly marked and rendered as **"Price on Request"** and **"Availability on Request"** to eliminate fake claims or unverified commercial listings.

---

## 2. Technology Stack

- **Framework**: React 18.3+ (Functional components, React Context API, Custom Hooks)
- **Tooling & Bundler**: Vite 6+
- **Language**: TypeScript 5.7+ (`strict: true`, strict null checks, no unused locals/parameters)
- **Routing**: React Router DOM 6.28+ (Nested layouts, dynamic routes, URL search params, role-based route guards)
- **API Client**: Axios with automatic JWT Authorization header injection and 401 token refresh handling
- **Iconography**: Lucide React
- **Styling**: Modular CSS architecture using CSS custom properties (design tokens), semantic HTML5, accessible ARIA labels, and responsive breakpoints (1600px, 1440px, 1024px, 768px, 480px, 360px).
- **Linter**: Oxc lint (`oxlint`) configuration

---

## 3. Directory Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── hero/            # Medical equipment hero banners & carousel slides
│   │   ├── categories/      # 12 customized vector illustrations for medical categories
│   │   ├── products/        # 60 generated SVG product visuals with SKU tags
│   │   ├── placeholders/    # Medical device fallback placeholders
│   │   └── branding/        # Brand marks and assets
│   ├── logo/
│   │   └── medisource-logo.svg
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/          # Button, Input, Select, Badge, Modal, Loader, EmptyState, ErrorState, Toast
│   │   ├── layout/          # AnnouncementBar, Header, Navigation, SearchBar, MobileMenu, Footer, MainLayout
│   │   ├── home/            # HeroSection, HeroCarousel, WhyChooseUs, CategorySection, CategoryCard, FeaturedProducts, BulkEnquiryBanner
│   │   ├── products/        # ProductCard, ProductGrid, ProductList, ProductFilters, ProductSearch, ProductSort, ProductGallery, ProductSpecifications, ProductTabs
│   │   ├── cart/            # CartItem, CartSummary
│   │   ├── forms/           # LoginForm, RegisterForm, QuoteRequestForm
│   │   └── admin/           # AdminSidebar, AdminHeader, StatsCard, DataTable
│   │
│   ├── pages/
│   │   ├── HomePage.tsx               # Storefront with hero, categories, filter sidebar, 6-col grid, procurement banner
│   │   ├── ProductsPage.tsx           # Full catalogue view with search, filter sidebar, sort, grid/list toggle
│   │   ├── CategoryPage.tsx           # Discipline-filtered view for each of the 12 categories
│   │   ├── ProductDetailsPage.tsx     # Product gallery, specifications table, multi-tab details, quote/cart actions
│   │   ├── LoginPage.tsx              # Institutional sign-in with validation and demo auto-fill
│   │   ├── RegisterPage.tsx           # Facility buyer registration
│   │   ├── CartPage.tsx               # Procurement cart with quantity controls and quotation conversion
│   │   ├── CheckoutPage.tsx           # Institutional checkout with receiving authority and shipping details
│   │   ├── OrderConfirmationPage.tsx  # Order confirmation with reference number and logistics summary
│   │   ├── OrdersPage.tsx             # Customer order history and status tracking
│   │   ├── OrderDetailsPage.tsx       # Detailed breakdown of individual orders
│   │   ├── QuoteRequestPage.tsx       # Dedicated Request for Quotation (RFQ) page
│   │   ├── ContactPage.tsx            # Procurement desk contact information and direct enquiry dispatch
│   │   ├── NotFoundPage.tsx           # Accessible 404 page
│   │   └── admin/
│   │       ├── AdminDashboardPage.tsx # Executive overview cards, recent orders, metrics
│   │       ├── AdminProductsPage.tsx  # Product catalogue table, search, filters, actions
│   │       ├── AddProductPage.tsx     # Add product form
│   │       ├── EditProductPage.tsx    # Edit product form
│   │       ├── AdminCategoriesPage.tsx# 12 categories table with product counts and statuses
│   │       ├── AdminOrdersPage.tsx    # Customer purchase orders management
│   │       ├── AdminCustomersPage.tsx # Registered healthcare buyer directory
│   │       └── AdminQuotationsPage.tsx# Inbound RFQ repository
│   │
│   ├── context/
│   │   ├── AuthContext.tsx  # JWT authentication state, user session, login, logout, role check
│   │   └── CartContext.tsx  # Cart items state, total count badge, quantity sync, persistence
│   │
│   ├── hooks/
│   │   ├── useAuth.ts       # Auth hook
│   │   ├── useCart.ts       # Cart hook
│   │   ├── useProducts.ts   # Catalogue query, multi-faceted filtering, sorting hook
│   │   └── useDebounce.ts   # Search debounce utility hook
│   │
│   ├── services/
│   │   ├── api.ts           # Axios instance with interceptors
│   │   ├── authService.ts   # Authentication API integration
│   │   ├── productService.ts# Product retrieval & fallback
│   │   ├── categoryService.ts# Category service
│   │   ├── cartService.ts   # Cart persistence & API sync
│   │   ├── orderService.ts  # Order creation & retrieval
│   │   └── quotationService.ts # RFQ submission & local repository
│   │
│   ├── data/
│   │   └── catalogue/
│   │       ├── categories.ts         # 12 categories extracted from Excel
│   │       ├── products.ts           # 60 products with all 24 attributes from Excel
│   │       ├── technicalSpecs.ts     # 311 technical specifications linked by SKU
│   │       └── catalogueValidation.ts# Integrity report verifying SKUs and relationships
│   │
│   ├── types/               # TypeScript interfaces for products, categories, cart, orders, users, RFQs
│   ├── utils/               # Constants, formatters, validators, route guards
│   ├── styles/              # Design tokens, global reset, layout, components, responsive CSS
│   ├── App.tsx              # Router setup with public and admin-protected routes
│   └── main.tsx             # Application bootstrap
│
├── .gitignore
├── .oxlintrc.json
├── env.example
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 4. Excel Catalogue Import Validation Report

The catalogue was extracted and verified directly from `product categories and samples.xlsx`:

| Entity | Target | Imported & Verified | Status |
| :--- | :--- | :--- | :--- |
| **Categories** | 12 records | 12 records | Validated |
| **Products** | 60 records | 60 records | Validated |
| **Technical Specs** | 311 records | 311 records | Validated |
| **Duplicate SKUs** | 0 | 0 | Validated |
| **Orphaned Specs** | 0 | 0 | Validated |

### 12 Medical Categories:
1. `CAT-01` – Patient Monitoring Equipment (5 products)
2. `CAT-02` – Diagnostic Imaging Equipment (5 products)
3. `CAT-03` – Critical Care & Respiratory Equipment (5 products)
4. `CAT-04` – Surgical & Operation Theatre Equipment (5 products)
5. `CAT-05` – Laboratory & Diagnostic Equipment (5 products)
6. `CAT-06` – Hospital Furniture & Patient Care (5 products)
7. `CAT-07` – Sterilization & Infection Control (5 products)
8. `CAT-08` – Infusion & Drug Delivery Equipment (5 products)
9. `CAT-09` – General Medical & Examination Equipment (5 products)
10. `CAT-10` – Emergency & Trauma Care (5 products)
11. `CAT-11` – Medical Consumables & Disposables (5 products)
12. `CAT-12` – Medical Gas & Oxygen Systems (5 products)

---

## 5. API Integration & Identified Backend Gaps

### Active Integrations:
- **Authentication**: `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`
- **Products**: `GET /api/products`, `GET /api/products/:id` (augmented with the 60 Excel catalogue records)
- **Cart**: `GET /api/cart`, `POST /api/cart`, `PATCH /api/cart/:productId`, `DELETE /api/cart/:productId`
- **Orders**: `GET /api/orders`, `POST /api/orders`, `GET /api/orders/:id`
- **Admin**: `GET /api/admin/overview`, `GET /api/admin/products`, `GET /api/admin/orders`, `GET /api/admin/customers`

### Missing Backend APIs (Documented):
1. **RFQ / Quotations API**:
   - **Endpoint Required**: `POST /api/quotations` and `GET /api/quotations` (admin)
   - **Current Fallback**: The frontend provides a complete Request for Quotation workflow (`/request-quote`), validates the fields, persists submissions into client storage, and alerts the user of the pending backend integration without faking server responses.
2. **Product Dynamic Attributes & Verification Flags**:
   - The backend `PRODUCTS` table schema currently lacks columns for `price_verified`, `specifications` JSON, and `documents` JSON. Schema expansion is recommended to persist the 311 technical specifications server-side.

---

## 6. Installation & Execution Guide

### Prerequisites
- Node.js version 18+ or 20+
- npm version 9+

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Environment Configuration
Copy `env.example` to `.env`:
```bash
cp env.example .env
```
Default parameters:
```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_BUSINESS_PHONE=1800-890-0000
VITE_BUSINESS_EMAIL=support@medisource.mrt
```

### Step 3: Run Development Server
```bash
npm run dev
```
The Vite development server will start at `http://localhost:5173`.

### Step 4: Validate TypeScript Strict Checking
```bash
npm run typecheck
```

### Step 5: Run Linting
```bash
npm run lint
```

### Step 6: Production Build
```bash
npm run build
npm run preview
```

---

## 7. Demo Credentials

To access the role-protected enterprise admin console at `/admin`:
- **Email**: `admin@medisource.test`
- **Password**: `admin123`
*(A quick auto-fill button is also provided on `/login`)*
