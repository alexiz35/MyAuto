import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import {
  BACK_CARD,
  BACK_INPUT, BACK_OPACITY,
  COLOR_GREEN,
  PartList,
  ServiceList,
  StateFuel,
  StateTask,
  TEXT, TEXT_CARD,
  TEXT_WHITE
} from '../type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { addFuel, addTask, delTask, editTask, finishTask } from '../components/Redux/actions'
import DropDownPicker from 'react-native-dropdown-picker'
import { Button, Dialog, Icon, Input, LinearProgress, ListItem } from '@rneui/themed'
import { BottomSheetAddition } from '../components/BottomSheetAddition'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Dropdown } from 'react-native-element-dropdown'
import { useFocusEffect } from '@react-navigation/native'
import { SimpleAccordion } from 'react-native-simple-accordion'
import { FuelList } from '../components/FuelList'

type Props = BottomTabScreenProps<RootTabParamList, 'Fuel'>

const FuelScreen = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)

  const typeFuel = [
    { label: 'Дизель', value: 'Дизель' },
    { label: 'Бензин', value: 'Бензин' },
    { label: 'Газ', value: 'Газ' },
    { label: 'Электро', value: 'Электро' },
    { label: 'Газ-бензин', value: 'Газ-бензин' }
  ]

  const [errorMsg, setErrorMsg] = useState('')
  const [openDrop, setOpenDrop] = useState(false)
  const [valueDrop, setValueDrop] = useState<null | string>(null)
  const [itemsDrop, setItemsDrop] = useState(typeFuel)

  const [startKmInput, setStartKmInput] = useState(0)

  const [fuelDate, setFuelDate] = useState(new Date())
  const [fuelMileage, setFuelMileage] = useState(0)
  const [fuelVolume, setFuelVolume] = useState(0)
  const [fuelCost, setFuelCost] = useState(0)
  const [fuelAmount, setFuelAmount] = useState(0)
  const [fuelStation, setFuelStation] = useState('')

  const inputFuelCost = React.createRef<PropsWithChildren<TextInput>>()
  const inputFuelAmount = React.createRef<PropsWithChildren<TextInput>>()

  /* const [endKmInput, setEndKmInput] = useState(0)
  const [endDateInput, setEndDateInput] = useState('')
  const [timeToService, setTimeToService] = useState(0)
  const [kmToService, setKmToService] = useState(0)
  const [costParts, setCostParts] = useState(0)
  const [costService, setCostService] = useState(0)
  const [amountPart, setAmountPart] = useState(0)
  const [sumCost, setSumCost] = useState(0)

  const [addParts, setAddParts] = useState<[PartList] | undefined>()
  const [addServices, setAddServices] = useState<[ServiceList] | undefined>()

  const [isVisible, setIsVisible] = useState(false) */

  /* const editDate = (date: string, increment: number): string => {
    const tempDate = new Date(date)
    tempDate.setMonth(tempDate.getMonth() + increment)
    return tempDate.toLocaleDateString()
  } */

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    /* display: 'spinner', */
    // @ts-expect-error date undefined
    onChange: (event, date) => setFuelDate(date)
  })

  useFocusEffect(
    useCallback(() => {
      setValueDrop(state.cars[state.numberCar].info.fuel)
      console.log('fuel', state.cars[state.numberCar].fuel)
    }, [valueDrop]))

  const handleOnSubmitCost = (): void => {
    setFuelAmount(fuelVolume * fuelCost)
    inputFuelAmount.current?.focus()
  }
  const handleOnSubmitAmount = (): void => {
    setFuelCost(fuelAmount / fuelVolume)
    /* inputFuelAmount.current?.focus() */
  }

  /* useEffect(() => {
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService])

  useEffect(() => {
    setEndDateInput(editDate(fuelDate.toLocaleDateString(), timeToService))
  }, [fuelDate, timeToService])

  useEffect(() => {
    counter(addParts)
  }, [addParts]) */

  /* const counter = (parts: [PartList] | undefined): void => {
    let amount = 0
    let sum = 0
    // eslint-disable-next-line array-callback-return
    parts?.map((part) => {
      amount = amount + part.amountPart
      sum = sum + (part.costPart * part.amountPart)
    })
    setSumCost(sum)
    setAmountPart(amount)
  } */

  /* const changeTask = (value: string | null): void => {
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
  } */
  /*  const inputMile = (value: number): void => {
    setErrorMsg('')
    setStartKmInput(value)
  } */

  const handleCancel = (): void => {
    setFuelCost(0)
    setFuelAmount(0)
    setFuelVolume(0)
    setFuelMileage(0)
    navigation.goBack()
  }

  const handleOk = (): void => {
    /* if (valueDrop === null || startKmInput === 0) {
      setErrorMsg('Введите необходимые данные')
      return
    } */
    const tempNewFuel: StateFuel = {
      id: Date.now(),
      dateFuel: fuelDate,
      mileageFuel: fuelMileage,
      volumeFuel: fuelVolume,
      CostFuel: fuelCost,
      AmountFuel: fuelAmount,
      StationFuel: fuelStation
    }

    dispatch(addFuel(state.numberCar, tempNewFuel))
    navigation.navigate('Home')
  }

  /* const handleCancelModal = (): void => {
    setIsVisible(false)
  }

  const handleOkModal = (parts: PartList[]): void => {
    // @ts-expect-error kjjkj
    setAddParts(parts)
    /!* setAddServices(services) *!/
    setIsVisible(false)
  } */

  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <View style={{ flex: 1 }}>
        <View>
          <ScrollView>
        <SimpleAccordion

          startCollapsed={true}
          viewInside={
            <View>
              <Dropdown
                style={[styles.dropDownPicker, { paddingVertical: 3 }]}
                selectedTextStyle={{ color: TEXT_WHITE, paddingHorizontal: 10, fontSize: 16, textAlign: 'center' }}
                activeColor={'black'}
                itemContainerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
                itemTextStyle={{ color: TEXT_WHITE, textAlign: 'center' }}
                inputSearchStyle={{ backgroundColor: 'rgba(61,61,61,1)' }}
                containerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
                data={typeFuel}
                labelField={'label'}
                valueField={'value'}
                placeholder={'Тип'}
                value={valueDrop}
                onChange={item => {
                  setValueDrop(item.value)
                }}
              />
              <View style={styles.viewAllInput}>

                <View style={styles.viewGroupInput}>
                  <View style={styles.input}>
                    <Input
                      placeholder={'Дата проведения'}
                      containerStyle={{ flex: 1 }}
                      inputStyle={styles.inputText}
                      showSoftInputOnFocus={false}
                      value = {fuelDate.toLocaleDateString()}
                      onPressOut={inputDate}
                      errorMessage={'текущая дата'}
                      errorStyle={styles.errorInput}
                    />
                  </View>
                  <View style={styles.input}>
                    <Input
                      placeholder={'текущий пробег'}
                      inputStyle={styles.inputText}
                      errorMessage={'текущий пробег'}
                      errorStyle={styles.errorInput}
                      onChangeText={(value) => setFuelMileage(Number(value))}
                      keyboardType={'numeric'}
                      value={String(fuelMileage)}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.viewGroupInput}>
                <View style={styles.input}>
                  <Input
                    placeholder={'кол-во топлива'}
                    /* placeholderTextColor={'red'} */
                    inputStyle={styles.inputText}
                    errorMessage={'кол-во топлива'}
                    errorStyle={styles.errorInput}
                    onChangeText={(value) => setFuelVolume(Number(value))}
                    keyboardType={'numeric'}
                    value={String(fuelVolume)}
                    onSubmitEditing={() => inputFuelCost.current?.focus()}
                  />
                </View>
                <View style={styles.input}>
                  <Input
                    ref={inputFuelCost}
                    placeholder={'цена топлива'}
                    containerStyle={{ flex: 1 }}
                    inputStyle={styles.inputText}
                    errorMessage={'цена топлива'}
                    errorStyle={styles.errorInput}
                    onChangeText={(value) => setFuelCost(Number(value))}
                    keyboardType={'numeric'}
                    value={String(fuelCost)}
                    onSubmitEditing={() => handleOnSubmitCost()}
                    onBlur={() => handleOnSubmitCost()}
                  />
                </View>
                <View style={styles.input}>
                  <Input
                    ref={inputFuelAmount}
                    placeholder={'сумма заправки'}
                    containerStyle={{ flex: 1 }}
                    inputStyle={styles.inputText}
                    errorMessage={'сумма заправки'}
                    errorStyle={styles.errorInput}
                    onChangeText={(value) => setFuelAmount(Number(value))}
                    keyboardType={'numeric'}
                    value={String(fuelAmount)}
                    onSubmitEditing={() => handleOnSubmitAmount()}
                    onBlur={() => handleOnSubmitAmount()}

                  />
                </View>
              </View>
              <View style={styles.viewGroupInput}>
                <View style={styles.input}>
                  <Input
                    placeholder={'название запраки'}
                    /* placeholderTextColor={'red'} */
                    inputStyle={styles.inputText}
                    errorMessage={'название запрвки'}
                    errorStyle={styles.errorInput}
                    onChangeText={(value) => setFuelStation(String(value))}
                    value={String(fuelStation)}
                  />
                </View>
              </View>
              <Text style={styles.button}>{errorMsg}</Text>
              <View style={styles.viewButton}>

                <Button
                  containerStyle={styles.buttonStyle}
                  buttonStyle={{ borderColor: 'red' }}
                  titleStyle={{ color: 'red' }}
                  title={'Cancel'}
                  color={'warning'}
                  type={'outline'}
                  onPress={() => handleCancel() }
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
            </View>
          }
          title={'Добавить заправку'}
          bannerStyle={{ backgroundColor: BACK_INPUT, height: 30, padding: 5 }}
          titleStyle={{ color: TEXT_WHITE, textAlign: 'center', fontWeight: 'normal', fontSize: 16 }}
          viewContainerStyle={{ backgroundColor: BACK_INPUT }}
          showContentInsideOfCard={false}
        />
          </ScrollView>
        </View>
        <View >
            <FuelList/>
        </View>

      </View>

    </ImageBackground>

  )
}

export default FuelScreen

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
  },
  listItem: {
    height: 73,
    paddingRight: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    color: 'red',
    flex: 1
    /* backgroundColor: 'red' */
    /* borderRadius: 5 */
    /* shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2 */
  },
  viewBackList: {
    margin: 10,
    backgroundColor: BACK_INPUT,
    /* borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey', */
    borderRadius: 10,
    paddingBottom: 5
  }
})
