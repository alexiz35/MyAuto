import {
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import {
  BACK_INPUT,
  StateFuel
} from '../type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { addFuel, editFuel } from '../components/Redux/actions'
import { Button, Dialog, Icon, Text, Input, LinearProgress, ListItem, useTheme } from '@rneui/themed'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { FuelList } from '../components/FuelScreenComponents/FuelList'
import Accordion from '../components/Accordion'
import BackgroundView from '../CommonComponents/BackgroundView'
import ShadowBox from '../CommonComponents/ShadowBox'

type Props = BottomTabScreenProps<RootTabParamList, 'Fuel'>

const FuelScreen = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { theme } = useTheme()

  const [errorMsg, setErrorMsg] = useState('')
  const [valueDrop, setValueDrop] = useState<null | string>(null)

  const [fuelDate, setFuelDate] = useState(new Date())
  const [fuelMileage, setFuelMileage] = useState(0)
  const [fuelVolume, setFuelVolume] = useState(0)
  const [fuelCost, setFuelCost] = useState(0)
  const [fuelAmount, setFuelAmount] = useState(0)
  const [fuelStation, setFuelStation] = useState('')

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)
  const [isEditFuel, setIsEditFuel] = useState(false)
  const [itemFuel, setItemFuel] = useState<StateFuel | null>(null)
  const [sumFuel, setSumFuel] = useState(0)

  const inputFuelCost = React.createRef<PropsWithChildren<TextInput>>()
  const inputFuelAmount = React.createRef<PropsWithChildren<TextInput>>()

  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date undefined
    onChange: (event, date) => setFuelDate(date)
  })
  const clearInput = (): void => {
    setFuelCost(0)
    setFuelDate(new Date())
    setFuelAmount(0)
    setFuelVolume(0)
    setFuelMileage(0)
    setFuelStation('')
  }
  // ---------------------------------------------------------------------------
  useFocusEffect(
    useCallback(() => {
      setValueDrop(state.cars[state.numberCar].info.fuel)
    }, [valueDrop]))

  useEffect(() => {
    const tempFuel = state.cars[state.numberCar].fuel.filter((item) => (new Date(item.dateFuel).getMonth() === new Date().getMonth()))
    const sumFuel = tempFuel.reduce(
      (accumulator, currentValue) => accumulator + currentValue.AmountFuel,
      0
    )
    setSumFuel(sumFuel)
  }, [state.cars[state.numberCar].fuel.length])

  // ------------------------- function calc input -----------------------------
  const handleOnSubmitCost = (): void => {
    setFuelAmount(fuelVolume * fuelCost)
    inputFuelAmount.current?.focus()
  }
  const handleOnSubmitAmount = (): void => {
    setFuelCost(fuelAmount / fuelVolume)
    /* inputFuelAmount.current?.focus() */
  }
  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateFuel): void => {
    if (!isOpenAccordion) {
      setFuelDate(item.dateFuel)
      setFuelMileage(item.mileageFuel)
      setFuelVolume(item.volumeFuel)
      setFuelAmount(item.AmountFuel)
      setFuelCost(item.CostFuel)
      setFuelStation(item.StationFuel)
      setIsEditFuel(true)
      setItemFuel(item)
      /* setOpenAccordion(true) */
      handleOnPress()
    }
  }
  /*  const isOpen = (open: boolean): void => {
    setIsOpenAccordion(open)
    if (!open) setOpenAccordion(false)
    else setOpenAccordion(true)
  } */
  const handleOnPress = (): void => {
    setIsOpenAccordion(true)
    setTimeout(() => {
      setOpenAccordion(!openAccordion)
      setIsOpenAccordion(false)
    }, 100)
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    clearInput()
    handleOnPress()
    /* setOpenAccordion(false) */
    /* navigation.goBack() */
  }
  const handleOk = (): void => {
    /* if (valueDrop === null || startKmInput === 0) {
      setErrorMsg('Введите необходимые данные')
      return
    } */
    const tempNewFuel: StateFuel = {
      id: Date.now(),
      dateFuel: fuelDate,
      mileageFuel: fuelMileage,
      volumeFuel: fuelVolume,
      CostFuel: fuelCost,
      AmountFuel: fuelAmount,
      StationFuel: fuelStation
    }

    isEditFuel
      ? dispatch(editFuel(state.numberCar, itemFuel?.id, tempNewFuel))
      : dispatch(addFuel(state.numberCar, tempNewFuel))
    clearInput()
    handleOnPress()
    /* setOpenAccordion(!openAccordion) */
    /* navigation.navigate('Home') */
  }

  return (
    <BackgroundView props={{ flex: 1 }}>
      <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
      </Dialog>
      <View style={{ flex: 1 }} >
        <Text style={{ textAlign: 'center', paddingVertical: 10, fontStyle: 'italic' }}>
          Cумма заправок в текущем месяце {sumFuel}
        </Text>
        <View style={{ marginTop: 5 }}>
          <ScrollView>
            <Accordion
              bannerStyle={{ backgroundColor: BACK_INPUT }}
              insideView={
                <View style={{ backgroundColor: 'rgba(61,61,61,0.35)' }}>
                  <ShadowBox style={{ margin: 5, flex: 1 }}>

                  <Text style={{ textAlign: 'center', paddingVertical: 7 }}>{valueDrop}</Text>
                  </ShadowBox>

                  <View style={styles.viewGroupInput}>
                    <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                        placeholder={'Дата проведения'}
                        containerStyle={{ flex: 1 }}
                        inputStyle={[styles.inputText, { color: theme.colors.black }]}

                        showSoftInputOnFocus={false}
                        value = {new Date(fuelDate).toLocaleDateString()}
                        onPressOut={inputDate}
                        errorMessage={'текущая дата'}
                        errorStyle={styles.errorInput}
                      />
                    </ShadowBox>
                    <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                        placeholder={'текущий пробег'}
                        inputStyle={[styles.inputText, { color: theme.colors.black }]}

                        errorMessage={'текущий пробег'}
                        errorStyle={styles.errorInput}
                        onChangeText={(value) => setFuelMileage(Number(value))}
                        keyboardType={'numeric'}
                        value={String(fuelMileage)}
                      />
                    </ShadowBox>
                  </View>

                <View style={styles.viewGroupInput}>
                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                  <Input
                      placeholder={'кол-во топлива'}
                      /* placeholderTextColor={'red'} */
                      inputStyle={[styles.inputText, { color: theme.colors.black }]}

                      errorMessage={'кол-во топлива'}
                      errorStyle={styles.errorInput}
                      onChangeText={(value) => setFuelVolume(Number(value))}
                      keyboardType={'numeric'}
                      value={String(fuelVolume)}
                      onSubmitEditing={() => inputFuelCost.current?.focus()}
                    />
                  </ShadowBox>

                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                  <Input
                      ref={inputFuelCost}
                      placeholder={'цена топлива'}
                      containerStyle={{ flex: 1 }}
                      inputStyle={[styles.inputText, { color: theme.colors.black }]}
                      errorMessage={'цена топлива'}
                      errorStyle={styles.errorInput}
                      onChangeText={(value) => setFuelCost(Number(value))}
                      keyboardType={'numeric'}
                      value={String(fuelCost)}
                      onSubmitEditing={() => handleOnSubmitCost()}
                      onBlur={() => handleOnSubmitCost()}
                    />
                  </ShadowBox>

                  <ShadowBox style={{ margin: 5, flex: 1 }}>
                    <Input
                      ref={inputFuelAmount}
                      placeholder={'сумма заправки'}
                      containerStyle={{ flex: 1 }}
                      /* inputStyle={styles.inputText} */
                      inputStyle={[styles.inputText, { color: theme.colors.black }]}
                      errorMessage={'сумма заправки'}
                      errorStyle={styles.errorInput}
                      onChangeText={(value) => setFuelAmount(Number(value))}
                      keyboardType={'numeric'}
                      value={String(fuelAmount)}
                      onSubmitEditing={() => handleOnSubmitAmount()}
                      onBlur={() => handleOnSubmitAmount()}
                    />
                  </ShadowBox>
                </View>
                  <ShadowBox style={{ margin: 5 }}>
                    <Input
                      placeholder={'название заправки'}
                      placeholderTextColor={theme.colors.error}
                      inputStyle={[styles.inputText, { color: theme.colors.black }]}
                      errorMessage={'название запрвки'}
                      errorStyle={styles.errorInput}
                      onChangeText={(value) => setFuelStation(String(value))}
                      value={String(fuelStation)}
                    />
                  </ShadowBox>
                <Text style={styles.button}>{errorMsg}</Text>
                <View style={styles.viewButton}>
                  <Button
                    containerStyle={styles.buttonStyle}
                    /* buttonStyle={{ borderColor: theme.colors.error }} */
                    /* titleStyle={{ color: theme.colors.error }} */
                    title={'Cancel'}
                    color={'error'}
                    type={'solid'}
                    onPress={() => handleCancel() }
                    /* onPress={onPressCancel} */
                    raised
                  />
                  <Button
                    containerStyle={styles.buttonStyle}
                    /* buttonStyle={{ borderColor: 'green' }}
                    titleStyle={{ color: 'green' }} */
                    title={'Ok'}
                    color={'success'}
                    type={'solid'}
                    onPress={() => { handleOk() }}
                    raised
                  />
                </View>
              </View>
              }
              title={'Добавьте заправку'}
              open={openAccordion}
              controlled={true}
              onPress={handleOnPress}
              /* isOpen={isOpen} */
            />
          </ScrollView>
        </View>
        <View style={{ marginTop: 10 }}>
            <FuelList handlePress={handleOpen}/>
        </View>

      </View>
    </BackgroundView>
  )
}

export default FuelScreen

const styles = StyleSheet.create({

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
