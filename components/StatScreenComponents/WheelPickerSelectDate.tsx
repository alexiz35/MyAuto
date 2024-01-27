import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { View } from 'react-native'
import { JSX, useState } from 'react'
import { Button } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'

interface PropsPicker {
  list: string[]
  handlerEnterPicker: (result: string) => void
}

const WheelPickerSelectDate = ({ list, handlerEnterPicker }: PropsPicker): JSX.Element => {
  const [checked, setChecked] = useState('')
  const { colors } = useAppTheme()

  return (
    <View style={{ backgroundColor: colors.background }}>
      <WheelPickerExpo
      /* backgroundColor={'#FFFFFF'} */
      height={300}
      /* width={150} */
      initialSelectedIndex={3}
      haptics={true}
      items={list.map(name => ({ label: name, value: '' }))}
      onChange={({ item }) => {
        setChecked(item.label)
        /* setVisibleYear(false) */
      }} />
      <Button onPress={() => {
        handlerEnterPicker(checked)
      }} mode={'text'}>
        Ok
      </Button>
    </View>
  )
}
export default WheelPickerSelectDate
