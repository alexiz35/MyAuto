/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageBackground } from 'react-native'
import { useThemeMode } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
export const LightBack = require('../assets/whiteBack.jpg')

const BackgroundView = ({ children, props }: React.PropsWithChildren<any>): JSX.Element => {
  /* const { mode } = useThemeMode() */
  const theme = useTheme()

  const BlackBack = require('../assets/Back2.png')
  const LightBack = require('../assets/backLight2.jpg')
  const [img, setImg] = useState(require('../assets/Back2.png'))
  useEffect(() => {
    theme.dark ? setImg(BlackBack) : setImg(LightBack)
  }, [theme])
  return (
    <ImageBackground source={img} style={props} >
      {children}
    </ImageBackground>
  )
}
export default BackgroundView
