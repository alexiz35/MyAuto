/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { View, StyleSheet, ImageBackground, ScrollView, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tasks } from '../components/HomeScreenComponents/Tasks'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { StateService, TEXT_WHITE } from '../type'
import { useCallback, useEffect, useState } from 'react'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import * as ScreenOrientation from 'expo-screen-orientation'

import { Shadow } from 'react-native-shadow-2'
import { MainCard } from '../components/HomeScreenComponents/MainCard'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native'
import { Orientation } from 'expo-screen-orientation'
import { Button } from '@rneui/themed'
import BackgroundView from '../CommonComponents/BackgroundView'

/* type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabNav'> */
export type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>

const HomeScreen = ({ navigation }: PropsTab): JSX.Element => {
  const setMiles = useAppDispatch()
  const cars = useAppSelector((state) => state)

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
  // ------------------------------------------------------------------------------

  useEffect(() => {
    /* setMiles(updateMiles(15)) */
    console.log('homelog', cars)
  }, [])

  return (
    <BackgroundView>
      <View style={(orientation < 3) ? styles.viewContainerVertical : styles.viewContainerHorizontal}>

        <Shadow stretch={true} distance={10} containerStyle={styles.containerMainCard}>
          <MainCard />
        </Shadow>
        {/* <Text style={{ color: TEXT_WHITE }}>{JSON.stringify(cars.cars[cars.numberCar].mileage)}</Text>
        <Text style={{ color: TEXT_WHITE }}>{JSON.stringify(cars.cars[cars.numberCar].currentMiles)}</Text> */}
        <View style={(orientation < 3) ? { flex: 3 } : { flex: 1.5 }}>
          {/* <Tasks /> */}
        </View>
      </View>
    </BackgroundView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  viewContainerHorizontal: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewContainerVertical: {
    flexDirection: 'column',
    height: '100%'
  },
  containerMainCard: {
    margin: 20,
    alignSelf: 'center',
    flex: 1,
    width: '80%'
  }
})

// eslint-disable-next-line no-lone-blocks
{ /*  <View style={styles.viewFab}>
        <FAB
          style={styles.fab}
          placement={'right'}
          icon={{ name: 'add', color: 'white' }}
          onPress={() => {
            navigation.navigate('InputTaskScreen', { editable: false })
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
