import { JSX, useCallback, useState } from 'react'
import { Button, Card, Icon } from 'react-native-paper'
import { ActivityIndicator, View } from 'react-native'
import { useAppDispatch } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'
import { checkLevelAccess, TypeLevelAccess } from '../PurchaseComponents/PurchaseFunctions'

export const PremiumCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const [checkLevel, setCheckLevel] = useState<TypeLevelAccess>('Free')
  const [isReadyLevelAccess, setIsReadyLevelAccess] = useState(false)

  const pressButton = () => {
    if (checkLevel !== 'Pro') navigation.navigate('PremiumScreen')
  }

  useFocusEffect(useCallback(() => {
    checkLevelAccess()
      .then(levelAccess => {
        setCheckLevel(levelAccess)
        setIsReadyLevelAccess(true)
        console.log('LEVEL', levelAccess)
      })
      .catch(e => { console.log(e) })
  }, []))

  return (
    <Card style={{ marginVertical: 5 }} mode={'outlined'} disabled={checkLevel === 'Pro'}
          onPress={pressButton}
    >
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={stylesSettingScreen.text}
            onPress={pressButton}
          >
            {/* {t('premium.TITLE')} */}
            {checkLevel === 'Pro' ? 'У вас максимальный уровень' : 'Получить полный доступ'}
          </Button>
        </View>

        <View style={{ paddingRight: 5 }}>
          {/* <IconButton icon={require('../../assets/IconPro.png') } size={36} iconColor={colors.tertiary} /> */}
          {/* <Icon size={50} source={require('../../assets/IconPro.png')}/> */}
          {isReadyLevelAccess
            ? <Button labelStyle={{
              fontWeight: '400',
              fontSize: 16,
              color: checkLevel === 'Pro' ? colors.tertiary : colors.primary
            }}
            >{checkLevel}</Button>
            : <ActivityIndicator style={{ paddingRight: 15 }}/>
          }
        </View>
      </View>
    </Card>

  )
}
