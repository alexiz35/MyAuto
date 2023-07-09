import { View, StyleSheet, Vibration } from 'react-native'
import { CurrentMiles, initialStateInfo, StateInfo } from '../../type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '../Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useEffect, useState } from 'react'
import { updateMiles } from '../Redux/actions'
import {
  TouchableRipple,
  Text,
  Button,
  Divider,
  useTheme,
  Portal,
  Dialog,
  TextInput
} from 'react-native-paper'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

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
  const { colors } = useTheme()
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
            {`${infoCar.brand} ${infoCar.model}`}
          </Button>
        <Divider horizontalInset />

        </View>
      </TouchableRipple>
      <View style={styles.infoView}>
        <TouchableRipple style={styles.kmView}
                         rippleColor={colors.primary}
                         onPress={() => {
                           setValueMileage(currentMiles.currentMileage)
                           setVisibleMileage(true)
                         }}>
          <>
            <Text style={{ textAlign: 'center' }}>Текущий пробег</Text>
            {isNeedUpdate && <Text style={{ textAlign: 'center', fontSize: 10, color: colors.error }}>Обновите пробег</Text>}

            <Button icon={({ size, color }) => (<Icon name='navigation-variant' size={22}
                    color={colors.onBackground}/>)} textColor={colors.onBackground} labelStyle={{ fontSize: 16 }}
            >
              {String(currentMiles.currentMileage) + ' km'}
            </Button>
          </>
        </TouchableRipple>

        <View style={styles.costView} >

          <Button icon={({ size, color }) => (<Icon name='car-wrench' size={20} color={colors.onBackground}/>)}
                  textColor={colors.onBackground} labelStyle={{ fontSize: 16 }} rippleColor={colors.primary}
                  onPress={() => { /* navTab.navigate('StatScreen') */ }}>
          2200 грн
          </Button>
          <Button icon={({ size }) => (<Icon name='gas-station' size={20} color={colors.onBackground}/>)}
                  textColor={colors.onBackground} labelStyle={{ fontSize: 16 }} rippleColor={colors.primary}
                  onPress={() => { /* navTab.navigate('StatScreen') */ }}>
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
            <Dialog.Title >Current Mileage</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label={'введите пробег'}
                maxLength={8}
                placeholder={'введите пробег'}
                right={<TextInput.Affix text="km" />}
                onChangeText={(value) => setValueMileage(Number(value))}
                keyboardType={'numeric'}
                value={String(valueMileage)}
              />
            </Dialog.Content>
              <Dialog.Actions >
                <Button onPress={toggleMileage}>Cancel</Button>
              <Button
                onPress={() => {
                  const tempMileage: CurrentMiles = {
                    currentMileage: valueMileage,
                    dateMileage: new Date()
                  }
                  dispatch(updateMiles(state.numberCar, tempMileage))
                  toggleMileage()
                }}
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
    /* backgroundColor: BACK_CARD, */
    /* borderRadius: 10, */
    padding: 7

  },
  carText: {
    fontSize: 17,
    /* color: 'grey', */
    textAlign: 'center'
    /* fontWeight: 'bold' */
  },
  infoView: {
    justifyContent: 'space-between',
    flexDirection: 'row'
    /* marginTop: 2, */
    /* padding: 7 */
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
