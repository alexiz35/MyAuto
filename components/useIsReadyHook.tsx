import { JSX, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'

export const useIsReady = (): boolean => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100)
  }, [])

  return isReady
}

export const BusyIndicator = (): JSX.Element => {
  const { colors } = useAppTheme()

  return (
  /* <BackgroundView style={{ height: '100%' }}> */

  <View style={{
    justifyContent: 'center'
  }}>
    <ActivityIndicator size={'large'} color={colors.tertiary} />
    <Text style={{ textAlign: 'center' }}>Downloading data...</Text>
  </View>
  /*  </BackgroundView> */
  )
}
