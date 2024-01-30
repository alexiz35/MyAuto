import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentMiles, initialStateInfo, StateCar, StateFuel, StateInfo } from '../../type'

const initialState: StateCar[] = [
  {
    info: initialStateInfo,
    carId: 0,
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
    editedCarInfo (state, action: PayloadAction<{ numberCar: number, carInfo: StateInfo }>) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state[action.payload.numberCar].info = action.payload.carInfo
    },
    deletedCar (state, action) {
      const { seller } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.concat(seller)
    },
    // --------------------------------------------------------------------------------------
    addedCurrentMiles (state, action: PayloadAction<{ numberCar: number, currentMiles: CurrentMiles }>) {
      const tempState = state[action.payload.numberCar]
      tempState.currentMiles = action.payload.currentMiles
      tempState.mileage.push(action.payload.currentMiles)
      state[action.payload.numberCar] = tempState
      return state
    },
    // --------------------------------------------------------------------------------------
    addedFuel (state, action: PayloadAction<{ numberCar: number, fuel: StateFuel }>) {
      state[action.payload.numberCar].fuel.push(action.payload.fuel)
    },
    editedFuel (state, action: PayloadAction<{ numberCar: number, fuel: StateFuel }>) {
      const tempFuel = state[action.payload.numberCar].fuel.filter(item => item.id !== action.payload.fuel.id)
      tempFuel.push(action.payload.fuel)
      state[action.payload.numberCar].fuel = tempFuel
      return state
    },
    deletedFuel (state, action: PayloadAction<{ numberCar: number, id: number }>) {
      state[action.payload.numberCar].fuel =
        state[action.payload.numberCar].fuel.filter(item => item.id !== action.payload.id)
      return state
    }
    // ----------------------------------------------------------------------------------------
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { editedCarInfo, addedCurrentMiles, addedFuel, editedFuel, deletedFuel } = carsSlice.actions

// Export the slice reducer as the default export
export default carsSlice.reducer
