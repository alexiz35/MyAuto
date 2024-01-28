import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'

import thunk from 'redux-thunk'
import { initialState, rootOldReducer } from './redusers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'
import logger from 'redux-logger'
import { rootReducer } from './redusers_old'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
  /* stateReconciler: hardSet */
}
/* const rootReducer = combineReducers({
  rootOldReducer

}) */
// ------------------------------- devTool -----------------------------------------------
/* const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
) */
// ---------------------------------------------------------------
/* const rootReducer = combineReducers<MilesState>({
  currentMiles: milesReducer
}) */
// @ts-expect-error type reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
// ------------------------------- DevTool -----------------------------
/* const store = createStore(persistedReducer, initialState, enhancer) */
// ---------------------------------------------------------------------

/* const store = createStore(persistedReducer, initialState, applyMiddleware(thunk)) */

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      // Pass in a custom `extra` argument to the thunk middleware
      thunk: {
        extraArgument: {}
      },
      // Customize the built-in serializability dev check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })/* .concat(customMiddleware, api.middleware) */
    // Conditionally add another middleware in dev
    /*   if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger)
    } */
    return middleware
  }
  // Turn off devtools in prod, or pass options in dev
  /* devTools: process.env.NODE_ENV === 'production'
    ? false
    : {
        stateSanitizer: stateSanitizerForDevtools
      } */
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }

/* export const store: Store<CurrentMiles, ActionMiles> & {
  dispatch: DispatchMiles
} = createStore(combineReducers) */
