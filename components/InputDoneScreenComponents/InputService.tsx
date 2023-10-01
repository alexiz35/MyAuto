import {
  View,
  StyleSheet, KeyboardAvoidingView, ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import {
  BACK_INPUT,
  COLOR_GREEN,
  StatePart,
  ServiceList,
  StateService,
  TEXT,
  TEXT_WHITE,
  ModalPart,
  StateOther
} from '../../type'
import { addOther, addPart, addService, editOther, editService } from '../Redux/actions'
import Accordion from '../Accordion'
import { Tasks } from '../HomeScreenComponents/Tasks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputServiceComponent from '../../CommonComponents/inputService/InputServiceComponent'
import { List, ToggleButton, useTheme } from 'react-native-paper'
import { OthersList } from './OthersList'
import { useNavigation } from '@react-navigation/native'
import InputDocComponent from '../../CommonComponents/InputDocComponent'

/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */
const InputService = (): JSX.Element => {
  const setNewTask = useAppDispatch()
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { colors } = useTheme()
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
  /* const handleOpen = (item: StateService): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditService(true)
    setItemService(item)
  } */

  const handleOnPress = (): void => {
    if (!openAccordion) {
      setIsList(false)
    } else setTimeout(() => setIsList(true), 100)
    setOpenAccordion(!openAccordion)
    console.log('OnPress')
    clearInput()
  }

  // ---------------------------button result-----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  const handleOk = (dataForm: StateService): void => {
    setTimeout(() =>
      isEditService
        ? dispatch(editService(state.numberCar, itemService?.id, dataForm))
        : dispatch(addService(state.numberCar, dataForm))
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
        <ToggleButton.Row onValueChange={value => setDateList(value)}
                          value={dateList}
                          style={{ alignSelf: 'flex-end', marginBottom: 10 }}
        >
          <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 20 }}/>
          <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 20 }}/>
          <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 20 }}/>
        </ToggleButton.Row>

        {/* <OthersList handlePress={handleOpen} filterList={dateList}/> */}

      </View>
    }
    {
      /* -------------------------------------------------------------------------- */
    }

    <View style={{ marginTop: 10, height: '85%' }}>
    {/* {openAccordion
      ? null
      : <Tasks />

    } */}
    </View>
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
