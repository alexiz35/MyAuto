import { JSX } from 'react'
import { Button, Card, Icon, IconButton } from 'react-native-paper'
import { Alert, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { delAllMileage } from '../Redux/CarsSlice'
import { useTranslation } from 'react-i18next'

export const MileageCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const numberCar = useAppSelector(state => state.numberCar)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const pressResetMileage = () => {
    Alert.alert(t('setting.alertMileageCard.TITLE'), t('setting.alertMileageCard.MESSAGE'), [
      {
        text: 'Cancel',
        // ***
        /* onPress: () => console.log('Cancel Pressed'), */
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => { dispatch(delAllMileage({ numberCar })) }
      }
    ])
  }

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={stylesSettingScreen.text}
            onPress={() => { navigation.navigate('MileageScreen') }}
          >
            {t('navi.MILEAGE_TITLE')}
          </Button>
        </View>
        <View style={{ paddingRight: 5 }}>
          <IconButton icon={'close'} iconColor={colors.error} onPress={pressResetMileage} />
        </View>
      </View>
    </Card>

  )
}
