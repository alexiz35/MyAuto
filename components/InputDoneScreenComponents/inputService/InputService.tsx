import {
  View,
  StyleSheet, KeyboardAvoidingView, ScrollView, BackHandler
} from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { StateService, StateTask } from '../../../type'
import InputServiceComponent from './InputServiceComponent'
import { Banner, Icon, List, Portal, ToggleButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ServicesList } from './ServicesList'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { addStateCarReducer, editStateCarReducer, installPart } from '../../Redux/CarsSlice'
import { useTranslation } from 'react-i18next'

/* type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'> */

const InputService = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const nav = useNavigation()
  const { t } = useTranslation()
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
  useEffect(() => {
    const onBackPress = () => {
      if (openAccordion) {
        handleOnPress()
        return true // Перехватываем событие "назад"
      }
      return false // Позволяем событию "назад" выполняться по умолчанию
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress) }
  }, [openAccordion])
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

  const createTask = (dataForm: StateService | undefined) => {
    if (dataForm !== undefined) {
      const tempTask: StateTask = {
        id: Date.now(),
        typeTask: 'service',
        milesStartTask: dataForm.startKm,
        milesEndTask: dataForm.endKm,
        dateStartTask: dataForm.startDate,
        dateEndTask: dataForm.endData,
        name: dataForm.title === '' ? dataForm.typeService.nameService : dataForm.title,
        isFinished: false,
        amount: dataForm.sumCostService === undefined ? 0 : dataForm.sumCostService,
        seller: {
          id: dataForm.addition?.services?.id,
          name: dataForm.addition?.services?.name === undefined ? '' : dataForm.addition?.services?.name,
          phone: dataForm.addition?.services?.phone,
          web: dataForm.addition?.services?.web
        }
      }
      dispatch(addStateCarReducer({
        type: 'tasks',
        numberCar: carId,
        item: tempTask
      }))
    }
  }

  const handleOk = (dataForm: StateService): void => {
    setDataOkForm(dataForm)
    setTimeout(() =>
      isEditService
        ? dispatch(editStateCarReducer({ type: 'services', numberCar: carId, item: dataForm }))
        : dispatch(addStateCarReducer({ type: 'services', numberCar: carId, item: dataForm }))
    , 100)

    handleOnPress()
    setVisibleBanner(true)
    setTimeout(() => { setVisibleBanner(false) }, 10000)
    /* Alert.alert('Создать задачу?', 'Создать задачу, чтобы запланировать повторное обслуживание?', [
      {
        text: 'Cancel'
      }, {
        text: 'Ok',
        onPress: () => { createTask(dataForm) }
      }
    ]) */
  }

  // ---------------------------------------------------------------------------
  const [visibleBanner, setVisibleBanner] = useState(false)
  const [dataOkForm, setDataOkForm] = useState<StateService>()
  // ---------------------------------------------------------------------------

  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <Banner
          visible={visibleBanner}
          actions={[
            {
              label: t('button.CANCEL'),
              onPress: () => {
                setVisibleBanner(false)
              }
            },
            {
              label: t('button.CREATE'),
              onPress: () => {
                createTask(dataOkForm)
                setVisibleBanner(false)
              }
            }
          ]}
          style={{ borderLeftWidth: 10, borderColor: colors.tertiary }}
          elevation={5}
          icon={() => (<Icon source={'help-rhombus'} size={34} color={colors.tertiary}/>)}
        >
          {t('taskScreen.CREATE_TASK')}
        </Banner>
      </Portal>

    <KeyboardAvoidingView >
      <ScrollView style={{ marginTop: 5 }}>
      <List.Accordion
        title={isEditService ? t('inputService.TITLE_ACCORDION_EDIT') : t('inputService.TITLE_ACCORDION_ADD')}
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
