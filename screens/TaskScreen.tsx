import { ImageBackground, Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { Button, CheckBox, Dialog, Divider, FAB, Overlay, SpeedDial, Text, useTheme } from '@rneui/themed'
import { BACK_INPUT, BACK_OPACITY, COLOR_GREEN, StatePart, TEXT_WHITE } from '../type'
import BackgroundView from '../CommonComponents/BackgroundView'
import InputPart from '../components/InputDoneScreenComponents/InputPart'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { printToFile } from '../components/Print/Print'
import { useState } from 'react'
import InputPartComponent from '../components/InputPartComponent'

type Props = BottomTabScreenProps<RootTabParamList, 'Tasks'>

const TaskScreen = ({ navigation, route }: Props): JSX.Element => {
  const { theme } = useTheme()
  const [openFab, setOpenFab] = useState(false)
  const [visiblePart, setVisiblePart] = useState(false)

  const handleCancel = (): void => {
    setVisiblePart(false)
  }

  const handleOk = (resultPart: StatePart): void => {
    setVisiblePart(false)
    console.log('result', resultPart)
  }

  return (
    <>
    <BackgroundView >

        <View style={{ height: '100%' }}>
          <Text style={{ textAlign: 'center' }}>Запланируйте</Text>
          <Dialog isVisible={visiblePart} overlayStyle={{ width: '100%', backgroundColor: BACK_OPACITY }}>
            <BackgroundView>
              <Text style={{ textAlign: 'center' }}>Запланируйте покупку детали</Text>
              <InputPartComponent isCancel={handleCancel} isOk={handleOk}/>
            </BackgroundView>
          </Dialog>

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
          onPress={() => setVisiblePart(true)}
        />
        <SpeedDial.Action
          icon={{ name: 'car-wrench', type: 'material-community', color: '#fff' }}
          title="сервис"
          /* onPress={() => console.log('Delete Something')} */
        />
        <SpeedDial.Action
          icon={{ name: 'account-cash', type: 'material-community', color: '#fff' }}
          title="другое "
          /* onPress={() => console.log('Delete Something')} */
        />
      </SpeedDial>
    </BackgroundView>

  </>
  )
}

export default TaskScreen
