import 'react-native-gesture-handler'
import { CompositeScreenProps, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'

import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'

import HomeScreen from '../../screens/HomeScreen'
import InputTaskScreen from '../../screens/InputTaskScreen'
import { Alert, Image, Pressable, Text, View } from 'react-native'
import { Button, FAB, Icon, Switch, useThemeMode } from '@rneui/themed'
import { useEffect, useState } from 'react'
import * as TaskManager from 'expo-task-manager'
import haversineDistance from 'haversine-distance'
import * as Location from 'expo-location'
import InfoScreen from '../../screens/InfoScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BackgroundImage, color } from '@rneui/base'
import {
  BACK_CARD,
  BACK_TAB_BOTTOM,
  BACK_TAB_TOP,
  COLOR_GREEN,
  HEADER_TINT_COLOR,
  TEXT,
  TEXT_CARD,
  TEXT_WHITE
} from '../../type'
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StatScreen from '../../screens/StatScreen'
import PaperScreen from '../../screens/PaperScreen'
/* import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs' */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FuelScreen from '../../screens/FuelScreen'
import { Shadow } from 'react-native-shadow-2'
import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { printToFile } from '../Print/Print'
import { current } from '@reduxjs/toolkit'
import CarInfoScreen from '../../screens/CarInfoScreen'
import SettingScreen from '../../screens/SettingScreen'
import createStackNavigator, { StackScreenProps } from '@react-navigation/stack'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  BottomTabNav: NavigatorScreenParams<RootTabParamList>
  InputTaskScreen: { editable: boolean, taskId?: number, typeTask: number }
  Info: { taskId: number, typeTask: number }
  CarInfoScreen: undefined
  SettingScreen: undefined
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootTabParamList = {
  Home: undefined
  Fuel: undefined
  Null: undefined
  CarInfoScreen: undefined
  PaperScreen: undefined
  StatScreen: undefined
  InputTaskScreen: { editable: boolean, taskId?: number, typeTask: number }
}

function LogoTitle (): JSX.Element {
  return (
    <Shadow stretch={true}>
    <Image
      style={{
        width: 50,
        height: 50
      }}
      source={
        require('../../assets/renaultLogo2.png')
      }
    />
    </Shadow>
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
const Tab = createBottomTabNavigator<RootTabParamList>()
type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabNav'>

export const Navigation = (): JSX.Element => {
  const { mode, setMode } = useThemeMode()
  const toggle = () => {
    if (mode === 'dark') setMode('light')
    else setMode('dark')
  }
  /*  const [initial, setInitial] = useState(true)
  const [location, setLocation] = useState(0)
  const [prevCoords, setPrevCoords] = useState({ latitude: 0, longitude: 0 })
  const [newCoords, setNewCoords] = useState({ latitude: 0, longitude: 0 })
  const [distance, setDistance] = useState(0) */

  /*

 // --------------------------------backgroundTracking ---------------------------
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
  }) */

  /* useEffect(() => {
    void (async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync()
        if (backgroundStatus === 'granted') {
          console.log('permission allowed')
          await Location.startLocationUpdatesAsync('TRACKING', {
            accuracy: Location.Accuracy.BestForNavigation,
            /!* timeInterval: 2000, *!/
            /!* deferredUpdatesDistance: 3, *!/
            distanceInterval: 20
          })
        }
      }
    })()
  }, []) */

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={ {
        headerStyle: { backgroundColor: BACK_TAB_TOP },
        headerTransparent: false,
        statusBarStyle: 'dark'
      }}>
        {/* <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: BACK_CARD },
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
          } /> */}
        <Stack.Screen
          name='BottomTabNav'
          // @ts-expect-error jjj
          component={BottomTabNav}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: BACK_TAB_TOP },
            headerTitle: () => (
              /* <Pressable onPress={() => navigation.navigate('SettingScreen')}>
              <LogoTitle />
              </Pressable> */
              <Pressable onPress={() => toggle()}>
                <LogoTitle />
              </Pressable>

            ),
            headerLeft: () => (
              <View>
                <Text style={{ color: TEXT }}>Today: {/* {Math.trunc(distance)} */} m</Text>
              </View>
            ),
            title: 'title',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
              <Button
                type='outline'
                buttonStyle={{ marginRight: 3, width: 37, height: 37, paddingHorizontal: 0, borderColor: TEXT_WHITE }}
                size='md'
                icon={{
                  name: 'gear',
                  type: 'font-awesome',
                  size: 20,
                  color: TEXT_WHITE
                }}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={
                  async () => {
                    await AsyncStorage.clear()
                  }}
              />

              </View>
            )
          }
          )}
        />
        <Stack.Screen
          name='InputTaskScreen'
          component={InputTaskScreen}
          options={{
            title: 'Edit Task',
            headerTintColor: HEADER_TINT_COLOR
          }} />

        <Stack.Screen
          name='CarInfoScreen'
          component={CarInfoScreen}
          options={{
            title: 'Car Info',
            headerTintColor: HEADER_TINT_COLOR
          }} />

        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={{
            title: 'Setting',
            headerTintColor: HEADER_TINT_COLOR
          }} />

        <Stack.Screen
          name='Info'
          component={InfoScreen}
          initialParams={{ taskId: 0 }}
          options={({ navigation, route }) => ({
            title: 'Info task',
            headerTintColor: HEADER_TINT_COLOR,
            headerRight: () => (

                <Button
                type='outline'
                size='md'
                buttonStyle={{ borderColor: COLOR_GREEN }}
                icon={{
                  name: 'pencil',
                  type: 'material-community',
                  color: '#a2a2a2',
                  size: 20
                }}
                onPress={() => {
                  navigation.navigate('InputTaskScreen', { editable: true, taskId: route.params.taskId })
                }}
              />
            )
          })} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

