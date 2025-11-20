// Centralized API client with robust base URL resolution and safer fetch defaults

const inferBackendBase = () => {
  const envUrl = import.meta?.env?.VITE_BACKEND_URL
  if (envUrl && typeof envUrl === 'string' && envUrl.startsWith('http')) return envUrl.replace(/\/$/, '')
  try {
    const { protocol, hostname, port } = window.location
    // On preview, frontend is https; use same protocol and host, backend runs on port 8000
    const inferred = `${protocol}//${hostname}:8000`
    return inferred
  } catch {
    return 'http://localhost:8000'
  }
}

export const API_BASE = inferBackendBase()

const withTimeout = (ms, promise) => {
  let timeout
  const timer = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error('Request timed out')), ms)
  })
  return Promise.race([promise, timer]).finally(() => clearTimeout(timeout))
}

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
  try {
    const resp = await withTimeout(
      options.timeout ?? 12000,
      fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Accept': 'application/json',
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...(options.headers || {}),
        },
        body: options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : undefined,
        mode: 'cors',
        credentials: 'omit',
      })
    )
    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      throw new Error(text || `Request failed: ${resp.status}`)
    }
    const contentType = resp.headers.get('content-type') || ''
    if (contentType.includes('application/json')) return resp.json()
    return resp.text()
  } catch (err) {
    // Normalize common network errors for nicer UI
    if (err?.message?.includes('Failed to fetch')) {
      throw new Error('Failed to reach the API. Please ensure the backend URL is correct and the server is running.')
    }
    throw err
  }
}

export async function ping() {
  try {
    const res = await apiFetch('/test')
    return { ok: true, detail: res }
  } catch (e) {
    return { ok: false, detail: e.message }
  }
}
