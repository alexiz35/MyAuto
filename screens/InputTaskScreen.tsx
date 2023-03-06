import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Icon, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useMemo, useState } from 'react'
import { BACK_INPUT, COLOR_GREEN, PartList, ServiceList, StateTask, TEXT } from '../type'
import { addTask, editTask } from '../components/Redux/actions'
import { BottomSheetAddition } from '../components/BottomSheetAddition'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

  type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputTaskScreen = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const setNewTask = useAppDispatch()
  const state = useAppSelector((state) => state)

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

  const handleOkModal = (parts: PartList[]): void => {
    // @ts-expect-error kjjkj
    setAddParts(parts)
    /* setAddServices(services) */
    setIsVisible(false)
  }

  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
      <DropDownPicker
        style={styles.dropDownPicker}
        listMode={'SCROLLVIEW'}
        dropDownContainerStyle={{
          backgroundColor: 'rgba(61,61,61,0.94)'
        }}
        disableBorderRadius={true}
        placeholder={'Выберите тип ТО'}
        placeholderStyle={{ color: 'red', fontWeight: 'bold' }}
        open={openDrop}
        value={valueDrop}
        items={itemsDrop}
        setOpen={setOpenDrop}
        setValue={setValueDrop}
        setItems={setItemsDrop}
        selectedItemLabelStyle={{ color: COLOR_GREEN, fontWeight: 'bold' }}
        onChangeValue={(value) => changeTask(value)}
        textStyle={{ color: TEXT, textAlign: 'center', fontSize: 18 }}
        arrowIconStyle={{
          width: 30,
          height: 30

        }}
        ArrowDownIconComponent={() => <Icon type={'material-community'} name={'chevron-down'} color={'grey'} size={30}/>}
      />
      <View style={styles.viewAllInput}>

        <View style={styles.viewGroupInput}>
          <View style={styles.input}>
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
          </View>
          <View style={styles.input}>
            <Input
              placeholder={'Пробег для замены'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputText}
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
                inputStyle={styles.inputText}
                showSoftInputOnFocus={false}
                value = {startDateInput.toLocaleDateString()}
                onPressOut={inputDate}
                errorMessage={'текущая дата'}
                errorStyle={styles.errorInput}
             />
            </View>
        <View style={styles.input}>
            <Input
              placeholder={'Дата проведения'}
              inputStyle={styles.inputText}
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
      <Pressable style={styles.textCost} onPress={() => {
        setIsVisible(true)
      }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Добавить комплектующие</Text>
      <Text style={{ color: 'white' }}>{`Добавлено деталей: ${amountPart} шт`}</Text>
      </Pressable>
      <View style={styles.viewGroupInput}>
        <View style={styles.input}>
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

      <View >
        <Text style={styles.textCost}>{`Итого затраты: ${sumCost + costService} грн`}</Text>
      </View>

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
          onPress={() => { handleOk() }}
        />
      </View>
    </ScrollView>

</ImageBackground>

  )
}

export default InputTaskScreen

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
