# Pattern Audit Report

Auditor: pattern-detective
Scope: frontend/src/ directory
Date: 2026-03-17

---

## Explicit `any` Casts

### frontend/src/types/index.ts
- Line 7: `role: any` — should be `'admin' | 'manager' | 'user' | 'guest'`
- Line 8: `status: any` — should be `'active' | 'inactive' | 'suspended'`
- Line 9: `department: any` — should be `string`
- Line 10: `createdAt: any` — should be `Date | string`
- Line 11: `lastLogin: any` — should be `Date | string | null`
- Line 12: `phone: any` — should be `string`
- Line 13: `permissions: any[]` — should be typed array
- Line 14: `metadata: any` — catch-all bucket
- Line 19: `data: any` in `ApiResponse`
- Line 20: `error: any` in `ApiResponse`
- Line 21: `status: any` in `ApiResponse`
- Line 26: `users: any` in `RootState`
- Line 27: `ui: any` in `RootState`
- Line 31: `payload: any` in `ReduxAction`
- Line 53: `type AppError = any` — entire error type is any
- Lines 56-63: all fields in `UserFormState` typed as `any`
- Lines 67-71: all fields in `UserFilter` typed as `any`

### frontend/src/components/UserManagementPage/index.tsx
- Line 115: `({ variant }: any)` — styled-component prop destructuring as `any`
- Line 119: `({ variant }: any)` — repeated
- Line 152: `({ selected }: any)` — styled-component prop as `any`
- Line 153: `({ selected }: any)` — repeated
- Line 162: `({ color }: any)` — styled-component prop as `any`
- Lines 247-255: `Props` interface — `dispatch: any`, `users: any[]`, `selectedUser: any`, `error: any`, `filter: any`, `notification: any`
- Lines 259-273: `State` interface — `modalType: any`, `editingUser: any`, `deletingUser: any`, `localError: any`, `bulkSelected: any[]`
- Line 277: `tableRef: any = null`
- Line 279: `pollingInterval: any = null`
- Line 280: `notificationTimeout: any = null`
- Line 331: `(data: any)` in `.then()` callback in `loadUsers`
- Line 334: `(err: any)` in `.catch()` callback
- Line 343: `openEditModal = (user: any)`
- Line 348: `openDeleteModal = (user: any)`
- Line 356: `handleCreateUser = (userData: any)`
- Line 360: `(newUser: any)` in `.then()`
- Line 366: `(err: any)` in `.catch()`
- Line 371: `handleUpdateUser = (userData: any)`
- Line 375: `(updatedUser: any)` in `.then()`
- Line 381: `(err: any)` in `.catch()`
- Line 401: `(err: any)` in `.catch()`
- Line 406: `showNotification = (message: any, type: any)`
- Line 413: `handleRowClick = (user: any)`
- Line 432: return type `any[]` on `getFilteredAndSortedUsers`
- Line 436: `(u: any)` in filter callback
- Lines 448-449: `(a: any, b: any)` in sort callback; `let valA: any`, `let valB: any`
- Line 477: `(u: any)` in filter callbacks (x4 in renderStats)
- Line 520: `ref={(ref: any) => { this.tableRef = ref; }}`
- Line 533: `(user: any)` in map callback
- Line 549: `(e: any)` in event handler
- Line 578: `(e: any) => e.stopPropagation()`
- Lines 658-662: `(e: any)` event handlers in onChange (x2)
- Line 705: `mapStateToProps = (state: any)`

### frontend/src/components/UserForm/index.tsx
- Line 70: `({ primary }: any)` — styled-component prop as `any`
- Lines 77-81: `Props` — `user?: any`, `onSubmit: any`, `onCancel: any`, `loading?: any`
- Line 92: `errors: any` in `State`
- Line 97: `validateField(fieldName: any, value: any, callback: any)` — all params `any`
- Line 107: `validateEmail(email: any, callback: any)`
- Line 118: `sanitizeInput(data: any, callback: any)`; `sanitized: any`
- Line 121: `(key: any)` in `Object.keys().forEach()`
- Line 128: `formatPayload(data: any, isEdit: any, callback: any)`; `payload: any`
- Line 140: `logSubmission(payload: any, callback: any)`
- Line 192: `(e: any)` in event handler
- Line 193: `{ [field]: e.target.value } as any`
- Line 201: `(e: any)` in `handleSubmit`
- Lines 210-262: all callback error/data parameters typed as `any` (`err1`, `err2`, `err3`, `sanitizeErr`, `sanitizedData`, `formatErr`, `payload`, `logErr`, `finalPayload`)

### frontend/src/components/UserList/index.tsx
- Line 21: `({ active }: any)` — styled-component prop as `any`
- Line 22: `({ active }: any)` — repeated
- Line 29: `({ color }: any)` — styled-component prop as `any`
- Lines 67-73: `Props` — `users: any[]`, `selectedUser: any`, `onSelect: any`, `filter?: any`, `onFilterChange?: any`
- Lines 80-82: `State` — `inlineEditId: any`, `inlineEditData: any`
- Line 104: `getInitials = (user: any)`
- Line 109: `startInlineEdit = (user: any)`
- Line 139: `(user: any)` in map callback
- Line 162: `mapStateToProps = (state: any)`

