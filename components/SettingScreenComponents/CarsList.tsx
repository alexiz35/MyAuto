import { Alert, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Divider, Icon, IconButton, List, Portal, Text } from 'react-native-paper'
import { StateCar } from '../../type'
import { JSX } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { listService } from '../InputDoneScreenComponents/inputService/ListServices'
import { useAppTheme } from '../../CommonComponents/Theme'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { deletedCar, delNowCar } from '../Redux/CarsSlice'

export const CarsList = ():JSX.Element=>{
  const state = useAppSelector(state => state)
  const {colors} = useAppTheme()
  const dispatch = useAppDispatch()

  // ------------------------ Alert ConfirmAction -------------------------------
  const createTwoButtonAlert = (id:number) =>
    Alert.alert('Удалить машину?', 'Все данные по этой машине будут удалены', [
      {
        text: 'Cancel',
        /* onPress: () => console.log('Cancel Pressed'), */
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteCar(id)}
    ]);

  const pressRow = (id:number) => {
    dispatch(changedNumberCar(id))
  }
  const deleteCar = (id:number) => {
    if (state.numberCar===id) {
      dispatch(changedNumberCar(state.cars[0].carId))
    }
    dispatch(deletedCar({numberCar:id}))

  }


  return(
    <View>
    {
      state.cars.map((item, index) => (
        <View key={index}>
        <View  style={{ flexDirection: 'row',justifyContent:'space-between',alignItems:'center' }}>
          <Button
            icon={()=>(
              (item.carId===state.numberCar)
                ? <Icon size={18} source={'arrow-right'} color={colors.tertiary}/>
                : null
            )}
            onPress={()=>pressRow(item.carId)}>{item.info.nameCar}
          </Button>
          <IconButton icon={'close'}  iconColor={colors.error} onPress={()=>createTwoButtonAlert(item.carId)}/>
        </View>
      <Divider horizontalInset />
      </View>
      ))
    }

    </View>
  )
}

const styles = StyleSheet.create({
  /* iconText: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 5
  }, */
  viewText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
