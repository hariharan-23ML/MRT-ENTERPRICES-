import { useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { addProduct, CATEGORIES, inr, isCatalogueItem, isEdited, products, removedCount, removeProduct, restoreRemoved, updateProduct, type Product } from './Shop'
import { adminSignIn, adminSignOut, ALL_STATUSES, FLOW, fmtDate, fmtDateTime, getOrder, getOrders, isAdmin, updateOrder, useStoreVersion, type Order, type OrderStatus } from './store'
import LogoMark from './Brand'
import './Admin.css'

type Say = (m: string, bad?: boolean) => void
const UNITS = ['piece', 'unit', 'box', 'pack', 'set', 'pair', 'roll', 'bottle', 'kit']
const NEW_CAT = '__new__'
const OPEN: OrderStatus[] = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for delivery']
const units = (o: Order) => o.items.reduce((a, i) => a + i.qty, 0)
const sold = (list: Order[]) => list.filter(o => o.status !== 'Cancelled')

function Img({ src, alt }: { src: string; alt: string }) {
  const [bad, setBad] = useState(false)
  return bad || !src ? <div className="ph" role="img" aria-label={alt}>{(alt || '?').charAt(0)}</div> : <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
}

const Status = ({ s }: { s: string }) => <span className={'ostat s-' + s.toLowerCase().replace(/\s+/g, '-')}>{s}</span>

// Downscale an uploaded image so it fits comfortably in browser storage.
const shrink = (file: File): Promise<string> => new Promise((res, rej) => {
  const r = new FileReader()
  r.onerror = () => rej(r.error)
  r.onload = () => {
    const img = new Image()
    img.onerror = () => rej(new Error('Unsupported image'))
    img.onload = () => {
      const k = Math.min(1, 800 / Math.max(img.width, img.height))
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k)
      c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
      res(c.toDataURL('image/webp', 0.85))
    }
    img.src = String(r.result)
  }
  r.readAsDataURL(file)
})

const suggestSku = (category: string) => {
  const ini = category.split(/\s+/).filter(w => /[a-z]/i.test(w)).map(w => w[0].toUpperCase()).join('').slice(0, 3) || 'GEN'
  const pre = `MED-${ini}-`
  let n = products.filter(p => p.id.startsWith(pre)).length + 1
  while (products.some(p => p.id === pre + String(n).padStart(3, '0'))) n++
  return pre + String(n).padStart(3, '0')
}

/* ---------------- Login ---------------- */
function AdminLogin() {
  const nav = useNavigate(); const [sp] = useSearchParams(); const [err, setErr] = useState(''); const [show, setShow] = useState(false)
  if (isAdmin()) return <Navigate to={sp.get('next') || '/admin'} replace />
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget)
    if (adminSignIn(String(f.get('email') || ''), String(f.get('password') || ''))) nav(sp.get('next') || '/admin', { replace: true })
    else setErr('Incorrect admin email or password.')
  }
  return <div className="adm adm-login">
    <div className="adm-login-card">
      <Link to="/" className="logo"><LogoMark /><span><b>MRT-ENTERPRISES</b><small>ADMIN CONSOLE</small></span></Link>
      <h1>Admin sign in</h1><p>Manage products, orders, deliveries and sales.</p>
      <form onSubmit={submit} onChange={() => err && setErr('')} noValidate>
        <label>Email<input name="email" type="email" autoComplete="username" autoFocus placeholder="admin@company.com" /></label>
        <label>Password<div className="adm-pw"><input name="password" type={show ? 'text' : 'password'} autoComplete="current-password" /><button type="button" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></div></label>
        {err && <p className="form-err" role="alert">{err}</p>}
        <button className="btn">Sign in</button>
      </form>
      <small className="adm-login-note">Demo login is configured in <code>.env</code> (see <code>env.example</code>). Replace with backend authentication before going live.</small>
      <Link className="adm-back" to="/">← Back to store</Link>
    </div>
  </div>
}

