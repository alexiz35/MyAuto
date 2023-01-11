/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { View } from 'react-native'
import { Button } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tasks } from '../components/Tasks'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

type RootStackParamList = {
  Home: undefined
  Second: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <View>

      <Tasks/>
      <Button
        title={'Second Screen'}
        type='solid'
        onPress={() => {
          navigation.navigate('Second')
        }}
        icon={{
          name: 'umbrella',
          type: 'font-awesome',
          size: 15,
          color: 'red'
        }}
        iconRight
      />
      <MapView
        style={{ width: '100%', height: '50%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
    </View>

  )
}

export default HomeScreen
