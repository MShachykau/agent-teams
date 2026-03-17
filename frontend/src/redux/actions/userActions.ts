// BAD: Plain string constants instead of a typed enum or const object
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const SELECT_USER = 'SELECT_USER';
export const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Dead constants — never referenced anywhere in the app
export const RESET_ALL = 'RESET_ALL';
export const TOGGLE_ADMIN_MODE = 'TOGGLE_ADMIN_MODE';
export const BULK_UPDATE_USERS = 'BULK_UPDATE_USERS'; // was planned, never built

// BAD: Action creators accept 'any' — no type safety on payload
export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });

export const fetchUsersSuccess = (users: any) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: any) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const createUserSuccess = (user: any) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = (error: any) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const updateUserSuccess = (user: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error: any) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const deleteUserSuccess = (id: any) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

export const deleteUserFailure = (error: any) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const selectUser = (user: any) => ({
  type: SELECT_USER,
  payload: user,
});

export const clearSelectedUser = () => ({ type: CLEAR_SELECTED_USER });

export const setFilter = (filter: any) => ({
  type: SET_FILTER,
  payload: filter,
});

export const clearError = () => ({ type: CLEAR_ERROR });

// Dead action creators — constants exist but these were never wired up
export const resetAll = () => ({ type: RESET_ALL });
export const toggleAdminMode = () => ({ type: TOGGLE_ADMIN_MODE });
export const bulkUpdateUsers = (users: any[]) => ({
  type: BULK_UPDATE_USERS,
  payload: users,
});