/* ---------------- Dashboard ---------------- */
function Dashboard() {
  const orders = getOrders(); const ok = sold(orders)
  const revenue = ok.reduce((a, o) => a + o.total, 0)
  const open = orders.filter(o => OPEN.includes(o.status)); const noDate = open.filter(o => !o.deliveryDate).length
  const byCat = CATEGORIES.map(c => [c, products.filter(p => p.category === c).length] as const).sort((a, b) => b[1] - a[1])
  const top = Math.max(1, ...byCat.map(x => x[1]))
  const stats: [string, string | number, string, string][] = [
    ['₹', inr(revenue).replace('Price on request', '₹0'), 'Total sales', `${ok.length} orders`],
    ['⛟', open.length, 'Open orders', noDate ? `${noDate} need a delivery date` : 'All have delivery dates'],
    ['▦', products.length, 'Products', `${products.filter(p => p.inStock === false).length} out of stock`],
    ['◈', CATEGORIES.length, 'Categories', 'Across the catalogue'],
  ]
  return <>
    <div className="adm-head"><div><h1>Dashboard</h1><p>Overview of orders, sales and the catalogue.</p></div><div className="adm-row"><Link className="adm-btn" to="/admin/orders">View orders</Link><Link className="btn" to="/admin/products/new">+ Add product</Link></div></div>
    <div className="adm-stats">{stats.map(([i, v, t, d]) => <div className="adm-stat" key={t}><span>{i}</span><div><b>{v}</b><strong>{t}</strong><small>{d}</small></div></div>)}</div>
    <div className="adm-cols">
      <section className="adm-card"><div className="adm-card-h"><h2>Recent orders</h2><Link className="link" to="/admin/orders">All orders →</Link></div>
        {orders.length ? <ul className="adm-recent">{orders.slice(0, 6).map(o => <li key={o.id}><Link to={`/admin/orders/${o.id}`} className="adm-oid">{o.id}</Link><div><b>{o.business}</b><small>{fmtDateTime(o.createdAt)} · {units(o)} item{units(o) === 1 ? '' : 's'}</small></div><span>{inr(o.total)}</span><Status s={o.status} /></li>)}</ul>
          : <div className="adm-empty"><span>⛟</span><b>No orders yet</b><small>Orders placed in the storefront appear here for confirmation and delivery scheduling.</small></div>}
      </section>
      <section className="adm-card"><div className="adm-card-h"><h2>Products by category</h2><Link className="link" to="/admin/products">Manage →</Link></div>
        <ul className="adm-bars">{byCat.map(([c, n]) => <li key={c}><span>{c}</span><i><em style={{ width: `${(n / top) * 100}%` }} /></i><b>{n}</b></li>)}</ul></section>
    </div>
  </>
}

/* ---------------- Products ---------------- */
function ProductList({ say }: { say: Say }) {
  const [q, setQ] = useState(''); const [cat, setCat] = useState(''); const [src, setSrc] = useState(''); const [, bump] = useState(0)
  const source = (p: Product) => !isCatalogueItem(p.id) ? 'admin' : isEdited(p.id) ? 'edited' : 'catalog'
  const all = [...products.filter(p => !isCatalogueItem(p.id))].reverse().concat(products.filter(p => isCatalogueItem(p.id)))
  const rows = all.filter(p => (!cat || p.category === cat) && (!src || source(p) === src) && (!q || (p.name + p.id + p.category + (p.brand || '')).toLowerCase().includes(q.toLowerCase())))
  const del = (p: Product) => {
    if (!confirm(`Delete "${p.name}"? It will be removed from the storefront.`)) return
    removeProduct(p.id); bump(n => n + 1); say('Product deleted')
  }
  const gone = removedCount()
  return <>
    <div className="adm-head"><div><h1>Products</h1><p>{products.length} products live in the store{gone ? ` · ${gone} catalogue item${gone > 1 ? 's' : ''} removed` : ''}</p></div>
      <div className="adm-row">{gone > 0 && <button className="adm-btn" onClick={() => { restoreRemoved(); bump(n => n + 1); say('Removed catalogue items restored') }}>Restore removed</button>}<Link className="btn" to="/admin/products/new">+ Add product</Link></div></div>
    <div className="adm-card adm-table-card">
      <div className="adm-filters">
        <div className="adm-search"><span aria-hidden>⌕</span><input placeholder="Search by name, SKU, brand…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search products" /></div>
        <select value={cat} onChange={e => setCat(e.target.value)} aria-label="Filter by category"><option value="">All categories</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
        <select value={src} onChange={e => setSrc(e.target.value)} aria-label="Filter by source"><option value="">All sources</option><option value="catalog">Catalogue</option><option value="edited">Edited</option><option value="admin">Added by admin</option></select>
        <small>{rows.length} shown</small>
      </div>
      <div className="adm-table-wrap"><table className="adm-table">
        <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Source</th><th aria-label="Actions" /></tr></thead>
        <tbody>{rows.map(p => { const s = source(p); return <tr key={p.id}>
          <td><div className="adm-prod"><div className="adm-thumb"><Img src={p.image} alt={p.name} /></div><div><b>{p.name}</b><small>{p.id}{p.brand ? ` · ${p.brand}` : ''}</small></div></div></td>
          <td>{p.category}</td><td className="adm-num">{inr(p.price)}{p.price > 0 && <small> / {p.unit}</small>}</td>
          <td><span className={'adm-chip ' + (p.inStock ? 'ok' : 'bad')}>{p.inStock ? 'In stock' : 'Out of stock'}</span></td>
          <td><span className={'adm-chip ' + (s === 'catalog' ? '' : 'vio')}>{s === 'admin' ? 'Admin' : s === 'edited' ? 'Edited' : 'Catalogue'}</span></td>
          <td className="adm-actions"><Link to={`/products/${p.id}`} target="_blank" title="View in store">View ↗</Link><Link to={`/admin/products/${encodeURIComponent(p.id)}/edit`} title="Edit product">Edit</Link><button onClick={() => del(p)} title="Delete product">Delete</button></td>
        </tr> })}</tbody>
      </table>{!rows.length && <p className="adm-none">No products match these filters.</p>}</div>
    </div>
  </>
}

