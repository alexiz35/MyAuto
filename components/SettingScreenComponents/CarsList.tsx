import { Alert, View } from 'react-native'
import { Button, Divider, Icon, IconButton, TouchableRipple } from 'react-native-paper'
import { JSX } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useAppTheme } from '../../CommonComponents/Theme'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { deletedCar } from '../Redux/CarsSlice'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootTabParamList } from '../Navigation/TypeNavigation'
import { useTranslation } from 'react-i18next'

export const CarsList = (): JSX.Element => {
  const state = useAppSelector(state => state)
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation =
    useNavigation<NavigationProp<RootTabParamList>>()

  // ------------------------ Alert ConfirmAction -------------------------------
  const createDeleteAlert = (id: number) => {
    Alert.alert(t('setting.alertCarsCard.TITLE'), t('setting.alertCarsCard.MESSAGE'), [
      {
        text: 'Cancel',
        /* onPress: () => console.log('Cancel Pressed'), */
        style: 'cancel'
      },
      { text: 'OK', onPress: () => { deleteCar(id) } }
    ])
  }

  const pressRow = (id: number) => {
    dispatch(changedNumberCar(id))
  }
  const deleteCar = (id: number) => {
    if (state.numberCar === id) {
      if (state.cars.length === 1) {
        dispatch(changedNumberCar(0))
        dispatch(deletedCar({ numberCar: id }))
        navigation.navigate('Home')
      } else {
        const targetIndex = state.cars.findIndex(item => item.carId !== id)
        dispatch(changedNumberCar(targetIndex))
      }
    }
    dispatch(deletedCar({ numberCar: id }))
  }

  return (
    <View>
    {state.cars.length === 1 && state.cars[0].info.nameCar === ''
      ? null
      : state.cars.map((item, index) => (

        <TouchableRipple key={index} onPress={() => { pressRow(item.carId) }}>
          <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            icon={() => (
              (item.carId === state.numberCar)
                ? <Icon size={18} source={'arrow-right'} color={colors.tertiary}/>
                : null
            )}
            onPress={() => { pressRow(item.carId) }}
          >
            {item.info.nameCar}
          </Button>
          <View style={{ paddingRight: 5 }}>
              <IconButton icon={'close'} iconColor={colors.error} onPress={() => { createDeleteAlert(item.carId) }}/>
          </View>
        </View>
            <Divider horizontalInset />
          </>
      </TouchableRipple>

      ))
    }

    </View>
  )
}
