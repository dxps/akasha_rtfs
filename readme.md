# Akasha

This is Akasha implementation done using React.js (and React Native) with TypeScript, as a fullstack project.

<br/>

## Project layout

- `backend` - Bun.js API written in TypeScript.
- `frontend/web` - React.js web app powered by Vite.
- `frontend/mobile` - React Native mobile app powered by Expo.
- `shared` - TypeScript types, constants, and utilities shared by backend and frontend apps.

<br/>

## Getting started

Install the dependencies using `bun install`.

<br/>

## Running

### Back-end

Run the backend using `bun run dev:backend`. It exposes a health endpoint at `http://localhost:9908/health`.

#### Front-end

Run the web frontend using `bun run dev:web`. It can be accessed at `http://localhost:9909`.

Run the mobile frontend:

- `bun run dev:mobile` starts Expo and opens the app on a connected Android device or emulator.<br/>
  (or use `./dev_mobile_android.sh` provided script)
- `bun run dev:mobile:ios` starts Expo and opens the app in an iOS simulator.
  (or use `./dev_mobile_ios.sh` provided script)
- `bun run dev:mobile:metro` starts only Metro for manual Expo Go scanning.

For mobile device testing, set `EXPO_PUBLIC_API_BASE_URL` to the backend URL reachable from the device.
