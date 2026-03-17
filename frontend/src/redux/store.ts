import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

// BAD: Using deprecated createStore (Redux Toolkit is the modern approach)
// BAD: No middleware for async (thunk/saga) — side effects done in components
// BAD: Dev tools wired with any-cast
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware())
);

export default store;
