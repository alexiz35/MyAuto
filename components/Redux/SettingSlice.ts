// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LangType, Setting } from '../../type'

const initialState: Setting = {
  alarmMileagePeriodNumber: 6,
  alarmMileagePeriod: true,
  alarmMileageStart: true,
  themeSet: 'dark',
  lang: '',
  isGoogle: false
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
    langChanged (state, action: PayloadAction<LangType>) {
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.lang = action.payload
    },
    changeAlarmStart (state, action: PayloadAction<boolean>) {
      state.alarmMileageStart = action.payload
    },
    changeAlarmPeriod (state, action: PayloadAction<boolean>) {
      state.alarmMileagePeriod = action.payload
    },
    changeAlarmPeriodNumber (state, action: PayloadAction<number>) {
      state.alarmMileagePeriodNumber = action.payload
    },
    setGoogle (state, action: PayloadAction<boolean>) {
      state.isGoogle = action.payload
    },
    updateSetting (state, action: PayloadAction<Setting>) {
      return action.payload
    }
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const {
  themeChanged, changeAlarmStart,
  changeAlarmPeriod, changeAlarmPeriodNumber,
  setGoogle, updateSetting,
  langChanged
} = settingSlice.actions

// Export the slice reducer as the default export
export default settingSlice.reducer
