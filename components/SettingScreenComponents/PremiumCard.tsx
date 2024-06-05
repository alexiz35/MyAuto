import { JSX } from 'react'
import { Button, Card, Icon, IconButton } from 'react-native-paper'
import { Alert, View } from 'react-native'
import { deletedAllSeller } from '../Redux/SellerSlice'
import { useAppDispatch } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'

export const PremiumCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const pressResetSellers = () => {
    Alert.alert(t('setting.alertSellerCard.TITLE'), t('setting.alertSellerCard.MESSAGE'), [
      {
        text: 'Cancel',
        // ***
        /* onPress: () => console.log('Cancel Pressed'), */
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => { dispatch(deletedAllSeller()) }
      }
    ])
  }

  return (
    <Card style={{ marginVertical: 5 }} mode={'outlined'} onPress={() => { navigation.navigate('PremiumScreen') }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={stylesSettingScreen.text}
            onPress={() => { navigation.navigate('PremiumScreen') }}
          >
            {t('premium.TITLE')}
          </Button>
        </View>

        <View style={{ paddingRight: 5 }}>
            <IconButton icon={require('../../assets/iconPremium.png') } size={36} iconColor={colors.tertiary} />
        </View>
      </View>
    </Card>

  )
}
