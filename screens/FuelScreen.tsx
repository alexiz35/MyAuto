import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { useEffect, useState } from 'react'
import { StateFuel } from '../type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { addFuel, editFuel } from '../components/Redux/actions'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
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
  ToggleButton
} from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { useAppTheme } from '../CommonComponents/Theme'

/* type Props = NativeStackScreenProps<RootStackParamList, 'FuelScreen'> */
type Props = CompositeScreenProps<BottomTabScreenProps<RootTabParamList>, NativeStackScreenProps<RootStackParamList, 'FuelScreen'>>

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
  const { colors } = useAppTheme()

  const tempNullFuel: FormFuel = {
    dateFuel: new Date(),
    mileageFuel: '',
    volumeFuel: '',
    CostFuel: '',
    AmountFuel: '',
    StationFuel: ''
  }

  const dataToForm = (data: StateFuel): FormFuel => {
    return {
      dateFuel: data.dateFuel,
      mileageFuel: data.mileageFuel === 0 ? '' : String(data.mileageFuel),
      volumeFuel: data.volumeFuel === 0 ? '' : String(data.volumeFuel),
      CostFuel: data.CostFuel === 0 ? '' : String(data.CostFuel),
      AmountFuel: data.AmountFuel === 0 ? '' : String(data.AmountFuel),
      StationFuel: data.StationFuel
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
      typeFuel: state.info.fuel ?? undefined
    }
  }

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditFuel, setIsEditFuel] = useState(false)
  const [itemFuel, setItemFuel] = useState<StateFuel>(formToData(tempNullFuel))
  const [sumFuel, setSumFuel] = useState(0)

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  // ------------------------- Controller Form-----------------------------------
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setFocus

  } = useForm<FormFuel>({ mode: 'onSubmit', defaultValues: tempNullFuel, values: dataToForm(itemFuel) })

  // ----------------------------------------------------------------------------
  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date undefined
    onChange: (event, date) => setValue('dateFuel', date)
  })

  const clearInput = (): void => {
    setIsEditFuel(false)
    setItemFuel(formToData(tempNullFuel))
  }

  // ---------------------------------------------------------------------------
  /* useFocusEffect(
    useCallback(() => {
      setValueDrop(state.info.fuel)
    }, [state.info.fuel])) */

  useEffect(() => {
    const tempFuel = state.fuel.filter((item) => (new Date(item.dateFuel).getMonth() === new Date().getMonth()))
    const sumFuel = tempFuel.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue.AmountFuel),
      0
    )
    setSumFuel(sumFuel)
  }, [state.fuel])

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
    else setTimeout(() => setIsList(true), 100)
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
        ? dispatch(editFuel(carId, itemFuel?.id, formToData(dataForm)))
        : dispatch(addFuel(carId, formToData(dataForm)))
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
              Cумма заправок в текущем месяце {sumFuel}

            </Text>
            <IconButton icon={'calendar-month'} onPress={() => { navigation.navigate('StatScreen') }} />
        </View>
        {
/* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView>
        <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={isEditFuel ? 'Редактируйте заправку' : 'Добавьте заправку'}
              description={ state.info.fuel }
              style={{ backgroundColor: colors.secondaryContainer }}
              expanded={openAccordion}
              onPress={handleOnPress}
            >

              <View style={{ backgroundColor: colors.background, rowGap: 10 }}>

                {
/* ----------------------- Date and Miles ----------------------------------- */
                }
                <View style={[styles.viewGroupInput, { marginTop: 20 }]}>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'dateFuel'}
                                control={control}
                                render={ ({ field: { value, ref } }) => (
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
                                )}
                    />
                  </Surface>
                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'mileageFuel'}
                                control={control}
                                rules={{ required: 'введите пробег', maxLength: 7, minLength: 1, min: 1, max: 10000000, pattern: /\d/ }}
                                defaultValue={'100'}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                      label={'пробег'}
                                      onChangeText={(value) => onChange(value)}
                                      onSubmitEditing={() => {
                                        setFocus('volumeFuel')
                                      }}
                                      onBlur={onBlur}
                                      keyboardType={'numeric'}
                                      value={value}
                                      error={(error != null) && true}
                                      right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="km"/>}
                                    />
                                    { (error != null)
                                      ? <HelperText type="error">1..10000000 km</HelperText>
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
                    <Controller name={'volumeFuel'}
                                control={control}
                                rules={{ required: 'введите объем топлива', maxLength: 3, minLength: 1, min: 1, max: 100, pattern: /\d/ }}
                                render={ ({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
                                  <>
                                    <TextInput
                                      ref={ref}
                                      label={'объем'}
                                      style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                      onChangeText={(value) => onChange(value)}
                                      keyboardType={'numeric'}
                                      value={value}
                                      onSubmitEditing={() => setFocus('CostFuel')}
                                      error={(error != null) && true}
                                      onBlur={onBlur}
                                      right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="л"/>}

                                    />
                                    { (error != null)
                                      ? <HelperText type="error">1..100 L</HelperText>
                                      : null
                                    }
                                  </>
                                )}
                    />
                  </Surface>

                  <Surface elevation={2} style={styles.surface}>
                    <Controller name={'CostFuel'}
                                control={control}
                                render={ ({ field: { onChange, value, ref } }) => (
                                  <TextInput
                                    ref={ref}
                                    label={'цена'}
                                    style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                    onChangeText={(value) => onChange(value)}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onSubmitEditing={() => setFocus('AmountFuel')/* handleOnSubmitCost() */}
                                    onBlur={() => handleOnSubmitCost()}
                                    right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="грн"/>}
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
                                    label={'сумма'}
                                    style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 10 }}
                                    onChangeText={(value) => onChange(value)}
                                    keyboardType={'numeric'}
                                    value={value}
                                    onSubmitEditing={() => setFocus('StationFuel')/* handleOnSubmitAmount() */}
                                    onBlur={() => handleOnSubmitAmount()}
                                    right={<TextInput.Affix textStyle={{ fontSize: 10 }} text="грн"/>}
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
                                      /* placeholder={'название заправки'} */
                                      label={'название заправки'}
                                      style={{ flex: 1, backgroundColor: colors.surface }}
                                      onChangeText={(value) => onChange(String(value))}
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
/* --------------------------- Buttons -------------------------------------- */
                }
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
                      onPress={handleSubmit(handleOk)}
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
            <ToggleButton.Row onValueChange={value => setDateList(value)}
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
