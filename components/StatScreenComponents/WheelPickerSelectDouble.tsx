import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { View } from 'react-native'
import { JSX, useState } from 'react'
import { useAppTheme } from '../../CommonComponents/Theme'
import { Button } from 'react-native-paper'

interface PropsPicker {
  initial: TypeResultPicker
  listLeft: string[]
  listRight: string[]
  handlerEnterPicker: (result: TypeResultPicker) => void
}
export interface TypeResultPicker {
  left: string
  right: string
}

const WheelPickerSelectDouble = ({ listLeft, listRight, handlerEnterPicker, initial }: PropsPicker): JSX.Element => {
  const { colors } = useAppTheme()
  console.log('Picker', initial, listLeft, listRight)
  const [checkedLeft, setCheckedLeft] = useState(initial.left)
  const [checkedRight, setCheckedRight] = useState(initial.right)

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row' }}>
      <WheelPickerExpo
      /* backgroundColor={'#8f8b8b'} */
      height={300}
      width={150}
      initialSelectedIndex={listLeft.indexOf(initial.left)}
      haptics={true}
      items={listLeft.map(name => ({ label: name, value: '' }))}
      onChange={({ item }) => {
        setCheckedLeft(item.label)
        /* setVisibleYear(false) */
      }} />
        <WheelPickerExpo
      /* backgroundColor={'#8f8b8b'} */
      height={300}
      width={150}
      initialSelectedIndex={listRight.indexOf(initial.right)}
      haptics={true}
      items={listRight.map(name => ({ label: name, value: '' }))}
      onChange={({ item }) => {
        setCheckedRight(item.label)
        /* setVisibleYear(false) */
      }} />
      </View>
      <Button onPress={() => {
        handlerEnterPicker({ left: checkedLeft, right: checkedRight })
      }} mode={'text'}>
        Ok
      </Button>
    </View>
  )
}
export default WheelPickerSelectDouble
