# Dead Code Audit

Scope: `frontend/src/` and `bff/src/`

---

## Unused Exports

### frontend/src/api/userApi.ts

| Name | Export Type | Notes |
|------|-------------|-------|
| `fetchUsersByDepartment` | function | Department-filter feature was removed from UI; never imported anywhere |
| `bulkDeleteUsers` | function | Bulk-operations endpoint was never built on the BFF; never imported anywhere |
| `fetchUserStats` | function | Exported but never imported anywhere in the frontend codebase |

### frontend/src/utils/helpers.ts

| Name | Export Type | Notes |
|------|-------------|-------|
| `flattenUserObject` | function | Was used in old LegacyUserTable; never imported anywhere now |
| `chunkArray` | function | Bulk operations were never built; never imported anywhere |
| `convertUsersToCSV` | function | CSV export feature removed from UI; never imported anywhere |
| `validatePhone` | function | Validation moved inline into UserForm; never imported anywhere |
| `paginateArray` | function | Leftover from old paginated table; never imported anywhere |
| `decodeJwt` | function | Auth feature was removed; never imported anywhere |

### frontend/src/redux/actions/authActions.ts (entire file is dead)

The file comment states "DEAD FILE — authentication was removed from this panel". All exports are unreferenced across the entire codebase:

| Name | Export Type |
|------|-------------|
| `LOGIN_REQUEST` | const |
| `LOGIN_SUCCESS` | const |
| `LOGIN_FAILURE` | const |
| `LOGOUT` | const |
| `REFRESH_TOKEN` | const |
| `SET_CURRENT_USER` | const |
| `loginRequest` | function |
| `loginSuccess` | function |
| `loginFailure` | function |
| `logout` | function |
| `refreshToken` | function |
| `setCurrentUser` | function |

### frontend/src/redux/actions/userActions.ts

| Name | Export Type | Notes |
|------|-------------|-------|
| `RESET_ALL` | const | Never dispatched anywhere in the app |
| `TOGGLE_ADMIN_MODE` | const | Never dispatched anywhere in the app |
| `BULK_UPDATE_USERS` | const | Was planned, never built |
| `resetAll` | function | Never called anywhere |
| `toggleAdminMode` | function | Never called anywhere |
| `bulkUpdateUsers` | function | Never called anywhere |

### frontend/src/types/index.ts

| Name | Export Type | Notes |
|------|-------------|-------|
| `LegacyUserData` | interface | Comment: "was used in a legacy implementation, never cleaned up" |
| `OldPaginationState` | interface | Comment: "leftover from an old pagination attempt" |

---

## Commented-out Code

| File | Line Range | Approximate Size | Description |
|------|-----------|-----------------|-------------|
| `frontend/src/components/Header/index.tsx` | 93-95 | 3 lines | Dark-mode ThemeToggle button JSX removed from render but styled component `ThemeToggle` kept in the file above |
| `frontend/src/components/UserDetails/index.tsx` | 207-213 | 7 lines | Permissions section with `PermissionBadge` map — feature was planned, never built |
| `frontend/src/components/UserManagementPage/index.tsx` | 302 | 1 line | Polling interval setup `this.pollingInterval = setInterval(this.loadUsers, 30000)` — polling was removed |
| `frontend/src/components/LegacyUserTable/index.tsx` | 7 | 1 line | Dead import comment `// import Popover from 'some-removed-library'` — deleted popover feature |

---

## Dead Feature Flags

