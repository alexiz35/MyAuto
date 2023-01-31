import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'

import { useEffect, useState } from 'react'
import { StateTask } from '../type'
import { addTask } from '../components/Redux/actions'
import { RootStackParamList } from './HomeScreen'
import { BottomSheetAddition, PartList, ServiceList } from '../components/BottomSheetAddition'

/* interface RootStackParamList {
  Home: undefined
  Second: undefined
} */

type Props = NativeStackScreenProps<RootStackParamList, 'Second'>

const SecondScreen = ({ navigation }: Props): JSX.Element => {
  const stateSecond = useAppSelector((state) => state)
  const setNewTask = useAppDispatch()
  const listService = [
    { label: 'engineOil', value: 'engineOil' },
    { label: 'gearOil', value: 'gearOil' },
    { label: 'airFilter', value: 'airFilter' },
    { label: 'fuelFilter', value: 'fuelFilter' },
    { label: 'driveBelt', value: 'driveBelt' },
    { label: 'timingBelt', value: 'timingBelt' }
  ]

  const [errorMsg, setErrorMsg] = useState('')
  const [openDrop, setOpenDrop] = useState(false)
  const [valueDrop, setValueDrop] = useState(null)
  const [itemsDrop, setItemsDrop] = useState(listService)

  const [startKmInput, setStartKmInput] = useState(0)
  const [startDateInput, setStartDateInput] = useState(new Date().toLocaleDateString())
  const [endKmInput, setEndKmInput] = useState(0)
  const [endDateInput, setEndDateInput] = useState('')
  const [timeToService, setTimeToService] = useState(0)
  const [kmToService, setKmToService] = useState(0)

  const [addParts, setAddParts] = useState<[PartList] | undefined>()
  const [addServices, setAddServices] = useState<[ServiceList] | undefined>()

  const [isVisible, setIsVisible] = useState(false)

  const editDate = (date: string, increment: number): string => {
    const tempDate = new Date(date)
    tempDate.setMonth(tempDate.getMonth() + increment)
    return tempDate.toLocaleDateString()
  }

  useEffect(() => {
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService])

  useEffect(() => {
    setEndDateInput(editDate(startDateInput, timeToService))
  }, [startDateInput, timeToService])

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
      startDate: startDateInput,
      endData: endDateInput,
      title: String(valueDrop),
      addition:
        {
          parts: addParts,
          services: addServices
        }
    }
    console.log('ok', tempNewTask)
    console.log('ok2', tempNewTask.addition?.parts)
    setNewTask(addTask(tempNewTask))
    navigation.navigate('Home')
  }

  const handleCancelModal = (): void => {
    setIsVisible(false)
  }

  const handleOkModal = (parts: PartList[], services: ServiceList[]): void => {
    // @ts-expect-error knknk
    setAddParts(parts)
    // @ts-expect-error kkkk
    setAddServices(services)
    setIsVisible(false)
  }

  return (
    <View>
      <DropDownPicker
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

      <Text style={styles.textKm}>Пробег</Text>

      <View style={styles.viewKm}>
          <Input
            placeholder={'Пробег текущий'}
            placeholderTextColor={'red'}
            containerStyle={{ flex: 1 }}
            inputStyle={{ textAlign: 'center' }}
            label={'текущий'}
            labelStyle={{ textAlign: 'center' }}
            onChangeText={(value) => inputMile(Number(value))}
            keyboardType={'numeric'}
          />
          <Input
            placeholder={'Пробег для замены'}
            containerStyle={{ flex: 1 }}
            inputStyle={{ textAlign: 'center' }}
            label={'предельный'}
            labelStyle={{ textAlign: 'center' }}
            value = {String(endKmInput)}
          />
      </View>

      <Text style={styles.textDate}>Дата</Text>

      <View style={styles.viewDate}>
            <Input
              placeholder={'Дата проведения'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center' }}
              label={'текущая'}
              labelStyle={{ textAlign: 'center' }}
              value = {startDateInput}
            />
            <Input
              placeholder={'Дата проведения'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center' }}
              label={'предельная'}
              labelStyle={{ textAlign: 'center' }}
              value = {endDateInput }
            />
        </View>

        <Button
          title={'Дополнительная информация'}
          color={'success'}
          onPress={() => { setIsVisible(true) }}
        />
      <SafeAreaView>
        <Dialog
          isVisible={isVisible}
          overlayStyle={{ width: '100%' }}
        >
          <BottomSheetAddition
            onPressCancel = {() => { handleCancelModal() }}
            onPressOk={handleOkModal}
          />
        </Dialog>
      </SafeAreaView>
      <Text style={styles.button}>{errorMsg}</Text>
      <Button
      title={'Ok'}
      color={'success'}
      onPress={() => { handleOk() }}
      />
    </View>
  )
}

export default SecondScreen

const styles = StyleSheet.create({
  textKm: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  viewKm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1
  },
  textDate: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1
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
  }
})
