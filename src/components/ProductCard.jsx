import React from 'react'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const ProductCard = ({ product, onAdd, index = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative rounded-2xl bg-white/70 dark:bg-slate-900/70 ring-1 ring-slate-200/60 dark:ring-white/10 p-4 hover:shadow-xl transition-all"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold">
            {product.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{product.description}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-900 dark:text-white">${Number(product.price).toFixed(2)}</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAdd(product)}
            className="mt-2 inline-flex items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 text-sm font-semibold hover:opacity-90"
          >
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
