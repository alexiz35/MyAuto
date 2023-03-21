import { Text, View, StyleSheet, ImageBackground, Pressable, Alert, Vibration, ActivityIndicator } from 'react-native'
import { Dialog, Divider, Icon, Input } from '@rneui/themed'
import { BACK_CARD, COLOR_GREEN, CurrentMiles, TEXT_CARD, TEXT_WHITE } from '../type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from './Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from './Redux/hook'
import { useEffect, useState } from 'react'
import { updateMiles } from './Redux/actions'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'CarInfoScreen'
>
type ProfileTabNavigationProp = NativeStackNavigationProp<
RootTabParamList,
'StatScreen'
>

export const MainCard = (): JSX.Element => {
  const navStack = useNavigation<ProfileScreenNavigationProp>()
  const navTab = useNavigation<ProfileTabNavigationProp>()
  const state = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const [visibleMileage, setVisibleMileage] = useState(false)
  const [isNeedUpdate, setIsNeedUpdate] = useState(false)
  const [valueMileage, setValueMileage] = useState<number>(state.cars[state.numberCar].currentMiles.currentMileage)
  const toggleMileage = (): void => {
    setVisibleMileage(!visibleMileage)
  }

  useEffect(() => {
    periodTimeMileage()
  }, [state.cars[state.numberCar].currentMiles])

  const periodTimeMileage = (): void => {
    const tempState = new Date(state.cars[state.numberCar].currentMiles.dateMileage)
    if (tempState !== undefined) {
      const currentDate = new Date()
      if (currentDate.getFullYear() === (tempState.getFullYear())) {
        if (currentDate.getMonth() === tempState.getMonth()) {
          if ((currentDate.getDate() - tempState.getDate()) > 7) {
            setIsNeedUpdate(true)
          } else setIsNeedUpdate(false)
        } else setIsNeedUpdate(true)
      } else setIsNeedUpdate(true)
    }
  }

  return (
    <ImageBackground source={require('../assets/darkBack.jpg')} resizeMethod={'auto'} resizeMode={'cover'} >
      <Pressable style={styles.containerView} android_ripple={{ color: 'grey' }}
                 onPress={() => {
                   Vibration.vibrate(100)
                   navStack.navigate('CarInfoScreen')
                 }}>
        <Text style={styles.carText}>{state.cars[state.numberCar].info.brand} {state.cars[state.numberCar].info.model}</Text>
        <Divider inset={true} insetType="middle" />
        <View style={styles.infoView}>
          <Pressable style={styles.kmView} onPress={() => {
            setValueMileage(state.cars[state.numberCar].currentMiles.currentMileage)
            setVisibleMileage(true)
          }}>
            <Icon
              style={{ marginHorizontal: 10 }}
              name='location-arrow'
              type='font-awesome'
              color={TEXT_CARD}
            />
            <Text style={[styles.kmText, isNeedUpdate ? { textShadowColor: 'red' } : { textShadowColor: COLOR_GREEN }]}>
              {String(state.cars[state.numberCar].currentMiles.currentMileage)}
            </Text>
          </Pressable>

          <Pressable style={styles.costView} onPress={() => navTab.navigate('StatScreen')}>
            <View style={styles.costTOView}>
            <Icon
              style={{ marginHorizontal: 10 }}
              name='car-wrench'
              type='material-community'
              color={TEXT_CARD}
            />
            <Text style={{
              fontSize: 16,
              color: TEXT_CARD
            }}>
              22000 грн
            </Text>
            </View>
            <View style={styles.costFuelView}>
            <Icon
              style={{ marginHorizontal: 10 }}
              name='gas-station'
              type='material-community'
              color={TEXT_CARD}
            />
            <Text style={{
              fontSize: 16,
              color: TEXT_CARD
            }}>
              22000 грн
            </Text>
            </View>
          </Pressable>

          {/* <View style={{ position: 'relative', left: 0, flex: 0.5 }}>
            <Image source={require('../assets/renaultLogo2.png')} resizeMethod={'scale'} resizeMode={'cover'} style={{ height: 70, width: 70 }}/>
          </View> */}
          {/*  <Text style={{ fontSize: 16, color: TEXT_CARD }}>
                  Заправка: 22000 грн
                </Text> */}

        </View>
      </Pressable>
          <Dialog
            isVisible={visibleMileage}
            onBackdropPress={toggleMileage}
          >
            <Dialog.Title title="Input Mileage"/>

            <Dialog.Actions>
              <Input
                placeholder={'введите пробег'}
                placeholderTextColor={'gray'}
                /* inputStyle={styles.inputText} */
                errorMessage={'пробег, km'}
                errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                onChangeText={(value) => setValueMileage(Number(value))}
                keyboardType={'numeric'}
                value={String(valueMileage)}
              />
              <Dialog.Button title="CONFIRM" onPress={() => {
                const tempMileage: CurrentMiles = {
                  currentMileage: valueMileage,
                  dateMileage: new Date()
                }
                dispatch(updateMiles(state.numberCar, tempMileage))
                toggleMileage()
              }}
              />
              <Dialog.Button title="CANCEL" onPress={toggleMileage} />
            </Dialog.Actions>
          </Dialog>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  imgBack: {
    resizeMode: 'cover'
  },
  containerView: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 100,
    /* backgroundColor: BACK_CARD, */
    borderRadius: 10

  },
  carText: {
    color: TEXT_CARD,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  kmView: {
    paddingTop: 3,
    flex: 1
  },
  kmText: {
    fontSize: 16,
    color: TEXT_CARD,
    textAlign: 'center',
    textShadowColor: COLOR_GREEN,
    /* textShadowOffset: { height: 2, width: 2 }, */
    textShadowRadius: 10
  },
  costView: {
    flex: 1
  },
  costTOView: {
    flexDirection: 'row'
  },
  costFuelView: {
    flexDirection: 'row'
  }

})
