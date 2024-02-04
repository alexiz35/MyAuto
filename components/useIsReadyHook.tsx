import { JSX, useEffect, useState } from 'react'
import { ActivityIndicator, useWindowDimensions, View } from 'react-native'
import { Text } from 'react-native-paper'
import BackgroundView from '../CommonComponents/BackgroundView'
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

  <View style={{
    justifyContent: 'center',backgroundColor:colors.background,height:'100%'
  }}>
    <ActivityIndicator size={'large'} color={colors.tertiary} />
    <Text style={{ textAlign: 'center' }}>Downloading data...</Text>
  </View>
  )
}
