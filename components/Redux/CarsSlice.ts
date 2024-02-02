import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CurrentMiles,
  initialStateInfo,
  StateCar,
  StateFuel,
  StateInfo,
  StateOther,
  StatePart,
  StateService,
  StateTask
} from '../../type'

const initialState: StateCar[] = [
  {
    info: initialStateInfo, // ok
    carId: 0,
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
type TypeTypeState = 'fuel'|'parts'|'others'|'tasks'|'services'
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
  initialState,
  reducers: {
    // --------------------------------------------------------------------------------------
    addedCar (state, action) {
      const { seller } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.concat(seller)
    },
    deletedCar (state, action) {
      const { seller } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.concat(seller)
    },
    // --------------------------------------------------------------------------------------
    editedCarInfo (state, action: PayloadAction<{ numberCar: number, carInfo: StateInfo }>) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state[action.payload.numberCar].info = action.payload.carInfo
    },
    // --------------------------------------------------------------------------------------
    addedCurrentMiles (state, action: PayloadAction<{ numberCar: number, currentMiles: CurrentMiles }>) {
      const tempState = state[action.payload.numberCar]
      tempState.currentMiles = action.payload.currentMiles
      tempState.mileage.push(action.payload.currentMiles)
      state[action.payload.numberCar] = tempState
      return state
    },
    // ------------ reducers for fuel,part,service,other ------------------------------------
     addStateCarReducer (state,action: PayloadAction<{type: TypeTypeState,numberCar:number,item:TypeStatesCar}>){
      /* const tempArray: TypeStatesCar[] = state[action.payload.numberCar][action.payload.type]
       tempArray.push(action.payload.item)
       state[action.payload.numberCar][action.payload.type] = tempArray */
       // @ts-ignore: error type item
       state[action.payload.numberCar][action.payload.type].push(action.payload.item)

    },
    delStateCarReducer (state,action:PayloadAction<{type:TypeTypeState,numberCar:number,id:number}>) {

      state[action.payload.numberCar][action.payload.type] =
        // @ts-ignore: error type item
        state[action.payload.numberCar][action.payload.type].filter(item => item.id !== action.payload.id)
    }
    ,
    editStateCarReducer (state,action: PayloadAction<{type: TypeTypeState,numberCar:number,item:TypeStatesCar}>) {
      // @ts-ignore: error type item
      const temp = state[action.payload.numberCar][action.payload.type].filter(item => item.id !== action.payload.item.id)
      temp.push(action.payload.item)
      state[action.payload.numberCar][action.payload.type] = temp
    }
    // ----------------------------------------------------------------------------------------
  }
})


export const { editedCarInfo, addedCurrentMiles,addStateCarReducer, delStateCarReducer,editStateCarReducer } = carsSlice.actions

export default carsSlice.reducer