type Form = { name: string; sku: string; brand: string; category: string; newCat: string; price: string; unit: string; inStock: boolean; description: string; image: string; imageUrl: string }
const BLANK: Form = { name: '', sku: '', brand: '', category: '', newCat: '', price: '', unit: 'piece', inStock: true, description: '', image: '', imageUrl: '' }
const fromProduct = (p: Product): Form => ({ name: p.name, sku: p.id, brand: p.brand || '', category: p.category, newCat: '', price: p.price ? String(p.price) : '', unit: p.unit, inStock: p.inStock !== false, description: p.description, image: p.image.startsWith('data:') ? p.image : '', imageUrl: p.image.startsWith('data:') ? '' : p.image })

function EditProduct({ say }: { say: Say }) {
  const { id = '' } = useParams(); const p = products.find(x => x.id === id)
  if (!p) return <div className="adm-empty adm-card"><span>?</span><b>Product not found</b><Link className="btn sm" to="/admin/products">Back to products</Link></div>
  return <ProductForm key={p.id} say={say} edit={p} />
}

function ProductForm({ say, edit }: { say: Say; edit?: Product }) {
  const nav = useNavigate(); const file = useRef<HTMLInputElement>(null)
  const [f, setF] = useState<Form>(edit ? fromProduct(edit) : BLANK); const [skuEdited, setSkuEdited] = useState(false)
  const [err, setErr] = useState<Partial<Record<keyof Form, string>>>({}); const [drag, setDrag] = useState(false); const [busy, setBusy] = useState(false)
  const category = f.category === NEW_CAT ? f.newCat.trim() : f.category
  const sku = edit ? edit.id : skuEdited ? f.sku : (category ? suggestSku(category) : '')
  const image = f.image || f.imageUrl.trim()
  const price = Number(f.price || 0)
  const unitList = UNITS.includes(f.unit) ? UNITS : [f.unit, ...UNITS]
  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setF(x => ({ ...x, [k]: v })); setErr(e => ({ ...e, [k]: undefined })) }
  const on = (k: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(k, e.target.value as never)

  const pick = async (fl?: File | null) => {
    if (!fl) return
    if (!fl.type.startsWith('image/')) { setErr(e => ({ ...e, image: 'Please choose an image file (JPG, PNG or WebP).' })); return }
    try { setBusy(true); set('image', await shrink(fl)) } catch { setErr(e => ({ ...e, image: 'This image could not be read.' })) } finally { setBusy(false) }
  }
  const drop = (e: DragEvent) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]) }

  const checks: [string, boolean][] = [['Product name', !!f.name.trim()], ['Category', !!category], ['Description', !!f.description.trim()], ['Price', !!f.price], ['Image', !!image]]

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const x: Partial<Record<keyof Form, string>> = {}
    if (!f.name.trim()) x.name = 'Enter the product name'
    if (!f.category) x.category = 'Choose a category'
    else if (f.category === NEW_CAT && !f.newCat.trim()) x.newCat = 'Enter the new category name'
    if (!edit) {
      if (!category && !skuEdited) { /* SKU is generated once a category is chosen */ }
      else if (!/^[A-Z0-9][A-Z0-9-]{2,30}$/.test(sku)) x.sku = 'Use 3–31 capital letters, digits or dashes'
      else if (products.some(p => p.id === sku)) x.sku = 'This SKU is already used'
    }
    if (f.price && (!Number.isFinite(price) || price < 0)) x.price = 'Enter a valid price'
    if (!f.description.trim()) x.description = 'Add a short description'
    setErr(x)
    if (Object.keys(x).length) { say('Please fix the highlighted fields', true); return }
    const data = { name: f.name.trim(), category, description: f.description.trim(), price: f.price ? price : 0, unit: f.unit, image, brand: f.brand.trim() || undefined, inStock: f.inStock }
    try { if (edit) updateProduct(edit.id, data); else addProduct({ id: sku, ...data }) }
    catch { say('Browser storage is full. Use an image URL or a smaller image.', true); return }
    say(edit ? `“${data.name}” updated` : `“${data.name}” is now live in the store`); nav('/admin/products'); window.scrollTo(0, 0)
  }

  return <>
    <div className="adm-head"><div><Link className="adm-back" to="/admin/products">← Products</Link><h1>{edit ? 'Edit product' : 'Add product'}</h1><p>{edit ? `Changes to ${edit.id} are published to the storefront immediately.` : 'New products are published to the customer storefront immediately.'}</p></div></div>
    <form className="adm-form" onSubmit={submit} noValidate>
      <div className="adm-form-main">
        <section className="adm-card"><h2>Basic details</h2>
          <div className="adm-fields">
            <label className="full">Product name <i>*</i><input value={f.name} onChange={on('name')} placeholder="e.g. Digital Blood Pressure Monitor" aria-invalid={!!err.name} />{err.name && <em>{err.name}</em>}</label>
            <label>Category <i>*</i><select value={f.category} onChange={on('category')} aria-invalid={!!err.category}><option value="">Select a category</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}<option value={NEW_CAT}>+ Create new category…</option></select>{err.category && <em>{err.category}</em>}</label>
            {f.category === NEW_CAT && <label>New category name <i>*</i><input value={f.newCat} onChange={on('newCat')} placeholder="e.g. Dental Equipment" aria-invalid={!!err.newCat} autoFocus />{err.newCat && <em>{err.newCat}</em>}</label>}
            <label>Brand<input value={f.brand} onChange={on('brand')} placeholder="e.g. Omron" /></label>
            <label>SKU / Item ID<input value={sku} readOnly={!!edit} onChange={e => { setSkuEdited(true); set('sku', e.target.value.toUpperCase()) }} placeholder="Auto-generated from category" aria-invalid={!!err.sku} />{err.sku ? <em>{err.sku}</em> : <span className="hint">{edit ? 'SKU can’t be changed (orders refer to it)' : skuEdited ? 'Custom SKU' : 'Auto-generated · you can edit it'}</span>}</label>
          </div>
        </section>

        <section className="adm-card"><h2>Pricing &amp; stock</h2>
          <div className="adm-fields">
            <label>Price (₹)<div className="adm-affix"><span>₹</span><input inputMode="decimal" value={f.price} onChange={e => set('price', e.target.value.replace(/[^\d.]/g, ''))} placeholder="Leave blank for “Price on request”" aria-invalid={!!err.price} /></div>{err.price ? <em>{err.price}</em> : <span className="hint">{f.price ? inr(price) : 'Shown as “Price on request”'}</span>}</label>
            <label>Sold per<select value={f.unit} onChange={on('unit')}>{unitList.map(u => <option key={u}>{u}</option>)}</select></label>
            <div className="full adm-lbl">Availability
              <div className="adm-seg" role="radiogroup" aria-label="Availability">
                <button type="button" role="radio" aria-checked={f.inStock} className={f.inStock ? 'on' : ''} onClick={() => set('inStock', true)}>● In stock</button>
                <button type="button" role="radio" aria-checked={!f.inStock} className={!f.inStock ? 'on bad' : ''} onClick={() => set('inStock', false)}>● Out of stock</button>
              </div></div>
          </div>
        </section>

        <section className="adm-card"><h2>Description <i>*</i></h2>
          <label className="adm-desc"><textarea rows={4} maxLength={300} value={f.description} onChange={on('description')} placeholder="A short summary customers will see on the product card and detail page." aria-invalid={!!err.description} aria-label="Description" />
            <span className="hint">{err.description ? <em>{err.description}</em> : 'Keep it short and factual.'}<b>{f.description.length}/300</b></span></label>
        </section>

        <section className="adm-card"><h2>Product image</h2>
          {f.image ? <div className="adm-imgset"><div className="adm-thumb lg"><img src={f.image} alt="Selected product" /></div><div><b>Image ready</b><small>Resized for the web and stored with the product.</small><div className="adm-row"><button type="button" className="adm-btn" onClick={() => file.current?.click()}>Replace</button><button type="button" className="adm-btn danger" onClick={() => set('image', '')}>Remove</button></div></div></div>
            : <div className={'adm-drop' + (drag ? ' over' : '')} onClick={() => file.current?.click()} onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={drop} role="button" tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && file.current?.click()}>
              <span>⇪</span><b>{busy ? 'Processing image…' : 'Drop an image here, or click to browse'}</b><small>JPG, PNG or WebP · square images look best</small></div>}
          <input ref={file} type="file" accept="image/*" hidden onChange={e => { pick(e.target.files?.[0]); e.target.value = '' }} />
          {err.image && <em className="adm-err">{err.image}</em>}
          {!f.image && <label className="adm-url">{edit && f.imageUrl ? 'Current image URL' : 'Or paste an image URL'}<input value={f.imageUrl} onChange={on('imageUrl')} placeholder="https://… or /products/name.webp" /></label>}
        </section>
      </div>

      <aside className="adm-form-side">
        <section className="adm-card"><h2>Live preview</h2><p className="hint">How customers will see it in the store.</p>
          <article className="pc adm-preview">
            <span className={'stock' + (f.inStock ? '' : ' out')}>{f.inStock ? 'In Stock' : 'Out of Stock'}</span>
            <span className="heart" aria-hidden>♡</span>
            <div className="pimg"><Img key={image} src={image} alt={f.name || 'New product'} /></div>
            <div className="pb"><small>{category || 'Category'}</small><h3>{f.name || 'Product name'}</h3><p>{f.description || 'Short product description appears here.'}</p>
              <b className="price">{inr(price)}{price > 0 && <span> / {f.unit}</span>}</b>
              <div className="buy"><div className="qty"><button type="button" tabIndex={-1}>−</button><span>1</span><button type="button" tabIndex={-1}>+</button></div><span className="btn sm">Add to Cart</span></div></div>
          </article>
        </section>
        <section className="adm-card"><h2>Checklist</h2><ul className="adm-check">{checks.map(([t, ok]) => <li key={t} className={ok ? 'ok' : ''}><span>{ok ? '✓' : ''}</span>{t}</li>)}</ul></section>
        <div className="adm-submit"><button className="btn" disabled={busy}>{edit ? 'Save changes' : 'Publish product'}</button>
          {edit ? <Link className="adm-btn" to="/admin/products">Cancel</Link> : <button type="button" className="adm-btn" onClick={() => { setF(BLANK); setSkuEdited(false); setErr({}) }}>Reset</button>}</div>
      </aside>
    </form>
  </>
}

