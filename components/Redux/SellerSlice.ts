import { createSlice } from '@reduxjs/toolkit'
import { Seller, Setting } from '../../type'

const initialState: Seller[] =
  [{
    name: 'maks',
    phone: '100'
  }, {
    name: 'максим',
    phone: '200'
  }]

const sellerSlice = createSlice({
  name: 'seller',
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
export const { addedSeller, editedSeller } = sellerSlice.actions

// Export the slice reducer as the default export
export default sellerSlice.reducer
