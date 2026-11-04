import { catalogProducts, type CatalogProduct } from './data/catalog'

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

// Derive categories from the actual catalogue so filters always match its values.
export const CATEGORIES: string[] = Array.from(
  new Set<string>(catalogProducts.map((product: CatalogProduct) => product.category)),
)

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
export const products: Product[] = catalogProducts.map((item: CatalogProduct) => ({
  id: item.sku,
  name: item.name,
  category: item.category,
  description: item.shortDescription || item.description,
  price: item.priceInrIllustrative ?? 0,
  unit: 'piece',
  image: item.imageUrl || `/products/${slug(item.name)}.webp`,
  brand: item.brand,
  inStock: /in stock/i.test(item.stockStatusIllustrative) && !/out of stock/i.test(item.stockStatusIllustrative),
}))
