import {
  View,
  StyleSheet,
  TextInput, ActivityIndicator, Pressable
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Dialog, Divider, Icon, Input, ListItem, useTheme } from '@rneui/themed'
import React, {
  PropsWithChildren,
  RefObject, useEffect,
  useState
} from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { RootStackParamList } from '../Navigation/Navigation'
import { addPart, editPart } from '../Redux/actions'
import Accordion from '../Accordion'
import ShadowBox from '../../CommonComponents/ShadowBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StateService, StateServiceTask } from '../../type'

interface InputServiceProps {
  isCancel: () => void
  isOk: (serviceResult: StateServiceTask) => void
  service?: StateServiceTask | null
}

/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */
const InputServiceTaskComponents = ({ isCancel, isOk, service = null }: InputServiceProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { theme } = useTheme()
  /* const { mode } = useThemeMode() */

  // ------------------------ state Inputs -------------------------------------
  const [nameServiceTask, setNameServiceTask] = useState('')
  const [dateEndTask, setDateEndTask] = useState(new Date())
  const [milesEnd, setMilesEnd] = useState(0)

  const [seller, setSeller] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [sellerWeb, setSellerWeb] = useState('')

  const [amountCostServiceTask, setAmountCostServiceTask] = useState(0)
  // ----------------------------------------------------------------------------

  const [isOpenAccordion, setIsOpenAccordion] = useState(false)
  const [isEditPart, setIsEditPart] = useState(false)

  const [itemPart, setItemPart] = useState<StateService | null>(null)

  const refNameService = React.createRef<PropsWithChildren<TextInput>>()
  const refDateService = React.createRef<PropsWithChildren<TextInput>>()
  const refMilesService = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerName = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerPhone = React.createRef<PropsWithChildren<TextInput>>()
  const refSellerLink = React.createRef<PropsWithChildren<TextInput>>()
  const refAmountCostPart = React.createRef<PropsWithChildren<TextInput>>()

  const clearInput = (): void => {
    setNameServiceTask('')
    setDateEndTask(new Date())
    setMilesEnd(0)
    setSeller('')
    setSellerPhone('')
    setSellerWeb('')
    setAmountCostServiceTask(0)
  }
  const handleError = (): void => {
    refNameService.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.error } })
    // @ts-expect-error not shake
    refNameService.current?.shake()
  }
  const handleFocus = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: theme.colors.success } })
  }
  const handleBlur = (ref: RefObject<TextInput>): void => {
    ref.current?.setNativeProps({ style: { borderBottomWidth: 0, borderBottomColor: theme.colors.success } })
  }
  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date
    onChange: (event, date) => setDateEndTask(date)
  })

  useEffect(() => {
    if (service !== null) {
      handleOpen(service)
    }
  }, [])

  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateServiceTask): void => {
    setNameServiceTask(item.title)
    setDateEndTask(item.dateService)
    setMilesEnd(item.milesService)
    setAmountCostServiceTask(item.amountCostService)
    if (item.seller?.name !== undefined) setSeller(item.seller?.name)
    if (item.seller?.phone !== undefined) setSellerPhone(item.seller?.phone)
    if (item.seller?.link !== undefined) setSellerWeb(item.seller?.link)
    setIsEditPart(true)
    /* setItemPart(item) */
    /* handleOnPress() */
    /* setOpenAccordion(true) */
  }

  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    clearInput()
    isCancel()
  }
  const handleOk = (): void => {
    if (nameServiceTask === '') {
      handleError()
    }
    const tempNewService: StateServiceTask = {
      id: Date.now(),
      title: nameServiceTask,
      amountCostService: amountCostServiceTask,
      dateService: dateEndTask,
      milesService: milesEnd,
      seller: {
        name: seller,
        phone: sellerPhone,
        link: sellerWeb
      }
    }

    /* isEditPart
      ? dispatch(editPart(state.numberCar, itemPart?.id, tempNewPart))
      : dispatch(addPart(state.numberCar, tempNewPart)) */
    clearInput()
    isOk(tempNewService)
    /* navigation.navigate('Home') */
  }

  /*  useEffect(() => {
    console.log('hello')
    setIsOpenAccordion(true)
    setTimeout(() => setIsOpenAccordion(false), 2000)
  }, [openAccordion]) */

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
                  <ShadowBox style={{
                    margin: 5,
                    flex: 3
                  }}>
                    <Input
                      ref={refNameService}
                      renderErrorMessage={false}
                      placeholder={'название'}
                      inputStyle={styles.inputText}
                      onChangeText={(value) => setNameServiceTask(String(value))}
                      value={nameServiceTask}
                      onFocus={() => handleFocus(refNameService)}
                      onBlur={() => handleBlur(refNameService)}
                      onSubmitEditing={() => refMilesService.current?.focus()}
                    />
                  </ShadowBox>
                </View>
                {
                  // ----------------------- Date and mile task -------------------------------------
                }
                <View style={styles.viewGroupInput}>
                  <ShadowBox style={{
                    margin: 5,
                    flex: 1.2
                  }}>
                    <Input
                      ref={refDateService}
                      renderErrorMessage={true}
                      errorMessage={'дата сервиса'}
                      errorStyle={styles.errorInput}
                      placeholder={'купить к дате'}
                      inputStyle={styles.inputText}
                      /* inputContainerStyle={{ borderBottomWidth: 0 }} */
                      showSoftInputOnFocus={false}
                      value={new Date(dateEndTask).toLocaleDateString()}
                      onPressOut={inputDate}
                    />
                  </ShadowBox>

                  <ShadowBox style={{
                    margin: 5,
                    flex: 1
                  }}>
                    <Input
                      ref={refMilesService}
                      placeholder={'до пробега'}
                      inputStyle={styles.inputText}
                      renderErrorMessage={true}
                      errorMessage={'пробег сервиса'}
                      errorStyle={styles.errorInput}
                      /* inputContainerStyle={{ borderBottomWidth: 0 }} */
                      onChangeText={(value) => setMilesEnd(Number(value))}
                      value={String(milesEnd)}
                      onFocus={() => handleFocus(refMilesService)}
                      onBlur={() => handleBlur(refMilesService)}
                      onSubmitEditing={() => refSellerName.current?.focus()}
                      keyboardType={'numeric'}
                    />
                  </ShadowBox>
                </View>
              </View>
              {
                // ---------------------- Seller ------------------------------------------
              }

              <View style={styles.viewAllInput}>
                <View style={styles.viewGroupInput}>
                  <ShadowBox style={{
                    margin: 5,
                    flex: 1
                  }}>
                    <Input
                      ref={refSellerName}
                      placeholder={'продавец'}
                      inputStyle={styles.inputText}
                      errorMessage={'продавец'}
                      errorStyle={styles.errorInput}
                      onChangeText={(value) => setSeller(String(value))}
                      value={seller}
                      onFocus={() => handleFocus(refSellerName)}
                      onBlur={() => handleBlur(refSellerName)}
                      onSubmitEditing={() => refAmountCostPart.current?.focus()}
                    />
                  </ShadowBox>
                </View>
                <ShadowBox style={{
                  flex: 1,
                  marginHorizontal: 5
                }}>
                  <Accordion
                    title={'Данные продавца'}
                    textBannerStyle={{
                      fontSize: 14,
                      color: theme.colors.grey3
                    }}
                    controlled={false}
                    insideView={
                      <View style={styles.viewGroupInput}>
                        <ShadowBox style={{
                          margin: 5,
                          flex: 1
                        }}>
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
                        <ShadowBox style={{
                          margin: 5,
                          flex: 1
                        }}>
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

              <View style={styles.viewAllInput}>

                <View style={styles.viewGroupInput}>
                  <ShadowBox style={{
                    margin: 5,
                    flex: 1
                  }}>
                    <Input
                      ref={refAmountCostPart}
                      placeholder={'стоимость'}
                      containerStyle={{ flex: 1 }}
                      inputStyle={styles.inputText}
                      errorMessage={'стоимость'}
                      errorStyle={styles.errorInput}
                      keyboardType={'numeric'}
                      onChangeText={(value) => setAmountCostServiceTask(Number(value))}
                      value={String(amountCostServiceTask)}
                      onFocus={() => handleFocus(refAmountCostPart)}
                      onBlur={() => handleBlur(refAmountCostPart)}
                      /* onSubmitEditing={() => handleOnSubmitAmount()} */
                      /* onBlur={() => handleOnSubmitAmount()} */
                    />
                  </ShadowBox>
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
                  onPress={() => {
                    handleOk()
                  }}
                />
              </View>
              <Divider insetType={'middle'} width={2} />
            </View>

      </KeyboardAwareScrollView>
      <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
      </Dialog>
    </View>

  )
}

export default InputServiceTaskComponents

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
