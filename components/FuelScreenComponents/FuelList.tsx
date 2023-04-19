import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { BACK_CARD, COLOR_GREEN, StateFuel, TEXT_WHITE } from '../../type'
import { Button, ListItem } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { delFuel } from '../Redux/actions'
import { Shadow } from 'react-native-shadow-2'

interface handleProp {
  handlePress: (item: StateFuel) => void
}

export const FuelList = ({ handlePress }: handleProp): JSX.Element => {
  const listFuel = useAppSelector(state => state.cars[0].fuel)
  const carId = useAppSelector(state => state.numberCar)
  const dispatch = useAppDispatch()
  const [isSortFuel, setIsSortFuel] = useState(false)

  const renderRow: ListRenderItem<StateFuel> = ({ item }: { item: StateFuel }) => {
    return (
      <View style={styles.listItem}>
         <Shadow stretch={true} >

        <ListItem.Swipeable
          animation={{ type: 'spring' }}
          containerStyle={{ padding: 5, height: 70 }}
          onPress={() =>
            handlePress(item)
          }
          bottomDivider
          topDivider
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
        >
          <MaterialCommunityIcons name={'gas-station'} size={24} color={COLOR_GREEN}/>
          <ListItem.Content style={{
            flex: 1.7
          }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {String(new Date(item.dateFuel).toLocaleDateString())}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14 }}>
              {item.StationFuel}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.typeFuel}standart
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14 }}>
              {item.CostFuel} грн/л
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.volumeFuel} л
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.AmountFuel} грн
            </ListItem.Title>
          </ListItem.Content>
        </ListItem.Swipeable>

        </Shadow>
      </View>
    )
  }

  useEffect(() => {
    listFuel.sort(function (a, b) {
      // @ts-expect-error data
      return Date.parse(a.dateFuel) - Date.parse(b.dateFuel)
    })
    setIsSortFuel(!isSortFuel)
  }, [listFuel])

  return (
    <FlatList
      data={listFuel}
      extraData={isSortFuel}
      renderItem={renderRow}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

const styles = StyleSheet.create({
  listItem: {
    height: 70,
    paddingRight: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    color: 'red',
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