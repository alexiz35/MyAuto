import { Navigation } from './components/Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './components/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createTheme, ThemeProvider } from '@rneui/themed'
import { COLOR_GREEN } from './type'

export default function App (): JSX.Element {
  const theme = createTheme({
    mode: 'dark',
    darkColors:
      { success: COLOR_GREEN },
    lightColors:
      { },
    components: {
      Button: {
        buttonStyle: {
          /* borderColor: 'blue' */
        }
      }
    }
  })
  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
        <Navigation />
        </ThemeProvider>
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
