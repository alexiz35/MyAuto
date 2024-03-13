import { JSX, useCallback } from 'react'
import { View } from 'react-native'
import { Button, Card, Icon, IconButton, Text } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { themeChanged } from '../Redux/SettingSlice'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'

export const ThemeCard = (): JSX.Element => {
  // ****************************** THEME change *********************************
  // ------------------------- Toggle Theme --------------------------------------
  const theme2 = useAppSelector((state) => state.setting.themeSet)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()

  const toggleTheme = useCallback(() => {
    theme2 === 'dark'
      ? dispatch(themeChanged('light'))
      : dispatch(themeChanged('dark'))
  }, [theme2])

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button style={stylesSettingScreen.text} onPress={toggleTheme}>Переключение темы</Button>
        </View>
        <View style={{ paddingRight: 10 }}>
          <IconButton
            icon={'theme-light-dark'}
            size={18}
            mode={'outlined'}
            onPress={toggleTheme}
          />
          {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
        </View>
      </View>
    </Card>
  )
}
