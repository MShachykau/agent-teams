// BAD: Mixed bag of utilities — formatting, validation, and side effects
// in one file with no organisation

// ---- Active helpers ----

export const formatFullName = (firstName: any, lastName: any): string => {
  return `${firstName} ${lastName}`;
};

export const getRoleBadgeColor = (role: any): string => {
  const colors: any = {
    admin: '#e74c3c',
    manager: '#f39c12',
    user: '#3498db',
    guest: '#95a5a6',
  };
  return colors[role] || '#bdc3c7';
};

export const getStatusBadgeColor = (status: any): string => {
  const colors: any = {
    active: '#27ae60',
    inactive: '#95a5a6',
    suspended: '#e74c3c',
  };
  return colors[status] || '#bdc3c7';
};

export const formatDate = (date: any): string => {
  if (!date) return 'Never';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// ---- Dead helpers (never imported anywhere) ----

// Dead — was used in the old LegacyUserTable
export const flattenUserObject = (user: any): any => {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    roleLabel: user.role ? user.role.toUpperCase() : 'UNKNOWN',
    statusLabel: user.status ? user.status.toUpperCase() : 'UNKNOWN',
    ...user.metadata,
  };
};

// Dead — bulk operations were never built
export const chunkArray = (arr: any[], size: number): any[][] => {
  const chunks: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// Dead — old CSV export feature, removed from UI but kept here
export const convertUsersToCSV = (users: any[]): string => {
  const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Status'];
  const rows = users.map((u: any) =>
    [u.id, u.firstName, u.lastName, u.email, u.role, u.status].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
};

// Dead — was used to validate phone numbers inline before callback hell was
// introduced; now validation is duplicated inside UserForm
export const validatePhone = (phone: any): boolean => {
  return /^\+?[\d\s\-().]{7,}$/.test(String(phone));
};

// Dead — pagination helper from the old paginated table
export const paginateArray = (arr: any[], page: number, size: number): any[] => {
  const start = (page - 1) * size;
  return arr.slice(start, start + size);
};

// Dead — leftover from auth feature that was removed
export const decodeJwt = (token: any): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (e) {
    return null;
  }
};
