import { Button, CheckBox, LinearProgress, ListItem, ListItemProps } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useAppDispatch, useAppSelector } from './Redux/hook'
import { delTask, finishTask } from './Redux/actions'
import { StateTask } from '../type'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from './Navigation/Navigation'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

type ListComponentProps = ListItemProps
type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'Info'
>

export const Tasks: React.FunctionComponent<ListComponentProps> = () => {
  const del = useAppDispatch()
  const nav = useNavigation<ProfileScreenNavigationProp>()

  const renderRow: ListRenderItem<StateTask> = ({ item }: { item: StateTask }) => {
    const pressCheck = (): void => {
      del(finishTask(item.id, !item.isFinished))
    }

    // ------------------------- заменить
    const currentMile = 203000
    // ----------------------------------------------
    const progress = {
      value: 0,
      color: 'red',
      left: 0
    }

    const value: number = (currentMile - item.startKm) / (item.endKm - item.startKm)

    if (value < 0) {
      progress.value = 1
      progress.color = 'red'
      progress.left = 0
    } else {
      progress.value = value
      progress.left = item.endKm - currentMile
      if (value > 0.7) {
        progress.color = 'red'
      } else {
        progress.color = 'green'
      }
    }
    return (
      <View style={styles.listItem}>
      <ListItem.Swipeable
        onPress={() => nav.navigate('Info', { taskId: item.id })}
        bottomDivider
        leftContent={ () => (
          <Button
            title='info'
            icon={{ name: 'info', color: 'white' }}
            buttonStyle={{ minHeight: '100%' }}
            onPress={() => nav.navigate('Info', { taskId: item.id })}
            /* onPress={() => { nav() }} */
          />
        )}
        rightContent={ () => (
          <Button
            title='delete'
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            onPress={() => del(delTask(item.id))}
          />
        )}
      >

        <ListItem.Content style={{ flex: 1.4 }}>

          <ListItem.Title >
            {item.title}

          </ListItem.Title>
           <LinearProgress
          value={progress.value}
          color={progress.color}
          trackColor='lightgrey'
        />
          <ListItem.Subtitle style={{ fontSize: 12 }}>
            {(progress.left !== 0) ? `осталось ${progress.left} км` : 'просрочено'}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title >
            {item.startDate}
          </ListItem.Title>
          <ListItem.Subtitle >
            {`${item.startKm} km`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content >
          <ListItem.Title >
            {item.endData}
          </ListItem.Title>
          <ListItem.Subtitle >
            {`${item.endKm} km`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.CheckBox
          checkedColor={'green'}
          containerStyle={{ flex: 0.1 }}
          checked={item.isFinished}
          onPress={pressCheck}
        />
      </ListItem.Swipeable>

      </View>
    )
  }

  const listTask = useAppSelector(state => state.tasks)
  const [isSort, setIsSort] = useState(false)

  useEffect(() => {
    listTask.sort(function (a, b) {
      return a.endKm - b.endKm
    })
    setIsSort(!isSort)
  }, [listTask])

  return (
    <>
      <FlatList
        data={listTask}
        extraData={isSort}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  )
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
    marginHorizontal: 5,
    elevation: 20,
    shadowColor: 'black'
  }
})