### frontend/src/components/UserDetails/index.tsx
- Line 26: `({ color }: any)` — styled-component prop as `any`
- Line 57: `({ color }: any)` — repeated
- Lines 107-110: `Btn` styled component — `({ danger }: any)` (x3 interpolations)
- Lines 127-131: `Props` — `user: any`, `onEdit: any`, `onDelete: any`, `onClose: any`
- Line 147: `getInitials = (user: any)`
- Line 152: `handleTabSwitch = (tab: any)`

### frontend/src/components/UserCard/index.tsx
- Line 22: `({ selected }: any)` — styled-component prop as `any`
- Line 40: `({ bg }: any)` — styled-component prop as `any`
- Line 76: `({ color }: any)` — styled-component prop as `any`
- Lines 100-106: `Props` — `user: any`, `selected?: any`, `onClick?: any`, `onEdit?: any`, `onDelete?: any`
- Line 134: `(e: any)` event handler
- Line 137: `(e: any)` event handler

### frontend/src/components/UserStats/index.tsx
- Line 27: `({ color }: any)` — styled-component prop as `any`
- Line 46: `({ width }: any)`, `({ color }: any)` — styled-component props as `any`
- Line 55: `users: any[]` in `Props`
- Line 66: `userList: any[]` parameter
- Lines 67-68: `useState<any>(null)` (x2)
- Lines 72-78: `(u: any)` in filter callbacks (x6 occurrences)
- Line 98: `userList: any[]` parameter
- Line 102: `(role: any)` in map callback
- Line 119: `roleColors: any`

### frontend/src/components/Header/index.tsx
- Line 71: `totalUsers: any` in `Props`
- Line 74: `unreadNotifications?: any` in `Props`
- Line 101: `mapStateToProps = (state: any)`

### frontend/src/components/Notification/index.tsx
- Lines 17-28: `({ type }: any)` — styled-component prop as `any` (x3 interpolations in `Banner`)
- Lines 33-35: `Props` — `message: any`, `type?: any`

### frontend/src/api/userApi.ts
- Line 7: `fetchAllUsers(): Promise<any>`; `(res: any)` in callback
- Line 17: `fetchUserById(id: any): Promise<any>`; `(res: any)`
- Line 22: `createUser(userData: any): Promise<any>`; `(res: any)`
- Line 30: `updateUser(id: any, userData: any): Promise<any>`; `(res: any)`
- Line 38: `deleteUser(id: any): Promise<any>`; `(res: any)`
- Line 44: `fetchUserStats(): Promise<any>`; `(res: any)`
- Line 51: `fetchUsersByDepartment(department: any): Promise<any>`; `(res: any)`
- Line 57: `bulkDeleteUsers(ids: any[]): Promise<any>`; `(res: any)`

### frontend/src/utils/helpers.ts
- Line 6: `formatFullName(firstName: any, lastName: any)`
- Line 10: `getRoleBadgeColor(role: any)`; `colors: any`
- Line 20: `getStatusBadgeColor(status: any)`; `colors: any`
- Line 29: `formatDate(date: any)`
- Line 41: `flattenUserObject(user: any): any`
- Line 53: `chunkArray(arr: any[], size: number): any[][]`
- Line 62: `convertUsersToCSV(users: any[])`; `(u: any)` in map
- Line 72: `validatePhone(phone: any)`
- Line 77: `paginateArray(arr: any[], page: number, size: number): any[]`
- Line 83: `decodeJwt(token: any): any`

### frontend/src/redux/actions/userActions.ts
- All action creators accept `any` payload: lines 31, 36, 41, 46, 51, 56, 61, 66, 71, 78, 88

### frontend/src/redux/reducers/userReducer.ts
- Line 18: `initialState: any`
- Line 40: `action: any`; return type `any`
- Lines 82, 98: `(u: any)` in map/filter callbacks

### frontend/src/redux/reducers/uiReducer.ts
- Line 4: `initialState: any`
- Line 16: `action: any`; return type `any`

### frontend/src/redux/actions/authActions.ts
- All action creators accept `any` payload: lines 11, 16, 21, 28, 33

---

## Callback Hell

### frontend/src/components/UserForm/index.tsx — lines 201-263
**Nesting depth: 6 levels**

The `handleSubmit` method chains six sequential callback-based operations instead of a Promise chain or async/await:

```
Level 1 (line 210): validateField('First name', firstName, (err1) => {
  Level 2 (line 217): validateField('Last name', lastName, (err2) => {
    Level 3 (line 224): validateEmail(email, (err3) => {
      Level 4 (line 231): sanitizeInput(formData, (sanitizeErr, sanitizedData) => {
        Level 5 (line 238): formatPayload(sanitizedData, !!user, (formatErr, payload) => {
          Level 6 (line 245): logSubmission(payload, (logErr, finalPayload) => {
            // actual submission at line 251
          });
        });
      });
    });
  });
});
```

