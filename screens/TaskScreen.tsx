import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { StateTask } from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import { RootTabParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { TasksList } from '../components/TaskScreenComponents/TasksList'
import { useNavigation } from '@react-navigation/native'
import { Button, Dialog, List, Portal, ToggleButton, Text } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import InputTaskComponent from '../components/TaskScreenComponents/InputTaskComponent'
import { addStateCarReducer, editStateCarReducer } from '../components/Redux/CarsSlice'

type Props = BottomTabScreenProps<RootTabParamList, 'TaskScreen'>

const TaskScreen = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const nav = useNavigation()
  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditTask, setIsEditSTask] = useState(false)

  const [itemTasks, setItemTasks] = useState<StateTask | undefined>()

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const [isDialog, setIsDialog] = useState(false)
  const [typeTask, setTypeTask] = useState('part')

  const clearInput = (): void => {
    setIsEditSTask(false)
    setItemTasks(undefined)
  }

  // -------------------------- route editable ---------------------------------
  useEffect(() => {
    if (route.params !== undefined) {
      if (route.params.editable) {
        setIsEditSTask(true)
        setItemTasks(route.params.itemTask)
        handleOpen(route.params.itemTask)
      }
    }
  }, [])

  // --------------------------Hide tabBottom when openAccordion-----------------
  useEffect(() => {
    if (openAccordion) nav.setOptions({ tabBarStyle: { display: 'none', backgroundColor: colors.background } })
    else nav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: colors.background } })
  }, [openAccordion])

  // ------------------------- control according -------------------------------
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

  return (
    <BackgroundView props={{ flex: 1 }}>

    <View style={{ flex: 1 }}>

      <KeyboardAvoidingView >
        <ScrollView style={{ marginTop: 5 }}>
          <List.Accordion
            title={isEditTask ? 'Редактируйте задачу' : 'Добавьте задачу'}
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
          <ToggleButton.Row onValueChange={value => { setDateList(value) }}
                            value={dateList}
                            style={{ alignSelf: 'flex-end', marginBottom: 10 }}
          >
            <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 20 }}/>
            <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 20 }}/>
            <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 20 }}/>
          </ToggleButton.Row>

          <TasksList handlePress={handleOpen} filterList={dateList}/>

        </View>
      }
      {
        /* -------------------------------------------------------------------------- */
      }
        <Portal >
          <Dialog visible={isDialog} onDismiss={hideDialog} dismissableBackButton style={{ borderWidth: 1 }}>
              <Dialog.Title>Hello</Dialog.Title>
              <Dialog.Content>
                <Text>Задача завершена.</Text>
                <Text> Создать покупку?</Text>
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
