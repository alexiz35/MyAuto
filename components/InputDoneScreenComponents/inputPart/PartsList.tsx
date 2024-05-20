import { FlatList } from 'react-native'
import { getIndexCar, StatePart } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowPart } from './PartRow'

interface handleProp {
  handlePress: (item: StatePart) => void
  filterList: string

}

export const PartsList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listParts = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].parts)
  console.log('parts', listParts)

  const [isSortParts, setIsSortParts] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  /* const renderRow: ListRenderItem<StatePart> = ({ item }: { item: StatePart }) => {
    return (
      <View style={styles.listItem}>
        <Surface elevation={1} >

        <ListItem.Swipeable
          animation={{ type: 'spring' }}
          containerStyle={{ padding: 5, height: 70, backgroundColor: theme.colors.surface }}
          style={{ }}
          Component={TouchableHighlight}

          onPress={() => handlePress(item)}
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
          <ListItem.Content style={{ flex: 0.5 }}>
          <Icon name={'basket-check'} type='material-community' size={22} color={theme.colors.tertiary} style={{ paddingBottom: 3 }}/>
          <Icon name={'check-decagram' } type='material-community' size={22}
                  color={ item.isInstall ? theme.colors.tertiary : theme.colors.secondary} />
          </ListItem.Content>

          <ListItem.Content style={{ flex: 3 }} >
            <ListItem.Title style={{ paddingBottom: 5, color: theme.colors.onSurface }} lineBreakMode={'tail'} numberOfLines={1}>
              {/!* {String(new Date(item.dateBuy).toLocaleDateString())} *!/}
              {String(item.namePart)}
            </ListItem.Title>
           {/!*  <Divider color={theme.colors.tertiary} width={2} inset insetType={'middle'}/> *!/}
            <ListItem.Subtitle style={{ fontSize: 12, color: theme.colors.onSurface }} lineBreakMode={'tail'} numberOfLines={1} >
              {item.isInstall ? 'установлено' : 'не установлено'}
            </ListItem.Subtitle>

          </ListItem.Content>
          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5, fontSize: 12, color: theme.colors.onSurface }} >
              {String(new Date(item.dateBuy).toLocaleDateString())}
            </ListItem.Title>

            <ListItem.Subtitle style={{ fontSize: 12, color: theme.colors.onSurface }}>
              {(item.dateInstall != null) ? String(new Date(item.dateInstall).toLocaleDateString()) : null}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5, fontSize: 12, color: theme.colors.onSurface }}>
              {item.quantityPart} х {item.amountCostPart}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 12, color: theme.colors.onSurface }}>
              {(item.mileageInstall != null) ? String(item.mileageInstall) : null}

            </ListItem.Subtitle>
          </ListItem.Content>

         {/!*  <ListItem.Content style={{ flex: 1 }}>
            <ListItem.Title style={{ fontSize: 14 }}>
              {item.amountCostPart}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14 }}>
              {item.costPart} грн
            </ListItem.Subtitle>
          </ListItem.Content> *!/}

        </ListItem.Swipeable>

        </Surface>
      </View>
    )
  } */

  /* useEffect(() => {
    if (listParts.length > 1) {
      listParts.sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
      })
      setIsSortParts(!isSortParts)
    }
  }, [listParts]) */

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
  }, [filterList])

  const filter = (): StatePart[] => {
    switch (filterList) {
      case 'last': return listParts.slice(0, 3)
      case 'ten': return listParts.slice(0, 10)
      default: return listParts
    }
  }

  return (
    <>

    { isLoad
      ? <BusyIndicator />
      : <FlatList
        data={filter()}
        extraData={isSortParts}
        renderItem={({ item }) => <RenderRowPart handlePress={handlePress} item={item}/>}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => (
          {
            length: 70,
            offset: 70 * index,
            index
          }
        )}
        initialNumToRender={6}
        />
    }
    </>
  )
}
