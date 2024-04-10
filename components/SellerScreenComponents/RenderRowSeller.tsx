import { Seller } from '../../type'
import { useAppDispatch } from '../Redux/hook'
import { JSX, useState } from 'react'
import { useAppTheme } from '../../CommonComponents/Theme'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Menu } from 'react-native-paper'
import { deletedSeller } from '../Redux/SellerSlice'
import { useTranslation } from 'react-i18next'

interface propsRowSeller {
  handlePress: (item: Seller) => void
  editPress: (item: Seller) => void
  item: Seller
}

export const RenderRowSeller = ({ item, handlePress, editPress }: propsRowSeller): JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const formString = (item: any): string => {
    if (item === undefined || item === null) return ''
    else if (typeof item === 'number') return String(item)
    else return item
  }
  const [visibleMenu, setVisibleMenu] = useState(false)
  const { colors } = useAppTheme()

  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }
  /*
  useEffect(() => {
    setItemRow(formItem(item))
    console.log('render', itemRow)
  }, [item]) */

  return (

    <View style={styles.listItem}>

      <Card
        style={{ height: 40, borderRadius: 5 }}
        contentStyle={{ flexDirection: 'row' }}
        onPress={() => { handlePress(item) }}
      >

        <Card.Title
          style={{ flex: 3.6, paddingLeft: 2, minHeight: 20 }}
          leftStyle={{ marginRight: 2 }}
          left={(props) =>
            <Icon {...props} source={item.type === 'seller' ? 'car-cog' : 'car-wrench'} size={22} color={colors.tertiary} />
          }
          title={formString(item.name)}
          titleStyle={{ paddingRight: 2, textAlignVertical: 'center' }}
          subtitleStyle={{ paddingRight: 2 }}
          /* subtitle={item.StationFuel} */
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

          title={formString(item.phone)}
          /* subtitle = {String(item.CostFuel) + ' грн/л'} */
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.2 }}
          title={formString(item.specialism)}
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
                         dispatch(deletedSeller(item.id))
                         closeMenu()
                       }}
            />
            <Menu.Item title={t('menu.EDIT')}
                       onPress={() => {
                         editPress(item)
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
    height: 40,
    paddingRight: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1
  }
})
