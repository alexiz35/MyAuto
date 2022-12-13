/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { View, Text, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type RootStackParamList = {
  Home: undefined
  Second: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <View>
    <Text>Home</Text>
    <Button title={'Second Screen'} color={'blue'} onPress={() => {
      navigation.navigate('Second')
    }}/>
    </View>
  )
}

export default HomeScreen
