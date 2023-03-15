import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { Button, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { CheckBox, Divider, Icon } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { useEffect, useMemo, useState } from 'react'
import { COLOR_GREEN, TEXT_WHITE } from '../type'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { addToken } from '../components/Redux/actions'
import { deleteGoogleAuth, GDCreateFolder, getRefreshToken } from '../components/GoogleAPI'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>
WebBrowser.maybeCompleteAuthSession()

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const state = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const [token, setToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [auth, setAuth] = useState(!(state.token === ''))

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
        dispatch(addToken(response.authentication.refreshToken !== undefined
          ? response.authentication.refreshToken
          : ''
        ))
      }
      void getUserInfo()
    }
  }, [response, token])

  useEffect(() => {
    if (auth) {
      try {
        void getRefreshToken(state.token)
          .then((res) => setToken(res))
      } catch (error) {
        console.log('ERROR', error)
      }
    } else setUserInfo(null)
  }, [])

  useEffect(() => {
    console.log('useEff')
    void getUserInfo()
  }, [token])

  const getUserInfo = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const user = await response.json()
      if (response.ok) {
        setUserInfo(user)
      } else {
        setUserInfo(null)
      }
    } catch (error) {
      console.log('Нет связи с Google')
    }
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

  const GDCreateFileWithFolder = async (folderName: string, token: string): Promise<void> => {
    /*  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        /!* 'Upload-Type': 'media' *!/
      },
      body: JSON.stringify({
        name: 'MyFile.json',
        media: { hello: 'world' }
      })
    }
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files',
      requestOptions
    ) */

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
    console.log('createFile', user)
  }
  const GDgetList = async (token: string): Promise<void> => {
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    const user = await response.json()
    console.log('list', user)
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
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Подключить GoogleDisk для бэкапа</Text>
        </Pressable>
        {userInfo === null
          ? (
          <Button
            title="Sign in with Google"
            disabled={request == null}
            onPress={() => {
              void promptAsync()
            }}
          />
            )
          : (<View>
          <Text style={styles.text}>{userInfo.name}</Text>
          <Text style={styles.text}>{userInfo.email}</Text>
          </View>)}
        <Divider/>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Импорт данных</Text>
        <Button
          title="Refresh Token"
          disabled={request == null}
          onPress={() => {
            void getRefreshToken(state.token)
              .then((res) => setToken(res))
          }}
        />
        <Button
          title="Cancel Google"
          onPress={() => {
            void handleDeleteGoogleAuth()
          }}
        />
        <Button
          title="Create Folder"
          onPress={() => {
            GDCreateFolder('myAuto', token)
          }}
          />
        <Button
          title="Get List"
          onPress={() => {
            GDgetList(token)
          }}
        />
        <Button
          title="Create File"
          onPress={() => {
            GDCreateFileWithFolder('', token)
          }}
        />
        <Divider inset insetType={'middle'}/>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Экспорт данных</Text>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>{userInfo !== null ? userInfo.name : 'loading'}</Text>
        <Divider/>
        <View>
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Контроль пробега</Text>
        </View>
        <Divider />
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Контроль пробега</Text>

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