Each helper function (`validateField`, `validateEmail`, `sanitizeInput`, `formatPayload`, `logSubmission`) uses `setTimeout(() => ..., 0)` to simulate async behaviour. This makes the flow impossible to cancel, difficult to test, and impossible to type properly without rewriting.

---

## God Components

### UserManagementPage
- **File:** `frontend/src/components/UserManagementPage/index.tsx`
- **Line count:** 716 lines
- **Concerns mixed in one class:**
  1. **Redux state management** — dispatches actions directly, owns its own `localLoading` and `localError` state alongside Redux state; the file's own comment states "This should be split into at least 5 separate concerns"
  2. **API calls** — calls `fetchAllUsers`, `createUser`, `updateUser`, `deleteUser` directly without a middleware/thunk layer
  3. **Business logic** — filtering, sorting, and search implemented inline in `getFilteredAndSortedUsers()` (lines 432-461) instead of a selector
  4. **Layout and styling** — 25+ styled-components defined alongside all the above logic (lines 33-245)
  5. **Modal orchestration** — manages open/close/type state for create, edit, and delete modals
  6. **Notification management** — manually dispatches raw `'SET_NOTIFICATION'`/`'CLEAR_NOTIFICATION'` string literals and manages `notificationTimeout` ref
  7. **Stats rendering** — `renderStats()` at line 475 computes and renders live statistics inline instead of delegating to `UserStats`
  8. **Table rendering** — `renderTable()` at line 508 contains full table markup with sort-arrow logic
  9. **Lifecycle side effects** — `componentDidUpdate` handles error auto-clear via `setTimeout`; `componentWillUnmount` cleans up timers

---

## Repeated Logic

### Pattern 1: `Badge` styled-component defined identically in 4 files
A pill-shaped badge (coloured background, white text, `text-transform: capitalize`) is independently redefined in:

1. `frontend/src/components/UserManagementPage/index.tsx` — lines 156-165
2. `frontend/src/components/UserList/index.tsx` — lines 56-64
3. `frontend/src/components/UserDetails/index.tsx` — lines 52-60
4. `frontend/src/components/UserCard/index.tsx` — lines 71-79

A single shared `Badge` component in a `ui/` directory would eliminate all four copies.

### Pattern 2: `Avatar` styled-component defined in 3 files
A circular avatar div (rounded, coloured background, white centred initials text) is independently defined in:

1. `frontend/src/components/UserList/index.tsx` — lines 25-37 (`color` prop, 36x36)
2. `frontend/src/components/UserDetails/index.tsx` — lines 22-33 (`color` prop, 72x72)
3. `frontend/src/components/UserCard/index.tsx` — lines 36-48 (`bg` prop, 48x48)

The prop name differs (`color` vs `bg`) but the pattern and intent are identical.

### Pattern 3: `getInitials` logic duplicated in 3 components
The same initials-extraction logic (first char of first name + first char of last name, uppercased) appears independently in:

1. `frontend/src/components/UserList/index.tsx` — line 104-106: no null guard — will throw if `firstName` is undefined
2. `frontend/src/components/UserDetails/index.tsx` — line 147-149: guards with `|| '?'`
3. `frontend/src/components/UserCard/index.tsx` — line 110: guards with `|| '?'` using index notation

The inconsistent null-safety across copies is itself a bug risk. A shared `getInitials(user)` utility in `helpers.ts` would unify this.

### Pattern 4: User status/role count computation duplicated in 2 components
The pattern of filtering the `users` array to count members by `status` or `role` appears independently in:

1. `frontend/src/components/UserManagementPage/index.tsx` — lines 477-480 (`renderStats`): four separate `.filter()` calls
2. `frontend/src/components/UserStats/index.tsx` — lines 72-78 (inside `useEffect`): six separate `.filter()` calls

Both recompute from scratch on every render cycle with no memoization. A shared `computeUserStats(users)` utility or a `reselect` selector would remove the duplication.

### Pattern 5: `mapStateToProps = (state: any) => ...` repeated in 3 files
The untyped `mapStateToProps` pattern accessing `state.users.*` without null-safety appears in:

1. `frontend/src/components/UserManagementPage/index.tsx` — line 705
2. `frontend/src/components/UserList/index.tsx` — line 162
3. `frontend/src/components/Header/index.tsx` — line 101

A typed `RootState` used in all three would catch breaking state shape changes at compile time.

### Pattern 6: `fetch(url).then((res: any) => res.json())` repeated 7 times in api/userApi.ts
The same fetch-then-json pattern with no error handling is copy-pasted across all seven functions in `frontend/src/api/userApi.ts` (lines 9-13, 18-19, 26-28, 32-35, 39-41, 45-46, 52-53, 57-62). A shared `apiFetch` helper with centralised error handling would consolidate these.
