import { Navigation } from './components/Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './components/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppState, Platform } from 'react-native'
import 'firebase/compat/auth'
import { JSX, useEffect } from 'react'
import { NotificationComponent } from './components/NotificationComponent'
import { CloseFunction } from './components/CloseFunction'
import Toast from 'react-native-toast-message'
import * as SplashScreen from 'expo-splash-screen'
import './i18n/i18n'
import Purchases, { LOG_LEVEL } from 'react-native-purchases'

SplashScreen.preventAutoHideAsync().catch((e) => {
  console.log('ErrorSplash', e)
  /* reloading the app might trigger some race conditions, ignore them */
})
export default function App (): JSX.Element {
  useEffect(() => {
    const subscription = AppState.addEventListener('change',
      (nextAppState) => { CloseFunction(nextAppState) }
    )
    return () => {
      subscription.remove()
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const revenuecat_project_google_api_key: string = 'goog_ZeDFVcLugenOdHpKWqYIeATkGpP'

  const splashHide = () => {
    setTimeout(SplashScreen.hideAsync, 1000)
  }
  useEffect(() => {
    void Purchases.setLogLevel(LOG_LEVEL.ERROR)

    if (Platform.OS === 'ios') {
      /* Purchases.configure(
        {apiKey: <revenuecat_project_apple_api_key>}) */
    } else if (Platform.OS === 'android') {
      Purchases.configure(
        { apiKey: revenuecat_project_google_api_key })
    }
  }, [])

  return (
    <SafeAreaProvider onLayout={splashHide}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Navigation />

        <Toast/>
        <NotificationComponent/>

      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  )
}
