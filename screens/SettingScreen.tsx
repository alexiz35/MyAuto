import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { Alert, Button, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { CheckBox, Divider, Icon } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { useEffect, useState } from 'react'
import { BACK_OPACITY, COLOR_GREEN, TEXT_WHITE } from '../type'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { addToken, updateState } from '../components/Redux/actions'
import {
  deleteGoogleAuth,
  GDCreateFileJson,
  GDCreateFolder, GDFindFile, GDGetFile,
  GDGetUserInfo, GDUpdateFileJson,
  GDUserInfo,
  getRefreshToken
} from '../components/GoogleAPI'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>
WebBrowser.maybeCompleteAuthSession()

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const state = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState<GDUserInfo | null>(null)
  const [auth, setAuth] = useState(!(state.token === ''))
  const [idParent, setIdParent] = useState('')

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
        dispatch(addToken(response.authentication.refreshToken !== undefined
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
    console.log('useEff', auth)
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
      dispatch(addToken(''))
    } else {
      console.log('Повторите удаление')
    }
  }

  const handleCreateFile = async (): Promise<void> => {
    /*
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
    console.log('createFile', user) */

    void await GDCreateFileJson(state, 'rere', 'root', token)
      .then(res => {
        console.log(res)
      })
  }

  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1, paddingHorizontal: 10 }}>
        <Divider style={{ marginTop: 10 }}/>
        <View>
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Машины</Text>
        </View>
        <Divider />
        {
          state.cars.map((item, index) => (
            <View key={index} style={styles.viewText}>
            <Text style={styles.text}>{item.info.model}</Text>
            <Divider/>
            </View>
          ))
        }
        <Divider inset insetType={'middle'}/>
        <Pressable onPress={() => navigation.navigate('CarInfoScreen')}>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Добавить машину</Text>
        </Pressable>
        <Divider/>
        <Pressable >
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          {userInfo === null
            ? (
              <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Подключить GoogleDisk для бэкапа</Text>
              )
            : (
              <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>{userInfo.name}</Text>
              )
          }
        </Pressable>
        {!auth
          ? (
              <Button
                title="Log in with Google"
                disabled={request == null}
                onPress={() => {
                  void promptAsync()
                }}
              />
            )
          : (
             <Button
              title="Log Out from Google"
              disabled={request == null}
              onPress={() => {
                void handleDeleteGoogleAuth()
              }}
             />
            )
        }
        <Divider/>
        <Pressable onPress={() => { void importData() }} disabled={!auth} >
          <Text style={[{ padding: 10, textAlign: 'center' }, auth ? { color: TEXT_WHITE } : { color: 'grey' }]} >Импорт данных</Text>
        </Pressable>
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
        <Divider inset insetType={'middle'}/>
        <Pressable onPress={() => { void backup() }} disabled={!auth}>
          <Text style={[{ padding: 10, textAlign: 'center' }, auth ? { color: TEXT_WHITE } : { color: 'grey' }]}>Экспорт данных</Text>
        </Pressable>
        <Divider/>
        <View>
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Контроль пробега</Text>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Напоминание при входе в приложении</Text>
        <CheckBox containerStyle={{ backgroundColor: BACK_OPACITY, paddingVertical: 3 }} checked={true} checkedColor={COLOR_GREEN}/>
        </View>
        <Divider inset insetType={'middle'}/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Периодическое напоминание в фоне</Text>
          <CheckBox containerStyle={{ backgroundColor: BACK_OPACITY, paddingVertical: 3 }} checked={true} checkedColor={COLOR_GREEN}/>
        </View>
        <Divider inset insetType={'middle'}/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Синхронизация пробега с авто</Text>
          <CheckBox containerStyle={{ backgroundColor: BACK_OPACITY, paddingVertical: 3 }} checked={true} checkedColor={COLOR_GREEN}/>
        </View>
        <Divider inset insetType={'middle'}/>

      </ScrollView>
    </ImageBackground>
  )
}
export default SettingScreen

const styles = StyleSheet.create({
  viewText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: TEXT_WHITE
  }
})
