import { JSX } from 'react'
import { Button, Card, Icon } from 'react-native-paper'
import { View } from 'react-native'
import { deletedAllSeller } from '../Redux/SellerSlice'
import { useAppDispatch } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'

export const SellersCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { colors } = useAppTheme()

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={stylesSettingScreen.text}
            onPress={() => { navigation.navigate('SellerScreen') }}
          >
            Список поставщиков
          </Button>
          <Button
            style={stylesSettingScreen.text}
            onPress={() => dispatch(deletedAllSeller())}
          >
            RESET
          </Button>
        </View>
        <View style={{ paddingRight: 10 }}>
          {/* <IconButton icon={'theme-light-dark'} size={18} mode={'outlined'} onPress={toggleTheme} /> */}
          {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
        </View>
      </View>
    </Card>

  )
}
