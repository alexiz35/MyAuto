import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Menu, useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { StateTask } from '../../type'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { delTask } from '../Redux/actions'

interface propsRowTask {
  handlePress: (item: StateTask) => void
  item: StateTask
}

export const RenderRowTask = ({ item, handlePress }: propsRowTask): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)

  const [visibleMenu, setVisibleMenu] = useState(false)
  const [icon, setIcon] = useState('basket-check')
  const { colors } = useTheme()

  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }

  useEffect(() => {
    typeIcon()
  }, [])
  const typeIcon = () => {
    if (item.typeTask !== undefined) {
      switch (item.typeTask) {
        case 'part':
          setIcon('car-cog')
          break
        case 'service':
          setIcon('car-wrench')
          break
        case 'other':
          setIcon('car-clock')
          break
      }
    }
  }

  return (

    <View style={styles.listItem}>

      <Card
        style={{ height: 70, borderRadius: 5 }}
        contentStyle={{ flexDirection: 'row' }}

        onPress={() => handlePress(item)}
      >

        <Card.Title
          style={{ flex: 3.6, paddingLeft: 0 }}
          leftStyle={{ marginRight: 2, padding: 0 }}
          left={(props) =>
            <View style={{ alignItems: 'center' }}>
              <IconButton {...props} icon={icon} size={22} iconColor={colors.tertiary} style={{ height: 22, margin: 0, paddingTop: 2 }}/>
              <IconButton icon={'check-decagram'} size={22} iconColor={visibleMenu ? colors.tertiary : colors.secondary} style={{ margin: 0, paddingTop: 2 }}/>
              {/* <Icon name={'basket-check'} type='material-community' size={22} color={colors.tertiary} style={{ paddingBottom: 3 }}/> */}
              {/* <Icon name={'check-decagram' } type='material-community' size={22}
                    color={ item.isInstall ? colors.tertiary : colors.secondary} /> */}
            </View>
          }
          title={String(item.name)}
          subtitle={item.isFinished ? 'установлено' : 'не установлено'}

          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
        />

        <Card.Title
          style={{ flex: 2.3 }}
          title={String(new Date(item.dateEndTask).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}
          subtitle={(item.milesEndTask != null) ? String(item.milesEndTask) : null}

          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.2 }}
          title={`${String(item.amount)} грн`}
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
                         dispatch(delTask(carId, item.id))
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
