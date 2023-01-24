/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Text, View } from 'react-native'
import { Button } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tasks } from '../components/Tasks'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateMiles } from '../components/Redux/actions'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { RootState } from '../components/Redux/store'
import { StateTask } from '../type'

type RootStackParamList = {
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

  const handlePressAddTask = (): void => {
    currentTask.id = Date.now()
    setMiles(addTask(currentTask))
  }
  console.log('state', miles)
  return (
    <View>
      {/* <Text>{String(miles.currentMiles)}</Text> */}
      <Button
      title={'setMiles2500'}
      type={'solid'}
      onPress={() => {
        setMiles(updateMiles(2500))
      }}
      />
      <Button
      title={'add'}
      type={'solid'}
      onPress={handlePressAddTask}
      />
      <Button
        title={'setMiles1000'}
        type={'solid'}
        onPress={() => {
          setMiles(updateMiles(1000))
        }}
      />
      <Tasks/>
      <Button
        title={'Second Screen'}
        type='solid'
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
      <MapView
        style={{ width: '100%', height: '50%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
    </View>

  )
}

export default HomeScreen
