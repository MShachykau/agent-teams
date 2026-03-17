# Bad Practices Catalogue

This document maps every intentional anti-pattern baked into the app. Use it as a refactoring checklist.

---

## 1. God Component

**File:** `frontend/src/components/UserManagementPage/index.tsx`

A single class component (~500 lines) that owns:
- All API calls (fetch, create, update, delete)
- All business logic (filtering, sorting, stats calculation)
- Redux dispatch
- Modal open/close state
- Notification management
- Table rendering
- Stats bar rendering
- Form and delete-confirm modals

**Should be split into:** a page-level container, a `useUsers` hook for data fetching, a `UserTable` component, a `UserModal` component, and a `useNotification` hook.

---

## 2. Callback Hell

**File:** `frontend/src/components/UserForm/index.tsx` — `handleSubmit` method

Form submission is buried 6 levels deep in nested callbacks:

```
validateField(firstName, (err1) => {
  validateField(lastName, (err2) => {
    validateEmail(email, (err3) => {
      sanitizeInput(data, (err4, sanitized) => {
        formatPayload(sanitized, isEdit, (err5, payload) => {
          logSubmission(payload, (err6, final) => {
            onSubmit(final)
          })
        })
      })
    })
  })
})
```

Each step uses `setTimeout(..., 0)` to simulate async — should be a `Promise` chain or `async/await`.

---

## 3. Custom Hooks Defined Inside a Component

**File:** `frontend/src/components/UserStats/index.tsx`

Two custom hooks (`useUserStats` and `useRoleBreakdown`) are defined as nested functions inside the `UserStats` functional component body.

Problems:
- Both functions are recreated from scratch on every render
- They cannot be reused in other components or tested independently
- Defining a hook inside a component body violates the spirit of the Rules of Hooks
- Two separate `useState` calls inside `useUserStats` trigger two render cycles

**Fix:** Extract hooks to `src/hooks/useUserStats.ts` and `src/hooks/useRoleBreakdown.ts`.

---

## 4. Pervasive `any` Types

**Files:** `frontend/src/types/index.ts`, every component props interface, all API functions, all Redux files

- `User.role`, `User.status`, `User.department`, `User.createdAt`, `User.lastLogin`, `User.phone`, `User.permissions`, `User.metadata` — all typed `any` instead of proper unions/types
- `RootState.users` and `RootState.ui` are both `any`
- All Redux action payloads are `any`
- All API function return types are `Promise<any>`
- All component `Props` interfaces use `any` for callbacks (`onSubmit: any`, `onEdit: any`)
- Redux reducer signature: `(state = initialState, action: any): any`
- `mapStateToProps` parameter: `(state: any)`

---

## 5. Dead Code

### Dead Components
| File | Reason |
|------|--------|
| `frontend/src/components/LegacyUserTable/index.tsx` | Entire component — never imported anywhere |
| `frontend/src/components/UserCard/index.tsx` | Card-grid layout was replaced by a table |

### Dead Redux Files
| File | Reason |
|------|--------|
| `frontend/src/redux/actions/authActions.ts` | Auth was removed; entire file is unreferenced |

### Dead Action Constants & Creators
In `frontend/src/redux/actions/userActions.ts`:
- `RESET_ALL`, `TOGGLE_ADMIN_MODE`, `BULK_UPDATE_USERS`
- `resetAll()`, `toggleAdminMode()`, `bulkUpdateUsers()`

### Dead Reducer Cases
In `frontend/src/redux/reducers/uiReducer.ts`:
- `TOGGLE_DARK_MODE`, `SET_THEME` — dark mode was never connected to UI

### Dead State Fields
| Component | Dead Fields |
|-----------|-------------|
| `UserManagementPage` | `bulkMode`, `bulkSelected`, `sidebarCollapsed`, `pollingInterval` |
| `UserManagementPage` | `adminMode`, `bulkSelectedIds`, `currentPage`, `pageSize` (in Redux) |
| `UserList` | `localSearch`, `localRoleFilter`, `inlineEditId`, `inlineEditData` |
| `UserDetails` | `activeTab` (only one tab ever existed), `notesExpanded` |

### Dead Methods
| Component | Method | Reason |
|-----------|--------|--------|
| `UserManagementPage` | `handleBulkDelete` | Bulk ops removed |
| `UserManagementPage` | `handleExportCSV` | Export button removed |
| `UserList` | `startInlineEdit`, `cancelInlineEdit`, `saveInlineEdit` | Inline editing removed |
| `UserDetails` | `handleTabSwitch`, `toggleNotes` | Features never built |
| `LegacyUserTable` | `showTooltip`, `hideTooltip` | Tooltips removed |

### Dead API Functions
In `frontend/src/api/userApi.ts`:
- `fetchUsersByDepartment` — department filtering removed
- `bulkDeleteUsers` — endpoint never built on BFF

