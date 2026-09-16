import axios from 'axios'

/**
 * Central Axios instance.
 *
 * Auth strategy: httpOnly cookies (set by Django on login/signup), not
 * localStorage. `withCredentials: true` ensures the cookie is sent on every
 * request; the token itself is never touchable from JS, which protects
 * against XSS-based token theft.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Module-level variable — holds the CSRF token in memory, set explicitly
// from the server's JSON response (not read from document.cookie, since
// cross-domain cookies aren't visible to frontend JS at all).
let csrfToken = null

export function setCsrfToken(token) {
  csrfToken = token
}

axiosInstance.interceptors.request.use((config) => {
  if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRFToken'] = csrfToken
  } 
  return config
})

let isRefreshing = false
let pendingQueue = []

function resolveQueue(error) {
  pendingQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()))
  pendingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 401 on a non-auth endpoint: attempt a silent token refresh once,
    // then replay the original request. This is what lets the UI stay
    // logged in without ever exposing a token to JS.
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        }).then(() => axiosInstance(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await axiosInstance.post('/auth/token/refresh/')
        resolveQueue(null)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        resolveQueue(refreshError)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