/* ---------------- Orders ---------------- */
function OrderList() {
  const [tab, setTab] = useState<string>('Open'); const [q, setQ] = useState('')
  const orders = getOrders()
  const tabs: [string, (o: Order) => boolean][] = [['Open', o => OPEN.includes(o.status)], ['All', () => true], ...ALL_STATUSES.map(s => [s, (o: Order) => o.status === s] as [string, (o: Order) => boolean])]
  const test = tabs.find(t => t[0] === tab)?.[1] || (() => true)
  const t = q.trim().toLowerCase()
  const rows = orders.filter(test).filter(o => !t || (o.id + o.business + o.customerName + o.phone + o.userEmail).toLowerCase().includes(t))
  return <>
    <div className="adm-head"><div><h1>Orders</h1><p>{orders.length} orders · {orders.filter(o => OPEN.includes(o.status)).length} open</p></div><Link className="adm-btn" to="/admin/sales">Sales log →</Link></div>
    <div className="adm-tabs">{tabs.map(([n, f]) => { const c = orders.filter(f).length; return (n === 'Open' || n === 'All' || c > 0) && <button key={n} className={tab === n ? 'on' : ''} onClick={() => setTab(n)}>{n}<em>{c}</em></button> })}</div>
    <div className="adm-card adm-table-card">
      <div className="adm-filters"><div className="adm-search"><span aria-hidden>⌕</span><input placeholder="Search order ID, business, mobile…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search orders" /></div><small>{rows.length} shown</small></div>
      <div className="adm-table-wrap"><table className="adm-table">
        <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Amount</th><th>Delivery date</th><th>Status</th><th aria-label="Actions" /></tr></thead>
        <tbody>{rows.map(o => <tr key={o.id}>
          <td><Link className="adm-oid" to={`/admin/orders/${o.id}`}>{o.id}</Link><small className="adm-sub">{fmtDateTime(o.createdAt)}</small></td>
          <td><b className="adm-strong">{o.business}</b><small className="adm-sub">{o.customerName} · {o.phone}</small></td>
          <td>{units(o)}</td><td className="adm-num">{inr(o.total)}</td>
          <td>{o.deliveryDate ? fmtDate(o.deliveryDate) : <span className="adm-chip bad">Not set</span>}</td>
          <td><Status s={o.status} /></td>
          <td className="adm-actions"><Link to={`/admin/orders/${o.id}`}>Manage →</Link></td>
        </tr>)}</tbody>
      </table>{!rows.length && <p className="adm-none">{orders.length ? 'No orders match.' : 'No orders yet. Orders placed in the storefront appear here.'}</p>}</div>
    </div>
  </>
}

