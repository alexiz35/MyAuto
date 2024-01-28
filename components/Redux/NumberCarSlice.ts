import { createSlice } from '@reduxjs/toolkit'

const initialState = 0

const numberCarSlice = createSlice({
  name: 'numberCar',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    changedToken (state, action) {
      const { numberCar } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state = numberCar
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { changedToken } = numberCarSlice.actions

// Export the slice reducer as the default export
export default numberCarSlice.reducer
