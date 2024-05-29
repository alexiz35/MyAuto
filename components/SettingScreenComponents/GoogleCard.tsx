import { JSX, useEffect, useState } from 'react'
import { Button, Card, Checkbox, Divider, Icon, Surface, Text } from 'react-native-paper'
import { Alert, Image, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useAppTheme } from '../../CommonComponents/Theme'
import * as WebBrowser from 'expo-web-browser'
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin'
import { setGoogle, updateSetting } from '../Redux/SettingSlice'
import {
  deleteGoogleAuth,
  GDCreateFileJson,
  GDCreateFolder,
  GDFindFile, GDGetFile,
  GDGetUserInfo,
  GDUpdateFileJson
} from '../GoogleAccount/GoogleAPI'
import { addedToken } from '../Redux/TokenSlice'
import { updateStateCars } from '../Redux/CarsSlice'
import { changedNumberCar } from '../Redux/NumberCarSlice'
import { updatedAllSeller } from '../Redux/SellerSlice'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'

WebBrowser.maybeCompleteAuthSession()

// -------------------------------------------------------------------------------------------
export const NAME_FOLDER = 'devizCar'
export const NAME_FILE = 'devizCarBackup'

// -------------------------------------------------------------------------------------------
type ErrorWithCode = Error & { code?: string }

