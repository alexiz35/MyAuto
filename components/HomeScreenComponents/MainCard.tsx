import { Text, View, StyleSheet, ImageBackground, Pressable, Alert, Vibration, ActivityIndicator } from 'react-native'
import { Badge, Dialog, Divider, Icon, Input } from '@rneui/themed'
import { BACK_CARD, COLOR_GREEN, CurrentMiles, initialStateInfo, StateInfo, TEXT_CARD, TEXT_WHITE } from '../../type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '../Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useEffect, useState } from 'react'
import { updateMiles } from '../Redux/actions'

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
  const infoCar: StateInfo = useAppSelector(state => (
    state.cars[state.numberCar].info === undefined
      ? initialStateInfo
      : state.cars[state.numberCar].info
  ))
  const currentMiles: CurrentMiles = useAppSelector(state => (
    state.cars[state.numberCar].currentMiles === undefined
      ? { currentMileage: 0, dateMileage: new Date() }
      : state.cars[state.numberCar].currentMiles
  ))
  const dispatch = useAppDispatch()

  const [visibleMileage, setVisibleMileage] = useState(false)
  const [isNeedUpdate, setIsNeedUpdate] = useState(false)
  const [valueMileage, setValueMileage] = useState<number>(0)
  const toggleMileage = (): void => {
    setVisibleMileage(!visibleMileage)
  }

  useEffect(() => {
    periodTimeMileage()
  }, [currentMiles])

  const periodTimeMileage = (): void => {
    const tempState = new Date(currentMiles.dateMileage)
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
    <ImageBackground source={require('../../assets/darkBack.jpg')} resizeMethod={'auto'} resizeMode={'cover'} >
      <Pressable style={styles.containerView} android_ripple={{ color: 'grey' }}
                 onPress={() => {
                   Vibration.vibrate(100)
                   navStack.navigate('CarInfoScreen')
                 }}>
        <Text style={styles.carText} >
          {`${infoCar.brand} ${infoCar.model}`}
          {<Icon
            style={{ marginHorizontal: 10 }}
            name='information-outline'
            size={17}
            type='material-community'
            color={'grey'}
          />}
        </Text>
        <Divider inset={true} insetType="middle" />
        <View style={styles.infoView}>
          <Pressable style={styles.kmView} onPress={() => {
            setValueMileage(currentMiles.currentMileage)
            setVisibleMileage(true)
          }}>
            <Icon
              style={{ marginHorizontal: 10 }}
              name='location-arrow'
              type='font-awesome'
              color={'grey'}
            />
            <View>
            <Text style={styles.kmText}>
              {String(currentMiles.currentMileage)}
            </Text>
              <Badge
                containerStyle={{ position: 'absolute', top: 2, left: 30 }}
                status={isNeedUpdate ? 'error' : 'success'}
              />
            </View>
          </Pressable>

          <Pressable style={styles.costView} onPress={() => navTab.navigate('StatScreen')}>
            <View style={styles.costTOView}>
            <Icon
              style={{ marginHorizontal: 10 }}
              name='car-wrench'
              type='material-community'
              color={'grey'}
            />
            <Text style={{
              fontSize: 16,
              color: 'grey'
            }}>
              22000 грн
            </Text>
            </View>
            <View style={styles.costFuelView}>
            <Icon
              style={{ marginHorizontal: 10 }}
              name='gas-station'
              type='material-community'
              color={'grey'}
            />
            <Text style={{
              fontSize: 16,
              color: 'grey'
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
    fontSize: 17,
    color: 'grey',
    textAlign: 'center'
    /* fontWeight: 'bold' */
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
    color: 'grey',
    textAlign: 'center'
    /* textShadowColor: COLOR_GREEN, */
    /* textShadowOffset: { height: 2, width: 2 }, */
    /* textShadowRadius: 10 */
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
