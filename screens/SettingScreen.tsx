import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../components/Navigation/TypeNavigation'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native'
import {
  Button,
  Text,
  Divider,
  Checkbox,
  Icon,
  IconButton,
  Card
} from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { type JSX, useCallback, useEffect, useState } from 'react'

import {
  changeAlarmPeriodNumber

} from '../components/Redux/actions'

import AsyncStorage from '@react-native-async-storage/async-storage'
import BackgroundView from '../CommonComponents/BackgroundView'
import { useAppTheme } from '../CommonComponents/Theme'
import {
  changeAlarmPeriod,
  changeAlarmStart,
  themeChanged
} from '../components/Redux/SettingSlice'
import {
  deletedAllSeller,
  deletedSeller
} from '../components/Redux/SellerSlice'
import { CarsList } from '../components/SettingScreenComponents/CarsList'
import { initialState } from '../components/Redux/store'
import { addedCar, initialStateCar } from '../components/Redux/CarsSlice'
import { changedNumberCar } from '../components/Redux/NumberCarSlice'
import { initialStateInfo } from '../type'
import { GoogleCard } from '../components/SettingScreenComponents/GoogleCard'
import { ThemeCard } from '../components/SettingScreenComponents/ThemeCard'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>

// -------------------------------------------------------------------------------------------

export const initialCarState = {
  info: initialStateInfo, // ok
  carId: 0,
  currentMiles: {
    currentMileage: 0,
    dateMileage: new Date()
  }, // ok
  fuel: [], // ok
  services: [],
  mileage: [], // ok
  parts: [], // ok
  others: [], // ok
  tasks: [] // ok
}

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()

  // ****************************** ADD NEW CAR *********************************
  const addNewCar = () => {
    const tempNewCar = Object.assign({}, initialStateCar[0])
    tempNewCar.carId = state.cars.length
    /* console.log('add',state.cars.length,tempNewCar) */
    dispatch(addedCar(tempNewCar))
    dispatch(changedNumberCar(tempNewCar.carId))
    navigation.navigate('CarInfoScreen')
  }
  // -----------------------------------------------------------------------------
  // ****************************** ALARM section *********************************

  const [checkAlarmStart, setCheckAlarmStart] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.alarmMileageStart ? 'checked' : 'unchecked')
  const [checkAlarmPeriod, setCheckAlarmPeriod] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.alarmMileagePeriod ? 'checked' : 'unchecked')
  const [checkAlarmPeriodNumber, setCheckAlarmPeriodNumber] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.alarmMileagePeriodNumber === 2 ? 'unchecked' : 'checked')
  const pressAlarm = (typeCheck: string): void => {
    switch (typeCheck) {
      case 'alarmStart':
        if (checkAlarmStart === 'checked') {
          setCheckAlarmStart('unchecked')
          dispatch(changeAlarmStart(false))
        } else if (checkAlarmStart === 'unchecked') {
          setCheckAlarmStart('checked')
          dispatch(changeAlarmStart(true))
        }
        break
      case 'alarmPeriod':
        if (checkAlarmPeriod === 'checked') {
          setCheckAlarmPeriod('unchecked')
          dispatch(changeAlarmPeriod(false))
        } else if (checkAlarmPeriod === 'unchecked') {
          setCheckAlarmPeriod('checked')
          dispatch(changeAlarmPeriod(true))
        }
        break
      case 'alarmPeriodNumber':
        if (checkAlarmPeriodNumber === 'checked') {
          setCheckAlarmPeriodNumber('unchecked')
          dispatch(changeAlarmPeriodNumber(2))
        } else if (checkAlarmPeriodNumber === 'unchecked') {
          setCheckAlarmPeriodNumber('checked')
          dispatch(changeAlarmPeriodNumber(1))
        }
        break
    }
  }

  return (
    <BackgroundView>
      <ScrollView
        nestedScrollEnabled={true}
        style={{ paddingHorizontal: 10, height: '100%' }}
      >
        {/*
         *************************** Change THEME ******************************************
         */}
          <ThemeCard/>
        {/*
         *************************** Seller List ******************************************
         */}
        <Card style={{ marginVertical: 5 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={styles.iconText}>
              <Icon source={'circle'} color={colors.tertiary} size={10} />
              <Button
                style={styles.text}
                onPress={() => { navigation.navigate('SellerScreen') }}
              >
                Список поставщиков
              </Button>
              <Button
                style={styles.text}
                onPress={() => dispatch(deletedAllSeller())}
              >
                RESET
              </Button>
            </View>
            <View style={{ paddingRight: 10 }}>
              {/* <IconButton icon={'theme-light-dark'} size={18} mode={'outlined'} onPress={toggleTheme} /> */}
              {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
            </View>
          </View>
        </Card>
        {/*
         ************************** Car SWITCH  ******************************************
         */}
        <Card style={{ marginVertical: 5 }}>
          <View style={styles.iconText}>
            <Icon source={'circle'} color={colors.tertiary} size={10} />
            <Text style={styles.text}>Мои машины</Text>
          </View>
          <Divider bold />

          <CarsList />
          <Divider horizontalInset />
          <Button onPress={() => { addNewCar() }}>Добавить машину</Button>
        </Card>
        {/*
         ************************** GOOGLE BACKUP  ******************************************
         */}
            <GoogleCard/>
        {/*
         ************************** ALARM BLOCK  ******************************************
         */}
        <Card style={{ marginVertical: 5 }}>
          <View style={styles.iconText}>
            <Icon source={'circle'} color={colors.tertiary} size={10} />
            <Text style={styles.text}>Контроль пробега</Text>
          </View>
          <Checkbox.Item
            status={checkAlarmStart}
            label={'Напоминание при входе в приложении'}
            onPress={() => { pressAlarm('alarmStart') }}
            labelVariant={'bodyMedium'}
          />
          <Divider horizontalInset />
          <Checkbox.Item
            status={checkAlarmPeriod}
            label={'Периодическое напоминание в фоне'}
            onPress={() => { pressAlarm('alarmPeriod') }}
            labelVariant={'bodyMedium'}
          />
          <Divider horizontalInset />
          <Checkbox.Item
            status={checkAlarmPeriodNumber}
            label={'Синхронизация пробега с авто'}
            onPress={() => { pressAlarm('alarmPeriodNumber') }}
            labelVariant={'bodyMedium'}
          />
        </Card>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <TouchableHighlight
          onPress={async () => {
            await AsyncStorage.clear()
          }}
        >
          <Text style={{ padding: 10, textAlign: 'center' }}>Сброс Redux</Text>
        </TouchableHighlight>
      </ScrollView>
    </BackgroundView>
  )
}
export default SettingScreen

const styles = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 5
  },
  viewText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
