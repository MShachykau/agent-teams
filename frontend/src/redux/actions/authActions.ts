// DEAD FILE — authentication was removed from this panel
// but the file was never deleted. All actions below are unreferenced.

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginRequest = (credentials: any) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (userData: any) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

export const refreshToken = (token: any) => ({
  type: REFRESH_TOKEN,
  payload: token,
});

export const setCurrentUser = (user: any) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
