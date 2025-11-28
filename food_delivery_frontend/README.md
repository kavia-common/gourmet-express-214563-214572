# GourmetExpress Frontend

A React-based food delivery frontend where users can browse restaurants, view menus, manage a cart, place orders, and track deliveries with real-time updates when available.

## Overview

This application is built with Create React App and uses modern, lightweight components with the Ocean Professional theme. Data is fetched from a backend via REST endpoints with graceful mock fallbacks when the backend is unavailable. Real-time order tracking is supported via WebSocket if configured, otherwise the app uses periodic polling.

## Environment Variables

Set environment variables via a .env file or your deployment environment. All variables are optional; sensible defaults and mock behaviors are provided where possible.

- REACT_APP_API_BASE  
  Purpose: Base HTTP URL for REST API calls. Example: https://api.example.com  
  Used by: src/api/client.js to build request URLs.  
  Default: Empty string, which means fetches are made relative to the frontend origin.

- REACT_APP_BACKEND_URL  
  Purpose: Alternative/legacy base URL if REACT_APP_API_BASE is not set.  
  Used by: src/api/client.js as secondary fallback.  
  Default: Empty string.

- REACT_APP_WS_URL  
  Purpose: Base WebSocket URL for real-time updates. Example: wss://ws.example.com  
  Used by: src/hooks/useWebSocket.js for live order status.  
  Default: Not set. When absent, the app uses polling fallback for order status.

- REACT_APP_FRONTEND_URL  
  Purpose: Informational/self-reference for deployments that need frontend absolute URL.  
  Used by: Not directly consumed in code; useful for external integrations and docs.

- REACT_APP_NODE_ENV  
  Purpose: Explicit environment flag (e.g., development, production).  
  Used by: Not directly consumed in code; can be used by tooling or future conditions.

- REACT_APP_NEXT_TELEMETRY_DISABLED  
  Purpose: Disable telemetry in some environments. Included for platform consistency.  
  Used by: Not used in runtime code; may be set to "1" or "true" to indicate disable.

- REACT_APP_ENABLE_SOURCE_MAPS  
  Purpose: Control source maps in builds. Set to "false" to disable, if your hosting respects it.  
  Used by: Build tooling behavior (may vary by environment).

- REACT_APP_PORT  
  Purpose: Preferred port for local dev environments that honor this variable.  
  Used by: CRA defaults to 3000; some environments may read this variable.

- REACT_APP_TRUST_PROXY  
  Purpose: Proxy configuration hint for hosting environments.  
  Used by: Not used in runtime code.

- REACT_APP_LOG_LEVEL  
  Purpose: Target log verbosity for future logging extensions.  
  Used by: Not used in runtime code currently.

- REACT_APP_HEALTHCHECK_PATH  
  Purpose: Health endpoint path for hosting probes (e.g., /healthz).  
  Used by: Not used in runtime code; can be exposed by hosting if configured.

- REACT_APP_FEATURE_FLAGS  
  Purpose: Comma-separated feature flags for controlled rollouts. Example: newMenu,v2Checkout  
  Used by: Not used in runtime code currently; reserved for future toggles.

- REACT_APP_EXPERIMENTS_ENABLED  
  Purpose: Enable experimental features. "true" or "false".  
  Used by: Not used in runtime code currently.

Notes:
- Only REACT_APP_API_BASE, REACT_APP_BACKEND_URL, and REACT_APP_WS_URL are read by the current codebase.
- If neither REACT_APP_API_BASE nor REACT_APP_BACKEND_URL is defined, network calls use relative paths and will fall back to mock data on failure.

## Mock Mode and Fallback Behavior

The application is resilient to missing backends:

- REST calls:  
  When an API call fails or the backend is undefined/unreachable, the endpoints in src/api/endpoints.js return mock data:
  - Restaurants list: static mock list.
  - Menu per restaurant: static mock menus.
  - Order creation: returns a mock order id with status "received".
  - Order status: cycles through received → preparing → on_the_way → delivered over time to simulate progress.

- WebSocket:  
  If REACT_APP_WS_URL is not set, WebSocket is disabled and the app automatically uses polling every 5 seconds to update order status.  
  If REACT_APP_WS_URL is set but the connection fails, the hook reports the error and callers can rely on the same polling fallback.

This means you can run the frontend independently for demos and development without a running backend.

## How to Run Locally

Prerequisites:
- Node.js 18+ and npm

Steps:
1. Install dependencies:  
   npm install
2. Start the development server:  
   npm start
3. Open the app:  
   http://localhost:3000

Optional: Configure API/WS endpoints for a live backend:
- Create a .env file in the project root with any of the variables described above. For example:
  - REACT_APP_API_BASE=https://api.example.com
  - REACT_APP_WS_URL=wss://ws.example.com