export const GoogleCard = (): JSX.Element => {
  const state = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  // ******************************************************************************

  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [auth, setAuth] = useState(!(state.token === ''))
  const [idParent, setIdParent] = useState('')

  // ******************************************************************************
  const [checkGoogle, setCheckGoogle] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.isGoogle ? 'checked' : 'unchecked')

  const pressCheckGoogle = () => {
    if (checkGoogle === 'checked') {
      setCheckGoogle('unchecked')
      dispatch(setGoogle(false))
    } else if (checkGoogle === 'unchecked') {
      setCheckGoogle('checked')
      dispatch(setGoogle(true))
    }
  }

  // ******************************************************************************

  GoogleSignin.configure({
    offlineAccess: true,
    webClientId: '879173884588-t74ch2ub0vkp46bb6bh0bke959kj409g.apps.googleusercontent.com',
    /* forceCodeForRefreshToken: true, */
    scopes: [
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file'
    ]
  })
  // ******************** handler Press LogIn Button ****************************
  const handleGoogleIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      await GoogleSignin.signIn()
      const tempUserInfo =
      // -------------------------- get USER INFO -------------------------------------------
        getCurrentUser()
          .then((user) => { setUserInfo(user) })
          .catch((error) => { console.log('ERROR_USER', error) })
      // -------------------------- get TOKEN -------------------------------------------
      const tempToken = await GoogleSignin.getTokens()
      setToken(tempToken.accessToken)
      dispatch(addedToken(tempToken.accessToken))
      setAuth(true)
    } catch (error) {
      console.log('ERROR', error)
      const typedError = error as ErrorWithCode
      console.log('ERROR', typedError)

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          console.log('error_Cancel')

          break
        case statusCodes.IN_PROGRESS:
          console.log('error_IN_PROGRESS')
          // kjkj
          // operation ( sign in) already in progress
          break
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('error_PLAY_SERVICES_NOT_AVAILABLE')

          // play services not available or outdated
          break
        default:
        // some other error happened
      }
    }
  }

  /* useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication !== null) {
        setToken(response.authentication.accessToken)
        setAuth(true)
        dispatch(
          addedToken(
            response.authentication.refreshToken !== undefined
              ? response.authentication.refreshToken
              : ''
          )
        )
      }
    }
  }, [response, token]) */
  /* useEffect(() => {

    if (isSignedIn) {
      if (auth) {
        try {
          void getRefreshToken(state.token).then((res) => {
            setToken(res)
            setAuth(true)
          })
        } catch (error) {
          console.log('ERROR refreshToken', error)
        }
      } else setUserInfo(null)
    }
  }, []) */
  /*  useEffect(() => {
    if (token !== '') {
      void getUserInfo()
    }
  }, [token]) */
  // ******************** handler Press Export Button ***************************
  const backup = async (): Promise<void> => {
    if (token !== '') {
      await GDFindFile(
        `name='${NAME_FOLDER}' and mimeType = \'application/vnd.google-apps.folder\' and trashed = false`,
        token
      ).then((findFolders) => {
        if (findFolders.files.length === 1) {
          // if the folder is found then starting to find the file
          const temp: string =
            // @ts-expect-error filesId
            findFolders.files[0] !== undefined ? findFolders.files[0].id : ''
          void GDFindFile(
            `name='${NAME_FILE}' and '${temp}' in parents and trashed = false`,
            token
          ).then((findFile) => {
            if (findFile.files.length === 1) {
              // if the file is found then update it
              try {
                void GDUpdateFileJson(
                  state,
                  NAME_FILE,
                  // @ts-expect-error filesId
                  findFile.files[0].id,
                  token
                )
                Alert.alert(t('setting.ALERT_BACKUP_SUCCES'))
              } catch (error) {
                Alert.alert(t('setting.ALERT_BACKUP_ERROR'))
              }
            } else {
              // if the file isn't found then create new file
              try {
                void GDCreateFileJson(
                  state,
                  NAME_FILE,
                  // @ts-expect-error filesId

                  findFolders.files[0].id,
                  token
                )
                Alert.alert(t('setting.ALERT_BACKUP_SUCCES'))
              } catch (error) {
                Alert.alert(t('setting.ALERT_BACKUP_ERROR'))
              }
            }
          })
        } else {
          // if the folder isn't found then create new folder and file
          try {
            void GDCreateFolder('myAuto', token).then((response) => {
              setIdParent(response.id)
              void GDCreateFileJson(state, 'myAuto', response.id, token)
              Alert.alert(t('setting.ALERT_BACKUP_SUCCES'))
            })
          } catch (error) {
            Alert.alert(t('setting.ALERT_BACKUP_ERROR'))
          }
        }
      })
    } else {
      Alert.alert(t('setting.ALERT_ERROR_AUTH'))
    }
  }
  // ******************** handler Press Import Button ***************************
  const importData = async (): Promise<void> => {
    if (token !== '') {
      await GDFindFile(
        `name='${NAME_FOLDER}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false `,
        token
      ).then((findFolders) => {
        if (findFolders.files.length === 1) {
          // if the folder is found then starting to find the file
          const temp: string =
            // @ts-expect-error filesId
            findFolders.files[0] !== undefined ? findFolders.files[0].id : ''
          void GDFindFile(
            `name='${NAME_FILE}' and '${temp}' in parents and trashed = false`,
            token
          ).then((findFile) => {
            if (findFile.files.length === 1) {
              // if the file is found then update it
              try {
                // @ts-expect-error filesId
                void GDGetFile(findFile.files[0].id, token).then((getFile) => {
                  if (getFile !== undefined) {
                    dispatch(updateSetting(getFile.setting))
                    dispatch(addedToken(getFile.token))
                    dispatch(updateStateCars(getFile.cars))
                    dispatch(changedNumberCar(getFile.numberCar))
                    dispatch(updatedAllSeller(getFile.sellerList))
                    /* dispatch(updateState(getFile)) */
                    Alert.alert(t('setting.ALERT_IMPORT_SUCCES'))
                  }
                })
              } catch (error) {
                Alert.alert(t('setting.ALERT_IMPORT_ERROR'))
              }
            } else {
              // if the file isn't found then create new file
              Alert.alert('File not find')
            }
          })
        } else {
          // if the folder isn't found then create new folder and file
          Alert.alert('Folder not find')
        }
      })
    } else {
      Alert.alert(t('setting.ALERT_ERROR_AUTH'))
    }
  }
  // ****************************************************************************

  const getUserInfo = async (): Promise<void> => {
    await GDGetUserInfo(token, 'name,email').then((response) => {
      if (response !== null) {
        console.log('getUser', response)
        /* setUserInfo(response) */
      } else {
        console.log('getUserElse')
        /* setUserInfo(null) */
      }
    })
  }
  const handleDeleteGoogleAuth = async (): Promise<void> => {
    const del = await deleteGoogleAuth(token)
    if (del) {
      setUserInfo(null)
      setAuth(false)
      dispatch(addedToken(''))
    } else {
      console.log('Повторите удаление')
    }
  }
  // ******************** handler Press LogOut Button ***************************
  const signOut = async () => {
    try {
      await GoogleSignin.signOut()
      setUserInfo(null)
      setAuth(false)
      dispatch(addedToken(''))
    } catch (error) {
      console.error(error)
    }
  }
  // ******************** Get info Google User **********************/***********
  const getCurrentUser = async () => {
    return await GoogleSignin.getCurrentUser()
  }
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently()
      /* setUserInfo({ userInfo }) */
      const tempToken = await GoogleSignin.getTokens()
      setToken(tempToken.accessToken)
      dispatch(addedToken(tempToken.accessToken))
      setAuth(true)
    } catch (error) {
      // @ts-expect-error errorType
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  }
  // ********************* Checking Auth status *********************************
  const isSignedIn = async () => {
    return await GoogleSignin.isSignedIn()
  }

  // ****************************************************************************

  useEffect(() => {
    if (checkGoogle === 'checked') {
      void isSignedIn()
        .then(result => {
          /* if (result) void getCurrentUserInfo() */
          if (result) {
            getCurrentUser()
              .then((user) => {
                setUserInfo(user)
                setToken(state.token)
              })
              .catch((error) => { console.log('ERROR_USER', error) })
          }
        })
    }
  }, [])

  return (
    <Card style={{ marginVertical: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Text style={stylesSettingScreen.text}>{t('setting.TITLE_GOOGLE_CARD')}</Text>

        </View>
        <View style={{ paddingRight: 10 }}>
          <Checkbox
            status={checkGoogle}
            onPress={() => { pressCheckGoogle() }}
          />
        </View>

      </View>
      <Card.Content >
        <View style={{ alignItems: 'center' }}>
        {(userInfo === null)
          ? null
          : <Surface style={{ alignItems: 'center', borderRadius: 5, padding: 5 }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={{
                uri: String(userInfo?.user.photo)
              }}
            />
            <Text style={stylesSettingScreen.text}>{userInfo?.user.name}</Text>
          </Surface>
        }
        </View>
        {!auth
          ? (
            <Button
              disabled={checkGoogle !== 'checked'}
              onPress={() => {
                void handleGoogleIn()
                /* void promptAsync() */
              }}
            >
              {t('setting.LOGIN_GOOGLE')}
            </Button>
            )
          : (
            <Button
              disabled={checkGoogle !== 'checked'}

              onPress={() => {
                void signOut()
                /* void handleDeleteGoogleAuth() */
              }}
            >
              Log Out from Google
            </Button>
            )}
      </Card.Content>
      <Divider horizontalInset />
      <Button
        onPress={() => {
          void importData()
        }}
        disabled={!auth || checkGoogle !== 'checked'}
      >
        {t('setting.IMPORT_DATA')}
      </Button>

      <Divider horizontalInset />
      <Button
        onPress={() => {
          void backup()
        }}
        disabled={!auth || checkGoogle !== 'checked'}
      >
        {t('setting.EXPORT_DATA')}
      </Button>
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
