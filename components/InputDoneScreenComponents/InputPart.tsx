import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import React, { useEffect, useState } from 'react'
import { StatePart } from '../../type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { addFuel, editFuel } from '../Redux/actions'
import { RootStackParamList, RootTabParamList } from '../Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { FuelList } from '../FuelScreenComponents/FuelList'
import BackgroundView from '../../CommonComponents/BackgroundView'
import {
  useTheme,
  Text,
  Surface,
  TextInput,
  List,
  Button,
  HelperText,
  IconButton,
  Divider,
  SegmentedButtons,
  ToggleButton
} from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps, useNavigation } from '@react-navigation/native'
import { PartsList } from './PartsList'
import InputPartComponent from '../../CommonComponents/InputPartComponent'

/* type Props = NativeStackScreenProps<RootStackParamList, 'FuelScreen'> */
/* type Props = NativeStackScreenProps<RootStackParamList,'I'> */

interface FormPart {
  dateFuel: Date
  mileageFuel: string
  volumeFuel: string
  CostFuel: string
  AmountFuel: string
  StationFuel: string
}

const InputPart = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.cars[state.numberCar])
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useTheme()
  const nav = useNavigation()

  const tempNullPart: FormPart = {
    dateFuel: new Date(),
    mileageFuel: '',
    volumeFuel: '',
    CostFuel: '',
    AmountFuel: '',
    StationFuel: ''
  }

  const dataToForm = (data: StatePart): FormPart => {
    return {
      dateFuel: data.dateFuel,
      mileageFuel: data.mileageFuel === 0 ? '' : String(data.mileageFuel),
      volumeFuel: data.volumeFuel === 0 ? '' : String(data.volumeFuel),
      CostFuel: data.CostFuel === 0 ? '' : String(data.CostFuel),
      AmountFuel: data.AmountFuel === 0 ? '' : String(data.AmountFuel),
      StationFuel: data.StationFuel
    }
  }
  const formToData = (data: FormPart): StatePart => {
    return {
      id: isEditPart ? itemPart?.id : Date.now(),
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
  const [isEditPart, setIsEditPart] = useState(false)
  const [itemPart, setItemPart] = useState<StatePart>(formToData(tempNullPart))
  const [sumPart, setSumPart] = useState(0)

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  // ------------------------- Controller Form-----------------------------------
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setFocus

  } = useForm<FormPart>({ mode: 'onSubmit', defaultValues: tempNullPart, values: dataToForm(itemPart) })

  // ----------------------------------------------------------------------------
  const inputDate = (): void => DateTimePickerAndroid.open({
    value: new Date(),
    // @ts-expect-error date undefined
    onChange: (event, date) => setValue('dateFuel', date)
  })

  const clearInput = (): void => {
    setIsEditPart(false)
    setItemPart(formToData(tempNullPart))
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
    setSumPart(sumFuel)
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
  const handleOpen = (item: StatePart): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditPart(true)
    setItemPart(item)
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

  const handleOk = (dataForm: FormPart): void => {
    setTimeout(() =>
      isEditPart
        ? dispatch(editFuel(carId, itemPart?.id, formToData(dataForm)))
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

        {
/* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView>
        <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={isEditPart ? 'Редактируйте деталь' : 'Добавьте деталь'}
              /* description={ state.info.fuel } */
              style={{ backgroundColor: colors.secondaryContainer }}
              /* left={props => <List.Icon {...props} icon="car-cog" />} */
              expanded={openAccordion}
              onPress={handleOnPress}
            >

              <InputPartComponent isCancel={handleCancel} isOk={handleOk} part={itemPart}/>

            </List.Accordion>
        </ScrollView>
        </KeyboardAvoidingView>
        {
/* ----------------------- List Fuel ---------------------------------------- */
        }

        {/* <SegmentedButtons
          density={'high'}

          style={{ width: '40%', marginTop: 20 }}
          value={dateList} onValueChange={setDateList}
          buttons={[
            { value: 'last', label: 'last' },
            { value: 'service', label: 'service' },
            { value: 'other', label: 'other' }
          ]}
        /> */}

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

            <PartsList handlePress={handleOpen} filterList={dateList}/>

          </View>
        }
        {
/* -------------------------------------------------------------------------- */
        }
      </View>
    </BackgroundView>
  )
}

export default InputPart

const styles = StyleSheet.create({

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 10
    /* marginVertical: 10 */
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
