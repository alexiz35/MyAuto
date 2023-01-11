import { Button, LinearProgress, ListItem, ListItemProps } from '@rneui/themed'
import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'

interface typeTask {
  title: string
  startKm: number
  endKm: number
  startDate: string
  endData: string
  progress: number
}

const listTask: typeTask[] = [
  {
    title: 'Замена масла',
    startKm: 250000,
    endKm: 260000,
    startDate: '12.02.22',
    endData: '20.02.23',
    progress: 10
  },
  {
    title: 'Замена ремня',
    startKm: 250000,
    endKm: 260000,
    startDate: '12.02.22',
    endData: '20.02.23',
    progress: 20
  },
  {
    title: 'Замена ремня ГРМ',
    startKm: 250000,
    endKm: 260000,
    startDate: '12.02.22',
    endData: '20.02.23',
    progress: 50
  }

]

type ListComponentProps = ListItemProps
const renderRow: ListRenderItem<typeTask> = ({ item }: { item: typeTask }) => {
  return (
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
        />
        )}
    >
      <ListItem.Content>
        <ListItem.Title>
          {item.title}
        </ListItem.Title>
        <LinearProgress
          value={item.progress / 100}
          color='red'
          trackColor='grey'
        />
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
  )
}

export const Tasks: React.FunctionComponent<ListComponentProps> = () => {
  return (
    <>
      <FlatList
        data={listTask}
        renderItem={renderRow}
        keyExtractor={(a: typeTask, index: number) => index.toString()}
      />
    </>
  )
}
