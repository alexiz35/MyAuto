import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { JSX, useCallback, useEffect, useState } from 'react'
import { brand, getIndexCar, ListService, StateInfo } from '../type'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
import { Dropdown } from 'react-native-element-dropdown'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { BusyIndicator, useIsReady } from '../components/useIsReadyHook'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  TextInput,
  Button,
  Divider,
  Portal,
  Modal,
  Dialog,
  IconButton, Surface,
  RadioButton
} from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import { listServiceEn, listServiceRu } from '../components/InputDoneScreenComponents/inputService/ListServices'
import { RegMaintenance } from '../components/CarInfoScreenComponents/RegMaintenance'
import { editedCarInfo } from '../components/Redux/CarsSlice'
import { useFocusEffect } from '@react-navigation/native'
import { useForm, Controller, useWatch } from 'react-hook-form'
import {
  itemsBody,
  itemsFuel,
  ListCar,
  listModel,
  year
} from '../components/CarInfoScreenComponents/InitialConstants'
import { ModalPickNameCar } from '../components/CarInfoScreenComponents/ModalPickNameCar'
import { useTranslation } from 'react-i18next'

interface FormCarInfo {
  brand: string | TypeValueDrop
  model: string | TypeValueDrop
  fuel: string | TypeValueDrop
  body: string | TypeValueDrop
  year: string | TypeValueDrop
  engine?: string
  fuelTank: string
  gear?: string
  vin?: string
  dateBuy: Date
  buyMileage: string
  currency: string
}
interface TypeValueDrop {
  _index: number
  label: string
  value: string
}

const tempNullCarInfo: FormCarInfo = {
  brand: '',
  model: '',
  fuel: '',
  fuelTank: '',
  body: '',
  year: '',
  engine: '',
  gear: '',
  vin: '',
  dateBuy: new Date(),
  buyMileage: '',
  currency: '$'
}

type Props = NativeStackScreenProps<RootStackParamList, 'CarInfoScreen'>

