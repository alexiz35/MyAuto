import { View, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { useEffect, useState } from 'react'
import { StateInfo } from '../type'
import { editCar, updateMiles } from '../components/Redux/actions'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { cars } from '../cars.json'
import { Dropdown } from 'react-native-element-dropdown'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { BusyIndicator, useIsReady } from '../components/useIsReadyHook'
import BackgroundView from '../CommonComponents/BackgroundView'
import { TextInput, useTheme, Button, Divider } from 'react-native-paper'

interface ListCar {
  label: string
  value: string
}
type Props = NativeStackScreenProps<RootStackParamList, 'CarInfoScreen'>

const CarInfoScreen = ({ navigation }: Props): JSX.Element => {
  const setCar = useAppDispatch()
  const numberCar = useAppSelector(state => state.numberCar)
  const car = useAppSelector(state => state.cars)
  /* const state = useAppSelector(state => state) */
  const { colors } = useTheme()

  const itemsFuel = [
    { label: 'Дизель', value: 'Дизель' },
    { label: 'Бензин', value: 'Бензин' },
    { label: 'Газ', value: 'Газ' },
    { label: 'Электро', value: 'Электро' },
    { label: 'Газ-бензин', value: 'Газ-бензин' }
  ]
  const itemsBody = [
    { label: 'Hatch', value: 'Hatch' },
    { label: 'Sedan', value: 'Sedan' },
    { label: 'Cabriolet', value: 'Cabriolet' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Universal', value: 'Universal' }
  ]

  // -----------------------------------------------------------------------
  const styles = StyleSheet.create({

    viewAllInput: {

    },
    row1: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
      columnGap: 7
    },
    row2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      columnGap: 7,
      marginBottom: 12
    },
    row3: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      columnGap: 7,
      marginBottom: 12
    },
    dropDown: {
      padding: 5,
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: 5,
      backgroundColor: colors.surface
    },
    viewGroupEngine: {
      flexDirection: 'row',
      columnGap: 7,
      justifyContent: 'space-around'
    },
    input: {
      marginVertical: 5,
      /* marginHorizontal: 5, */
      flex: 1
    },
    errorInput: {
      color: 'gray',
      marginTop: 1,
      textAlign: 'center'
    },

    viewButton: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 30,
      columnGap: 25
    },
    buttonStyle: {
      flex: 1
      /* marginHorizontal: 10 */
    }

  })

  // ---------------------DropState----------------------------------------
  const [itemsBrand, setItemsBrand] = useState<ListCar[]>([])
  const [itemsModel, setItemsModel] = useState<ListCar[]>([])
  const [itemsYear, setItemsYear] = useState<ListCar[]>([])

  const [valueBrand, setValueBrand] = useState<string>('')
  const [valueModel, setValueModel] = useState<string>('')

  const [valueFuel, setValueFuel] = useState<string | undefined>('')
  const [valueBody, setValueBody] = useState<string | undefined>('')
  const [valueYear, setValueYear] = useState<string | undefined>('')

  const [valueVin, setValueVin] = useState<string | undefined>('')
  const [valueDateBuy, setValueDateBuy] = useState<Date>(new Date())
  const [valueCurrentMileage, setValueCurrentMileage] = useState(0)
  const [valueBuyMileage, setValueBuyMileage] = useState(0)

  const [valueEngine, setValueEngine] = useState<string | undefined>('')
  const [valueGear, setValueGear] = useState<string | undefined>('')
  /* const [valueCapacity, setValueCapacity] = useState<number>(0) */

  // ----------------------------------------------------------------------
  const inputDateBuy = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    onChange: (event, date = new Date()) => setValueDateBuy(date)
  })
  // ----------------------button Ok handler-------------------------------
  const handleOkCarInfo = (): void => {
    const carInfo: StateInfo = {
      brand: valueBrand,
      model: valueModel,
      fuel: valueFuel,
      body: valueBody,
      year: valueYear,
      engine: valueEngine,
      gear: valueGear,
      vin: valueVin,
      dateBuy: valueDateBuy,
      buyMileage: valueBuyMileage
    }
    setCar(editCar(numberCar, carInfo))
    const tempCurrentMileage = { currentMileage: valueCurrentMileage, dateMileage: new Date() }
    setCar(updateMiles(numberCar, tempCurrentMileage))
    navigation.goBack()
  }

  // --------------------DropListCreate------------------------------------
  const listBrand = (): ListCar[] => {
    const tempList: ListCar[] = []
    const tempBrand = Object.keys(cars)
    tempBrand.forEach((item, index) =>
      (tempList[index] = {
        label: item,
        value: item
      })
    )
    return tempList
  }

  const listModel = (): ListCar[] => {
    let i = 0
    const tempList: ListCar[] = []
    if (valueBrand !== '') {
      // @ts-expect-error hbhbh
      for (const key of cars[valueBrand]) {
        tempList[i] = {
          label: key,
          value: key
        }
        i++
      }
      return tempList
    }
    return []
  }

  const listYear = (): ListCar[] => {
    const tempList: ListCar[] = []
    let index = 0
    for (let i = 1990; i < 2023; i++) {
      tempList[index] = {
        label: String(i),
        value: String(i)
      }
      index++
    }
    return tempList
  }
  // ----------------------------------------------------------------------

  // --------------------DropEffect----------------------------------------
  useEffect(() => {
    setItemsBrand(listBrand())
    setItemsYear(listYear())
  }, [])

  useEffect(() => {
    setItemsModel(listModel())
  }, [valueBrand])

  // --------------------InitialSateScreen-------------------------------------
  useEffect(() => {
    const temp = car[numberCar].info
    setValueBrand(temp.brand)
    setValueModel(temp.model)
    setValueFuel(temp.fuel)
    setValueBody(temp.body)
    setValueYear(temp.year)
    setValueEngine(temp.engine)
    setValueGear(temp.gear)
    setValueVin(temp.vin)
    setValueDateBuy(new Date(temp.dateBuy))
    setValueBuyMileage(temp.buyMileage)
    setValueCurrentMileage(car[numberCar].currentMiles.currentMileage)
  }, [])

  const isReady = useIsReady()

  if (!isReady) { return <BusyIndicator/> } else {
    return (
    <BackgroundView style={{ height: '100%' }}>
      <ScrollView nestedScrollEnabled={true} style={{ paddingHorizontal: 10, height: '100%' }}>
        <View style={styles.row1 }>
          <View style={{ flex: 1 }}>
            <Dropdown
              style={styles.dropDown}
              selectedTextStyle={{ paddingHorizontal: 10, color: colors.onBackground }}
              activeColor={colors.primaryContainer}
              itemTextStyle={{ color: colors.onSurface }}
              inputSearchStyle={{ backgroundColor: colors.surfaceVariant, color: colors.onSurfaceVariant }}
              containerStyle={{ backgroundColor: colors.surface }}
              data={itemsBrand}
              labelField={'label'}
              valueField={'value'}
              placeholder={'Select Brand'}
              placeholderStyle={{ color: colors.onBackground }}
              search
              searchPlaceholder="Search..."
              value={valueBrand}
              onChange={item => {
                setValueBrand(item.value)
                /* setDisableModel(false) */
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
              <Dropdown
                /* disable={disableModel} */
                style={styles.dropDown}
                selectedTextStyle={{ paddingHorizontal: 10, color: colors.onBackground }}
                activeColor={colors.primaryContainer}
                itemTextStyle={{ color: colors.onSurface }}
                inputSearchStyle={{ backgroundColor: colors.surfaceVariant, color: colors.onSurfaceVariant }}
                containerStyle={{ backgroundColor: colors.surface }}
                /* placeholderStyle={disableModel ? { color: 'black' } : { color: TEXT_WHITE }} */
                placeholderStyle={{ color: colors.onBackground }}
                data={itemsModel}
                labelField={'label'}
                valueField={'value'}
                placeholder={'Select Model'}
                search
                searchPlaceholder="Search..."
                value={valueModel}
                onChange={item => {
                  setValueModel(item.value)
                }}
              />
          </View>
        </View>
        <View style={styles.row2 }>
          <View style={{ flex: 1 }}>
              <Dropdown
                style={styles.dropDown}
                selectedTextStyle={{
                  paddingHorizontal: 10,
                  color: colors.onBackground
                }}
                activeColor={colors.primaryContainer}
                itemTextStyle={{ color: colors.onSurface }}
                inputSearchStyle={{
                  backgroundColor: colors.surfaceVariant,
                  color: colors.onSurfaceVariant
                }}
                containerStyle={{ backgroundColor: colors.surface }}
                data={itemsFuel}
                labelField={'label'}
                valueField={'value'}
                placeholder={'Топливо'}
                placeholderStyle={{ color: colors.onBackground }}
                value={valueFuel}
                onChange={item => {
                  setValueFuel(item.value)
                }}
              />
          </View>
          <View style={{ flex: 1 }}>
              <Dropdown
                style={styles.dropDown}
                selectedTextStyle={{
                  paddingHorizontal: 10,
                  color: colors.onBackground
                }}
                activeColor={colors.primaryContainer}
                itemTextStyle={{ color: colors.onSurface }}
                inputSearchStyle={{
                  backgroundColor: colors.surfaceVariant,
                  color: colors.onSurfaceVariant
                }}
                containerStyle={{ backgroundColor: colors.surface }}
                placeholderStyle={{ color: colors.onBackground }}

                data={itemsBody}
                labelField={'label'}
                valueField={'value'}
                placeholder={'Тип'}
                value={valueBody}
                onChange={item => {
                  setValueBody(item.value)
                }}
              />
          </View>
          <View style={{ flex: 1 }}>
              <Dropdown
                style={styles.dropDown}
                selectedTextStyle={{
                  paddingHorizontal: 10,
                  color: colors.onBackground
                }}
                activeColor={colors.primaryContainer}
                itemTextStyle={{ color: colors.onSurface }}

                containerStyle={{ backgroundColor: colors.surface }}
                placeholderStyle={{ color: colors.onBackground }}
                /* maxHeight={300}
                showsVerticalScrollIndicator */
                data={itemsYear}
                labelField={'label'}
                valueField={'value'}
                placeholder={'Year'}
                value={valueYear}
                onChange={item => {
                  setValueYear(item.value)
                }}
              />
          </View>
        </View>
        <View style={styles.row3 }>
          <View style={{ flex: 1 }}>
                    <TextInput
                      mode={'outlined'}
                      /* ref={inputSellerName} */
                      placeholder={'тип двигателя'}
                      label={'тип двигателя'}
                      value={valueEngine}
                      onChangeText={(value) => setValueEngine(String(value))}
                    />
                  </View>
          <View style={{ flex: 1 }}>
                    <TextInput
                      mode={'outlined'}
                      /* ref={inputSellerPhone} */
                      label={'трансмиссия'}
                      placeholder={'трансмиссия'}
                      value={valueGear}
                      onChangeText={(value) => setValueGear(String(value))}
                    />
                  </View>
        </View>
        <Divider horizontalInset bold />
        <View style={styles.input}>
            <TextInput
              mode={'outlined'}
              /* ref={inputSellerLink} */
              placeholder={'VIN код автомобиля'}
              label={'VIN код автомобиля'}
              onChangeText={(value) => setValueVin(String(value))}
              value={valueVin}
            />
          </View>
          <View style={styles.viewGroupEngine}>
            <View style={styles.input}>
              <TextInput
                mode={'outlined'}
                /* ref={inputSellerName} */
                placeholder={'дата покупки'}
                showSoftInputOnFocus={false}
                label={'дата покупки'}
                onPressIn={ inputDateBuy }
                value = {valueDateBuy.toLocaleDateString()}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                mode={'outlined'}
                /* ref={inputSellerPhone} */
                placeholder={'пробег при покупке'}
                label={'пробег при покупке'}
                keyboardType={'numeric'}
                value={String(valueBuyMileage)}
                onChangeText={(value) => setValueBuyMileage(Number(value))}
              />
            </View>
          </View>
        <Divider horizontalInset bold style={{ marginTop: 8, marginBottom: 6 }} />
          <View style={[styles.input, { width: '50%', alignSelf: 'center' }]}>
            <TextInput
              mode={'outlined'}
              /* ref={inputSellerLink} */
              placeholder={'текущий пробег'}
              label={'текуший пробег'}
              keyboardType={'numeric'}
              value={String(valueCurrentMileage)}
              onChangeText={(value) => setValueCurrentMileage(Number(value))}
            />
          </View>
        <View style={styles.viewButton}>

          <Button
            icon={'close-thick'}
            onPress={() => { navigation.goBack() }}
            mode='outlined'
            rippleColor={colors.error}
            textColor={colors.error}
            style={styles.buttonStyle}
          >
            Cancel
          </Button>
          <Button
            icon={'check-bold'}
            style={styles.buttonStyle}
            textColor={colors.tertiary}
            rippleColor={colors.tertiary}
            mode={'outlined'}
            onPress={() => { handleOkCarInfo() }}
          >
            Ok
          </Button>
        </View>
    </ScrollView>

    </BackgroundView>

    )
  }
}

export default CarInfoScreen
