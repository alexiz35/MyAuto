import { View } from 'react-native'
import { Card, IconButton, List, Menu } from 'react-native-paper'
import { ListService } from '../../type'
import { JSX, useState } from 'react'

interface propsRowMaintenance {
  handlePick: (item: ListService) => void
  handleDelMaintenance: (item: ListService) => void
  item: ListService
}

export const RenderRowMaintenance = ({ item, handlePick, handleDelMaintenance }: propsRowMaintenance): JSX.Element => {
  const [visibleMenu, setVisibleMenu] = useState(false)

  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }

  return (
    <Card
      style={{ borderRadius: 5, margin: 5 }}
      contentStyle={{ flexDirection: 'row' }}
      onPress={() => handlePick(item)}
    >
      <List.Item title={item.nameService} style={{ flex: 2 }}/>
      <List.Item title={item.mileage} style={{ flex: 1 }}/>
      <List.Item title={item.date} style={{ flex: 1 }}/>
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
                       /* dispatch(delService(carId, item.id)) */
                       handleDelMaintenance(item)
                       closeMenu()
                     }}
          />
          <Menu.Item title={'edit'}
                     onPress={() => {
                       handlePick(item)
                       closeMenu()
                     }}

                     dense
                     leadingIcon={'file-document-edit'}
          />
        </Menu>
      </View>

    </Card>
  )
}
