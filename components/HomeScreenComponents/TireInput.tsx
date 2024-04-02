import { JSX, useState } from 'react'
import { Card, TextInput, HelperText, ToggleButton, Button } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { editedTires } from '../Redux/CarsSlice'
import { initialTire, StateTire } from '../../type'
import { createNumberMask, Masks, useMaskedInputProps } from 'react-native-mask-input'

interface TireProps {
  itemTire: StateTire
  closeTire: () => void
}

export const TireInput = ({ itemTire = initialTire, closeTire }: TireProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const numberCar = useAppSelector(state => state.numberCar)

  const [typeTire, setTypeTire] =
    useState<'allSeason' | 'summer' | 'winter' | string>(itemTire.typeTire)
  const [valueTire, setValueTire] = useState(itemTire.valueTire)
  const [nameTire, setNameTire] = useState(itemTire.nameTire)
  const [yearTire, setYearTire] = useState(itemTire.yearTire)
  const [errorTire, setErrorTire] = useState('')

  /* const tyreMask = createNumberMask({
    prefix: ['R'],
    delimiter: '/',
    separator: '/',
    precision: 2
  }) */
  const tyreMask = ['R', /\d/, /\d/, '/', /\d/, /\d/, /\d/, '/', /\d/, /\d/]
  const maskedInputProps = useMaskedInputProps({
    value: valueTire,
    onChangeText: setValueTire,
    mask: tyreMask
  })

  const handleOk = () => {
    const tireRegex = /^R\d\d\/\d\d\d\/\d\d$/
    if (tireRegex.test(valueTire)) {
      setErrorTire('')
      const tempResultTire: StateTire = {
        id: Date.now(),
        valueTire,
        nameTire,
        yearTire,
        typeTire
      }

      dispatch(editedTires({
        tire: tempResultTire,
        numberCar
      }))
      closeTire()
    } else setErrorTire('неправильный формат размера шин')
  }

  return (
    <Card>
      <Card.Title title={'Введите данные шин'}/>
      <Card.Content >

        <ToggleButton.Row onValueChange={value => { setTypeTire(value) }} value={typeTire} style={{ justifyContent: 'center' }}>
          <ToggleButton icon="sun-snowflake" value="allSeason" size={20} style={{ height: 30 }}/>
          <ToggleButton icon="white-balance-sunny" value="summer" size={20} style={{ height: 30 }}/>
          <ToggleButton icon="snowflake" value="winter" size={20} style={{ height: 30 }}/>
        </ToggleButton.Row>
        <HelperText type={'info'} style={{ textAlign: 'center', marginBottom: 7 }}>{typeTire}</HelperText>
        <TextInput
          {...maskedInputProps}
          dense
          label={'размер'}
          /* maxLength={8} */
          /* left={<TextInput.Affix text="R" />} */
          /* onChangeText={(value) => { handleInputTire(value) }} */
          keyboardType={'numeric'}
          /* value={valueTire} */
          error={Boolean(errorTire)}
        />
        {errorTire === ''
          ? <HelperText type={'info'}>Размерность шин в формате Rxx/xxx/xx</HelperText>
          : <HelperText type={'error'}>{errorTire}</HelperText>
        }
        <TextInput
          style={{ marginBottom: 5 }}
          dense
          label={'производитель'}
          maxLength={8}
          onChangeText={(value) => { setNameTire(value) }}
          value={nameTire}
        />
        <TextInput
          dense
          label={'год выпуска'}
          maxLength={8}
          onChangeText={(value) => { setYearTire(value) }}
          keyboardType={'numeric'}
          value={yearTire}
        />
      </Card.Content>
      <Card.Actions style={{ marginVertical: 5 }}>
        <Button onPress={closeTire}>Cancel</Button>
        <Button onPress={handleOk}>Ok</Button>
      </Card.Actions>
    </Card>
  )
}
