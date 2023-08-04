import { FlatList, ListRenderItem, StyleSheet, TouchableHighlight, View } from 'react-native'
import { COLOR_GREEN, StateFuel, StatePart } from '../../type'
import { Button, Divider, Icon, ListItem, Text } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { delPart } from '../Redux/actions'
import { Shadow } from 'react-native-shadow-2'
import { check } from 'react-native-permissions'
import { Surface, useTheme } from 'react-native-paper'
import { BusyIndicator } from '../useIsReadyHook'

interface handleProp {
  handlePress: (item: StatePart) => void
  filterList: string

}

export const PartsList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listParts = useAppSelector(state => state.cars[0].parts)
  const carId = useAppSelector(state => state.numberCar)
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [isSortParts, setIsSortParts] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  const renderRow: ListRenderItem<StatePart> = ({ item }: { item: StatePart }) => {
    return (
      <View style={styles.listItem}>
        <Surface elevation={1} >

        <ListItem.Swipeable
          animation={{ type: 'spring' }}
          containerStyle={{ padding: 5, height: 70, backgroundColor: theme.colors.surface }}
          style={{ }}
          Component={TouchableHighlight}

          onPress={() => handlePress(item)}
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
                dispatch(delPart(carId, item.id))
              }}
            />
          )}
          bottomDivider
          topDivider
        >
          <ListItem.Content style={{ flex: 0.5 }}>
          <Icon name={'basket-check'} type='material-community' size={22} color={theme.colors.tertiary} style={{ paddingBottom: 3 }}/>
          <Icon name={'check-decagram' } type='material-community' size={22}
                  color={ item.isInstall ? theme.colors.tertiary : theme.colors.secondary} />
          </ListItem.Content>

          <ListItem.Content style={{ flex: 3 }} >
            <ListItem.Title style={{ paddingBottom: 5, color: theme.colors.onSurface }} lineBreakMode={'tail'} numberOfLines={1}>
              {/* {String(new Date(item.dateBuy).toLocaleDateString())} */}
              {String(item.namePart)}
            </ListItem.Title>
           {/*  <Divider color={theme.colors.tertiary} width={2} inset insetType={'middle'}/> */}
            <ListItem.Subtitle style={{ fontSize: 12, color: theme.colors.onSurface }} lineBreakMode={'tail'} numberOfLines={1} >
              {item.isInstall ? 'установлено' : 'не установлено'}
            </ListItem.Subtitle>

          </ListItem.Content>
          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5, fontSize: 12, color: theme.colors.onSurface }} >
              {String(new Date(item.dateBuy).toLocaleDateString())}
            </ListItem.Title>

            <ListItem.Subtitle style={{ fontSize: 12, color: theme.colors.onSurface }}>
              {(item.dateInstall != null) ? String(new Date(item.dateInstall).toLocaleDateString()) : null}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5, fontSize: 12, color: theme.colors.onSurface }}>
              {item.quantityPart} х {item.amountCostPart}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 12, color: theme.colors.onSurface }}>
              {(item.mileageInstall != null) ? String(item.mileageInstall) : null}

            </ListItem.Subtitle>
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

        </Surface>
      </View>
    )
  }

  useEffect(() => {
    if (listParts.length > 1) {
      listParts.sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
      })
      setIsSortParts(!isSortParts)
    }
  }, [listParts])

  useEffect(() => {
    setTimeout(() => setIsLoad(false), 10)
    return setIsLoad(true)
  }, [filterList])

  const filter = (): StatePart[] => {
    switch (filterList) {
      case 'last': return listParts.slice(0, 3)
      case 'ten': return listParts.slice(0, 10)
      default: return listParts
    }
  }

  return (
    <>

    { isLoad
      ? <BusyIndicator />
      : <FlatList
        data={listParts}
        extraData={isSortParts}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => (
          {
            length: 70,
            offset: 70 * index,
            index
          }
        )}
        initialNumToRender={5}
        />
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
