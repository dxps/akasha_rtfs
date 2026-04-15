# Akasha

This is Akasha implementation done using React.js (and React Native) with TypeScript, as a fullstack project.

## Project layout

- `backend` - Bun.js API written in TypeScript.
- `frontend/web` - React.js web app powered by Vite.
- `frontend/mobile` - React Native mobile app powered by Expo.
- `shared` - TypeScript types, constants, and utilities shared by backend and frontend apps.

## Getting started

Install dependencies:

```sh
bun install
```

Run the backend:

```sh
bun run dev:backend
```

Run the web frontend:

```sh
bun run dev:web
```

The web frontend can be accessed at `http://localhost:9909`.

Run the mobile frontend:

```sh
bun run dev:mobile
```

The backend exposes a health endpoint at `http://localhost:9908/health`.

For mobile device testing, set `EXPO_PUBLIC_API_BASE_URL` to the backend URL reachable from the device.
