import {
  View,
  StyleSheet,
  ScrollView,
  TextInput, KeyboardAvoidingView, Platform
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Dialog, Divider, Input, useTheme } from '@rneui/themed'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputDoc = ({ navigation, route }: Props): JSX.Element => {
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
      handleOnPress()
    }
  }

  const isOpen = (open: boolean): void => {
    setIsOpenAccordion(open)
    if (!open) setOpenAccordion(false)
    else setOpenAccordion(true)
  }

  const handleOnPress = (): void => {
    setIsOpenAccordion(true)
    setTimeout(() => {
      setOpenAccordion(!openAccordion)
      setIsOpenAccordion(false)
    }, 600)
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    clearInput()
    handleOnPress()
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
    handleOnPress()
    /* navigation.navigate('Home') */
  }

  return (
    <View>
      <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
      </Dialog>
      <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
      <Accordion
        title={'Добавьте другие затраты'}

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
              placeholder={'стоимость'}
              /* placeholderTextColor={'red'} */
              inputStyle={styles.inputText}
              errorMessage={'стоимость'}
              errorStyle={styles.errorInput}
              keyboardType={'numeric'}
              onChangeText={(value) => setCostPart(Number(value))}
              value={String(costPart)}
              onFocus={() => handleFocus(refCostPart)}
              onBlur={() => handleBlur(refCostPart)}
              onSubmitEditing={() => refQuantityPart.current?.focus()}
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
        bannerStyle={{ backgroundColor: BACK_INPUT }}
        open={openAccordion}
        /* isOpen={isOpen} */
        onPress={handleOnPress}
        /* textBannerStyle={{ color: TEXT_WHITE }} */
      />
      </KeyboardAwareScrollView>

      <View style={{ marginTop: 10 }}>
        <PartsList handlePress={handleOpen}/>
      </View>
      {/* </ScrollView> */}
    </View>

  )
}

export default InputDoc

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
