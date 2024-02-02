import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { StateCar } from '../../type'
import { JSX } from 'react'
import { useAppSelector } from '../Redux/hook'

export const CarsList = ():JSX.Element=>{
  const state = useAppSelector(state => state)

  return(
    <>
    {
      state.cars.map((item, index) => (
        <View key={index} style={styles.viewText}>
          <Text>{item.info.nameCar}</Text>
          <Divider />
        </View>
      ))
    }
    </>
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
