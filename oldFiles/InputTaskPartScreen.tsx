import {
  View,
  StyleSheet,
  TextInput
} from 'react-native'
import { Button, Divider, Input, useTheme } from '@rneui/themed'
import React, {
  PropsWithChildren,
  RefObject
} from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
/* import { useAppDispatch, useAppSelector } from '../components/Redux/hook' */
import { StatePart } from '../type'
import Accordion from '../components/Accordion'
import ShadowBox from '../CommonComponents/ShadowBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'

interface InputPartProps {
  isCancel: () => void
  isOk: (partResult: StatePart) => void
  part?: StatePart
}

/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */
const InputTaskPartScreen = ({ isCancel, isOk, part }: InputPartProps): JSX.Element => {
  /*  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state) */
  const { theme } = useTheme()
  /* const { mode } = useThemeMode() */
  const tempNullPart: StatePart = {
    id: Date.now(),
    namePart: '',
    numberPart: '',
    dateBuy: new Date(),
    costPart: 0,
    quantityPart: 0,
    amountCostPart: 0,
    numberPart1: '',
    numberPart2: '',
    mileageInstall: 0,
    dateInstall: new Date(),
    isInstall: false,
    seller: {
      name: '',
      phone: '',
      web: ''
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm<StatePart>({ mode: 'onBlur', defaultValues: part === undefined ? tempNullPart : part })

  /* const [dateBuy, setDateBuy] = useState(new Date())
  const [namePart, setNamePart] = useState('')

  const [numberPart, setNumberPart] = useState('')
  const [numberPart1, setNumberPart1] = useState('')
  const [numberPart2, setNumberPart2] = useState('')

  const [seller, setSeller] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [sellerWeb, setSellerWeb] = useState('')

  const [costPart, setCostPart] = useState(0)
  const [amountCostPart, setAmountCostPart] = useState(0)
  const [quantityPart, setQuantityPart] = useState(0) */

  const refNamePart = React.createRef<PropsWithChildren<TextInput>>()
  const refDatePart = React.createRef<PropsWithChildren<TextInput>>()
  const refNumberPart = React.createRef<PropsWithChildren<TextInput>>()
  const refNumber1Part = React.createRef<PropsWithChildren<TextInput>>()
  const refNumber2Part = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerName = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerPhone = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerLink = React.createRef<PropsWithChildren<TextInput>>()
  const refCostPart = React.createRef<PropsWithChildren<TextInput>>()
  const refQuantityPart = React.createRef<PropsWithChildren<TextInput>>()
  const refAmountCostPart = React.createRef<PropsWithChildren<TextInput>>()

  /*  const handleError = (): void => {
    refNamePart.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.error } })
    // @ts-expect-error not shake
    refNamePart.current?.shake()
  } */
  const handleFocus = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.success }, renderErrorMessage: true })
  }
  const handleBlur = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 0, borderBottomColor: theme.colors.success } })
  }
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
  const handleOk = (dataForm: StatePart): void => {
    isOk(dataForm)
  }

  return (
    <View>
      {/* {isOpenAccordion ? <ActivityIndicator/> : null} */}

      <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }} >

        <View>
          <View style={styles.viewAllInput}>
            {
              // --------------------- Name and Date ------------------------------------
            }
            <View style={styles.viewGroupInput}>

                <Controller name={'namePart'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                ref={refNamePart}
                                renderErrorMessage={false}
                                errorMessage={'hello'}
                                placeholder={'название'}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorInput}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                onFocus={() => handleFocus(refNamePart)}
                                onBlur={() => handleBlur(refNamePart)}
                                onSubmitEditing={() => refNumberPart.current?.focus()}
                              />
                            ) }
                />

                <Controller name={'dateBuy'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                /* ref={refDatePart} */
                                renderErrorMessage={false}
                                placeholder={'купить к дате'}
                                inputStyle={styles.inputText}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                showSoftInputOnFocus={false}
                                value={new Date(value).toLocaleDateString()}
                                /* onChangeText={(value) => onChange(value)} */
                                onPressOut={inputDate}
                                errorStyle={styles.errorInput}
                              />
                            )}
                />
            </View>
            {
              // ----------------------- Number part -------------------------------------
            }
            <View style={styles.viewGroupInput}>

                <Controller name={'numberPart'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                /* ref={refNumberPart} */
                                placeholder={'артикул'}
                                /* placeholderTextColor={'red'} */
                                inputStyle={styles.inputText}
                                errorMessage={'артикул'}
                                errorStyle={styles.errorInput}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                /* onFocus={() => handleFocus(refNumberPart)}
                                onBlur={() => handleBlur(refNumberPart)}
                                onSubmitEditing={() => refSellerName.current?.focus()} */
                              />
                            )}
                />
            </View>

              <Accordion
                /* bannerStyle={{ backgroundColor: mode === 'dark' ? BACK_INPUT : TEXT_WHITE }} */
                title={'Аналоги'}
                textBannerStyle={{
                  fontSize: 14,
                  color: theme.colors.grey3
                }}
                controlled={false}
                insideView={
                  <View style={styles.viewGroupInput}>

                      <Controller name={'numberPart1'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur } }) => (
                                    <Input
                                      /* ref={refNumber1Part} */
                                      renderErrorMessage={false}
                                      placeholder={'аналог 1'}
                                      /* placeholderTextColor={'red'} */
                                      inputStyle={styles.inputText}
                                      errorStyle={styles.errorInput}
                                      inputContainerStyle={{ borderBottomWidth: 0 }}
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      /* onFocus={() => handleFocus(refNumber1Part)}
                                      onBlur={() => handleBlur(refNumber1Part)} */
                                    />
                                  )}
                      />

                      <Controller name={'numberPart2'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur } }) => (
                                    <Input
                                      /* ref={refNumber2Part} */
                                      renderErrorMessage={false}
                                      placeholder={'аналог 2'}
                                      /* placeholderTextColor={'red'} */
                                      inputStyle={styles.inputText}
                                      errorStyle={styles.errorInput}
                                      inputContainerStyle={{ borderBottomWidth: 0 }}
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      /* onFocus={() => handleFocus(refNumber2Part)}
                                      onBlur={() => handleBlur(refNumber2Part)} */
                                    />
                                  )}
                      />
                  </View>
                }
              />
          </View>
          {
            // ---------------------- Seller ------------------------------------------
          }

          <View style={styles.viewAllInput}>
            <View style={styles.viewGroupInput}>
                <Controller name={'seller.name'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                /* ref={refSellerName} */
                                placeholder={'продавец'}
                                inputStyle={styles.inputText}
                                errorMessage={'продавец'}
                                errorStyle={{
                                  color: 'gray',
                                  marginTop: 1,
                                  textAlign: 'center'
                                }}
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                /* onFocus={() => handleFocus(refSellerName)}
                                onBlur={() => handleBlur(refSellerName)}
                                onSubmitEditing={() => refCostPart.current?.focus()} */
                              />
                            )}
                />
            </View>

              <Accordion
                title={'Данные продавца'}
                textBannerStyle={{
                  fontSize: 14,
                  color: theme.colors.grey3
                }}
                controlled={false}
                insideView={
                  <View style={styles.viewGroupInput}>

                      <Controller name={'seller.phone'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur } }) => (
                                    <Input
                                      /* ref={refSellerPhone} */
                                      renderErrorMessage={false}
                                      placeholder={'телефон'}
                                      inputStyle={styles.inputText}
                                      errorStyle={styles.errorInput}
                                      inputContainerStyle={{ borderBottomWidth: 0 }}
                                      keyboardType={'phone-pad'}
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      /* onFocus={() => handleFocus(refSellerPhone)}
                                      onBlur={() => handleBlur(refSellerPhone)}
                                      onSubmitEditing={() => refSellerLink.current?.focus()} */
                                    />
                                  )}
                      />

                      <Controller name={'seller.link'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur } }) => (
                                    <Input
                                      /* ref={refSellerLink} */
                                      renderErrorMessage={false}
                                      placeholder={'ссылка'}
                                      /* placeholderTextColor={'red'} */
                                      inputStyle={styles.inputText}
                                      errorStyle={styles.errorInput}
                                      inputContainerStyle={{ borderBottomWidth: 0 }}
                                      keyboardType={'url'}
                                      onChangeText={(value) => onChange(value)}
                                      value={value}
                                      /* onFocus={() => handleFocus(refSellerLink)}
                                      onBlur={() => handleBlur(refSellerLink)}
                                      onSubmitEditing={() => refCostPart.current?.focus()} */
                                    />
                                  )}
                      />
                  </View>
                }
              />
          </View>
          {
            // ----------------------- Cost --------------------------------------------
          }

          <View style={styles.viewAllInput}>

            <View style={styles.viewGroupInput}>

                <Controller name={'costPart'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                /* ref={refCostPart} */
                                placeholder={'цена'}
                                /* placeholderTextColor={'red'} */
                                inputStyle={styles.inputText}
                                errorMessage={'цена'}
                                errorStyle={styles.errorInput}
                                keyboardType={'numeric'}
                                onChangeText={(value) => onChange(Number(value))}
                                value={String(value)}
                                /* onFocus={() => handleFocus(refCostPart)}
                                onBlur={() => handleBlur(refCostPart)}
                                onSubmitEditing={() => refQuantityPart.current?.focus()} */
                              />
                            )}
                />

                <Controller name={'quantityPart'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                /* ref={refQuantityPart} */
                                placeholder={'кол-во'}
                                containerStyle={{ flex: 1 }}
                                inputStyle={styles.inputText}
                                errorMessage={'кол-во'}
                                errorStyle={styles.errorInput}
                                keyboardType={'numeric'}
                                onChangeText={(value) => onChange(Number(value))}
                                value={String(value)}
                                /* onFocus={() => handleFocus(refQuantityPart)}
                                onBlur={() => handleBlur(refQuantityPart)} */
                                /* onSubmitEditing={() => handleOnSubmitQuantity()} */
                                /* onBlur={() => handleOnSubmitCost()} */
                              />
                            )}
                />

                <Controller name={'amountCostPart'}
                            control={control}
                            render={ ({ field: { onChange, value, onBlur } }) => (
                              <Input
                                /* ref={refAmountCostPart} */
                                placeholder={'сумма'}
                                containerStyle={{ flex: 1 }}
                                inputStyle={styles.inputText}
                                errorMessage={'сумма'}
                                errorStyle={styles.errorInput}
                                keyboardType={'numeric'}
                                onChangeText={(value) => onChange(Number(value))}
                                value={String(value)}
                                /* onFocus={() => handleFocus(refAmountCostPart)}
                                onBlur={() => handleBlur(refAmountCostPart)} */
                                /* onSubmitEditing={() => handleOnSubmitAmount()} */
                                /* onBlur={() => handleOnSubmitAmount()} */
                              />
                            )}
                />
            </View>
          </View>

          {
            // ----------------------- Buttons -----------------------------------------
          }
          <View style={styles.viewButton}>

            <Button
              containerStyle={styles.buttonStyle}
              title={'Cancel'}
              color={'error'}
              type={'solid'}
              onPress={() => {
                handleCancel()
              }}
            />
            <Button
              containerStyle={styles.buttonStyle}
              title={'Ok'}
              color={'success'}
              type={'solid'}
              /* onPress={() => {
                handleOk()
              }} */
              onPress={handleSubmit(handleOk)}
            />
          </View>
          <Divider insetType={'middle'} width={2} />
        </View>

      </KeyboardAwareScrollView>
      {/* <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
      </Dialog> */}
    </View>

  )
}

export default InputTaskPartScreen

const styles = StyleSheet.create({
  viewAllInput: {
    margin: 5,
    borderRadius: 10
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
