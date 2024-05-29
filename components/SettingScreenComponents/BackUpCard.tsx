import { JSX, useEffect, useState } from 'react'
import { Button, Card, Divider, Icon, Text } from 'react-native-paper'
import { Alert, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useAppTheme } from '../../CommonComponents/Theme'
import * as WebBrowser from 'expo-web-browser'
import * as FileSystem from 'expo-file-system'

import { addedToken } from '../Redux/TokenSlice'
import { updateStateCars } from '../Redux/CarsSlice'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { updatedAllSeller } from '../Redux/SellerSlice'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'
import { updateSetting } from '../Redux/SettingSlice'
import { StateMain } from '../../type'

WebBrowser.maybeCompleteAuthSession()

// -------------------------------------------------------------------------------------------
export const NAME_FOLDER = 'devizCar'
export const NAME_FILE = 'devizCarBackup.json'

// -------------------------------------------------------------------------------------------

export const BackUpCard = (): JSX.Element => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  // ******************************************************************************

  const [fileExist, setFileExist] = useState<boolean>(false)

  // ******************************************************************************

  const saveStateToJSON = async (state: StateMain) => {
    try {
      const jsonState = JSON.stringify(state)
      const fileUri = FileSystem.documentDirectory + NAME_FILE
      await FileSystem.writeAsStringAsync(fileUri, jsonState, {
        encoding: FileSystem.EncodingType.UTF8
      })
      Alert.alert('Состояние сохранено')
    } catch (error) {
      Alert.alert('Ошибка при сохранении состояния:' + error)
    }
  }
  // ******************************************************************************
  const loadStateFromJSON = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + NAME_FILE
      const jsonState = await FileSystem.readAsStringAsync(fileUri)
      const state: StateMain = JSON.parse(jsonState)
      dispatch(updateSetting(state.setting))
      dispatch(addedToken(state.token))
      dispatch(updateStateCars(state.cars))
      dispatch(changedNumberCar(state.numberCar))
      dispatch(updatedAllSeller(state.sellerList))
      /* dispatch(updateState(getFile)) */
      Alert.alert('Import Successfully')
    } catch (error) {
      Alert.alert('Ошибка при загрузке состояния:' + error)
    }
  }
  // ******************** handler Press LogIn Button ****************************
  useEffect(() => {
    FileSystem.getInfoAsync(FileSystem.documentDirectory + NAME_FILE)
      .then(value => { setFileExist(value.exists) })
  }, [])
  // -------------------------- get USER INFO -------------------------------------------

  // -------------------------- get TOKEN -------------------------------------------

  // ******************** handler Press Export Button ***************************
  // ******************** handler Press Import Button ***************************
  // ****************************************************************************

  // ******************** handler Press LogOut Button ***************************
  // ******************** Get info Google User **********************/***********
  // ********************* Checking Auth status *********************************

  // ****************************************************************************

  return (
    <Card style={{ marginVertical: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Text style={stylesSettingScreen.text}>{t('setting.TITLE_BACKUP')}</Text>

        </View>

      </View>
      <Card.Content >
            <Button
              /* disabled={checkGoogle !== 'checked'} */
              onPress={() => {
                void saveStateToJSON(state)
                /* void promptAsync() */
              }}
            >
              {t('setting.SAVE_DATA')}
            </Button>
        <Divider horizontalInset />
            <Button
              disabled={!fileExist}

              onPress={() => {
                void loadStateFromJSON()
                /* void handleDeleteGoogleAuth() */
              }}
            >
              {t('setting.RECOVERY_DATA')}
            </Button>
      </Card.Content>

    </Card>
  )
}

/*
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
*/
