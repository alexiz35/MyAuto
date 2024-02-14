import {
  View,
  StyleSheet,
  KeyboardAvoidingView, ScrollView
} from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { StateOther } from '../../../type'
import { OthersList } from './OthersList'
import InputDocComponent from './InputDocComponent'
import { List, ToggleButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { addStateCarReducer, editStateCarReducer } from '../../Redux/CarsSlice'

/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */
const InputDoc = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)

  const { colors } = useAppTheme()
  const nav = useNavigation()

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditOther, setIsEditOther] = useState(false)

  const [itemOther, setItemOther] = useState<StateOther | undefined>()

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const clearInput = (): void => {
    setIsEditOther(false)
    setItemOther(undefined)
  }

  // --------------------------Hide tabBottom when openAccordion-----------------
  useEffect(() => {
    if (openAccordion) nav.setOptions({ tabBarStyle: { display: 'none', backgroundColor: colors.background } })
    else nav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: colors.background } })
  }, [openAccordion])
  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateOther): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditOther(true)
    setItemOther(item)
  }

  const handleOnPress = (): void => {
    if (!openAccordion) {
      setIsList(false)
    } else setTimeout(() => { setIsList(true) }, 100)
    setOpenAccordion(!openAccordion)
    clearInput()
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }
  const handleOk = (dataForm: StateOther): void => {
    setTimeout(() =>
      isEditOther
        ? dispatch(editStateCarReducer({ type: 'others', numberCar: carId, item: dataForm }))
        : dispatch(addStateCarReducer({ type: 'others', numberCar: carId, item: dataForm }))
    , 100)
    handleOnPress()
  }

  return (
    <View style={{ flex: 1 }}>
      {
        /* ----------------------- Form Accordion ----------------------------------- */
      }
      <KeyboardAvoidingView >
        <ScrollView style={{ marginTop: 5 }}>

            <List.Accordion
              title={isEditOther ? 'Редактируйте другие затраты' : 'Добавьте другие затраты'}
              /* description={ state.info.fuel } */
              style={{ backgroundColor: colors.secondaryContainer }}
              /* left={props => <List.Icon {...props} icon="car-cog" />} */
              expanded={openAccordion}
              onPress={handleOnPress}
              >

              <InputDocComponent isCancel={handleCancel} isOk={handleOk} other={itemOther} isEdit={isEditOther}/>

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

          <OthersList handlePress={handleOpen} filterList={dateList}/>

        </View>
      }
      {
        /* -------------------------------------------------------------------------- */
      }

    </View>

  )
}

export default InputDoc

const styles = StyleSheet.create({

  flatList: {
    marginTop: 15,
    height: 400
  }
})
