import { JSX, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, Dialog, Divider, Icon, Portal, Text } from 'react-native-paper'
import { CarsList } from './CarsList'
import { addedCar, initialStateCar } from '../Redux/CarsSlice'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { ModalPickNameCar } from '../CarInfoScreenComponents/ModalPickNameCar'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'
import {
  getLevelAccessDataSecurely, getLevelAccessSecure,
  TypeLevelAccess
} from '../PurchaseComponents/PurchaseFunctions'
import { log } from 'expo/build/devtools/logger'
import { LEVEL_CARS } from '../PurchaseComponents/TypesPurchases'

export const CarsCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>()
  const state = useAppSelector((state) => state)
  const { colors } = useAppTheme()
  const [visibleNameCar, setVisibleNameCar] = useState(false)
  const { t } = useTranslation()

  // ****************************** ADD NEW CAR *********************************
  const addNewCar = async () => {
    const levelAccess = await getLevelAccessDataSecurely()

    console.log('acc', levelAccess)
    setVisibleNameCar(LEVEL_CARS.includes(levelAccess))
  }

  const cancelDialogNameCar = () => {
    setVisibleNameCar(false)
  }
  const okDialogNameCar = (nameCar: string) => {
    const tempNewCar = { ...initialStateCar[0], info: { ...initialStateCar[0].info, nameCar } }
    tempNewCar.carId = Date.now()
    tempNewCar.info.nameCar = nameCar
    dispatch(addedCar(tempNewCar))
    dispatch(changedNumberCar(tempNewCar.carId))
    setVisibleNameCar(false)
    navigation.navigate('CarInfoScreen')
  }

  return (
    <>
    <Card style={{ marginVertical: 5 }}>
      <View style={stylesSettingScreen.iconText}>
        <Icon source={'circle'} color={colors.tertiary} size={10} />
        <Text style={stylesSettingScreen.text}>{t('setting.ADD_CAR_TITLE')}</Text>
      </View>
      <Divider bold />

      <CarsList />
      <Divider horizontalInset />
      <Button onPress={() => { void addNewCar() }}>{t('setting.ADD_CAR')}</Button>
    </Card>
      <Portal>
        <Dialog
          visible={visibleNameCar}
          dismissableBackButton
          onDismiss={cancelDialogNameCar}
        >
          <ModalPickNameCar mode={'addNewCar'} handlePressOk={okDialogNameCar} handlePressCancel={cancelDialogNameCar}/>
        </Dialog>
      </Portal>
    </>
  )
}
