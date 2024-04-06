import 'react-native-gesture-handler'
import {
  NavigationContainer
}
  from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screens/HomeScreen'
import InputDoneScreen from '../../screens/InputDoneScreen'
import { Platform, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StatScreen from '../../screens/StatScreen'
import TaskScreen from '../../screens/TaskScreen'
import FuelScreen from '../../screens/FuelScreen'

import CarInfoScreen from '../../screens/CarInfoScreen'
import SettingScreen from '../../screens/SettingScreen'
import {
  PaperProvider,
  Text,
  IconButton, Icon
} from 'react-native-paper'
import { useAppSelector } from '../Redux/hook'
import { CombinedDarkTheme, CombinedDefaultTheme, useAppTheme } from '../../CommonComponents/Theme'
import SellerScreen from '../../screens/SellerScreen'
import { PropsTab, RootStackParamList, RootTabParamList } from './TypeNavigation'
import { JSX } from 'react'
import MileageScreen from '../../screens/MileageScreen'
import { LogoTitle } from './LogoTitle'
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

export const Navigation = (): JSX.Element => {
  // *********************** Picked Logo ********************************
  const { t } = useTranslation()
  // ******************************************************************************
  const BottomTabNav = ({ navigation }: PropsTab): JSX.Element => {
    /* void AsyncStorage.clear() */
    const { t } = useTranslation()

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
                      tabBarLabel: `${t('translation:BUY')}`,
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
                    }}
        />
      </Tab.Navigator>
    )
  }

  // ------------------------- Toggle Theme --------------------------------------
  const theme2 = useAppSelector(state => state.setting.themeSet)
  const theme = (theme2 === 'dark') ? CombinedDarkTheme : CombinedDefaultTheme

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
                    <LogoTitle/>
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
