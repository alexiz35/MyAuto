import { BackHandler, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { StateTask } from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import { RootTabParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { JSX, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { TasksList } from '../components/TaskScreenComponents/TasksList'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
  Button,
  Dialog,
  List,
  Portal,
  ToggleButton,
  Text,
  Menu,
  IconButton,
  RadioButton
} from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import InputTaskComponent from '../components/TaskScreenComponents/InputTaskComponent'
import { addStateCarReducer, editStateCarReducer } from '../components/Redux/CarsSlice'
import { useTranslation } from 'react-i18next'

type Props = BottomTabScreenProps<RootTabParamList, 'TaskScreen'>

const TaskScreen = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const nav = useNavigation()
  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditTask, setIsEditSTask] = useState(false)

  const [itemTasks, setItemTasks] = useState<StateTask | undefined>()

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')
  const [typeSort, setTypeSort] = useState<'dateSort' | 'mileageSort' | string>('dateSort')
  const [checkFilter, setCheckFilter] = useState<'finish' | 'unFinish' | 'all' | string>('unFinish')
  const [visibleFilter, setVisibleFilter] = useState(false)

  const [isDialog, setIsDialog] = useState(false)
  const [typeTask, setTypeTask] = useState('part')

  const clearInput = (): void => {
    setIsEditSTask(false)
    setItemTasks(undefined)
  }

  // -------------------------- route editable ---------------------------------
  useFocusEffect(useCallback(() => {
    if (route.params !== undefined) {
      if (route.params.editable) {
        setIsEditSTask(true)
        setItemTasks(route.params.itemTask)
        handleOpen(route.params.itemTask)
      }
    }
  }, []))

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
  const handleOpen = (item: StateTask): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditSTask(true)
    setItemTasks(item)
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

  const handleOk = (dataForm: StateTask): void => {
    setTimeout(() => {
      isEditTask
        ? dispatch(editStateCarReducer({ type: 'tasks', numberCar: carId, item: dataForm }))
        : dispatch(addStateCarReducer({ type: 'tasks', numberCar: carId, item: dataForm }))
      if (dataForm.isFinished) {
        setTypeTask(dataForm.typeTask)
        showDialog()
      }
    }
    , 100)
    handleOnPress()
  }

  // ---------------------------------------------------------------------------
  // -----------------------Dialog Functions------------------------------------
  const showDialog = (): void => {
    setIsDialog(true)
  }
  const hideDialog = (): void => {
    setIsDialog(false)
  }
  const okDialog = (): void => {
    setTimeout(() => { hideDialog() }, 100)
    navigation.navigate('InputDoneScreen', { editable: true, typeTask })
  }
  // ---------------------------------------------------------------------------

  const closeMenu = () => {
    setVisibleFilter(false)
  }

  const pressFilter = (value: 'finish' | 'unFinish' | 'all' | string) => {
    setCheckFilter(value)
    closeMenu()
  }

  // --------------------------------------------------------------------------
  return (
    <BackgroundView props={{ flex: 1 }}>

    <View style={{ flex: 1 }}>

      <KeyboardAvoidingView >
        <ScrollView style={{ marginTop: 5 }}>
          <List.Accordion
            title={isEditTask ? t('taskScreen.TITLE_ACCORDION_EDIT') : t('taskScreen.TITLE_ACCORDION_ADD')}
            /* description={ state.info.fuel } */
            style={{ backgroundColor: colors.secondaryContainer }}
            /* left={props => <List.Icon {...props} icon="car-cog" />} */
            expanded={openAccordion}
            onPress={handleOnPress}
          >

            <InputTaskComponent isCancel={handleCancel} isOk={handleOk} task={itemTasks} isEdit={isEditTask}/>

          </List.Accordion>
        </ScrollView>
      </KeyboardAvoidingView>

      {
        /* ----------------------- List Fuel ---------------------------------------- */
      }

      {isList &&
        <View style={styles.flatList}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <View style={{ justifyContent: 'flex-start', paddingLeft: 10 }}>
              <Menu
                anchor={
                  <IconButton icon={'filter-menu'} size={16} style={{ borderWidth: 1, borderRadius: 5, margin: 0 }} onPress={() => { setVisibleFilter(true) }}/>
                }
                visible={visibleFilter}
                anchorPosition={'bottom'}
                statusBarHeight={2}
                onDismiss={() => { closeMenu() }}
              >
                <RadioButton.Group onValueChange={value => { pressFilter(value) }} value={checkFilter} >
                <RadioButton.Item
                  label={t('taskScreen.FILTER_FINISH')}
                  mode={'ios'}
                  position={'leading'}
                  value="finish"
                  labelStyle={{ textAlign: 'left' }}
                  labelVariant={'bodyMedium'}
                  color={colors.tertiary}
                />
                  <RadioButton.Item
                  label={t('taskScreen.FILTER_UNFINISH')}
                  mode={'ios'}
                  position={'leading'}
                  value="unFinish"
                  labelStyle={{ textAlign: 'left' }}
                  labelVariant={'bodyMedium'}
                  color={colors.tertiary}
                />
                  <RadioButton.Item
                  label={t('taskScreen.FILTER_ALL')}
                  mode={'ios'}
                  position={'leading'}
                  value="all"
                  labelStyle={{ textAlign: 'left' }}
                  labelVariant={'bodyMedium'}
                  color={colors.tertiary}
                />
                </RadioButton.Group>

              </Menu>
            </View>
            <ToggleButton.Row onValueChange={value => { setTypeSort(value) }} value={typeSort}>
              <ToggleButton icon="speedometer" value="mileageSort" size={20} style={{ height: 30 }}/>
              <ToggleButton icon="calendar" value="dateSort" size={20} style={{ height: 30 }}/>
            </ToggleButton.Row>
            <ToggleButton.Row onValueChange={value => { setDateList(value) }}
                              value={dateList}
                              style={{ justifyContent: 'flex-end', marginBottom: 10, paddingRight: 10 }}
            >

              <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 30 }}/>
              <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 30 }}/>
              <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 30 }}/>
            </ToggleButton.Row>
          </View>

          <TasksList handlePress={handleOpen} filterList={dateList} checkedFilter={checkFilter} typeSort={typeSort}/>

        </View>
      }
      {
        /* -------------------------------------------------------------------------- */
      }
        <Portal >
          <Dialog visible={isDialog} onDismiss={hideDialog} dismissableBackButton style={{ borderWidth: 1 }}>
              <Dialog.Title>Создать покупку?</Dialog.Title>
              <Dialog.Content>
                <Text>Задача завершена.</Text>
                <Text>Перейти для создания покупки?</Text>
                </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={okDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      {
        /* -------------------------------------------------------------------------- */
      }

    </View>
    </BackgroundView>
  )
}

export default TaskScreen

const styles = StyleSheet.create({

  flatList: {
    marginTop: 15,
    height: 400
  }
})
