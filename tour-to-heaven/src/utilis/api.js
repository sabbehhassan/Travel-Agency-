// src/utils/api.js
// small helper in case you want to use a shared fetch wrapper (not required if using authFetch in AuthContext)
export async function apiFetch(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || "Network error");
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return res.json();
}
