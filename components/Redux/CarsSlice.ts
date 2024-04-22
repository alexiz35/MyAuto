// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CurrentMiles, getIndexCar,
  initialStateInfo, initialTire,
  StateCar,
  StateFuel,
  StateInfo,
  StateOther,
  StatePart,
  StateService,
  StateTask, StateTire
} from '../../type'

export const initialStateCar: StateCar[] = [
  {
    info: initialStateInfo, // ok
    carId: 0,
    tire: initialTire,
    isConsumption: false,
    currentMiles: {
      currentMileage: 0,
      dateMileage: new Date()
    }, // ok
    fuel: [], // ok
    services: [],
    mileage: [], // ok
    parts: [], // ok
    others: [], // ok
    tasks: [] // ok
  }
]

type TypeStatesCar = StatePart | StateFuel | StateOther | StateTask | StateService
type TypeTypeState = 'fuel' | 'parts' | 'others' | 'tasks' | 'services'
/* const TYPE_REDUCER = {
  FUEL: 'fuel',
  PARTS: 'parts',
  OTHERS: 'others',
  TASKS: 'tasks',
  SERVICES: 'services'
} as const

type ObjectValues<T> = T[keyof T]
type TypeTypeState = ObjectValues<typeof TYPE_REDUCER> */

/* const editStateCar = (type: TypeTypeState, state: StateCar[], payload: { numberCar: number, item: TypeStatesCar }): StateCar[] => {
   const temp = state[payload.numberCar][type].filter(item => item.id !== payload.item.id)
  temp.push(payload.item)
  state[payload.numberCar][type] = temp
  return state
} */
/* const editStateCar2 = ( state: StateCar[], payload: { type:TypeTypeState,numberCar: number, item: TypeStatesCar }): StateCar[] => {
  const temp = state[payload.numberCar][payload.type].filter(item => item.id !== payload.item.id)
  temp.push(payload.item)
  state[payload.numberCar][payload.type] = temp
  return state
} */

