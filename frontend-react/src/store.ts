// Browser-local data layer for accounts, orders and the admin session.
// No backend is connected yet, so everything lives in this browser's localStorage.
// Replace these functions with REST calls when the API is ready; the UI only uses the exports below.
import { useEffect, useState } from 'react'

const EVT = 'mrt-store'
const read = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : d } catch { return d } }
const write = (k: string, v: unknown) => { localStorage.setItem(k, JSON.stringify(v)); window.dispatchEvent(new Event(EVT)) }

// Re-render when store data changes in this tab or another tab (e.g. admin updates an order status).
export function useStoreVersion() {
  const [v, setV] = useState(0)
  useEffect(() => {
    const bump = () => setV(n => n + 1)
    window.addEventListener(EVT, bump); window.addEventListener('storage', bump); window.addEventListener('focus', bump)
    return () => { window.removeEventListener(EVT, bump); window.removeEventListener('storage', bump); window.removeEventListener('focus', bump) }
  }, [])
  return v
}

const sha256 = async (s: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))).map(b => b.toString(16).padStart(2, '0')).join('')

/* ---------------- Customer accounts ---------------- */
export interface User { name: string; email: string; hash: string; createdAt: string }
export interface Session { name: string; email: string }
const USERS = 'mrt-users', SESSION = 'mrt-session'

export const getSession = (): Session | null => read<Session | null>(SESSION, null)
export const signOut = () => { localStorage.removeItem(SESSION); window.dispatchEvent(new Event(EVT)) }

export async function register(name: string, email: string, password: string): Promise<string | null> {
  const users = read<User[]>(USERS, []); const e = email.trim().toLowerCase()
  if (users.some(u => u.email === e)) return 'An account with this email already exists. Please sign in.'
  users.push({ name: name.trim(), email: e, hash: await sha256(e + ':' + password), createdAt: new Date().toISOString() })
  write(USERS, users); write(SESSION, { name: name.trim(), email: e })
  return null
}

export async function signIn(email: string, password: string): Promise<string | null> {
  const e = email.trim().toLowerCase(); const u = read<User[]>(USERS, []).find(x => x.email === e)
  if (!u || u.hash !== await sha256(e + ':' + password)) return 'Incorrect email or password.'
  write(SESSION, { name: u.name, email: u.email })
  return null
}

/* ---------------- Orders ---------------- */
export type OrderStatus = 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for delivery' | 'Delivered' | 'Cancelled'
export const FLOW: OrderStatus[] = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']
export const ALL_STATUSES: OrderStatus[] = [...FLOW, 'Cancelled']
export interface OrderItem { id: string; name: string; price: number; qty: number; unit: string; image: string }
export interface OrderEvent { status: OrderStatus; at: string; note?: string }
export interface Order {
  id: string; createdAt: string; userEmail: string; customerName: string
  phone: string; business: string; address: string
  items: OrderItem[]; total: number; status: OrderStatus; deliveryDate?: string; history: OrderEvent[]
}
const ORDERS = 'mrt-orders'

export const getOrders = (): Order[] => read<Order[]>(ORDERS, [])
export const getOrder = (id: string) => getOrders().find(o => o.id === id)

export function placeOrder(o: Pick<Order, 'userEmail' | 'customerName' | 'phone' | 'business' | 'address' | 'items'>): Order {
  const all = getOrders(); let id = ''
  do { id = 'MRT-' + Math.random().toString(36).slice(2, 8).toUpperCase() } while (all.some(x => x.id === id))
  const now = new Date().toISOString()
  const order: Order = { ...o, id, createdAt: now, total: o.items.reduce((a, i) => a + i.price * i.qty, 0), status: 'Placed', history: [{ status: 'Placed', at: now }] }
  write(ORDERS, [order, ...all])
  return order
}

export function updateOrder(id: string, patch: { status?: OrderStatus; deliveryDate?: string; note?: string }) {
  const all = getOrders(); const o = all.find(x => x.id === id); if (!o) return
  const now = new Date().toISOString()
  if (patch.deliveryDate !== undefined) o.deliveryDate = patch.deliveryDate || undefined
  if (patch.status && patch.status !== o.status) { o.status = patch.status; o.history.push({ status: patch.status, at: now, note: patch.note || undefined }) }
  else if (patch.note) o.history.push({ status: o.status, at: now, note: patch.note })
  write(ORDERS, all)
}

/* ---------------- Admin session ---------------- */
// Demo credentials come from .env (see env.example). This is a client-side gate only:
// switch to the backend's /api/auth/login + admin role before going live.
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@mrt-enterprises.in').toLowerCase()
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123'
const ADMIN = 'mrt-admin-session', ADMIN_TTL = 8 * 3600 * 1000

export const isAdmin = () => { const s = read<{ exp: number } | null>(ADMIN, null); return !!s && s.exp > Date.now() }
export const adminSignIn = (email: string, password: string) => {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) return false
  write(ADMIN, { email: ADMIN_EMAIL, exp: Date.now() + ADMIN_TTL }); return true
}
export const adminSignOut = () => { localStorage.removeItem(ADMIN); window.dispatchEvent(new Event(EVT)) }

/* ---------------- Formatting ---------------- */
export const fmtDate = (iso?: string) => iso ? new Date(iso.length === 10 ? iso + 'T00:00:00' : iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
export const fmtDateTime = (iso: string) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
