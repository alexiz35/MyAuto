import { StyleSheet, View } from 'react-native'
import { StateFuel } from '../../type'
import { Card, IconButton, Menu } from 'react-native-paper'
import { JSX, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useAppTheme } from '../../CommonComponents/Theme'
import { delStateCarReducer } from '../Redux/CarsSlice'
import { useTranslation } from 'react-i18next'

interface propsRowFuel {
  handlePress: (item: StateFuel) => void
  item: StateFuel
}

export const RenderRowFuel = ({ item, handlePress }: propsRowFuel): JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
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
        onPress={() => { handlePress(item) }}
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

        <Card.Title
          style={{ flex: 2.3 }}

          title={`${String(item.volumeFuel)} ${t('L')}`}
          subtitle = {`${String(item.CostFuel)} ${t('CURRENCY_L')}`}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.2 }}
          title={`${String(item.AmountFuel)} ${t('CURRENCY')}`}
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
            <Menu.Item title={t('menu.DELETE')}
                       dense
                       leadingIcon={'delete'}
                       onPress={() => {
                         dispatch(delStateCarReducer({ type: 'fuel', numberCar: carId, id: item.id }))
                         closeMenu()
                       }}
            />
            <Menu.Item title={t('menu.EDIT')}
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
