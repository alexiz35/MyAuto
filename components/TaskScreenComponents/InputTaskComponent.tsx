import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  Surface,
  TextInput,
  Checkbox, SegmentedButtons, Portal, Dialog
} from 'react-native-paper'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Accordion from '../Accordion'

import { useAppTheme } from '../../CommonComponents/Theme'
import { Seller, StateTask } from '../../type'
import { useAppSelector } from '../Redux/hook'
import { useEffect, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation/Navigation'
import { ModalPickSeller } from '../SellerScreenComponents/ModalPickSeller'
import { StackNavigationProp } from '@react-navigation/stack'

interface InputTaskProps {
  isCancel: () => void
  isOk: (taskResult: StateTask) => void
  task?: StateTask | null
  isEdit: boolean
}

interface FormTask {
  typeTask: string
  name: string
  numberPart1: string
  numberPart2: string
  numberPart3: string
  dateEndTask: Date
  milesEndTask?: string
  cost: string
  quantity: string
  amount: string
  sellerName: string
  sellerPhone: string
  sellerWeb: string
  isFinished: boolean
}
type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'InputDoneScreen'>

const InputTaskComponent = ({ isCancel, isOk, task = null, isEdit }: InputTaskProps): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */

  const theme = useAppTheme()
  const state = useAppSelector(state => state.cars[state.numberCar])
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const tempNullTask: FormTask = {
    typeTask: 'part',
    name: '',
    numberPart1: '',
    numberPart2: '',
    numberPart3: '',
    dateEndTask: new Date(),
    milesEndTask: '',
    cost: '',
    quantity: '',
    amount: '',
    sellerName: '',
    sellerPhone: '',
    sellerWeb: '',
    isFinished: false
  }

  const dataToForm = (data: StateTask): FormTask => {
    return {
      typeTask: data.typeTask === undefined ? 'part' : data.typeTask,
      name: data.name,
      dateEndTask: data.dateEndTask,
      milesEndTask: String(data.milesEndTask),
      numberPart1: data.numberPart1 === undefined ? '' : data.numberPart1,
      numberPart2: data.numberPart2 === undefined ? '' : data.numberPart2,
      numberPart3: data.numberPart3 === undefined ? '' : data.numberPart3,
      cost: data.cost === undefined || data.cost === 0 ? '' : String(data.cost),
      quantity: data.quantity === undefined || data.quantity === 0 ? '' : String(data.quantity),
      amount: data.amount === undefined || data.amount === 0 ? '' : String(data.amount),
      sellerName: data.seller?.name === undefined ? '' : String(data.seller?.name),
      sellerPhone: data.seller?.phone === undefined ? '' : String(data.seller?.phone),
      sellerWeb: data.seller?.web === undefined ? '' : String(data.seller?.web),
      isFinished: data.isFinished
    }
  }

  const formToData = (data: FormTask): StateTask => {
    return {
      id: isEdit ? itemTask?.id : Date.now(),
      typeTask: data.typeTask,
      name: data.name,
      dateEndTask: data.dateEndTask,
      milesEndTask: Number(data.milesEndTask),
      numberPart1: data.numberPart1,
      numberPart2: data.numberPart2,
      numberPart3: data.numberPart3,
      cost: Number(data.cost),
      quantity: Number(data.quantity),
      amount: Number(data.amount),
      seller: {
        name: data.sellerName,
        phone: data.sellerPhone,
        web: data.sellerWeb
      },
      isFinished: data.isFinished
    }
  }

  const [itemTask, setItemTask] = useState<StateTask>(task != null ? task : formToData(tempNullTask))

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setFocus
  } = useForm<FormTask>({ mode: 'onBlur', defaultValues: tempNullTask, values: dataToForm(itemTask) })
  /*  const controlIsCreated = useWatch({
    control,
    name: 'isCreated'
  }) */

  /* const [typeService, setTypeService] = useState < ListService | undefined>(isEdit ? service?.typeService : undefined)
  const [addModalParts, setAddModalParts] = useState<[ModalPart] | undefined>(isEdit ? service?.addition?.parts : undefined) */

  /* const [visibleModalService, setVisibleModalService] = useState(false)
  const [visibleModalAddParts, setVisibleModalAddParts] = useState(false) */

  /* --------------------------------------------------------------------------- */

  const inputDate = (target: string): void => DateTimePickerAndroid.open({
    value: new Date(),
    /* display: 'spinner', */
    // @ts-expect-error date undefined
    onChange: (event, date) => setValue(target, date)

  })

  // ---------------------------handleButtons-----------------------------------
  const handleCancel = (): void => {
    isCancel()
  }

  const handleOk = (dataForm: FormTask): void => {
    /*  if (createPurchase) {
      nav.navigate('InputDoneScreen', { editable: true, taskId: itemTask.id, typeTask: 'service' })
    } */
    isOk(formToData(dataForm))
  }

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
  // ---------------------------------------------------------------------------

  // --------------------------- function FinishTask ----------------------------
  /* useEffect(() => {
    if (getValues('isCreated')) setValue('isFinished', true)
  }, [controlIsCreated]) */

  // ---------------------------------------------------------------------------

  return (
  <View>

    {
      // -------------------------------------------------------------------------------------------
    }
    <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 5 }}>
          <View>
    {
    // ----------------------------- Checkbox selecting type of Task ---------------------------
    }
            <View style={styles.viewGroupInput}>
              <Surface elevation={2} style={styles.surface}>
                <Controller name={'typeTask'}
                            control={control}
                            render={ ({ field: { onChange, value, ref, onBlur } }) => (
                  <SegmentedButtons value={value} onValueChange={value => onChange(value)} buttons={[
                    {
                      value: 'part',
                      label: 'Part',
                      showSelectedCheck: true,
                      style: { borderRadius: 2, borderWidth: 0 },
                      icon: 'car-cog'
                    },
                    {
                      value: 'service',
                      label: 'Service',
                      showSelectedCheck: true,
                      style: { borderRadius: 2, borderWidth: 0 },
                      icon: 'car-wrench'
                    },
                    {
                      value: 'other',
                      label: 'Other',
                      showSelectedCheck: true,
                      style: { borderRadius: 2, borderWidth: 0 },
                      icon: 'car-clock'
                    }
                  ]}
                  style={{ borderRadius: 2 }}
                  />
                            )}
                            />
              </Surface>
            </View>
            {
      // -------------------------------------------------------------------------------------------
    }
            <View style={styles.viewAllInput}>
                {
                  // --------------- Input miles of service ----------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'name'}
                                control={control}
                                render={ ({ field: { onChange, value, ref, onBlur } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'название задачи'}
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
                // --------------- ----Drop Input number part ------------------------------------------
              }

              <Surface elevation={2} style={styles.surface}>
                <Accordion
                  /* bannerStyle={{ backgroundColor: mode === 'dark' ? BACK_INPUT : TEXT_WHITE }} */
                  title={'Комплектующие'}
                  textBannerStyle={{
                    fontSize: 14,
                    color: theme.colors.secondary
                  }}
                  controlled={false}
                  insideView={
                    <View style={{ flexDirection: 'column' }}>
                      <View style={styles.viewGroupInput}>

                      <Surface elevation={2} style={styles.surface}>
                        <Controller name={'numberPart1'}
                                    control={control}
                                    render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                      <TextInput
                                        dense
                                        ref={ref}
                                        style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                        label={'Номер детали'}
                                        /* keyboardType={'phone-pad'} */
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        onSubmitEditing={() => {
                                          setFocus('numberPart2')
                                        }}
                                        onBlur={onBlur}
                                      />
                                    )}
                        />
                      </Surface>

                        <Surface elevation={2} style={styles.surface}>
                          <Controller name={'numberPart2'}
                                      control={control}
                                      render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                        <TextInput
                                          ref={ref}
                                          dense
                                          style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                          label={'аналог'}
                                          onChangeText={(value) => onChange(value)}
                                          value={value}
                                          onSubmitEditing={() => {
                                            setFocus('numberPart3')
                                          }}
                                          onBlur={onBlur}
                                        />
                                      )}
                          />
                        </Surface>
                      </View>

                      <Surface elevation={2} style={styles.surface}>
                          <Controller name={'numberPart3'}
                                      control={control}
                                      render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                        <TextInput
                                          ref={ref}
                                          multiline={true}
                                          dense
                                          numberOfLines={2}
                                          style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                          label={'дополнительно'}
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
                  }
                />
              </Surface>

              {
                  // --------------- Input date and miles Task ------------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'dateEndTask'}
                                control={control}
                                render={ ({ field: { value, onChange, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'до даты'}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    /* onChangeText={(value) => onChange(value)} */
                                    onPressOut={() => inputDate('dateEndTask')}
                                    /* onSubmitEditing={updateTypeService} */
                                  />
                                )}
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'milesEndTask'}
                                control={control}
                                render={ ({ field: { value, ref, onChange } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'до пробега'}
                                    showSoftInputOnFocus={false}
                                    value={value}
                                    onChangeText={(value) => onChange(value)}
                                    /* onSubmitEditing={() => setFocus('numberPart')} */
                                  />
                                )}
                    />
                  </Surface>
                </View>
            </View>
            {
              // --------------------------------- Input cost  Task---------------------------
            }
            <View style={styles.viewGroupInput}>
              <Surface elevation={2} style={styles.surface}>
                <Controller name={'cost'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur, ref } }) => (
                              <TextInput
                                ref={ref}
                                dense
                                style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                label={'цена'}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                keyboardType={'numeric'}
                                onBlur={onBlur}
                                onSubmitEditing={() => setFocus('quantity')}
                              />
                            )}
                />
              </Surface>
              <Surface elevation={2} style={styles.surface}>
                <Controller name={'quantity'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur, ref } }) => (
                              <TextInput
                                ref={ref}
                                dense
                                style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                label={'кол-во'}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                keyboardType={'numeric'}
                                onBlur={onBlur}
                                onSubmitEditing={() => setFocus('amount')}
                              />
                            )}
                />
              </Surface>
              <Surface elevation={2} style={styles.surface}>
                <Controller name={'amount'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur, ref } }) => (
                              <TextInput
                                ref={ref}
                                dense
                                style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                label={'сумма'}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                keyboardType={'numeric'}
                                onBlur={onBlur}
                                /* onSubmitEditing={() => setFocus('numberPart')} */
                              />
                            )}
                />
              </Surface>
            </View>

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
                                      dense
                                      style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                      label={'Продавец'}
                                      /* keyboardType={'phone-pad'} */
                                      right={<TextInput.Icon icon="notebook" forceTextInputFocus={false}
                                                             color={theme.colors.tertiary}
                                                             onPress={() => setVisibleSeller(true)
                                                             }
                                      />
                                      }
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
                                        dense
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
                                        dense
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

                  </View>
                }
              />
            </Surface>

            {
              // --------------- Block finishTaskCheck ------------------------------------------
            }
            {isEdit
              ? <View style={styles.viewGroupInput}>
                <Surface elevation={2} style={styles.surface}>
                  <Controller name={'isFinished'}
                              control={control}
                              render={ ({ field: { value, ref, onChange } }) => (
                                <Checkbox.Item status={value ? 'checked' : 'unchecked'} label={'Выполнено'}
                                               onPress={() => onChange(!value)}
                                               color={theme.colors.tertiary}
                                               style={{ paddingVertical: 1 }}
                                               labelVariant={'bodyMedium'}

                                />
                              )}
                  />

                 {/*  <Controller name={'isCreated'}
                              control={control}
                              render={ ({ field: { value, ref, onChange } }) => (
                                <Checkbox.Item status={value ? 'checked' : 'unchecked'} label={'Создать покупку'}
                                               onPress={() => onChange(!value)}
                                               color={theme.colors.tertiary}
                                               style={{ paddingVertical: 1 }}
                                               labelVariant={'bodyMedium'}
                                />
                              )}
                  /> */}

                </Surface>
              </View>
              : null
            }

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

export default InputTaskComponent

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
