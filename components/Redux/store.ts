import { applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import { rootOldReducer } from '../../oldFiles/redusers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'
import { createLogger } from 'redux-logger'
import { initialStateInfo, StateMain } from '../../type'
import tokenSlice from './TokenSlice'
import settingSlice from './SettingSlice'
import sellerSlice from './SellerSlice'
import numberCarSlice from './NumberCarSlice'
import carsSlice from './CarsSlice'
import hardSet from 'redux-persist/es/stateReconciler/hardSet'
import tireSlice from './TireSlice'

export const initialState: StateMain = {
  numberCar: 0,
  sellerList: [{
    name: 'maks',
    phone: '100'
  }, {
    name: 'rerere',
    phone: '2'
  }],
  tireList: [],
  token: '',
  setting: {
    themeSet: 'light',
    lang: '',
    alarmMileageStart: true,
    alarmMileagePeriod: true,
    alarmMileagePeriodNumber: 6,
    isGoogle: false
  },
  cars: [
    {
      info: initialStateInfo,
      carId: 0,
      tire: {
        id: Date.now(),
        valueTire: '',
        nameTire: '',
        yearTire: '',
        typeTire: 'all'
      },
      currentMiles: {
        currentMileage: 0,
        dateMileage: new Date()
      },
      fuel: [],
      services: [],
      mileage: [],
      parts: [],
      others: [],
      tasks: []
    }
  ]
}

const logger = createLogger({ colors: { action: () => 'red', title: () => 'yellow' } })

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
  /* stateReconciler: hardSet */
}

const rootReducer = combineReducers<StateMain>({
  setting: settingSlice, // ok
  token: tokenSlice, // настроить токен
  cars: carsSlice, //
  numberCar: numberCarSlice, //
  sellerList: sellerSlice, // ok
  tireList: tireSlice
})

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
const persistedReducer = persistReducer(persistConfig, rootReducer)
// ------------------------------- DevTool -----------------------------
/* const store = createStore(persistedReducer, initialState, enhancer) */
// ---------------------------------------------------------------------

/* const store = createStore(persistedReducer, initialState, applyMiddleware(thunk)) */

const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
  // @ts-expect-error: error name logger
  middleware: [thunk, logger]
  /* getDefaultMiddleware => {
    /const middleware =
     getDefaultMiddleware({
      // Pass in a custom `extra` argument to the thunk middleware
      thunk: {
        extraArgument: {}
      },
      // OFF serializability dev check
      serializableCheck: false,
      /!* immutableCheck:false *!/
      // Customize the built-in serializability dev check
      /!*  serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      } *!/
    })/!* .concat(customMiddleware, api.middleware) *!/
    // Conditionally add another middleware in dev
    /!*   if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger)
    } *!/
    return middleware
  }
  // Turn off devtools in prod, or pass options in dev
  /!* devTools: process.env.NODE_ENV === 'production'
    ? false
    : {
        stateSanitizer: stateSanitizerForDevtools
      } *!/ */
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }

/* export const store: Store<CurrentMiles, ActionMiles> & {
  dispatch: DispatchMiles
} = createStore(combineReducers) */
