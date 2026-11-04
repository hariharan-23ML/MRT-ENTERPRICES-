import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CATEGORIES, inr, products, slug, type Product } from './Shop'
import './App.css'

function useLocal<T>(k: string, init: T) {
  const [v, s] = useState<T>(() => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }, [k, v])
  return [v, s] as const
}

type Store = { cart: Record<string, number>; add: (id: string, q: number) => void; setQty: (id: string, q: number) => void; remove: (id: string) => void; wish: string[]; toggleWish: (id: string) => void; count: number; total: number; say: (m: string) => void }
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
  const toggleWish = (id: string) => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])
  const ids = Object.keys(cart).filter(id => products.some(p => p.id === id))
  const count = ids.reduce((a, id) => a + cart[id], 0)
  const total = ids.reduce((a, id) => a + cart[id] * (products.find(p => p.id === id)?.price || 0), 0)
  return <Ctx.Provider value={{ cart, add, setQty, remove, wish, toggleWish, count, total, say }}>{children}{msg && <div className="toast" role="status">{msg}</div>}</Ctx.Provider>
}

function Img({ src, alt }: { src: string; alt: string }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className="ph" role="img" aria-label={alt}>{alt.charAt(0)}</div> : <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
}

function Qty({ v, set }: { v: number; set: (n: number) => void }) {
  return <div className="qty"><button type="button" aria-label="Decrease quantity" onClick={() => set(Math.max(1, v - 1))}>−</button><span>{v}</span><button type="button" aria-label="Increase quantity" onClick={() => set(v + 1)}>+</button></div>
}

function Header() {
  const { count } = useStore(); const nav = useNavigate()
  const [open, setOpen] = useState(false); const [dd, setDd] = useState(false); const [q, setQ] = useState('')
  const go = (e: FormEvent) => { e.preventDefault(); nav(`/products?q=${encodeURIComponent(q)}`) }
  return <header className="hdr">
    <div className="info"><span>Bulk Orders &amp; Special Pricing</span><span>Genuine &amp; Certified Products</span><span>Dedicated Business Support</span><span className="sp">Call: +91 98765 43210</span><span>sales@mrt-enterprises.in</span></div>
    <div className="bar">
      <Link to="/" className="logo"><i>M+</i><span><b>MRT-ENTERPRISES</b><small>HEALTHCARE WHOLESALE</small></span></Link>
      <form className="search" onSubmit={go} role="search"><input aria-label="Search products" placeholder="Search for medical products, brands, or categories..." value={q} onChange={e => setQ(e.target.value)} /><button aria-label="Search">⌕</button></form>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      <nav className={'nav' + (open ? ' open' : '')} onClick={() => { setOpen(false); setDd(false) }}>
        <NavLink to="/" end>Home</NavLink>
        <div className="dd"><button onClick={e => { e.stopPropagation(); setDd(!dd) }} aria-expanded={dd}>Categories ▾</button>
          {dd && <div className="menu">{CATEGORIES.map(c => <Link key={c} to={`/products?category=${encodeURIComponent(c)}`}>{c}</Link>)}<Link to="/categories"><b>All categories →</b></Link></div>}</div>
        <NavLink to="/products">Products</NavLink><NavLink to="/orders">Orders</NavLink><NavLink to="/login">Sign In</NavLink>
        <Link to="/cart" className="cart" aria-label={`Cart, ${count} items`}>Cart <em>{count}</em></Link>
      </nav>
    </div>
  </header>
}

const WHY = [['◆', 'Wide Product Range', `${products.length}+ essential medical products`], ['%', 'Attractive Bulk Pricing', 'Save more on large orders'], ['⛟', 'Reliable & On-Time Delivery', 'Pan India shipping support'], ['✓', 'Trusted by Healthcare Businesses', 'Clinics, hospitals & diagnostic centers']]

