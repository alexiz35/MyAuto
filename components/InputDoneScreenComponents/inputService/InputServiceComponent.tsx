import {
  View,
  StyleSheet
} from 'react-native'
import { useEffect, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import {
  StateService,
  ModalPart, ListService, Seller
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
  Checkbox, Dialog
} from 'react-native-paper'
import { PickService } from './PickService'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Accordion from '../../Accordion'
import { useAppSelector } from '../../Redux/hook'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { ModalPickSeller } from '../../SellerScreenComponents/ModalPickSeller'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../Navigation/TypeNavigation'

interface InputServiceProps {
  isCancel: () => void
  isOk: (serviceResult: StateService) => void
  service?: StateService | undefined
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

const InputService = ({ isCancel, isOk, service = undefined, isEdit }: InputServiceProps): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */

  const theme = useAppTheme()
  const state = useAppSelector((state) => state.cars[state.numberCar])
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

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
      startKm: isEdit ? String(data.startKm) : String(state.currentMiles.currentMileage),
      endKm: String(data.endKm),
      startDate: data.startDate,
      endDate: data.endData,
      sumCostParts: data.sumCostParts === undefined || data.sumCostParts === 0 ? '' : String(data.sumCostParts),
      sunCostService: data.sumCostService === undefined || data.sumCostService === 0 ? '' : String(data.sumCostService),
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

  const [amountPart, setAmountPart] = useState(0)
  const [sumCost, setSumCost] = useState(0)

  const inputDate = (target: string): void => DateTimePickerAndroid.open({
    value: new Date(),
    /* display: 'spinner', */
    // @ts-expect-error date undefined
    onChange: (event, date) => setValue(target, date)

  })
  const editDate = (start: Date, increment: number): Date => {
    const tempDate = new Date(start)
    tempDate.setMonth(tempDate.getMonth() + increment)
    return tempDate
  }

  const updateTypeService = (): void => {
    if (typeService?.mileage !== undefined) {
      setValue('endKm', String(Number(getValues('startKm')) + typeService?.mileage))
    }
    if (typeService?.date !== undefined) {
      const temp = getValues('startDate')
      setValue('endDate', editDate(temp, typeService.date))
    }
  }

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

  const handleOk = (dataForm: FormService): void => {
    isOk(formToData(dataForm))
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
    {
    // ----------------------------- Button for selecting type of service ---------------------------
    }
            <Button mode={'elevated'} onPress={showModalService} style={{ marginHorizontal: 5, borderRadius: 1 }} >
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
                                    onSubmitEditing={updateTypeService}
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
                                render={ ({ field: { value, onChange, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'дата сервиса'}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    /* onChangeText={(value) => onChange(value)} */
                                    onPressOut={() => inputDate('startDate')}
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
                                    label={'дата замены'}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    onPressOut={() => inputDate('endDate')}
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
                <Controller name={'sunCostService'}
                            control={control}
                  /* rules={{ required: 'введите название' }} */
                            render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                              <TextInput
                                ref={ref}
                                dense
                                style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                label={'цена сервиса'}
                                keyboardType={'numeric'}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                onBlur={onBlur}
                                error={(error != null) && true}
                              />
                            ) }
                />
              </Surface>
              <Surface elevation={2} style={styles.surface}>
                <Checkbox.Item
                  status={'unchecked'}
                  color={theme.colors.tertiary}
                  label={'Создать \nнапоминание'}
                  labelVariant={'bodySmall'}
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
                  <Text style={{ fontWeight: 'bold' }}>Добавить комплектующие</Text>
                  <Text >{`Добавлено: ${amountPart} шт на сумму ${sumCost} грн`}</Text>
                  </>
                </TouchableRipple>
              </Surface>

            {
              // --------------- ----Drop Input Seller ------------------------------------------
            }

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
                                      right={<TextInput.Icon icon="notebook" forceTextInputFocus={false}
                                                             color={theme.colors.tertiary}
                                                             onPress={() => setVisibleSeller(true)
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
    {
      // -------------------------------- ModalPickSeller -----------------------
    }
    <Portal>
      <Dialog visible={visibleSeller} onDismiss={() => setVisibleSeller(false)}>
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
