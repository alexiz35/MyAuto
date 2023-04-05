import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { Button } from '@rneui/themed'
import { View } from 'react-native'
import { useState } from 'react'

interface PropsPicker {
  list: string[]
  handlerEnterPicker: (result: string) => void
}

const WheelPickerSelectDate = ({ list, handlerEnterPicker }: PropsPicker): JSX.Element => {
  const [checked, setChecked] = useState('')

  return (
    <View style={{ backgroundColor: 'grey' }}>
      <WheelPickerExpo
      backgroundColor={'#8f8b8b'}
      height={300}
      width={150}
      initialSelectedIndex={3}
      haptics={true}
      items={list.map(name => ({ label: name, value: '' }))}
      onChange={({ item }) => {
        setChecked(item.label)
        /* setVisibleYear(false) */
      }} />
      <Button title={'Ok'} onPress={() => {
        handlerEnterPicker(checked)
      }}/>
    </View>
  )
}
export default WheelPickerSelectDate
