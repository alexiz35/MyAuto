import { StyleSheet, View } from 'react-native'
import { StateFuel } from '../../type'
import { Card, IconButton, Menu } from 'react-native-paper'
import { useState } from 'react'
import { delFuel } from '../Redux/actions'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useAppTheme } from '../../CommonComponents/Theme'
import { delStateCarReducer } from '../Redux/CarsSlice'

interface propsRowFuel {
  handlePress: (item: StateFuel) => void
  item: StateFuel
}

export const RenderRowFuel = ({ item, handlePress }: propsRowFuel): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)

  const [visibleMenu, setVisibleMenu] = useState(false)
  const { colors } = useAppTheme()

  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }

  return (

    <View style={styles.listItem}>

      <Card
        style={{ height: 70, borderRadius: 5 }}
        contentStyle={{ flexDirection: 'row' }}
        /* bottomDivider
        topDivider */
        /* leftContent={() => (
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
            /!* onPress={() => { nav() }} *!/
          />
        )} */
        /* rightContent={() => (
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
        )} */

        onPress={() => handlePress(item)}
      >

        <Card.Title
          style={{ flex: 3.6, paddingLeft: 2 }}
          leftStyle={{ marginRight: 2 }}
          left={(props) =>
            <IconButton {...props} icon={'gas-station'} size={22} iconColor={colors.tertiary} style={{ paddingRight: 6 }}/>
          }
          title={String(new Date(item.dateFuel).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
          subtitle={item.StationFuel}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
        />
        {/* <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {String(new Date(item.dateFuel).toLocaleDateString())}
            </ListItem.Title> */}
        {/* <ListItem.Subtitle style={{ fontSize: 14, color: colors.onSurface }}>
              {item.StationFuel}
            </ListItem.Subtitle> */}

        <Card.Title
          style={{ flex: 2.3 }}

          title={String(item.volumeFuel) + ' л'}
          subtitle = {String(item.CostFuel) + ' грн/л'}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.2 }}
          title={String(item.AmountFuel) + ' грн'}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />
        <View style={{ justifyContent: 'flex-start' }}>
          <Menu

            anchor={
              <IconButton icon={'dots-vertical'} size={24} style={{ margin: 2, alignItems: 'flex-end' }} onPress={openMenu}/>
            }
            visible={visibleMenu}
            onDismiss={closeMenu}
          >
            <Menu.Item title={'delete'}
                       dense
                       leadingIcon={'delete'}
                       onPress={() => {
                         dispatch(delStateCarReducer({type:'fuel', numberCar: carId, id: item.id }))
                         closeMenu()
                       }}
            />
            <Menu.Item title={'edit'}
                       onPress={() => {
                         handlePress(item)
                       }}
                       dense
                       leadingIcon={'file-document-edit'}
            />
          </Menu>
        </View>
      </Card>

    </View>

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
