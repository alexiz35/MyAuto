import { View, StyleSheet, Vibration } from 'react-native'
import { CurrentMiles, getIndexCar, initialStateInfo, StateInfo } from '../../type'
/* import { NativeStackNavigationProp } from '@react-navigation/native-stack' */
import { RootStackParamList, RootTabParamList } from '../Navigation/TypeNavigation'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { JSX, useCallback, useEffect, useState } from 'react'
import {
  TouchableRipple,
  Text,
  Button,
  Divider,
  Portal,
  Dialog,
  TextInput, HelperText
} from 'react-native-paper'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useAppTheme } from '../../CommonComponents/Theme'
import { addedCurrentMiles } from '../Redux/CarsSlice'
// eslint-disable-next-line import/named
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  const { colors } = useAppTheme()
  const numberCar = useAppSelector(state => state.numberCar)
  const state = useAppSelector(state => state)
  const [indexCar, setIndexCar] = useState<number>(getIndexCar(state.cars, numberCar))

  const infoCar: StateInfo = useAppSelector(state => (
    state.cars[indexCar].info === undefined
      ? initialStateInfo
      : state.cars[indexCar].info
  ))
  const currentMiles: CurrentMiles = useAppSelector(state => (
    state.cars[indexCar].currentMiles === undefined
      ? { currentMileage: 0, dateMileage: new Date() }
      : state.cars[indexCar].currentMiles
  ))
  const dispatch = useAppDispatch()

  const [visibleMileage, setVisibleMileage] = useState(false)
  const [isNeedUpdate, setIsNeedUpdate] = useState(false)
  const [valueMileage, setValueMileage] = useState<number>(currentMiles.currentMileage)
  const [errorInput, setErrorInput] = useState(false)
  const toggleMileage = (): void => {
    setVisibleMileage(!visibleMileage)
  }

  useEffect(() => {
    setIndexCar(getIndexCar(state.cars, numberCar))
  }, [numberCar])

  useEffect(() => {
    periodTimeMileage()
  }, [currentMiles])

  /* useFocusEffect(() => {

  }, [currentMiles, infoCar]) */

  /* useEffect(() => {
    setVisibleMileage(true)
  }, [isNeedUpdate]) */

  const checkFirstRun = async () => {
    try {
      await AsyncStorage.getItem('isStart')
        .then(
          (isStart) => {
            if (
              state.setting.alarmMileageStart &&
              isStart === 'false' &&
              state.cars[0].info.nameCar !== ''
            ) {
              void AsyncStorage.setItem('isStart', 'true')
              setVisibleMileage(true)
            }
          }
        )
      // value previously stored
    } catch (e) {
      console.log('ERROR_GET_ASYNCDATA', e)
      // error reading value
    }
  }

  useEffect(
    () => {
      if (currentMiles.currentMileage === 0) {
        if (infoCar.buyMileage !== 0) {
          setValueMileage(infoCar.buyMileage)
        } else setValueMileage(0)
      } else setValueMileage(currentMiles.currentMileage)
    }, [currentMiles, infoCar.buyMileage])

  useFocusEffect(
    useCallback(() => {
      void checkFirstRun()

      if (state.setting.alarmMileagePeriod) {
        periodTimeMileage()
      }
    }, []))

  // period alarm to update mileage
  const periodTimeMileage = (): void => {
    const tempState = new Date(currentMiles.dateMileage)
    if (tempState !== undefined) {
      const currentDate = new Date()
      if (currentDate.getFullYear() === (tempState.getFullYear())) {
        if (currentDate.getMonth() === tempState.getMonth()) {
          if ((currentDate.getDate() - tempState.getDate()) > 0) {
            setIsNeedUpdate(true)
          } else setIsNeedUpdate(false)
        } else {
          setIsNeedUpdate(true)
        }
      } else {
        setIsNeedUpdate(true)
      }
    }
  }

  const handlePressOkMileage = (): void => {
    if (currentMiles.currentMileage < valueMileage) {
      const tempMileage: CurrentMiles = {
        currentMileage: valueMileage,
        dateMileage: new Date()
      }
      dispatch(addedCurrentMiles({ numberCar, currentMiles: tempMileage }))
      setErrorInput(false)
      setVisibleMileage(false)
      // toggleMileage()
    } else setErrorInput(true)
  }
  const handleCancelMileage = (): void => {
    setVisibleMileage(false)
    setErrorInput(false)
  }

  return (
    /* <ImageBackground source={require('../../assets/whiteBack2.jpg')} resizeMethod={'auto'} resizeMode={'cover'} > */
    <View>

    <View>
      <TouchableRipple style={styles.containerView}
                       rippleColor={colors.primary}
                 onPress={() => {
                   Vibration.vibrate(100)
                   navStack.navigate('CarInfoScreen')
                 }}>
        <View >
          <Button icon={'information-outline'} uppercase textColor={colors.onBackground}>
            {infoCar.nameCar}
          </Button>
        <Divider horizontalInset />

        </View>
      </TouchableRipple>
      <View style={styles.infoView}>
        <TouchableRipple style={styles.kmView}
                         rippleColor={colors.primary}
                         onPress={() => {
                           setVisibleMileage(true)
                         }}>
          <>
            <Text style={{ textAlign: 'center' }}>Текущий пробег</Text>
            {isNeedUpdate && <Text style={{ textAlign: 'center', fontSize: 10, color: colors.error }}>Обновите пробег</Text>}

            <Button icon={({ size, color }) => (<Icon name='navigation-variant' size={22}
                    color={colors.onBackground}/>)} textColor={colors.onBackground} labelStyle={{ fontSize: 16 }}
            >
              {String(valueMileage) + ' km'}
            </Button>
          </>
        </TouchableRipple>

        <View style={styles.costView} >

          <Button icon={({ size, color }) => (<Icon name='car-wrench' size={20} color={colors.onBackground}/>)}
                  textColor={colors.onBackground} labelStyle={{ fontSize: 16 }} rippleColor={colors.primary}
                  onPress={() => { navTab.navigate('InputDoneScreen', { editable: false, typeTask: 'part' }) }}>
          2200 грн
          </Button>
          <Button icon={({ size }) => (<Icon name='gas-station' size={20} color={colors.onBackground}/>)}
                  textColor={colors.onBackground} labelStyle={{ fontSize: 16 }} rippleColor={colors.primary}
                  onPress={() => { navStack.navigate('FuelScreen') }}>
            2200 грн
          </Button>

        </View>

        {/* <View style={{ position: 'relative', left: 0, flex: 0.5 }}>
            <Image source={require('../assets/renaultLogo2.png')} resizeMethod={'scale'} resizeMode={'cover'} style={{ height: 70, width: 70 }}/>
          </View> */}
        {/*  <Text style={{ fontSize: 16, color: TEXT_CARD }}>
                  Заправка: 22000 грн
                </Text> */}

      </View>
    </View>
      <Portal>
      <Dialog
            visible={visibleMileage}
            onDismiss={toggleMileage}
          >
            <Dialog.Title >Обновите пробег</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label={'введите пробег'}
                maxLength={8}
                placeholder={'введите пробег'}
                right={<TextInput.Affix text="km" />}
                onChangeText={(value) => { setValueMileage(Number(value)) }}
                keyboardType={'numeric'}
                value={String(valueMileage === 0 ? '' : valueMileage)}
                error={errorInput}
              />
              <HelperText type="error" visible={errorInput}>
                Пробег меньше текущего!
              </HelperText>
            </Dialog.Content>
              <Dialog.Actions >
                <Button onPress={handleCancelMileage}>Cancel</Button>
              <Button
                onPress={() => { handlePressOkMileage() }}
                >Ok
              </Button>

              </Dialog.Actions>
          </Dialog>

      </Portal>
    </View>

  )
}

const styles = StyleSheet.create({
  imgBack: {
    resizeMode: 'cover'
  },
  containerView: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 7

  },
  carText: {
    fontSize: 17,
    textAlign: 'center'
  },
  infoView: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  kmView: {
    paddingTop: 3,
    flex: 1,
    justifyContent: 'center'
  },
  kmText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
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
