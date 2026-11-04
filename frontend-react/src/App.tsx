import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CATEGORIES, categoryCover, inr, products, type Product } from './Shop'
import { FLOW, fmtDate, fmtDateTime, getOrder, getOrders, getSession, placeOrder, register, signIn, signOut, useStoreVersion, type Order } from './store'
import Admin from './Admin'
import LogoMark from './Brand'
import './App.css'

function useLocal<T>(k: string, init: T) {
  const [v, s] = useState<T>(() => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }, [k, v])
  return [v, s] as const
}

type Store = { cart: Record<string, number>; add: (id: string, q: number) => void; setQty: (id: string, q: number) => void; remove: (id: string) => void; clear: () => void; wish: string[]; toggleWish: (id: string) => void; count: number; total: number; say: (m: string) => void }
const Ctx = createContext<Store>(null as unknown as Store)
const useStore = () => useContext(Ctx)

function Provider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocal<Record<string, number>>('mrt-cart', {})
  const [wish, setWish] = useLocal<string[]>('mrt-wish', [])
  const [msg, setMsg] = useState('')
  const say = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 2400) }
  const add = (id: string, q: number) => { setCart(c => ({ ...c, [id]: (c[id] || 0) + q })); say('Added to cart') }
  const setQty = (id: string, q: number) => setCart(c => ({ ...c, [id]: Math.max(1, q) }))
  const remove = (id: string) => setCart(c => { const n = { ...c }; delete n[id]; return n })
  const clear = () => setCart({})
  const toggleWish = (id: string) => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])
  const ids = Object.keys(cart).filter(id => products.some(p => p.id === id))
  const count = ids.reduce((a, id) => a + cart[id], 0)
  const total = ids.reduce((a, id) => a + cart[id] * (products.find(p => p.id === id)?.price || 0), 0)
  return <Ctx.Provider value={{ cart, add, setQty, remove, clear, wish, toggleWish, count, total, say }}>{children}{msg && <div className="toast" role="status">{msg}</div>}</Ctx.Provider>
}

function Img({ src, alt }: { src: string; alt: string }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className="ph" role="img" aria-label={alt}>{alt.charAt(0)}</div> : <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
}

function Qty({ v, set }: { v: number; set: (n: number) => void }) {
  return <div className="qty"><button type="button" aria-label="Decrease quantity" onClick={() => set(Math.max(1, v - 1))}>−</button><span>{v}</span><button type="button" aria-label="Increase quantity" onClick={() => set(v + 1)}>+</button></div>
}

