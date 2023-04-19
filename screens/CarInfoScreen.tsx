import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ImageBackground,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TextInputFocusEventData,
  GestureResponderEvent,
  Keyboard,
  ActivityIndicator,
  InteractionManager
} from 'react-native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Icon, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useEffect, useMemo, useState } from 'react'
import {
  BACK_INPUT,
  BACKGROUND,
  COLOR_GREEN,
  StatePart,
  ServiceList, StateCar, StateInfo,
  StateTask,
  TEXT,
  TEXT_CARD,
  TEXT_WHITE
} from '../type'
import { addTask, editCar, editTask, updateMiles } from '../components/Redux/actions'
import { BottomSheetAddition } from '../components/BottomSheetAddition'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'
import { cars } from '../cars.json'
import { Dropdown } from 'react-native-element-dropdown'
import { SimpleAccordion } from 'react-native-simple-accordion'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { BusyIndicator, useIsReady } from '../components/useIsReadyHook'

interface ListCar {
  label: string
  value: string
}
type Props = NativeStackScreenProps<RootStackParamList, 'CarInfoScreen'>

const CarInfoScreen = ({ navigation }: Props): JSX.Element => {
  const setCar = useAppDispatch()
  const numberCar = useAppSelector(state => state.numberCar)
  const car = useAppSelector(state => state.cars)
  const state = useAppSelector(state => state)

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
    { label: 'Combi', value: 'Combi' }
  ]

  // ---------------------DropState----------------------------------------
  const [itemsBrand, setItemsBrand] = useState<ListCar[]>([])
  const [itemsModel, setItemsModel] = useState<ListCar[]>([])
  const [disableModel, setDisableModel] = useState(true)
  const [valueBrand, setValueBrand] = useState<string>('')
  const [valueModel, setValueModel] = useState<string>('')

  const [valueFuel, setValueFuel] = useState<string>('')
  const [valueBody, setValueBody] = useState<string>('')
  const [valueYear, setValueYear] = useState<string>('')

  const [valueVin, setValueVin] = useState<string>('')
  const [valueDateBuy, setValueDateBuy] = useState(new Date())
  const [valueCurrentMileage, setValueCurrentMileage] = useState(0)
  const [valueBuyMileage, setValueBuyMileage] = useState(0)

  const [valueEngine, setValueEngine] = useState<string>('')
  const [valueGear, setValueGear] = useState('')
  const [valueCapacity, setValueCapacity] = useState<number>(0)

  // ----------------------------------------------------------------------
  const inputDateBuy = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error undefined
    onChange: (event, date) => setValueDateBuy(date)
  })
  // ----------------------button Ok handler-------------------------------
  const handleOkCarInfo = (): void => {
    const carInfo: StateInfo = {
      brand: valueBrand,
      model: valueModel,
      fuel: valueFuel,
      body: valueBody,
      year: valueYear,
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
  // ----------------------------------------------------------------------

  // --------------------DropEffect----------------------------------------
  useEffect(() => {
    setItemsBrand(listBrand())
    console.log('fuel', state.cars[state.numberCar].fuel)
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
    setValueVin(temp.vin)
    setValueDateBuy(new Date(temp.dateBuy))
    setValueBuyMileage(temp.buyMileage)
    setValueCurrentMileage(car[numberCar].currentMiles.currentMileage)
  }, [])

  const isReady = useIsReady()

  if (!isReady) { return <BusyIndicator/> } else {
    return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginVertical: 20 }}>
          <View style={{ flex: 1, paddingRight: 5 }}>
            <Dropdown
              style={styles.dropDownPicker}
              selectedTextStyle={{ color: COLOR_GREEN, paddingHorizontal: 10 }}
              activeColor={'black'}
              itemContainerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
              itemTextStyle={{ color: TEXT_WHITE }}
              inputSearchStyle={{ backgroundColor: 'rgba(61,61,61,1)' }}
              containerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
              data={itemsBrand}
              labelField={'label'}
              valueField={'value'}
              placeholder={'Select Brand'}
              placeholderStyle={{ color: TEXT_WHITE }}
              search
              searchPlaceholder="Search..."
              value={valueBrand}
              onChange={item => {
                setValueBrand(item.value)
                setDisableModel(false)
              }}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 5 }}>
          <Dropdown
            disable={disableModel}
            style={styles.dropDownPicker}
            selectedTextStyle={{ color: COLOR_GREEN, paddingHorizontal: 10 }}
            activeColor={'black'}
            itemContainerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
            itemTextStyle={{ color: TEXT_WHITE }}
            inputSearchStyle={{ backgroundColor: 'rgba(61,61,61,1)' }}
            containerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
            placeholderStyle={disableModel ? { color: 'black' } : { color: TEXT_WHITE }}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
          <View style={{ flex: 2, paddingRight: 5 }}>
            <Dropdown
              style={[styles.dropDownPicker, { paddingVertical: 3 }]}
              selectedTextStyle={{ color: TEXT_WHITE, paddingHorizontal: 5, fontSize: 14 }}
              activeColor={'black'}
              itemContainerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
              itemTextStyle={{ color: TEXT_WHITE }}
              inputSearchStyle={{ backgroundColor: 'rgba(61,61,61,1)' }}
              containerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
              data={itemsFuel}
              labelField={'label'}
              valueField={'value'}
              placeholder={'Топливо'}
              placeholderStyle={{ color: TEXT_WHITE }}
              value={valueFuel}
              onChange={item => {
                setValueFuel(item.value)
              }}
            />
          </View>
          <View style={{ flex: 2, paddingRight: 5 }}>
          <Dropdown
            style={[styles.dropDownPicker, { paddingVertical: 3 }]}
            selectedTextStyle={{ color: TEXT_WHITE, paddingHorizontal: 10, fontSize: 14 }}
            activeColor={'black'}
            itemContainerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
            itemTextStyle={{ color: TEXT_WHITE }}
            inputSearchStyle={{ backgroundColor: 'rgba(61,61,61,1)' }}
            containerStyle={{ backgroundColor: 'rgba(61,61,61,0.55)' }}
            placeholderStyle={disableModel ? { color: 'black' } : { color: TEXT_WHITE }}
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
          <View style={ styles.inputYear}>
          <TextInput
            placeholder={'Year'}
            placeholderTextColor={TEXT_WHITE}
            style={{ color: TEXT_WHITE }}
            keyboardType={'numeric'}
            maxLength={4}
            value={valueYear}
            onChangeText={(value) => setValueYear(String(value))}
          />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <SimpleAccordion
            viewInside={
              <View style={{ height: '100%' }}>
                <View style={styles.viewGroupEngine}>
                  <View style={styles.input}>
                    <Input
                      /* ref={inputSellerName} */
                      placeholder={'тип двигателя'}
                      inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                      errorMessage={'тип двигателя'}
                      errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                      /* onChangeText={(value) => setSellerName(String(value))} */
                    />
                  </View>
                  <View style={styles.input}>
                    <Input
                      /* ref={inputSellerPhone} */
                      placeholder={'трансмиссия'}
                      containerStyle={{ flex: 1 }}
                      inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                      errorMessage={'трансмиссия'}
                      errorStyle={styles.errorInput}
                      /* onChangeText={(value) => setSellerPhone(String(value))} */
                    />
                  </View>
                </View>
                <View style={styles.input}>
                  <Input
                    /* ref={inputSellerLink} */
                    placeholder={'объем двигателя'}
                    multiline={true}
                    containerStyle={{ flex: 1 }}
                    inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                    errorMessage={'объем двигателя, л'}
                    errorStyle={styles.errorInput}
                    /* onChangeText={(value) => setSellerLink(String(value))} */
                  />
                </View>
              </View>
            }
            title={'Двигатель'}
            bannerStyle={{ backgroundColor: BACK_INPUT, height: 30, padding: 5 }}
            titleStyle={{ color: TEXT_WHITE, textAlign: 'center', fontWeight: 'normal', fontSize: 16 }}
            viewContainerStyle={{ backgroundColor: BACK_INPUT }}
          />
          </View>
        <View style={styles.input}>
            <Input
              /* ref={inputSellerLink} */
              placeholder={'VIN код автомобиля'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
              errorMessage={'VIN код автомобиля'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setValueVin(String(value))}
              value={valueVin}
            />
          </View>
          <View style={styles.viewGroupEngine}>
            <View style={[styles.input, { marginRight: 10 }]}>
              <Input
                /* ref={inputSellerName} */
                placeholder={'дата покупки'}
                showSoftInputOnFocus={false}
                inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                errorMessage={'дата покупки'}
                errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                onPressIn={ inputDateBuy }
                value = {valueDateBuy.toLocaleDateString()}
              />
            </View>
            <View style={styles.input}>
              <Input
                /* ref={inputSellerPhone} */
                placeholder={'пробег при покупке'}
                containerStyle={{ flex: 1 }}
                inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                errorMessage={'пробег при покупке'}
                errorStyle={styles.errorInput}
                keyboardType={'numeric'}
                value={String(valueBuyMileage)}
                onChangeText={(value) => setValueBuyMileage(Number(value))}
              />
            </View>
          </View>
          <View style={[styles.input, { width: '50%', alignSelf: 'center' }]}>
            <Input
              /* ref={inputSellerLink} */
              placeholder={'текущий пробег'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
              errorMessage={'текуший пробег'}
              errorStyle={styles.errorInput}
              keyboardType={'numeric'}
              value={String(valueCurrentMileage)}
              onChangeText={(value) => setValueCurrentMileage(Number(value))}
            />
          </View>
        <View style={styles.viewButton}>

          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={{ borderColor: 'red' }}
            titleStyle={{ color: 'red' }}
            title={'Cancel'}
            onPress={() => { navigation.goBack() }}
            type='outline'
          />
          <Button
            containerStyle={styles.buttonStyle}
            buttonStyle={{ borderColor: COLOR_GREEN }}
            titleStyle={{ color: COLOR_GREEN }}
            title={'Finish'}
            type={'outline'}
            onPress={() => { handleOkCarInfo() }}
          />
        </View>
    </ScrollView>

</ImageBackground>

    )
  }
}

export default CarInfoScreen

const styles = StyleSheet.create({

  viewAllInput: {

  },
  dropDownPicker: {
    padding: 10,
    backgroundColor: BACK_INPUT,
    borderWidth: 0,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  viewGroupEngine: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    marginVertical: 5,
    backgroundColor: BACK_INPUT,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },
  inputYear: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: BACK_INPUT,
    borderWidth: 0,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }

})
