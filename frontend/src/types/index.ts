// BAD: Most fields typed as 'any' instead of proper union types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: any;        // should be: 'admin' | 'manager' | 'user' | 'guest'
  status: any;      // should be: 'active' | 'inactive' | 'suspended'
  department: any;  // should be: string
  createdAt: any;   // should be: Date | string
  lastLogin: any;   // should be: Date | string | null
  phone: any;       // should be: string
  permissions: any[]; // should be: Permission[]
  metadata: any;    // catch-all bucket — a red flag
}

// BAD: Generic response type loses all type safety downstream
export type ApiResponse = {
  data: any;
  error: any;
  status: any;
};

// BAD: Redux state typed with any — defeats the purpose of TypeScript
export interface RootState {
  users: any;
  ui: any;
}

// BAD: Action typed with any payload — no inference possible
export interface ReduxAction {
  type: string;
  payload: any;
}

// Dead type — was used in a legacy implementation, never cleaned up
export interface LegacyUserData {
  user_id: any;
  user_data: any;
  extra_info: any;
  legacy_flags: any;
}

// Dead type — leftover from an old pagination attempt
export interface OldPaginationState {
  page: any;
  pageSize: any;
  totalPages: any;
  hasNext: any;
}

// BAD: Overly broad error type
export type AppError = any;

export interface UserFormState {
  firstName: any;
  lastName: any;
  email: any;
  role: any;
  status: any;
  department: any;
  phone: any;
}

// BAD: filter typed with any
export interface UserFilter {
  search: any;
  role: any;
  status: any;
  sortBy: any;
  sortDirection: any;
}
