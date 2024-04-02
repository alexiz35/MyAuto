// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Seller } from '../../type'

const initialState: Seller[] =
  [{
    id: 1,
    name: 'maks',
    phone: '100',
    specialism: 'renault'
  }, {
    id: 2,
    name: 'максим',
    phone: '200',
    specialism: 'renault'
  }]

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    addedSeller (state, action: PayloadAction<Seller>) {
      state.push(action.payload)
    },
    editedSeller (state, action: PayloadAction<Seller>) {
      if (action.payload.id === undefined) return state
      const temp = state.filter(item => item.id !== action.payload.id)
      temp.push(action.payload)
      return temp
    },
    deletedSeller (state, action: PayloadAction<number | undefined>) {
      if (action.payload === undefined) return state
      return state.filter(item => item.id !== action.payload)
    },
    deletedAllSeller (state) {
      return initialState
    },
    updatedAllSeller (state, action: PayloadAction<Seller[]>) {
      return action.payload
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const {
  addedSeller, editedSeller,
  deletedSeller, deletedAllSeller,
  updatedAllSeller
} = sellerSlice.actions

// Export the slice reducer as the default export
export default sellerSlice.reducer
