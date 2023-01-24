import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'

import thunk from 'redux-thunk'
import { DispatchMiles, StateMiles, StateCar } from '../../type'
import { milesReducer } from './redusers'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
  /* stateReconciler: autoMergeLevel2 */
}

const initialState: StateCar = {
  currentMiles: 100,
  tasks: [{
    id: 1,
    title: 'Oil',
    startKm: 200000,
    endKm: 250000,
    startDate: '25.01.22',
    endData: '25.01.22'
  }]
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
