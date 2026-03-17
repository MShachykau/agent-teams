# Codebase Audit — Consolidated Findings

**Date:** 2026-03-17
**Audited:** `frontend/src/`, `bff/src/`
**Auditors:** dependency-auditor, pattern-detective, dead-code-hunter, type-coverage-analyst

---

## Critical Issues — Fix Before Any Refactor

### 1. `any` Infection Originating from `types/index.ts`
`frontend/src/types/index.ts` defines every core interface (`User`, `ApiResponse`, `RootState`, `ReduxAction`, `UserFormState`, `UserFilter`) with `any`-typed fields. This single file poisons type safety across the entire codebase. Overall type coverage is **~10%**.

**Fix:** Rewrite `types/index.ts` with concrete types first. All downstream files will benefit immediately.

See: `audit/types.md`, `audit/patterns.md`

### 2. React 16 EOL + CRA Abandoned
`react` / `react-dom` are on v16.14.0 (EOL). `react-scripts` v4 is deprecated and bundles Webpack 4, Webpack-dev-server 3, and Jest 26 — all with known security advisories.

**Fix:** Migrate to Vite + React 19 (or at minimum React 18). This is a prerequisite for upgrading `react-redux` to v9 and `@testing-library/react` to v16.

See: `audit/dependencies.md`

### 3. God Component — `UserManagementPage` (716 lines, 9 concerns)
`frontend/src/components/UserManagementPage/index.tsx` mixes Redux wiring, direct API calls, 12-field local state, filtering/sorting logic, 20+ inline styled-components, stats rendering, table rendering, and modal rendering in a single class.

**Fix:** Extract into at minimum: a data-fetching container, a `UserTable`, a `UserFilters` bar, a `UserStatsBar`, and a `UserModal`. This also enables deleting 3 zombie components (`UserCard`, `UserStats`, `UserList`) that were absorbed into it.

See: `audit/patterns.md`, `audit/dead-code.md`

---

## High Priority — Fix in First Sprint

### 4. Callback Hell in `UserForm.handleSubmit` (6 levels deep)
`frontend/src/components/UserForm/index.tsx` lines 201–263 nests 6 levels of `setTimeout`-backed callbacks for what is synchronous validation logic.

**Fix:** Replace with a flat `async/await` pipeline or synchronous validation chain.

See: `audit/patterns.md`

### 5. Entire `authActions.ts` File Is Dead
`frontend/src/redux/actions/authActions.ts` — 12 exports (constants + action creators) — is completely unreferenced. Auth was removed but the file was never deleted.

**Fix:** Delete the file.

See: `audit/dead-code.md`

### 6. 4 Zombie Components
`UserCard`, `UserStats`, `UserList`, `LegacyUserTable` are defined but never imported or rendered anywhere. `LegacyUserTable` even has a file-level comment confirming it is dead.

**Fix:** Delete all 4 component directories.

See: `audit/dead-code.md`

### 7. Redux Dependency Severely Outdated
`redux` v4.2.1 → v5.x (removes `AnyAction`, requires typed actions). `react-redux` v7.2.9 → v9.x (drops React 16/17). `createStore` is deprecated and logs a console warning on every app start.

**Fix:** Upgrade after fixing types (issue #1), or migrate to Zustand / Redux Toolkit which has cleaner ergonomics.

See: `audit/dependencies.md`

### 8. All `@types/*` and Test Packages in `dependencies` Instead of `devDependencies`
`@testing-library/*`, `@types/jest`, `@types/node`, `@types/react`, `@types/react-dom`, `@types/react-redux`, `@types/styled-components` are listed under `dependencies` in `frontend/package.json`, inflating the production install surface.

**Fix:** Move all to `devDependencies`.

See: `audit/dependencies.md`

---

## Low Priority — Fix Incrementally

### 9. Repeated Logic (4 patterns, copy-pasted across files)
- `getInitials` logic duplicated in `UserList`, `UserDetails`, `UserCard`
- `Badge` styled-component defined identically in 4 components
- `mapStateToProps = (state: any)` pattern copy-pasted in 3 components
- Raw `.then((res: any) => res.json())` fetch pattern repeated across all 8 API functions with no shared helper

**Fix:** Extract shared `getInitials` util, a `Badge` component, a typed `mapState` selector helper, and a `fetchJson` utility.

See: `audit/patterns.md`

### 10. Dead Feature Flags (8 hardcoded values)
`isDarkMode`, `darkMode`, `theme`, `layoutType`, `bulkMode`, `sidebarCollapsed`, `adminMode` are all hardcoded to their defaults (`false` / `'default'` / `'grid'`) and the branches they gate are permanently disabled.

**Fix:** Remove the flags and dead branches after deleting zombie components.

See: `audit/dead-code.md`

### 11. Dead Exports — `userActions.ts`, `userApi.ts`, `helpers.ts`, `types/index.ts`
- `userActions.ts`: `RESET_ALL`, `TOGGLE_ADMIN_MODE`, `BULK_UPDATE_USERS` + 3 action creators
- `userApi.ts`: `fetchUserById`, `fetchUserStats`, `fetchUsersByDepartment`, `bulkDeleteUsers`
- `helpers.ts`: `flattenUserObject`, `chunkArray`, `convertUsersToCSV`, `validatePhone`, `paginateArray`, `decodeJwt`
- `types/index.ts`: `LegacyUserData`, `OldPaginationState`

**Fix:** Delete all dead exports once you confirm no dynamic usage.

See: `audit/dead-code.md`

### 12. `react-scripts` Build Script — Windows-Only `SET` Syntax
`SET NODE_OPTIONS=--openssl-legacy-provider` in npm scripts is Windows CMD syntax; it fails on Linux/macOS CI.

**Fix:** Use `cross-env` package or (better) migrate off CRA (see issue #2).

See: `audit/dependencies.md`

### 13. `typescript` 4.1.6 → 5.8.x; `styled-components` 5 → 6; `express` 4 → 5
Lower-urgency upgrades that should follow after the React + Redux upgrades.

See: `audit/dependencies.md`

---

## Recommended Fix Order

1. Fix `types/index.ts` — unlocks everything downstream
2. Delete dead files (`authActions.ts`, 4 zombie components, dead exports)
3. Remove dead feature flags and dead branches
4. Fix `UserForm` callback hell
5. Extract repeated logic (Badge, getInitials, fetchJson)
6. Migrate off CRA → Vite
7. Upgrade React → 18/19, then react-redux → 9
8. Move `@types/*` to devDependencies
9. Decompose `UserManagementPage` God component
10. Upgrade remaining packages (TypeScript, styled-components, Express)
