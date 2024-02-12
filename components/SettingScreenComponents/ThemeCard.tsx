import { JSX, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Text } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { themeChanged } from '../Redux/SettingSlice'
import { useAppTheme } from '../../CommonComponents/Theme'

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
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <View style={styles.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Text style={styles.text}>Переключение темы</Text>
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

const styles = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 5
  },
  viewText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
