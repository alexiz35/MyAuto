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
  PaperProvider,
  Text,
  IconButton, Surface, TouchableRipple, Icon
} from 'react-native-paper'
import { useAppSelector } from '../Redux/hook'
import { CombinedDarkTheme, CombinedDefaultTheme, useAppTheme } from '../../CommonComponents/Theme'
import SellerScreen from '../../screens/SellerScreen'
import { PropsTab, RootStackParamList, RootTabParamList } from './TypeNavigation'
import { JSX } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MileageScreen from '../../screens/MileageScreen'

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
  const BottomTabNav = ({ navigation }: PropsTab): JSX.Element => {
    /* void AsyncStorage.clear() */

    const theme = useAppTheme()
    const FabTab = (): null => null

    return (
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
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
                          icon={ 'gas-station'}
                          onPress={() => {
                            navigation.navigate('FuelScreen')
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
      }}>
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
  // ------------------------------ MileageScreen ------------------------------
        }
        <Stack.Screen
          name='MileageScreen'
          component={MileageScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: theme.colors.background },
            title: 'Список точек пробега',
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

      </Stack.Navigator>

    </NavigationContainer>
    </PaperProvider>
  )
}

/* type PropsTab = NativeStackScreenProps<RootTabParamList, 'Home'> */
