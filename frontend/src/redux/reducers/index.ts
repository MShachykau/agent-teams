import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { uiReducer } from './uiReducer';

// BAD: Root state not typed — RootState from types/index.ts uses 'any'
const rootReducer = combineReducers({
  users: userReducer,
  ui: uiReducer,
});

export default rootReducer;
