import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, ScrollView, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Dialog, Icon, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useEffect, useMemo, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { BACK_INPUT, COLOR_GREEN, PartList, ServiceList, StateTask, TEXT, TEXT_WHITE } from '../../type'
import { RootStackParamList } from '../Navigation/Navigation'
import { addTask, editTask } from '../Redux/actions'
import { BottomSheetAddition } from '../BottomSheetAddition'
import Accordion from '../Accordion'
import { FuelList } from '../FuelScreenComponents/FuelList'

type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputTask = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const setNewTask = useAppDispatch()
  const state = useAppSelector((state) => state)

  const editableTask: boolean = route.params.editable
  const currentId: number | undefined = route.params.taskId

  const [errorMsg, setErrorMsg] = useState('')

  const [namePart, setNamePart] = useState('')
  const [numberPart, setNumberPart] = useState('')
  const [endKmInput, setEndKmInput] = useState(0)
  const [endDateInput, setEndDateInput] = useState(new Date())
  const [costParts, setCostParts] = useState(0)
  const [costService, setCostService] = useState(0)
  const [amountPart, setAmountPart] = useState(0)
  const [sumCost, setSumCost] = useState(0)

  const [addParts, setAddParts] = useState<[PartList] | undefined>()
  const [addServices, setAddServices] = useState<[ServiceList] | undefined>()

  const [isVisible, setIsVisible] = useState(false)

  const editDate = (date: string, increment: number): string => {
    const tempDate = new Date(date)
    tempDate.setMonth(tempDate.getMonth() + increment)
    return tempDate.toLocaleDateString()
  }

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    /* display: 'spinner', */
    // @ts-expect-error date undefined
    onChange: (event, date) => setEndDateInput(date)
  })

  /*  useEffect(() => {
    if (editableTask) {
      const temp = state.cars[state.numberCar].tasks.find((item) => (item.id === currentId))
      if (temp !== undefined) {
        setStartKmInput(temp.startKm)
        setAddParts(temp.addition?.parts)
        setStartDateInput(new Date(temp.startDate))
        setCostService(temp.sumCostService !== undefined ? temp.sumCostService : 0)
        setValueDrop(temp.title)
      }
    }
  }, []) */

  useEffect(() => {
    navigation.setOptions({ title: 'Купить деталь' })
  }, [])

  useEffect(() => {
    counter(addParts)
  }, [addParts])

  const counter = (parts: [PartList] | undefined): void => {
    let amount = 0
    let sum = 0
    // eslint-disable-next-line array-callback-return
    parts?.map((part) => {
      amount = amount + part.quantityPart
      sum = sum + (part.costPart * part.quantityPart)
    })
    setSumCost(sum)
    setAmountPart(amount)
  }

  const inputMile = (value: number): void => {
    setErrorMsg('')
    setEndKmInput(value)
  }

  /* const handleOk = (): void => {
    if (valueDrop === null || startKmInput === 0) {
      setErrorMsg('Введите необходимые данные')
      return
    } */

  /* const tempNewTask: StateTask = {
    id: Date.now(),
    startKm: startKmInput,
    endKm: endKmInput,
    startDate: startDateInput.toLocaleDateString(),
    endData: endDateInput,
    title: String(valueDrop),
    sumCostService: costService,
    sumCostParts: sumCost,
    isFinished: false,
    addition:
        {
          parts: addParts,
          services: addServices
        }
  } */

  /* editableTask ? setNewTask(editTask(state.numberCar, currentId, tempNewTask)) : setNewTask(addTask(state.numberCar, tempNewTask))
  navigation.navigate('BottomTabNav', { screen: 'Home' }) */

  return (
    <View>
      {/* <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}> */}
      <ScrollView>
      <Accordion
        insideView={
        <View>
        <View style={styles.viewAllInput}>
          <View style={styles.viewGroupInput}>
            <View style={styles.input}>
              <TextInput

                placeholder={'название'}
                placeholderTextColor={'red'}
                /* inputStyle={styles.inputText} */
                style={{ padding: 1 }}
                /* errorMessage={'название детали'} */
                /* errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }} */
                onChangeText={(value) => setNamePart(String(value))}
                keyboardType={'numeric'}
                value={String(namePart)}
              />
            </View>
          </View>

          <View style={styles.viewGroupInput}>
            <View style={styles.input}>
              <Input
                placeholder={'купить к дате'}
                containerStyle={{ flex: 1 }}
                inputStyle={styles.inputText}
                showSoftInputOnFocus={false}
                value = {endDateInput.toLocaleDateString()}
                onPressOut={inputDate}
                errorMessage={'купить к дате'}
                errorStyle={styles.errorInput}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder={'купить до пробега'}
                placeholderTextColor={'red'}
                inputStyle={styles.inputText}
                errorMessage={'купить до пробега'}
                errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                onChangeText={(value) => inputMile(Number(value))}
                keyboardType={'numeric'}
                value={String(endKmInput)}
              />
            </View>
          </View>
        </View>
        <View style={styles.viewAllInput}>

          <View style={styles.viewGroupInput}>
            <View style={styles.input}>
              <Input
                placeholder={'артикул'}
                placeholderTextColor={'red'}
                inputStyle={styles.inputText}
                errorMessage={'артикул'}
                errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                onChangeText={(value) => setNumberPart(String(value))}
                keyboardType={'numeric'}
                value={String(numberPart)}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Accordion
              bannerStyle={{ backgroundColor: BACK_INPUT }}
              textBannerStyle={{ color: TEXT_WHITE }}
              title={'Аналоги'}
              insideView={
                <View style={styles.viewGroupInput}>
                  <View style={styles.input}>
                    <Input
                      placeholder={'артикул'}
                      placeholderTextColor={'red'}
                      inputStyle={styles.inputText}
                      errorMessage={'артикул'}
                      errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                      onChangeText={(value) => inputMile(Number(value))}
                      keyboardType={'numeric'}
                      value={String()}
                    />
                  </View>
                </View>
              }
            />
          </View>
        </View>
        <View style={styles.viewGroupInput}>
          <View style={styles.input}>
            <Input
              placeholder={'продавец'}
              /* placeholderTextColor={'red'} */
              inputStyle={styles.inputText}
              errorMessage={'продавец'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setCostParts(Number(value))}
              keyboardType={'numeric'}
              value={String(sumCost)}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder={'стоимость работы'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputText}
              errorMessage={'стоимость работы'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setCostService(Number(value))}
              keyboardType={'numeric'}
              value={String(costService)}
            />
          </View>
        </View>

        {/* <View >
          <Text style={styles.textCost}>{`Итого затраты: ${sumCost + costService} грн`}</Text>
        </View> */}

        <Text style={styles.button}>{errorMsg}</Text>
        <View style={styles.viewButton}>

          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={{ borderColor: 'red' }}
            titleStyle={{ color: 'red' }}
            title={'Cancel'}
            color={'warning'}
            type={'outline'}
            onPress={() => { navigation.goBack() }}
            /* onPress={onPressCancel} */
          />
          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={{ borderColor: COLOR_GREEN }}
            titleStyle={{ color: COLOR_GREEN }}
            title={'Ok'}
            color={'success'}
            type={'outline'}
            /* onPress={() => { }} */
          />
        </View>
      </View>}
        title={'Добавьте покупку'}
        bannerStyle={{ backgroundColor: BACK_INPUT }}
        textBannerStyle={{ color: TEXT_WHITE }}
      />
      </ScrollView>
      <View >
        <FuelList />
      </View>
      {/* </ScrollView> */}
    </View>

  )
}

export default InputTask

const styles = StyleSheet.create({
  dropDownPicker: {
    backgroundColor: BACK_INPUT,
    margin: 5,
    width: '97%',
    borderWidth: 0,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  viewAllInput: {
    margin: 8,
    backgroundColor: BACK_INPUT,
    /* borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey', */
    borderRadius: 10,
    paddingBottom: 5
  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    margin: 5,
    backgroundColor: BACK_INPUT,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  inputText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white'
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },
  buttonAddition: {
    margin: 5,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },

  viewAdditional: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10
  },
  button: {
    textAlign: 'center',
    color: 'red'
  },

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  },
  textCost: {
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    backgroundColor: BACK_INPUT,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  }
})
