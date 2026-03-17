# Pattern Audit

**Scope:** `frontend/src/` directory

---

### Explicit `any` Casts

The codebase has wall-to-wall `any` usage. Every file in `frontend/src/` is affected. Worst offenders:

- `frontend/src/types/index.ts` — the shared type file defines `AppError = any`, `RootState.users: any`, `RootState.ui: any`, and virtually every field in every interface as `any`, poisoning type safety at the root
- `frontend/src/components/UserManagementPage/index.tsx` — ~50 individual `any` usages covering Props, State, instance variables, styled-component prop destructures, event handlers, and all `.then`/`.catch` callbacks
- `frontend/src/components/UserForm/index.tsx` — ~20 `any` usages plus an explicit `as any` cast on line 194 (`this.setState({ [field]: e.target.value } as any)`)
- All API functions in `frontend/src/api/userApi.ts` return `Promise<any>` and cast every `res` parameter as `any`
- All Redux action creators in `frontend/src/redux/actions/userActions.ts` accept `any` payloads

---

### Callback Hell

One severe instance:

- `frontend/src/components/UserForm/index.tsx` lines 201–263: `handleSubmit` nests **6 levels** of `setTimeout`-backed callbacks (`validateField` → `validateField` → `validateEmail` → `sanitizeInput` → `formatPayload` → `logSubmission`). None of these steps are async in any meaningful way — they could be replaced with synchronous validation or a simple `async/await` pipeline.

---

### God Components

One confirmed God Component:

- `UserManagementPage` at `frontend/src/components/UserManagementPage/index.tsx`, **716 lines**, mixes: 20+ inline styled-component definitions, Redux wiring, 12-field local state, direct API calls, filtering/sorting logic, manual notification timeouts, stats rendering, table rendering, and modal rendering — at least 9 distinct concerns.

---

### Repeated Logic

Five patterns repeated 3+ times:

1. **User status/role counting filters** — `.filter(u => u.status === '...')` duplicated in `UserManagementPage` and twice inside `UserStats`
2. **`getInitials` logic** — `firstName[0] + lastName[0]` copy-pasted into `UserList`, `UserDetails`, and `UserCard`
3. **`Badge` styled-component** — colored pill with `border-radius: 10px`, white text defined identically in `UserManagementPage`, `UserList`, `UserDetails`, and `UserCard`
4. **`mapStateToProps = (state: any)`** — with unguarded deep access in `UserManagementPage`, `UserList`, and `Header`
5. **Raw fetch pattern** — `.then((res: any) => res.json())` repeated across all 8 functions in `userApi.ts` with no shared fetch helper