function OrderDetail({ say }: { say: Say }) {
  const { id = '' } = useParams(); const o = getOrder(id)
  const [status, setStatus] = useState<OrderStatus>(o?.status || 'Placed'); const [date, setDate] = useState(o?.deliveryDate || ''); const [note, setNote] = useState(''); const [err, setErr] = useState(''); const [localToday] = useState(() => new Date().toLocaleDateString('en-CA'))
  if (!o) return <div className="adm-empty adm-card"><span>?</span><b>Order not found</b><Link className="btn sm" to="/admin/orders">Back to orders</Link></div>
  const next = FLOW[FLOW.indexOf(o.status) + 1]
  const save = (s = status) => {
    if (s !== 'Placed' && s !== 'Cancelled' && !date) { setErr('Set the delivery date before moving the order forward.'); return }
    updateOrder(o.id, { status: s, deliveryDate: date, note: note.trim() }); setStatus(s); setNote(''); setErr('')
    say(s !== o.status ? `Order ${o.id} marked “${s}”` : 'Order updated')
  }
  const today = localToday
  return <>
    <div className="adm-head"><div><Link className="adm-back" to="/admin/orders">← Orders</Link><h1>Order {o.id}</h1><p>Placed {fmtDateTime(o.createdAt)} by {o.customerName} ({o.userEmail})</p></div><Status s={o.status} /></div>
    <div className="adm-form">
      <div className="adm-form-main">
        <section className="adm-card"><h2>Items</h2>
          <table className="adm-table adm-mini"><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>{o.items.map(i => <tr key={i.id}><td><div className="adm-prod"><div className="adm-thumb"><Img src={i.image} alt={i.name} /></div><div><b>{i.name}</b><small>{i.id}</small></div></div></td><td>{i.qty}</td><td className="adm-num">{inr(i.price)}<small> / {i.unit}</small></td><td className="adm-num">{inr(i.price * i.qty)}</td></tr>)}</tbody>
            <tfoot><tr><td colSpan={3}>Order total</td><td className="adm-num">{inr(o.total)}</td></tr></tfoot></table>
        </section>
        <section className="adm-card"><h2>Customer &amp; delivery</h2>
          <dl className="adm-dl"><dt>Business</dt><dd>{o.business}</dd><dt>Contact</dt><dd>{o.customerName}</dd><dt>Mobile</dt><dd><a href={`tel:${o.phone}`}>{o.phone}</a></dd><dt>Email</dt><dd>{o.userEmail}</dd><dt>Address</dt><dd>{o.address}</dd></dl>
        </section>
        <section className="adm-card"><h2>Status history</h2>
          <ol className="adm-timeline">{[...o.history].reverse().map((h, i) => <li key={i}><Status s={h.status} /><span>{fmtDateTime(h.at)}</span>{h.note && <p>{h.note}</p>}</li>)}</ol>
        </section>
      </div>
      <aside className="adm-form-side">
        <section className="adm-card"><h2>Update order</h2>
          <div className="adm-fields one">
            <label>Delivery date<input type="date" value={date} min={o.deliveryDate && o.deliveryDate < today ? o.deliveryDate : today} onChange={e => { setDate(e.target.value); setErr('') }} /><span className="hint">Shown to the customer on their tracking page.</span></label>
            <label>Status<select value={status} onChange={e => { setStatus(e.target.value as OrderStatus); setErr('') }}>{ALL_STATUSES.map(s => <option key={s}>{s}</option>)}</select></label>
            <label>Note for customer (optional)<textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Dispatched via BlueDart, AWB 1234…" /></label>
          </div>
          {err && <p className="form-err" role="alert">{err}</p>}
          <div className="adm-submit one"><button className="btn" onClick={() => save()}>Save update</button>
            {next && o.status !== 'Cancelled' && <button className="adm-btn" onClick={() => save(next)}>Mark as “{next}”</button>}</div>
        </section>
        <section className="adm-card adm-eta"><small>Customer sees</small><b>{o.deliveryDate ? `Delivery by ${fmtDate(o.deliveryDate)}` : 'Delivery date to be confirmed'}</b><Status s={o.status} /></section>
      </aside>
    </div>
  </>
}