function Header() {
  const { count } = useStore(); const nav = useNavigate(); useStoreVersion(); const me = getSession()
  const [open, setOpen] = useState(false); const [q, setQ] = useState('')
  const go = (e: FormEvent) => { e.preventDefault(); nav(`/products?q=${encodeURIComponent(q)}`) }
  return <header className="hdr">
    <div className="info"><span>Bulk Orders &amp; Special Pricing</span><span>Genuine &amp; Certified Products</span><span>Dedicated Business Support</span><span className="sp">Call: +91 98765 43210</span><span>sales@mrt-enterprises.in</span></div>
    <div className="bar">
      <Link to="/" className="logo"><LogoMark /><span><b>MRT-ENTERPRISES</b><small>HEALTHCARE WHOLESALE</small></span></Link>
      <form className="search" onSubmit={go} role="search"><input aria-label="Search products" placeholder="Search for medical products, brands, or categories..." value={q} onChange={e => setQ(e.target.value)} /><button aria-label="Search">⌕</button></form>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      <nav className={'nav' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/products">Products</NavLink><NavLink to="/orders">{me ? 'My Orders' : 'Track Order'}</NavLink>
        {me ? <span className="me"><i>{me.name.charAt(0).toUpperCase()}</i><b>{me.name.split(' ')[0]}</b><button onClick={() => { signOut(); nav('/') }}>Sign out</button></span> : <NavLink to="/login">Sign In</NavLink>}
        <Link to="/cart" className="cart" aria-label={`Cart, ${count} items`}>Cart <em>{count}</em></Link>
      </nav>
    </div>
  </header>
}

const WHY = [['◆', 'Wide Product Range', `${products.length}+ essential medical products`], ['%', 'Attractive Bulk Pricing', 'Save more on large orders'], ['⛟', 'Reliable & On-Time Delivery', 'Fast, tracked shipping'], ['✓', 'Trusted by Healthcare Businesses', 'Clinics, hospitals & diagnostic centers']]

const FEATURED = ['MED-PM-001', 'MED-CR-004', 'MED-GM-003', 'MED-LB-004', 'MED-HF-003', 'MED-ET-001', 'MED-ID-002', 'MED-MC-004', 'MED-DI-003', 'MED-GM-005']

// Decorative hero graphic: an ECG pulse line with floating info cards (no photos).
function HeroArt() {
  return <div className="hero-art" aria-hidden="true">
    <div className="ring r1" /><div className="ring r2" />
    <svg className="pulse" viewBox="0 0 520 160" preserveAspectRatio="none"><path className="base" d="M0 92 H150 l16 -30 l18 58 l22 -104 l22 120 l16 -62 l12 18 H520" /><path className="run" d="M0 92 H150 l16 -30 l18 58 l22 -104 l22 120 l16 -62 l12 18 H520" /></svg>
    <div className="glass g1"><span>✚</span><div><b>{products.length}+ products</b><small>across {CATEGORIES.length} categories</small></div></div>
    <div className="glass g2"><span>⛟</span><div><b>Track every order</b><small>From placed to delivered</small><div className="steps"><i className="on" /><i className="on" /><i className="on" /><i /></div></div></div>
    <div className="glass g3"><span>%</span><div><b>Wholesale pricing</b><small>For hospitals &amp; clinics</small></div></div>
  </div>
}

function Hero() {
  const { say } = useStore()
  return <section className="top">
    <div className="hero"><div className="copy">
      <small className="eyebrow">YOUR PARTNER IN BETTER CARE</small>
      <h1>Healthcare Supplies Delivered <em>Smarter.</em></h1>
      <p>Trusted medical products at wholesale prices for hospitals, clinics and healthcare businesses.</p>
      <div className="ctas"><Link className="btn" to="/products">Shop Products</Link><button className="btn ghost" onClick={() => say('Demo only: quote requests are not sent anywhere.')}>Request a Quote</button></div>
      <ul className="trust">{['Quality Assured', 'Bulk Pricing', 'Business Support'].map(t => <li key={t}>✓ {t}</li>)}</ul></div>
      <HeroArt /></div>
    <aside className="why"><h2>Why Choose MRT-ENTERPRISES?</h2><ul>{WHY.map(([i, t, d]) => <li key={t}><span>{i}</span><div><b>{t}</b><small>{d}</small></div></li>)}</ul></aside>
  </section>
}


function CatCard({ c }: { c: string }) {
  const n = products.filter(p => p.category === c).length
  return (
    <Link className="cat" to={`/products?category=${encodeURIComponent(c)}`}>
      <span className="cat-img"><Img src={categoryCover(c)} alt={c} /></span>
      <b>{c}</b>
      <small>{n} Products</small>
    </Link>
  )
}

function CategorySection() {
  return <section className="sec"><div className="sh"><h2>Shop by Category <small>Explore our complete range of medical supplies</small></h2><Link className="link" to="/categories">View All Categories →</Link></div>
    <div className="strip">{CATEGORIES.map(c => <CatCard key={c} c={c} />)}</div></section>
}

function ProductCard({ p, list }: { p: Product; list?: boolean }) {
  const s = useStore(); const [q, setQ] = useState(1); const w = s.wish.includes(p.id)
  return <article className={'pc' + (list ? ' list' : '')}>
    {p.inStock !== undefined && <span className={'stock' + (p.inStock ? '' : ' out')}>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>}
    <button className="heart" aria-label="Toggle wishlist" aria-pressed={w} onClick={() => s.toggleWish(p.id)}>{w ? '♥' : '♡'}</button>
    <Link to={`/products/${p.id}`} className="pimg"><Img src={p.image} alt={p.name} /></Link>
    <div className="pb"><small>{p.category}</small><h3><Link to={`/products/${p.id}`}>{p.name}</Link></h3><p>{p.description}</p>
      <b className="price">{inr(p.price)}{p.price > 0 && <span> / {p.unit}</span>}</b>
      <div className="buy"><Qty v={q} set={setQ} /><button className="btn sm" onClick={() => s.add(p.id, q)}>Add to Cart</button></div></div>
  </article>
}

const HAS_STOCK = products.some(p => p.inStock !== undefined)

function Products() {
  const MAX = Math.max(1, ...products.map(p => p.price))
  const [sp] = useSearchParams(); const q = (sp.get('q') || '').toLowerCase(); const cp = sp.get('category')
  const [cats, setCats] = useState<string[]>(cp ? [cp] : [])
  useEffect(() => { setCats(cp ? [cp] : []) }, [cp])
  const [max, setMax] = useState(MAX); const [stock, setStock] = useState(false); const [sort, setSort] = useState('pop'); const [list, setList] = useState(false); const [drawer, setDrawer] = useState(false)
  const cmp: Record<string, (a: Product, b: Product) => number> = { pop: () => 0, lh: (a, b) => a.price - b.price, hl: (a, b) => b.price - a.price, az: (a, b) => a.name.localeCompare(b.name) }
  const r = products.filter(p => (!cats.length || cats.includes(p.category)) && (!q || (p.name + p.description + p.category + (p.brand || '')).toLowerCase().includes(q)) && p.price <= max && (!stock || p.inStock)).sort(cmp[sort])
  return <div className="shop">
    <aside className={'side' + (drawer ? ' open' : '')}><h3>Filters</h3>
      <fieldset><legend>Category</legend>{CATEGORIES.map(c => <label key={c}><input type="checkbox" checked={cats.includes(c)} onChange={() => setCats(x => x.includes(c) ? x.filter(y => y !== c) : [...x, c])} /> {c} ({products.filter(p => p.category === c).length})</label>)}</fieldset>
      {HAS_STOCK && <fieldset><legend>Availability</legend><label><input type="checkbox" checked={stock} onChange={e => setStock(e.target.checked)} /> In stock only</label></fieldset>}
      <fieldset><legend>Max price: {inr(max)}</legend><input type="range" min={0} max={MAX} value={max} onChange={e => setMax(+e.target.value)} aria-label="Maximum price" /></fieldset>
      <button className="btn sm close" onClick={() => setDrawer(false)}>Show {r.length} results</button></aside>
    <section><div className="tb"><h2>{cats.length === 1 ? cats[0] : 'All Products'} <small>Showing {r.length} products</small></h2>
      <div className="tools"><button className="btn sm fbtn" onClick={() => setDrawer(true)}>Filters</button>
        <label>Sort by: <select value={sort} onChange={e => setSort(e.target.value)}><option value="pop">Popularity</option><option value="lh">Price: Low to High</option><option value="hl">Price: High to Low</option><option value="az">Name A–Z</option></select></label>
        <button className={'tg' + (!list ? ' on' : '')} aria-label="Grid view" onClick={() => setList(false)}>▦</button><button className={'tg' + (list ? ' on' : '')} aria-label="List view" onClick={() => setList(true)}>☰</button></div></div>
      {r.length ? <div className={'grid' + (list ? ' list' : '')}>{r.map(p => <ProductCard key={p.id} p={p} list={list} />)}</div> : <p className="empty">No products match your filters.</p>}</section>
  </div>
}

function Home() {
  const { say } = useStore()
  const featured = FEATURED.map(id => products.find(p => p.id === id)).filter((p): p is Product => !!p)
  return <><Hero /><CategorySection />
    <section className="sec"><div className="sh"><h2>Featured Products <small>A selection from across the catalogue</small></h2><Link className="link" to="/products">View all →</Link></div><div className="grid feat">{featured.map(p => <ProductCard key={p.id} p={p} />)}</div></section>
    <section className="sec"><div className="band"><div><small className="eyebrow">FOR HOSPITALS, CLINICS &amp; LABS</small><h2>Buying in bulk? Get a tailored quote.</h2><p>Share your requirement list and our team will come back with slab pricing and dispatch timelines.</p></div>
      <div className="band-cta"><button className="btn" onClick={() => say('Demo only: quote requests are not sent anywhere.')}>Request a Quote</button><Link className="btn ghost" to="/categories">Browse categories</Link></div></div></section></>
}

function Categories() {
  const [q, setQ] = useState(''); const t = q.trim().toLowerCase()
  const list = CATEGORIES.filter(c => !t || c.toLowerCase().includes(t) || products.some(p => p.category === c && p.name.toLowerCase().includes(t)))
  const to = (c: string) => `/products?category=${encodeURIComponent(c)}`
  return <div className="catpage">
    <section className="cat-hero"><div className="cat-hero-copy">
      <small className="eyebrow">BROWSE THE CATALOGUE</small>
      <h1>Shop by Category</h1>
      <p>{CATEGORIES.length} categories and {products.length} products for hospitals, clinics, laboratories and healthcare businesses.</p>
      <div className="cat-search"><span aria-hidden="true">⌕</span><input placeholder="Find a category or product…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search categories" /></div></div>
      <div className="cat-hero-side"><small>Jump to a category</small>
        <div className="cat-chips">{CATEGORIES.map(c => <Link key={c} to={to(c)}>{c}<em>{products.filter(p => p.category === c).length}</em></Link>)}</div></div>
    </section>
    {list.length ? <div className="catlist">{list.map(c => {
      const items = products.filter(p => p.category === c); const prices = items.map(p => p.price).filter(x => x > 0); const stock = items.filter(p => p.inStock).length
      return <article className="ccard" key={c}>
        <Link className="ccard-img" to={to(c)}><Img src={categoryCover(c)} alt={c} /><span>{items.length} products</span></Link>
        <div className="ccard-b">
          <h2><Link to={to(c)}>{c}</Link></h2>
          <p>{prices.length ? <>From <b>{inr(Math.min(...prices))}</b></> : 'Price on request'}<i>·</i>{stock} in stock</p>
          <ul>{items.slice(0, 3).map(p => <li key={p.id}><Link to={`/products/${p.id}`}><span className="ccard-thumb"><Img src={p.image} alt="" /></span><span>{p.name}</span></Link></li>)}</ul>
          <Link className="ccard-go" to={to(c)}>Explore category <span aria-hidden="true">→</span></Link>
        </div></article>
    })}</div> : <p className="empty catempty">No categories match “{q}”.</p>}
  </div>
}

function Details() {
  const { id } = useParams(); const s = useStore(); const [q, setQ] = useState(1); const p = products.find(x => x.id === id)
  if (!p) return <div className="page"><h1>Product not found</h1><Link className="btn" to="/products">Back to products</Link></div>
  return <div className="page"><nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><Link to="/categories">Categories</Link><Link to={`/products?category=${encodeURIComponent(p.category)}`}>{p.category}</Link><span aria-current="page">{p.name}</span></nav>
    <div className="detail"><div className="big"><Img src={p.image} alt={p.name} /></div>
    <div><small>{p.category}</small><h1>{p.name}</h1><p>Item ID: {p.id}{p.brand ? ` · ${p.brand}` : ''}</p><p>{p.description}</p>
      <b className="price lg">{inr(p.price)}{p.price > 0 && <span> / {p.unit}</span>}</b><small>Demo price. Not a verified quotation.</small>
      <div className="buy"><Qty v={q} set={setQ} /><button className="btn" onClick={() => s.add(p.id, q)}>Add to Cart</button></div></div></div>
    <h2>Related products</h2><div className="grid">{products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 6).map(x => <ProductCard key={x.id} p={x} />)}</div></div>
}