const CarInfoScreen = ({ navigation }: Props): JSX.Element => {
  const setCar = useAppDispatch()
  const numberCar = useAppSelector((state) => state.numberCar)
  const car = useAppSelector((state) => state.cars)
  const [indexCar, setIndexCar] = useState<number>(getIndexCar(car, numberCar))
  const [isSave, setIsSave] = useState<boolean>(false)
  const { colors } = useAppTheme()
  const { t, i18n } = useTranslation()

  // ------------------------ Alert ConfirmAction -------------------------------

  const formToData = (item: FormCarInfo): StateInfo => {
    return {
      nameCar: valueNameCar,
      brand: typeof item.brand === 'string' ? item.brand : item.brand.value,
      model: typeof item.model === 'string' ? item.model : item.model.value,
      fuel: typeof item.fuel === 'string' ? item.fuel : item.fuel.value,
      body: typeof item.body === 'string' ? item.body : item.body.value,
      year: typeof item.year === 'string' ? item.year : item.year.value,
      fuelTank: Number(item.fuelTank),
      engine: item.engine,
      gear: item.gear,
      vin: item.vin,
      dateBuy: item.dateBuy,
      buyMileage: Number(item.buyMileage),
      regMaintenance,
      currency: item.currency
    }
  }
  const dataToForm = (item: StateInfo): FormCarInfo => {
    return {
      brand: item.brand,
      model: item.model,
      fuel: item.fuel,
      fuelTank: item.fuelTank === 0 ? '' : String(item.fuelTank),
      body: item.body,
      year: item.year,
      engine: item.engine,
      gear: item.gear,
      vin: item.vin,
      dateBuy: item.dateBuy,
      buyMileage: item.buyMileage === 0 ? '' : String(item.buyMileage),
      currency: item.currency
    }
  }
  const [itemCarInfo, setItemCarInfo] = useState<StateInfo>(
    formToData(tempNullCarInfo)
  )

  // --------------------- Modal RegMaintenance --------------------------------
  const [itemsModel, setItemsModel] = useState<ListCar[]>([])
  const [regMaintenance, setRegMaintenance] = useState<ListService[]>(
    car[indexCar].info.regMaintenance === undefined
      ? i18n.language === 'ru' ? listServiceRu : listServiceEn
      : car[indexCar].info.regMaintenance
  )

  // --------------------------- Modal Currency --------------------------------
  const [visibleCurrency, setVisibleCurrency] = useState(false)

  // ------------------ Dialog Input NameCar -----------------------------------
  const [visibleNameCar, setVisibleNameCar] = useState(false)
  const [valueNameCar, setValueNameCar] = useState(car[indexCar].info.nameCar)

  const okDialogNameCar = (dialogNameCar: string): void => {
    setValueNameCar(dialogNameCar)
    setVisibleNameCar(false)
  }
  const cancelDialogNameCar = (): void => {
    setVisibleNameCar(false)
  }
  // ---------------------------------------------------------------------------
  const inputDateBuy = (): void => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, date = new Date()) => { setValue('dateBuy', date) }
    })
  }
  // ----------------------button's handler-------------------------------
  const handleOkCarInfo = (dataForm: FormCarInfo): void => {
    if (valueNameCar === '' || valueNameCar === undefined) {
      setVisibleNameCar(true)
      return
    }

    setIsSave(true)

    setCar(
      editedCarInfo({
        numberCar,
        carInfo: formToData(dataForm)
      })
    )
    navigation.goBack()
  }

  const handleClose = () => {
    setIsSave(false)
    navigation.goBack()
  }

  // ------------------------- Controller Form-----------------------------------
  const {
    control,
    handleSubmit,
    setValue,
    getValues
  } = useForm<FormCarInfo>({
    mode: 'onChange',
    defaultValues: tempNullCarInfo,
    values: dataToForm(itemCarInfo)
  })

  // ----------------------------------------------------------------------------
  const watchBrand = useWatch({
    control,
    name: 'brand'
  })
  // --------------------Update IndexCar------------------------------------
  useEffect(() => {
    setIndexCar(getIndexCar(car, numberCar))
  }, [numberCar])
  // ---------------------Pick Service-----------------------------------
  const [visibleModalService, setVisibleModalService] = useState(false)

  const okModalMaintenance = (listMaintenance: ListService[]): void => {
    setVisibleModalService(false)
    setRegMaintenance(listMaintenance)
  }
  const cancelModalMaintenance = (): void => {
    setVisibleModalService(false)
  }

  // --------------------DropEffect----------------------------------------

  useEffect(() => {
    // @ts-expect-error error value
    setItemsModel(listModel(getValues('brand').value ?? ''))
  }, [watchBrand])
  useEffect(() => {
    navigation.setOptions({
      title: valueNameCar
    })
  }, [valueNameCar])

  // --------------------InitialStateScreen-------------------------------------
  useFocusEffect(
    useCallback(() => {
      if (
        car[indexCar].info.nameCar === '' ||
        car[indexCar].info.nameCar === undefined
      ) { setVisibleNameCar(true) }

      navigation.setOptions({
        title: valueNameCar,
        headerRight: () => (

          <IconButton
            icon={'car-info'}
            mode={'outlined'}
            style={{ borderRadius: 10 }}
            onPress={() => { setVisibleNameCar(true) }}
          />

        )
      })
      const temp = car[indexCar].info
      setItemCarInfo(temp)
    }, [])
  )
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (isSave) return
        // Prevent default behavior of leaving the screen
        e.preventDefault()
        // Prompt the user before leaving the screen

        Alert.alert(t('carInfo.alert.TITLE'), t('carInfo.alert.MESSAGE'), [
          {
            text: 'Cancel',
            // ***
            /* onPress: () => console.log('Cancel Pressed'), */
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => { navigation.dispatch(e.data.action) }
          }
        ])
      }),
    [navigation, isSave]
  )

  const isReady = useIsReady()

  if (!isReady) {
    return <BusyIndicator />
  } else {
    return (
      <BackgroundView style={{ height: '100%' }}>
        <ScrollView
          nestedScrollEnabled={true}
          style={{
            paddingHorizontal: 10,
            height: '100%'
          }}
        >
          <View style={styles.row}>
              <Surface elevation={2} style={{ flex: 1 }} >
              <Controller
                name={'brand'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={[styles.dropDown, { backgroundColor: colors.surface }]}

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
                    data={brand}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={t('carInfo.BRAND')}
                    placeholderStyle={{ color: colors.onBackground }}
                    search
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
              <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'model'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    /* disable={disableModel} */
                    style={[styles.dropDown, { backgroundColor: colors.surface }]}

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
                    /* placeholderStyle={disableModel ? { color: 'black' } : { color: TEXT_WHITE }} */
                    placeholderStyle={{ color: colors.onBackground }}
                    data={itemsModel}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={t('carInfo.MODEL')}
                    search
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
          </View>
          <View style={styles.row}>
              <Surface elevation={2} style={{ flex: 1 }} >
              <Controller
                name={'body'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={[styles.dropDown, { backgroundColor: colors.surface }]}

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
                    placeholder={t('carInfo.BODY')}
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
              <Surface elevation={2} style={{ flex: 1 }} >
              <Controller
                name={'year'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={[styles.dropDown, { backgroundColor: colors.surface }]}
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
                    data={year}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={t('carInfo.Year')}
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
          </View>
          <View style={styles.row}>
            <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'fuel'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={[styles.dropDown, { height: 52, backgroundColor: colors.surface }]}

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
                    placeholder={t('carInfo.FUEL')}
                    placeholderStyle={{ color: colors.onBackground }}
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
            </Surface>
            <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'fuelTank'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode={'flat'}
                      dense
                      keyboardType={'numeric'}
                      right={<TextInput.Affix text= {t('L')}/>}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      label={t('FUEL_TANK')}
                      value={value}
                      onChangeText={(value) => { onChange(value) }}
                    />
                  </>
                )}
              />
            </Surface>
          </View>
          <View style={styles.row}>
            <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'engine'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode={'flat'}
                      dense
                      /* ref={inputSellerName} */
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      label={t('carInfo.ENGINE')}
                      value={value}
                      onChangeText={(value) => { onChange(value) }}
                    />
                  </>
                )}
              />
            </Surface>
            <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'gear'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode={'flat'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      dense
                      /* ref={inputSellerPhone} */
                      label={t('carInfo.GEAR')}
                      value={value}
                      onChangeText={(value) => { onChange(value) }}
                    />
                  </>
                )}
              />
              </Surface>
          </View>
          <View style={styles.input}>
            <Surface elevation={2} >
            <Controller
              name={'vin'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    mode={'flat'}
                    style={{ flex: 1, backgroundColor: colors.surface }}
                    dense
                    /* ref={inputSellerLink} */
                    label={t('carInfo.VIN')}
                    onChangeText={(value) => { onChange(value) }}
                    value={value}
                  />
                </>
              )}
            />
            </Surface>
          </View>
          <View style={styles.row}>
            <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'dateBuy'}
                control={control}
                render={({ field: { value, ref } }) => (
                  <>
                    <TextInput
                      mode={'flat'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      dense
                      ref={ref}
                      showSoftInputOnFocus={false}
                      label={t('carInfo.DATE_BUY')}
                      onPressIn={inputDateBuy}
                      value={new Date(value).toLocaleDateString()}
                    />
                  </>
                )}
              />
            </Surface>
            <Surface elevation={2} style={{ flex: 1 }}>
              <Controller
                name={'buyMileage'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode={'flat'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      dense
                      right={<TextInput.Affix text= {t('KM')}/>}
                      label={t('carInfo.MILEAGE_BUY')}
                      keyboardType={'numeric'}
                      value={value}
                      onChangeText={(value) => { onChange(value) }}
                    />
                  </>
                )}
              />
            </Surface>
          </View>
          <Divider
            horizontalInset
            bold
            style={{
              marginTop: 12,
              marginBottom: 6
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 5,
              columnGap: 8
            }}
          >
            <Button
              mode={'elevated'}
              elevation={5}
              style={{
                justifyContent: 'center',
                borderRadius: 5,
                flex: 10
              }}
              onPress={() => { setVisibleModalService(true) }}
            >
              {t('carInfo.BUTTON_TO')}
            </Button>
            {/* <Button
              icon={'restore'}
              mode={'elevated'}
              elevation={5}
              style={{
                justifyContent: 'center',
                borderRadius: 5,
                height: 45,
                marginRight: 2,
                flex: 2
              }}
              onPress={() => { setRegMaintenance(i18n.language === 'ru' ? listServiceRu : listServiceEn) }}
            >
              {t('carInfo.RESET_TO')}
            </Button> */}
            <Button
              /* icon={'restore'} */
              mode={'elevated'}
              elevation={5}
              style={{
                justifyContent: 'center',
                borderRadius: 5,
                height: 45,
                marginRight: 2,
                flex: 5
              }}
              onPress={() => { setVisibleCurrency(true) }}
            >
              { t('carInfo.BUTTON_CURRENCY', { currency: getValues('currency') }) }
            </Button>
          </View>
          <Divider
            horizontalInset
            bold
            style={{
              marginTop: 8,
              marginBottom: 6
            }}
          />
          <View style={styles.viewButton}>
            <Button
              icon={'close-thick'}
              onPress={handleClose}
              mode="outlined"
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
              onPress={handleSubmit(handleOkCarInfo)}
            >
              Ok
            </Button>
          </View>
        </ScrollView>

        {
          // -------------------------- Modal for selecting type of service ---------------------------
        }
        <Portal>
          <Modal
            visible={visibleModalService}
            onDismiss={() => { setVisibleModalService(false) }}
            dismissableBackButton
            contentContainerStyle={{
              marginHorizontal: 20,
              backgroundColor: colors.background,
              borderRadius: 5,
              padding: 3
            }}
          >
            <RegMaintenance
              listMaintenance={regMaintenance}
              okPress={okModalMaintenance}
              cancelPress={cancelModalMaintenance}
            />
          </Modal>
        </Portal>
        {
          // -------------------------------------------------------------------------------------------
        }
        {
          // -------------------------- Modal for selecting name of car ---------------------------
        }
        <Portal>
          <Dialog
            visible={visibleNameCar}
            dismissableBackButton
            onDismiss={cancelModalMaintenance}
          >
            <ModalPickNameCar mode={'editCar'} handlePressOk={okDialogNameCar} handlePressCancel={cancelDialogNameCar}/>
          </Dialog>
        </Portal>
        {
          // -------------------------- Modal for Currency ---------------------------
        }
        <Controller
          name={'currency'}
          control={control}
          render={({ field: { onChange, value } }) => (
        <Portal>
          <Dialog
            visible={visibleCurrency}
            dismissableBackButton
            onDismiss={() => { setVisibleCurrency(false) }}
          >
            <Dialog.Title>
              Выберите валюту
            </Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={value => {
                  onChange(value)
                  setVisibleCurrency(false)
                }}
                value ={value}
              >
                <RadioButton.Item label="USD - $" value="$" />
                <RadioButton.Item label="UAH - ₴" value="₴" />
                <RadioButton.Item label="EUR - €" value="€" />
                <RadioButton.Item label="RUB - ₽" value="₽" />
                <RadioButton.Item label="PLN - Zł" value="Zł" />
              </RadioButton.Group>
            </Dialog.Content>

          </Dialog>
        </Portal>
          )}
            />
        {
          // -------------------------------------------------------------------------------------------
        }
      </BackgroundView>
    )
  }
}

export default CarInfoScreen

// ----------------------- Styles function ------------------------------
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    columnGap: 7
  },
  dropDown: {
    padding: 5,
    paddingLeft: 16,
    borderRadius: 5
  },
  input: {
    marginTop: 12,
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
    marginTop: 20,
    columnGap: 25
  },
  buttonStyle: {
    flex: 1
  }
})
