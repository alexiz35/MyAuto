import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentMiles, initialStateInfo, StateCar, StateInfo } from '../../type'

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
    }
    // --------------------------------------------------------------------------------------

  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { editedCarInfo, addedCurrentMiles } = carsSlice.actions

// Export the slice reducer as the default export
export default carsSlice.reducer
