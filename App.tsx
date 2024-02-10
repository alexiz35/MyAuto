import { Navigation } from './components/Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './components/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
export default function App (): JSX.Element {
// TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  /*  const firebaseConfig = {
    apiKey: 'AIzaSyB0yWL1Oesm4gcIs4RlIXY_K6NRn_W3kVw',
    authDomain: 'mycar2-4563d.firebaseapp.com',
    databaseURL: 'https://mycar2-4563d.firebaseio.com',
    projectId: 'mycar2-4563d',
    storageBucket: 'mycar2-4563d.appspot.com',
    // messagingSenderId: 'sender-id',
    appId: '1:366949801874:android:2596e59d2c65f35a576b4b'
    // measurementId: 'G-measurement-id'
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  // Initialize Firebase Authentication and get a reference to the service
  const auth = firebase.auth() */

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
  return (
    <SafeAreaProvider>
    <Provider store={store}>

      <PersistGate persistor={persistor} loading={null}>
        {/* <ThemeProvider theme={theme}> */}
        <Navigation />
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
    /* <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
    </View> */
  )
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  }
}) */
