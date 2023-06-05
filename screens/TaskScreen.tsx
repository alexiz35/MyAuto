import { ImageBackground, Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { Button, CheckBox, Dialog, Divider, FAB, Overlay, SpeedDial, Text, useTheme } from '@rneui/themed'
import {
  BACK_INPUT,
  BACK_OPACITY,
  COLOR_GREEN,
  StateOther,
  StatePart,
  StateService,
  StateTask,
  TEXT_WHITE
} from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import InputPart from '../components/InputDoneScreenComponents/InputPart'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { printToFile } from '../components/Print/Print'
import React, { useCallback, useEffect, useState } from 'react'
import InputPartComponent from '../CommonComponents/InputPartComponent'
import InputDocComponent from '../CommonComponents/InputDocComponent'
import InputServiceComponent from '../CommonComponents/InputServiceComponent'
import { PartsList } from '../components/InputDoneScreenComponents/PartsList'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { TasksList } from '../components/TaskScreenComponents/TasksList'
import { addOther, addTask, editOther } from '../components/Redux/actions'
import { useFocusEffect } from '@react-navigation/native'

type Props = BottomTabScreenProps<RootTabParamList, 'Tasks'>

const TaskScreen = ({ navigation, route }: Props): JSX.Element => {
  const { theme } = useTheme()
  const listTasks = useAppSelector(state => state.cars[0].tasks)
  const carId = useAppSelector(state => state.numberCar)
  const dispatch = useAppDispatch()
  const [openFab, setOpenFab] = useState(false)
  const [visiblePart, setVisiblePart] = useState(false)
  const [visibleService, setVisibleService] = useState(false)
  const [visibleOther, setVisibleOther] = useState(false)
  const [statePart, setStatePart] = useState<StatePart>()
  const [stateService, setStateService] = useState<StateService>()
  const [stateOther, setStateOther] = useState<StateOther>()

  // ----------------------------------- handle pressing FAB -----------------------------
  const pressPartFab = (): void => {
    setVisiblePart(true)
    setOpenFab(false)
  }

  const pressServiceFab = (): void => {
    setVisibleService(true)
    setOpenFab(false)
  }

  const pressOtherFab = (): void => {
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

    /* isEditPart
      ? dispatch(editOther(state.numberCar, itemOther?.id, tempNewOther))
      : */
    dispatch(addTask(carId, tempOtherPart))
    console.log('resultPart', resultPart)
  }
  const handleOkService = (resultService: StateService): void => {
    setVisiblePart(false)
    console.log('result', resultService)
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

    /* isEditPart
      ? dispatch(editOther(state.numberCar, itemOther?.id, tempNewOther))
      : */
    dispatch(addTask(carId, tempOtherTask))
    console.log('result', resultOther)
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
  // --------------------------------------------------------------------------------
  const handleClick = (item: StateTask): void => {
    switch (item.typeTask) {
      case 'part':
        setStatePart(formPart(item))
        setVisiblePart(true)
        break
      case 'service':
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
      numberPart: item.numberPart1,
      numberPart1: item.numberPart2,
      numberPart2: item.numberPart3,
      dateBuy: item.dateEndTask,
      costPart: item.cost,
      quantityPart: item.quantity,
      amountCostPart: item.amount,
      seller: item.seller,
      isInstall: false
    }
  }
  /* const formService = (item:StateTask):StateService => {
    return {
      id: item.id,
      title: item.name,
      endData: item.dateEndTask,

    }

  } */
  const formOther = (item: StateTask): StateOther => {
    return {
      id: item.id,
      nameOther: item.name,
      seller: item.seller,
      dateBuy: item.dateEndTask,
      numberPart: item.numberPart1,
      amountCostPart: item.amount
    }
  }
  // --------------------------------------------------------------------------------
  useFocusEffect(
    useCallback(() => {
      console.log('Res', listTasks)
    }, []))

  return (
    <>
    <BackgroundView >

        <View style={{ height: '100%' }}>
         {/*  <Text style={{ textAlign: 'center' }}>Запланируйте</Text> */}
  {
    // ------------------------------ flatTask -------------------------------------------------------
  }
          <View style={{ marginTop: 20 }}>
            <TasksList handlePress={handleClick}/>
          </View>
  {
    // ------------------------------ flatTask -------------------------------------------------------
  }
          <Dialog isVisible={visiblePart} overlayStyle={{ width: '100%', backgroundColor: BACK_OPACITY }}>
            <BackgroundView>
              <Text style={{ textAlign: 'center' }}>Запланируйте покупку детали</Text>
              <InputPartComponent isCancel={handleCancelPart} isOk={handleOkPart} part={statePart}/>
            </BackgroundView>
          </Dialog>

          <Overlay isVisible={visibleService}
                   fullScreen
                   overlayStyle={{ justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.50)' }}
          >
            <BackgroundView>
              <View style={{ margin: 10 }} >
              <Text style={{ textAlign: 'center' }}>Запланируйте service</Text>
              <InputServiceComponent isCancel={handleCancelService} isOk={handleOkService}/>
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
