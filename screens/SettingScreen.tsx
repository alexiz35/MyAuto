import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../components/Navigation/TypeNavigation'
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native'
import {
  Text
} from 'react-native-paper'
import { type JSX } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import BackgroundView from '../CommonComponents/BackgroundView'

import { GoogleCard } from '../components/SettingScreenComponents/GoogleCard'
import { ThemeCard } from '../components/SettingScreenComponents/ThemeCard'
import { CarsCard } from '../components/SettingScreenComponents/CarsCard'
import { SellersCard } from '../components/SettingScreenComponents/SellersCard'
import { ControlCard } from '../components/SettingScreenComponents/ControlCard'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>

// -------------------------------------------------------------------------------------------

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <BackgroundView>
      <ScrollView
        nestedScrollEnabled={true}
        style={{ paddingHorizontal: 10, height: '100%' }}
      >

          <ThemeCard/>

          <SellersCard/>

          <CarsCard/>

          <GoogleCard/>

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
