import React, { JSX, useRef, useState } from 'react'
import { Dialog, HelperText, IconButton, Surface, TextInput } from 'react-native-paper'
import { Keyboard, View, TextInput as TypeTextInput } from 'react-native'
import { useAppTheme } from '../../CommonComponents/Theme'
import { useAppSelector } from '../Redux/hook'

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
    car[numberCar].info.nameCar
  )

  const inputRef = useRef<TypeTextInput>(null)

  const Tittle = (): string => {
    switch (mode) {
      case 'new': return 'Введите уникальное название машины для начала работы'
      case 'editCar': return 'Измените название машины'
      case 'addNewCar': return 'Введите уникальное название машины'
    }
  }
  const pressOk = () => {
    if (valueNameCar === '') {
      setErrorNameCar('введите название авто')
      setIsErrorNameCar(true)
      return
    }
    if (car.length > 1) {
      if (car.some((element) => element.info.nameCar === valueNameCar)) {
        setErrorNameCar('такое имя уже существует')
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
      label={'введите название'}
      placeholder={'введите название'}
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