function Cart() {
  const s = useStore(); const nav = useNavigate(); const rows = products.filter(p => s.cart[p.id])
  if (!rows.length) return <div className="page"><h1>Your cart is empty</h1><Link className="btn" to="/products">Browse products</Link></div>
  const order = () => nav(getSession() ? '/checkout' : '/login?next=/checkout')
  return <div className="page"><h1>Cart</h1><div className="cartwrap"><div>{rows.map(p => <div className="row" key={p.id}><Img src={p.image} alt={p.name} /><div><b>{p.name}</b><small>{inr(p.price)} / {p.unit}</small></div><Qty v={s.cart[p.id]} set={n => s.setQty(p.id, n)} /><b>{inr(p.price * s.cart[p.id])}</b><button className="link" onClick={() => s.remove(p.id)}>Remove</button></div>)}</div>
    <aside className="sum"><h3>Summary</h3><p>Subtotal <b>{inr(s.total)}</b></p><small>Demo prices. Taxes and delivery not included.</small><button className="btn" onClick={order}>Place Order</button>
      {!getSession() && <small className="sum-hint">You’ll be asked to sign in before placing the order.</small>}</aside></div></div>
}

function Checkout() {
  const s = useStore(); const me = getSession(); const [placed, setPlaced] = useState('')
  const last = me ? getOrders().find(o => o.userEmail === me.email) : undefined
  const [err, setErr] = useState<Record<string, string>>({})
  const rows = products.filter(p => s.cart[p.id])
  if (placed) return <Navigate to={`/orders/${placed}?placed=1`} replace />
  if (!me) return <Navigate to="/login?next=/checkout" replace />
  if (!rows.length) return <Navigate to="/cart" replace />
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) || '').trim(); const x: Record<string, string> = {}
    const phone = g('phone').replace(/[\s-]/g, '').replace(/^(\+91|0)/, '')
    if (!/^[6-9]\d{9}$/.test(phone)) x.phone = 'Enter a valid 10-digit mobile number'
    if (g('business').length < 2) x.business = 'Enter your business name'
    if (g('address').length < 10) x.address = 'Enter the full delivery address with PIN code'
    setErr(x); if (Object.keys(x).length) return
    const o = placeOrder({ userEmail: me.email, customerName: me.name, phone, business: g('business'), address: g('address'), items: rows.map(p => ({ id: p.id, name: p.name, price: p.price, qty: s.cart[p.id], unit: p.unit, image: p.image })) })
    setPlaced(o.id); s.clear()
  }
  return <div className="page"><nav className="crumbs" aria-label="Breadcrumb"><Link to="/cart">Cart</Link><span aria-current="page">Checkout</span></nav><h1>Checkout</h1>
    <div className="checkout">
      <form onSubmit={submit} noValidate className="co-form">
        <div className="co-who"><i>{me.name.charAt(0).toUpperCase()}</i><div><b>{me.name}</b><small>{me.email}</small></div></div>
        <label>Mobile number<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" defaultValue={last?.phone} aria-invalid={!!err.phone} />{err.phone && <em className="err">{err.phone}</em>}</label>
        <label>Business name<input name="business" autoComplete="organization" placeholder="Hospital, clinic or company name" defaultValue={last?.business} aria-invalid={!!err.business} />{err.business && <em className="err">{err.business}</em>}</label>
        <label>Delivery address<textarea name="address" rows={4} autoComplete="street-address" placeholder="Building, street, area, city, state and PIN code" defaultValue={last?.address} aria-invalid={!!err.address} />{err.address && <em className="err">{err.address}</em>}</label>
        <button className="btn">Place order · {inr(s.total)}</button>
      </form>
      <aside className="sum co-sum"><h3>Order summary</h3>
        <ul className="co-items">{rows.map(p => <li key={p.id}><span className="co-thumb"><Img src={p.image} alt="" /><em>{s.cart[p.id]}</em></span><span>{p.name}</span><b>{inr(p.price * s.cart[p.id])}</b></li>)}</ul>
        <p>Total <b>{inr(s.total)}</b></p><small>Taxes and delivery charges are confirmed with your invoice. Delivery date is shared once the order is confirmed.</small></aside>
    </div></div>
}

