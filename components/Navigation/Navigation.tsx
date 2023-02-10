import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../../screens/HomeScreen'
import InputTaskScreen from '../../screens/InputTaskScreen'
import { Image, Text, View } from 'react-native'
import { Button } from '@rneui/themed'
import { useEffect, useState } from 'react'
import * as TaskManager from 'expo-task-manager'
import haversineDistance from 'haversine-distance'
import * as Location from 'expo-location'
import InfoScreen from '../../screens/InfoScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Home: undefined
  InputTaskScreen: { editable: boolean, taskId?: number }
  Info: { taskId: number }
}

function LogoTitle (): JSX.Element {
  return (
    <Image
      style={{
        width: 50,
        height: 50
      }}
      source={
        require('../../assets/renault_logo.jpg')
      }
    />
  )
}

/* function MyButton (): JSX.Element {
  return (
    <View style={{ width: 100, marginRight: 20 }}>
      <Button title={'Set'} color='violet' onPress={() => alert('Hello')}/>
    </View>
  )
} */

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigation = (): JSX.Element => {
  const [initial, setInitial] = useState(true)
  const [location, setLocation] = useState(0)
  const [prevCoords, setPrevCoords] = useState({ latitude: 0, longitude: 0 })
  const [newCoords, setNewCoords] = useState({ latitude: 0, longitude: 0 })
  const [distance, setDistance] = useState(0)

  // @ts-expect-error temp
  TaskManager.defineTask('TRACKING', (data, error) => {
    if (error != null) {
      console.log('err', error)
      return
    }
    if (data !== undefined) {
      const { locations } = data.data
      console.log('locations', locations)
      const tempCoords = {
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude
      }

      if (initial) {
        setPrevCoords(tempCoords)
        setInitial(false)
      } else {
        setPrevCoords(newCoords)
        setNewCoords(tempCoords)

        const temp = haversineDistance(prevCoords, newCoords)
        if (isNaN(temp)) return

        setLocation(temp)
        setDistance(distance + location)
        console.log('distance', distance)
      }
    }
  })

  useEffect(() => {
    void (async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
        if (backgroundStatus === 'granted') {
          console.log('permission allowed')
          await Location.startLocationUpdatesAsync('TRACKING', {
            accuracy: Location.Accuracy.BestForNavigation,
            /* timeInterval: 2000, */
            /* deferredUpdatesDistance: 3, */
            distanceInterval: 20
          })
        }
      }
    })()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitle: () => (
              <LogoTitle />
            ),
            headerLeft: () => (
              <View>
                <Text>Today: {Math.trunc(distance)} m</Text>
              </View>
            ),
            title: 'title',
            headerRight: () => (
              <Button
                type='outline'
                size='md'
                icon={{
                  name: 'gear',
                  type: 'font-awesome',
                  size: 20
                }}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={
                  async () => {
                    await AsyncStorage.clear()
                  }}
              />)
          }
          } />
        <Stack.Screen
          name='InputTaskScreen'
          component={InputTaskScreen}
          options={{ title: 'Edit Task' }} />

        <Stack.Screen
          name='Info'
          component={InfoScreen}
          initialParams={{ taskId: 0 }}
          options={({ navigation, route }) => ({
            title: 'Info task',
            headerRight: () => (
              <Button
                type='outline'
                size='md'
                icon={{
                  name: 'gear',
                  type: 'font-awesome',
                  size: 20
                }}
                onPress={() => {
                  navigation.navigate('InputTaskScreen', { editable: true, taskId: route.params.taskId })
                }}
              />)
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
