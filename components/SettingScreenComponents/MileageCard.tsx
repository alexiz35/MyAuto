import { JSX } from 'react'
import { Button, Card, Icon, IconButton } from 'react-native-paper'
import { View } from 'react-native'
import { deletedAllSeller } from '../Redux/SellerSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { delAllMileage } from '../Redux/CarsSlice'

export const MileageCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const numberCar = useAppSelector(state => state.numberCar)
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
            onPress={() => { navigation.navigate('MileageScreen') }}
          >
            Список точек пробега
          </Button>
        </View>
        <View style={{ paddingRight: 10 }}>
          <IconButton icon={'close'} iconColor={colors.error} onPress={() => dispatch(delAllMileage({ numberCar }))} />
        </View>
      </View>
    </Card>

  )
}
