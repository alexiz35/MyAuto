import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import merge from 'deepmerge'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
})

const CombinedDefaultThemeBase = merge(MD3LightTheme, LightTheme)
const CombinedDarkThemeBase = merge(MD3DarkTheme, DarkTheme)
export const CombinedDefaultTheme = {
  ...CombinedDefaultThemeBase,
  colors: {
    ...CombinedDefaultThemeBase.colors,
    tertiary: 'rgb(46, 108, 0)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(128, 255, 44)',
    onTertiaryContainer: 'rgb(9, 33, 0)',
    yellow: 'rgb(253,202,0)'
  }
}
export const CombinedDarkTheme = {
  ...CombinedDarkThemeBase,
  colors: {
    ...CombinedDarkThemeBase.colors,
    tertiary: 'rgb(103, 225, 0)',
    onTertiary: 'rgb(21, 56, 0)',
    tertiaryContainer: 'rgb(33, 81, 0)',
    onTertiaryContainer: 'rgb(128, 255, 44)',
    error: 'rgb(186, 26, 26)',
    yellow: 'rgb(253,202,0)'

  }
}

export type AppTheme = typeof CombinedDarkTheme
export const useAppTheme = () => useTheme<AppTheme>()
