import { StatusBar } from 'expo-status-bar'
// eslint-disable-next-line import/namespace
import { StyleSheet, Text, View } from 'react-native'

export default function App (): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
