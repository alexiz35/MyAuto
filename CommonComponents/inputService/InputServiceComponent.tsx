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
import { Dialog, Divider, Icon, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../../components/Redux/hook'
import {
  BACK_INPUT,
  COLOR_GREEN,
  StatePart,
  ServiceList,
  StateService,
  TEXT,
  TEXT_WHITE,
  ModalPart,
  StateOther
} from '../../type'
import { RootStackParamList } from '../../components/Navigation/Navigation'
import { addPart, addService, editService } from '../../components/Redux/actions'
import { AddPartModal } from '../../components/AddPartModal'
import ShadowBox from '../ShadowBox'
import Accordion from '../../components/Accordion'
import { Tasks } from '../../components/HomeScreenComponents/Tasks'
import BackgroundView from '../BackgroundView'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { IconButton, Modal, useTheme, Text, Portal, Button } from 'react-native-paper'
import { ListService, PickService } from './PickService'

interface InputServiceProps {
  isCancel: () => void
  isOk: (serviceResult: StateService) => void
  service?: StateService | null
  isEdit: boolean
}

interface FormPart {
  namePart: string
  numberPart: string
  dateBuy: Date
  costPart: string
  quantityPart: string
  amountCostPart: string
  seller: {
    name: string
    phone: string
    link: string
  }
}

const InputService = ({ isCancel, isOk, service = null, isEdit }: InputServiceProps): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */

  const theme = useTheme()

  const listService = [
    { label: 'engineOil', value: 'engineOil' },
    { label: 'gearOil', value: 'gearOil' },
    { label: 'airFilter', value: 'airFilter' },
    { label: 'fuelFilter', value: 'fuelFilter' },
    { label: 'driveBelt', value: 'driveBelt' },
    { label: 'timingBelt', value: 'timingBelt' }
  ]

  /* const editableTask: boolean = route.params.editable
  const currentId: number | undefined = route.params.taskId */

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

  const [visibleModalService, setVisibleModalService] = useState(false)
  const [typeService, setTypeService] = useState<ListService>()

  const showModalService = () => setVisibleModalService(true)
  const hideModalService = () => setVisibleModalService(false)
  const okModalService = (item: ListService): void => {
    setTypeService(item)
    hideModalService()
  }

  const [errorMsg, setErrorMsg] = useState('')
  const [openDrop, setOpenDrop] = useState(false)
  const [valueDrop, setValueDrop] = useState<null | string>(null)
  const [itemsDrop, setItemsDrop] = useState(listService)

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)

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

  const [addModalParts, setAddModalParts] = useState<[ModalPart] | undefined>()
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
    if (service !== null) {
      handleOpen(service)
    }
  }, [])

  const handleOpen = (item: StateService): void => {
    if (!isOpenAccordion) {
      setStartKmInput(item.startKm)
      setAddModalParts(item.addition?.parts)
      setStartDateInput(new Date(item.startDate))
      setCostService(item.sumCostService !== undefined ? item.sumCostService : 0)
      setValueDrop(item.title)
      /* handleOnPress() */
    }
  }

  useEffect(() => {
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService])

  useEffect(() => {
    setEndDateInput(editDate(startDateInput.toLocaleDateString(), timeToService))
  }, [startDateInput, timeToService])

  useEffect(() => {
    counter(addModalParts)
  }, [addModalParts])

  const counter = (parts: ModalPart[] | undefined): void => {
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
  const clearInput = (): void => {
    setValueDrop(null)
    setStartDateInput(new Date())
    setStartKmInput(0)
    setCostParts(0)
    setCostService(0)
    setAddModalParts(undefined)
  }

  // ---------------------------Accordion --------------------------------------
  /* const isOpen = (open: boolean): void => {
    setIsOpenAccordion(open)
    if (!open) setOpenAccordion(false)
    else setOpenAccordion(true)
  } */
  // ---------------------------------------------------------------------------
  /* const createNewParts = (): void => {
    // eslint-disable-next-line array-callback-return
    addModalParts?.map((item) => {
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
  } */

  // ---------------------------handleButtons-----------------------------------
  const handleCancel = (): void => {
    clearInput()
    isCancel()
  }

  const handleOk = (): void => {
    if (valueDrop === null || startKmInput === 0) {
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
      /* isFinished: false, */
      addition:
        {
          parts: addModalParts,
          services: addServices
        }
    }

    /* createNewParts() */

    /* editableTask
      ? setNewTask(editTask(state.numberCar, currentId, tempNewTask))
      : setNewTask(addTask(state.numberCar, tempNewTask)) */

    /* handleOnPress() */
    isOk(tempNewTask)
  }
  // ---------------------------------------------------------------------------
  // ---------------------- handleModal ----------------------------------------

  const handleCancelModal = (): void => {
    setIsVisible(false)
  }

  const handleOkModal = (parts: [ModalPart]): void => {
    setAddModalParts(parts)
    /* setAddServices(services) */
    setIsVisible(false)
  }
  // ---------------------------------------------------------------------------

  return (
  <View>
    <Portal>
    <Modal visible={visibleModalService} onDismiss={hideModalService} dismissableBackButton
           contentContainerStyle={{ marginHorizontal: 20, backgroundColor: theme.colors.background, borderRadius: 5, padding: 3 }}>
      <PickService typeService={typeService} cancelPress={hideModalService} okPress={okModalService}/>
    </Modal>
    </Portal>
    <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
          <View>
            <Button mode={'elevated'} onPress={showModalService} >
              {typeService !== undefined
                ? `${String(typeService?.nameService)} / ${String(typeService?.mileage)} km / ${String(typeService?.date)} год`
                : 'Выберите тип ТО'
              }
            </Button>

            {/*  <DropDownPicker
              style={styles.dropDownPicker}
              listMode={'SCROLLVIEW'}
              dropDownContainerStyle={{
                backgroundColor: theme.colors.background, // 'rgba(61,61,61,0.94)'
                marginHorizontal: 5,
                width: '97%',
                borderColor: theme.colors.outline
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
              selectedItemLabelStyle={{ color: theme.colors.tertiary, fontWeight: 'bold' }}
              onChangeValue={(value) => changeTask(value)}
              textStyle={{ color: theme.colors.primary, textAlign: 'center', fontSize: 18 }}
              arrowIconStyle={{
                width: 30,
                height: 30

              }}
              ArrowDownIconComponent={() => <Icon type={'material-community'} name={'chevron-down'} color={'grey'} size={30}/>}
            /> */}
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
                setIsOpenAccordion(true)
                setTimeout(() => {
                  setIsVisible(true)
                  setIsOpenAccordion(false)
                }, 100)
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
              <AddPartModal
                initialParts = {addModalParts}
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
                onPress={() => { handleCancel() }}
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
    </KeyboardAwareScrollView>

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
