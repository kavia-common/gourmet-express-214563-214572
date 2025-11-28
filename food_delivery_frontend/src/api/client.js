/**
 * Lightweight API client with graceful fallbacks.
 * Reads base URL from env vars, falls back to relative path and mock when needed.
 */
const BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, { headers: DEFAULT_HEADERS, ...options });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return res.text();
  } catch (e) {
    // Bubble up for caller to decide fallback
    throw e;
  }
}

// PUBLIC_INTERFACE
export async function apiGet(path, fallbackData = null) {
  /** Performs GET request with optional fallback data when request fails. */
  const url = `${BASE}${path}`;
  try {
    return await safeFetch(url);
  } catch (err) {
    if (fallbackData !== null) return fallbackData;
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function apiPost(path, body, fallbackData = null) {
  /** Performs POST request with optional fallback data when request fails. */
  const url = `${BASE}${path}`;
  try {
    return await safeFetch(url, { method: 'POST', body: JSON.stringify(body) });
  } catch (err) {
    if (fallbackData !== null) return fallbackData;
    throw err;
  }
}
