import { JSX, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import LottieView from 'lottie-react-native'

export const useIsReady = (): boolean => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => { setIsReady(true) }, 100)
  }, [])

  return isReady
}

export const BusyIndicator = (): JSX.Element => {
  const { colors } = useAppTheme()
  const animation = useRef(null)

  return (

  <View style={{
    justifyContent: 'center', backgroundColor: colors.background, height: '100%'
  }}>
    {/* <ActivityIndicator size={'large'} color={colors.tertiary} />
    <Text style={{ textAlign: 'center' }}>Downloading data...</Text> */}
    <LottieView
      autoPlay
      ref={animation}
      style={{
        alignSelf: 'center',
        marginBottom: 200,
        width: 200,
        height: 200
      }}
      // Find more Lottie files at https://lottiefiles.com/featured
      source={require('../assets/carActivity.json')}
    />
  </View>
  )
}
