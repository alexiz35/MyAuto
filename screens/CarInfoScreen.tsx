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
  IconButton, Surface
} from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import { listService } from '../components/InputDoneScreenComponents/inputService/ListServices'
import { RegMaintenance } from '../components/HomeScreenComponents/RegMaintenance'
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

interface FormCarInfo {
  brand: string | TypeValueDrop
  model: string | TypeValueDrop
  fuel: string | TypeValueDrop
  body: string | TypeValueDrop
  year: string | TypeValueDrop
  engine?: string
  capacity?: string
  gear?: string
  vin?: string
  dateBuy: Date
  buyMileage: string
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
  body: '',
  year: '',
  engine: '',
  gear: '',
  vin: '',
  dateBuy: new Date(),
  buyMileage: ''
}

type Props = NativeStackScreenProps<RootStackParamList, 'CarInfoScreen'>

const CarInfoScreen = ({ navigation }: Props): JSX.Element => {
  const setCar = useAppDispatch()
  const numberCar = useAppSelector((state) => state.numberCar)
  const car = useAppSelector((state) => state.cars)
  const [indexCar, setIndexCar] = useState<number>(getIndexCar(car, numberCar))
  const [isSave, setIsSave] = useState<boolean>(false)
  const { colors } = useAppTheme()

  // ------------------------ Alert ConfirmAction -------------------------------

  const formToData = (item: FormCarInfo): StateInfo => {
    return {
      nameCar: valueNameCar,
      brand: typeof item.brand === 'string' ? item.brand : item.brand.value,
      model: typeof item.model === 'string' ? item.model : item.model.value,
      fuel: typeof item.fuel === 'string' ? item.fuel : item.fuel.value,
      body: typeof item.body === 'string' ? item.body : item.body.value,
      year: typeof item.year === 'string' ? item.year : item.year.value,
      engine: item.engine,
      gear: item.gear,
      vin: item.vin,
      dateBuy: item.dateBuy,
      buyMileage: Number(item.buyMileage),
      regMaintenance
    }
  }
  const dataToForm = (item: StateInfo): FormCarInfo => {
    return {
      brand: item.brand,
      model: item.model,
      fuel: item.fuel,
      body: item.body,
      year: item.year,
      engine: item.engine,
      gear: item.gear,
      vin: item.vin,
      dateBuy: item.dateBuy,
      buyMileage: item.buyMileage === 0 ? '' : String(item.buyMileage)
    }
  }
  const [itemCarInfo, setItemCarInfo] = useState<StateInfo>(
    formToData(tempNullCarInfo)
  )

  // --------------------- Modal RegMaintenance --------------------------------
  const [itemsModel, setItemsModel] = useState<ListCar[]>([])
  const [regMaintenance, setRegMaintenance] = useState<ListService[]>(
    car[indexCar].info.regMaintenance === undefined
      ? listService
      : car[indexCar].info.regMaintenance
  )

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
  const { control, handleSubmit, setValue, getValues } = useForm<FormCarInfo>({
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

        Alert.alert('Покинуть страницу?', 'Введенные данные не сохранятся', [
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
          <View style={styles.row1}>
            <View style={{ flex: 1 }}>
              <Surface elevation={2} >
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
                    placeholder={'Select Brand'}
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
            </View>
            <View style={{ flex: 1 }}>
              <Surface elevation={2} >
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
                    placeholder={'Select Model'}
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
          </View>
          <View style={styles.row2}>
            <View style={{ flex: 1 }}>
              <Surface elevation={2} >
              <Controller
                name={'fuel'}
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
                    data={itemsFuel}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder={'Топливо'}
                    placeholderStyle={{ color: colors.onBackground }}
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
            </View>
            <View style={{ flex: 1 }}>
              <Surface elevation={2} >
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
                    placeholder={'Тип'}
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
            </View>
            <View style={{ flex: 1 }}>
              <Surface elevation={2} >
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
                    placeholder={'Year'}
                    value={value}
                    onChange={(value) => {
                      onChange(value)
                    }}
                  />
                )}
              />
              </Surface>
            </View>
          </View>
          <View style={styles.row3}>
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
                      placeholder={'тип двигателя'}
                      label={'тип двигателя'}
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
                      label={'трансмиссия'}
                      placeholder={'трансмиссия'}
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
                    placeholder={'VIN код автомобиля'}
                    label={'VIN код автомобиля'}
                    onChangeText={(value) => { onChange(value) }}
                    value={value}
                  />
                </>
              )}
            />
            </Surface>
          </View>
          <View style={styles.viewGroupEngine}>
            <Surface elevation={2} style={styles.input}>
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
                      placeholder={'дата покупки'}
                      showSoftInputOnFocus={false}
                      label={'дата покупки'}
                      onPressIn={inputDateBuy}
                      value={new Date(value).toLocaleDateString()}
                    />
                  </>
                )}
              />
            </Surface>
            <Surface elevation={2} style={styles.input}>
              <Controller
                name={'buyMileage'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode={'flat'}
                      style={{ flex: 1, backgroundColor: colors.surface }}
                      dense
                      /* ref={inputSellerPhone} */
                      placeholder={'пробег при покупке'}
                      label={'пробег при покупке'}
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
              marginTop: 8,
              marginBottom: 6
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 5,
              columnGap: 10
            }}
          >
            <Button
              mode={'elevated'}
              elevation={5}
              style={{
                borderRadius: 5,
                /* backgroundColor: colors.surface, */
                flex: 1
              }}
              onPress={() => { setVisibleModalService(true) }}
            >
              Регламент ТО
            </Button>
            <Button
              icon={'restore'}
              mode={'elevated'}
              style={{
                borderRadius: 5,
                height: 45,
                /* backgroundColor: colors.surface, */
                flex: 1
              }}
              onPress={() => { setRegMaintenance(listService) }}
            >
              Сброс ТО
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
              /* onPress={() => { navigation.goBack() }} */
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
          // -------------------------------------------------------------------------------------------
        }
      </BackgroundView>
    )
  }
}

export default CarInfoScreen

// ----------------------- Styles function ------------------------------
const styles = StyleSheet.create({
  viewAllInput: {},
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
    marginBottom: 5
  },
  dropDown: {
    padding: 5,
    /* borderWidth: 1, */
    /* borderColor: colors.outline, */
    borderRadius: 5
    /* backgroundColor: colors.surface */
  },
  viewGroupEngine: {
    flexDirection: 'row',
    columnGap: 7,
    justifyContent: 'space-around'
  },
  input: {
    marginVertical: 7,
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
    marginTop: 20,
    columnGap: 25
  },
  buttonStyle: {
    flex: 1
    /* marginHorizontal: 10 */
  }
})