function Auth({ reg }: { reg?: boolean }) {
  const nav = useNavigate(); const [sp] = useSearchParams(); const next = sp.get('next') || '/'
  const qs = sp.get('next') ? `?next=${encodeURIComponent(next)}` : ''
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  if (getSession()) return <Navigate to={next} replace />
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) || '')
    if (reg && g('name').trim().length < 2) return setErr('Enter your full name')
    if (!/^\S+@\S+\.\S+$/.test(g('email').trim())) return setErr('Enter a valid email address')
    if (g('password').length < 6) return setErr('Password must be at least 6 characters')
    setBusy(true); const r = reg ? await register(g('name'), g('email'), g('password')) : await signIn(g('email'), g('password')); setBusy(false)
    if (r) setErr(r); else nav(next, { replace: true })
  }
  return <div className="page narrow auth">
    {next === '/checkout' && <p className="note">Please sign in or create an account to place your order. Your cart is saved.</p>}
    <h1>{reg ? 'Create your account' : 'Welcome back'}</h1><p className="auth-sub">{reg ? 'Order medical supplies at wholesale prices and track every delivery.' : 'Sign in to place orders and track deliveries.'}</p>
    <form onSubmit={submit} noValidate onChange={() => err && setErr('')}>
      {reg && <label>Full name<input name="name" autoComplete="name" /></label>}<label>Email<input name="email" type="email" autoComplete="email" /></label><label>Password<input name="password" type="password" autoComplete={reg ? 'new-password' : 'current-password'} /></label>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn" disabled={busy}>{busy ? 'Please wait…' : reg ? 'Create account' : 'Sign In'}</button></form>
    <p>{reg ? <Link to={`/login${qs}`}>Already registered? Sign in</Link> : <Link to={`/register${qs}`}>New here? Create an account</Link>}</p></div>
}

