/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { View, StyleSheet } from 'react-native'
import { Button, FAB } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tasks } from '../components/Tasks'
import { addTask, updateMiles } from '../components/Redux/actions'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { StateTask } from '../type'
import { useEffect } from 'react'
import { RootStackParamList } from '../components/Navigation/Navigation'

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

  /*  const navigateInfo = (): void => {
    navigation.navigate('Info')
  } */

  useEffect(() => {
    /* setMiles(updateMiles(15)) */
    /* setMiles(addTask(currentTask)) */
    console.log('homelog', miles)
  }, [miles.currentMiles])

  return (

    <View style={styles.viewContainer}>

      <View style={styles.viewTasks}>
        <Tasks />
      </View>
     {/*  <View style={styles.viewAddButton}>
        <Button
          title={'Добавить обслуживание'}
          type='solid'
          size={'lg'}
          onPress={() => {
            navigation.navigate('InputTaskScreen', { editable: false })
          }}
          icon={{
            name: 'umbrella',
            type: 'font-awesome',
            size: 15,
            color: 'red'
          }}
          iconRight
        />
      </View> */}
      <View style={{
        position: 'absolute',
        right: 0,
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}>
        <FAB
          style={{ marginRight: 10, marginBottom: 5 }}
          placement={'right'}
          /* title={'+'} */
          icon={{ name: 'add', color: 'white' }}
          onPress={() => {
            navigation.navigate('InputTaskScreen', { editable: false })
          }}
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
