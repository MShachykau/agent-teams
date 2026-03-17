# Dependency Audit

**Scope:** `package.json`, `package-lock.json` / `yarn.lock`; all import statements across `src/` and `api/`

---

### Outdated Packages

**frontend** (today is 2026-03-17; all packages well over 12 months behind):

| Package | Installed | Latest | Risk |
|---|---|---|---|
| `react` / `react-dom` | 16.14.0 | 19.x | CRITICAL — React 16 is EOL; React 17, 18, 19 all released with breaking changes |
| `react-scripts` | 4.0.3 | Deprecated (CRA abandoned by Meta) | HIGH — bundles EOL Webpack 4, Webpack-dev-server 3, Jest 26; known security advisories |
| `typescript` | 4.1.6 | 5.8.x | HIGH — 6+ major versions missed, stricter inference, new operators |
| `redux` | 4.2.1 | 5.x | HIGH — v5 removes `AnyAction`, requires typed actions; `createStore` deprecated in 4.2 |
| `react-redux` | 7.2.9 | 9.x | HIGH — v9 drops React 16/17 |
| `@testing-library/react` | 11.2.7 | 16.x | HIGH — v13+ requires React 18 |
| `@testing-library/user-event` | 12.8.3 | 14.x | HIGH — v14 fully async model, breaks v12 sync usage |
| `styled-components` | 5.3.11 | 6.x | MEDIUM — API changes in v6 |
| `web-vitals` | 1.1.2 | 4.x | MEDIUM — FID removed as Core Web Vital; INP not measured |
| `@testing-library/jest-dom` | 5.17.0 | 6.x | MEDIUM |
| `@types/node` | 12.x | 22.x | MEDIUM — Node 12 EOL 2022 |
| `express` (bff) | 4.22.1 | 5.x | HIGH — Express 5 released 2024, v4 no longer actively developed |

**bff:** `cors` and `nodemon` are current.

---

### Circular Dependencies

None detected. The import graph is fully acyclic in both `frontend/src/` and `bff/src/`.

---

### Leaked devDependencies

No devDependency-category packages are directly imported in production source files, **but** all test utilities and `@types/*` packages (`@testing-library/*`, `@types/jest`, `@types/node`, `@types/react`, `@types/react-dom`, `@types/react-redux`, `@types/styled-components`) are incorrectly listed under `dependencies` instead of `devDependencies` in `frontend/package.json`. This inflates the production dependency surface and would cause unnecessary installs in `npm install --production` scenarios.

---

### Additional Notes

- The `start`/`build` scripts use `SET NODE_OPTIONS=--openssl-legacy-provider` (Windows CMD syntax) — a workaround for Webpack 4 + Node 17+ incompatibility that will fail on Linux/macOS CI
- No `engines` field is defined in either `package.json`, masking the actual Node version requirement
- `createStore` from Redux is deprecated since v4.2 (console warning on every app start)
