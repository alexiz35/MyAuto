import {
  View,
  StyleSheet, FlatList
} from 'react-native'
import { useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
/* import { useAppDispatch, useAppSelector } from '../components/Redux/hook' */
import { Seller, StatePart } from '../../../type'
import Accordion from '../../Accordion'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'
import { Button, Dialog, IconButton, Portal, Surface, Text, TextInput, useTheme } from 'react-native-paper'
import { RenderRowSeller } from '../../SellerScreenComponents/RenderRowSeller'
import { useAppSelector } from '../../Redux/hook'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../Navigation/Navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { ModalPickSeller } from '../../SellerScreenComponents/ModalPickSeller'

interface InputPartProps {
  isCancel: () => void
  isOk: (partResult: StatePart) => void
  part?: StatePart
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
/* type Props = BottomTabScreenProps<RootTabParamList, 'InputDoneScreen'> */
/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */

const InputPartComponent = ({ isCancel, isOk, part, isEdit }: InputPartProps): JSX.Element => {
  /*  const dispatch = useAppDispatch() */
  const state = useAppSelector((state) => state)

  const theme = useTheme()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  // ---------------------- handle ModalPickSeller -----------------------------
  const [visibleSeller, setVisibleSeller] = useState(false)
  const handlePress = (item: Seller): void => {
    setVisibleSeller(false)
    setValue('seller.name', item.name)
    setValue('seller.phone', String(item.phone))
    setValue('seller.link', String(item.web))
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
  const tempNullPart: FormPart = {
    namePart: '',
    numberPart: '',
    dateBuy: new Date(),
    costPart: '',
    quantityPart: '',
    amountCostPart: '',
    seller: {
      name: '',
      phone: '',
      link: ''
    }
  }

  const dataToForm = (data: StatePart): FormPart => {
    return {
      namePart: data.namePart,
      dateBuy: data.dateBuy,
      numberPart: data.numberPart,
      costPart: data.costPart === undefined || data.costPart === 0 ? '' : String(data.costPart),
      quantityPart: data.quantityPart === undefined || data.quantityPart === 0 ? '' : String(data.quantityPart),
      amountCostPart: data.amountCostPart === undefined || data.amountCostPart === 0 ? '' : String(data.amountCostPart),
      seller: {
        name: data.seller?.name === undefined ? '' : data.seller?.name,
        phone: data.seller?.phone === undefined ? '' : data.seller?.phone,
        link: data.seller?.web === undefined ? '' : data.seller.web
      }
    }
  }
  const formToData = (data: FormPart): StatePart => {
    return {
      id: isEdit ? itemPart?.id : Date.now(),
      namePart: data.namePart,
      dateBuy: data.dateBuy,
      numberPart: data.numberPart,
      costPart: Number(data.costPart),
      quantityPart: Number(data.quantityPart),
      amountCostPart: Number(data.amountCostPart),
      seller: {
        name: data.seller.name,
        phone: data.seller.phone,
        web: data.seller.link
      },
      isInstall: isEdit ? itemPart?.isInstall : false,
      dateInstall: isEdit ? itemPart.dateInstall : undefined,
      mileageInstall: isEdit ? itemPart.mileageInstall : undefined

    }
  }

  const [itemPart, setItemPart] = useState<StatePart>((part != null) ? part : formToData(tempNullPart))

  const {
    control,
    handleSubmit,
    setValue,
    setFocus
  } = useForm<FormPart>({ mode: 'onBlur', defaultValues: tempNullPart, values: dataToForm(itemPart) })

  /* const handleError = (): void => {
    refNamePart.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.error } })
    // @ts-expect-error not shake
    refNamePart.current?.shake()
  } */
  /* const handleFocus = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.primary } })
  }
  const handleBlur = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 0, borderBottomColor: theme.colors.primary } })
  } */

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date
    onChange: (event, date) => setValue('dateBuy', date)
  })

  // ------------------------- function calc input -----------------------------
  /*  const handleOnSubmitQuantity = (): void => {
    const tempAmount = partState?.quantityPart * partState?.costPart
    setPartState({ ...partState, amountCostPart: tempAmount })
    refAmountCostPart.current?.focus()
  }
  const handleOnSubmitAmount = (): void => {
    setCostPart(amountCostPart / quantityPart)
    /!* inputFuelAmount.current?.focus() *!/
  } */

  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    isCancel()
  }
  const handleOk = (dataForm: FormPart): void => {
    isOk(formToData(dataForm))
  }

  return (
    <View >
      {/* {isOpenAccordion ? <ActivityIndicator/> : null} */}

      <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }} >

            <View>
              <View style={styles.viewAllInput}>
                {
                  // --------------------- Name ------------------------------------
                }
                {
                  // --------------------- Name and Date ------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'namePart'}
                                control={control}
                                rules={{ required: 'введите название' }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                    label={'название'}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    error={(error != null) && true}
                                    onSubmitEditing={() => {
                                      setFocus('dateBuy')
                                    }}
                                  />
                                ) }
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'dateBuy'}
                                control={control}
                                render={ ({ field: { value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    dense
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'Дата покупки'}
                                    showSoftInputOnFocus={false}
                                    value={new Date(value).toLocaleDateString()}
                                    onPressOut={inputDate}
                                    onSubmitEditing={() => setFocus('numberPart')}
                                  />
                                )}
                    />
                  </Surface>
                </View>
                {
                  // ----------------------- Number part -------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'numberPart'}
                                control={control}
                                render={ ({ field: { onChange, value, onBlur, ref } }) => (
                    <TextInput
                      ref={ref}
                      dense
                      style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                      label={'артикул'}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      onBlur={onBlur}
                      onSubmitEditing={() => setFocus('costPart')}

                    />
                                )}
                                />
                  </Surface>
                </View>

                {
                  // ----------------------- Cost --------------------------------------------
                }

                  <View style={styles.viewGroupInput}>
                    <Surface elevation={2} style={styles.surface}>
                      <Controller name={'costPart'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                    <TextInput
                                      ref={ref}
                                      style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                      label={'цена'}
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      keyboardType={'numeric'}
                                      onBlur={onBlur}
                                      onSubmitEditing={() => setFocus('quantityPart')}
                                    />
                                  )}
                      />
                    </Surface>
                    <Surface elevation={2} style={styles.surface}>
                      <Controller name={'quantityPart'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                    <TextInput
                                      ref={ref}
                                      style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                                      label={'кол-во'}
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      keyboardType={'numeric'}
                                      onBlur={onBlur}
                                      onSubmitEditing={() => setFocus('amountCostPart')}
                                    />
                                  )}
                      />
                    </Surface>
                    <Surface elevation={2} style={styles.surface}>
                      <Controller name={'amountCostPart'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                    <TextInput
                                      ref={ref}
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
                  // ------------Seller---------------------------------
                }

                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'seller.name'}
                                control={control}
                                render={ ({ field: { onChange, value, onBlur, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                                    label={'продавец'}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    showSoftInputOnFocus={true}
                                    /* onPressIn={() => setVisibleSeller(true)} */
                                    right={<TextInput.Icon icon="notebook" forceTextInputFocus={false}
                                                           color={theme.colors.tertiary}
                                                           onPress={() => setVisibleSeller(true)
                                    }
                                    />
                                    }
                                    /* onSubmitEditing={() => {
                                      setFocus('numberPart2')
                                    }} */
                                    onBlur={onBlur}
                                  />
                                )}
                    />
                  </Surface>
                  {/* <Surface elevation={2} style={{ flex: 0.2, margin: 5 }}>
                    <IconButton icon={'notebook'} onPress={() => setVisibleSeller(true)}/>
                  </Surface> */}
                </View>

                {
                  // ------------Addition---------------------------------
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
                          <View style={styles.viewGroupInput}>

                            <Surface elevation={2} style={styles.surface}>
                              <Controller name={'seller.phone'}
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
                                  setFocus('seller.link')
                                }}
                                onBlur={onBlur}
                              />
                                          )}
                                          />
                            </Surface>
                            <Surface elevation={2} style={styles.surface}>
                              <Controller name={'seller.link'}
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
              </View>

              {
                // ----------------------- Buttons -----------------------------------------
              }
              <View style={styles.viewButton}>

                <Button
                  style={styles.buttonStyle}
                  labelStyle={{ color: 'white' }}
                  buttonColor={theme.colors.error}
                  /* type={'solid'} */
                  onPress={() => {
                    handleCancel()
                  }}
                >Cancel</Button>
                <Button
                  style={styles.buttonStyle}
                  labelStyle={{ color: 'white' }}
                  buttonColor={theme.colors.tertiary}
                  /* type={'solid'} */
                  /* onPress={() => {
                    handleOk()
                  }} */
                  onPress={handleSubmit(handleOk)}
                >Ok</Button>
              </View>
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

export default InputPartComponent

const styles = StyleSheet.create({
  viewAllInput: {
    margin: 5,
    borderRadius: 10
  },
  surface: {
    margin: 5,
    flex: 1
  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputText: {
    textAlign: 'center',
    fontSize: 14
  },
  errorInput: {
    color: 'gray',
    marginTop: 0,
    marginBottom: 2,
    textAlign: 'center'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
