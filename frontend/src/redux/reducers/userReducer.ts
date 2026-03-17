import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SELECT_USER,
  CLEAR_SELECTED_USER,
  SET_FILTER,
  CLEAR_ERROR,
} from '../actions/userActions';

// BAD: Initial state typed as 'any' — no IntelliSense or type checking
const initialState: any = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  filter: {
    search: '',
    role: 'all',
    status: 'all',
    sortBy: 'lastName',
    sortDirection: 'asc',
  },
  // Dead field — was used for pagination, now unused
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  // Dead field — leftover from a feature that was scrapped
  bulkSelectedIds: [],
  adminMode: false,
};

// BAD: Reducer takes 'any' action type — no exhaustive checking
export const userReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USERS_SUCCESS:
      // BAD: Direct mutation check missed — spread is correct but
      // a future dev might accidentally mutate here
      return {
        ...state,
        loading: false,
        users: action.payload,
        totalCount: action.payload.length,
        error: null,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        // BAD: swallowing the whole error object into state as-is
        error: action.payload,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        // BAD: duplicating the entire array just to add one element
        users: [...state.users, action.payload],
        error: null,
      };

    case CREATE_USER_FAILURE:
      return { ...state, error: action.payload };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((u: any) =>
          u.id === action.payload.id ? action.payload : u
        ),
        selectedUser:
          state.selectedUser && state.selectedUser.id === action.payload.id
            ? action.payload
            : state.selectedUser,
        error: null,
      };

    case UPDATE_USER_FAILURE:
      return { ...state, error: action.payload };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((u: any) => u.id !== action.payload),
        selectedUser:
          state.selectedUser && state.selectedUser.id === action.payload
            ? null
            : state.selectedUser,
      };

    case DELETE_USER_FAILURE:
      return { ...state, error: action.payload };

    case SELECT_USER:
      return { ...state, selectedUser: action.payload };

    case CLEAR_SELECTED_USER:
      return { ...state, selectedUser: null };

    case SET_FILTER:
      // BAD: replacing entire filter object — could just merge
      return { ...state, filter: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    // Dead cases — RESET_ALL and TOGGLE_ADMIN_MODE constants exist
    // in actions but are handled nowhere in the actual app flow
    default:
      return state;
  }
};
