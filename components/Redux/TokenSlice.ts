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
      const { token } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state = token
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { addedToken } = tokenSlice.actions

// Export the slice reducer as the default export
export default tokenSlice.reducer
