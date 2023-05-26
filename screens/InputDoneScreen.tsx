import { View, StyleSheet, SafeAreaView, Pressable, ImageBackground, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Icon, Input, Tab, TabView, Text, useTheme } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useMemo, useState } from 'react'
import { BACK_INPUT, COLOR_GREEN, StatePart, ServiceList, StateService, TEXT, TEXT_WHITE } from '../type'
import { addService, editService } from '../components/Redux/actions'
import { AddPartModal } from '../components/AddPartModal'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import InputService from '../components/InputDoneScreenComponents/InputService'
import InputPart from '../components/InputDoneScreenComponents/InputPart'
import BackgroundView from '../CommonComponents/BackgroundView'
import InputDoc from '../components/InputDoneScreenComponents/InputDoc'

  type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'>
const InputDoneScreen = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const { theme } = useTheme()
  const setNewTask = useAppDispatch()
  const state = useAppSelector((state) => state)
  const [index, setIndex] = useState(0)

  /* const editableTask: boolean = route.params.editable
  const currentId: number | undefined = route.params.taskId */
  useEffect(() => {
    setIndex(route.params.typeTask)
  }, [])

  /* const [currentTask, setCurrentTask] = useState<StateTask>(
    {
      id: 0,
      title: '',
      startKm: 0,
      endKm: 0,
      startDate: '',
      endData: '',
      addition: {
        parts: [{ id: 0, namePart: '', costPart: 0, amountPart: 0, numberPart: '' }],
        services: [{ id: 0, nameService: '', costService: 0 }]
      }
    }
  ) */

  return (
    <BackgroundView props={{ flex: 1 }}>
      {/* <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}> */}
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: theme.colors.black,
            height: 3
          }}
          buttonStyle={{

          }}
          variant="default"
        >
          <Tab.Item
            title='Запчасти'
            titleStyle={{ fontSize: 12, color: theme.colors.black }}
            icon={{ name: 'cog', type: 'material-community', size: 20, color: theme.colors.black }}
          />
          <Tab.Item
            title="сервис"
            titleStyle={{ fontSize: 12, color: theme.colors.black }}
            icon={{ name: 'car-wrench', type: 'material-community', size: 20, color: theme.colors.black }}
          />
          <Tab.Item
            title="другое"
            titleStyle={{ fontSize: 12, color: theme.colors.black }}
            icon={{ name: 'account-cash', type: 'material-community', size: 20, color: theme.colors.black }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType='spring' disableSwipe>
          <TabView.Item style={{ width: '100%' }}>
            <View >
            <InputPart navigation={navigation} route={route}/>
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <View>
              <View>
            <InputService navigation={navigation} route={route}/>
              </View>
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <View>
              <InputDoc navigation={navigation} route={route}/>
            </View>
          </TabView.Item>
        </TabView>
        {/* <InputService navigation={navigation} route={route}/> */}
    {/* </ScrollView> */}

</BackgroundView>

  )
}

export default InputDoneScreen

const styles = StyleSheet.create({
  dropDownPicker: {
    backgroundColor: BACK_INPUT,
    margin: 5,
    width: '97%',
    borderWidth: 0,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  viewAllInput: {

  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    margin: 5,
    backgroundColor: BACK_INPUT,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  inputText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white'
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },
  buttonAddition: {
    margin: 5,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },

  viewAdditional: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10
  },
  button: {
    textAlign: 'center',
    color: 'red'
  },

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  },
  textCost: {
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    backgroundColor: BACK_INPUT,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  }
})