function Hero() {
  const { say } = useStore()
  return <section className="top">
    <div className="hero"><div className="copy">
      <small className="eyebrow">YOUR PARTNER IN BETTER CARE</small>
      <h1>Healthcare Supplies Delivered <em>Smarter.</em></h1>
      <p>Trusted medical products at wholesale prices for hospitals, clinics and healthcare businesses.</p>
      <div className="ctas"><Link className="btn" to="/products">Shop Products</Link><button className="btn ghost" onClick={() => say('Demo only: quote requests are not sent anywhere.')}>Request a Quote</button></div>
      <ul className="trust">{['Quality Assured', 'Bulk Pricing', 'Pan India Delivery', 'Business Support'].map(t => <li key={t}>✓ {t}</li>)}</ul></div>
      <div className="collage">{products.slice(0, 3).map(p => <Img key={p.id} src={p.image} alt={p.name} />)}</div></div>
    <aside className="why"><h2>Why Choose MRT-ENTERPRISES?</h2><ul>{WHY.map(([i, t, d]) => <li key={t}><span>{i}</span><div><b>{t}</b><small>{d}</small></div></li>)}</ul></aside>
  </section>
}


function CatCard({ c, onPick }: { c: string; onPick?: () => void }) {
  const n = products.filter(p => p.category === c).length

  
const categoryImageMap: Record<string, string> = {
  'Patient Monitoring Equipment': 'patient-care',
  'Diagnostic Imaging Equipment': 'diagnostic-equipment',
  'Critical Care & Respiratory Equipment': 'respiratory-care',
  'Surgical & Operation Theatre Equipment': 'surgical-instruments',
  'Laboratory & Diagnostic Equipment': 'lab-supplies',
  'Hospital Furniture & Patient Care': 'patient-care',
  'Sterilization & Infection Control': 'disinfection-and-hygiene',
  'Infusion & Drug Delivery Equipment': 'medical-devices',
  'General Medical & Examination Equipment': 'diagnostic-equipment',
  'Emergency & Trauma Care': 'wound-care',
  'Medical Consumables & Disposables': 'hospital-consumables',
  'Medical Oxygen Systems': 'respiratory-care',
  'Others': 'others',
}


  const imageName = categoryImageMap[c] || 'others'

  return (
    <Link
      className="cat"
      to={`/products?category=${encodeURIComponent(c)}`}
      onClick={onPick}
    >
      <Img src={`/categories/${imageName}.webp`} alt={c} />
      <b>{c}</b>
      <small>{n} Products</small>
    </Link>
  )
}


function CatModal({ onClose }: { onClose: () => void }) {
  return <div className="modal" role="dialog" aria-modal="true" aria-label="Select a category"><button className="x" aria-label="Close" onClick={onClose}>✕</button><h2>Select a Category</h2><div className="catgrid">{CATEGORIES.map(c => <CatCard key={c} c={c} onPick={onClose} />)}</div></div>
}

function CategorySection() {
  const [m, setM] = useState(false)
  return <section className="sec"><div className="sh"><h2>Shop by Category <small>Explore our complete range of medical supplies</small></h2><button className="link" onClick={() => setM(true)}>View All Categories →</button></div>
    <div className="strip">{CATEGORIES.map(c => <CatCard key={c} c={c} />)}</div>{m && <CatModal onClose={() => setM(false)} />}</section>
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

const MAX = Math.max(1, ...products.map(p => p.price))
const HAS_STOCK = products.some(p => p.inStock !== undefined)

function Products() {
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
  return <><Hero /><CategorySection /><section className="sec"><div className="sh"><h2>Featured Products</h2><Link className="link" to="/products">View all →</Link></div><div className="grid">{products.slice(0, 6).map(p => <ProductCard key={p.id} p={p} />)}</div></section></>
}

function Categories() { return <div className="page"><h1>All Categories</h1><div className="catgrid">{CATEGORIES.map(c => <CatCard key={c} c={c} />)}</div></div> }

function Details() {
  const { id } = useParams(); const s = useStore(); const [q, setQ] = useState(1); const p = products.find(x => x.id === id)
  if (!p) return <div className="page"><h1>Product not found</h1><Link className="btn" to="/products">Back to products</Link></div>
  return <div className="page"><div className="detail"><div className="big"><Img src={p.image} alt={p.name} /></div>
    <div><small>{p.category}</small><h1>{p.name}</h1><p>Item ID: {p.id}{p.brand ? ` · ${p.brand}` : ''}</p><p>{p.description}</p>
      <b className="price lg">{inr(p.price)}{p.price > 0 && <span> / {p.unit}</span>}</b><small>Demo price. Not a verified quotation.</small>
      <div className="buy"><Qty v={q} set={setQ} /><button className="btn" onClick={() => s.add(p.id, q)}>Add to Cart</button></div></div></div>
    <h2>Related products</h2><div className="grid">{products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 6).map(x => <ProductCard key={x.id} p={x} />)}</div></div>
}

