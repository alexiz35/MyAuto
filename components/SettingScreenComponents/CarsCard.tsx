import { JSX, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, Divider, Icon, Portal, Text } from 'react-native-paper'
import { CarsList } from './CarsList'
import { addedCar, editedCarInfo, initialStateCar } from '../Redux/CarsSlice'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from '../../screens/SettingScreen'
import { ModalPickNameCar } from '../CarInfoScreenComponents/ModalPickNameCar'

export const CarsCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>()
  const state = useAppSelector((state) => state)
  const { colors } = useAppTheme()
  const [visibleNameCar, setVisibleNameCar] = useState(false)

  // ****************************** ADD NEW CAR *********************************
  const addNewCar = () => {
    setVisibleNameCar(true)
    /*  const tempNewCar = Object.assign({}, initialStateCar[0])
    tempNewCar.carId = state.cars.length
    dispatch(addedCar(tempNewCar))
    dispatch(changedNumberCar(tempNewCar.carId))
    navigation.navigate('CarInfoScreen') */
  }

  const cancelDialogNameCar = () => {
    setVisibleNameCar(false)
  }
  const okDialogNameCar = (nameCar: string) => {
    if (state.cars.length === 1 && state.cars[state.numberCar].info.nameCar === '') {
      const tempNewCar = Object.assign({}, initialStateCar[0])
      tempNewCar.info.nameCar = nameCar
      dispatch(editedCarInfo({ numberCar: state.numberCar, carInfo: tempNewCar.info }))
    }
    const tempNewCar = Object.assign({}, initialStateCar[0])
    tempNewCar.carId = state.cars.length
    tempNewCar.info.nameCar = nameCar
    dispatch(addedCar(tempNewCar))
    dispatch(changedNumberCar(tempNewCar.carId))
    navigation.navigate('CarInfoScreen')
    setVisibleNameCar(false)
  }

  return (
    <>
    <Card style={{ marginVertical: 5 }}>
      <View style={stylesSettingScreen.iconText}>
        <Icon source={'circle'} color={colors.tertiary} size={10} />
        <Text style={stylesSettingScreen.text}>Мои машины</Text>
      </View>
      <Divider bold />

      <CarsList />
      <Divider horizontalInset />
      <Button onPress={() => { addNewCar() }}>Добавить машину</Button>
    </Card>
      <Portal>
        <Dialog
          visible={visibleNameCar}
          dismissableBackButton
          onDismiss={cancelDialogNameCar}
        >
          <ModalPickNameCar handlePressOk={okDialogNameCar} handlePressCancel={cancelDialogNameCar}/>
        </Dialog>
      </Portal>
    </>
  )
}
