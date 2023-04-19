import React, { useEffect, useState } from 'react'
import { useThemeMode } from '@rneui/themed'
import { Shadow } from 'react-native-shadow-2'
import { BACK_INPUT } from '../type'
import { StyleProp, ViewStyle } from 'react-native'

interface PropsShadow {
  children: React.PropsWithChildren<any>
  style: StyleProp<ViewStyle>
}

const ShadowBox = ({ children, style }: PropsShadow): JSX.Element => {
  const { mode } = useThemeMode()

  const BlackBack = BACK_INPUT
  const LightBack = 'white'
  const [back, setBack] = useState(BlackBack)
  useEffect(() => {
    mode === 'dark' ? setBack(BlackBack) : setBack(LightBack)
  }, [mode])

  return (
    <Shadow style={{ backgroundColor: back }} containerStyle={style} stretch={true}>
      {children}
    </Shadow>
  )
}

export default ShadowBox
