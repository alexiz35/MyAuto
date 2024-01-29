import { createSlice } from '@reduxjs/toolkit'

/* interface TypeTokenState {
  token: string
} */

const initialState = ''

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    addedToken (state, action) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state = action.payload
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { addedToken } = tokenSlice.actions

// Export the slice reducer as the default export
export default tokenSlice.reducer