const carsSlice = createSlice({
  name: 'cars',
  initialState: initialStateCar,
  reducers: {
    // --------------------------------------------------------------------------------------
    addedCar (state, action: PayloadAction<StateCar>) {
      /* const tempNewCar = initialStateCar[0]
      tempNewCar.carId = state.length */
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.push(action.payload)
    },
    deletedCar (state, action: PayloadAction<{ numberCar: number }>) {
      if (state.length === 1) return initialStateCar
      else return state.filter(item => item.carId !== action.payload.numberCar)
    },
    delNowCar (state) {
      return state.filter(item => item.info.nameCar !== '')
    },
    // --------------------------------------------------------------------------------------
    editedCarInfo (state, action: PayloadAction<{ numberCar: number, carInfo: StateInfo }>) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state[getIndexCar(state, action.payload.numberCar)].info = action.payload.carInfo
    },
    // --------------------------------------------------------------------------------------
    addedCurrentMiles (state, action: PayloadAction<{ numberCar: number, currentMiles: CurrentMiles }>) {
      const tempState = state[getIndexCar(state, action.payload.numberCar)]
      tempState.currentMiles = action.payload.currentMiles
      tempState.mileage.push(action.payload.currentMiles)
      state[getIndexCar(state, action.payload.numberCar)] = tempState
      return state
    },
    editedCurrentMiles (state, action: PayloadAction<{ numberCar: number, currentMiles: CurrentMiles }>) {
      const tempState = state[getIndexCar(state, action.payload.numberCar)]
      tempState.currentMiles = action.payload.currentMiles
      state[getIndexCar(state, action.payload.numberCar)].currentMiles = action.payload.currentMiles
      return state
    },
    delAllMileage (state, action: PayloadAction<{ numberCar: number }>) {
      const tempState = state[getIndexCar(state, action.payload.numberCar)]
      tempState.currentMiles = { currentMileage: 0, dateMileage: new Date() }
      tempState.mileage = []
      state[getIndexCar(state, action.payload.numberCar)] = tempState
      return state
      /* state[getIndexCar(state, action.payload.numberCar)].mileage = [] */
    },
    delItemMileage (state, action: PayloadAction<{ numberCar: number, item: CurrentMiles }>) {
      state[getIndexCar(state, action.payload.numberCar)].mileage =
        state[getIndexCar(state, action.payload.numberCar)].mileage.filter(item =>
          Date.parse(String(item.dateMileage)) !== Date.parse(String(action.payload.item.dateMileage))
        )
    },
    editedItemMileage (state, action: PayloadAction<{ numberCar: number, item: CurrentMiles }>) {
      const temp = state[getIndexCar(state, action.payload.numberCar)].mileage.filter(
        item => Date.parse(String(item.dateMileage)) !== Date.parse(String(action.payload.item.dateMileage))
      )
      temp.push(action.payload.item)
      state[getIndexCar(state, action.payload.numberCar)].mileage = temp
    },
    // ------------ reducers for fuel,part,service,other ------------------------------------
    addStateCarReducer (state, action: PayloadAction<{ type: TypeTypeState, numberCar: number, item: TypeStatesCar }>) {
      /* const tempArray: TypeStatesCar[] = state[action.payload.numberCar][action.payload.type]
       tempArray.push(action.payload.item)
       state[action.payload.numberCar][action.payload.type] = tempArray */
      // @ts-expect-error: error type item
      state[getIndexCar(state, action.payload.numberCar)][action.payload.type].push(action.payload.item)
    },
    /* delStateCarReducer (state,action:PayloadAction<{type:TypeTypeState,numberCar:number,id:number}>) {

      state[action.payload.numberCar][action.payload.type] =
        // @ts-ignore: error type item
        state[action.payload.numberCar][action.payload.type].filter(item => item.id !== action.payload.id)
    }
    , */
    delStateCarReducer (state, action: PayloadAction<{ type: TypeTypeState, numberCar: number, id: number }>) {
      // @ts-expect-error: error type item
      state[getIndexCar(state, action.payload.numberCar)][action.payload.type] =
          state[getIndexCar(state, action.payload.numberCar)][action.payload.type].filter(item => item.id !== action.payload.id)
    },
    editStateCarReducer (state, action: PayloadAction<{ type: TypeTypeState, numberCar: number, item: TypeStatesCar }>) {
      const temp = state[getIndexCar(state, action.payload.numberCar)][action.payload.type].filter(item => item.id !== action.payload.item.id)
      temp.push(action.payload.item)
      // @ts-expect-error: error type item
      state[getIndexCar(state, action.payload.numberCar)][action.payload.type] = temp
    },
    // ----------------------------------------------------------------------------------------
    updateStateCars (state, action: PayloadAction<StateCar[]>) {
      return action.payload
    },
    // ----------------------------------------------------------------------------------------
    editedTires (state, action: PayloadAction<{ tire: StateTire, numberCar: number }>) {
      state[getIndexCar(state, action.payload.numberCar)].tire = action.payload.tire
      /* const tempTires = state[getIndexCar(state, action.payload.numberCar)].tire
     *  if (tempTires.length === 0) {
         tempTires.push(action.payload.tire)
         state[getIndexCar(state, action.payload.numberCar)].tires = tempTires
       } else {
         const tempFilter = tempTires.filter(item => item.id !== action.payload.tire.id)
         tempFilter.push(action.payload.tire)
         state[getIndexCar(state, action.payload.numberCar)].tires = tempTires
       } */
    },
    // ----------------------------------------------------------------------------------------
    setConsumption (state, action: PayloadAction<{ isConsumption: boolean, numberCar: number }>) {
      state[getIndexCar(state, action.payload.numberCar)].isConsumption = action.payload.isConsumption
    }
  }
})

export const {
  editedCarInfo,
  addedCurrentMiles, editedCurrentMiles,
  addStateCarReducer, delStateCarReducer,
  editStateCarReducer, addedCar,
  deletedCar, delNowCar,
  updateStateCars,
  delAllMileage, delItemMileage,
  editedItemMileage, editedTires,
  setConsumption
} = carsSlice.actions

export default carsSlice.reducer
