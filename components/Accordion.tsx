import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native'
import { useEffect, useState } from 'react'
import { TouchableRipple, Text, IconButton } from 'react-native-paper'

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
    if (open !== undefined) {
      setIsVisible(open)
    }
  }, [open])

  useEffect(() => {
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
      <TouchableRipple
        style={[styles.viewTitle, bannerStyle]}
        onPress={() => {
          handlePress()
        }}>
        <>
        <Text style={[styles.title, textBannerStyle]}>
          {title}
        </Text>

        <IconButton
          style={styles.arrow}
          icon={isVisible ? 'chevron-up' : 'chevron-down'}
        />
        </>
      </TouchableRipple>
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
