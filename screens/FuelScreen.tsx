import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { JSX, useCallback, useEffect, useState } from 'react'
import { getIndexCar, type StateFuel } from '../type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { type RootStackParamList, type RootTabParamList } from '../components/Navigation/TypeNavigation'
import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { FuelList } from '../components/FuelScreenComponents/FuelList'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  Text,
  Surface,
  TextInput,
  List,
  Button,
  HelperText,
  IconButton,
  ToggleButton, Checkbox, Card, Badge
} from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type CompositeScreenProps, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAppTheme } from '../CommonComponents/Theme'
import { /* addedFuel, */
  addStateCarReducer,
  editStateCarReducer, /* editedFuel, */ /* editStateCarReducer */
  setConsumption
} from '../components/Redux/CarsSlice'
import { useTranslation } from 'react-i18next'

/* type Props = NativeStackScreenProps<RootStackParamList, 'FuelScreen'> */
type Props = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'StatScreen'>, NativeStackScreenProps<RootStackParamList, 'FuelScreen'>>

interface FormFuel {
  dateFuel: Date
  mileageFuel: string
  volumeFuel: string
  CostFuel: string
  AmountFuel: string
  StationFuel: string
  restFuel: string
}

export const FuelScreen = (/* { navigation, route }: Props */): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const navigation = useNavigation<Props>()
  const { t } = useTranslation()

  const tempNullFuel: FormFuel = {
    dateFuel: new Date(),
    mileageFuel: '',
    volumeFuel: '',
    CostFuel: '',
    AmountFuel: '',
    StationFuel: '',
    restFuel: ''
  }

  const dataToForm = (data: StateFuel): FormFuel => {
    return {
      dateFuel: data.dateFuel,
      mileageFuel: data.mileageFuel === 0 ? '' : String(data.mileageFuel),
      volumeFuel: data.volumeFuel === 0 ? '' : String(data.volumeFuel),
      CostFuel: data.CostFuel === 0 ? '' : String(data.CostFuel),
      AmountFuel: data.AmountFuel === 0 ? '' : String(data.AmountFuel),
      StationFuel: data.StationFuel,
      restFuel: data.restFuel === 0 || data.restFuel === undefined ? '' : String(data.restFuel)
    }
  }
  const formToData = (data: FormFuel): StateFuel => {
    return {
      id: isEditFuel ? itemFuel?.id : Date.now(),
      dateFuel: data.dateFuel,
      mileageFuel: Number(data.mileageFuel),
      volumeFuel: Number(data.volumeFuel),
      CostFuel: Number(data.CostFuel),
      AmountFuel: Number(data.AmountFuel),
      StationFuel: data.StationFuel,
      typeFuel: state.info.fuel !== '' ? state.info.fuel : 'diesel',
      restFuel: Number(data.restFuel)
    }
  }

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditFuel, setIsEditFuel] = useState(false)
  const [itemFuel, setItemFuel] = useState<StateFuel>(formToData(tempNullFuel))
  const [sumFuel, setSumFuel] = useState(0)

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  // ----------------------------- fuel value  ----------------------------------

  const volumeFuel = () => {
    const tempVolumeFuel = state.fuel.filter((value) =>
      new Date(value.dateFuel).getFullYear() === new Date().getFullYear() &&
      new Date(value.dateFuel).getMonth() === new Date().getMonth()
    )
    setSumFuel(tempVolumeFuel.reduce((accumulator, currentValue) =>
      accumulator + Number(currentValue.volumeFuel), 0)
    )
  }

  useFocusEffect(
    useCallback(() => {
      volumeFuel()
    }, [state.fuel])
  )
  // ------------------------- Controller Form-----------------------------------
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setFocus

  } = useForm<FormFuel>({ mode: 'onSubmit', defaultValues: tempNullFuel, values: dataToForm(itemFuel) })

  // ----------------------------------------------------------------------------
  const inputDate = (): void => {
    DateTimePickerAndroid.open({
      value: new Date(),

      onChange: (event, date = new Date()) => {
        setValue('dateFuel', date)
      }
    })
  }

  const clearInput = (): void => {
    setIsEditFuel(false)
    setItemFuel(formToData(tempNullFuel))
  }

  // ---------------------------------------------------------------------------
  /* useFocusEffect(
    useCallback(() => {
      setValueDrop(state.info.fuel)
    }, [state.info.fuel])) */

  /* useEffect(() => {
    const tempFuel = state.fuel.filter((item) => (new Date(item.dateFuel).getMonth() === new Date().getMonth()))
    const sumFuel = tempFuel.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue.AmountFuel),
      0
    )
    setSumFuel(sumFuel)
  }, [state.fuel]) */
  // -------------------------- consumption ------------------------------------
  const [isConsumption, setIsConsumption] = useState<'checked' | 'unchecked'>(state.isConsumption ? 'checked' : 'unchecked')

  const toggleConsumption = () => {
    dispatch(setConsumption({ numberCar: carId, isConsumption: !state.isConsumption }))
  }

  useEffect(() => {
    setIsConsumption(state.isConsumption ? 'checked' : 'unchecked')
  }, [state.isConsumption])

  // ------------------------- function calc input -----------------------------
  const handleOnSubmitCost = (): void => {
    const valueCost = getValues(['volumeFuel', 'CostFuel'])
    const amountFuel = Number(valueCost[0]) * Number(valueCost[1])
    setValue('AmountFuel', amountFuel === 0 ? '' : String(amountFuel))
  }
  const handleOnSubmitAmount = (): void => {
    const amountCalc = getValues(['volumeFuel', 'CostFuel', 'AmountFuel'])
    const tempCalc = Number(amountCalc[2]) / Number(amountCalc[0])
    setValue('CostFuel', isNaN(tempCalc) ? '' : String(tempCalc))
  }
  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateFuel): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditFuel(true)
    setItemFuel(item)
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

  const handleOk = (dataForm: FormFuel): void => {
    setTimeout(() =>
      isEditFuel
        ? dispatch(editStateCarReducer({ type: 'fuel', numberCar: carId, item: formToData(dataForm) }))
        : dispatch(addStateCarReducer({ type: 'fuel', numberCar: carId, item: formToData(dataForm) }))
    , 100)
    handleOnPress()
  }

  return (
    <BackgroundView props={{ flex: 1 }}>

      <View style={{ flex: 1 }} >
        {
/* ----------------------- Top String --------------------------------------- */
        }
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontStyle: 'italic' }}>
               {`${t('fuelScreen.TITLE_SUM_FUEL')}${sumFuel} l`}
            </Text>
            <IconButton icon={'calendar-month'} onPress={() => {
              // @ts-expect-error temp error navigate props
              navigation.navigate('StatScreen')
            }} />
        </View>
        {
/* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={isEditFuel ? t('fuelScreen.TITLE_ACCORDION_EDIT') : t('fuelScreen.TITLE_ACCORDION_ADD')}
              description={ state.info.fuel }
              style={{ backgroundColor: colors.secondaryContainer }}
              expanded={openAccordion}
              onPress={handleOnPress}
            >

              <View style={{ backgroundColor: colors.background, rowGap: 5 }}>

    {
/* ----------------------- Date and Miles ----------------------------------- */
    }
                <View style={[styles.viewGroupInput, { marginTop: 0 }]}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'dateFuel'}
                                control={control}
                                render={ ({ field: { value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    placeholder={t('fuelScreen.DATE_FUEL')}
                                    style={{ flex: 1, backgroundColor: colors.surface }}
                                    label={t('fuelScreen.DATE_FUEL')}
                                    showSoftInputOnFocus={false}
                                    value = {new Date(value).toLocaleDateString()}
                                    /* value={value} */
                                    onPressOut={inputDate}
                                    onSubmitEditing={() => { setFocus('mileageFuel') }}
                                  />
                                )}
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'volumeFuel'}
                                control={control}
                                rules={{ required: 'введите объем топлива', maxLength: 3, minLength: 1, min: 1, max: 100, pattern: /\d/ }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      label={t('fuelScreen.VOLUME_FUEL')}
                                      style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                      onChangeText={(value) => { onChange(value) }}
                                      keyboardType={'numeric'}
                                      value={value}
                                      onSubmitEditing={() => { setFocus('CostFuel') }}
                                      error={(error != null) && true}
                                      onBlur={onBlur}
                                      right={<TextInput.Affix textStyle={{ fontSize: 10 }} text={t('L')}/>}

                                    />
                                    { (error != null)
                                      ? <HelperText type="error">1..100 L</HelperText>
                                      : null
                                    }
                                  </>
                                )}
                    />
                  </Surface>
                </View>
                {
/* ----------------------- Value, Cost, Amount Fuel-------------------------- */
                }
                <View style={styles.viewGroupInput}>

                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'CostFuel'}
                                control={control}
                                render={ ({ field: { onChange, value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    label={t('fuelScreen.COST_FUEL')}
                                    style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                    onChangeText={(value) => { onChange(value) }}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onSubmitEditing={() => { setFocus('AmountFuel') }/* handleOnSubmitCost() */}
                                    onBlur={() => { handleOnSubmitCost() }}
                                    right={<TextInput.Affix textStyle={{ fontSize: 10 }} text={t('CURRENCY')}/>}
                                  />
                                )}
                    />
                  </Surface>

                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'AmountFuel'}
                                control={control}
                                render={ ({ field: { onChange, value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    label={t('fuelScreen.TOTAL_COST')}
                                    style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                    onChangeText={(value) => { onChange(value) }}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onSubmitEditing={() => { setFocus('StationFuel') }/* handleOnSubmitAmount() */}
                                    onBlur={() => { handleOnSubmitAmount() }}
                                    right={<TextInput.Affix textStyle={{ fontSize: 10 }} text={t('CURRENCY')}/>}
                                  />
                                )}
                    />
                  </Surface>
                </View>
                {
/* ------------------------- Station Fuel ----------------------------------- */
                }
                <Surface elevation={2} style={{ margin: 5 }}>
                    <Controller name={'StationFuel'}
                                control={control}
                                rules={{ /* required: 'REQ' *//* , minLength: { value: 2, message: 'MIN' } */ }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      label={t('fuelScreen.FUEL_STATION')}
                                      style={{ flex: 1, backgroundColor: colors.surface }}
                                      onChangeText={(value) => { onChange(String(value)) }}
                                      value={String(value)}
                                      onBlur={onBlur}
                                      error={(error != null) && true}
                                    />
                                    {/*  <HelperText type="error">{formState.errors.StationFuel?.message}</HelperText> */}
                                  </>
                                )}
                    />
                </Surface>
                {/* <Text style={styles.button}>{errorMsg}</Text> */}

                {
                  /* ----------------------- Date and Miles ----------------------------------- */
                }
                <Card style={{ padding: 10, marginHorizontal: 10, marginTop: 5 }}>
                  {/* <Badge size={16} style={{ alignSelf: 'flex-start', backgroundColor: colors.onBackground }}>I</Badge> */}
                  <Surface style={[styles.surface, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
                  <Checkbox.Item
                    style={{ paddingVertical: 0 }}
                    position={'leading'}
                    status={isConsumption}
                    label={'Вести точный расчет расхода'}
                    /* mode={'ios'} */
                    onPress={() => { toggleConsumption() }}
                    labelVariant={'bodySmall'}
                  />
                    <IconButton icon={'help-circle-outline'}/>

                  </Surface>
                  <View style={[styles.viewGroupInput, { marginTop: 10 }]}>
                    <Controller name={'mileageFuel'}
                                control={control}
                                rules={{
                                  required: state.isConsumption ? 'введите пробег' : state.isConsumption,
                                  maxLength: 7,
                                  minLength: 1,
                                  min: 1,
                                  max: 10000000,
                                  pattern: /\d/
                                }}
                                defaultValue={'100'}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <View style={styles.surface}>
                                    <TextInput
                                      ref={ref}
                                      dense
                                      style={{
                                        flex: 1,
                                        backgroundColor: colors.surface,
                                        paddingHorizontal: 10
                                      }}
                                      theme={{
                                        colors:
                                          { onSurfaceVariant: state.isConsumption ? colors.text : colors.outline }
                                      }}
                                      label={t('fuelScreen.MILEAGE_FUEL')}
                                      onChangeText={(value) => { onChange(value) }}
                                      onSubmitEditing={() => {
                                        setFocus('restFuel')
                                      }}
                                      onBlur={onBlur}
                                      keyboardType={'numeric'}
                                      value={value}
                                      error={(error != null) && true}
                                      right={<TextInput.Affix textStyle={{ fontSize: 10 }} text={t('KM')}/>}
                                    />
                                    { (error != null)
                                      ? <HelperText type="error">1..10000000 km</HelperText>
                                      : null
                                    }
                                  </View>
                                )}
                    />
                    <Controller name={'restFuel'}
                                control={control}
                                rules={{
                                  required: state.isConsumption ? 'введите остаток' : state.isConsumption,
                                  maxLength: 4,
                                  minLength: 1,
                                  min: 1,
                                  max: 1000,
                                  pattern: /\d/
                                }}
                                defaultValue={'10'}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <View style={styles.surface}>
                                    <TextInput
                                      ref={ref}
                                      dense
                                      style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                      label={'Остаток топлива'}
                                      theme={{
                                        colors:
                                          { onSurfaceVariant: state.isConsumption ? colors.text : colors.outline }
                                      }}
                                      /* label={t('fuelScreen.MILEAGE_FUEL')} */
                                      onChangeText={(value) => { onChange(value) }}
                                     /*  onSubmitEditing={() => {
                                        setFocus('volumeFuel')
                                      }} */
                                      onBlur={onBlur}
                                      keyboardType={'numeric'}
                                      value={value}
                                      error={(error != null) && true}
                                      right={<TextInput.Affix textStyle={{ fontSize: 10 }} text={t('L')}/>}
                                    />
                                    { (error != null)
                                      ? <HelperText type="error">1..1000 l</HelperText>
                                      : null
                                    }
                                  </View>
                                )}
                    />

                  </View>
                </Card>
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

            <FuelList handlePress={handleOpen} filterList={dateList} />

          </View>
        }
        {
/* -------------------------------------------------------------------------- */
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
