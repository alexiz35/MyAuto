import { View } from 'react-native'
import { JSX, useCallback, useState } from 'react'
import { RootTabParamList } from '../components/Navigation/TypeNavigation'
import InputService from '../components/InputDoneScreenComponents/inputService/InputService'
import InputPart from '../components/InputDoneScreenComponents/inputPart/InputPart'
import BackgroundView from '../CommonComponents/BackgroundView'
import InputDoc from '../components/InputDoneScreenComponents/inputDoc/InputDoc'
import { SegmentedButtons } from 'react-native-paper'
// eslint-disable-next-line import/named
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

  type Props = BottomTabScreenProps<RootTabParamList, 'InputDoneScreen'>
const InputDoneScreen = ({ route }: Props): JSX.Element => {
  const [typeBuy, setTypeBuy] = useState('part')
  const { t } = useTranslation()

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
          { value: 'part', label: t('PART') },
          { value: 'service', label: t('SERVICE') },
          { value: 'other', label: t('OTHER') }
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
