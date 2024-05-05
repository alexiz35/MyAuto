import { Alert, StyleSheet, View } from 'react-native'
import {
  Button,
  Card,
  Checkbox, Dialog,
  HelperText,
  Icon,
  IconButton, Portal,
  Surface,
  Text,
  TextInput
} from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { useAppTheme } from '../../CommonComponents/Theme'
import { getIndexCar, StateFuel, StateInfo } from '../../type'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useTranslation } from 'react-i18next'
import { editedCarInfo, setConsumption } from '../Redux/CarsSlice'

interface InputFuelProps {
  isCancel: () => void
  isOk: (taskResult: StateFuel) => void
  fuel?: StateFuel | null
  isEdit: boolean
}
export interface FormFuel {
  dateFuel: Date
  mileageFuel: string
  volumeFuel: string
  CostFuel: string
  AmountFuel: string
  StationFuel: string
  restFuel: string
}

export const FuelInput = ({ isCancel, isOk, fuel = null, isEdit }: InputFuelProps): JSX.Element => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])
  const carId = useAppSelector(state => state.numberCar)
  const dispatch = useAppDispatch()

  const [visibleToolTip, setVisibleToolTip] = useState<boolean>(false)
  const [isFullFuel, setIsFullFuel] = useState<boolean>(fuel === null ? false : fuel?.isFullFuel)
  const [colorFullFuel, setColorFullFuel] = useState<string | undefined>()
  const [colorToolTip, setColorToolTip] = useState<string | undefined>()
  const [alertFuelTank, setAlertFuelTank] = useState<boolean>(false)
  const [valueFuelTank, setValueFuelTank] = useState('')
  const focusRestFuel = () => {
    setVisibleToolTip(true)
    setColorToolTip(colors.surfaceDisabled)
    setTimeout(() => {
      setVisibleToolTip(false)
      setColorToolTip(undefined)
    }, 3000)
  }

  const setFullFuel = () => {
    setIsFullFuel(!isFullFuel)
  }

  const okAlertFullFuel = () => {
    const tempInfo: StateInfo = { ...state.info, fuelTank: Number(valueFuelTank) }
    dispatch(editedCarInfo({ numberCar: carId, carInfo: tempInfo }))
    setAlertFuelTank(false)
    const temp = Number(valueFuelTank) - Number(getValues('volumeFuel'))
    setValue('restFuel', String(temp))
    setColorFullFuel(colors.tertiary)
  }

  useEffect(() => {
    if (isFullFuel) {
      if (state.info.fuelTank === 0) {
        setAlertFuelTank(true)
      } else {
        const temp = state.info.fuelTank - Number(getValues('volumeFuel'))
        setValue('restFuel', String(temp))
        setColorFullFuel(colors.tertiary)
      }
    } else setColorFullFuel(undefined)
  }, [isFullFuel])

  // ----------------------------------------------------------------------------
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
      id: isEdit ? itemFuel?.id : Date.now(),
      dateFuel: data.dateFuel,
      mileageFuel: Number(data.mileageFuel),
      volumeFuel: Number(data.volumeFuel),
      CostFuel: Number(data.CostFuel),
      AmountFuel: Number(data.AmountFuel),
      StationFuel: data.StationFuel,
      typeFuel: state.info.fuel !== '' ? state.info.fuel : 'diesel',
      restFuel: Number(data.restFuel),
      isFullFuel
    }
  }

  const [itemFuel, setItemFuel] = useState<StateFuel>(
    fuel !== null ? fuel : formToData(tempNullFuel)
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

  // ------------------------- function calc input -----------------------------
  const handleOnSubmitCost = (): void => {
    const valueCost = getValues(['volumeFuel', 'CostFuel'])
    const amountFuel = Number(valueCost[0]) * Number(valueCost[1])
    setValue('AmountFuel', amountFuel === 0 ? '' : String(amountFuel))
  }
  const handleOnSubmitAmount = (): void => {
    const amountCalc = getValues(['volumeFuel', 'CostFuel', 'AmountFuel'])
    if (Number(amountCalc[0]) === 0) return
    const tempCalc = Number(amountCalc[2]) / Number(amountCalc[0])
    setValue('CostFuel', isNaN(tempCalc) ? '' : String(tempCalc))
  }

  // ---------------------------handleButtons-----------------------------------
  const handleCancel = (): void => {
    isCancel()
  }

  const handleOk = (dataForm: FormFuel): void => {
    /*  if (createPurchase) {
      nav.navigate('InputDoneScreen', { editable: true, taskId: itemTask.id, typeTask: 'service' })
    } */
    isOk(formToData(dataForm))
  }
  // -------------------------- consumption ------------------------------------
  const [isConsumption, setIsConsumption] = useState<'checked' | 'unchecked'>(state.isConsumption ? 'checked' : 'unchecked')

  const toggleConsumption = () => {
    if (state.isConsumption) {
      Alert.alert(t('fuelScreen.TITLE_OFF_CONSUMPTION'), t('fuelScreen.OFF_CONSUMPTION'), [
        {
          text: 'Cancel',
          // ***
          /* onPress: () => console.log('Cancel Pressed'), */
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(setConsumption({ numberCar: carId, isConsumption: !state.isConsumption }))
          }
        }
      ])
    } else dispatch(setConsumption({ numberCar: carId, isConsumption: !state.isConsumption }))
  }

  useEffect(() => {
    setIsConsumption(state.isConsumption ? 'checked' : 'unchecked')
  }, [state.isConsumption])

  const alertConsumption = () => {
    Alert.alert(t('carInfo.alert.TITLE'), t('carInfo.alert.MESSAGE'), [
      {
        text: 'Cancel',
        // ***
        /* onPress: () => console.log('Cancel Pressed'), */
        style: 'cancel'
      },
      {
        text: 'OK'
        /* onPress: () => { navigation.dispatch(e.data.action) } */
      }
    ])
  }

  return (
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
        <Surface style={[styles.surface, { flexDirection: 'row', alignItems: 'center' }]}>
          <View style={{ flex: 5 }}>
          <Checkbox.Item
            style={{ paddingVertical: 0, maxWidth: '100%', paddingLeft: 2 }}
            position={'leading'}
            status={isConsumption}
            label={t('fuelScreen.TITLE_CHECKBOX_CONSUMPTION')}
            labelStyle={{ flexWrap: 'wrap', textAlign: 'left', paddingLeft: 5 }}
            /* mode={'ios'} */
            onPress={() => { toggleConsumption() }}
            labelVariant={'bodySmall'}
          />
          </View>
          <View style={{ flex: 1 }}>
          <IconButton icon={'help-circle-outline'} onPress={alertConsumption} style={{ marginRight: 0 }}/>
          </View>
        </Surface>
        <View style={{ marginTop: 5, columnGap: 5, justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <Controller name={'mileageFuel'}
                      control={control}
                      rules={{
                        required: state.isConsumption ? t('fuelScreen.INPUT_MILEAGE') : state.isConsumption,
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

                        <View style={[styles.surface, { flex: 2 }]}>

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          {/* <IconButton icon={'fuel'} iconColor={colors.tertiary} size={25} style={{ borderRadius: 0, marginRight: 0, backgroundColor: colors.surface, flex: 1 }}/>
 */}
                          <TextInput
                            ref={ref}
                            dense
                            style={{ backgroundColor: colors.surface, flex: 1, paddingRight: 5 }}
                            label={t('fuelScreen.REST_FUEL')}
                            disabled={isFullFuel}
                            theme={{
                              colors:
                                { onSurfaceVariant: state.isConsumption ? colors.text : colors.outline }
                            }}
                            onChangeText={(value) => { onChange(value) }}
                            /*  onSubmitEditing={() => {
                               setFocus('volumeFuel')
                             }} */
                            onFocus={focusRestFuel}
                            onPressIn={focusRestFuel}
                            onBlur={onBlur}
                            keyboardType={'numeric'}
                            value={value}
                            error={(error != null) && true}
                            left={<TextInput.Icon icon={'gauge-full'}
                                                  style={{ borderEndWidth: 1, backgroundColor: colorToolTip }}
                                                  color={colorFullFuel}
                                                  onPress={setFullFuel}
                                                  forceTextInputFocus={false}
                            />}
                            right={<TextInput.Affix textStyle={{ fontSize: 10 }} text={t('L')}/>}
                          />
                            {visibleToolTip
                              ? <View
                              style={{
                                position: 'absolute',
                                top: -20,
                                left: 20,
                                backgroundColor: colors.surfaceDisabled,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                paddingTop: 0,
                                columnGap: 3
                              }}>
                              <Icon source={'arrow-down-left-bold'} size={20}></Icon>
                              <Text style={{ textAlign: 'justify' }}>
                                Заправка до полного
                              </Text>
                            </View>
                              : null}

                          { (error != null)
                            ? <HelperText type="error">1..1000 l</HelperText>
                            : null
                          }
                          </View>
                        </View>

                      )}
          />

            {/* <Checkbox status={'checked'} /> */}
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
      <Portal>
        <Dialog visible={alertFuelTank} dismissable onDismiss={() => { setAlertFuelTank(false) }}>
          <Dialog.Icon icon={'alert'} size={34} color={colors.yellow}/>
          <Dialog.Content>
            <Text>Вы не внесли объем бака в характеристиках автомобиля, хотите это сделать сейчас?</Text>
            <TextInput mode={'flat'}
                       value={valueFuelTank}
                       onChangeText={(value) => { setValueFuelTank(value) }}
                       keyboardType={'numeric'}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setAlertFuelTank(false) }}>Cancel</Button>
            <Button onPress={okAlertFullFuel}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>

  )
}
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
