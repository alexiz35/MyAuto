/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageBackground } from 'react-native'
import { useThemeMode } from '@rneui/themed'
import React, { useEffect, useState } from 'react'

const BackgroundView = ({ children }: React.PropsWithChildren<any>): JSX.Element => {
  const { mode } = useThemeMode()

  const BlackBack = require('../assets/Back2.png')
  const LightBack = require('../assets/backLight2.jpg')
  const [img, setImg] = useState(require('../assets/Back2.png'))
  useEffect(() => {
    mode === 'dark' ? setImg(BlackBack) : setImg(LightBack)
  }, [mode])
  return (
    <ImageBackground source={img} style={{ flex: 1 }} >
      {children}
    </ImageBackground>
  )
}
export default BackgroundView
