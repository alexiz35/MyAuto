import 'react-native-gesture-handler'
import {
  NavigationContainer
}
  from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/HomeScreen'
import InputDoneScreen from '../../screens/InputDoneScreen'
import { Image, Platform, View } from 'react-native'
/* import * as TaskManager from 'expo-task-manager'
import haversineDistance from 'haversine-distance'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage' */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StatScreen from '../../screens/StatScreen'
import TaskScreen from '../../screens/TaskScreen'
/* import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs' */
import FuelScreen from '../../screens/FuelScreen'
/* import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { printToFile } from '../Print/Print'
import { current } from '@reduxjs/toolkit' */
import CarInfoScreen from '../../screens/CarInfoScreen'
import SettingScreen from '../../screens/SettingScreen'

import {
  useTheme,
  PaperProvider,
  Text,
  IconButton, Surface, TouchableRipple, Icon, Dialog, Portal
} from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../../CommonComponents/Theme'
import SellerScreen from '../../screens/SellerScreen'
import { PropsTab, RootStackParamList, RootTabParamList } from './TypeNavigation'
import { JSX, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { ModalPickNameCar } from '../CarInfoScreenComponents/ModalPickNameCar'
import { editedCarInfo, initialStateCar } from '../Redux/CarsSlice'

function LogoTitle (): JSX.Element {
  return (
    <Surface elevation={3} >
    <Image
      style={{
        width: 50,
        height: 50
      }}
      source={
        require('../../assets/renaultLogo2.png')
      }
    />
    </Surface>
  )
}

/* function MyButton (): JSX.Element {
  return (
    <View style={{ width: 100, marginRight: 20 }}>
      <Button title={'Set'} color='violet' onPress={() => alert('Hello')}/>
    </View>
  )
} */

/* -----------------------------    THEME   ---------------------------------- */

/* ----------------------------------------------------------------------------- */

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

export const Navigation = (): JSX.Element => {
  /* const state = useAppSelector(state =>state )
  const dispatch = useAppDispatch()
  dispatch(changedNumberCar(state.cars[0].carId)) */

  const BottomTabNav = ({ navigation }: PropsTab): JSX.Element => {
    /* void AsyncStorage.clear() */

    const theme = useTheme()
    const FabTab = (): any => null
    /* console.log('first', useAppSelector((state) => state)) */

    return (
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          /* tabBarActiveBackgroundColor: theme.colors.backdrop, */
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.secondary,
          tabBarStyle: { backgroundColor: theme.colors.background },
          tabBarIconStyle: { paddingVertical: 0 },
          tabBarLabelStyle: { fontSize: 14 },
          tabBarHideOnKeyboard: Platform.OS !== 'ios'
        }}
      >

        <Tab.Screen name={'Home'} component={HomeScreen}
                    options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ color, focused }) => (
                        <Icon
                          source={focused ? 'home' : 'home-outline'}
                          color={color}
                          size={focused ? 22 : 20}
                        />
                      )
                    }}
        />
        {
          // ------------------------Buy BotTab----------------------------------
        }
        <Tab.Screen name={'InputDoneScreen'} component={InputDoneScreen}
                    options={{
                      tabBarLabel: 'Buy',
                      tabBarIcon: ({ color, focused }) => (
                        <Icon
                          source={focused ? 'cart' : 'cart-outline'}
                          color={color}
                          size={focused ? 22 : 20}
                        />
                      )
                    }}
        />
        {
          // -----------------------Fuel BotTab----------------------------------
        }
        <Tab.Screen name={'Fuel'} component={FabTab}
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
                        <IconButton
                          mode={'contained'}
                          style={{
                            bottom: 35,
                            elevation: 5,
                            borderWidth: 5,
                            borderColor: theme.colors.primary,
                            backgroundColor: theme.colors.background,
                            height: 65,
                            width: 65
                          }}
                          /* containerStyle={{
                            borderWidth: 5,
                            borderColor: /!* 'rgba(68,67,67,0.49)' *!/ theme.colors.primary
                          }} */
                          icon={ 'gas-station'}
                          onPress={() => {
                            navigation.navigate('FuelScreen')
                            /* navigation.navigate('InputDoneScreen', { editable: false, typeTask: 0 }) */
                          }}
                        ></IconButton>
                      )
                    }}
        />
        {
// ---------------------------- TaskBotTab -------------------------------
        }
        <Tab.Screen name={'TaskScreen'} component={TaskScreen}
                    options={{
                      tabBarLabel: 'Tasks',
                      tabBarIcon: ({ color, focused }) => (
                        <Icon
                          source='calendar-check'
                          color={color}
                          size={focused ? 24 : 20}
                        />
                      )
                    }}
        />
        {
// ----------------------------Stat BotTab-------------------------------
        }
        <Tab.Screen name={'StatScreen'} component={StatScreen}
                    options={{
                      tabBarLabel: 'Statistic',
                      tabBarIcon: ({ color, focused }) => (
                        <Icon
                          source={focused ? 'chart-box' : 'chart-box-outline'}
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

  // ------------------------- Toggle Theme --------------------------------------
  const theme2 = useAppSelector(state => state.setting.themeSet)
  const theme = (theme2 === 'dark') ? CombinedDarkTheme : CombinedDefaultTheme

  /*  const toggleTheme = useCallback(() => {
    (theme2 === 'dark')
      ? dispatch(changeTheme('light'))
      : dispatch(changeTheme('dark'))
  }, [theme2]) */

  // -----------------------------------------------------------------------------
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
    <PaperProvider theme={theme}>
    <NavigationContainer >
      <Stack.Navigator screenOptions={ {
        headerTransparent: false,
        statusBarStyle: 'dark'

        /* headerRight: (navigation) => (
            <IconButton
              mode='outlined'
              rippleColor={theme.colors.primary}
              icon={'tune'}
              size={20}
              onPress={() => toggleTheme
                }/>
        ) */
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
          // @ts-expect-error typeBottomTabNav
          component={BottomTabNav}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: theme.colors.background },
            headerTitle: () => (
                  <TouchableRipple
                    onPress={() =>
                      navigation.navigate('SettingScreen')
                    }>
                    <LogoTitle />
                  </TouchableRipple>
            ),
            headerLeft: () => (
                  <View>
                    <Text >Today: {/* {Math.trunc(distance)} */} m</Text>
                  </View>
            ),
            headerRight: () => (
                <IconButton
                  style={{ borderRadius: 5 }}
                  mode='outlined'
                  rippleColor={theme.colors.primary}
                  icon={'tune'}
                  size={20}
                  onPress={() =>
                    navigation.navigate('SettingScreen')
                  }
                  />
            ),
            title: 'title'
          }
          )}
        />
   {/*      <Stack.Screen
          name='InputDoneScreen'
          component={InputDoneScreen}
          options={{
            headerStyle: { backgroundColor: theme.colors.background },
            title: 'Edit Task',
            headerTintColor: theme.colors.text
          }} /> */}
        {
// ------------------------------CarInfoScreen----------------------------------
        }
        <Stack.Screen
          name='CarInfoScreen'
          component={CarInfoScreen}
          options={{
            headerStyle: { backgroundColor: theme.colors.background },
            title: 'Car Info',
            headerTintColor: theme.colors.onBackground
          }} />
        {
  // ------------------------------SellerScreen--------------------------------
        }
        <Stack.Screen
          name='SellerScreen'
          component={SellerScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: theme.colors.background },
            title: 'Список поставщиков',
            headerTintColor: theme.colors.onBackground
            /*  headerRight: () => (
              <IconButton
                mode='outlined'
                rippleColor={theme.colors.primary}
                icon={'tune'}
                size={20}
                onPress={() =>
                  navigation.navigate('SettingScreen')
                }
              />
            ) */
          })} />
        {
  // ---------------------------------------------------------------------------
  // ------------------------------FuelScreen-----------------------------------
        }
        <Stack.Screen
          name='FuelScreen'
          component={FuelScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: theme.colors.background },
            title: 'Fuel',
            headerTintColor: theme.colors.onBackground,
            headerRight: () => (
              <IconButton
                style={{ borderRadius: 5 }}
                mode='outlined'
                rippleColor={theme.colors.primary}
                icon={'tune'}
                size={20}
                onPress={() =>
                  navigation.navigate('SettingScreen')
                }
              />
            )
          })} />
        {
// ----------------------------TaskPartScreen-------------------------------
        }
        {/* <Stack.Screen
          name='InputTaskPartScreen'
          component={InputTaskPartScreen}
          options={{
            title: 'Запланируйте покупку запчастей',
            headerTintColor: theme.colors.text
          }} /> */}
        {
// ----------------------------SettingScreen-------------------------------
        }
        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={{
            title: 'Setting',
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.onBackground
          }} />
        {
// ----------------------------InfoScreen-------------------------------
        }

        {/* <Stack.Screen
          name='Info'
          component={InfoScreen}
          initialParams={{ taskId: 0 }}
          options={({ navigation, route }) => ({
            title: 'Info task',
            headerTintColor: theme.colors.text,
            headerRight: () => (

                <Button
                type='outline'
                size='md'
                buttonStyle={{ borderColor: theme.colors.border }}
                icon={{
                  name: 'pencil',
                  type: 'material-community',
                  color: theme.colors.text,
                  size: 20
                }}
                onPress={() => {
                  navigation.navigate('InputDoneScreen', { editable: true, taskId: route.params.taskId })
                  console.log('navigate', route.params.taskId)
                }}
              />
            )
          })} /> */}
      </Stack.Navigator>

    </NavigationContainer>
    </PaperProvider>
  )
}

/* type PropsTab = NativeStackScreenProps<RootTabParamList, 'Home'> */
