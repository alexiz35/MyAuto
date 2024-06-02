import { Navigation } from './components/Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './components/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppState } from 'react-native'
import 'firebase/compat/auth'
import { JSX, useEffect } from 'react'
import { NotificationComponent } from './components/NotificationComponent'
import { CloseFunction } from './components/CloseFunction'
import Toast from 'react-native-toast-message'
import * as SplashScreen from 'expo-splash-screen'
import './i18n/i18n'
import { useTranslation } from 'react-i18next'
import { langChanged } from './components/Redux/SettingSlice'
import { getLocales } from 'expo-localization'

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})
export default function App (): JSX.Element {
  /*   const theme = createTheme({
    mode: 'dark',
    darkColors:
      { success: COLOR_GREEN },
    lightColors:
      { },
    components: {
      Button: {
        buttonStyle: {
          /!* borderColor: 'blue' *!/
        }
      }
    }
  }) */
  /* // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: Selector unknown returned the root state when called.'])
  // Ignore all log notifications
  LogBox.ignoreAllLogs() */

  const splashHide = () => {
    setTimeout(SplashScreen.hideAsync, 2000)
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change',
      (nextAppState) => { CloseFunction(nextAppState) }
    )
    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <SafeAreaProvider onLayout={splashHide}>
    <Provider store={store}>

      <PersistGate persistor={persistor} loading={null}>
        {/* <ThemeProvider theme={theme}> */}
        <Navigation />

        <Toast/>
        <NotificationComponent/>

        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  )
}
