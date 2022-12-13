import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../../screens/HomeScreen'
import SecondScreen from '../../screens/SecondScreen'
import { Button, Image, View } from 'react-native'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootStackParamList = {
  Home: undefined
  Second: undefined
}

function LogoTitle (): JSX.Element {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={
        require('../../assets/renault_logo.jpg')
      }
    />
  )
}

function MyButton (): JSX.Element {
  return (
    <View style={{ width: 100, marginRight: 20 }}>
      <Button title={'Set'} color='violet' onPress={() => alert('Hello')}/>
    </View>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={
        {
          headerTitleAlign: 'center',
          headerTitle: (props) => (<LogoTitle{...props}/>),
          title: 'title',
          headerRight: () => (<MyButton />)
        }
        }/>
      <Stack.Screen name="Second" component={SecondScreen} options={{ title: 'Second' }}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}