function Cart() {
  const s = useStore(); const rows = products.filter(p => s.cart[p.id])
  if (!rows.length) return <div className="page"><h1>Your cart is empty</h1><Link className="btn" to="/products">Browse products</Link></div>
  return <div className="page"><h1>Cart</h1><div className="cartwrap"><div>{rows.map(p => <div className="row" key={p.id}><Img src={p.image} alt={p.name} /><div><b>{p.name}</b><small>{inr(p.price)} / {p.unit}</small></div><Qty v={s.cart[p.id]} set={n => s.setQty(p.id, n)} /><b>{inr(p.price * s.cart[p.id])}</b><button className="link" onClick={() => s.remove(p.id)}>Remove</button></div>)}</div>
    <aside className="sum"><h3>Summary</h3><p>Subtotal <b>{inr(s.total)}</b></p><small>Demo prices. Taxes and delivery not included.</small><Link className="btn" to="/checkout">Checkout</Link></aside></div></div>
}

const FIELDS: [string, string, string][] = [['name', 'Contact name', 'text'], ['business', 'Business name (optional)', 'text'], ['phone', 'Mobile number', 'tel'], ['email', 'Email', 'email'], ['address', 'Delivery address', 'text'], ['pin', 'PIN code', 'text']]

function Checkout() {
  const [err, setErr] = useState<Record<string, string>>({}); const [done, setDone] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) || '').trim(); const x: Record<string, string> = {}
    if (!g('name')) x.name = 'Enter contact name'
    if (!/^[6-9]\d{9}$/.test(g('phone'))) x.phone = 'Enter a valid 10-digit mobile number'
    if (!/^\S+@\S+\.\S+$/.test(g('email'))) x.email = 'Enter a valid email'
    if (!g('address')) x.address = 'Enter delivery address'
    if (!/^\d{6}$/.test(g('pin'))) x.pin = 'Enter a 6-digit PIN code'
    setErr(x); setDone(!Object.keys(x).length)
  }
  return <div className="page narrow"><h1>Checkout</h1><form onSubmit={submit} noValidate>{FIELDS.map(([k, l, t]) => <label key={k}>{l}<input name={k} type={t} aria-invalid={!!err[k]} />{err[k] && <em className="err">{err[k]}</em>}</label>)}<button className="btn">Place demo order</button></form>
    {done && <p className="note" role="status">Demo only: details look valid, but no order was placed or sent anywhere.</p>}</div>
}

function Auth({ reg }: { reg?: boolean }) {
  const [m, setM] = useState('')
  return <div className="page narrow"><h1>{reg ? 'Register' : 'Sign In'}</h1><form onSubmit={(e: FormEvent) => { e.preventDefault(); setM('Demo only: no authentication is implemented.') }}>
    {reg && <label>Full name<input required /></label>}<label>Email<input type="email" required /></label><label>Password<input type="password" required /></label><button className="btn">{reg ? 'Create account' : 'Sign In'}</button></form>
    {m && <p className="note" role="status">{m}</p>}<p>{reg ? <Link to="/login">Already registered? Sign in</Link> : <Link to="/register">New here? Register</Link>}</p></div>
}

function Orders() { return <div className="page"><h1>Orders</h1><p className="empty">Demo page: order history is not connected to any system.</p><Link className="btn" to="/products">Start shopping</Link></div> }

export default function App() {
  return <Provider><Header /><main><Routes>
    <Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/products/:id" element={<Details />} />
    <Route path="/categories" element={<Categories />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} />
    <Route path="/login" element={<Auth />} /><Route path="/register" element={<Auth reg />} /><Route path="/orders" element={<Orders />} /><Route path="*" element={<Home />} />
  </Routes></main><footer className="foot">© MRT-ENTERPRISES · Healthcare Wholesale · Demo storefront: prices and details are samples.</footer></Provider>
}
