import { FlatList } from 'react-native'
import { StateOther } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowOther } from './OtherRow'

interface handleProp {
  handlePress: (item: StateOther) => void
  filterList: string
}

export const OthersList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listOthers = useAppSelector(state => state.cars[0].others)
  const [isSortOthers, setIsSortOthers] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  /* const renderRow: ListRenderItem<StateOther> = ({ item }: { item: StateOther }) => {
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
                dispatch(delOther(carId, item.id))
              }}
            />
          )}
          bottomDivider
          topDivider
        >
          <ListItem.Content style={{ flex: 0.5 }}>
          <Icon name={'basket-check'} type='material-community' size={22} color={theme.colors.success} style={{ paddingBottom: 3 }}/>
          {/!* <Icon name={'check-decagram' } type='material-community' size={22}
                  color={ item.isInstall ? theme.colors.success : theme.colors.grey0} /> *!/}
          </ListItem.Content>

          <ListItem.Content style={{ flex: 3 }} >
            <ListItem.Title style={{ paddingBottom: 5 }} >
              {/!* {String(new Date(item.dateBuy).toLocaleDateString())} *!/}
              {String(item.nameOther)}
            </ListItem.Title>
            <Divider color={theme.colors.success} width={2} inset insetType={'middle'}/>
            <ListItem.Subtitle style={{ fontSize: 12 }} lineBreakMode={'tail'} numberOfLines={1} >
              {String(item.seller?.name)}
            </ListItem.Subtitle>

          </ListItem.Content>
          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5 }} >
              {String(new Date(item.dateBuy).toLocaleDateString())}
            </ListItem.Title>

            {/!* <ListItem.Subtitle style={{ fontSize: 12 }}>
              {(item.dateInstall != null) ? String(new Date(item.dateInstall).toLocaleDateString()) : null}
            </ListItem.Subtitle> *!/}
          </ListItem.Content>

          <ListItem.Content style={{ flex: 1.5 }}>
            <ListItem.Title style={{ paddingBottom: 5 }}>
              {item.amountCostPart}
            </ListItem.Title>
           {/!*  <ListItem.Subtitle style={{ fontSize: 12 }}>
              {(item.mileageInstall != null) ? String(item.mileageInstall) : null}
            </ListItem.Subtitle> *!/}
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

        </Shadow>
      </View>
    )
  }
 */

  useEffect(() => {
    if (listOthers.length > 1) {
      listOthers.sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
      })
      setIsSortOthers(!isSortOthers)
    }
  }, [listOthers])

  useEffect(() => {
    setTimeout(() => setIsLoad(false), 10)
    return setIsLoad(true)
  }, [filterList])

  const filter = (): StateOther[] => {
    switch (filterList) {
      case 'last': return listOthers.slice(0, 3)
      case 'ten': return listOthers.slice(0, 10)
      default: return listOthers
    }
  }

  return (
    <>

      {isLoad
        ? <BusyIndicator />
        : <FlatList
          data={filter()}
          extraData={isSortOthers}
          renderItem={({ item }) =>
            <RenderRowOther handlePress={handlePress} item={item}/>}
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
