import { catalogProducts, type CatalogProduct } from './data/catalog'
import { productImages } from './data/productImages'

export interface Product {
  id: string
  name: string
  category: string
  description: string
  price: number
  unit: string
  image: string
  brand?: string
  inStock?: boolean
}

// Admin changes. No backend is connected yet, so they are kept in this browser's localStorage:
// added products, edits to catalogue products (overrides) and removed catalogue products.
const ADMIN_KEY = 'mrt-admin-products', EDIT_KEY = 'mrt-product-edits', DEL_KEY = 'mrt-product-removed'
const load = <T,>(k: string, d: T): T => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v ?? d } catch { return d } }
export const adminProducts: Product[] = load<Product[]>(ADMIN_KEY, [])
const edits: Record<string, Partial<Product>> = load(EDIT_KEY, {})
const removed: string[] = load(DEL_KEY, [])

export const slug = (value: string): string =>
  value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const inr = (amount: number): string =>
  amount > 0
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount)
    : 'Price on request'

// Adapt the detailed catalogue schema to the fields used by the storefront.
const catalogue: Product[] = catalogProducts.map((item: CatalogProduct): Product => ({
  id: item.sku,
  name: item.name,
  category: item.category,
  description: item.shortDescription || item.description,
  price: item.priceInrIllustrative ?? 0,
  unit: 'piece',
  image: item.imageUrl || productImages[item.sku] || `/products/${slug(item.name)}.webp`,
  brand: item.brand,
  inStock: /in stock/i.test(item.stockStatusIllustrative) && !/out of stock/i.test(item.stockStatusIllustrative),
}))
const catalogueIds = new Set(catalogue.map(p => p.id))
export const isCatalogueItem = (id: string) => catalogueIds.has(id)
export const isEdited = (id: string) => !!edits[id]
export const removedCount = () => removed.length

export const products: Product[] = catalogue.filter(p => !removed.includes(p.id)).map(p => ({ ...p, ...edits[p.id] })).concat(adminProducts)

// Derive categories from the live product list so filters always match its values.
export const CATEGORIES: string[] = Array.from(new Set<string>(products.map(p => p.category)))
const syncCategories = () => { CATEGORIES.splice(0, CATEGORIES.length, ...new Set(products.map(p => p.category))) }

// Representative photo for a category: the first product in it that has an image.
export const categoryCover = (category: string): string => products.find(p => p.category === category && p.image)?.image || ''

const save = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v))

// Adds a product to the live catalogue and persists it. Throws if the browser storage is full.
export const addProduct = (p: Product): void => {
  save(ADMIN_KEY, [...adminProducts, p])
  adminProducts.push(p)
  products.push(p)
  syncCategories()
}

// Updates any product (catalogue or admin-added). Throws if the browser storage is full.
export const updateProduct = (id: string, patch: Partial<Product>): void => {
  const { id: _ignore, ...change } = patch; void _ignore
  if (catalogueIds.has(id)) save(EDIT_KEY, { ...edits, [id]: { ...edits[id], ...change } })
  else save(ADMIN_KEY, adminProducts.map(p => p.id === id ? { ...p, ...change } : p))
  if (catalogueIds.has(id)) edits[id] = { ...edits[id], ...change }
  const a = adminProducts.find(p => p.id === id); if (a) Object.assign(a, change)
  const live = products.find(p => p.id === id); if (live) Object.assign(live, change)
  syncCategories()
}

export const removeProduct = (id: string): void => {
  if (catalogueIds.has(id)) { if (!removed.includes(id)) { removed.push(id); save(DEL_KEY, removed) } }
  else { const next = adminProducts.filter(p => p.id !== id); save(ADMIN_KEY, next); adminProducts.splice(0, adminProducts.length, ...next) }
  const i = products.findIndex(p => p.id === id)
  if (i >= 0) products.splice(i, 1)
  syncCategories()
}

// Brings back catalogue products that were removed from the admin portal.
export const restoreRemoved = (): void => {
  catalogue.filter(p => removed.includes(p.id)).forEach(p => products.push({ ...p, ...edits[p.id] }))
  removed.splice(0); save(DEL_KEY, removed)
  syncCategories()
}
