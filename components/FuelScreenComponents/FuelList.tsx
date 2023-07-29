import { FlatList, ListRenderItem, StyleSheet, TouchableHighlight, TouchableHighlightComponent, View } from 'react-native'
import { COLOR_GREEN, StateFuel } from '../../type'
import { Button, ListItem } from '@rneui/themed'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { delFuel } from '../Redux/actions'
import { ActivityIndicator, Surface, Text, TouchableRipple, useTheme } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import { BusyIndicator } from '../useIsReadyHook'

interface handleProp {
  handlePress: (item: StateFuel) => void
  filterList: string
}

export const FuelList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listFuel = useAppSelector(state => state.cars[0].fuel)
  const carId = useAppSelector(state => state.numberCar)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [isSortFuel, setIsSortFuel] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  const renderRow: ListRenderItem<StateFuel> = ({ item }: { item: StateFuel }) => {
    return (

      <View style={styles.listItem}>
         <Surface elevation={1} >

        <ListItem.Swipeable
          animation={{ type: 'spring' }}
          containerStyle={{ padding: 5, height: 70, backgroundColor: colors.surface }}

          /* bottomDivider
          topDivider */
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
              /* onPress={() => { nav() }} */
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
                dispatch(delFuel(carId, item.id))
              }}
            />
          )}
          Component={TouchableHighlight}

          onPress={() => handlePress(item)}
        >

          <MaterialCommunityIcons name={'gas-station'} size={24} color={colors.tertiary}/>

          <ListItem.Content style={{
            flex: 1.7
          }}>
            <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {String(new Date(item.dateFuel).toLocaleDateString())}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14, color: colors.onSurface }}>
              {item.StationFuel}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {item.typeFuel}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14, color: colors.onSurface }}>
              {item.CostFuel} грн/л
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {item.volumeFuel} л
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {item.AmountFuel} грн
            </ListItem.Title>
          </ListItem.Content>
        </ListItem.Swipeable>

        </Surface>
      </View>

    )
  }

  useEffect(() => {
    listFuel.sort(function (a, b) {
      // @ts-expect-error data
      return Date.parse(b.dateFuel) - Date.parse(a.dateFuel)
    })
    setIsSortFuel(!isSortFuel)
  }, [listFuel])

  useEffect(() => {
    setTimeout(() => setIsLoad(false), 10)
    return setIsLoad(true)
  }, [filterList])

  const filter = (): StateFuel[] => {
    switch (filterList) {
      case 'last': return listFuel.slice(0, 3)
      case 'ten': return listFuel.slice(0, 10)
      default: return listFuel
    }
  }

  return (
    <>
    {isLoad
      ? <BusyIndicator/>/* <ActivityIndicator size={'large'} color={'green'} /> */
      : <FlatList
    scrollEnabled
    data={filter()}
    extraData={isSortFuel}
    renderItem={(item) => renderRow(item)}
    /* estimatedItemSize={70} */
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
    /* backgroundColor: 'red' */
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
