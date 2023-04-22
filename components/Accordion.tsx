import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { BACK_INPUT, COLOR_GREEN, TEXT_WHITE } from '../type'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, Icon, Input, Text } from '@rneui/themed'
import React, { PropsWithChildren, useEffect, useState } from 'react'

interface Props {
  insideView: JSX.Element
  title: string
  open?: boolean
  controlled?: boolean
  onPress?: (isOpen: boolean) => void
  isOpen?: (state: boolean) => void
  bannerStyle?: StyleProp<ViewStyle>
  textBannerStyle?: StyleProp<TextStyle>
  viewContainerStyle?: StyleProp<ViewStyle>
  arrowStyle?: StyleProp<TextStyle | ViewStyle>
}

const Accordion = ({
  insideView, title, open, isOpen, bannerStyle, textBannerStyle, viewContainerStyle, arrowStyle, controlled, onPress
}: Props): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    console.log('open', open, isVisible)
    if (open !== undefined) {
      setIsVisible(open)
    }
  }, [open])

  useEffect(() => {
    console.log('isOpen')
    if (isOpen !== undefined) {
      isOpen(isVisible)
    }
  }, [isVisible])

  const handlePress = (): void => {
    if (controlled === false) {
      setIsVisible(!isVisible)
    } else {
      if (onPress != null) {
        onPress(isVisible)
      }
    }
  }

  return (
    <View>
      <Pressable
        style={[styles.viewTitle, bannerStyle]}
        onPress={() => {
          handlePress()
        }}>
        <Text style={[styles.title, textBannerStyle]}>
          {title}
        </Text>

        <Icon
          style={styles.arrow}
          type={'material-community'}
          name={isVisible ? 'chevron-up' : 'chevron-down'}
        />
      </Pressable>
      {isVisible
        ? <View style={[styles.viewDrop, viewContainerStyle]}>
          {insideView}
        </View>
        : <View/>
      }
    </View>
  )
}
export default Accordion

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  title: {
    flex: 2,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16
  },
  viewDrop: {
    marginHorizontal: 5
  },
  arrow: {
    paddingRight: 10
  }
})
