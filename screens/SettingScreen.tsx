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
import { CarsCard } from '../components/SettingScreenComponents/CarsCard'
import { SellersCard } from '../components/SettingScreenComponents/SellersCard'
import { ControlCard } from '../components/SettingScreenComponents/ControlCard'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>

// -------------------------------------------------------------------------------------------

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()

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
          <SellersCard/>
        {/*
         ************************** Car SWITCH  ******************************************
         */}
           <CarsCard/>
        {/*
         ************************** GOOGLE BACKUP  ******************************************
         */}
            <GoogleCard/>
        {/*
         ************************** ALARM BLOCK  ******************************************
         */}
            <ControlCard/>
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

export const stylesSettingScreen = StyleSheet.create({
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