| Flag / State Field | File | Hardcoded Value | Notes |
|-------------------|------|-----------------|-------|
| `isDarkMode` | `frontend/src/components/Header/index.tsx` line 80 | `false` | Hardcoded local variable; toggle UI was removed; variable is never used in render |
| `darkMode` (reducer state) | `frontend/src/redux/reducers/uiReducer.ts` line 10 | initial `false` | Dark mode was a planned feature; `TOGGLE_DARK_MODE` action is never dispatched from any UI |
| `theme` (reducer state) | `frontend/src/redux/reducers/uiReducer.ts` line 11 | initial `'default'` | `SET_THEME` action is never dispatched from any UI |
| `layoutType` (reducer state) | `frontend/src/redux/reducers/uiReducer.ts` line 13 | initial `'grid'` | From old layout that was replaced; no code reads or changes this value |
| `bulkMode` (component state) | `frontend/src/components/UserManagementPage/index.tsx` line 294 | initial `false` | Bulk operations were removed; field is initialised but never toggled or read in render |
| `sidebarCollapsed` (component state) | `frontend/src/components/UserManagementPage/index.tsx` line 296 | initial `false` | Never toggled or read in render |
| `adminMode` (reducer state) | `frontend/src/redux/reducers/userReducer.ts` line 36 | initial `false` | `TOGGLE_ADMIN_MODE` exists but is never dispatched and never handled in the reducer switch |
| `unreadNotifications` (mapStateToProps) | `frontend/src/components/Header/index.tsx` line 103 | always `0` | Hardcoded to `0`; prop is declared in the interface but never consumed in component body |

---

## Zombie Components

Components that are defined and exported but never imported or rendered anywhere in the codebase:

| Component Name | File Path | Notes |
|---------------|-----------|-------|
| `LegacyUserTable` | `frontend/src/components/LegacyUserTable/index.tsx` | Entire file is dead — original table before UserManagementPage absorbed all rendering logic. File comment confirms: "DEAD COMPONENT — this entire file is unreferenced anywhere in the app." |
| `UserCard` | `frontend/src/components/UserCard/index.tsx` | Grid/card layout was removed in favour of the table; no import of this component exists anywhere in the codebase |
| `UserStats` | `frontend/src/components/UserStats/index.tsx` | Exported but never imported anywhere; UserManagementPage renders its own inline stats via `renderStats()` instead |
| `UserList` | `frontend/src/components/UserList/index.tsx` | No import of this component exists anywhere; UserManagementPage renders its own inline table directly |

---

## Additional Dead Code Within Active Files

Dead methods, state fields, and props found inside files that are themselves active.

### frontend/src/components/UserDetails/index.tsx
- `State.notesExpanded` — planned "notes" section never built; field is set but never read in render
- `State.activeTab` — only one tab ever existed; initialised to `'info'` but never changed or used in render
- `handleTabSwitch()` method — defined but never called from JSX
- `toggleNotes()` method — defined but never wired to any UI element

### frontend/src/components/UserList/index.tsx
- `State.localSearch`, `State.localRoleFilter` — filtering moved to parent; `componentDidUpdate` still syncs these but they are never read in render
- `State.inlineEditId`, `State.inlineEditData` — inline editing removed; `startInlineEdit`, `cancelInlineEdit`, `saveInlineEdit` methods are dead
- Props `filter` and `onFilterChange` — declared in the interface but never passed by any parent and never consumed

### frontend/src/components/UserManagementPage/index.tsx
- `pollingInterval` instance variable — polling removed; the `componentWillUnmount` cleanup check is always a no-op (value is always `null`)
- `handleBulkDelete()` method (lines 464-468) — bulk operations removed from UI; never called from JSX
- `handleExportCSV()` method (lines 471-473) — CSV export button removed from UI; never called from JSX
- `State.bulkSelected` array — bulk mode removed; never populated or consumed

### frontend/src/redux/reducers/userReducer.ts
- State fields `currentPage`, `pageSize` — pagination was scrapped; never read by any component
- State field `totalCount` — written on `FETCH_USERS_SUCCESS` but never read by any component
- State field `bulkSelectedIds` — bulk feature scrapped; never read or written after initial value
- State field `adminMode` — always `false`; `TOGGLE_ADMIN_MODE` action is never dispatched and not handled in the switch statement

### frontend/src/redux/reducers/uiReducer.ts
- Cases `TOGGLE_DARK_MODE` and `SET_THEME` — these actions are never dispatched from any UI component

### frontend/src/components/Header/index.tsx
- `ThemeToggle` styled component (lines 60-68) — defined but never used in JSX (the JSX block using it is commented out)
