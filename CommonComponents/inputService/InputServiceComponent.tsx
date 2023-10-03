import {
  View,
  StyleSheet
} from 'react-native'
import { useEffect, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import {
  BACK_INPUT,
  ServiceList,
  StateService,
  ModalPart, ListService
} from '../../type'
import { AddPartModal } from './AddPartModal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Modal,
  useTheme,
  Text,
  Portal,
  Button,
  Surface,
  TextInput,
  TouchableRipple
} from 'react-native-paper'
import { PickService } from './PickService'
import { Controller, useForm } from 'react-hook-form'
import Accordion from '../../components/Accordion'

interface InputServiceProps {
  isCancel: () => void
  isOk: (serviceResult: StateService) => void
  service?: StateService | null
  isEdit: boolean
}

interface FormService {
  startKm: string
  endKm: string
  startDate: Date
  endDate: Date
  sumCostParts: string
  sunCostService: string
  sellerName: string
  sellerPhone: string
  sellerWeb: string
}

const InputService = ({ isCancel, isOk, service = null, isEdit }: InputServiceProps): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */

  const theme = useTheme()

  const tempNullService: FormService = {
    startKm: '',
    endKm: '',
    startDate: new Date(),
    endDate: new Date(),
    sumCostParts: '',
    sunCostService: '',
    sellerName: '',
    sellerPhone: '',
    sellerWeb: ''
  }

  const dataToForm = (data: StateService): FormService => {
    return {
      startKm: String(data.startKm),
      endKm: String(data.endKm),
      startDate: data.startDate,
      endDate: data.endData,
      sumCostParts: data.sumCostParts === undefined || data.sumCostParts === 0 ? '' : String(data.sumCostParts),
      sunCostService: data.sumCostService === undefined || data.sumCostService === 0 ? '' : String(data.sumCostService),
      sellerName: data.addition?.services?.name === undefined ? '' : String(data.addition?.services?.name),
      sellerPhone: data.addition?.services?.phone === undefined ? '' : String(data.addition?.services?.phone),
      sellerWeb: data.addition?.services?.link === undefined ? '' : String(data.addition?.services?.link)
    }
  }

  const formToData = (data: FormService): StateService => {
    return {
      id: isEdit ? itemService?.id : Date.now(),
      typeService,
      /* title: typeService?.nameService, */
      startKm: Number(data.startKm),
      endKm: Number(data.endKm),
      startDate: data.startDate,
      endData: data.endDate,
      sumCostService: Number(data.sunCostService),
      sumCostParts: Number(data.sumCostParts),
      addition: {
        parts: addModalParts,
        services: {
          name: data.sellerName,
          phone: data.sellerPhone,
          link: data.sellerWeb
        }
      }
    }
  }

  const [itemService, setItemService] = useState<StateService>(service != null ? service : formToData(tempNullService))

  const {
    control,
    handleSubmit,
    setValue,
    setFocus
  } = useForm<FormService>({ mode: 'onBlur', defaultValues: tempNullService, values: dataToForm(itemService) })

  /* const listService = [
    { label: 'engineOil', value: 'engineOil' },
    { label: 'gearOil', value: 'gearOil' },
    { label: 'airFilter', value: 'airFilter' },
    { label: 'fuelFilter', value: 'fuelFilter' },
    { label: 'driveBelt', value: 'driveBelt' },
    { label: 'timingBelt', value: 'timingBelt' }
  ] */
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

  const [typeService, setTypeService] = useState < ListService | undefined>(isEdit ? service?.typeService : undefined)
  const [addModalParts, setAddModalParts] = useState<[ModalPart] | undefined>(isEdit ? service?.addition?.parts : undefined)

  const [visibleModalService, setVisibleModalService] = useState(false)
  const [visibleModalAddParts, setVisibleModalAddParts] = useState(false)

  /* -------------------- function modal Add Parts --------------------------------------- */
  const showModalAddParts = (): void => setVisibleModalAddParts(true)
  const hideModalAddParts = (): void => setVisibleModalAddParts(false)

  /* -------------------- function modal Pick Service ----------------------------------- */
  const showModalService = (): void => setVisibleModalService(true)
  const hideModalService = (): void => setVisibleModalService(false)
  const okModalService = (item: ListService): void => {
    setTypeService(item)
    hideModalService()
  }
  /* --------------------------------------------------------------------------- */

  const [errorMsg, setErrorMsg] = useState('')

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

  const [addServices, setAddServices] = useState<[ServiceList] | undefined>()

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

  /* useEffect(() => {
    if (service !== null) {
      handleOpen(service)
    }
  }, []) */

  /*  const handleOpen = (item: StateService): void => {
    if (!isOpenAccordion) {
      setStartKmInput(item.startKm)
      setAddModalParts(item.addition?.parts)
      setStartDateInput(new Date(item.startDate))
      setCostService(item.sumCostService !== undefined ? item.sumCostService : 0)
      setValueDrop(item.title)
      /!* handleOnPress() *!/
    }
  } */

  /* useEffect(() => {
    setEndKmInput(startKmInput + kmToService)
  }, [startKmInput, kmToService]) */

  /* useEffect(() => {
    setEndDateInput(editDate(startDateInput.toLocaleDateString(), timeToService))
  }, [startDateInput, timeToService]) */

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

  /* const clearInput = (): void => {
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
    isCancel()
  }

  const handleOk = (dataForm: FormService): void => {
    isOk(formToData(dataForm))

    /*  const tempNewTask: StateService = {
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
    }
 */
    /* createNewParts() */

    /* editableTask
      ? setNewTask(editTask(state.numberCar, currentId, tempNewTask))
      : setNewTask(addTask(state.numberCar, tempNewTask)) */

    /* handleOnPress() */
    /* isOk(tempNewTask) */
  }
  // ---------------------------------------------------------------------------
  // ---------------------- handleModal ----------------------------------------

  const handleCancelModal = (): void => {
    setVisibleModalAddParts(false)
  }

  const handleOkModal = (parts: [ModalPart]): void => {
    setAddModalParts(parts)
    /* setAddServices(services) */
    setVisibleModalAddParts(false)
  }
  // ---------------------------------------------------------------------------

  return (
  <View>
    {
      // -------------------------- Modal for selecting type of service ---------------------------
    }
    <Portal>
    <Modal visible={visibleModalService} onDismiss={hideModalService} dismissableBackButton
           contentContainerStyle={{ marginHorizontal: 20, backgroundColor: theme.colors.background, borderRadius: 5, padding: 3 }}>
      <PickService
        typeService={typeService}
        cancelPress={hideModalService}
        okPress={okModalService}
      />
    </Modal>
    </Portal>
    {
      // -------------------------------------------------------------------------------------------
    }
    <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
          <View>
    {
    // ----------------------------- Button for selecting type of service ---------------------------
    }
            <Button mode={'elevated'} onPress={showModalService} >
              {typeService !== undefined
                ? `${String(typeService?.nameService)} / ${String(typeService?.mileage)} km / ${String(typeService?.date)} год`
                : 'Выберите тип ТО'
              }
            </Button>
    {
      // -------------------------------------------------------------------------------------------
    }
            <View style={styles.viewAllInput}>
                {
                  // --------------- Input miles of service ----------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'startKm'}
                                control={control}
                                render={ ({ field: { onChange, value, ref, onBlur } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'текущий пробег'}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onChangeText={(value) => onChange(value)}
                                    onBlur={onBlur}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'endKm'}
                                control={control}
                                render={ ({ field: { onChange, value, ref, onBlur } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'пробег замены'}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onChangeText={(value) => onChange(value)}
                                    onBlur={onBlur}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                </View>
                {
                  // --------------- Input date of service ------------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'startDate'}
                                control={control}
                                render={ ({ field: { value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'дата сервиса'}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    onPressOut={inputDate}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'endDate'}
                                control={control}
                                render={ ({ field: { value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'дата замены'}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    onPressOut={inputDate}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                </View>
            </View>
            {
              // --------------- Button for modal adding parts --------------------------------------
            }
              <Surface style={{ margin: 5, flex: 1 }}>
                <TouchableRipple style={styles.textCost} onPress={() => {
                  showModalAddParts()
                }}>
                  <>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Добавить комплектующие</Text>
                  <Text >{`Добавлено деталей: ${amountPart} шт`}</Text>
                  </>
                </TouchableRipple>
              </Surface>
            {
              // --------------- Input cost parts and service --------------------------------------
            }
              <View style={styles.viewGroupInput}>
                <Surface elevation={2} style={styles.surface}>
                  <Controller name={'sumCostParts'}
                              control={control}
                              /* rules={{ required: 'цена деталей' }} */
                              render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                <TextInput
                                  ref={ref}
                                  dense
                                  style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                  label={'цена деталей'}
                                  onChangeText={(value) => onChange(value)}
                                  value={value}
                                  onBlur={onBlur}
                                  error={(error != null) && true}
                                  /* onSubmitEditing={() => {
                                    setFocus('dateBuy')
                                  }} */
                                />
                              ) }
                  />
                </Surface>
                <Surface elevation={2} style={styles.surface}>
                  <Controller name={'sunCostService'}
                              control={control}
                              /* rules={{ required: 'введите название' }} */
                              render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                <TextInput
                                  ref={ref}
                                  dense
                                  style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                  label={'цена работы'}
                                  onChangeText={(value) => onChange(value)}
                                  value={value}
                                  onBlur={onBlur}
                                  error={(error != null) && true}
                                  /* onSubmitEditing={() => {
                                    setFocus('dateBuy')
                                  }} */
                                />
                              ) }
                  />
                </Surface>
              </View>
            {
              // --------------- Label sum cost service - ------------------------------------------
            }
            {/* <Surface style={{ margin: 5, flex: 1 }}>
              <Text style={styles.textCost}>{`Итого затраты: ${sumCost + costService} грн`}</Text>
            </Surface> */}

            <Surface elevation={2} style={styles.surface}>
              <Accordion
                /* bannerStyle={{ backgroundColor: mode === 'dark' ? BACK_INPUT : TEXT_WHITE }} */
                title={'Данные продавца'}
                textBannerStyle={{
                  fontSize: 14,
                  color: theme.colors.secondary
                }}
                controlled={false}
                insideView={
                  <View style={{ flexDirection: 'column' }}>
                    <Surface elevation={2} style={styles.surface}>
                      <Controller name={'sellerName'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                    <TextInput
                                      ref={ref}
                                      style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                      label={'название'}
                                      /* keyboardType={'phone-pad'} */
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      onSubmitEditing={() => {
                                        setFocus('sellerPhone')
                                      }}
                                      onBlur={onBlur}
                                    />
                                  )}
                      />
                    </Surface>

                    <View style={styles.viewGroupInput}>
                      <Surface elevation={2} style={styles.surface}>
                        <Controller name={'sellerPhone'}
                                    control={control}
                                    render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                      <TextInput
                                        ref={ref}
                                        style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                        label={'телефон'}
                                        keyboardType={'phone-pad'}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        onSubmitEditing={() => {
                                          setFocus('sellerWeb')
                                        }}
                                        onBlur={onBlur}
                                      />
                                    )}
                        />
                      </Surface>
                      <Surface elevation={2} style={styles.surface}>
                        <Controller name={'sellerWeb'}
                                    control={control}
                                    render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                      <TextInput
                                        ref={ref}
                                        style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                        label={'интернет'}
                                        keyboardType={'url'}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        /* onSubmitEditing={() => {
                                          setFocus('numberPart2')
                                        }} */
                                        onBlur={onBlur}
                                      />
                                    )}
                        />
                      </Surface>
                    </View>
                    {
                      // ---------------------- Seller ------------------------------------------
                    }

                  </View>
                }
              />
            </Surface>

            {
              // --------------- Modal adding parts -------------------------------------------------
            }
            <Portal>
                <Modal
                  visible={visibleModalAddParts} onDismiss={hideModalAddParts}
                  dismissableBackButton
                  contentContainerStyle={{ marginHorizontal: 5, backgroundColor: theme.colors.background, borderRadius: 5, padding: 3 }}
                >
                  <AddPartModal
                    initialParts = {addModalParts}
                    onPressCancel = {handleCancelModal}
                    onPressOk={handleOkModal}
                  />
                </Modal>
            </Portal>
            {
              // --------------- Result buttons ------------------------------------------
            }
            <View style={styles.viewButton}>
              <Button
                style={styles.buttonStyle}
                labelStyle={{ color: 'white' }}
                buttonColor={theme.colors.error}
                onPress={() => { handleCancel() }}
              >Cancel</Button>
              <Button
                style={styles.buttonStyle}
                labelStyle={{ color: 'white' }}
                buttonColor={theme.colors.tertiary}
                onPress={handleSubmit(handleOk)}
              >Ok</Button>
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
  surface: {
    margin: 5,
    flex: 1
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
