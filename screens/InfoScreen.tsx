import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../components/Redux/hook'
import { StateTask } from '../type'
import { listsInfo } from '../components/ListInfo'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>
type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'InputTaskScreen'
>

const InfoScreen = ({ route }: Props): JSX.Element => {
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
      <View>
        <View style={styles.viewAllInput}>
          <Text style={styles.textKm}>Осталось {rangeKm} км</Text>

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

          <Text style={styles.textDate}>Осталось времени</Text>

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
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Использованные материалы</Text>
          <FlatList
            data={currentTask.addition?.parts}
            renderItem={({ item }) => listsInfo(item)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.viewAllInput}>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Затраты</Text>
          <Text style={{ textAlign: 'center', marginBottom: 3 }}>{`материалы: ${currentTask.sumCostParts ?? 0} грн`}</Text>
          <Text style={{ textAlign: 'center', marginBottom: 3 }}>{`работа: ${currentTask.sumCostService ?? 0} грн`}</Text>
          <Text style={{ textAlign: 'center', marginVertical: 7 }}>{`ВСЕГО: ${(currentTask.sumCostService ?? 0) + (currentTask.sumCostParts ?? 0)} грн`}</Text>

        </View>
        <Button
          title={'Edit'}
          onPress={() => {
            nav.navigate('InputTaskScreen', { editable: true, taskId: currentId })
          }}
          color={'secondary'}
        />
      </View>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  viewAllInput: {
    margin: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10
  },
  inputStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  inputErrorStyle: {
    color: 'grey',
    textAlign: 'center'
  },
  textKm: {
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
  }
})
