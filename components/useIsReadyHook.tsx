import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, View } from 'react-native'
import { COLOR_GREEN } from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import { Text } from 'react-native-paper'

export const useIsReady = (): boolean => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100)
  }, [])

  return isReady
}

export const BusyIndicator = (): JSX.Element => {
  return (
  /* <BackgroundView style={{ height: '100%' }}> */

  <View style={{
    justifyContent: 'center'
  }}>
    <ActivityIndicator size={'large'} color={COLOR_GREEN} />
    <Text style={{ textAlign: 'center' }}>Downloading data...</Text>
  </View>
  /*  </BackgroundView> */
  )
}
