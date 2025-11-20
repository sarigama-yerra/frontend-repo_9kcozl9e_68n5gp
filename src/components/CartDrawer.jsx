import React from 'react'

const CartDrawer = ({ open, items, onClose, onCheckout }) => {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-slate-900 shadow-xl ring-1 ring-black/5 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-white/10">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your Cart</h3>
          <button onClick={onClose} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Close</button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">Your cart is empty.</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={it.image} alt={it.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{it.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {it.qty}</p>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white">${(it.price * it.qty).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
            <span className="text-slate-900 dark:text-white font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold py-3 shadow-lg hover:opacity-95">
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