const Status = ({ s }: { s: string }) => <span className={'ostat s-' + s.toLowerCase().replace(/\s+/g, '-')}>{s}</span>

function Orders() {
  useStoreVersion(); const me = getSession(); const nav = useNavigate(); const [q, setQ] = useState('')
  if (!me) return <div className="page narrow"><div className="empty-card"><span>⛟</span><h1>Track your orders</h1><p>Sign in to see your orders, delivery dates and live status.</p><Link className="btn" to="/login?next=/orders">Sign in</Link></div></div>
  const mine = getOrders().filter(o => o.userEmail === me.email)
  return <div className="page"><div className="orders-head"><div><h1>My Orders</h1><p>{mine.length ? `${mine.length} order${mine.length > 1 ? 's' : ''} placed` : 'You have not placed any orders yet.'}</p></div>
    <form className="track-form" onSubmit={e => { e.preventDefault(); if (q.trim()) nav(`/orders/${q.trim().toUpperCase()}`) }}><input placeholder="Order ID, e.g. MRT-AB12CD" value={q} onChange={e => setQ(e.target.value)} aria-label="Order ID" /><button className="btn sm">Track</button></form></div>
    {mine.length ? <div className="olist">{mine.map(o => <Link className="ocard" key={o.id} to={`/orders/${o.id}`}>
      <div className="ocard-top"><div><b>{o.id}</b><small>Placed {fmtDateTime(o.createdAt)}</small></div><Status s={o.status} /></div>
      <div className="ocard-items">{o.items.slice(0, 4).map(i => <span key={i.id} className="co-thumb"><Img src={i.image} alt={i.name} /></span>)}{o.items.length > 4 && <span className="more">+{o.items.length - 4}</span>}</div>
      <div className="ocard-bot"><span>{(n => `${n} item${n === 1 ? '' : 's'}`)(o.items.reduce((a, i) => a + i.qty, 0))} · <b>{inr(o.total)}</b></span><span>{o.deliveryDate ? <>Delivery by <b>{fmtDate(o.deliveryDate)}</b></> : 'Delivery date to be confirmed'}</span><em>Track order →</em></div>
    </Link>)}</div> : <Link className="btn" to="/products">Start shopping</Link>}
  </div>
}