/* ---------------- Sales log ---------------- */
function Sales() {
  const [range, setRange] = useState('30'); const [now] = useState(() => Date.now()); const all = getOrders()
  const since = range === 'all' ? 0 : now - Number(range) * 86400000
  const list = all.filter(o => new Date(o.createdAt).getTime() >= since); const ok = sold(list)
  const revenue = ok.reduce((a, o) => a + o.total, 0); const qty = ok.reduce((a, o) => a + units(o), 0)
  const days = Math.min(range === 'all' ? 30 : Number(range), 30)
  const keyOf = (d: Date) => d.toLocaleDateString('en-CA')
  const series = Array.from({ length: days }, (_, i) => { const d = new Date(now - (days - 1 - i) * 86400000); const k = keyOf(d); const day = ok.filter(o => keyOf(new Date(o.createdAt)) === k); return { k, label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), v: day.reduce((a, o) => a + o.total, 0), n: day.length } })
  const peak = Math.max(1, ...series.map(s => s.v))
  const byProduct = new Map<string, { name: string; qty: number; amt: number }>()
  ok.forEach(o => o.items.forEach(i => { const x = byProduct.get(i.id) || { name: i.name, qty: 0, amt: 0 }; x.qty += i.qty; x.amt += i.qty * i.price; byProduct.set(i.id, x) }))
  const top = [...byProduct.entries()].sort((a, b) => b[1].amt - a[1].amt).slice(0, 6)
  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [['Order date', 'Order ID', 'Status', 'Delivery date', 'Customer', 'Business', 'Mobile', 'Email', 'SKU', 'Product', 'Qty', 'Unit price', 'Line total'].map(esc).join(',')]
    list.forEach(o => o.items.forEach(i => lines.push([fmtDateTime(o.createdAt), o.id, o.status, o.deliveryDate || '', o.customerName, o.business, o.phone, o.userEmail, i.id, i.name, i.qty, i.price, i.qty * i.price].map(esc).join(','))))
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv' })); a.download = `mrt-sales-${keyOf(new Date(now))}.csv`; a.click(); URL.revokeObjectURL(a.href)
  }
  const kpis: [string, string | number, string][] = [['Revenue', revenue ? inr(revenue) : '₹0', 'Excludes cancelled orders'], ['Orders', ok.length, `${list.length - ok.length} cancelled`], ['Units sold', qty, `${byProduct.size} different products`], ['Avg. order value', ok.length ? inr(revenue / ok.length) : '₹0', 'Per non-cancelled order']]
  return <>
    <div className="adm-head"><div><h1>Sales log</h1><p>Every order placed in the storefront, with totals and daily sales.</p></div>
      <div className="adm-row"><div className="adm-seg">{[['7', '7 days'], ['30', '30 days'], ['all', 'All time']].map(([v, l]) => <button key={v} className={range === v ? 'on' : ''} onClick={() => setRange(v)}>{l}</button>)}</div><button className="adm-btn" onClick={exportCsv} disabled={!list.length}>⤓ Export CSV</button></div></div>
    <div className="adm-stats">{kpis.map(([t, v, d]) => <div className="adm-stat plain" key={t}><div><strong>{t}</strong><b>{v}</b><small>{d}</small></div></div>)}</div>
    <div className="adm-cols">
      <section className="adm-card"><div className="adm-card-h"><h2>Daily sales</h2><small className="hint">Last {days} days</small></div>
        <div className="adm-chart" role="img" aria-label="Daily sales chart">{series.map(s => <div key={s.k} className="adm-col" title={`${s.label}: ${inr(s.v)} · ${s.n} orders`}><i style={{ height: `${Math.max(s.v ? 6 : 2, (s.v / peak) * 100)}%` }} className={s.v ? '' : 'zero'} /></div>)}</div>
        <div className="adm-chart-x"><span>{series[0]?.label}</span><span>{series.at(-1)?.label}</span></div>
      </section>
      <section className="adm-card"><h2>Top products</h2>
        {top.length ? <ul className="adm-toplist">{top.map(([id, x], i) => <li key={id}><em>{i + 1}</em><div><b>{x.name}</b><small>{x.qty} unit{x.qty === 1 ? '' : 's'}</small></div><span>{inr(x.amt)}</span></li>)}</ul> : <p className="hint">No sales in this period.</p>}
      </section>
    </div>
    <div className="adm-card adm-table-card adm-gap">
      <div className="adm-filters"><h2 className="adm-h2">Order log</h2><small>{list.length} orders</small></div>
      <div className="adm-table-wrap"><table className="adm-table">
        <thead><tr><th>Date &amp; time</th><th>Order</th><th>Customer</th><th>Products</th><th>Units</th><th>Amount</th><th>Delivery</th><th>Status</th></tr></thead>
        <tbody>{list.map(o => <tr key={o.id}>
          <td className="adm-nowrap">{fmtDateTime(o.createdAt)}</td><td><Link className="adm-oid" to={`/admin/orders/${o.id}`}>{o.id}</Link></td>
          <td><b className="adm-strong">{o.business}</b><small className="adm-sub">{o.customerName} · {o.phone}</small></td>
          <td className="adm-items">{o.items.map(i => `${i.name} × ${i.qty}`).join(', ')}</td><td>{units(o)}</td><td className="adm-num">{inr(o.total)}</td>
          <td className="adm-nowrap">{o.deliveryDate ? fmtDate(o.deliveryDate) : '—'}</td><td><Status s={o.status} /></td>
        </tr>)}</tbody>
      </table>{!list.length && <p className="adm-none">No orders in this period.</p>}</div>
    </div>
  </>
}

