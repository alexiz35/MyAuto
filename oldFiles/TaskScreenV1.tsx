import { ActivityIndicator, View } from 'react-native'
import { BottomSheet, Overlay, SpeedDial, Text } from '@rneui/themed'
import {
  BACK_INPUT,
  StateOther,
  StatePart,
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
import { addTask, editTask } from '../components/Redux/actions'
import { useFocusEffect } from '@react-navigation/native'
import InputServiceTaskComponents from './InputServiceTaskComponent'
import Spinner from 'react-native-loading-spinner-overlay'
import InputTaskPartScreen from './InputTaskPartScreen'
import { useTheme } from 'react-native-paper'
import { useAppTheme } from '../CommonComponents/Theme'

type Props = BottomTabScreenProps<RootTabParamList, 'Tasks'>

const TaskScreen = ({ navigation, route }: Props): JSX.Element => {
  const theme = useAppTheme()
  const listTasks = useAppSelector(state => state.cars[0].tasks)
  const carId = useAppSelector(state => state.numberCar)
  const dispatch = useAppDispatch()
  const [openFab, setOpenFab] = useState(false)
  const [visiblePart, setVisiblePart] = useState(false)
  const [visibleService, setVisibleService] = useState(false)
  const [visibleOther, setVisibleOther] = useState(false)
  const [statePart, setStatePart] = useState<StatePart>()
  const [stateService, setStateService] = useState<StateServiceTask>()
  const [stateOther, setStateOther] = useState<StateOther>()

  const [isEditTask, setIsEditTask] = useState(false)

  const [isActivity, setIsActivity] = useState(false)

  // ----------------------------------- handle pressing FAB -----------------------------
  const pressPartFab = (): void => {
    /* setIsActivity(true) */
    /* setIsEditTask(false) */
    navigation.navigate('CarInfoScreen')
    /* setStatePart(undefined)
    setTimeout(() => {
      setVisiblePart(true)
      setIsActivity(false)
    }, 1) */
    setOpenFab(false)
  }

  const pressServiceFab = (): void => {
    setIsEditTask(false)
    setStateService(undefined)
    setVisibleService(true)
    setOpenFab(false)
  }

  const pressOtherFab = (): void => {
    setIsEditTask(false)
    setStateOther(undefined)
    setVisibleOther(true)
    setOpenFab(false)
  }
  // --------------------------------------------------------------------------------
  // ------------------------- handle modal button ----------------------------------
  const handleOkPart = (resultPart: StatePart): void => {
    setVisiblePart(false)
    const tempOtherPart: StateTask = {
      id: resultPart.id,
      typeTask: 'part',
      name: resultPart.namePart,
      numberPart1: resultPart.numberPart,
      numberPart2: resultPart.numberPart1,
      numberPart3: resultPart.numberPart2,
      dateStartTask: new Date(),
      dateEndTask: resultPart.dateBuy,
      cost: resultPart.costPart,
      quantity: resultPart.quantityPart,
      amount: resultPart.amountCostPart,
      isFinished: false,
      seller: resultPart.seller
    }

    isEditTask
      ? dispatch(editTask(carId, statePart?.id, tempOtherPart))
      : dispatch(addTask(carId, tempOtherPart))
  }
  const handleOkService = (resultService: StateServiceTask): void => {
    setVisibleService(false)
    const tempServiceTask: StateTask = {
      id: resultService.id,
      typeTask: 'service',
      name: resultService.title,
      dateEndTask: resultService.dateService,
      milesEndTask: resultService.milesService,
      amount: resultService.amountCostService,
      isFinished: false,
      seller: resultService.seller
    }

    isEditTask
      ? dispatch(editTask(carId, stateService?.id, tempServiceTask))
      : dispatch(addTask(carId, tempServiceTask))
  }
  const handleOkOther = (resultOther: StateOther): void => {
    setVisibleOther(false)
    const tempOtherTask: StateTask = {
      id: resultOther.id,
      typeTask: 'other',
      name: resultOther.nameOther,
      dateEndTask: resultOther.dateBuy,
      amount: resultOther.amountCostPart,
      isFinished: false,
      seller: resultOther.seller
    }

    isEditTask
      ? dispatch(editTask(carId, stateOther?.id, tempOtherTask))
      : dispatch(addTask(carId, tempOtherTask))
  }
  const handleCancelPart = (): void => {
    setStatePart(undefined)
    setVisiblePart(false)
  }
  const handleCancelService = (): void => {
    setStateService(undefined)
    setVisibleService(false)
  }
  const handleCancelOther = (): void => {
    setStateOther(undefined)
    setVisibleOther(false)
  }

  // ----------------handle click on item List----------------------------------
  const handleClick = (item: StateTask): void => {
    setIsEditTask(true)
    switch (item.typeTask) {
      case 'part':
        setIsActivity(true)
        setStatePart(formPart(item))
        setTimeout(() => {
          setVisiblePart(true)
          setIsActivity(false)
        }, 1)
        break
      case 'service':
        setStateService(formService(item))
        setVisibleService(true)
        break
      case 'other':
        setStateOther(formOther(item))
        setVisibleOther(true)
        break
      default: break
    }
  }

  const formPart = (item: StateTask): StatePart => {
    return {
      id: item.id,
      namePart: item.name,
      numberPart: item.numberPart1 ?? '',
      numberPart1: item.numberPart2,
      numberPart2: item.numberPart3,
      dateBuy: item.dateEndTask,
      costPart: item.cost ?? 0,
      quantityPart: item.quantity ?? 0,
      amountCostPart: item.amount,
      seller: item.seller,
      isInstall: false
    }
  }
  const formService = (item: StateTask): StateServiceTask => {
    return {
      id: item.id,
      title: item.name,
      dateService: item.dateEndTask,
      milesService: item.milesEndTask ?? 0,
      amountCostService: item.amount,
      seller: item.seller
    }
  }
  const formOther = (item: StateTask): StateOther => {
    return {
      id: item.id,
      nameOther: item.name,
      seller: item.seller,
      dateBuy: item.dateEndTask,
      numberPart: item.numberPart1 ?? '',
      amountCostPart: item.amount
    }
  }
  // --------------------------------------------------------------------------------
  /*  useFocusEffect(
    useCallback(() => {
    }, [])) */

  return (
    <>
    <BackgroundView >
      {/* <Dialog isVisible={isActivity} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.success }}/>
      </Dialog> */}
      <Spinner visible={isActivity}
               textContent={'wait...'}
               color={theme.colors.error}
               textStyle={{ color: theme.colors.error }}
               overlayColor={'rgba(0, 0, 0, 0.7)'}
      />

        <View style={{ height: '100%' }}>
         {/*  <Text style={{ textAlign: 'center' }}>Запланируйте</Text> */}
  {
    // ------------------------------ flatTask -------------------------------------------------------
  }
          <View style={{ marginTop: 20 }}>
            {/* <TasksList handlePress={handleClick}/> */}
          </View>
  {
    // ------------------------------ flatTask -------------------------------------------------------
  }
          {/* <BottomSheet isVisible={visiblePart} modalProps={{ animationType: 'slide' }} >
            <BackgroundView>
              <Text style={{ textAlign: 'center' }}>Запланируйте покупку детали</Text>
              <Button title={'ok'} onPress={() => setVisiblePart(false)}/>
              <InputPartComponent isCancel={handleCancelPart} isOk={handleOkPart} part={statePart}/>
            </BackgroundView>
          </BottomSheet> */}
          <BottomSheet isVisible={visiblePart} modalProps={{ animationType: 'slide' }} >
            <BackgroundView>
              <Text style={{ textAlign: 'center' }}>Запланируйте покупку детали</Text>
              {/* <Button title={'ok'} onPress={() => setVisiblePart(false)}/> */}
              <InputPartComponent isCancel={handleCancelPart} isOk={handleOkPart} part={statePart}/>
            </BackgroundView>
          </BottomSheet>

          <Overlay isVisible={visibleService}
                   fullScreen
                   overlayStyle={{ justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.50)' }}
          >
            <BackgroundView>
              <View style={{ margin: 10 }} >
              <Text style={{ textAlign: 'center' }}>Запланируйте service</Text>
              <InputServiceTaskComponents isCancel={handleCancelService} isOk={handleOkService} service={stateService}/>
              </View>
            </BackgroundView>
          </Overlay>

          <Overlay isVisible={visibleOther}
                   fullScreen
                   overlayStyle={{ justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.50)' }}
          >
            <BackgroundView >
              <View style={{ margin: 10 }} >
                <Text style={{ textAlign: 'center' }}>Запланируйте покупку other</Text>
                <InputDocComponent isCancel={handleCancelOther} isOk={handleOkOther} other={stateOther}/>
              </View>
            </BackgroundView>
          </Overlay>

        </View>
      <SpeedDial
        color={theme.colors.secondary}
        placement={'right'}
        icon={{
          type: 'material-community',
          name: 'table-large-plus',
          color: 'white'
        }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpenFab(!openFab)}
        onClose={() => setOpenFab(!openFab)}
        isOpen={openFab}
        overlayColor={BACK_INPUT}
      >
        <SpeedDial.Action
          icon={{ name: 'cog', type: 'material-community', color: '#fff' }}
          title="детали"
          onPress={() => pressPartFab()}
        />
        <SpeedDial.Action
          icon={{ name: 'car-wrench', type: 'material-community', color: '#fff' }}
          title="сервис"
          onPress={() => pressServiceFab()}
        />
        <SpeedDial.Action
          icon={{ name: 'account-cash', type: 'material-community', color: '#fff' }}
          title="другое "
          onPress={() => pressOtherFab()}
        />
      </SpeedDial>
    </BackgroundView>

  </>
  )
}

export default TaskScreen
