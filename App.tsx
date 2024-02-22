import { Navigation } from './components/Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './components/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppState, LogBox } from 'react-native'
import 'firebase/compat/auth'
import { JSX, useEffect, useRef, useState } from 'react'
import { useAppSelector } from './components/Redux/hook'
import { NotificationComponent } from './components/NotificationComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CloseFunction } from './components/CloseFunction'
import Toast from 'react-native-toast-message'

/* export const Buffer = require('buffer/').Buffer */

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

  useEffect(() => {
    const subscription = AppState.addEventListener('change',
      (nextAppState) => { CloseFunction(nextAppState) }
    )
    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <SafeAreaProvider>
    <Provider store={store}>

      <PersistGate persistor={persistor} loading={null}>
        {/* <ThemeProvider theme={theme}> */}
        <NotificationComponent/>
        <Navigation />
        <Toast/>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  )
}
