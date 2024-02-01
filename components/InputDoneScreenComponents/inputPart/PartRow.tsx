import { StyleSheet, View } from 'react-native'
import { StatePart } from '../../../type'
import { Card, IconButton, Menu, useTheme } from 'react-native-paper'
import { JSX, useState } from 'react'
import { delPart } from '../../Redux/actions'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { delStateCarReducer } from '../../Redux/CarsSlice'

interface propsRowPart {
  handlePress: (item: StatePart) => void
  item: StatePart
}

export const RenderRowPart = ({ item, handlePress }: propsRowPart): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)

  const [visibleMenu, setVisibleMenu] = useState(false)
  const { colors } = useTheme()

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
          style={{ flex: 3.6, paddingLeft: 0 }}
          leftStyle={{ marginRight: 2, padding: 0 }}
          left={(props) =>
            <View style={{ alignItems: 'center' }}>
              <IconButton {...props} icon={'basket-check'} size={22} iconColor={colors.tertiary} style={{ height: 22, margin: 0, paddingTop: 2 }}/>
              <IconButton icon={'check-decagram'} size={22} iconColor={item.isInstall ? colors.tertiary : colors.secondary} style={{ margin: 0, paddingTop: 2 }}/>
              {/* <Icon name={'basket-check'} type='material-community' size={22} color={colors.tertiary} style={{ paddingBottom: 3 }}/> */}
              {/* <Icon name={'check-decagram' } type='material-community' size={22}
                    color={ item.isInstall ? colors.tertiary : colors.secondary} /> */}
            </View>
          }
          title={String(item.namePart)}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
          subtitle={item.isInstall ? 'установлено' : 'не установлено'}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
        />
        {/* <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {String(new Date(item.dateFuel).toLocaleDateString())}
            </ListItem.Title> */}
        {/* <ListItem.Subtitle style={{ fontSize: 14, color: colors.onSurface }}>
              {item.StationFuel}
            </ListItem.Subtitle> */}

        <Card.Title
          style={{ flex: 2.3 }}

          title={String(new Date(item.dateBuy).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}
          subtitle = {(item.dateInstall != null)
            ? String(new Date(item.dateInstall).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))
            : null}

          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.2 }}
          title={` ${item.quantityPart} х ${item.amountCostPart}`}
          subtitle={(item.mileageInstall != null) ? String(item.mileageInstall) : null}
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
                         dispatch(delStateCarReducer({type:'parts', numberCar: carId, id: item.id }))
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
