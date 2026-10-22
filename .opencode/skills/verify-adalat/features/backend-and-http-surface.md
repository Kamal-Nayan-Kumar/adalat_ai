# Backend and HTTP verification surface

Backend and HTTP verification exercises the server without a graphical browser, confirming HTTP status codes, MIME headers, caching invariants, asset delivery, and error boundaries for all routes and endpoints.

## Sub-features

- `http-route-status` checks HTTP 200 responses across all user-facing entry points.
- `http-cache-control` validates that `Cache-Control: no-store, must-revalidate` headers are returned to avoid stale asset caching.
- `http-mime-types` verifies correct content types for HTML, CSS, JavaScript, and SVG assets.
- `http-error-boundary` ensures non-existent paths return HTTP 404 rather than unhandled server failures.

## How to get to it (user POV)

- Issue HTTP GET requests to `http://127.0.0.1:4173/` or any resource path using curl, Python `urllib`, or API testing clients.
- Run `dev/control-adalat probe [port]` from the terminal.

## Driving it with control-adalat

Preconditions:
- Adalat AI server is running at `http://127.0.0.1:4173`.
- `curl` is available in PATH.

- **Probe all routes.** Run `./dev/control-adalat probe 4173`. The command queries every route (`index.html`, `courtroom.html`, `dashboard.html`, `cases.html`, `login.html`, `signup.html`, `styles.css`, `app.js`, `assets/icons.svg`) and verifies HTTP 200.
- **Check cache policy.** Request response headers for `styles.css` using `curl -s -I http://127.0.0.1:4173/styles.css`. Confirm `Cache-Control: no-store, must-revalidate` is present.
- **Verify 404 handling.** Request `http://127.0.0.1:4173/nonexistent-route`. Confirm status code 404.
- **Proof.** The command output prints `All backend HTTP routes, headers, and error boundaries verified successfully` with exit code 0.

## Gotchas

- Standard Python `http.server` caches CSS/JS aggressively without custom headers; `dev/serve.py` uses `NoCacheHandler` specifically to enforce `no-store`.
- If a custom backend or API server is mounted in the future, add its endpoint paths into the `probe` route array in `dev/control-adalat`.