### Dead Utility Functions
In `frontend/src/utils/helpers.ts`:
- `flattenUserObject`, `chunkArray`, `convertUsersToCSV`, `validatePhone`, `paginateArray`, `decodeJwt`

### Dead Types
In `frontend/src/types/index.ts`:
- `LegacyUserData`, `OldPaginationState`

### Dead Styled Components
| File | Component | Reason |
|------|-----------|--------|
| `Header/index.tsx` | `ThemeToggle` | Dark mode removed |
| `UserDetails/index.tsx` | `PermissionBadge` (commented out) | Permissions feature dropped |

---

## 6. Old-Style Redux (no Redux Toolkit)

**Files:** `frontend/src/redux/`

- Uses deprecated `createStore` (Redux Toolkit's `configureStore` is the current standard)
- Action types are plain string constants instead of typed constants or `createAction`
- Reducers use `switch/case` instead of `createReducer` with Immer
- `connect()` HOC used instead of `useSelector` / `useDispatch` hooks
- `mapStateToProps` receives untyped `any` state
- No `mapDispatchToProps` — raw `dispatch` is passed as a prop

---

## 7. Mixed Class and Functional Components

**Class components:**
- `UserManagementPage` — God component
- `UserList` — thin wrapper with dead lifecycle logic
- `UserForm` — callback hell + deprecated `componentWillReceiveProps`
- `UserDetails` — dead state and methods
- `LegacyUserTable` — entire dead component

**Functional components:**
- `App`, `Header`, `UserCard`, `UserStats`, `Notification`

---

## 8. Deprecated React 16 APIs

| API | File | Issue |
|-----|------|-------|
| `ReactDOM.render` | `src/index.tsx` | Replaced by `createRoot` in React 18 |
| `componentWillReceiveProps` | `UserForm/index.tsx` | Deprecated since React 16.3; causes bugs during concurrent rendering |
| `createStore` | `redux/store.ts` | Marked deprecated in Redux 4.2+ |

---

## 9. Mixed CSS-in-JS and Inline Styles

**Files:** `UserManagementPage/index.tsx`, `UserCard/index.tsx`, `UserDetails/index.tsx`

- `UserManagementPage` defines all styled-components inline in the same file as 500 lines of logic — no separation of concerns
- `UserCard` creates a `cardBaseStyle` plain object on every render and spreads it into a `style` prop, then also applies a `styled-components` component — two styling systems for the same element
- `UserManagementPage` uses both `<div style={{ ... }}>` inline objects and styled-components in the same render method

---

## 10. Duplicate State / Double Source of Truth

**File:** `frontend/src/components/UserList/index.tsx`

`UserList` is wrapped with `connect()` and pulls `users` and `selectedUser` from Redux into `reduxUsers` / `reduxSelectedUser` props — but the parent (`UserManagementPage`) already passes the same data as direct props. Both sources exist simultaneously.

---

## 11. Side Effects in `componentDidUpdate`

**File:** `frontend/src/components/UserManagementPage/index.tsx`

Error-notification logic (setting a `setTimeout` to clear the error) is in `componentDidUpdate`, which runs after every re-render. A missed dependency check means it could fire multiple times. Should live in a custom hook or middleware.

---

## 12. No Async Middleware

**File:** `frontend/src/redux/store.ts`

All API calls are fired directly inside class component methods and results are dispatched manually. There is no `redux-thunk`, `redux-saga`, or similar middleware. Async side effects should be centralised, not scattered across components.

---

## 13. `console.log` in Production Code

**File:** `frontend/src/components/UserForm/index.tsx` — `logSubmission` function

```js
console.log('[UserForm] Submitting payload:', payload);
```

Left in as part of the callback-hell chain. Should be removed or replaced with a proper logger.

---

## Summary Table

| # | Practice | Primary Location |
|---|----------|-----------------|
| 1 | God Component | `UserManagementPage/index.tsx` |
| 2 | Callback Hell | `UserForm/index.tsx` |
| 3 | Hooks inside component | `UserStats/index.tsx` |
| 4 | Pervasive `any` types | `types/index.ts`, all components |
| 5 | Dead code | Throughout entire codebase |
| 6 | Old-style Redux | `redux/` |
| 7 | Mixed class/functional | All components |
| 8 | Deprecated React 16 APIs | `index.tsx`, `UserForm/index.tsx` |
| 9 | Mixed CSS-in-JS + inline styles | `UserManagementPage`, `UserCard` |
| 10 | Double source of truth | `UserList/index.tsx` |
| 11 | Side effects in componentDidUpdate | `UserManagementPage/index.tsx` |
| 12 | No async middleware | `redux/store.ts` |
| 13 | `console.log` in production | `UserForm/index.tsx` |
