# Dead Code Audit

**Scope:** `frontend/src/` and `bff/src/`

---

### Unused Exports

**`frontend/src/redux/actions/authActions.ts`** — entire file is dead. Auth was removed but the file was never deleted. All 12 exports (`LOGIN_REQUEST`, `LOGIN_SUCCESS`, `LOGIN_FAILURE`, `LOGOUT`, `REFRESH_TOKEN`, `SET_CURRENT_USER` and the corresponding action creator functions) are unreferenced anywhere.

**`frontend/src/redux/actions/userActions.ts`** — 6 dead exports: constants `RESET_ALL`, `TOGGLE_ADMIN_MODE`, `BULK_UPDATE_USERS` and action creators `resetAll`, `toggleAdminMode`, `bulkUpdateUsers`. Never imported or dispatched.

**`frontend/src/api/userApi.ts`** — 4 dead exports: `fetchUserById`, `fetchUserStats`, `fetchUsersByDepartment`, `bulkDeleteUsers`. None are imported anywhere in the frontend.

**`frontend/src/utils/helpers.ts`** — 6 dead exports: `flattenUserObject`, `chunkArray`, `convertUsersToCSV`, `validatePhone`, `paginateArray`, `decodeJwt`. Each is self-labeled dead in a comment and confirmed by grep.

**`frontend/src/types/index.ts`** — 2 dead interfaces: `LegacyUserData`, `OldPaginationState`.

---

### Commented-out Code

| File | Lines | Size | Description |
|---|---|---|---|
| `frontend/src/components/UserManagementPage/index.tsx` | 302 | 1 line | Polling interval setup (`setInterval(this.loadUsers, 30000)`) — polling removed |
| `frontend/src/components/Header/index.tsx` | 93–95 | 3 lines | Dark mode `<ThemeToggle>` JSX element |
| `frontend/src/components/UserDetails/index.tsx` | 208–213 | 6 lines | Permissions section — planned feature never built |
| `frontend/src/components/LegacyUserTable/index.tsx` | 7 | 1 line | `import Popover from 'some-removed-library'` |

---

### Dead Feature Flags

| Flag / variable | File | Hardcoded value |
|---|---|---|
| `isDarkMode` | `Header/index.tsx` line 80 | `false` |
| `darkMode` (Redux state) | `uiReducer.ts` line 10 | `false` |
| `theme` (Redux state) | `uiReducer.ts` line 11 | `'default'` |
| `layoutType` (Redux state) | `uiReducer.ts` line 13 | `'grid'` |
| `bulkMode` (component state) | `UserManagementPage/index.tsx` line 294 | `false` |
| `sidebarCollapsed` (component state) | `UserManagementPage/index.tsx` line 296 | `false` |
| `unreadNotifications` (mapStateToProps) | `Header/index.tsx` line 103 | `0` hardcoded |
| `adminMode` (Redux state) | `userReducer.ts` line 36 | `false` |

---

### Zombie Components

| Component | File | Notes |
|---|---|---|
| `UserCard` | `frontend/src/components/UserCard/index.tsx` | Card/grid layout replaced by table in `UserManagementPage`. Zero imports. |
| `UserStats` | `frontend/src/components/UserStats/index.tsx` | Stats now rendered inline in `UserManagementPage.renderStats()`. Zero imports. |
| `UserList` | `frontend/src/components/UserList/index.tsx` | Absorbed by God component. Zero imports. Also contains 3 dead methods and 4 dead state fields. |
| `LegacyUserTable` | `frontend/src/components/LegacyUserTable/index.tsx` | Original table, replaced entirely. File header confirms "DEAD COMPONENT — this entire file is unreferenced." Zero imports. |
