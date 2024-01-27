import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { View } from 'react-native'
import { JSX, useState } from 'react'
import { useAppTheme } from '../../CommonComponents/Theme'
import { Button } from 'react-native-paper'

interface PropsPicker {
  listLeft: string[]
  listRight: string[]
  handlerEnterPicker: (result: TypeResultPicker) => void
}
export interface TypeResultPicker {
  left: string
  right: string
}

const WheelPickerSelectDouble = ({ listLeft, listRight, handlerEnterPicker }: PropsPicker): JSX.Element => {
  const { colors } = useAppTheme()

  const [checkedLeft, setCheckedLeft] = useState('')
  const [checkedRight, setCheckedRight] = useState('')

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row' }}>
      <WheelPickerExpo
      /* backgroundColor={'#8f8b8b'} */
      height={300}
      width={150}
      initialSelectedIndex={3}
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
      initialSelectedIndex={3}
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
