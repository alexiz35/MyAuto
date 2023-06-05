import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { COLOR_GREEN, StatePart, StateTask } from '../../type'
import { Button, Divider, Icon, ListItem, useTheme, Text } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { delPart, delTask } from '../Redux/actions'
import { Shadow } from 'react-native-shadow-2'
import { check } from 'react-native-permissions'

interface handleProp {
  handlePress: (item: StateTask) => void
}

export const TasksList = ({ handlePress }: handleProp): JSX.Element => {
  const listTasks = useAppSelector(state => state.cars[0].tasks)
  const carId = useAppSelector(state => state.numberCar)
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const [isSortParts, setIsSortParts] = useState(false)
  const renderRow: ListRenderItem<StateTask> = ({ item }: { item: StateTask }) => {
    return (
      <View style={styles.listItem}>
         <Shadow stretch={true} >

        <ListItem.Swipeable
          animation={{ type: 'spring' }}
          containerStyle={{ padding: 5, height: 70 }}
          style={{ }}
          onPress={() =>
            handlePress(item)
          }
          leftContent={() => (
            <Button
              title='info'
              icon={{
                name: 'info',
                color: 'white'
              }}
              buttonStyle={{ minHeight: '100%' }}
              onPress={() => {
                handlePress(item)
              }}
            />
          )}
          rightContent={() => (
            <Button
              title='delete'
              icon={{
                name: 'delete',
                color: 'white'
              }}
              buttonStyle={{
                minHeight: '100%',
                backgroundColor: 'red'
              }}
              onPress={() => {
                dispatch(delTask(carId, item.id))
              }}
            />
          )}
          bottomDivider
          topDivider
        >
          <ListItem.Content style={{ flex: 0.5 }}>

            {
              (() => {
                switch (item.typeTask) {
                  case 'part':
                    return <Icon name={'car-cog'} type='material-community' size={22}
                                 color={theme.colors.success}
                                 style={{ paddingBottom: 3 }} />

                  case 'service':
                    return <Icon name={'car-wrench'} type='material-community' size={22}
                                 color={theme.colors.success}
                                 style={{ paddingBottom: 3 }} />

                  case 'other':
                    return <Icon name={'account-cash'} type='material-community' size={22}
                                 color={theme.colors.success}
                                 style={{ paddingBottom: 3 }} />

                  default:
                    return null
                }
              })()
            }
          </ListItem.Content>

          <ListItem.Content style={{ flex: 3 }} >
            <ListItem.Title style={{ paddingBottom: 5 }} >
              {/* {String(new Date(item.dateBuy).toLocaleDateString())} */}
              {String(item.typeTask)}
            </ListItem.Title>
            <Divider color={theme.colors.success} width={2} inset insetType={'middle'}/>
            <ListItem.Subtitle style={{ fontSize: 12 }} lineBreakMode={'tail'} numberOfLines={1} >
              {String(item.name)}
            </ListItem.Subtitle>

          </ListItem.Content>
          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5 }} >
              {String(new Date(item.dateEndTask).toLocaleDateString())}
            </ListItem.Title>

            {/* <ListItem.Subtitle style={{ fontSize: 12 }}>
              {(item.dateInstall != null) ? String(new Date(item.dateInstall).toLocaleDateString()) : null}
            </ListItem.Subtitle> */}
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5 }}>
              {item.amount}
            </ListItem.Title>
            {/* <ListItem.Subtitle style={{ fontSize: 12 }}>
              {(item.mileageInstall != null) ? String(item.mileageInstall) : null}
            </ListItem.Subtitle> */}
          </ListItem.Content>

         {/*  <ListItem.Content style={{ flex: 1 }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.amountCostPart}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14 }}>
              {item.costPart} грн
            </ListItem.Subtitle>
          </ListItem.Content> */}

        </ListItem.Swipeable>

        </Shadow>
      </View>
    )
  }

  useEffect(() => {
    if (listTasks !== undefined) {
      if (listTasks.length > 1) {
        listTasks.sort(function (a, b) {
          // @ts-expect-error date
          return Date.parse(a.dateEndTask) - Date.parse(b.dateEndTask)
        })
        setIsSortParts(!isSortParts)
      }
    }
  }, [listTasks])

  return (
    <>
       {
          listTasks !== undefined
            ? <FlatList
        data={listTasks}
        extraData={isSortParts}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
            : <Text style={{ textAlign: 'center' }}>Запланируйте что-то</Text>
      }
    </>
  )
}

const styles = StyleSheet.create({
  listItem: {
    height: 70,
    paddingRight: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1
  }
})
