import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { COLOR_GREEN, StatePart } from '../../type'
import { Button, ListItem, useTheme } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { delPart } from '../Redux/actions'
import { Shadow } from 'react-native-shadow-2'

interface handleProp {
  handlePress: (item: StatePart) => void
}

export const PartsList = ({ handlePress }: handleProp): JSX.Element => {
  const listParts = useAppSelector(state => state.cars[0].parts)
  const carId = useAppSelector(state => state.numberCar)
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const [isSortParts, setIsSortParts] = useState(false)
  const renderRow: ListRenderItem<StatePart> = ({ item }: { item: StatePart }) => {
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
                dispatch(delPart(carId, item.id))
              }}
            />
          )}
          bottomDivider
          topDivider
        >

          <MaterialCommunityIcons name={'cog'} size={24} color={theme.colors.success}/>
          <ListItem.Content style={{ flex: 3 }}>
            <ListItem.Title style={{ fontSize: 14 }} >
              {String(new Date(item.dateBuy).toLocaleDateString())}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14 }} lineBreakMode={'tail'} numberOfLines={1} >
              {String(item.namePart)}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.seller?.name}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14 }}>
              {item.costPart} грн
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content style={{ flex: 0.7 }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.quantityPart} шт
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content style={{ flex: 0.7 }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.amountCostPart} грн
            </ListItem.Title>
          </ListItem.Content>

        </ListItem.Swipeable>

        </Shadow>
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

  return (
    <FlatList
      data={listParts}
      extraData={isSortParts}
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
    flex: 1
  }
})
