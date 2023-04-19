import {
  View,
  StyleSheet,
  ScrollView,
  TextInput, KeyboardAvoidingView, Platform
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Divider, Input, useTheme } from '@rneui/themed'
import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useState
} from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { BACK_INPUT, COLOR_GREEN, StatePart } from '../../type'
import { RootStackParamList } from '../Navigation/Navigation'
import { addPart, editPart } from '../Redux/actions'
import Accordion from '../Accordion'
import ShadowBox from '../../CommonComponents/ShadowBox'
import { PartsList } from './PartsList'

type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputPart = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { theme } = useTheme()
  /* const { mode } = useThemeMode() */

  const [dateBuy, setDateBuy] = useState(new Date())
  const [namePart, setNamePart] = useState('')

  const [numberPart, setNumberPart] = useState('')
  const [numberPart1, setNumberPart1] = useState('')
  const [numberPart2, setNumberPart2] = useState('')

  const [seller, setSeller] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [sellerWeb, setSellerWeb] = useState('')

  const [costPart, setCostPart] = useState(0)
  const [amountCostPart, setAmountCostPart] = useState(0)
  const [quantityPart, setQuantityPart] = useState(0)

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)
  const [isEditPart, setIsEditPart] = useState(false)

  const [itemPart, setItemPart] = useState<StatePart | null>(null)

  const [isVisible, setIsVisible] = useState(false)

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

  const clearInput = (): void => {
    setNamePart('')
    setDateBuy(new Date())
    setNumberPart('')
    setNumberPart1('')
    setNumberPart2('')
    setSeller('')
    setSellerPhone('')
    setSellerWeb('')
    setCostPart(0)
    setQuantityPart(0)
    setAmountCostPart(0)
  }

  const handleError = (): void => {
    refNamePart.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.error } })
    // @ts-expect-error not shake
    refNamePart.current?.shake()
  }
  const handleFocus = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: COLOR_GREEN } })
  }
  const handleBlur = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 0, borderBottomColor: COLOR_GREEN } })
  }

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date
    onChange: (event, date) => setDateBuy(date)
  })

  useEffect(() => {
    navigation.setOptions({ title: 'Купить деталь' })
  }, [])

  // ------------------------- function calc input -----------------------------
  const handleOnSubmitQuantity = (): void => {
    setAmountCostPart(quantityPart * costPart)
    refAmountCostPart.current?.focus()
  }
  const handleOnSubmitAmount = (): void => {
    setCostPart(amountCostPart / quantityPart)
    /* inputFuelAmount.current?.focus() */
  }

  // ------------------------- control according -------------------------------
  const handleOpen = (item: StatePart): void => {
    if (!isOpenAccordion) {
      setNamePart(item.namePart)
      setDateBuy(item.dateBuy)
      setNumberPart(item.numberPart)
      if (item.numberPart1 !== undefined) setNumberPart1(item.numberPart1)
      if (item.numberPart2 !== undefined) setNumberPart2(item.numberPart2)
      setCostPart(item.costPart)
      setQuantityPart(item.quantityPart)
      setAmountCostPart(item.amountCostPart)
      if (item.seller?.name !== undefined) setSeller(item.seller?.name)
      if (item.seller?.phone !== undefined) setSellerPhone(item.seller?.phone)
      if (item.seller?.link !== undefined) setSellerWeb(item.seller?.link)
      setIsEditPart(true)
      setItemPart(item)
      setOpenAccordion(true)
    }
  }

  const isOpen = (open: boolean): void => {
    setIsOpenAccordion(open)
    if (!open) setOpenAccordion(false)
    else setOpenAccordion(true)
  }

  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    clearInput()
    setOpenAccordion(false)
  }
  const handleOk = (): void => {
    if (namePart === '') {
      handleError()
      return
    }
    const tempNewPart: StatePart = {
      namePart,
      dateBuy,
      numberPart,
      numberPart1,
      numberPart2,
      seller: {
        name: seller,
        phone: sellerPhone,
        link: sellerWeb
      },
      costPart,
      quantityPart,
      amountCostPart,
      id: Date.now()

    }

    isEditPart
      ? dispatch(editPart(state.numberCar, itemPart?.id, tempNewPart))
      : dispatch(addPart(state.numberCar, tempNewPart))
    clearInput()
    setOpenAccordion(!openAccordion)
    /* navigation.navigate('Home') */
  }

  return (
    <View>
      <ScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
      <Accordion
        insideView={
        <View>
        <View style={styles.viewAllInput}>
  {
     // --------------------- Name and Date ------------------------------------
  }
          <View style={styles.viewGroupInput}>
            <ShadowBox style={{ margin: 5, flex: 3 }}>
              <Input
                ref={refNamePart}
                renderErrorMessage={false}
                placeholder={'название'}
                inputStyle={styles.inputText}
                errorStyle={styles.errorInput}
                onChangeText={(value) => setNamePart(String(value))}
                value={namePart}
                onFocus={() => handleFocus(refNamePart)}
                onBlur={() => handleBlur(refNamePart)}
                onSubmitEditing={() => refNumberPart.current?.focus()}
              />
            </ShadowBox>
            <ShadowBox style={{ margin: 5, flex: 1.2 }}>
              <Input
                ref={refDatePart}
                renderErrorMessage={false}
                placeholder={'купить к дате'}
                inputStyle={styles.inputText}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                showSoftInputOnFocus={false}
                value = {new Date(dateBuy).toLocaleDateString()}
                onPressOut={inputDate}
                errorStyle={styles.errorInput}
              />
            </ShadowBox>
          </View>
          <View style={styles.viewGroupInput}>
  {
    // ----------------------- Number part -------------------------------------
  }
            <ShadowBox style={{ margin: 5, flex: 1 }}>
              <Input
                ref={refNumberPart}
                placeholder={'артикул'}
                /* placeholderTextColor={'red'} */
                inputStyle={styles.inputText}
                errorMessage={'артикул'}
                errorStyle={styles.errorInput}
                onChangeText={(value) => setNumberPart(String(value))}
                value={numberPart}
                onFocus={() => handleFocus(refNumberPart)}
                onBlur={() => handleBlur(refNumberPart)}
                onSubmitEditing={() => refSellerName.current?.focus()}
              />
            </ShadowBox>
          </View>
          <ShadowBox style={{ flex: 1, marginHorizontal: 5 }}>
            <Accordion
              /* bannerStyle={{ backgroundColor: mode === 'dark' ? BACK_INPUT : TEXT_WHITE }} */
              title={'Аналоги'}
              textBannerStyle={{ fontSize: 14, color: theme.colors.grey3 }}
              insideView={
                <View style={styles.viewGroupInput}>
                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                      ref={refNumber1Part}
                      renderErrorMessage={false}
                      placeholder={'аналог 1'}
                      /* placeholderTextColor={'red'} */
                      inputStyle={styles.inputText}
                      errorStyle={styles.errorInput}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      onChangeText={(value) => setNumberPart1(String(value))}
                      value={numberPart1}
                      onFocus={() => handleFocus(refNumber1Part)}
                      onBlur={() => handleBlur(refNumber1Part)}
                    />
                  </ShadowBox>
                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                      ref={refNumber2Part}
                      renderErrorMessage={false}
                      placeholder={'аналог 2'}
                      /* placeholderTextColor={'red'} */
                      inputStyle={styles.inputText}
                      errorStyle={styles.errorInput}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      onChangeText={(value) => setNumberPart2(String(value))}
                      value={numberPart2}
                      onFocus={() => handleFocus(refNumber2Part)}
                      onBlur={() => handleBlur(refNumber2Part)}
                    />
                  </ShadowBox>
                </View>
              }
            />
          </ShadowBox>
        </View>
  {
     // ---------------------- Seller ------------------------------------------
  }

        <View style={styles.viewAllInput}>
          <View style={styles.viewGroupInput}>
              <ShadowBox style={{ margin: 5, flex: 1 }}>
                <Input
                  ref={refSellerName}
                  placeholder={'продавец'}
                  inputStyle={styles.inputText}
                  errorMessage={'продавец'}
                  errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                  onChangeText={(value) => setSeller(String(value))}
                  value={seller}
                  onFocus={() => handleFocus(refSellerName)}
                  onBlur={() => handleBlur(refSellerName)}
                  onSubmitEditing={() => refCostPart.current?.focus()}
                />
              </ShadowBox>
          </View>
          <ShadowBox style={{ flex: 1, marginHorizontal: 5 }}>
            <Accordion
              title={'Данные продавца'}
              textBannerStyle={{ fontSize: 14, color: theme.colors.grey3 }}
              insideView={
                <View style={styles.viewGroupInput}>
                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                      ref={refSellerPhone}
                      renderErrorMessage={false}
                      placeholder={'телефон'}
                      inputStyle={styles.inputText}
                      errorStyle={styles.errorInput}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      keyboardType={'phone-pad'}
                      onChangeText={(value) => setSellerPhone(String(value))}
                      value={sellerPhone}
                      onFocus={() => handleFocus(refSellerPhone)}
                      onBlur={() => handleBlur(refSellerPhone)}
                      onSubmitEditing={() => refSellerLink.current?.focus()}
                    />
                  </ShadowBox>
                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                      ref={refSellerLink}
                      renderErrorMessage={false}
                      placeholder={'ссылка'}
                      /* placeholderTextColor={'red'} */
                      inputStyle={styles.inputText}
                      errorStyle={styles.errorInput}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      keyboardType={'url'}
                      onChangeText={(value) => setSellerWeb(String(value))}
                      value={sellerWeb}
                      onFocus={() => handleFocus(refSellerLink)}
                      onBlur={() => handleBlur(refSellerLink)}
                      onSubmitEditing={() => refCostPart.current?.focus()}
                    />
                  </ShadowBox>
                </View>
              }
            />
          </ShadowBox>
        </View>
  {
    // ----------------------- Cost --------------------------------------------
  }
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.viewAllInput}>

          <View style={styles.viewGroupInput}>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={refCostPart}
              placeholder={'цена'}
              /* placeholderTextColor={'red'} */
              inputStyle={styles.inputText}
              errorMessage={'цена'}
              errorStyle={styles.errorInput}
              keyboardType={'numeric'}
              onChangeText={(value) => setCostPart(Number(value))}
              value={String(costPart)}
              onFocus={() => handleFocus(refCostPart)}
              onBlur={() => handleBlur(refCostPart)}
              onSubmitEditing={() => refQuantityPart.current?.focus()}
            />
          </ShadowBox>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={refQuantityPart}
              placeholder={'кол-во'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputText}
              errorMessage={'кол-во'}
              errorStyle={styles.errorInput}
              keyboardType={'numeric'}
              onChangeText={(value) => setQuantityPart(Number(value))}
              value={String(quantityPart)}
              onFocus={() => handleFocus(refQuantityPart)}
              onBlur={() => handleBlur(refQuantityPart)}
              onSubmitEditing={() => handleOnSubmitQuantity()}
              /* onBlur={() => handleOnSubmitCost()} */
            />
          </ShadowBox>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={refAmountCostPart}
              placeholder={'сумма'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputText}
              errorMessage={'сумма'}
              errorStyle={styles.errorInput}
              keyboardType={'numeric'}
              onChangeText={(value) => setAmountCostPart(Number(value))}
              value={String(amountCostPart)}
              onFocus={() => handleFocus(refAmountCostPart)}
              onBlur={() => handleBlur(refAmountCostPart)}
              onSubmitEditing={() => handleOnSubmitAmount()}
              /* onBlur={() => handleOnSubmitAmount()} */
            />
          </ShadowBox>
        </View>
          </View>
          </KeyboardAvoidingView>

  {
    // ----------------------- Buttons -----------------------------------------
  }
        <View style={styles.viewButton}>

          <Button
            containerStyle={styles.buttonStyle}
            title={'Cancel'}
            color={'error'}
            type={'solid'}
            onPress={() => { handleCancel() }}
          />
          <Button
            containerStyle={styles.buttonStyle}
            title={'Ok'}
            color={'success'}
            type={'solid'}
            onPress={() => {
              handleOk()
            }}
          />
        </View>
          <Divider insetType={'middle'} width={2}/>
      </View>}
        title={'Добавьте покупку'}
        bannerStyle={{ backgroundColor: BACK_INPUT }}
        open={openAccordion}
        isOpen={isOpen}
        /* textBannerStyle={{ color: TEXT_WHITE }} */
      />
      </ScrollView>

      <View style={{ marginTop: 10 }}>
        <PartsList handlePress={handleOpen}/>
      </View>
      {/* </ScrollView> */}
    </View>

  )
}

export default InputPart

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
    margin: 5,
    /* backgroundColor: BACK_INPUT, */
    /* borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey', */
    borderRadius: 10
    /* paddingBottom: 5 */
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
    /* borderWidth: 1,
    borderColor: COLOR_GREEN */
  },
  errorInput: {
    color: 'gray',
    marginTop: 0,
    marginBottom: 2,
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
    marginVertical: 10
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
  }
})
