import { Text, View } from 'react-native'

/* type RootStackParamList = {
  Home: undefined
  Second: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> */

const SecondScreen = (): JSX.Element => {
  return (
    <View>
      <Text>
        Second
      </Text>
    </View>
  )
}

export default SecondScreen
