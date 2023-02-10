import { applyMiddleware, legacy_createStore as createStore } from 'redux'

import thunk from 'redux-thunk'
import { initialState, milesReducer } from './redusers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import hardSet from 'redux-persist/es/stateReconciler/hardSet'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet
}

/* const rootReducer = combineReducers<MilesState>({
  currentMiles: milesReducer
}) */
// @ts-expect-error type reducer
const persistedReducer = persistReducer(persistConfig, milesReducer)
// @ts-expect-error initial
const store = createStore(persistedReducer, initialState, applyMiddleware(thunk))
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }

/* export const store: Store<CurrentMiles, ActionMiles> & {
  dispatch: DispatchMiles
} = createStore(combineReducers) */
