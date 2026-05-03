const BASE = import.meta.env.VITE_API_URL || "";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

/** Throws on non-OK responses (same behavior as before). */
export async function api(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  const data = text
    ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      })()
    : null;

  if (!res.ok) {
    const msg = data && data.message ? data.message : res.statusText;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return data;
}

/**
 * Safe wrapper for auth / forms: never throws; returns { ok, data }.
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<{ ok: boolean, data: any, status?: number }>}
 */
export async function apiFetch(path, options = {}) {
  try {
    const data = await api(path, options);
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      data: { message: err.message || "Request failed" },
      status: err.status,
    };
  }
}
