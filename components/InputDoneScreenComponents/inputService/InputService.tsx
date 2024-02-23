import {
  View,
  StyleSheet, KeyboardAvoidingView, ScrollView
} from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { StateService } from '../../../type'
import { addService, editService } from '../../../oldFiles/actions'
import InputServiceComponent from './InputServiceComponent'
import { List, ToggleButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ServicesList } from './ServicesList'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { addStateCarReducer, editStateCarReducer } from '../../Redux/CarsSlice'

/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */

const InputService = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const nav = useNavigation()
  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditService, setIsEditService] = useState(false)

  const [itemService, setItemService] = useState<StateService | undefined>()

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const clearInput = (): void => {
    setIsEditService(false)
    setItemService(undefined)
  }

  // --------------------------Hide tabBottom when openAccordion-----------------
  useEffect(() => {
    if (openAccordion) nav.setOptions({ tabBarStyle: { display: 'none', backgroundColor: colors.background } })
    else nav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: colors.background } })
  }, [openAccordion])

  // ------------------------- control according -------------------------------
  const handleOpen = (item: StateService): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditService(true)
    setItemService(item)
  }

  const handleOnPress = (): void => {
    if (!openAccordion) {
      setIsList(false)
    } else setTimeout(() => { setIsList(true) }, 100)
    setOpenAccordion(!openAccordion)
    clearInput()
  }

  // ---------------------------button result-----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  const handleOk = (dataForm: StateService): void => {
    setTimeout(() =>
      isEditService
        ? dispatch(editStateCarReducer({ type: 'services', numberCar: carId, item: dataForm }))
        : dispatch(addStateCarReducer({ type: 'services', numberCar: carId, item: dataForm }))
    , 100)
    handleOnPress()
  }

  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------

  return (
    <View style={{ flex: 1 }}>

    <KeyboardAvoidingView >
      <ScrollView style={{ marginTop: 5 }}>
      <List.Accordion
        title={isEditService ? 'Редактируйте сервис' : 'Добавьте сервис'}
        /* description={ state.info.fuel } */
        style={{ backgroundColor: colors.secondaryContainer }}
        /* left={props => <List.Icon {...props} icon="car-cog" />} */
        expanded={openAccordion}
        onPress={handleOnPress}
      >

        <InputServiceComponent isCancel={handleCancel} isOk={handleOk} service={itemService} isEdit={isEditService}/>

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

        <ServicesList handlePress={handleOpen} filterList={dateList}/>

      </View>
    }
    {
      /* -------------------------------------------------------------------------- */
    }

  </View>
  )
}

export default InputService

const styles = StyleSheet.create({

  flatList: {
    marginTop: 15,
    height: 400
  }
})
