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
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { BACK_INPUT, COLOR_GREEN, StatePart, ServiceList, StateService, TEXT, TEXT_WHITE, ModalPart } from '../type'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { addPart, addService, editService } from '../components/Redux/actions'
import { AddPartModal } from '../components/InputDoneScreenComponents/inputService/AddPartModal'
import ShadowBox from '../CommonComponents/ShadowBox'
import Accordion from '../components/Accordion'
import { Tasks } from '../components/HomeScreenComponents/Tasks'
import BackgroundView from '../CommonComponents/BackgroundView'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputServiceComponent from '../components/InputDoneScreenComponents/inputService/InputServiceComponent'

type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'>
const InputService = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const setNewTask = useAppDispatch()
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { theme } = useTheme()

  /*  const listService = [
    { label: 'engineOil', value: 'engineOil' },
    { label: 'gearOil', value: 'gearOil' },
    { label: 'airFilter', value: 'airFilter' },
    { label: 'fuelFilter', value: 'fuelFilter' },
    { label: 'driveBelt', value: 'driveBelt' },
    { label: 'timingBelt', value: 'timingBelt' }
  ] */

  const editableTask: boolean = route.params.editable
  const currentId: number | undefined | null = route.params.taskId

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

  /* const [errorMsg, setErrorMsg] = useState('')
  const [openDrop, setOpenDrop] = useState(false) */
  const [valueDrop, setValueDrop] = useState<null | string>(null)
  /* const [itemsDrop, setItemsDrop] = useState(listService) */

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)

  const [service, setService] = useState<StateService | null>(null)
  const [startKmInput, setStartKmInput] = useState(0)
  const [startDateInput, setStartDateInput] = useState(new Date())
  const [costService, setCostService] = useState(0)
  const [amountPart, setAmountPart] = useState(0)
  const [sumCost, setSumCost] = useState(0)

  const [addModalParts, setAddModalParts] = useState<[ModalPart] | undefined>()
  /* const [addServices, setAddServices] = useState<[ServiceList] | undefined>()

  const [isVisible, setIsVisible] = useState(false) */

  /* const editDate = (date: string, increment: number): string => {
    const tempDate = new Date(date)
    tempDate.setMonth(tempDate.getMonth() + increment)
    return tempDate.toLocaleDateString()
  } */

  /* const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    /!* display: 'spinner', *!/
    // @ts-expect-error date undefined
    onChange: (event, date) => setStartDateInput(date)
  }) */
  /*
  useFocusEffect(
    useCallback(() => {
      if (editableTask) {
        const temp = state.cars[state.numberCar].services.find((item) => (item.id === currentId))
        console.log('service', temp, currentId, route.params.taskId)

        if (temp !== undefined) {
          setService(temp)
          handleOnPress()
        /!* setStartKmInput(temp.startKm)
          setAddModalParts(temp.addition?.parts)
          setStartDateInput(new Date(temp.startDate))
          setCostService(temp.sumCostService !== undefined ? temp.sumCostService : 0)
          setValueDrop(temp.title)
          setOpenAccordion(true) *!/
        }
      }
    }, [editableTask, currentId])) */

  /* useEffect(() => {
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService])

  useEffect(() => {
    setEndDateInput(editDate(startDateInput.toLocaleDateString(), timeToService))
  }, [startDateInput, timeToService]) */

  /* useEffect(() => {
    counter(addModalParts)
  }, [addModalParts]) */

  /*   const counter = (parts: ModalPart[] | undefined): void => {
    let amount = 0
    let sum = 0
    // eslint-disable-next-line array-callback-return
    parts?.map((part) => {
      amount = amount + part.quantityPart
      sum = sum + (part.costPart * part.quantityPart)
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
  /* const inputMile = (value: number): void => {
    setErrorMsg('')
    setStartKmInput(value)
  } */
  /* const clearInput = (): void => {
    setValueDrop(null)
    setStartDateInput(new Date())
    setStartKmInput(0)
    setCostParts(0)
    setCostService(0)
    setAddModalParts(undefined)
  } */

  // ---------------------------Accordion --------------------------------------
  /* const isOpen = (open: boolean): void => {
    setIsOpenAccordion(open)
    if (!open) setOpenAccordion(false)
    else setOpenAccordion(true)
  } */
  // ---------------------------------------------------------------------------
  const createNewParts = (service: StateService): void => {
    const tempParts = service.addition?.parts
    if (tempParts !== undefined) {
      // eslint-disable-next-line array-callback-return
      tempParts.map((item) => {
        const tempPart: StatePart = {
          id: item.id,
          dateBuy: startDateInput,
          mileageInstall: startKmInput,
          namePart: item.namePart,
          dateInstall: startDateInput,
          isInstall: true,
          numberPart: item.numberPart,
          costPart: item.costPart,
          quantityPart: item.quantityPart,
          amountCostPart: item.costPart * item.quantityPart,
          seller: {
            name: item.seller?.name,
            link: item.seller?.link,
            phone: item.seller?.phone
          }
        }
        dispatch(addPart(state.numberCar, tempPart))
      })
    }
  }

  // ---------------------------handleButtons-----------------------------------
  const handleCancel = (): void => {
    setService(null)
    handleOnPress()
  }

  const handleOk = (service: StateService): void => {
    /*  if (valueDrop === null || startKmInput === 0) {
      setErrorMsg('Введите необходимые данные')
      return
    }
    const tempNewTask: StateService = {
      id: Date.now(),
      startKm: startKmInput,
      endKm: endKmInput,
      startDate: startDateInput.toLocaleDateString(),
      endData: endDateInput,
      title: String(valueDrop),
      sumCostService: costService,
      sumCostParts: sumCost,
      /!* isFinished: false, *!/
      addition:
        {
          parts: addModalParts,
          services: addServices
        }
    } */

    createNewParts(service)

    editableTask
      ? setNewTask(editService(state.numberCar, currentId, service))
      : setNewTask(addService(state.numberCar, service))

    handleOnPress()
  }
  // ---------------------------------------------------------------------------
  // ---------------------- handleModal ----------------------------------------

  /*  const handleCancelModal = (): void => {
    setIsVisible(false)
  }

  const handleOkModal = (parts: [ModalPart]): void => {
    setAddModalParts(parts)
    /!* setAddServices(services) *!/
    setIsVisible(false)
  } */

  // ---------------------------------------------------------------------------
  const handleOnPress = (): void => {
    setIsOpenAccordion(true)
    setTimeout(() => {
      setOpenAccordion(!openAccordion)
      setIsOpenAccordion(false)
    }, 600)
  }

  return (
  <View>
    <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
      <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
    </Dialog>
    <View>
    <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
      <Accordion
        insideView={
          <InputServiceComponent isCancel={handleCancel} isOk={handleOk} service={service}/>
      }
        title={'Добавьте сервис'}
        bannerStyle={{ backgroundColor: BACK_INPUT }}
        open={openAccordion}
        /* isOpen={isOpen} */
        onPress={handleOnPress}
        /* textBannerStyle={{ color: TEXT_WHITE }} */
      />
    </KeyboardAwareScrollView>
    </View>
    <View style={{ marginTop: 10, height: '85%' }}>
    {openAccordion
      ? null
      : <Tasks />

    }
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
