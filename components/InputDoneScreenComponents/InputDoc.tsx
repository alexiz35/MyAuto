import {
  View,
  StyleSheet,
  TextInput, KeyboardAvoidingView, Platform
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Dialog, Divider, Input, useTheme, useThemeMode } from '@rneui/themed'
import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useState
} from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { BACK_INPUT, COLOR_GREEN, StateOther } from '../../type'
import { RootStackParamList } from '../Navigation/Navigation'
import { addOther, editOther } from '../Redux/actions'
import Accordion from '../Accordion'
import ShadowBox from '../../CommonComponents/ShadowBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { OthersList } from './OthersList'
import InputDocComponent from '../../CommonComponents/InputDocComponent'
import { PartsList } from './PartsList'

type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'>
const InputDoc = ({ navigation }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { theme } = useTheme()
  const { mode } = useThemeMode()

  const [namePart, setNamePart] = useState('')
  const [dateBuy, setDateBuy] = useState(new Date())
  const [numberPart, setNumberPart] = useState('')
  const [seller, setSeller] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [sellerWeb, setSellerWeb] = useState('')
  const [amountCostPart, setAmountCostPart] = useState(0)

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)
  const [isEditPart, setIsEditPart] = useState(false)

  const [itemOther, setItemOther] = useState<StateOther | null>(null)

  const refNamePart = React.createRef<PropsWithChildren<TextInput>>()
  const refDatePart = React.createRef<PropsWithChildren<TextInput>>()
  const refNumberPart = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerName = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerPhone = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerLink = React.createRef<PropsWithChildren<TextInput>>()
  const refAmountCostPart = React.createRef<PropsWithChildren<TextInput>>()

  const clearInput = (): void => {
    setNamePart('')
    setDateBuy(new Date())
    setSeller('')
    setSellerPhone('')
    setSellerWeb('')
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

  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateOther): void => {
    if (!isOpenAccordion) {
      setNamePart(item.nameOther)
      setDateBuy(item.dateBuy)
      setNumberPart(item.numberPart)
      setAmountCostPart(item.amountCostPart)
      if (item.seller?.name !== undefined) setSeller(item.seller?.name)
      if (item.seller?.phone !== undefined) setSellerPhone(item.seller?.phone)
      if (item.seller?.link !== undefined) setSellerWeb(item.seller?.link)
      setIsEditPart(true)
      setItemOther(item)
      handleOnPress()
    }
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
    const tempNewOther: StateOther = {
      nameOther: namePart,
      dateBuy,
      numberPart,
      seller: {
        name: seller,
        phone: sellerPhone,
        link: sellerWeb
      },
      amountCostPart,
      id: Date.now()
    }

    isEditPart
      ? dispatch(editOther(state.numberCar, itemOther?.id, tempNewOther))
      : dispatch(addOther(state.numberCar, tempNewOther))
    clearInput()
    handleOnPress()
    /* navigation.navigate('Home') */
  }

  return (
    <View>
      <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
      </Dialog>
      <View>
      <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
      <Accordion
        title={'Добавьте другие затраты'}

        insideView={
        /* <View>
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
                  onSubmitEditing={() => refAmountCostPart.current?.focus()}
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
                      /!* placeholderTextColor={'red'} *!/
                      inputStyle={styles.inputText}
                      errorStyle={styles.errorInput}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      keyboardType={'url'}
                      onChangeText={(value) => setSellerWeb(String(value))}
                      value={sellerWeb}
                      onFocus={() => handleFocus(refSellerLink)}
                      onBlur={() => handleBlur(refSellerLink)}
                      onSubmitEditing={() => refAmountCostPart.current?.focus()}
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
              ref={refAmountCostPart}
              placeholder={'стоимость'}
              /!* placeholderTextColor={'red'} *!/
              inputStyle={styles.inputText}
              errorMessage={'стоимость'}
              errorStyle={styles.errorInput}
              keyboardType={'numeric'}
              onChangeText={(value) => setAmountCostPart(Number(value))}
              value={String(amountCostPart)}
              onFocus={() => handleFocus(refAmountCostPart)}
              onBlur={() => handleBlur(refAmountCostPart)}
              /!* onSubmitEditing={() => refQuantityPart.current?.focus()} *!/
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
      </View> */
          <InputDocComponent isCancel={handleCancel} isOk={handleOk} other={itemOther}/>
      }
        bannerStyle={{ backgroundColor: BACK_INPUT }}
        open={openAccordion}
        /* isOpen={isOpen} */
        onPress={handleOnPress}
        /* textBannerStyle={{ color: TEXT_WHITE }} */
      />
      </KeyboardAwareScrollView>
      </View>

      <View style={{ marginTop: 10, height: '85%' }}>
        { openAccordion
          ? null
          : <OthersList handlePress={handleOpen} />
        }
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
