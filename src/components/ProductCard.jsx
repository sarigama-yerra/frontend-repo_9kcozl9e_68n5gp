import React from 'react'

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="group relative rounded-2xl bg-white/70 dark:bg-slate-900/70 ring-1 ring-slate-200/60 dark:ring-white/10 p-4 hover:shadow-xl transition-all">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <img src={product.image || 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop'} alt={product.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-slate-900 dark:text-white font-semibold">
            {product.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{product.description}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</p>
          <button onClick={() => onAdd(product)} className="mt-2 inline-flex items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 text-sm font-semibold hover:opacity-90">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