Without these, the app will work in mock-friendly mode and use polling for order status.

## Available Routes and Features

The main routes are defined in src/App.js:

- / — Home  
  Landing page with hero section and calls to action.
- /restaurants — Restaurants listing  
  Fetches a list (mocked) and displays cards with rating, cuisine, price level, and ETA.
- /restaurants/:id — Restaurant details  
  Displays the menu (mocked) for the selected restaurant and lets you add items to the cart.  
  A cart sidebar shows items and totals in real time.  
  Checkout triggers order creation and navigates to tracking.
- /cart — Cart page  
  Full-page cart view with checkout button.
- /orders/:id — Order tracking  
  Tracks the order status using WebSocket if REACT_APP_WS_URL is set; otherwise polls the REST endpoint.  
  Shows a visual progress indicator across received, preparing, on_the_way, delivered.

Key capabilities:
- State Management:  
  A lightweight context reducer at src/context/AppContext.js manages theme, restaurants, menus, cart, and order state.
- API Layer:  
  src/api/client.js reads REACT_APP_API_BASE and REACT_APP_BACKEND_URL to build URLs, with safe fetch handling.  
  src/api/endpoints.js defines high-level functions with mock fallbacks.
- Real-time/Polling:  
  src/hooks/useWebSocket.js provides a reusable WebSocket hook and a polling helper for graceful degradation.
- Theme:  
  Ocean Professional theme tokens in src/theme.js with dynamic CSS variable injection.
- Testing:  
  Basic test included at src/App.test.js.

## Common Tasks

- Install dependencies:  
  npm install
- Run development server:  
  npm start
- Run tests:  
  npm test
- Build for production:  
  npm run build
- Lint (via eslint.config.mjs rules when integrated with your editor):  
  No separate script; configure your editor/CI to run ESLint if desired.

## Deployment Notes

- Build Output:  
  npm run build produces a static bundle in build/.  
  Serve the build directory via any static hosting (e.g., Netlify, Vercel, S3 + CloudFront, Nginx).

- Environment Variables at Build Time:  
  Create React App inlines env variables at build time. Ensure REACT_APP_* variables are set in the build environment for production builds.  
  If your platform requires runtime configuration, consider serving a config.json and reading it at app start (not implemented here).

- Base URLs:  
  REACT_APP_API_BASE or REACT_APP_BACKEND_URL should point to your backend origin. Use HTTPS in production.  
  REACT_APP_WS_URL should be a wss:// URL for secure WebSocket connections.

- Health Checks:  
  You can set REACT_APP_HEALTHCHECK_PATH for your platform metadata; the app does not expose a server endpoint itself because it is a static app.

- Source Maps:  
  If you prefer to disable source maps in production, set REACT_APP_ENABLE_SOURCE_MAPS=false and confirm your hosting/build pipeline respects this variable.

- Proxies/CORS:  
  When serving the frontend and backend from different origins, ensure CORS is configured on the backend. Alternatively, use a reverse proxy to serve both from the same origin.

## Troubleshooting

- White Screen / 404 on Refresh:  
  Ensure your static hosting rewrites all routes to index.html, since this is a client-side routed SPA.

- Backend Not Ready:  
  The app will show mock data and continue to function. Once the backend is available, set REACT_APP_API_BASE and rebuild or reload with proper environment configuration.

- WebSocket Not Connecting:  
  Verify REACT_APP_WS_URL is correct and uses wss:// in production. The app will fall back to polling if WebSocket is unavailable.

## Repository Structure (Frontend)

- src/  
  - api/
    - client.js: Base HTTP client with env handling and safe fetch
    - endpoints.js: Endpoint helpers with mock fallbacks
  - components/: UI components (cards, layout, cart)
  - context/: AppContext reducer and provider
  - hooks/: Data and UI hooks (restaurants, menu, orders, theme, websocket)
  - pages/: Route views (Home, Restaurants, RestaurantDetail, CartPage, OrderTracking)
  - styles/: Global and page-level styles
  - theme.js: Theme tokens and CSS variable injection
  - utils/: Helpers (formatting)
  - App.js: Routes and layout
  - index.js: React entry point

## Example .env

Create a .env file at the project root to connect to a live backend:

```
REACT_APP_API_BASE=https://api.example.com
REACT_APP_WS_URL=wss://ws.example.com
REACT_APP_FRONTEND_URL=https://app.example.com
REACT_APP_NODE_ENV=production
REACT_APP_ENABLE_SOURCE_MAPS=true
REACT_APP_LOG_LEVEL=info
REACT_APP_FEATURE_FLAGS=
REACT_APP_EXPERIMENTS_ENABLED=false
```

You can omit variables you do not need. Missing values will not break the app due to built-in fallbacks.

## License

This project is part of a generated workspace for demonstration and internal testing purposes.
