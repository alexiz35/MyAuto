import { Text, View, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useState } from 'react'
import { PartList, ServiceList, StateTask } from '../type'
import { addTask, editTask } from '../components/Redux/actions'
import { BottomSheetAddition } from '../components/BottomSheetAddition'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

  type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputTaskScreen = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const setNewTask = useAppDispatch()
  const Tasks = useAppSelector((state) => state)

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
    onChange: (event, date) => setStartDateInput(date)
  })

  useEffect(() => {
    if (editableTask) {
      const temp = Tasks.tasks.find((item) => (item.id === currentId))
      if (temp !== undefined) {
        setStartKmInput(temp.startKm)
        setAddParts(temp.addition?.parts)
        setStartDateInput(new Date(temp.startDate))
        setCostService(temp.sumCostService !== undefined ? temp.sumCostService : 0)
        setValueDrop(temp.title)
      }
    }
  }, [editableTask])

  useEffect(() => {
    console.log('edit', editableTask)
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService])

  useEffect(() => {
    setEndDateInput(editDate(startDateInput.toLocaleDateString(), timeToService))
  }, [startDateInput, timeToService])

  useEffect(() => {
    counter(addParts)
  }, [addParts])

  const counter = (parts: [PartList] | undefined): void => {
    let amount = 0
    let sum = 0
    // eslint-disable-next-line array-callback-return
    parts?.map((part) => {
      amount = amount + part.amountPart
      sum = sum + (part.costPart * part.amountPart)
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
      addition:
        {
          parts: addParts,
          services: addServices
        }
    }

    editableTask ? setNewTask(editTask(currentId, tempNewTask)) : setNewTask(addTask(tempNewTask))
    navigation.navigate('Home')
  }

  const handleCancelModal = (): void => {
    setIsVisible(false)
  }

  const handleOkModal = (parts: PartList[]): void => {
    // @ts-expect-error kjjkj
    setAddParts(parts)
    /* setAddServices(services) */
    setIsVisible(false)
  }

  return (
    <View>
      <DropDownPicker
        style={styles.dropDownPicker}
        disableBorderRadius={true}
        placeholder={'Выберите тип ТО'}
        placeholderStyle={{ color: 'red', fontWeight: 'bold' }}
        open={openDrop}
        value={valueDrop}
        items={itemsDrop}
        setOpen={setOpenDrop}
        setValue={setValueDrop}
        setItems={setItemsDrop}
        selectedItemLabelStyle={{ color: 'green', fontWeight: 'bold' }}
        onChangeValue={(value) => changeTask(value)}
        textStyle={{ color: 'blue', textAlign: 'center', fontSize: 18 }}
      />
      <View style={styles.viewAllInput}>

        <View style={styles.viewGroupInput}>
          <View style={styles.input}>
            <Input
              placeholder={'введите пробег'}
              placeholderTextColor={'red'}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'текущий пробег'}
              errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
              onChangeText={(value) => inputMile(Number(value))}
              keyboardType={'numeric'}
              value={String(startKmInput)}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder={'Пробег для замены'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center' }}
              errorMessage={'пробег замены'}
              errorStyle={styles.errorInput}
              value = {String(endKmInput)}
            />
          </View>
      </View>

      <View style={styles.viewGroupInput}>
            <View style={styles.input}>
             <Input
                placeholder={'Дата проведения'}
                containerStyle={{ flex: 1 }}
                inputStyle={{ textAlign: 'center' }}
                value = {startDateInput.toLocaleDateString()}
                onPressOut={inputDate}
                errorMessage={'текущая дата'}
                errorStyle={styles.errorInput}
             />
            </View>
        <View style={styles.input}>
            <Input
              placeholder={'Дата проведения'}
              inputStyle={{ textAlign: 'center' }}
              errorMessage={'конечная дата'}
              errorStyle={styles.errorInput}
              value = {endDateInput }
              editable={false}
            />
        </View>
        </View>
      </View>
       {/*  <Button
          title={ `Ввести комплектующие \n добавлено ${addParts?.length} шт`}
          titleStyle={{ color: 'black' }}
          onPress={() => { setIsVisible(true) }}
          color= {'white'}
          buttonStyle={ styles.buttonAddition }
        /> */}
      <Pressable style={styles.textCost} onPress={() => { setIsVisible(true) }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Добавить комплектующие</Text>
      <Text >{`Добавлено деталей: ${amountPart} шт`}</Text>
      </Pressable>
      <View style={styles.viewGroupInput}>
        <View style={styles.input}>
          <Input
            placeholder={'цена деталей'}
            /* placeholderTextColor={'red'} */
            inputStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={'цена деталей'}
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
            inputStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={'стоимость работы'}
            errorStyle={styles.errorInput}
            onChangeText={(value) => setCostService(Number(value))}
            keyboardType={'numeric'}
            value={String(costService)}
          />
        </View>
      </View>

      <View >
        <Text style={styles.textCost}>{`Итого затраты: ${sumCost + costService} грн`}</Text>
      </View>

      <SafeAreaView>
        <Dialog
          isVisible={isVisible}
          overlayStyle={{ width: '100%' }}
        >
          <BottomSheetAddition
            // @ts-expect-error jbjbjb

            initialParts={addParts}
            onPressCancel = {() => { handleCancelModal() }}
            onPressOk={handleOkModal}
          />
        </Dialog>
      </SafeAreaView>

      <Text style={styles.button}>{errorMsg}</Text>
      <View style={styles.viewButton}>

        <Button
          containerStyle={styles.buttonStyle}
          title={'Cancel'}
          color={'error'}
          onPress={() => { navigation.goBack() }}
          /* onPress={onPressCancel} */
        />
        <Button
          containerStyle={styles.buttonStyle}
          title={'Ok'}
          color={'success'}
          onPress={() => { handleOk() }}
        />
      </View>

    </View>
  )
}

export default InputTaskScreen

const styles = StyleSheet.create({
  dropDownPicker: {
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

  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    margin: 5,
    backgroundColor: 'white',
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
    marginTop: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  },
  textCost: {
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
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
