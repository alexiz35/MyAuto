import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Setting } from '../../type'

const initialState: Setting = {
  alarmMileagePeriodNumber: 6,
  alarmMileagePeriod: true,
  alarmMileageStart: true,
  themeSet: 'dark'
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    themeChanged (state, action: PayloadAction<'dark' | 'light'>) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.themeSet = action.payload
    },
    changeAlarmStart (state, action: PayloadAction<boolean>) {
      state.alarmMileageStart = action.payload
    },
    changeAlarmPeriod (state, action: PayloadAction<boolean>) {
      state.alarmMileagePeriod = action.payload
    }

  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { themeChanged, changeAlarmStart, changeAlarmPeriod } = settingSlice.actions

// Export the slice reducer as the default export
export default settingSlice.reducer
