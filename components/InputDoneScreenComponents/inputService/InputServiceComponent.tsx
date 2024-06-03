import {
  View,
  StyleSheet
} from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import {
  StateService,
  ModalPart, ListService, Seller, getIndexCar
} from '../../../type'
import { AddPartModal } from './AddPartModal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Modal,
  Text,
  Portal,
  Button,
  Surface,
  TextInput,
  TouchableRipple,
  Checkbox, Dialog, Card, SegmentedButtons
} from 'react-native-paper'
import { PickService } from './PickService'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Accordion from '../../Accordion'
import { useAppSelector } from '../../Redux/hook'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { ModalPickSeller } from '../../SellerScreenComponents/ModalPickSeller'
import { useNavigation } from '@react-navigation/native'
// eslint-disable-next-line import/named
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../Navigation/TypeNavigation'
import { useTranslation } from 'react-i18next'
import * as Calendar from 'expo-calendar'
import { addEvent, deleteEvent, updateEvent } from '../CalendarFunction'
import Toast from 'react-native-toast-message'
interface InputServiceProps {
  isCancel: () => void
  isOk: (serviceResult: StateService) => void
  service?: StateService | undefined
  isEdit: boolean
}

interface FormService {
  title: string
  startKm: string
  endKm: string
  startDate: Date
  endDate: Date | string
  sumCostParts: string
  sumCostService: string
  sellerName: string
  sellerPhone: string
  sellerWeb: string
}

export const transformValueDate = (value: Date | string): string => {
  if (value === '') return value
  else return new Date(value).toLocaleDateString()
}

