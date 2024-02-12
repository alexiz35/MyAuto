import { JSX } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Divider, Icon, Text } from 'react-native-paper'
import { CarsList } from './CarsList'
import { addedCar, initialStateCar } from '../Redux/CarsSlice'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from '../../screens/SettingScreen'

export const CarsCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>()
  const state = useAppSelector((state) => state)
  const { colors } = useAppTheme()

  // ****************************** ADD NEW CAR *********************************
  const addNewCar = () => {
    const tempNewCar = Object.assign({}, initialStateCar[0])
    tempNewCar.carId = state.cars.length
    /* console.log('add',state.cars.length,tempNewCar) */
    dispatch(addedCar(tempNewCar))
    dispatch(changedNumberCar(tempNewCar.carId))
    navigation.navigate('CarInfoScreen')
  }

  return (
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
  )
}
