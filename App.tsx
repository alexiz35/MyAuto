import { Navigation } from './components/Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './components/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function App (): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Navigation />
      </PersistGate>
    </Provider>
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
