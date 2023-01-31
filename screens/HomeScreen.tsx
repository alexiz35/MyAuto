/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Text, View, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tasks } from '../components/Tasks'
import { addTask, updateMiles } from '../components/Redux/actions'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { StateTask } from '../type'

export type RootStackParamList = {
  Home: undefined
  Second: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const setMiles = useAppDispatch()
  const miles = useAppSelector((state) => state)
  const currentTask: StateTask = {
    id: 0,
    title: 'Oil',
    startKm: 200000,
    endKm: 250000,
    startDate: '25.01.22',
    endData: '25.01.22'
  }

  return (

    <View style={styles.viewContainer}>
      <View style={styles.viewTasks}>
        <Tasks/>
      </View>
      <View style={styles.viewAddButton}>
        <Button
          title={'Добавить обслуживание'}
          type='solid'
          size={'lg'}
          onPress={() => {
            navigation.navigate('Second')
          }}
          icon={{
            name: 'umbrella',
            type: 'font-awesome',
            size: 15,
            color: 'red'
          }}
          iconRight
        />
      </View>
      {/* <MapView
        style={{ width: '100%', height: '50%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      /> */}
      </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  viewTasks: {
    height: '90%'
  },
  viewAddButton: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})
