import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView, Platform
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Dialog, Divider, Icon, Input, Text, useTheme } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useEffect, useMemo, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { BACK_INPUT, COLOR_GREEN, StatePart, ServiceList, StateTask, TEXT } from '../../type'
import { RootStackParamList } from '../Navigation/Navigation'
import { addTask, editTask } from '../Redux/actions'
import { BottomSheetAddition } from '../BottomSheetAddition'
import ShadowBox from '../../CommonComponents/ShadowBox'
import Accordion from '../Accordion'
import { Tasks } from '../HomeScreenComponents/Tasks'

type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputService = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const setNewTask = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { theme } = useTheme()

  const listService = [
    { label: 'engineOil', value: 'engineOil' },
    { label: 'gearOil', value: 'gearOil' },
    { label: 'airFilter', value: 'airFilter' },
    { label: 'fuelFilter', value: 'fuelFilter' },
    { label: 'driveBelt', value: 'driveBelt' },
    { label: 'timingBelt', value: 'timingBelt' }
  ]

  const editableTask: boolean = route.params.editable
  const currentId: number | undefined = route.params.taskId

  /* const [currentTask, setCurrentTask] = useState<StateTask>(
    {
      id: 0,
      title: '',
      startKm: 0,
      endKm: 0,
      startDate: '',
      endData: '',
      addition: {
        parts: [{ id: 0, namePart: '', costPart: 0, amountPart: 0, numberPart: '' }],
        services: [{ id: 0, nameService: '', costService: 0 }]
      }
    }
  ) */

  const [errorMsg, setErrorMsg] = useState('')
  const [openDrop, setOpenDrop] = useState(false)
  const [valueDrop, setValueDrop] = useState<null | string>(null)
  const [itemsDrop, setItemsDrop] = useState(listService)

  const [startKmInput, setStartKmInput] = useState(0)
  const [startDateInput, setStartDateInput] = useState(new Date())
  const [endKmInput, setEndKmInput] = useState(0)
  const [endDateInput, setEndDateInput] = useState('')
  const [timeToService, setTimeToService] = useState(0)
  const [kmToService, setKmToService] = useState(0)
  const [costParts, setCostParts] = useState(0)
  const [costService, setCostService] = useState(0)
  const [amountPart, setAmountPart] = useState(0)
  const [sumCost, setSumCost] = useState(0)

  const [addParts, setAddParts] = useState<[StatePart] | undefined>()
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
    onChange: (event, date) => setStartDateInput(date)
  })

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService])

  useEffect(() => {
    setEndDateInput(editDate(startDateInput.toLocaleDateString(), timeToService))
  }, [startDateInput, timeToService])

  useEffect(() => {
    counter(addParts)
  }, [addParts])

  const counter = (parts: [StatePart] | undefined): void => {
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

  const changeTask = (value: string | null): void => {
    setErrorMsg('')
    switch (value) {
      case 'engineOil':
        setKmToService(8000)
        setTimeToService(12)
        break
      case 'airFilter':
        setKmToService(8000)
        setTimeToService(12)
        break
      case 'fuelFilter':
        setKmToService(20000)
        setTimeToService(12)
        break
      case 'driveBelt':
        setKmToService(50000)
        setTimeToService(48)
        break
      case 'timingBelt':
        setKmToService(50000)
        setTimeToService(60)
        break
      default:
        break
    }
  }
  const inputMile = (value: number): void => {
    setErrorMsg('')
    setStartKmInput(value)
  }

  const handleOk = (): void => {
    if (valueDrop === null || startKmInput === 0) {
      setErrorMsg('Введите необходимые данные')
      return
    }
    const tempNewTask: StateTask = {
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
    }

    editableTask ? setNewTask(editTask(state.numberCar, currentId, tempNewTask)) : setNewTask(addTask(state.numberCar, tempNewTask))
    navigation.navigate('BottomTabNav', { screen: 'Home' })
  }

  const handleCancelModal = (): void => {
    setIsVisible(false)
  }

  const handleOkModal = (parts: StatePart[]): void => {
    // @ts-expect-error kjjkj
    setAddParts(parts)
    /* setAddServices(services) */
    setIsVisible(false)
  }

  return (
  <View>
    <ScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
      <Accordion
        insideView={
          <View>
            {/* <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}> */}
            <DropDownPicker
              style={styles.dropDownPicker}
              listMode={'SCROLLVIEW'}
              dropDownContainerStyle={{
                backgroundColor: theme.colors.background, // 'rgba(61,61,61,0.94)'
                marginHorizontal: 5,
                width: '97%',
                borderColor: theme.colors.greyOutline
              }}
              disableBorderRadius={true}
              placeholder={'Выберите тип ТО'}
              placeholderStyle={{ color: theme.colors.error, fontWeight: 'bold' }}
              open={openDrop}
              value={valueDrop}
              items={itemsDrop}
              setOpen={setOpenDrop}
              setValue={setValueDrop}
              setItems={setItemsDrop}
              selectedItemLabelStyle={{ color: theme.colors.success, fontWeight: 'bold' }}
              onChangeValue={(value) => changeTask(value)}
              textStyle={{ color: theme.colors.black, textAlign: 'center', fontSize: 18 }}
              arrowIconStyle={{
                width: 30,
                height: 30

              }}
              ArrowDownIconComponent={() => <Icon type={'material-community'} name={'chevron-down'} color={'grey'} size={30}/>}
            />
            <View style={styles.viewAllInput}>

              <View style={styles.viewGroupInput}>
                <ShadowBox style={{ margin: 5, flex: 1 }}>
                  <Input
                    placeholder={'введите пробег'}
                    placeholderTextColor={'red'}
                    inputStyle={styles.inputText}
                    errorMessage={'текущий пробег'}
                    errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                    onChangeText={(value) => inputMile(Number(value))}
                    keyboardType={'numeric'}
                    value={String(startKmInput)}
                  />
                </ShadowBox>
                <ShadowBox style={{ margin: 5, flex: 1 }}>
                  <Input
                    placeholder={'Пробег для замены'}
                    containerStyle={{ flex: 1 }}
                    inputStyle={styles.inputText}
                    errorMessage={'пробег замены'}
                    errorStyle={styles.errorInput}
                    value = {String(endKmInput)}
                  />
                </ShadowBox>
              </View>

              <View style={styles.viewGroupInput}>
                <ShadowBox style={{ margin: 5, flex: 1 }}>
                  <Input
                    placeholder={'Дата проведения'}
                    containerStyle={{ flex: 1 }}
                    inputStyle={styles.inputText}
                    showSoftInputOnFocus={false}
                    value = {startDateInput.toLocaleDateString()}
                    onPressOut={inputDate}
                    errorMessage={'текущая дата'}
                    errorStyle={styles.errorInput}
                  />
                </ShadowBox>
                <ShadowBox style={{ margin: 5, flex: 1 }}>
                  <Input
                    placeholder={'Дата проведения'}
                    inputStyle={styles.inputText}
                    errorMessage={'конечная дата'}
                    errorStyle={styles.errorInput}
                    value = {endDateInput }
                    editable={false}
                  />
                </ShadowBox>
              </View>
            </View>
            {/*  <Button
          title={ `Ввести комплектующие \n добавлено ${addParts?.length} шт`}
          titleStyle={{ color: 'black' }}
          onPress={() => { setIsVisible(true) }}
          color= {'white'}
          buttonStyle={ styles.buttonAddition }
        /> */}
            <ShadowBox style={{ margin: 5, flex: 1 }}>
              <Pressable style={styles.textCost} onPress={() => {
                setIsVisible(true)
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Добавить комплектующие</Text>
                <Text >{`Добавлено деталей: ${amountPart} шт`}</Text>
              </Pressable>
            </ShadowBox>
            <View style={styles.viewGroupInput}>
              <ShadowBox style={{ margin: 5, flex: 1 }}>
                <Input
                  placeholder={'цена деталей'}
                  /* placeholderTextColor={'red'} */
                  inputStyle={styles.inputText}
                  errorMessage={'цена деталей'}
                  errorStyle={styles.errorInput}
                  onChangeText={(value) => setCostParts(Number(value))}
                  keyboardType={'numeric'}
                  value={String(sumCost)}
                />
              </ShadowBox>
              <ShadowBox style={{ margin: 5, flex: 1 }}>
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
              </ShadowBox>
            </View>

            <ShadowBox style={{ margin: 5, flex: 1 }}>
              <Text style={styles.textCost}>{`Итого затраты: ${sumCost + costService} грн`}</Text>
            </ShadowBox>

            <Dialog
              isVisible={isVisible}
              overlayStyle={{ width: '100%', padding: 0 }}
              backdropStyle={{ backgroundColor: 'rgba(63,59,59,0.76)' }}
            >
              <BottomSheetAddition
                initialParts = {addParts}
                onPressCancel = {handleCancelModal}
                onPressOk={handleOkModal}
              />

            </Dialog>

            <View style={styles.viewButton}>
              <Button
                containerStyle={styles.buttonStyle}
                /* buttonStyle={{ borderColor: 'red' }}
                titleStyle={{ color: 'red' }} */
                title={'Cancel'}
                color={'error'}
                type={'solid'}
                onPress={() => { navigation.goBack() }}
                raised
                /* onPress={onPressCancel} */
              />
              <Button
                containerStyle={styles.buttonStyle}
                /* buttonStyle={{ borderColor: COLOR_GREEN }}
                titleStyle={{ color: COLOR_GREEN }} */
                title={'Ok'}
                color={'success'}
                type={'solid'}
                onPress={() => { handleOk() }}
                raised
              />
            </View>
            {/* </ScrollView> */}
          </View>
      }
        title={'Добавьте сервис'}
        bannerStyle={{ backgroundColor: BACK_INPUT }}
        /* open={openAccordion}
        isOpen={isOpen} */
        /* textBannerStyle={{ color: TEXT_WHITE }} */
      />
    </ScrollView>
    <View style={{ marginTop: 10 }}>
    <Tasks />
    </View>
  </View>
  )
}

export default InputService

const styles = StyleSheet.create({
  dropDownPicker: {
    backgroundColor: BACK_INPUT,
    margin: 5,
    width: '97%',
    borderWidth: 0,
    borderRadius: 0

  },
  viewAllInput: {

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
    fontSize: 14
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
    padding: 10,
    textAlign: 'center',
    alignItems: 'center'
  }
})
