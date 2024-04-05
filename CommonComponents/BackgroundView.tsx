/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'

const BackgroundView = ({ children, props }: React.PropsWithChildren<any>): JSX.Element => {
  /* const { mode } = useThemeMode() */
  const theme = useTheme()

  const BlackBack = require('../assets/backDark.png')
  const LightBack = require('../assets/backLight.jpg')
  const [img, setImg] = useState(require('../assets/backDark.png'))
  useEffect(() => {
    theme.dark ? setImg(BlackBack) : setImg(LightBack)
  }, [theme])
  return (
    <ImageBackground source={img} style={props}>
      {children}
    </ImageBackground>
  )
}
export default BackgroundView