/* type PropsTab = NativeStackScreenProps<RootTabParamList, 'Home'> */
type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>

const BottomTabNav = ({ navigation, route }: PropsTab): JSX.Element => {
  const FabTab = (): any => null

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: BACK_TAB_BOTTOM, paddingVertical: 5 },
        tabBarIconStyle: { paddingVertical: 0 },
        tabBarLabelStyle: { fontSize: 14 }
      }}
    >
      <Tab.Screen name={'Home'} component={HomeScreen}
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons
                        name={focused ? 'home' : 'home-outline'}
                        /* type='material-community' */
                        color={color}
                        size={focused ? 20 : 16}
                      />
                    )
                  }}
      />
      <Tab.Screen name={'Fuel'} component={FuelScreen}
                  options={{
                    tabBarLabel: 'Fuel',
                    tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons
                        name={focused ? 'gas-station' : 'gas-station-outline'}
                        /* type='material-community' */
                        color={color}
                        size={focused ? 22 : 20}
                      />
                    )
                  }}
      />
      <Tab.Screen name={'Null'} component={FabTab}
                  options={{
                    tabBarLabel: 'Fuel',
                    /* tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons
                        name={focused ? 'gas-station' : 'gas-station-outline'}
                        /!* type='material-community' *!/
                        color={color}
                        size={focused ? 22 : 20}
                      />
                    ), */
                    tabBarButton: () => (
                       <FAB
                      color={'black'}
                      style={{ marginBottom: 30, elevation: 5 }}
                      containerStyle={{
                        borderWidth: 1,
                        borderColor: 'rgba(68,67,67,0.49)'
                      }}
                      icon={{ name: 'add', color: 'white' }}
                      onPress={() => {
                        navigation.navigate('InputTaskScreen', { editable: false, typeTask: 1 })
                      }}
                    />

                    )
                  }}
      />
      <Tab.Screen name={'PaperScreen'} component={PaperScreen}
                  options={{
                    tabBarLabel: 'Paper',
                    tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons
                        name='cash'
                        /* type='material-community' */
                        color={color}
                        size={focused ? 26 : 22}
                      />
                    )
                  }}
      />
      <Tab.Screen name={'StatScreen'} component={StatScreen}
                  options={{
                    tabBarLabel: 'Statistic',
                    tabBarIcon: ({ color, focused }) => (
                          <Icon
                            name={focused ? 'chart-box' : 'chart-box-outline'}
                            type='material-community'
                            color={color}
                            size={focused ? 22 : 20}
                          />
                    )
                    /* tabBarButton: () => (<FAB style={{ marginBottom: 30 }}/>) */
                  }}
      />
    </Tab.Navigator>
  )
}
