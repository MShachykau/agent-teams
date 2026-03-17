# Type Coverage Audit

**Scope:** 21 `.ts` / `.tsx` files in `frontend/src/`. No `api/` directory exists (backend is plain JS in `bff/`).

**Overall type coverage: ~10%** — `any` is the dominant type throughout the entire codebase.

---

### Untyped Parameters

Major hotspots:

- `frontend/src/api/userApi.ts` — every function parameter (`id`, `userData`, fetch response callbacks) typed as `any`
- `frontend/src/utils/helpers.ts` — all function parameters typed as `any` (`firstName`, `lastName`, `role`, `status`, `date`, `user`, `token`, etc.)
- `frontend/src/redux/actions/userActions.ts` and `authActions.ts` — all action creator payloads typed as `any`
- `frontend/src/redux/reducers/userReducer.ts` and `uiReducer.ts` — both reducer `state` and `action` params typed as `any`
- All component files (`UserForm`, `UserManagementPage`, `UserList`, `UserDetails`, `UserCard`, `UserStats`, `LegacyUserTable`, `Header`, `Notification`) — all Props interfaces use `any` for virtually every field

---

### Missing Return Types

- All 8 API functions return `Promise<any>`
- Both reducers return `any`
- `flattenUserObject`, `paginateArray`, `decodeJwt` in helpers return `any` / `any[]`
- All Redux action creators have no explicit return type (inferred as `{ type: string; payload: any }`)
- `useUserStats` and `useRoleBreakdown` in `UserStats` have no return type annotations

---

### Non-null Assertion Overuse

None found. Zero occurrences of the `!` non-null assertion operator across all files. The codebase uses `any` casts instead, which is more broadly harmful.

---

### Coverage Estimate

| Directory | Typed | Untyped | Coverage % |
|---|---|---|---|
| `api/` | ~0% | ~100% | ~0% |
| `redux/actions/` | ~0% | ~100% | ~0% |
| `redux/reducers/` | ~0% | ~100% | ~0% |
| `types/` | ~14% | ~86% | ~14% |
| `utils/` | ~17% | ~83% | ~17% |
| `components/` | ~11% | ~89% | ~11% |
| **Overall** | — | — | **~10%** |

---

### Root Cause

`frontend/src/types/index.ts` defines all core domain interfaces (`User`, `ApiResponse`, `RootState`, `ReduxAction`, `UserFormState`, `UserFilter`) with `any`-typed fields. Since every consumer imports from this file, the `any` infection propagates throughout the entire codebase.
