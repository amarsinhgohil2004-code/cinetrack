# CineTrack — Frontend (Vite + React + JSX)

Reference-only frontend UI for a Movie Watchlist Manager. Drop into your MERN repo.

## Run locally

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## Stack

- Vite + React 18 (JSX only, no TypeScript)
- React Router DOM v6
- Tailwind CSS
- Axios (stubbed in `src/services/api.js` — swap `baseURL` for your Express backend)
- React Icons
- React Toastify

## Structure

See `src/` — components, pages, and services are organized per spec.
Movie state is held in-memory in `App.jsx` and seeded from `services/api.js`.
Replace the dummy stubs in `services/api.js` with real axios calls when your backend is ready.
