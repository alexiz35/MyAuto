import { StyleSheet, TextInput, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import React, { PropsWithChildren, useState } from 'react'
import { PropsModalInput } from '../type'

export const ModalInput = ({ onPressOk, onPressCancel }: PropsModalInput): JSX.Element => {
  const inputNamePart = React.createRef<PropsWithChildren<TextInput>>()
  const inputCostPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputNumberPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputSalerPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputAmountPart = React.createRef<PropsWithChildren<TextInput>>()

  const [partName, setPartName] = useState('')
  const [partNumber, setPartNumber] = useState('')
  const [partCost, setPartCost] = useState('')
  const [partSaler, setPartSaler] = useState('')
  const [partAmount, setPartAmount] = useState('')

  return (
    <View>
      <Input
        ref={inputNamePart}
        placeholder={'название детали'}
        containerStyle={{}}
        inputStyle={styles.inputPartStyle}
        label={'наименование детали'}
        labelStyle={{ textAlign: 'center' }}
        onChangeText={(value) => { setPartName(String(value)) }}
        /* onSubmitEditing={() => inputCostService.current?.focus()} */
        value={partName}
        defaultValue={''}
      />
      <Input
        ref={inputNumberPart}
        placeholder={'номер детали'}
        containerStyle={{}}
        inputStyle={styles.inputPartStyle}
        label={'номер детали'}
        labelStyle={{ textAlign: 'center' }}
        onChangeText={(value) => { setPartNumber(String(value)) }}
        /* onSubmitEditing={() => inputCostService.current?.focus()} */
        value={partNumber}
        defaultValue={''}
      />
      <Input
        ref={inputCostPart}
        placeholder={'цена детали'}
        containerStyle={{}}
        inputStyle={styles.inputPartStyle}
        label={'цена детали'}
        labelStyle={{ textAlign: 'center' }}
        onChangeText={(value) => { setPartCost(String(value)) }}
        /* onSubmitEditing={() => inputCostService.current?.focus()} */
        value={partCost}
        defaultValue={''}
      />
      <Input
        ref={inputSalerPart}
        placeholder={'продавец детали'}
        containerStyle={{}}
        inputStyle={styles.inputPartStyle}
        label={'продавец детали'}
        labelStyle={{ textAlign: 'center' }}
        onChangeText={(value) => { setPartSaler(String(value)) }}
        /* onSubmitEditing={() => inputCostService.current?.focus()} */
        value={partCost}
        defaultValue={''}
      />
      <View style={styles.viewButton}>

        <Button
          containerStyle={styles.buttonStyle}
          title={'Cancel'}
          color={'error'}
          onPress={onPressCancel}
        />
        <Button
          containerStyle={styles.buttonStyle}
          title={'Ok'}
          color={'success'}
          onPress={() => { onPressOk(partName, partCost) }}
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  inputPartStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
