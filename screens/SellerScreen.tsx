import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { SellerList } from '../components/SellerScreenComponents/SellerList'
import { useAppDispatch } from '../components/Redux/hook'
import { useAppTheme } from '../CommonComponents/Theme'
import { Seller } from '../type'
import { JSX, useCallback, useState } from 'react'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  Button,
  HelperText,
  List,
  Portal,
  RadioButton,
  Surface,
  TextInput,
  ToggleButton
} from 'react-native-paper'
import { ModalInfoSeller } from '../components/SellerScreenComponents/ModalInfoSeller'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { addedSeller, editedSeller } from '../components/Redux/SellerSlice'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface FormSeller {
  name: string
  phone: string
  web: string
  type: string
  specialism: string
}

type Props = StackScreenProps<RootStackParamList, 'SellerScreen'>

const SellerScreen = ({ route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const tempNullSeller: FormSeller = {
    name: '',
    phone: '',
    web: '',
    type: 'seller',
    specialism: ''
  }

  const dataToForm = (data: Seller): FormSeller => {
    return {
      name: data.name,
      phone: data.phone === undefined ? '' : String(data.phone),
      web: data.web === undefined ? '' : String(data.web),
      type: data.type === undefined ? 'seller' : data.type,
      specialism: data.specialism === undefined ? '' : String(data.specialism)
    }
  }
  const formToData = (data: FormSeller): Seller => {
    return {
      id: isEditSeller ? itemSeller?.id : Date.now(),
      name: data.name,
      phone: data.phone,
      web: data.web,
      type: data.type,
      specialism: data.specialism
    }
  }

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditSeller, setIsEditSeller] = useState(false)
  const [itemSeller, setItemSeller] = useState<Seller>(formToData(tempNullSeller))

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const [visibleInfo, setVisibleInfo] = useState(false)

  // ------------------------- Controller Form-----------------------------------
  const {
    control,
    handleSubmit,
    setFocus,
    reset

  } = useForm<FormSeller>({ mode: 'onSubmit', defaultValues: tempNullSeller, values: dataToForm(itemSeller) })

  const clearInput = (): void => {
    setIsEditSeller(false)
    setItemSeller(formToData(tempNullSeller))
    reset()
  }

  // ---------------------------------------------------------------------------
  /* useFocusEffect(
    useCallback(() => {
      setValueDrop(state.info.fuel)
    }, [state.info.fuel])) */

  const pressRowSeller = (item: Seller): void => {
    setItemSeller(item)
    setVisibleInfo(true)
  }
  const closeModalInfo = (): void => {
    setVisibleInfo(false)
  }
  // -------- navigation by another screen with item param ---------------------
  useFocusEffect(
    useCallback(() => {
      if (route.params !== undefined) {
        handleOpen(route.params.item)
      }
    }, [route.params])
  )
  // ------------------------- control according -------------------------------

  const handleOpen = (item: Seller): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditSeller(true)
    setItemSeller(item)
  }

  const handleOnPress = (): void => {
    if (!openAccordion) setIsList(false)
    else setTimeout(() => { setIsList(true) }, 100)
    setOpenAccordion(!openAccordion)
    clearInput()
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  const handleOk = (dataForm: FormSeller): void => {
    /* dispatch(addedSeller(formToData(dataForm))) */
    setItemSeller(formToData(dataForm))
    setTimeout(() => {
      isEditSeller
        ? dispatch(editedSeller(formToData(dataForm)))
        : dispatch(addedSeller(formToData(dataForm)))
    }
    , 100)
    handleOnPress()
  }

  return (
    <BackgroundView props={{ flex: 1 }}>

      <View style={{ flex: 1 }} >
        {
          /* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView>
          <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={isEditSeller ? t('seller.TITLE_ACCORDION_EDIT') : t('seller.TITLE_ACCORDION_ADD')}
              /* description={ state.info.fuel } */
              style={{ backgroundColor: colors.secondaryContainer }}
              expanded={openAccordion}
              onPress={handleOnPress}
            >

              <View style={{ backgroundColor: colors.background, rowGap: 10 }}>

                {
          /* ----------------------- Name ----------------------------------- */
                }
                <View style={[styles.viewGroupInput, { marginTop: 20 }]}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'name'}
                                control={control}
                                rules={{ required: t('seller.ERROR_SELLER') }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                      label={t('seller.NAME_SELLER')}
                                      onChangeText={(value) => { onChange(value) }}
                                      onSubmitEditing={() => {
                                        setFocus('phone')
                                      }}
                                      onBlur={onBlur}
                                      value={value}
                                      error={(error != null) && true}
                                    />
                                    { (error != null)
                                      ? <HelperText type="error">введите имя/название</HelperText>
                                      : null
                                    }
                                  </>
                                )}
                    />

                  </Surface>
                </View>
          {
          /* ----------------------- Phone and Specialisation----------------- */
          }
                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'phone'}
                                control={control}
                                rules={{ pattern: /\d/ }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      label={t('seller.PHONE_SELLER')}
                                      style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                      onChangeText={(value) => { onChange(value) }}
                                      keyboardType={'phone-pad'}
                                      value={value}
                                      onSubmitEditing={() => { setFocus('specialism') }}
                                      error={(error != null) && true}
                                      onBlur={onBlur}
                                    />
                                    { (error != null)
                                      ? <HelperText type="error">1..100 L</HelperText>
                                      : null
                                    }
                                  </>
                                )}
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface }>
                    <Controller name={'specialism'}
                                control={control}
                                rules={{ /* required: 'REQ' *//* , minLength: { value: 2, message: 'MIN' } */ }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      /* placeholder={'название заправки'} */
                                      label={t('seller.SPECIALIZATION')}
                                      style={{ flex: 1, backgroundColor: colors.surface }}
                                      onChangeText={(value) => { onChange(value) }}
                                      onSubmitEditing={() => { setFocus('web') }}
                                      value={value}
                                      onBlur={onBlur}
                                      error={(error != null) && true}
                                    />
                                    {/*  <HelperText type="error">{formState.errors.StationFuel?.message}</HelperText> */}
                                  </>
                                )}
                    />
                  </Surface>
                  {/* <Surface elevation={2} style={styles.surface}>
                    <Controller name={'type'}
                                control={control}
                                render={ ({ field: { onChange, value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    label={'сумма'}
                                    style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                    onChangeText={(value) => onChange(value)}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onSubmitEditing={() => setFocus('StationFuel')/* handleOnSubmitAmount() *!/
                                    onBlur={() => handleOnSubmitAmount()}
                                    right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="грн"/>}
                                  />
                                )}
                    />
                  </Surface> */}
                </View>
                {
          /* ------------------------- Web ----------------------------------- */
                }
                <Surface elevation={2} style={styles.surface}>
                  <Controller name={'web'}
                              control={control}
                              render={ ({ field: { onChange, value, ref } }) => (
                                <TextInput
                                  ref={ref}
                                  label={t('seller.WEB_SELLER')}
                                  style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                  onChangeText={(value) => { onChange(value) }}
                                  keyboardType={'url'}
                                  value={value}
                                  onSubmitEditing={() => { setFocus('type') }/* handleOnSubmitCost() */}
                                  /* right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="грн"/>} */
                                />
                              )}
                  />
                </Surface>
                {
          /* ------------------------- Type seller --- ----------------------- */
                }
                <Surface elevation={2} style={styles.surface}>
                  <Controller name={'type'}
                              control={control}
                              render={ ({ field: { onChange, value } }) => (

                                <RadioButton.Group onValueChange={value => { onChange(value) }} value={value} >
                                  <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                  <RadioButton.Item label={t('seller.PART_SELLER')} value="seller" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                    <RadioButton.Item label={t('seller.SERVICE_SELLER')} value="service"/>
                                    </View>
                                  </View>
                                </RadioButton.Group>
                                /*  <TextInput
                                  ref={ref}
                                  label={'ссылка'}
                                  style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                  onChangeText={(value) => onChange(value)}
                                  keyboardType={'url'}
                                  value={value}
                                  onSubmitEditing={() => setFocus('specialism')/!* handleOnSubmitCost() *!/}
                                  right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="грн"/>}
                                /> */
                              )}
                  />
                </Surface>

                {/* <Text style={styles.button}>{errorMsg}</Text> */}
                {
                  /* --------------------------- Buttons -------------------------------------- */
                }
                <View style={styles.viewButton}>
                  <Button
                    style={styles.buttonStyle}
                    mode={'elevated'}
                    buttonColor={colors.secondaryContainer}
                    textColor={colors.primary}
                    onPress={() => { handleCancel() } }
                  >
                    Cancel
                  </Button>
                  <Button
                    style={styles.buttonStyle}
                    mode={'elevated'}
                    buttonColor={colors.secondaryContainer}
                    textColor={colors.primary}
                    /* eslint-disable-next-line */
                    onPress={handleSubmit(handleOk) }
                  >
                    Ok
                  </Button>
                </View>
              </View>

            </List.Accordion>
          </ScrollView>
        </KeyboardAvoidingView>
        {
          /* ----------------------- List Fuel ---------------------------------------- */
        }
        {isList &&
          <View style={styles.flatList}>
            <ToggleButton.Row onValueChange={value => { setDateList(value) }}
                              value={dateList}
                              style={{ alignSelf: 'flex-end', marginBottom: 10 }}
            >
              <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 20 }}/>
              <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 20 }}/>
              <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 20 }}/>
            </ToggleButton.Row>

            <SellerList handlePress={pressRowSeller} filterList={dateList} editPress={handleOpen} />

          </View>
        }
        {
          /* -------------------------------------------------------------------------- */
        }
        <Portal>
          <ModalInfoSeller item={itemSeller} visible={visibleInfo} close={closeModalInfo} />
        </Portal>
      </View>
    </BackgroundView>
  )
}
export default SellerScreen

const styles = StyleSheet.create({

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 10
  },
  surface: {
    margin: 5,
    flex: 1
  },
  flatList: {
    marginTop: 15,
    height: 400
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

  button: {
    textAlign: 'center',
    color: 'red'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
