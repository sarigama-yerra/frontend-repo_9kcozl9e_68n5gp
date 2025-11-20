import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [filter, setFilter] = useState('all')

  const categories = useMemo(() => {
    const cats = new Set()
    products.forEach(p => p.category && cats.add(p.category))
    return ['all', ...Array.from(cats)]
  }, [products])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${baseUrl}/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError(e.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [baseUrl])

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p._id === product._id)
      if (exists) {
        return prev.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p)
      }
      return [...prev, { _id: product._id, name: product.name, price: product.price, image: product.image, qty: 1 }]
    })
    setCartOpen(true)
  }

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products
    return products.filter(p => p.category === filter)
  }, [products, filter])

  const handleCheckout = async () => {
    if (cart.length === 0) return
    const items = cart.map(it => ({
      product_id: it._id || it.id || '',
      quantity: it.qty,
      unit_price: it.price,
      name: it.name,
      image: it.image,
    }))
    const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0)
    const payload = {
      items,
      subtotal,
      shipping: 0,
      total: subtotal,
      customer: null,
      status: 'pending',
    }
    try {
      const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      // Simple success state
      alert(`Order placed! ID: ${data.id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert(e.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar cartCount={cart.reduce((s, it) => s + it.qty, 0)} onCartToggle={() => setCartOpen(true)} />

      <main>
        {/* Hero with blue→purple diagonal gradient background image (provided asset) */}
        <Hero />

        {/* Featured strip */}
        <section className="relative -mt-12 z-10">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 sm:p-8 shadow-xl ring-1 ring-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Discover the vibe</h2>
                  <p className="text-blue-100/90">Curated picks, modern aesthetics, fast checkout.</p>
                </div>
                <div className="flex items-center gap-2">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === c ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-2xl h-72 bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-xl p-6 bg-red-50 text-red-700 ring-1 ring-red-200">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p._id || p.id} product={p} onAdd={addToCart} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="rounded-2xl p-8 sm:p-10 bg-white/70 dark:bg-slate-900/70 ring-1 ring-slate-200/60 dark:ring-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Join the Vibe Club</h3>
                <p className="text-slate-500 dark:text-slate-400">Members get early access to drops and exclusive deals.</p>
              </div>
              <a href="#join" className="inline-flex items-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white px-5 py-3 font-semibold shadow">
                Sign up free
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} VibeStore. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
    </div>
  )
}

export default App
