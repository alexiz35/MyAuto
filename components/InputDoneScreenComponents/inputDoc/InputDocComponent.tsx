import { StyleSheet, View } from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { getIndexCar, type Seller, type StateOther } from '../../../type'
import Accordion from '../../Accordion'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Dialog, Portal, Surface, TextInput, useTheme } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { ModalPickSeller } from '../../SellerScreenComponents/ModalPickSeller'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { type RootStackParamList } from '../../Navigation/TypeNavigation'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../Redux/hook'
import { DocsPanel, TypeImages } from '../../docsPanel/DocsPanel'
import { saveImages } from '../../docsPanel/functionFS'

interface InputDocProps {
  isCancel: () => void
  isOk: (otherResult: StateOther) => void
  other?: StateOther
  isEdit: boolean
}

interface FormOther {
  nameOther: string
  numberPart: string
  dateBuy: Date
  amountCostOther: string
  seller: {
    name: string
    phone: string
    link: string
  }
}

const InputDocComponent = ({ isCancel, isOk, other, isEdit }: InputDocProps): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const tempNullOther: FormOther = {
    nameOther: '',
    numberPart: '',
    dateBuy: new Date(),
    amountCostOther: '',
    seller: {
      name: '',
      phone: '',
      link: ''
    }
  }

  const dataToForm = (data: StateOther): FormOther => {
    return {
      nameOther: data.nameOther,
      dateBuy: data.dateBuy,
      numberPart: data.numberPart,
      amountCostOther: data.amountCostOther === undefined || data.amountCostOther === 0 ? '' : String(data.amountCostOther),
      seller: {
        name: data.seller?.name === undefined ? '' : data.seller?.name,
        phone: data.seller?.phone === undefined ? '' : data.seller?.phone,
        link: data.seller?.web === undefined ? '' : data.seller.web
      }
    }
  }

  const formToData = (data: FormOther): StateOther => {
    return {
      id: isEdit ? itemOther?.id : Date.now(),
      nameOther: data.nameOther,
      dateBuy: data.dateBuy,
      numberPart: data.numberPart,
      amountCostOther: Number(data.amountCostOther),
      seller: {
        name: data.seller.name,
        phone: data.seller.phone,
        web: data.seller.link
      }
    }
  }

  const [itemOther, setItemOther] = useState<StateOther>((other !== undefined) ? other : formToData(tempNullOther))
  //* ********************************************
  const [images, setImages] = useState<TypeImages[] | undefined>(itemOther.images)

  //* *********************************************
  const {
    control,
    handleSubmit,
    setValue,
    setFocus
  } = useForm<FormOther>({ mode: 'onBlur', defaultValues: tempNullOther, values: dataToForm(itemOther) })

  const inputDate = (): void => {
    DateTimePickerAndroid.open({
      value: new Date(),
      // @ts-expect-error date
      onChange: (event, date) => { setValue('dateBuy', date) }
    })
  }

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

  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    isCancel()
  }
  const handleOk = async (dataForm: FormOther) => {
    const temp = formToData(dataForm)
    if (images !== undefined) {
      temp.images = await saveImages('Other/', images, temp.id)
    }
    isOk(temp)
  }

  return (
    <View>
<Portal>
  <DocsPanel images={images} setImages={setImages} navigation={navigation}/>
</Portal>
      <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }}>
        <View>
          <View style={styles.viewAllInput}>
  {
     // --------------------- Name and Date ------------------------------------
  }
            <View style={styles.viewGroupInput}>
            <Surface elevation={2} style={styles.surface}>
              <Controller name={'nameOther'}
                          control={control}
                          rules={{ required: 'введите название' }}
                          render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                            <TextInput
                              ref={ref}
                              dense
                              style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                              label={t('NAME')}
                              onChangeText={(value) => { onChange(value) }}
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
                              label={t('inputOther.DATE_BUY')}
                              showSoftInputOnFocus={false}
                              value={new Date(value).toLocaleDateString()}
                              onPressOut={inputDate}
                              onSubmitEditing={() => { setFocus('numberPart') }}
                            />
                          )}
              />
            </Surface>
          </View>

  {
     // ---------------------- Seller ------------------------------------------
  }
            <View style={styles.viewGroupInput}>
            <Surface elevation={2} style={styles.surface}>
              <Controller name={'seller.name'}
                          control={control}
                          render={ ({ field: { onChange, value, onBlur, ref } }) => (
                            <TextInput
                              ref={ref}
                              style={{ flex: 1, backgroundColor: theme.colors.surface }}
                              label={t('SUPPLIER')}
                              onChangeText={(value) => { onChange(value) }}
                              value={value}
                              right={<TextInput.Icon icon="notebook" forceTextInputFocus={false}
                                                     color={theme.colors.tertiary}
                                                     onPress={() => { setVisibleSeller(true) }
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
          </View>

  {
     // ----------------------Addition------------------------------------------
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
                  <View style={styles.viewGroupInput}>

                    <Surface elevation={2} style={styles.surface}>
                      <Controller name={'seller.phone'}
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
    // ----------------------- Cost --------------------------------------------
  }

          <View style={styles.viewGroupInput}>
            <Surface elevation={2} style={styles.surface}>
              <Controller name={'amountCostOther'}
                          control={control}
                          render={ ({ field: { onChange, value, onBlur, ref } }) => (
                            <TextInput
                              ref={ref}
                              style={{ flex: 1, backgroundColor: theme.colors.surface, paddingHorizontal: 10 }}
                              label={t('TOTAL_COST')}
                              onChangeText={(value) => { onChange(value) }}
                              value={value}
                              keyboardType={'numeric'}
                              onBlur={onBlur}
                              right={<TextInput.Affix textStyle={{ fontSize: 12 }} text={state.info.currency}/>}

                              /* onSubmitEditing={() => setFocus('numberPart')} */
                            />
                          )}
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

export default InputDocComponent

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
