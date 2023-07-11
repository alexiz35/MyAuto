import 'react-native-gesture-handler'
import {
  CompositeScreenProps, NavigationContainer, NavigatorScreenParams,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
}
  from '@react-navigation/native'

import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'

import HomeScreen from '../../screens/HomeScreen'
import InputDoneScreen from '../../screens/InputDoneScreen'
import { Alert, Image, Pressable, View } from 'react-native'
import { FAB, Icon, Switch, useThemeMode } from '@rneui/themed'
import { useCallback, useEffect, useState } from 'react'
import * as TaskManager from 'expo-task-manager'
import haversineDistance from 'haversine-distance'
import * as Location from 'expo-location'
import InfoScreen from '../../screens/InfoScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BackgroundImage, color } from '@rneui/base'

import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StatScreen from '../../screens/StatScreen'
import TaskScreen from '../../screens/TaskScreen'
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
import InputTaskPartScreen from '../TaskScreenComponents/InputTaskPartScreen'

import {
  useTheme,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
  Button,
  Text,
  IconButton, Surface, TouchableRipple
} from 'react-native-paper'
import merge from 'deepmerge'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  BottomTabNav: NavigatorScreenParams<RootTabParamList>
  InputDoneScreen: { editable: boolean, taskId?: number, typeTask: number }
  Info: { taskId: number, typeTask: number }
  CarInfoScreen: undefined
  SettingScreen: undefined
  InputTaskPartScreen: undefined
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootTabParamList = {
  Home: undefined
  Fuel: undefined
  Null: undefined
  CarInfoScreen: undefined
  InputTaskPartScreen: undefined
  Tasks: undefined
  StatScreen: undefined
  InputDoneScreen: { editable: boolean, taskId?: number, typeTask: number }
}

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

/* ----------------------------------------------------------------------------- */
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
})

const CombinedDefaultThemeBase = merge(MD3LightTheme, LightTheme)
const CombinedDarkThemeBase = merge(MD3DarkTheme, DarkTheme)
const CombinedDefaultTheme = {
  ...CombinedDefaultThemeBase,
  colors: {
    ...CombinedDefaultThemeBase.colors,
    tertiary: 'rgb(46, 108, 0)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(128, 255, 44)',
    onTertiaryContainer: 'rgb(9, 33, 0)'
  }
}
const CombinedDarkTheme = {
  ...CombinedDarkThemeBase,
  colors: {
    ...CombinedDarkThemeBase.colors,
    tertiary: 'rgb(103, 225, 0)',
    onTertiary: 'rgb(21, 56, 0)',
    tertiaryContainer: 'rgb(33, 81, 0)',
    onTertiaryContainer: 'rgb(128, 255, 44)',
    error: 'rgb(186, 26, 26)'
  }
}
/* ----------------------------------------------------------------------------- */

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()
type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabNav'>

export const Navigation = (): JSX.Element => {
  const { mode, setMode } = useThemeMode()
  /* const { theme } = useTheme() */

  const [isThemeDark, setIsThemeDark] = useState(false)

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark)
  }, [isThemeDark])

  /* const toggle = (): void => {
    if (mode === 'dark') setMode('light')
    else setMode('dark')
  } */
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
        /* headerStyle: { backgroundColor: theme.colors.background }, // BACK_TAB_TOP */
        headerTransparent: false,
        statusBarStyle: 'dark',
        headerRight: () => (
            <IconButton
              mode='outlined'
              rippleColor={theme.colors.primary}
              icon={'theme-light-dark'}
              size={20}
              onPress={() => {
                toggleTheme()
              }}/>

        )
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
            headerStyle: { backgroundColor: theme.colors.background },
            headerTitle: () => (
              /* <Pressable onPress={() => navigation.navigate('SettingScreen')}>
              <LogoTitle />
              </Pressable> */

              <TouchableRipple
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={() =>
                  navigation.navigate('InputTaskPartScreen')
                /* async () => {
                  await AsyncStorage.clear()
                } */}>
                <LogoTitle />
              </TouchableRipple>

            ),
            headerLeft: () => (
              <View>
                <Text >Today: {/* {Math.trunc(distance)} */} m</Text>
              </View>
            ),
            title: 'title'
            /* headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
              <Button
                type='outline'
                buttonStyle={{ marginRight: 3, width: 37, height: 37, paddingHorizontal: 0, borderColor: theme.colors.border }}
                size='md'
                icon={{
                  name: 'theme-light-dark',
                  type: 'material-community',
                  size: 20,
                  color: theme.colors.text
                }}
                onPress={
                  () => {
                    toggleTheme()
                  }}
              />

              </View>
            ) */
          }
          )}
        />
        <Stack.Screen
          name='InputDoneScreen'
          component={InputDoneScreen}
          options={{
            title: 'Edit Task',
            headerTintColor: theme.colors.text,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  type='outline'
                  buttonStyle={{ marginRight: 3, width: 37, height: 37, paddingHorizontal: 0, borderColor: theme.colors.border }}
                  size='md'
                  icon={{
                    name: 'theme-light-dark',
                    type: 'material-community',
                    size: 20,
                    color: theme.colors.text
                  }}
                  onPress={
                    () => {
                      toggleTheme()
                    }}
                />

              </View>
            )
          }} />

        <Stack.Screen
          name='CarInfoScreen'
          component={CarInfoScreen}
          options={{
            title: 'Car Info',
            headerTintColor: theme.colors.text
          }} />

        <Stack.Screen
          name='InputTaskPartScreen'
          component={InputTaskPartScreen}
          options={{
            title: 'Запланируйте покупку запчастей',
            headerTintColor: theme.colors.text
          }} />

        <Stack.Screen
          name='SettingScreen'
          component={SettingScreen}
          options={{
            title: 'Setting',
            headerTintColor: theme.colors.text
          }} />

        <Stack.Screen
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
          })} />
      </Stack.Navigator>

    </NavigationContainer>
    </PaperProvider>
  )
}

/* type PropsTab = NativeStackScreenProps<RootTabParamList, 'Home'> */
type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>

const BottomTabNav = ({ navigation, route }: PropsTab): JSX.Element => {
  const theme = useTheme()
  const FabTab = (): any => null
  /* const Tab = createMaterialBottomTabNavigator() */

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
     /*  barStyle={{ backgroundColor: theme.colors.background }} */
      /* activeColor={theme.colors.onBackground} */
      /* inactiveColor={theme.colors.secondary} */

      screenOptions={{
        headerShown: false,
        /* tabBarActiveBackgroundColor: theme.colors.backdrop, */
        tabBarActiveTintColor: theme.colors.primary, // 'white',
        tabBarInactiveTintColor: theme.colors.secondary, // 'gray',
        tabBarStyle: { backgroundColor: theme.colors.background }, // BACK_TAB_BOTTOM
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
                      color= {theme.colors.background} // {'black'}
                      style={{ marginBottom: 30, elevation: 5 }}
                      containerStyle={{
                        borderWidth: 5,
                        borderColor: /* 'rgba(68,67,67,0.49)' */ theme.colors.primary
                      }}
                      icon={{ name: 'add', color: theme.colors.primary }}
                      onPress={() => {
                        navigation.navigate('InputDoneScreen', { editable: false, typeTask: 0 })
                      }}
                    />

                    )
                  }}
      />
      <Tab.Screen name={'Tasks'} component={TaskScreen}
                  options={{
                    tabBarLabel: 'Tasks',
                    tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons
                        name='calendar-check'
                        /* type='material-community' */
                        color={color}
                        size={focused ? 24 : 20}
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
