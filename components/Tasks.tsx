import { Button, LinearProgress, ListItem, ListItemProps } from '@rneui/themed'
import React from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { useAppDispatch, useAppSelector } from './Redux/hook'
import { delTask } from './Redux/actions'
import { StateTask } from '../type'

type ListComponentProps = ListItemProps

export const Tasks: React.FunctionComponent<ListComponentProps> = () => {
  const del = useAppDispatch()

  const renderRow: ListRenderItem<StateTask> = ({ item }: { item: StateTask }) => {
    return (
      <View style={styles.listItem}>
      <ListItem.Swipeable
        bottomDivider
        leftContent={ () => (
          <Button
            title='info'
            icon={{ name: 'info', color: 'white' }}
            buttonStyle={{ minHeight: '100%' }}
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

        <ListItem.Content >

          <ListItem.Title>
            {item.title}
          </ListItem.Title>
          {/*  <LinearProgress
          value={item.progress / 100}
          color='red'
          trackColor='grey'
        /> */}
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

      </ListItem.Swipeable>
      </View>
    )
  }

  const listTask = useAppSelector(state => state.tasks)

  return (
    <>
      <FlatList
        data={listTask}
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
