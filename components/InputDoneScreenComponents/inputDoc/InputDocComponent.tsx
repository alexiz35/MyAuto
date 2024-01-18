import {
  View,
  StyleSheet,
  KeyboardAvoidingView, Platform
} from 'react-native'
import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useState
} from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { BACK_INPUT, COLOR_GREEN, StateOther, StatePart } from '../../../type'
import { addOther, editOther } from '../../Redux/actions'
import Accordion from '../../Accordion'
import ShadowBox from '../../../CommonComponents/ShadowBox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme, Surface, TextInput, Button } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'

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

  const [itemOther, setItemOther] = useState<StateOther>((other != null) ? other : formToData(tempNullOther))

  const {
    control,
    handleSubmit,
    setValue,
    setFocus
  } = useForm<FormOther>({ mode: 'onBlur', defaultValues: tempNullOther, values: dataToForm(itemOther) })

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date
    onChange: (event, date) => setValue('dateBuy', date)
  })

  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    isCancel()
  }
  const handleOk = (dataForm: FormOther): void => {
    isOk(formToData(dataForm))
  }

  return (
    <View>

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
                              label={'продавец'}
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
     // ----------------------Addition------------------------------------------
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