function Tracker({ o }: { o: Order }) {
  const cur = FLOW.indexOf(o.status)
  if (o.status === 'Cancelled') return <div className="trk-cancel">This order was cancelled{o.history.at(-1)?.note ? `: ${o.history.at(-1)?.note}` : '.'}</div>
  return <ol className="trk">{FLOW.map((s, i) => { const ev = [...o.history].reverse().find(h => h.status === s)
    return <li key={s} className={i < cur ? 'done' : i === cur ? 'cur' : ''}><span>{i <= cur ? '✓' : i + 1}</span><b>{s}</b><small>{ev ? fmtDateTime(ev.at) : ''}</small></li> })}</ol>
}

function OrderTrack() {
  useStoreVersion(); const { id = '' } = useParams(); const [sp] = useSearchParams(); const me = getSession()
  if (!me) return <Navigate to={`/login?next=/orders/${id}`} replace />
  const o = getOrder(id)
  if (!o || o.userEmail !== me.email) return <div className="page narrow"><div className="empty-card"><span>?</span><h1>Order not found</h1><p>We couldn’t find order “{id}” on your account.</p><Link className="btn" to="/orders">My orders</Link></div></div>
  return <div className="page"><nav className="crumbs" aria-label="Breadcrumb"><Link to="/orders">My Orders</Link><span aria-current="page">{o.id}</span></nav>
    {sp.get('placed') && <div className="placed"><span>✓</span><div><b>Order placed successfully!</b><small>Your order ID is {o.id}. We’ll confirm it and share the delivery date here.</small></div></div>}
    <div className="trk-head"><div><h1>Order {o.id}</h1><p>Placed {fmtDateTime(o.createdAt)}</p></div><Status s={o.status} /></div>
    <div className="trk-grid">
      <section className="trk-card"><div className="trk-eta"><small>{o.status === 'Delivered' ? 'Delivered on' : 'Expected delivery'}</small><b>{o.deliveryDate ? fmtDate(o.deliveryDate) : 'To be confirmed'}</b></div>
        <Tracker o={o} />
        {o.history.some(h => h.note) && <ul className="trk-notes">{[...o.history].reverse().filter(h => h.note).map((h, i) => <li key={i}><b>{h.status}</b> · {fmtDateTime(h.at)}<p>{h.note}</p></li>)}</ul>}
      </section>
      <aside className="trk-card"><h3>Delivery details</h3><dl><dt>Business</dt><dd>{o.business}</dd><dt>Mobile</dt><dd>{o.phone}</dd><dt>Address</dt><dd>{o.address}</dd></dl>
        <h3>Items</h3><ul className="co-items">{o.items.map(i => <li key={i.id}><span className="co-thumb"><Img src={i.image} alt="" /><em>{i.qty}</em></span><span>{i.name}</span><b>{inr(i.price * i.qty)}</b></li>)}</ul>
        <p className="trk-total">Total <b>{inr(o.total)}</b></p></aside>
    </div></div>
}

