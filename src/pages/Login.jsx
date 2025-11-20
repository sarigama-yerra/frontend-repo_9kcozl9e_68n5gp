import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder flow – no API call yet
    setTimeout(() => {
      setLoading(false)
      alert('Signed in successfully (demo)')
    }, 700)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar cartCount={0} onCartToggle={() => {}} />

      <main className="mx-auto max-w-6xl px-6 sm:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/60 dark:ring-white/10">
            <div className="h-28 bg-gradient-to-br from-blue-600 to-purple-700" />
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Sign in to manage orders and checkout faster.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/70 text-slate-900 dark:text-white ring-1 ring-slate-200/60 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/70 text-slate-900 dark:text-white ring-1 ring-slate-200/60 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white px-4 py-2.5 font-semibold shadow"
                >
                  {loading ? 'Signing in…' : 'Sign in'}
                </motion.button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  No account? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Create one</a>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Login
