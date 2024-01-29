import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
import { Alert, StyleSheet, TouchableHighlight, View, ScrollView } from 'react-native'
import { Button, Text, Divider, Checkbox, Icon, IconButton } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { JSX, useCallback, useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import {
  addToken,
  changeAlarmPeriodNumber,
  delAllSeller,
  updateState
} from '../components/Redux/actions'
import {
  deleteGoogleAuth,
  GDCreateFileJson,
  GDCreateFolder, GDFindFile, GDGetFile,
  GDGetUserInfo, GDUpdateFileJson,
  GDUserInfo,
  getRefreshToken
} from '../components/GoogleAccount/GoogleAPI'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BackgroundView from '../CommonComponents/BackgroundView'
import { useAppTheme } from '../CommonComponents/Theme'
import { changeAlarmPeriod, changeAlarmStart, themeChanged } from '../components/Redux/SettingSlice'
import { addedToken } from '../components/Redux/TokenSlice'
import { deletedAllSeller, deletedSeller } from '../components/Redux/SellerSlice'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>
WebBrowser.maybeCompleteAuthSession()

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const state = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState<GDUserInfo | null>(null)
  const [auth, setAuth] = useState(!(state.token === ''))
  const [idParent, setIdParent] = useState('')

  // ****************************** THEME change *********************************
  // ------------------------- Toggle Theme --------------------------------------
  const theme2 = useAppSelector(state => state.setting.themeSet)
  /* const [switchTheme, setSwitchTheme] = useState(false)
  const toggleSwitchTheme = (): void => {
    setSwitchTheme(!switchTheme)
    toggleTheme()
  } */
  /*   const theme = (theme2 === 'dark') ? CombinedDarkTheme : CombinedDefaultTheme */

  const toggleTheme = useCallback(() => {
    (theme2 === 'dark')
      ? dispatch(themeChanged('light'))
      : dispatch(themeChanged('dark'))
  }, [theme2])

  // -----------------------------------------------------------------------------
  // ****************************** ALARM section *********************************

  const [checkAlarmStart, setCheckAlarmStart] =
    useState<'checked' | 'unchecked' | 'indeterminate'>(state.setting.alarmMileageStart ? 'checked' : 'unchecked')
  const [checkAlarmPeriod, setCheckAlarmPeriod] =
    useState<'checked' | 'unchecked' | 'indeterminate'>(state.setting.alarmMileagePeriod ? 'checked' : 'unchecked')
  const [checkAlarmPeriodNumber, setCheckAlarmPeriodNumber] =
    useState<'checked' | 'unchecked' | 'indeterminate'>(state.setting.alarmMileagePeriodNumber === 2 ? 'unchecked' : 'checked')
  const pressAlarm = (typeCheck: string): void => {
    switch (typeCheck) {
      case 'alarmStart':
        if
        (checkAlarmStart === 'checked') {
          setCheckAlarmStart('unchecked')
          dispatch(changeAlarmStart(false))
        } else if (checkAlarmStart === 'unchecked') {
          setCheckAlarmStart('checked')
          dispatch(changeAlarmStart(true))
        }
        break
      case 'alarmPeriod':

        if
        (checkAlarmPeriod === 'checked') {
          setCheckAlarmPeriod('unchecked')
          dispatch(changeAlarmPeriod(false))
        } else if (checkAlarmPeriod === 'unchecked') {
          setCheckAlarmPeriod('checked')
          dispatch(changeAlarmPeriod(true))
        }
        break
      case 'alarmPeriodNumber':

        if
        (checkAlarmPeriodNumber === 'checked') {
          setCheckAlarmPeriodNumber('unchecked')
          dispatch(changeAlarmPeriodNumber(2))
        } else if (checkAlarmPeriodNumber === 'unchecked') {
          setCheckAlarmPeriodNumber('checked')
          dispatch(changeAlarmPeriodNumber(1))
        }
        break
    }
  }
  // ****************************** GOOGLE account *********************************
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '192692660431-2is6dth1j1d4c8j6mnfa91arctkgksnm.apps.googleusercontent.com',
    webClientId: '192692660431-ap31mf2uvvm1livb9lucg4h5lkpo3au5.apps.googleusercontent.com',
    expoClientId: '192692660431-ap31mf2uvvm1livb9lucg4h5lkpo3au5.apps.googleusercontent.com',

    scopes: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/drive.appdata',
      /* 'https://www.googleapis.com/auth/drive', */
      'https://www.googleapis.com/auth/drive.file'
    ],
    clientSecret: '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',
    responseType: 'code',
    // @ts-expect-error prompt
    prompt: 'consent',
    extraParams: {
      access_type: 'offline'
    },
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token'

  })

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication !== null) {
        setToken(response.authentication.accessToken)
        setAuth(true)
        dispatch(addedToken(response.authentication.refreshToken !== undefined
          ? response.authentication.refreshToken
          : ''
        ))
      }
    }
  }, [response, token])

  useEffect(() => {
    if (auth) {
      try {
        void getRefreshToken(state.token)
          .then((res) => {
            setToken(res)
            setAuth(true)
          })
      } catch (error) {
        console.log('ERROR refreshToken', error)
      }
    } else setUserInfo(null)
  }, [])

  useEffect(() => {
    if (token !== '') {
      void getUserInfo()
    }
  }, [token])

  const backup = async (): Promise<void> => {
    if (state.token !== '') {
      await GDFindFile('name=\'myAuto\' and mimeType = \'application/vnd.google-apps.folder\' and trashed = false ', token)
        .then(findFolders => {
          if (findFolders.files.length === 1) {
            // if the folder is found then starting to find the file
            // @ts-expect-error filesId
            const temp: string = findFolders.files[0] !== undefined ? findFolders.files[0].id : ''
            void GDFindFile('name=\'myAuto\' and' + ` '${temp}' in parents ` + 'and trashed = false ', token)
              .then(findFile => {
                if (findFile.files.length === 1) {
                  // if the file is found then update it
                  try {
                    // @ts-expect-error filesId
                    void GDUpdateFileJson(state, 'myAuto', findFile.files[0].id, token)
                    Alert.alert('Backup Successfully')
                  } catch (error) {
                    Alert.alert('Error Backup')
                  }
                } else {
                  // if the file isn't found then create new file
                  try {
                    // @ts-expect-error filesId
                    void GDCreateFileJson(state, 'myAuto', findFolders.files[0].id, token)
                    Alert.alert('Backup Successfully')
                  } catch (error) {
                    Alert.alert('Error Backup')
                  }
                }
              })
          } else {
            // if the folder isn't found then create new folder and file
            try {
              void GDCreateFolder('myAuto', token)
                .then(response => {
                  setIdParent(response.id)
                  void GDCreateFileJson(state, 'myAuto', response.id, token)
                  Alert.alert('Backup Successfully')
                })
            } catch (error) {
              Alert.alert('Error Backup')
            }
          }
        })
    } else {
      Alert.alert('Нужна авторизация')
      console.log('Нужна авторизация')
    }
  }
  const importData = async (): Promise<void> => {
    if (state.token !== '') {
      await GDFindFile('name=\'myAuto\' and mimeType = \'application/vnd.google-apps.folder\' and trashed = false ', token)
        .then(findFolders => {
          if (findFolders.files.length === 1) {
            // if the folder is found then starting to find the file
            // @ts-expect-error filesId
            const temp: string = findFolders.files[0] !== undefined ? findFolders.files[0].id : ''
            void GDFindFile('name=\'myAuto\' and' + ` '${temp}' in parents ` + 'and trashed = false ', token)
              .then(findFile => {
                if (findFile.files.length === 1) {
                  // if the file is found then update it
                  try {
                    // @ts-expect-error filesId
                    void GDGetFile(findFile.files[0].id, token)
                      .then(getFile => {
                        if (getFile !== undefined) {
                          dispatch(updateState(getFile))
                          Alert.alert('Import Successfully')
                          console.log('Import Successfully')
                        }
                      })
                  } catch (error) {
                    Alert.alert('Error Import')
                    console.log('Error Import')
                  }
                } else {
                  // if the file isn't found then create new file
                  console.log('File not find')
                  Alert.alert('File not find')
                }
              })
          } else {
            // if the folder isn't found then create new folder and file
            console.log('Folder not find')
            Alert.alert('Folder not find')
          }
        })
    } else {
      Alert.alert('Нужна авторизация')
      console.log('Нужна авторизация')
    }
  }
  const getUserInfo = async (): Promise<void> => {
    await GDGetUserInfo(token, 'name,email')
      .then(response => {
        if (response !== null) {
          setUserInfo(response)
        } else {
          setUserInfo(null)
        }
      })
  }
  const handleDeleteGoogleAuth = async (): Promise<void> => {
    const del = await deleteGoogleAuth(state.token)
    if (del) {
      setUserInfo(null)
      setAuth(false)
      dispatch(addedToken(''))
    } else {
      console.log('Повторите удаление')
    }
  }

  /* const handleCreateFile = async (): Promise<void> => {
    /!*
    const fileContent = JSON.stringify(state)// As a sample, upload a text file.
    const file = new Blob([fileContent], { type: 'application/json' })
    const metadata = {
      name: 'myAutoJson', // Filename at Google Drive
      mimeType: 'text/plain', // mimeType at Google Drive
      parents: ['1W9dNxbciIAChBzH-di0v4RmNJqVflhq3'] // Folder ID at Google Drive
    }

    const form = new FormData()
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
    form.append('file', file)

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
      method: 'POST',
      headers: new Headers({ Authorization: 'Bearer ' + token }),
      body: form
    })

    const user = await response.json()
    console.log('createFile', user) *!/

    void await GDCreateFileJson(state, 'rere', 'root', token)
      .then(res => {
        console.log(res)
      })
  } */
  // ******************************  *********************************

  return (
    <BackgroundView >
      <ScrollView nestedScrollEnabled={true} style={{ paddingHorizontal: 10, height: '100%' }}>
  {/*
  *************************** Change THEME ******************************************
  */}
        <Divider style={{ marginTop: 10 }} bold/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Text style={styles.text}>Переключение темы</Text>
        </View>
          <View style={{ paddingRight: 10 }}>
          <IconButton icon={'theme-light-dark'} size={18} mode={'outlined'} onPress={toggleTheme} />
          {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
          </View>
        </View>
  {/*
  *************************** Seller List ******************************************
  */}
        <Divider style={{ marginTop: 1 }} bold/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.iconText}>
            <Icon source={'circle'} color={colors.tertiary} size={10} />
            <Button style={styles.text} onPress={() => navigation.navigate('SellerScreen')}>Список поставщиков</Button>
            <Button style={styles.text} onPress={() => dispatch(deletedAllSeller())}>RESET</Button>
          </View>
          <View style={{ paddingRight: 10 }}>
            {/* <IconButton icon={'theme-light-dark'} size={18} mode={'outlined'} onPress={toggleTheme} /> */}
            {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
          </View>
        </View>
  {/*
  *************************** GOOGLE account ******************************************
  */}
        <Divider bold/>
        <View style={styles.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Text style={styles.text}>Мои машины</Text>
        </View>
         {
          state.cars.map((item, index) => (
            <View key={index} style={styles.viewText}>
            <Text >{item.info.model}</Text>
            <Divider/>
            </View>
          ))
        }
        <Divider horizontalInset/>
          <Button onPress={() => navigation.navigate('CarInfoScreen')}>
            Добавить машину
          </Button>
        <Divider bold/>
        <View style={styles.iconText}>

          <Icon source={'circle'} color={colors.tertiary} size={10} />
          {userInfo === null
            ? (
              <Text style={styles.text}>Подключить GoogleDisk для бэкапа</Text>
              )
            : (
              <Text style={styles.text}>{userInfo.name}</Text>
              )
          }
        </View>
        {!auth
          ? (
              <Button
                disabled={request == null}
                onPress={() => {
                  void promptAsync()
                }}
              >
                Log in with Google
              </Button>
            )
          : (
             <Button
              disabled={request == null}
              onPress={() => {
                void handleDeleteGoogleAuth()
              }}
             >
               Log Out from Google
             </Button>
            )
        }
        <Divider horizontalInset/>
        <Button onPress={() => { void importData() }} disabled={!auth}>
          Импорт данных
        </Button>
        {/* <Button
          title="Refresh Token"
          disabled={request == null}
          onPress={() => {
            void getRefreshToken(state.token)
              .then((res) => setToken(res))
          }}
        /> */}
        {/* <Button
          title="Cancel Google"
          onPress={() => {
            void handleDeleteGoogleAuth()
          }}
        /> */}
        {/* <Button
          title="Create Folder"
          onPress={() => {
            void GDCreateFolder('myAuto', token)
          }}
          /> */}
        {/* <Button
          title="Create File"
          onPress={() => {
            void handleCreateFile()
          }}
        /> */}
        {/* <Button
          title="Find File"
          onPress={() => {
            void GDFindFile('name=\'myAuto\' and mimeType = \'application/vnd.google-apps.folder\' and trashed = false ', token)
          }}
        /> */}
        {/* <Button
          title="BackUp"
          onPress={() => {
            void backup().then(() => console.log(idParent))
          }}
        /> */}
        {/* <Button
          title="Get File"
          onPress={() => {
            void importData()
          }}
        /> */}
        <Divider horizontalInset/>
        <Button onPress={() => { void backup() }} disabled={!auth}>
          Экспорт данных
        </Button>
        <Divider bold/>
        <View style={styles.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Text style={styles.text}>Контроль пробега</Text>
        </View>
        <Checkbox.Item status={checkAlarmStart} label={'Напоминание при входе в приложении'}
                       onPress={() => pressAlarm('alarmStart')} labelVariant={'bodyMedium'}/>
        <Divider horizontalInset/>
        <Checkbox.Item status={checkAlarmPeriod} label={'Периодическое напоминание в фоне'}
                       onPress={() => pressAlarm('alarmPeriod')} labelVariant={'bodyMedium'} />
        <Divider horizontalInset/>
        <Checkbox.Item status={checkAlarmPeriodNumber} label={'Синхронизация пробега с авто'}
                       onPress={() => pressAlarm('alarmPeriodNumber')} labelVariant={'bodyMedium'} />
        <Divider bold/>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <TouchableHighlight onPress={async () => {
          await AsyncStorage.clear()
        }}>
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
