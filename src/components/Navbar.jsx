import React from 'react'
import { ShoppingCart, Search } from 'lucide-react'

const Navbar = ({ cartCount, onCartToggle }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-slate-900/60 border-b border-white/20 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow ring-1 ring-black/10" />
          <span className="text-lg font-semibold text-slate-900 dark:text-white">VibeStore</span>
        </a>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white placeholder:text-slate-400 ring-1 ring-slate-200/60 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={onCartToggle}
          className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow ring-1 ring-black/5"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[22px] h-5 px-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold flex items-center justify-center shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar
