import { Button, CheckBox, LinearProgress, ListItem, ListItemProps } from '@rneui/themed'
import React, { Component, useEffect, useState } from 'react'
import { FlatList, ImageBackground, ListRenderItem, StyleSheet, View } from 'react-native'
import { useAppDispatch, useAppSelector } from './Redux/hook'
import { delTask, finishTask } from './Redux/actions'
import { BACK_CARD, StateTask } from '../type'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from './Navigation/Navigation'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Shadow } from 'react-native-shadow-2'

const BACKGROUND = '#13171A'
const FAB = '#151A1D'
const TEXT_CARD = '#F7F8FB'

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
       {/*  <Shadow stretch={true} > */}

        <ListItem.Swipeable
        containerStyle={{ backgroundColor: BACK_CARD }}
        onPress={() => nav.navigate('Info', { taskId: item.id })}
        /* bottomDivider */
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

              <ListItem.Content style={{ flex: 1.4, backgroundColor: BACK_CARD }} >

          <ListItem.Title style={{ color: TEXT_CARD }} >
            {item.title}

          </ListItem.Title>
           <LinearProgress
          value={progress.value}
          color={progress.color}
          trackColor='lightgrey'
        />
          <ListItem.Subtitle style={{ fontSize: 12, color: TEXT_CARD }}>
            {(progress.left !== 0) ? `осталось ${progress.left} км` : 'просрочено'}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title style={{ color: TEXT_CARD }}>
            {item.startDate}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: TEXT_CARD }}>
            {`${item.startKm} km`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content >
          <ListItem.Title style={{ color: TEXT_CARD }}>
            {item.endData}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: TEXT_CARD }}>
            {`${item.endKm} km`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.CheckBox
          checkedColor={'green'}
          containerStyle={{ flex: 0.1, backgroundColor: '#2f2f2f' }}
          checked={item.isFinished}
          onPress={pressCheck}
        />

      </ListItem.Swipeable>

        {/* </Shadow> */}
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
    paddingRight: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    color: 'red',
    flex: 1
    /* borderRadius: 5 */
    /* shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2 */
  }
})