export default function App() {
  if (useLocation().pathname.startsWith('/admin')) return <Admin />
  return <Provider><Header /><main><Routes>
    <Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/products/:id" element={<Details />} />
    <Route path="/categories" element={<Categories />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} />
    <Route path="/login" element={<Auth />} /><Route path="/register" element={<Auth reg />} /><Route path="/orders" element={<Orders />} /><Route path="/orders/:id" element={<OrderTrack />} /><Route path="*" element={<Home />} />
  </Routes></main><footer className="foot"><div className="foot-in">
    <div className="foot-brand"><Link to="/" className="logo"><LogoMark /><span><b>MRT-ENTERPRISES</b><small>HEALTHCARE WHOLESALE</small></span></Link><p>Medical equipment and supplies at wholesale prices for hospitals, clinics and healthcare businesses.</p></div>
    <div><h4>Shop</h4><Link to="/categories">All categories</Link><Link to="/products">All products</Link>{CATEGORIES.slice(0, 3).map(c => <Link key={c} to={`/products?category=${encodeURIComponent(c)}`}>{c}</Link>)}</div>
    <div><h4>Account</h4><Link to="/login">Sign in</Link><Link to="/register">Register</Link><Link to="/orders">My orders &amp; tracking</Link><Link to="/cart">Cart</Link></div>
    <div><h4>Contact</h4><span>+91 98765 43210</span><span>sales@mrt-enterprises.in</span><Link to="/admin">Admin portal</Link></div>
  </div><div className="foot-bar">© MRT-ENTERPRISES · Healthcare Wholesale · Demo storefront: prices and details are samples. · Product photos: Wikimedia Commons, <a href="/products/CREDITS.md" target="_blank" rel="noreferrer">see credits</a>.</div></footer></Provider>
}
