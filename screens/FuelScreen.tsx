import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { JSX, useCallback, useState } from 'react'
import { getIndexCar, type StateFuel } from '../type'
import { type RootStackParamList, type RootTabParamList } from '../components/Navigation/TypeNavigation'
import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { FuelList } from '../components/FuelScreenComponents/FuelList'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  Text,
  List,
  IconButton,
  ToggleButton
} from 'react-native-paper'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type CompositeScreenProps, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAppTheme } from '../CommonComponents/Theme'
import {
  addStateCarReducer,
  editStateCarReducer
} from '../components/Redux/CarsSlice'
import { useTranslation } from 'react-i18next'
import { FuelInput } from '../components/FuelScreenComponents/FuelInput'

/* type Props = NativeStackScreenProps<RootStackParamList, 'FuelScreen'> */
type Props = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'StatScreen'>, NativeStackScreenProps<RootStackParamList, 'FuelScreen'>>

export const FuelScreen = (/* { navigation, route }: Props */): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const navigation = useNavigation<Props>()
  const { t } = useTranslation()

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditFuel, setIsEditFuel] = useState(false)
  const [itemFuel, setItemFuel] = useState<StateFuel | undefined>()
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

  const clearInput = (): void => {
    setIsEditFuel(false)
    setItemFuel(undefined)
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

  const handleOk = (dataForm: StateFuel): void => {
    setTimeout(() =>
      isEditFuel
        ? dispatch(editStateCarReducer({ type: 'fuel', numberCar: carId, item: dataForm }))
        : dispatch(addStateCarReducer({ type: 'fuel', numberCar: carId, item: dataForm }))
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
               {`${t('fuelScreen.TITLE_SUM_FUEL')}${sumFuel} ${t('L')}` }
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

                <FuelInput isCancel={handleCancel} isOk={handleOk} isEdit={isEditFuel} fuel={itemFuel}/>

            </List.Accordion>
        </ScrollView>
        </KeyboardAvoidingView>
        {
/* ----------------------- List Fuel ---------------------------------------- */
        }
        {isList &&
          <View style={styles.flatList} >
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
    height: 420
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
