// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateTire } from '../../type'

const initialState: StateTire[] = []

const tireSlice = createSlice({
  name: 'tire',
  initialState,
  reducers: {
    editedTireList (state, action: PayloadAction<StateTire>) {
      if (state.length === 0) {
        state.push(action.payload)
      } else {
        const tempFilter = state.filter(item => item.id !== action.payload.id)
        tempFilter.push(action.payload)
        return tempFilter
      }
    },
    deletedTireList (state, action: PayloadAction<number | undefined>) {
      if (action.payload === undefined) return state
      return state.filter(item => item.id !== action.payload)
    },
    deletedAllTireList (state) {
      return initialState
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const {
  editedTireList, deletedTireList, deletedAllTireList
} = tireSlice.actions

// Export the slice reducer as the default export
export default tireSlice.reducer
