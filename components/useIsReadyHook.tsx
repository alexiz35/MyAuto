import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, View } from 'react-native'
import { COLOR_GREEN } from '../type'

export const useIsReady = (): boolean => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100)
  }, [])

  return isReady
}

export const BusyIndicator = (): JSX.Element => {
  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>

  <View style={{
    flex: 1,
    justifyContent: 'center'
  }}>
  <ActivityIndicator size="large" color={COLOR_GREEN} />
  </View>
  </ImageBackground>
  )
}
