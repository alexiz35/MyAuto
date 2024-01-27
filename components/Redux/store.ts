import { applyMiddleware, legacy_createStore as createStore } from 'redux'

import thunk from 'redux-thunk'
import { initialState, milesReducer } from './redusers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
  /* stateReconciler: hardSet */
}
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
const persistedReducer = persistReducer(persistConfig, milesReducer)
// ------------------------------- DevTool -----------------------------
/* const store = createStore(persistedReducer, initialState, enhancer) */
// ---------------------------------------------------------------------
// @ts-expect-error initial

const store = createStore(persistedReducer, initialState, applyMiddleware(thunk))
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }

/* export const store: Store<CurrentMiles, ActionMiles> & {
  dispatch: DispatchMiles
} = createStore(combineReducers) */
