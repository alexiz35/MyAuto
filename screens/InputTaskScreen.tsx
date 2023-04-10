import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Icon, Input, Tab, TabView } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useMemo, useState } from 'react'
import { BACK_INPUT, COLOR_GREEN, PartList, ServiceList, StateTask, TEXT, TEXT_WHITE } from '../type'
import { addTask, editTask } from '../components/Redux/actions'
import { BottomSheetAddition } from '../components/BottomSheetAddition'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import InputService from '../components/InputTaskScreenComponents/InputService'
import InputTask from '../components/InputTaskScreenComponents/InputTask'

  type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputTaskScreen = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
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
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      {/* <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}> */}
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3
          }}
          buttonStyle={{

          }}
          variant="default"
        >
          <Tab.Item
            title='Запчасти'
            titleStyle={{ fontSize: 12, color: TEXT_WHITE }}
            icon={{ name: 'cog', type: 'material-community', color: 'white', size: 20 }}

          />
          <Tab.Item
            title="сервис"
            titleStyle={{ fontSize: 12, color: TEXT_WHITE }}
            icon={{ name: 'car-wrench', type: 'material-community', color: 'white', size: 20 }}
          />
          <Tab.Item
            title="другое"
            titleStyle={{ fontSize: 12, color: TEXT_WHITE }}
            icon={{ name: 'account-cash', type: 'material-community', color: 'white', size: 20 }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType='spring'>
          <TabView.Item style={{ width: '100%' }}>
            <View>
            <InputTask navigation={navigation} route={route}/>
            </View>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <View>
              <ScrollView>
            <InputService navigation={navigation} route={route}/>
              </ScrollView>
            </View>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
            <Text >Cart</Text>
          </TabView.Item>
        </TabView>
        {/* <InputService navigation={navigation} route={route}/> */}
    {/* </ScrollView> */}

</ImageBackground>

  )
}

export default InputTaskScreen

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