/* ---------------- Shell ---------------- */
export default function Admin() {
  useStoreVersion(); const loc = useLocation(); const nav = useNavigate()
  const [msg, setMsg] = useState<[string, boolean]>(['', false]); const [menu, setMenu] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const say = useMemo(() => (m: string, bad = false) => { setMsg([m, bad]); clearTimeout(timer.current); timer.current = window.setTimeout(() => setMsg(['', false]), 2600) }, [])
  if (loc.pathname === '/admin/login') return <AdminLogin />
  if (!isAdmin()) return <Navigate to={`/admin/login?next=${encodeURIComponent(loc.pathname)}`} replace />
  const openOrders = getOrders().filter(o => OPEN.includes(o.status)).length
  return <div className="adm">
    <header className="hdr adm-hdr"><div className="bar">
      <button className="burger" aria-label="Toggle admin menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
      <Link to="/admin" className="logo"><LogoMark /><span><b>MRT-ENTERPRISES</b><small>ADMIN CONSOLE</small></span></Link>
      <div className="adm-top"><Link className="adm-store" to="/" target="_blank">View store ↗</Link><span className="adm-me"><i>A</i><span><b>Admin</b><small>Store manager</small></span></span>
        <button className="adm-btn" onClick={() => { adminSignOut(); nav('/admin/login') }}>Sign out</button></div>
    </div></header>
    <div className="adm-shell">
      <aside className={'adm-side' + (menu ? ' open' : '')} onClick={() => setMenu(false)}>
        <small>MENU</small>
        <NavLink to="/admin" end><span>◧</span>Dashboard</NavLink>
        <NavLink to="/admin/orders"><span>⛟</span>Orders{openOrders > 0 && <em>{openOrders}</em>}</NavLink>
        <NavLink to="/admin/sales"><span>₹</span>Sales log</NavLink>
        <NavLink to="/admin/products" end><span>▦</span>Products<em>{products.length}</em></NavLink>
        <NavLink to="/admin/products/new"><span>+</span>Add product</NavLink>
        <div className="adm-side-note"><b>Demo mode</b><small>Products, orders and accounts are saved in this browser until the backend API is connected.</small></div>
      </aside>
      <main className="adm-main"><Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/orders/:id" element={<OrderDetail key={loc.pathname} say={say} />} />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/admin/products" element={<ProductList say={say} />} />
        <Route path="/admin/products/new" element={<ProductForm say={say} />} />
        <Route path="/admin/products/:id/edit" element={<EditProduct say={say} />} />
        <Route path="*" element={<Dashboard />} />
      </Routes></main>
    </div>
    {msg[0] && <div className={'toast' + (msg[1] ? ' bad' : '')} role="status">{msg[0]}</div>}
  </div>
}
