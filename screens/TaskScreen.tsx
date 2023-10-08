import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { BottomSheet, Overlay, SpeedDial, Text } from '@rneui/themed'
import {
  BACK_INPUT,
  StateOther,
  StatePart, StateService,
  StateServiceTask,
  StateTask
} from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import { RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
/* import { printToFile } from '../components/Print/Print' */
import React, { useCallback, useEffect, useState } from 'react'
import InputPartComponent from '../components/InputDoneScreenComponents/inputPart/InputPartComponent'
import InputDocComponent from '../components/InputDoneScreenComponents/inputDoc/InputDocComponent'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { TasksList } from '../components/TaskScreenComponents/TasksList'
import { addService, addTask, editService, editTask } from '../components/Redux/actions'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import InputServiceTaskComponents from '../oldFiles/InputServiceTaskComponent'
import Spinner from 'react-native-loading-spinner-overlay'
import InputTaskPartScreen from '../oldFiles/InputTaskPartScreen'
import { List, ToggleButton, useTheme } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'
import InputServiceComponent from '../components/InputDoneScreenComponents/inputService/InputServiceComponent'
import { ServicesList } from '../components/InputDoneScreenComponents/inputService/ServicesList'
import InputTaskComponent from '../components/TaskScreenComponents/InputTaskComponent'

type Props = BottomTabScreenProps<RootTabParamList, 'Tasks'>

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

  const clearInput = (): void => {
    setIsEditSTask(false)
    setItemTasks(undefined)
  }

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
    } else setTimeout(() => setIsList(true), 100)
    setOpenAccordion(!openAccordion)
    clearInput()
  }

  // ---------------------------button result-----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  const handleOk = (dataForm: StateTask): void => {
    setTimeout(() =>
      isEditTask
        ? dispatch(editTask(carId, itemTasks?.id, dataForm))
        : dispatch(addTask(carId, dataForm))
    , 100)
    handleOnPress()
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
          <ToggleButton.Row onValueChange={value => setDateList(value)}
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
