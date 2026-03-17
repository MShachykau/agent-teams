// BAD: No shared axios instance, no interceptors, no base URL config
// BAD: All return types are Promise<any>

const BASE_URL = 'http://localhost:4000/api';

// BAD: Raw fetch with no error handling abstraction
export const fetchAllUsers = (): Promise<any> => {
  return fetch(`${BASE_URL}/users`)
    .then((res: any) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    });
};

export const fetchUserById = (id: any): Promise<any> => {
  return fetch(`${BASE_URL}/users/${id}`)
    .then((res: any) => res.json());
};

export const createUser = (userData: any): Promise<any> => {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then((res: any) => res.json());
};

export const updateUser = (id: any, userData: any): Promise<any> => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then((res: any) => res.json());
};

export const deleteUser = (id: any): Promise<any> => {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  }).then((res: any) => res.json());
};

export const fetchUserStats = (): Promise<any> => {
  return fetch(`${BASE_URL}/users/stats`)
    .then((res: any) => res.json());
};

// Dead function — was used when the app fetched users by department,
// that feature was removed but this was never cleaned up
export const fetchUsersByDepartment = (department: any): Promise<any> => {
  return fetch(`${BASE_URL}/users?department=${department}`)
    .then((res: any) => res.json());
};

// Dead function — bulk operations endpoint was never built on the BFF
export const bulkDeleteUsers = (ids: any[]): Promise<any> => {
  return fetch(`${BASE_URL}/users/bulk-delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  }).then((res: any) => res.json());
};