const InputService = ({ isCancel, isOk, service = undefined, isEdit }: InputServiceProps): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */

  const theme = useAppTheme()
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { t } = useTranslation()

  const tempNullService: FormService = {
    title: '',
    startKm: '',
    endKm: '',
    startDate: new Date(),
    endDate: '',
    sumCostParts: '',
    sumCostService: '',
    sellerName: '',
    sellerPhone: '',
    sellerWeb: ''
  }

  const dataToForm = (data: StateService): FormService => {
    let tempStartKm = '0'
    if (isEdit) {
      tempStartKm = data.startKm === undefined || data.startKm === 0
        ? ''
        : String(data.startKm)
    } else {
      tempStartKm = state.currentMiles.currentMileage === undefined || state.currentMiles.currentMileage === 0
        ? ''
        : String(state.currentMiles.currentMileage)
    }
    return {
      title: data.title === undefined ? '' : data.title,
      startKm: tempStartKm,
      endKm: data.endKm === undefined || data.endKm === 0 ? '' : String(data.endKm),
      startDate: data.startDate,
      endDate: data.endData,
      sumCostParts: data.sumCostParts === undefined || data.sumCostParts === 0 ? '' : String(data.sumCostParts),
      sumCostService: data.sumCostService === undefined || data.sumCostService === 0 ? '' : String(data.sumCostService),
      sellerName: data.addition?.services?.name === undefined ? '' : String(data.addition?.services?.name),
      sellerPhone: data.addition?.services?.phone === undefined ? '' : String(data.addition?.services?.phone),
      sellerWeb: data.addition?.services?.web === undefined ? '' : String(data.addition?.services?.web)
    }
  }

  const formToData = (data: FormService): StateService => {
    return {
      id: isEdit ? itemService?.id : Date.now(),
      // @ts-expect-error -typeService may be undefined-
      typeService,
      title: data.title,
      startKm: Number(data.startKm),
      endKm: Number(data.endKm),
      startDate: data.startDate,
      endData: data.endDate,
      sumCostService: Number(data.sumCostService),
      sumCostParts: sumCost,
      addition: {
        parts: addModalParts,
        services: {
          name: data.sellerName,
          phone: data.sellerPhone,
          web: data.sellerWeb
        }
      }
    }
  }

  const [itemService, setItemService] = useState<StateService>(service !== undefined ? service : formToData(tempNullService))

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setFocus
  } = useForm<FormService>({ mode: 'onBlur', defaultValues: tempNullService, values: dataToForm(itemService) })
  const controlDateInput = useWatch({
    control,
    name: 'startDate'
  })
  const [typeWork, setTypeWork] = useState<'mt' | 'repair' | string>('mt')
  const [typeService, setTypeService] = useState < ListService | undefined>(isEdit ? service?.typeService : undefined)
  const [addModalParts, setAddModalParts] = useState<[ModalPart] | undefined>(isEdit ? service?.addition?.parts : undefined)

  const [visibleModalService, setVisibleModalService] = useState(false)
  const [visibleModalAddParts, setVisibleModalAddParts] = useState(false)

  /* -------------------------------------Notification ------------------------------------------------------------ */
  const [checkNotification, setCheckNotification] = useState<'checked' | 'unchecked'>('unchecked')
  const pressCheckNotification = () => {
    checkNotification === 'checked' ? setCheckNotification('unchecked') : setCheckNotification('checked')
  }

  useEffect(() => {
    if (isEdit) {
      if (service?.calendarEventId === '') {
        setCheckNotification('unchecked')
      } else {
        setCheckNotification('checked')
      }
    } else setCheckNotification('unchecked')
  }, [])

  /* useEffect(() => {
    if (checkNotification === 'checked') {
      const tempId = calendarId()
      const id = createEvent(tempId);

      (async () => {

        /!* const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await Calendar.getDefaultCalendarAsync()
            : { isLocalAccount: true, name: 'Expo Calendar' }

        const newCalendarID = await Calendar.createCalendarAsync({
          title: 'DevizCar Calendar',
          color: theme.colors.primary,
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'DevizCarCalendar',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER
        })

        const newEvent = {
          title: 'My Event',
          startDate: new Date('2024-05-15T10:00:00.000Z'),
          endDate: new Date('2024-05-15T11:30:00.000Z'),
          timeZone: 'Europe/Kiev', // Укажите свой часовой пояс
          location: 'Conference Room',
          notes: 'Don\'t forget your documents!'
        }

        try {
          const eventId = await Calendar.createEventAsync(newCalendarID, newEvent)
          console.log(`Event created successfully! Event ID: ${eventId}`)
        } catch (error) {
          console.error('Error creating event:', error)
        } *!/
      })()
    }
  }, [checkNotification]) */

  /* -------------------- function modal Add Parts --------------------------------------- */
  const showModalAddParts = (): void => { setVisibleModalAddParts(true) }
  const hideModalAddParts = (): void => { setVisibleModalAddParts(false) }

  /* -------------------- function modal Pick Service ----------------------------------- */
  const [requireService, setRequireService] = useState(false)
  const showModalService = (): void => { setVisibleModalService(true) }
  const hideModalService = (): void => { setVisibleModalService(false) }
  const okModalService = (item: ListService): void => {
    setTypeService(item)
    hideModalService()
  }
  /* --------------------------------------------------------------------------- */

  const [amountPart, setAmountPart] = useState(0)
  const [sumCost, setSumCost] = useState(0)

  const inputDate = (target: string): void => {
    DateTimePickerAndroid.open({
      value: new Date(),
      /* display: 'spinner', */
      // @ts-expect-error date undefined
      onChange: (event, date) => { setValue(target, date) }

    })
  }
  const editDate = (start: Date, increment: number): Date => {
    const tempDate = new Date(start)
    tempDate.setMonth(tempDate.getMonth() + increment)
    return tempDate
  }

  const updateTypeService = (): void => {
    if (typeService?.nameService !== undefined) {
      setRequireService(false)
    }
    if (typeService?.mileage !== undefined) {
      setValue('endKm', String(Number(getValues('startKm')) + typeService?.mileage))
    }
    if (typeService?.date !== undefined) {
      const temp = getValues('startDate')
      setValue('endDate', editDate(temp, typeService.date))
    }
  }

  useEffect(() => {
    if (isEdit) {
      if (service?.title === '') setTypeWork('mt')
      else if (service?.typeService === undefined) setTypeWork('repair')
    }
  }, [])

  useEffect(() => {
    updateTypeService()
  }, [typeService, controlDateInput])

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

  // ---------------------------handleButtons-----------------------------------
  const handleCancel = (): void => {
    isCancel()
  }

  // ----------------------------------------------------------------------------

  const handleOk = (dataForm: FormService): void => {
    if (typeWork === 'mt') {
      if (typeService?.nameService === undefined) {
        setRequireService(true)
        return
      }
    }

    const calcDate = (currentDate: Date, decrement: number) => {
      const tempDate = currentDate.setDate(currentDate.getDate() - decrement)
      return new Date(new Date(tempDate).setHours(10, 0))
    }
    const titleService = dataForm.title === '' ? typeService?.nameService : dataForm.title

    const tempDate: Calendar.Event = {
      // @ts-expect-error ddjhnkn
      title: titleService,
      startDate: calcDate(new Date(dataForm.endDate), 10),
      endDate: calcDate(new Date(dataForm.endDate), 10),
      notes: t('calendar.NOTE_CALENDAR', { titleService }),
      location: dataForm.sellerName
    }

    const finish = (idEvent: string) => {
      const tempData: StateService = {
        ...formToData(dataForm),
        calendarEventId: idEvent
      }
      isOk(tempData)
    }

    if (checkNotification === 'checked') {
      if (service?.calendarEventId === '' || service?.calendarEventId === undefined) {
        // create event
        addEvent(tempDate)
          .then(value => {
            finish(value)
            Toast.show({
              type: 'success',
              text1: t('calendar.CREATE_EVENT'),
              visibilityTime: 4000,
              topOffset: 150
              /* text2: 'This is some something 👋' */
            })
          })
          .catch(reason => {
            Toast.show({
              type: 'error',
              text1: t('calendar.ERROR_CREATE_EVENT'),
              visibilityTime: 2500,
              text2: reason.message
            })
          })
      } else {
        // update event
        updateEvent(service?.calendarEventId, tempDate)
          .then(value => { finish(value) })
          .catch(reason => {
            Toast.show({
              type: 'error',
              text1: t('calendar.ERROR_UPDATE_EVENT'),
              visibilityTime: 2500,
              text2: reason.message
            })
          })
      }
    } else if (checkNotification === 'unchecked') {
      if (service?.calendarEventId === '' || service?.calendarEventId === undefined) {
        // nothing
        finish('')
      } else {
        // delete event
        deleteEvent(service?.calendarEventId)
          .then(value => {
            finish('')
            Toast.show({
              type: 'info',
              text1: t('calendar.DELETE_EVENT'),
              visibilityTime: 4000,
              topOffset: 150
              /* text2: 'This is some something 👋' */
            })
          })
          .catch(reason => {
            Toast.show({
              type: 'error',
              text1: t('calendar.ERROR_DELETE_EVENT'),
              visibilityTime: 4000,
              topOffset: 150,
              text2: reason.message
            })
          })
      }
    }
  }
  // ---------------------------------------------------------------------------
  // ---------------------- handle ModalPickSeller -----------------------------
  const [visibleSeller, setVisibleSeller] = useState(false)
  const handlePress = (item: Seller): void => {
    setVisibleSeller(false)
    setValue('sellerName', item.name)
    setValue('sellerPhone', String(item.phone))
    setValue('sellerWeb', String(item.web))
  }
  const editPress = (item: Seller): void => {
    setVisibleSeller(false)
    navigation.navigate('SellerScreen', { item })
  }
  const pressEditSeller = (): void => {
    setVisibleSeller(false)
    navigation.navigate('SellerScreen')
  }
  // ---------------------- handleModal ----------------------------------------

  const handleCancelModal = (): void => {
    setVisibleModalAddParts(false)
  }

  const handleOkModal = (parts: [ModalPart]): void => {
    setAddModalParts(parts)
    setVisibleModalAddParts(false)
    Toast.show({
      type: 'info',
      text1: 'Не забудьте отметить на складе ',
      visibilityTime: 3000,
      text2: 'установку/снятие деталей после сохранения 👋',
      text2Style: { fontSize: 11, fontWeight: 'bold', color: theme.colors.text }
    })
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
    <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 5 }}>
          <View>
            <Card style={{ marginHorizontal: 10 }}>
              <Card.Content style={{ paddingTop: 7 }}>
                <SegmentedButtons
                  buttons={[{
                    value: 'mt',
                    label: t('inputService.MAINTENANCE'),
                    style: { borderRadius: 1 }
                  }, {
                    value: 'repair',
                    label: t('inputService.REPAIR'),
                    style: { borderRadius: 1 }
                  }]}
                  value={typeWork}
                  density={'small'}
                  onValueChange={(value) => { setTypeWork(value) }}
                  style={{ width: '70%', alignSelf: 'center', marginBottom: 7 }}
                />

                {
                 // ---------------------------------------------------------------------------------------------
                }
                {typeWork === 'repair'
                  ? <Surface elevation={2} >
                    <Controller name={'title'}
                                control={control}
                                rules={{ required: typeWork === 'repair' }}
                                render={({
                                  field: {
                                    onChange,
                                    value,
                                    ref,
                                    onBlur
                                  }, fieldState: { error }
                                }) => (
                                  <TextInput
                                    error={(error != null) && true}
                                    ref={ref}
                                    style={{
                                      flex: 1,
                                      backgroundColor: theme.colors.surface,
                                      height: 40
                                    }}
                                    /* label={t('NAME')} */
                                    placeholder={t('NAME')}
                                    value={value}
                                    onSubmitEditing={updateTypeService}
                                    onChangeText={(value) => {
                                      onChange(value)
                                    }}
                                    onBlur={onBlur}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                  : <Button mode={'elevated'} onPress={showModalService} style={{
                    marginHorizontal: 5,
                    borderRadius: 1,
                    borderColor: requireService ? theme.colors.error : undefined,
                    borderWidth: requireService ? 2 : 0
                  }}>
                    {typeService !== undefined
                      ? `${String(typeService?.nameService)} / ${String(typeService?.mileage)} km / ${String(typeService?.date)} год`
                      : t('inputService.SELECT_TO')
                    }
                  </Button>
              }
              </Card.Content>
            </Card>

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
                                    label={t('inputService.CURRENT_MILEAGE')}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onSubmitEditing={updateTypeService}
                                    onChangeText={(value) => { onChange(value) }}
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
                                    label={t('inputService.REPLACE_MILEAGE')}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onChangeText={(value) => { onChange(value) }}
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
                                    label={t('inputService.DATE_SERVICE')}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    /* onChangeText={(value) => onChange(value)} */
                                    onPressOut={() => { inputDate('startDate') }}
                                    /* onSubmitEditing={updateTypeService} */
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
                                    label={t('inputService.DATE_REPLACE')}
                                    showSoftInputOnFocus={false}
                                    right={value !== ''
                                      ? <TextInput.Icon
                                        icon={'backspace'}
                                        forceTextInputFocus={false}
                                        onPress={() => { setValue('endDate', '') }}/>
                                      : null
                                    }
                                    /* value={new Date(value).toLocaleDateString()} */
                                    value={transformValueDate(value)}
                                    onPressOut={() => { inputDate('endDate') }}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                </View>
            </View>
            {
              // --------------- Input cost service and add Task--------------------------------------
            }
            <View style={styles.viewGroupInput}>
              {/*  <Surface elevation={2} style={styles.surface}>
                  <Controller name={'sumCostParts'}
                              control={control}
                              render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                <TextInput
                                  ref={ref}
                                  dense
                                  editable={amountPart === 0}
                                  style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                  label={'цена деталей'}
                                  onChangeText={(value) => onChange(value)}
                                  value={value}
                                  onBlur={onBlur}
                                  error={(error != null) && true}
                                />
                              ) }
                  />
                </Surface> */}
              <Surface elevation={2} style={styles.surface}>
                <Controller name={'sumCostService'}
                            control={control}
                  /* rules={{ required: 'введите название' }} */
                            render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                              <TextInput
                                ref={ref}
                                dense
                                style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                label={t('inputService.COST_SERVICE')}
                                keyboardType={'numeric'}
                                onChangeText={(value) => { onChange(value) }}
                                value={value}
                                onBlur={onBlur}
                                error={(error != null) && true}
                              />
                            ) }
                />
              </Surface>
              <Surface elevation={2} style={styles.surface}>
                <Checkbox.Item
                  status={checkNotification}
                  color={theme.colors.tertiary}
                  label={t('inputService.REMINDER')}
                  labelVariant={'bodySmall'}
                  onPress={pressCheckNotification}
                  mode={'ios'}
                />
              </Surface>
            </View>
            {
              // --------------- Button for modal adding parts --------------------------------------
            }
              <Surface style={{ margin: 5, flex: 1 }}>
                <TouchableRipple style={styles.textCost} onPress={() => {
                  showModalAddParts()
                }}>
                  <>
                  <Text style={{ fontWeight: 'bold' }}>{t('inputService.ADD_PARTS')}</Text>
                  {/* <Text >{`Добавлено: ${amountPart} шт на сумму ${sumCost} грн`}</Text> */}
                  <Text >{t('inputService.ADD_SUM', { amountPart, sumCost, currency: state.info.currency })}</Text>
                  </>
                </TouchableRipple>
              </Surface>

            {
              // --------------- ----Drop Input Seller ------------------------------------------
            }

            <Surface elevation={2} style={styles.surface}>
              <Accordion
                /* bannerStyle={{ backgroundColor: mode === 'dark' ? BACK_INPUT : TEXT_WHITE }} */
                title={t('seller.DATA_SELLER')}
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
                                      label={t('seller.NAME_SELLER')}
                                      /* keyboardType={'phone-pad'} */
                                      onChangeText={(value) => { onChange(value) }}
                                      value={value}
                                      right={<TextInput.Icon icon="notebook" forceTextInputFocus={false}
                                                             color={theme.colors.tertiary}
                                                             onPress={() => { setVisibleSeller(true) }
                                                             }/>}
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
                                        label={t('PHONE')}
                                        keyboardType={'phone-pad'}
                                        onChangeText={(value) => { onChange(value) }}
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
                                        label={t('LINK')}
                                        keyboardType={'url'}
                                        onChangeText={(value) => { onChange(value) }}
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
    {
      // -------------------------------- ModalPickSeller -----------------------
    }
    <Portal>
      <Dialog visible={visibleSeller} onDismiss={() => { setVisibleSeller(false) }}>
        <ModalPickSeller handlePress={handlePress} editPress={editPress} navigation={pressEditSeller}/>
      </Dialog>
    </Portal>
    {
      // ------------------------------------------------------------------------
    }
  </View>
  )
}

export default InputService

const styles = StyleSheet.create({
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
