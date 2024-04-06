import { JSX, useCallback } from 'react'
import { View } from 'react-native'
import { Button, Card, Icon, IconButton, Text } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { themeChanged } from '../Redux/SettingSlice'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'

export const LangCard = (): JSX.Element => {
  // ****************************** THEME change *********************************
  // ------------------------- Toggle Theme --------------------------------------
  const theme2 = useAppSelector((state) => state.setting.themeSet)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button style={stylesSettingScreen.text} >Переключение темы</Button>
        </View>
        <View style={{ paddingRight: 10 }}>
          <IconButton
            icon={'translate-variant'}
            size={18}
            mode={'outlined'}
          />
          {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
        </View>
      </View>
    </Card>
  )
}
