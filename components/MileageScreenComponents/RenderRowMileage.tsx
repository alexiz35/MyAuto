import { CurrentMiles } from '../../type'
import { JSX, useState } from 'react'
import { useAppTheme } from '../../CommonComponents/Theme'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, IconButton, Menu } from 'react-native-paper'

interface propsRowMileage {
  handlePress: (item: CurrentMiles) => void
  editPress: (item: CurrentMiles) => void
  delPress: (item: CurrentMiles) => void
  item: CurrentMiles
}

export const RenderRowMileage = ({ item, handlePress, editPress, delPress }: propsRowMileage): JSX.Element => {
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

  return (

    <View style={styles.listItem}>

      <Card
        style={{ height: 40, borderRadius: 5 }}
        contentStyle={{ flexDirection: 'row' }}
        onPress={() => { handlePress(item) }}
      >

        <Card.Title
          style={{ flex: 3.6, paddingLeft: 2, minHeight: 20 }}
          leftStyle={{ paddingHorizontal: 5, marginHorizontal: 5 }}
          left={(props) =>
            <Icon {...props} source={'transit-connection-variant'} size={22} color={colors.tertiary} />
          }
          title={new Date(formString(item.dateMileage)).toLocaleDateString()}
          titleStyle={{ textAlignVertical: 'center' }}
          titleVariant={'bodyMedium'}
        />

        <Card.Title
          style={{ flex: 2.3, minHeight: 20 }}
          title={formString(item.currentMileage) + ' km'}
          titleVariant={'bodyMedium'}
          titleStyle={{ textAlignVertical: 'center' }}
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
                         delPress(item)
                         closeMenu()
                       }}
            />
            <Menu.Item title={'edit'}
                       onPress={() => {
                         editPress(item)
                         closeMenu()
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
