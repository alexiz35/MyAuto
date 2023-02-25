import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, FlatList, ImageBackground, SafeAreaView, Alert } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { Button, FAB, Icon, Input } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../components/Redux/hook'
import { BACK_CARD, BACK_INPUT, COLOR_GREEN, StateTask } from '../type'
import { listsInfo } from '../components/ListInfo'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'
import { printToFile } from '../components/Print/Print'

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>
type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'InputTaskScreen'
>

const InfoScreen = ({ navigation, route }: Props): JSX.Element => {
  const Tasks = useAppSelector((state) => state)
  const nav = useNavigation<ProfileScreenNavigationProp>()

  const [currentTask, setCurrentTask] = useState<StateTask>(
    {
      id: 0,
      title: '',
      startKm: 0,
      endKm: 0,
      startDate: '',
      endData: '',
      sumCostParts: 0,
      sumCostService: 0,
      isFinished: false,
      addition: {
        parts: [{ id: 0, namePart: '', costPart: 0, numberPart: '', amountPart: 0 }],
        services: [{ id: 0, nameService: '', costService: 0 }]
      }
    }
  )

  const currentId = route.params.taskId
  const tempTask = (): StateTask => {
    const temp = Tasks.tasks.find((item) => (item.id === currentId))
    if (temp !== undefined) return temp
    else return currentTask
  }

  const rangeKm = currentTask.endKm - currentTask.startKm

  useEffect(() => {
    setCurrentTask(tempTask)
  }, [currentId])

  return (
    <ImageBackground source={require('../assets/Back2.png')} resizeMode={'cover'}>

        <ScrollView nestedScrollEnabled={true} style={{ height: '100%' }}>

        <View style={styles.viewAllInput}>
          <View style={{ flexDirection: 'row' }}>
            <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} style={{ paddingLeft: 5, paddingTop: 5 }}/>
          <Text style={styles.textKm}>Осталось {rangeKm} км</Text>
          </View>
          <View style={styles.viewKm}>
            <Input
              placeholder={'Пробег текущий'}
              placeholderTextColor={'black'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputStyle}
              errorMessage={'текущий пробег'}
              errorStyle={styles.inputErrorStyle}
              keyboardType={'numeric'}
              defaultValue={'200000'}
              value={String(currentTask.startKm)}
            />
            <Input
              placeholder={'Пробег до замены'}
              placeholderTextColor={'black'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputStyle}
              errorMessage={'пробег до замены'}
              errorStyle={styles.inputErrorStyle}
              keyboardType={'numeric'}
              defaultValue={'200000'}
              value={String(currentTask.endKm)}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} style={{ paddingLeft: 5, paddingTop: 5 }}/>
          <Text style={styles.textDate}>Осталось времени</Text>
          </View>
          <View style={styles.viewDate}>
            <Input
              placeholder={'дата проведения'}
              placeholderTextColor={'black'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputStyle}
              errorMessage={'дата проведения'}
              errorStyle={styles.inputErrorStyle}
              defaultValue={'20/12/23'}
              value={String(currentTask.startDate)}
            />
            <Input
              placeholder={'дата предельная'}
              placeholderTextColor={'black'}
              containerStyle={{ flex: 1 }}
              inputStyle={styles.inputStyle}
              errorMessage={'дата предельная'}
              errorStyle={styles.inputErrorStyle}
              defaultValue={'20/12/23'}
              value={String(currentTask.endData)}
            />
          </View>
        </View>
        <View style={styles.viewAllInput}>
          <View style={{ flexDirection: 'row' }}>
            <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} style={{ paddingLeft: 5, paddingTop: 5 }}/>
          <Text style={styles.textPart}>Использованные материалы</Text>
          </View>
          <FlatList
            scrollEnabled={false}
            nestedScrollEnabled={true}
            data={currentTask.addition?.parts}
            renderItem={({ item }) => listsInfo(item)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.viewAllInput}>
          <View style={{ flexDirection: 'row' }}>
            <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} style={{ paddingLeft: 5, paddingTop: 5 }}/>
          <Text style={styles.textPart}>Затраты</Text>
          </View>
          <Text style={{ textAlign: 'center', marginBottom: 3, color: 'white' }}>{`материалы: ${currentTask.sumCostParts ?? 0} грн`}</Text>
          <Text style={{ textAlign: 'center', marginBottom: 3, color: 'white' }}>{`работа: ${currentTask.sumCostService ?? 0} грн`}</Text>
          <Text style={{ textAlign: 'center', marginVertical: 7, color: 'white' }}>{`ВСЕГО: ${(currentTask.sumCostService ?? 0) + (currentTask.sumCostParts ?? 0)} грн`}</Text>

        </View>
       {/*  <Button
          title={'Edit'}
          onPress={() => {
            nav.navigate('InputTaskScreen', { editable: true, taskId: currentId })
          }}
          color={'secondary'}
        /> */}

          </ScrollView>

        <FAB
                    style={{ marginBottom: 15, borderColor: 'grey', borderWidth: 1 }}
                    color={'#000'}
                    placement={'right'}
                    icon={{ type: 'material-community', name: 'printer', color: 'white' }}
                    onPress={() => { void printToFile(currentTask) }}
                  />

</ImageBackground>

  )
}

export default InfoScreen

const styles = StyleSheet.create({
  viewAllInput: {
    margin: 10,
    backgroundColor: BACK_INPUT,
    /* borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey', */
    borderRadius: 10,
    paddingBottom: 5
  },
  inputStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff'
  },
  inputErrorStyle: {
    color: 'grey',
    textAlign: 'center'
  },
  textKm: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 10
  },
  viewKm: {
    flexDirection: 'row',
    justifyContent: 'space-around'
    /* borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1 */
  },
  textDate: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 10
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
    /* borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1 */
  },
  textPart: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 10
  }

})
