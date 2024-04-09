import { JSX, useRef, useState } from 'react'
import { Dialog, HelperText, IconButton, Surface, TextInput } from 'react-native-paper'
import { View, TextInput as TypeTextInput } from 'react-native'
import { useAppTheme } from '../../CommonComponents/Theme'
import { useAppSelector } from '../Redux/hook'
import { getIndexCar } from '../../type'
import { useTranslation } from 'react-i18next'

type TypeMode = 'new' | 'addNewCar' | 'editCar'
interface PropsDialogNameCar {
  mode: TypeMode
  handlePressOk: (dialogNameCar: string) => void
  handlePressCancel: () => void
}
export const ModalPickNameCar = ({ mode, handlePressOk, handlePressCancel }: PropsDialogNameCar): JSX.Element => {
  const numberCar = useAppSelector((state) => state.numberCar)
  const car = useAppSelector((state) => state.cars)
  const { colors } = useAppTheme()
  const [isErrorNameCar, setIsErrorNameCar] = useState(false)
  const [errorNameCar, setErrorNameCar] = useState('')
  const [valueNameCar, setValueNameCar] = useState(
    car[getIndexCar(car, numberCar)].info.nameCar
  )

  const inputRef = useRef<TypeTextInput>(null)
  const { t } = useTranslation()

  const Tittle = (): string => {
    switch (mode) {
      case 'new': return t('carInfo.modalNameCar.TITLE_NEW')
      case 'editCar': return t('carInfo.modalNameCar.TITLE_EDIT')
      case 'addNewCar': return t('carInfo.modalNameCar.TITLE_ADD_NEW')
    }
  }
  const pressOk = () => {
    if (valueNameCar === '') {
      setErrorNameCar(t('carInfo.modalNameCar.ERROR_NUL'))
      setIsErrorNameCar(true)
      return
    }
    if (car.length > 0) {
      if (car.some((element) => element.info.nameCar === valueNameCar)) {
        setErrorNameCar(t('carInfo.modalNameCar.ERROR_UNIQ'))
        setIsErrorNameCar(true)
        return
      }
    }
    handlePressOk(valueNameCar)
  }
  const pressKeyboard = () => {
    inputRef.current?.blur()

    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }
  const pressCancel = () => {
    handlePressCancel()
  }

  return (
    <View>
    <Dialog.Title>{Tittle()}</Dialog.Title>
  <Dialog.Content>
    <TextInput
      ref={inputRef}
      label={t('carInfo.modalNameCar.INPUT')}
      placeholder={t('carInfo.modalNameCar.INPUT')}
      onChangeText={(value) => { setValueNameCar(String(value)) }}
      value={String(valueNameCar)}
      error={isErrorNameCar}
      blurOnSubmit={false}
      right={<TextInput.Icon icon="keyboard" size={26} onPress={pressKeyboard}/>}
    />
    <HelperText type={'error'} visible={isErrorNameCar}>
      {errorNameCar}
    </HelperText>
  </Dialog.Content>
  <Dialog.Actions>
    <Surface elevation={2} style={{ borderRadius: 10 }}>
      <IconButton
        disabled={mode === 'new'}
        icon={'window-close'}
        onPress={pressCancel}
        iconColor={colors.error}
      ></IconButton>
    </Surface>
    <Surface elevation={2} style={{ borderRadius: 10 }}>
      <IconButton
        icon={'check'}
        onPress={pressOk}
        iconColor={colors.tertiary}
      ></IconButton>
    </Surface>
  </Dialog.Actions>
    </View>
  )
}
