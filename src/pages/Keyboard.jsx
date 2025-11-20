import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

const Keyboard = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchKeyboards = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/products?category=keyboard`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      if (Array.isArray(data) && data.length === 0) {
        await fetch(`${baseUrl}/products/seed`, { method: 'POST' })
        const res2 = await fetch(`${baseUrl}/products?category=keyboard`)
        const data2 = await res2.json()
        setProducts(data2)
      } else {
        setProducts(data)
      }
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKeyboards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl])

  const featured = useMemo(() => products.find(p => p.featured) || products[0], [products])

  const handleAdd = (p) => {
    alert(`Added ${p.name} to cart (demo).`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar cartCount={0} onCartToggle={() => {}} />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8 py-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
            >
              Mechanical Keyboards
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 max-w-2xl text-blue-100"
            >
              Tactile feel, premium builds, and RGB flair. Explore our curated selection.
            </motion.p>
          </div>
        </section>

        <section className="-mt-10 pb-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            {featured && (
              <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 ring-1 ring-slate-200/60 dark:ring-white/10 p-6 sm:p-8 mb-10 grid md:grid-cols-2 gap-6 items-center">
                <img src={featured.image} alt={featured.name} className="w-full h-64 object-cover rounded-xl" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{featured.name}</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{featured.description || 'A beautifully engineered board with hot‑swap switches, aluminum chassis, and per‑key RGB.'}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xl font-semibold text-slate-900 dark:text-white">${'{'}featured.price{'}'}</span>
                    <span className="text-sm px-2 py-1 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 text-white">Keyboard</span>
                  </div>
                  <motion.a href="#shop" whileTap={{ scale: 0.98 }} className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white px-5 py-3 font-semibold shadow">Shop Keyboards</motion.a>
                </div>
              </div>
            )}

            <h3 id="shop" className="text-xl font-bold text-slate-900 dark:text-white mb-4">All Keyboards</h3>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-2xl h-72 bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-xl p-6 bg-red-50 text-red-700 ring-1 ring-red-200">{error}</div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                <AnimatePresence>
                  {products.map((p, idx) => (
                    <ProductCard key={p._id || p.id} product={p} onAdd={handleAdd} index={idx} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 dark:border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Keyboards by VibeStore
        </div>
      </footer>
    </div>
  )
}

export default Keyboard
