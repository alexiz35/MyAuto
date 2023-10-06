import { StyleSheet, View } from 'react-native'
import { StateOther } from '../../../type'
import { Card, IconButton, Menu } from 'react-native-paper'
import { useState } from 'react'
import { delOther } from '../../Redux/actions'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { useAppTheme } from '../../../CommonComponents/Theme'

interface propsRowPart {
  handlePress: (item: StateOther) => void
  item: StateOther
}

export const RenderRowOther = ({ item, handlePress }: propsRowPart): JSX.Element => {
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
          style={{ flex: 4, paddingLeft: 2 }}
          leftStyle={{ marginRight: 10 }}
          left={(props) =>
            <IconButton {...props} icon={'basket-check'} size={22} iconColor={colors.tertiary} />
          }
          title={String(item.nameOther)}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
          subtitle={String(item.seller?.name)}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
        />

        <Card.Title
          style={{ flex: 2.6 }}

          title={String(new Date(item.dateBuy).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}

          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2 }}
          title={String(item.amountCostOther)}
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
                         dispatch(delOther(carId, item.id))
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
