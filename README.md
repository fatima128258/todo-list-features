# Task Manager (React + Express + MongoDB Atlas)

Full-stack task manager with JWT auth: **React** (Vite + Tailwind) frontend, **Express** API, **MongoDB Atlas** for data. The dashboard supports **search and filters** (list, tag), **tags and lists**, **recurring tasks** (daily / weekly / monthly when completed), and a **calendar view**. UI is **responsive** (mobile-first, sticky form on large screens, tasks stack on small screens).

**Layout:** frontend lives in **`client/`** (Vite: `client/index.html`, app in `client/src/`). The API is in **`server/`**.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and connection string

## MongoDB Atlas

1. Create a cluster → **Database** → **Connect** → **Drivers** → copy the connection string.
2. Replace `<password>` with your database user password.
3. Allow your IP (or `0.0.0.0/0` for development only) in **Network Access**.

Recommended database name in the URI path: `taskmanager` (e.g. `...mongodb.net/taskmanager?...`).

## Configuration

1. **Create your env file:** copy `server/.env.example` to **`server/.env`** (same folder as `server/server.js`). Never commit `server/.env`.
2. Set:
   - **`MONGODB_URI`** — Atlas connection string (valid user/password).
   - **`JWT_SECRET`** — long random string (used to sign tokens).
   - **`PORT`** — API port (default `5000`).
   - **`CLIENT_URL`** — allowed browser origin(s) for CORS (dev: `http://localhost:3000`, same as Vite). Comma-separate multiple origins if needed.

Optional **client** env when **building** the app (`client/.env`):

- **`VITE_API_URL`** — only if the API is on a different host than the static site (e.g. `https://api.example.com`). Omit for **same-origin** (Express serving `client/dist`).

## Install

```bash
cd server && npm install
cd ../client && npm install
```

## Development

**Terminal 1** — API (requires `server/.env` with `MONGODB_URI` and `JWT_SECRET`):

```bash
cd server
npm run dev
```

**Terminal 2** — React (Vite proxies `/api` to `http://localhost:5000`):

```bash
cd client
npm run dev
```

Open **http://localhost:3000**. Register, sign in, then open **Dashboard** for tasks.

