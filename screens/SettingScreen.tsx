import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../components/Navigation/TypeNavigation'
import {
  TouchableHighlight,
  ScrollView, Alert
} from 'react-native'
import {
  Button, Icon,
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
import { MileageCard } from '../components/SettingScreenComponents/MileageCard'
import { LangCard } from '../components/SettingScreenComponents/LangCard'
import { BackUpCard } from '../components/SettingScreenComponents/BackUpCard'
import { PremiumCard } from '../components/SettingScreenComponents/PremiumCard'
import { useTranslation } from 'react-i18next'
import { PDFCard } from '../components/SettingScreenComponents/PDFCard'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>

// -------------------------------------------------------------------------------------------

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const { t } = useTranslation()
  const pressReset = () => {
    Alert.alert(t('setting.alertReset.TITLE'), t('setting.alertReset.MESSAGE'),
      [{
        text: t('button.CANCEL')
      }, {
        text: t('button.OK'),
        onPress: async () => {
          await AsyncStorage.clear()
        }
      }])
  }

  return (
    <BackgroundView>
      <ScrollView
        nestedScrollEnabled={true}
        style={{ paddingHorizontal: 10, height: '100%' }}
      >
          <PremiumCard/>
          <ThemeCard/>
          <LangCard/>
        <PDFCard/>
          <SellersCard/>
          <MileageCard/>
          <CarsCard/>
          <BackUpCard/>
          <GoogleCard/>
          <ControlCard/>
          <Button
              onPress={pressReset}
              icon={() => <Icon source={'reload-alert'} size={25} color={'red'}/> }
            >
            RESET
            </Button>
      </ScrollView>
    </BackgroundView>
  )
}
export default SettingScreen
