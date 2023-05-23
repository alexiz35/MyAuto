import { ImageBackground, Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { Button, CheckBox, Dialog, Divider, FAB, Overlay, SpeedDial, Text, useTheme } from '@rneui/themed'
import { BACK_INPUT, BACK_OPACITY, COLOR_GREEN, StateOther, StatePart, StateService, TEXT_WHITE } from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import InputPart from '../components/InputDoneScreenComponents/InputPart'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { printToFile } from '../components/Print/Print'
import React, { useState } from 'react'
import InputPartComponent from '../components/InputPartComponent'
import InputDocComponent from '../CommonComponents/InputDocComponent'
import InputServiceComponent from '../CommonComponents/InputServiceComponent'
import { PartsList } from '../components/InputDoneScreenComponents/PartsList'

type Props = BottomTabScreenProps<RootTabParamList, 'Tasks'>

const TaskScreen = ({ navigation, route }: Props): JSX.Element => {
  const { theme } = useTheme()
  const [openFab, setOpenFab] = useState(false)
  const [visiblePart, setVisiblePart] = useState(false)
  const [visibleService, setVisibleService] = useState(false)
  const [visibleOther, setVisibleOther] = useState(false)

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

  const handleOkPart = (resultPart: StatePart): void => {
    setVisiblePart(false)
    console.log('result', resultPart)
  }
  const handleOkService = (resultService: StateService): void => {
    setVisiblePart(false)
    console.log('result', resultService)
  }
  const handleOkOther = (resultOther: StateOther): void => {
    setVisibleOther(false)
    console.log('result', resultOther)
  }
  const handleCancel = (): void => {
    setVisiblePart(false)
    setVisibleService(false)
    setVisibleOther(false)
  }

  return (
    <>
    <BackgroundView >

        <View style={{ height: '100%' }}>
          <Text style={{ textAlign: 'center' }}>Запланируйте</Text>
  {
    // ------------------------------ flatTask -------------------------------------------------------
  }
          <View>
            <PartsList handlePress={null}/>
          </View>
  {
    // ------------------------------ flatTask -------------------------------------------------------
  }
          <Dialog isVisible={visiblePart} overlayStyle={{ width: '100%', backgroundColor: BACK_OPACITY }}>
            <BackgroundView>
              <Text style={{ textAlign: 'center' }}>Запланируйте покупку детали</Text>
              <InputPartComponent isCancel={handleCancel} isOk={handleOkPart}/>
            </BackgroundView>
          </Dialog>

          <Overlay isVisible={visibleService}
                   fullScreen
                   overlayStyle={{ justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.50)' }}
          >
            <BackgroundView>
              <View style={{ margin: 10 }} >
              <Text style={{ textAlign: 'center' }}>Запланируйте service</Text>
              <InputServiceComponent isCancel={handleCancel} isOk={handleOkService}/>
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
                <InputDocComponent isCancel={handleCancel} isOk={handleOkOther}/>
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
