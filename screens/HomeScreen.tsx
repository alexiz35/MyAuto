import { View, StyleSheet } from 'react-native'
// eslint-disable-next-line import/named
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { JSX, useCallback, useEffect, useState } from 'react'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/TypeNavigation'
import * as ScreenOrientation from 'expo-screen-orientation'

import { MainCard } from '../components/HomeScreenComponents/MainCard'
// eslint-disable-next-line import/named
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
// eslint-disable-next-line import/named
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native'
import { Orientation } from 'expo-screen-orientation'
import BackgroundView from '../CommonComponents/BackgroundView'
import { Dialog, Portal, Surface, Text } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import { TasksList } from '../components/TaskScreenComponents/TasksList'
import { ModalPickNameCar } from '../components/CarInfoScreenComponents/ModalPickNameCar'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { editedCarInfo, initialStateCar } from '../components/Redux/CarsSlice'
import * as Notifications from 'expo-notifications'
import { getIndexCar } from '../type'
import AsyncStorage from '@react-native-async-storage/async-storage'

/* type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabNav'> */
export type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>

const HomeScreen = ({ navigation }: PropsTab): JSX.Element => {
  const theme = useAppTheme()
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const [visibleNameCar, setVisibleNameCar] = useState(false)
  const [indexCar, setIndexCar] = useState<number>(getIndexCar(state.cars, state.numberCar))
  useCallback(() => {
    setIndexCar(getIndexCar(state.cars, state.numberCar))
  }, [])

  const cancelDialogNameCar = () => {

  }
  const okDialogNameCar = (nameCar: string) => {
    if (state.cars.length === 1 && state.cars[indexCar].info.nameCar === '') {
      const tempNewCar = { ...initialStateCar[0], info: { ...initialStateCar[0].info, nameCar } }

      dispatch(editedCarInfo({
        numberCar: state.numberCar,
        carInfo: tempNewCar.info
      }))
      setVisibleNameCar(false)
    }
  }

  // -----------------------------block orientation screen--------------------------
  const [orientation, setOrientation] = useState(0)

  const checkOrientation = async (): Promise<void> => {
    const orientation: Orientation = await ScreenOrientation.getOrientationAsync()
    setOrientation(orientation)
  }
  const handleOrientationChange = (): void => {
    void checkOrientation()
  }

  useFocusEffect(
    useCallback(() => {
      const subscription = ScreenOrientation.addOrientationChangeListener(
        handleOrientationChange
      )

      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription)
      }
    }, []))
  // --------------------------------------------

  const pressList = () => {
    return 1
  }
  // ----------------------------------

  useEffect(() => {
    /* setMiles(updateMiles(15)) */
    // First, set the handler that will cause the notification
    // to show the alert

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
      })
    })
    // Second, call the method

    /*    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
      },
      trigger: null,
    }); */
  }, [])

  // **************************** Block HomeScreen for input NameCar ***************************************************
  useFocusEffect(() => {
    if (state.cars.length === 1 && state.cars[0].info.nameCar === '') {
      setVisibleNameCar(true)
    }
  })
  // *******************************************************************************************************************

  return (
    <BackgroundView>
      <View style={(orientation < 3) ? styles.viewContainerVertical : styles.viewContainerHorizontal}>

          <View>
            <Surface
              style={[styles.containerMainCard, {
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.primary
              }]}
              elevation={4}
            >
              <MainCard />
            </Surface>
          </View>

        <View style={(orientation < 3) ? { flex: 4 } : { flex: 1.5 }}>
          <Text onPress={async () => await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Look at that notification',
              body: "I'm so proud of myself!",
              priority: Notifications.AndroidNotificationPriority.MAX
            },
            trigger: {
              hour: 16,
              minute: 0,
              repeats: true,
              weekday: 3
            }
          })} style={{ textAlign: 'center' }}> Current Task</Text>
          <Text onPress={async () => { await Notifications.cancelAllScheduledNotificationsAsync() }}>Cancel</Text>
          <TasksList handlePress={pressList} filterList={'last'}/>
        </View>

      </View>
      <Portal>
        <Dialog
          visible={visibleNameCar}
          dismissableBackButton
          onDismiss={cancelDialogNameCar}
        >
          <ModalPickNameCar mode={'new'} handlePressOk={okDialogNameCar} handlePressCancel={cancelDialogNameCar}/>
        </Dialog>
      </Portal>
    </BackgroundView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  viewContainerHorizontal: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  viewContainerVertical: {
    flexDirection: 'column',
    height: '100%',
    marginHorizontal: 20
  },
  containerMainCard: {
    margin: 20,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10
  }
})

// eslint-disable-next-line no-lone-blocks
{ /*  <View style={styles.viewFab}>
        <FAB
          style={styles.fab}
          placement={'right'}
          icon={{ name: 'add', color: 'white' }}
          onPress={() => {
            navigation.navigate('InputDoneScreen', { editable: false })
          }}
        />
        <FAB
          style={{ marginBottom: 70 }}
          placement={'right'}
          icon={{ name: 'save', color: 'white' }}
          onPress={() => { void printToFile() }}
        />
      </View> */ }

// eslint-disable-next-line no-lone-blocks
{ /* <MapView
        style={{ width: '100%', height: '50%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      /> */ }
