import { createSlice } from '@reduxjs/toolkit'
import { initialStateInfo, Seller, Setting, StateCar } from '../../type'

const initialState: StateCar[] = [
  {
    info: initialStateInfo,
    carId: 0,
    currentMiles: {
      currentMileage: 0,
      dateMileage: new Date().toLocaleDateString()
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
    // Give case reducers meaningful past-tense "event"-style names
    addedSeller (state, action) {
      const { seller } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.concat(seller)
    },
    editedSeller (state, action) {
      const { seller } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.concat(seller)
    },
    deletedSeller (state, action) {
      const { seller } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.concat(seller)
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { addedSeller, editedSeller } = carsSlice.actions

// Export the slice reducer as the default export
export default carsSlice.reducer
