import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import {
  BACK_INPUT,
  StateFuel, StatePart
} from '../type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { addFuel, editFuel } from '../components/Redux/actions'
import { Dialog, Icon, Input, LinearProgress, ListItem } from '@rneui/themed'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { FuelList } from '../components/FuelScreenComponents/FuelList'
import Accordion from '../components/Accordion'
import BackgroundView from '../CommonComponents/BackgroundView'
import ShadowBox from '../CommonComponents/ShadowBox'
import { useTheme, Text, Surface, TextInput, List, Button, HelperText } from 'react-native-paper'
import { Controller, useController, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = BottomTabScreenProps<RootTabParamList, 'Fuel'>

interface FormFuel {
  dateFuel: Date
  mileageFuel: string
  volumeFuel: string
  CostFuel: string
  AmountFuel: string
  StationFuel: string
}

const FuelScreen = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.cars[state.numberCar])
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useTheme()

  const tempNullFuel: FormFuel = {
    dateFuel: new Date(),
    mileageFuel: '100',
    volumeFuel: '',
    CostFuel: '',
    AmountFuel: '',
    StationFuel: ''
  }

  const dataToForm = (data: StateFuel): FormFuel => {
    return {
      dateFuel: data.dateFuel,
      mileageFuel: String(data.mileageFuel),
      volumeFuel: String(data.volumeFuel),
      CostFuel: String(data.CostFuel),
      AmountFuel: String(data.AmountFuel),
      StationFuel: data.StationFuel
    }
  }
  const formToData = (data: FormFuel): StateFuel => {
    return {
      id: Date.now(),
      dateFuel: data.dateFuel,
      mileageFuel: Number(data.mileageFuel),
      volumeFuel: Number(data.volumeFuel),
      CostFuel: Number(data.CostFuel),
      AmountFuel: Number(data.AmountFuel),
      StationFuel: data.StationFuel
    }
  }
  /* const editFuel : StateFuel  */

  /* const [errorMsg, setErrorMsg] = useState('') */
  /* const [valueDrop, setValueDrop] = useState<null | string>(null) */

  /* const [fuelDate, setFuelDate] = useState(new Date())
  const [fuelMileage, setFuelMileage] = useState(0)
  const [fuelVolume, setFuelVolume] = useState(0)
  const [fuelCost, setFuelCost] = useState(0)
  const [fuelAmount, setFuelAmount] = useState(0)
  const [fuelStation, setFuelStation] = useState('') */

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditFuel, setIsEditFuel] = useState(false)
  const [itemFuel, setItemFuel] = useState<StateFuel>(formToData(tempNullFuel))
  const [sumFuel, setSumFuel] = useState(0)

  /* const inputFuelCost = React.createRef<PropsWithChildren<typeof TextInput>>()
  const inputFuelAmount = React.createRef<PropsWithChildren<typeof TextInput>>() */

  // ------------------------- Controller Form-----------------------------------
  const {
    control,
    reset,
    handleSubmit,
    formState,
    setValue,
    setFocus,
    trigger

  } = useForm<FormFuel>({ mode: 'onChange', defaultValues: tempNullFuel, values: dataToForm(itemFuel) })

  // ----------------------------------------------------------------------------
  const transformOut = (value: number): string => {
    console.log('value', value)
    return isNaN(value) || value === 0 ? '' : value.toString()
  }
  const transformIn = (value: string): number => {
    const output = parseInt(value, 10)
    return isNaN(output) ? 0 : output
  }

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date undefined
    onChange: (event, date) => setValue('dateFuel', date)
  })
  const clearInput = (): void => {
    /* setItemFuel(formToData(tempNullFuel)) */
    setIsEditFuel(false)
    reset({
      dateFuel: new Date(),
      mileageFuel: '100',
      volumeFuel: '',
      CostFuel: '',
      AmountFuel: '',
      StationFuel: ''
    })
  }
  // ---------------------------------------------------------------------------
  /* useFocusEffect(
    useCallback(() => {
      setValueDrop(state.info.fuel)
    }, [state.info.fuel])) */

  useEffect(() => {
    const tempFuel = state.fuel.filter((item) => (new Date(item.dateFuel).getMonth() === new Date().getMonth()))
    const sumFuel = tempFuel.reduce(
      (accumulator, currentValue) => accumulator + currentValue.AmountFuel,
      0
    )
    setSumFuel(sumFuel)
  }, [state.fuel])

  // ------------------------- function calc input -----------------------------
  const handleOnSubmitCost = (): void => {
    /* setFuelAmount(fuelVolume * fuelCost) */
    /* inputFuelAmount.current?.focus() */
  }
  const handleOnSubmitAmount = (): void => {
    /* setFuelCost(fuelAmount / fuelVolume) */
    /* inputFuelAmount.current?.focus() */
  }
  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateFuel): void => {
    setIsEditFuel(true)
    setItemFuel(item)
    setOpenAccordion(true)
  }

  const handleOnPress = (): void => {
    setOpenAccordion(!openAccordion)
    clearInput()
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  console.log('ERROR', formState.errors)
  const handleOk = (dataForm: StateFuel): void => {
    /* if (valueDrop === null || startKmInput === 0) {
      setErrorMsg('Введите необходимые данные')
      return
    } */

    dataForm.id = Date.now()

    isEditFuel
      ? dispatch(editFuel(carId, itemFuel?.id, dataForm))
      : dispatch(addFuel(carId, dataForm))
    clearInput()
    handleOnPress()
  }

  return (
    <BackgroundView props={{ flex: 1 }}>
      {/* <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: colors.tertiary }}/>
      </Dialog> */}
      <View style={{ flex: 1 }} >
        <Text style={{ textAlign: 'center', paddingVertical: 10, fontStyle: 'italic' }}>
          Cумма заправок в текущем месяце {sumFuel}
        </Text>
        <KeyboardAvoidingView>
        <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={'Добавьте заправку'}
              description={ state.info.fuel }
              style={{ backgroundColor: colors.secondaryContainer }}
              expanded={openAccordion}
              onPress={handleOnPress}
            >
              {/* bannerStyle={{ backgroundColor: colors.secondaryContainer }} */}
              {/* insideView= */}
<View>
                <View style={{ backgroundColor: colors.background, rowGap: 10/* 'rgba(61,61,61,0.35)' */ }}>
                  {/* <Surface mode={'flat'} elevation={4} style={{ margin: 5, flex: 1, marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', paddingVertical: 7 }}>{valueDrop}</Text>
                  </Surface> */}

                  <View style={[styles.viewGroupInput, { marginTop: 20 }]}>
                    <Surface elevation={2} style={{ margin: 5, flex: 1 }}>
                      <Controller name={'dateFuel'}
                                  control={control}
                                  render={ ({ field: { onChange, value, onBlur, ref } }) => (
                    <TextInput
                        ref={ref}
                        placeholder={'Дата заправки'}
                        style={{ flex: 1, backgroundColor: colors.surface }}
                        label={'Дата заправки'}
                        showSoftInputOnFocus={false}
                        value = {new Date(value).toLocaleDateString()}
                        onPressOut={inputDate}
                        onSubmitEditing={() => setFocus('mileageFuel')}
                      />
                                  )}/>
                    </Surface>
                    <Surface elevation={2} style={{ margin: 5, flex: 1 }}>
                      <Controller name={'mileageFuel'}
                                  control={control}
                                  rules={{ required: 'REQ', minLength: { value: 2, message: 'MIN' } }}
                                  defaultValue={'100'}
                                  render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                    <>
                                          <TextInput
                                              ref={ref}
                                              placeholder={'пробег'}
                                              style={{ flex: 1, backgroundColor: colors.surface }}
                                              label={'текущий пробег'}
                                              onChangeText={(value) => onChange(value)}
                                              onSubmitEditing={() => {
                                                setFocus('volumeFuel')
                                              }}
                                              onBlur={onBlur}
                                              keyboardType={'numeric'}
                                              value={value}
                                              error={(error != null) && true}
                                            />
                                    {/* <HelperText type="error">{formState.errors.mileageFuel?.message}</HelperText> */}
                                    </>
                                  )}/>

                      {/* <Text>{String(errors.mileageFuel?.message)}</Text> */}
                    </Surface>
                  </View>

                <View style={styles.viewGroupInput}>
                  <Surface elevation={2} style={{ margin: 5, flex: 1 }}>
                    <Controller name={'volumeFuel'}
                                control={control}
                                rules={{ /* required: 'hello', */ minLength: 3 }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                  <TextInput
                      ref={ref}
                      placeholder={'кол-во топлива'}
                      label={'кол-во топлива'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      onChangeText={(value) => onChange(value)}
                      keyboardType={'numeric'}
                      value={value}
                      onSubmitEditing={() => setFocus('CostFuel')}
                    />
                              {/*   {((error === undefined)) ? <Text>This is required</Text> : null} */}
                                  </>
                                )}/>
                  </Surface>

                  <Surface elevation={2} style={{ margin: 5, flex: 1 }}>
                    <Controller name={'CostFuel'}
                                control={control}
                                render={ ({ field: { onChange, value, onBlur, ref } }) => (
                  <TextInput
                      ref={ref}
                      placeholder={'цена топлива'}
                      label={'цена топлива'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      onChangeText={(value) => onChange(value)}
                      keyboardType={'numeric'}
                      value={value}
                      onSubmitEditing={() => setFocus('AmountFuel')/* handleOnSubmitCost() */}
                      onBlur={() => handleOnSubmitCost()}
                    />
                                )}/>
                  </Surface>

                  <Surface elevation={2} style={{ margin: 5, flex: 1 }}>
                    <Controller name={'AmountFuel'}
                                control={control}
                                render={ ({ field: { onChange, value, onBlur, ref } }) => (
                    <TextInput
                      ref={ref}
                      placeholder={'сумма заправки'}
                      label={'сумма заправки'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      onChangeText={(value) => onChange(value)}
                      keyboardType={'numeric'}
                      value={value}
                      onSubmitEditing={() => setFocus('StationFuel')/* handleOnSubmitAmount() */}
                      onBlur={() => handleOnSubmitAmount()}
                    />
                                )}/>
                  </Surface>
                </View>
                  <Surface elevation={2} style={{ margin: 5 }}>
                    <Controller name={'StationFuel'}
                                control={control}
                                rules={{ required: 'REQ', minLength: { value: 2, message: 'MIN' } }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                    <TextInput
                      ref={ref}
                      placeholder={'название заправки'}
                      label={'название заправки'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      onChangeText={(value) => onChange(String(value))}
                      value={String(value)}
                      onBlur={onBlur}
                      error={(error != null) && true}
                    />
                   {/*  <HelperText type="error">{formState.errors.StationFuel?.message}</HelperText> */}
                                  </>
                                )}/>
                  </Surface>

                  {/* <Text style={styles.button}>{errorMsg}</Text> */}
                <View style={styles.viewButton}>
                  <Button
                    style={styles.buttonStyle}
                    mode={'elevated'}
                    buttonColor={colors.secondaryContainer}
                    textColor={colors.primary}
                    onPress={() => handleCancel() }
                  >
                    Cancel
                  </Button>
                  <Button
                    style={styles.buttonStyle}
                    mode={'elevated'}
                    buttonColor={colors.secondaryContainer}
                    textColor={colors.primary}
                    onPress={handleSubmit(handleOk) }
                    >
                    Ok
                  </Button>
                </View>
              </View>
</View>
              {/* open={openAccordion}
              controlled={true}
              onPress={handleOnPress}
              /* isOpen={isOpen} */
           }
            </List.Accordion>
        </ScrollView>
        </KeyboardAvoidingView>
        {!openAccordion &&
          <View style={{ marginTop: 10 }}>
            <FuelList handlePress={handleOpen} />
          </View>
        }
      </View>
    </BackgroundView>
  )
}

export default FuelScreen

const styles = StyleSheet.create({

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 10
    /* marginVertical: 10 */
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
