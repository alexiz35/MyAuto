import { View, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { useCallback, useEffect, useState } from 'react'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import * as ScreenOrientation from 'expo-screen-orientation'

import { MainCard } from '../components/HomeScreenComponents/MainCard'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native'
import { Orientation } from 'expo-screen-orientation'
import BackgroundView from '../CommonComponents/BackgroundView'
import { Surface, Text } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import { TasksList } from '../components/TaskScreenComponents/TasksList'

/* type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabNav'> */
export type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>

const HomeScreen = ({ navigation }: PropsTab): JSX.Element => {
  const setMiles = useAppDispatch()
  const theme = useAppTheme()
  /* const cars = useAppSelector((state) => state) */

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
  }, [])

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
          <Text style={{ textAlign: 'center' }}> Current Task</Text>
          <TasksList handlePress={pressList} filterList={'last'}/>
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
