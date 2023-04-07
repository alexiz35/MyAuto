import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { Button, Dialog, Icon, Input } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { useEffect, useMemo, useState } from 'react'
import { BACK_INPUT, COLOR_GREEN, PartList, ServiceList, StateTask, TEXT } from '../type'
import { addTask, editTask } from '../components/Redux/actions'
import { BottomSheetAddition } from '../components/BottomSheetAddition'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import InputService from '../components/InputTaskScreenComponents/InputService'

  type Props = NativeStackScreenProps<RootStackParamList, 'InputTaskScreen'>
const InputTaskScreen = ({ navigation, route }: Props): JSX.Element => {
  /* const stateSecond = useAppSelector((state) => state) */
  const setNewTask = useAppDispatch()
  const state = useAppSelector((state) => state)

  /* const editableTask: boolean = route.params.editable
  const currentId: number | undefined = route.params.taskId */

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
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <InputService navigation={navigation} route={route}/>
    </ScrollView>

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
