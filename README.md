# Orbit Educations — Frontend

React (Vite) + Tailwind CSS v4 + React Router + TanStack Query + Axios.
Talks exclusively to a Django REST API — no server-side rendering, no direct DB access.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

Copy `.env` and point it at your Django backend:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
```

## Auth strategy

The frontend assumes **httpOnly cookie-based auth** (Django session or
SimpleJWT with cookies), not localStorage — this is the best-practice call
made during planning, since it protects tokens from XSS. Every request goes
out with `withCredentials: true`, and `axiosInstance.js` attaches Django's
`X-CSRFToken` header automatically by reading the `csrftoken` cookie.

`authService.getCurrentUser()` hits `/auth/me/` on load to establish session
state — a 401 there just means "logged out," not an error.

## Expected Django REST endpoints

These are the endpoints every `services/*.js` file currently calls. Build the
backend to match this contract (or update the service files if your URLs
differ — that's the only place API paths live).

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login/` | `{ uid, course, password }` -> sets auth cookie |
| POST | `/auth/signup/` | `{ uid, phone, name, email, password, parentName, parentPhone, address, enrolledCourse }` |
| POST | `/auth/logout/` | clears auth cookie |
| GET | `/auth/me/` | current user, 401 if logged out |
| POST | `/auth/token/refresh/` | silent refresh, called automatically on 401 |
| GET | `/courses/` | `?category=&search=&page=` -> `{ results, next }` |
| GET | `/courses/:id/` | single course, incl. optional `syllabus: string[]` |
| POST | `/courses/applications/` | enrollment/application form submissions |
| GET | `/subscriptions/me/` | `{ planId, planName }` |
| POST | `/subscriptions/upgrade/` | `{ planId }` -> Razorpay order `{ orderId, amount, currency }` for paid tiers |
| POST | `/subscriptions/verify-payment/` | verifies Razorpay signature, updates subscription |
| GET | `/dashboard/profile/` | current student's editable profile |
| PATCH | `/dashboard/profile/` | update profile fields |
| GET | `/dashboard/certificates/` | `[{ id, title, issuedDate }]` |
| GET | `/dashboard/certificates/:id/download/` | binary PDF |
| GET | `/notifications/` | `[{ id, title, message, read }]`, polled every 30s while logged in |
| PATCH | `/notifications/:id/` | `{ read: true }` |
| POST | `/notifications/mark-all-read/` | bulk mark-as-read |
| POST | `/contact/` | `{ name, email, phone, message }` |

Gallery, Awards, and Centers are **static** for now (`src/constants/*.js`) —
structured so they can be swapped for real API calls later without touching
the page components.

## Folder structure

```
src/
├── components/   # reusable UI, grouped by domain
├── pages/        # one file per route
├── layouts/      # MainLayout (public), DashboardLayout (protected)
├── services/     # all Axios calls — pages/components never call Axios directly
├── hooks/        # useDebounce, etc.
├── context/      # AuthContext, NotificationContext
├── router/       # AppRouter, ProtectedRoute
├── constants/    # nav links, plans, categories, static content
└── styles/       # design tokens (variables.css), animations, global.css
```

## Design tokens

Colors, fonts, radii, and shadows live in `src/styles/variables.css` as
Tailwind v4 `@theme` variables (`--color-orbit-blue-600`, `--font-display`,
etc.) — change the palette or type scale there and it propagates everywhere.

## Notes for the Django side

- CORS: allow the frontend origin with `credentials: true`.
- Cookies: set auth cookies as `HttpOnly`, `Secure` (in production), `SameSite=Lax` or `Strict`.
- Django's CSRF cookie (`csrftoken`) must be readable by JS (it's not
  `HttpOnly` by default) since the frontend reads it to set `X-CSRFToken`.
- Razorpay: create the order server-side in `/subscriptions/upgrade/`, verify
  the signature server-side in `/subscriptions/verify-payment/` — never trust
  the client-side success callback alone.
