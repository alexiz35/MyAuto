import { View } from 'react-native'
import { useCallback, useState } from 'react'
import { RootTabParamList } from '../components/Navigation/Navigation'
import InputService from '../components/InputDoneScreenComponents/inputService/InputService'
import InputPart from '../components/InputDoneScreenComponents/inputPart/InputPart'
import BackgroundView from '../CommonComponents/BackgroundView'
import InputDoc from '../components/InputDoneScreenComponents/inputDoc/InputDoc'
import { SegmentedButtons } from 'react-native-paper'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'

  type Props = BottomTabScreenProps<RootTabParamList, 'InputDoneScreen'>
const InputDoneScreen = ({ navigation, route }: Props): JSX.Element => {
  const [typeBuy, setTypeBuy] = useState('part')

  useFocusEffect(
    useCallback(() => {
      if (route.params !== undefined) {
        if (route.params.editable) {
          setTypeBuy(route.params.typeTask)
        }
      }
    }, [route.params])
  )
  return (
    <BackgroundView props={{ flex: 1, paddingTop: 10 }}>

      <SegmentedButtons
        value={typeBuy} onValueChange={setTypeBuy}
        buttons={[
          { value: 'part', label: 'part' },
          { value: 'service', label: 'service' },
          { value: 'other', label: 'other' }
        ]}
      />
      <View style={{ marginTop: 10, flex: 1 }}>
        {
          (() => {
            switch (typeBuy) {
              case 'part':
                return <InputPart />
              case 'service':
                return <InputService />
              case 'other':
                return <InputDoc />
              default:
                break
            }
          })()
        }
      </View>

</BackgroundView>

  )
}

export default InputDoneScreen
