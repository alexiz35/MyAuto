import { Alert, StyleSheet, View } from 'react-native'
import { Card, Divider, IconButton, List, Menu } from 'react-native-paper'
import { JSX, useEffect, useState } from 'react'
import { getIndexCar, StateTask } from '../../type'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { delStateCarReducer } from '../Redux/CarsSlice'
import { useAppTheme } from '../../CommonComponents/Theme'

interface propsRowTask {
  handlePress: (item: StateTask) => void
  item: StateTask
}

export const RenderRowTask = ({ item, handlePress }: propsRowTask): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const currentMileage = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].currentMiles)
  const [leftMileageState, setLeftMileageState] = useState<number | undefined>()
  const [leftDayState, setLeftDayState] = useState<number | undefined>()
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [styleBorder, setStyleBorder] = useState({
    width: 0,
    color: ''
  })
  const [icon, setIcon] = useState('basket-check')
  const { colors } = useAppTheme()

  const dayOrMonth = (day: number): string => {
    if (day <= 30) return `${String(day)}дней`
    else return `${String(Math.round(day / 30))} мес`
  }

  const checkBorder = () => {
    if (item.isFinished) {
      setStyleBorder({
        width: 2,
        color: colors.tertiary
      })
      setLeftMileageState(undefined)
      setLeftDayState(undefined)
    } else {
      if (item.milesEndTask !== undefined) {
        const leftMileage = item.milesEndTask - currentMileage.currentMileage
        const leftDay = Math.round((Number(new Date(item.dateEndTask)) - Date.now()) / (1000 * 3600 * 24))
        setLeftMileageState(leftMileage <= 0 ? 0 : leftMileage)
        setLeftDayState(leftDay <= 0 ? 0 : leftDay)
        if (leftMileage <= 0 || leftDay <= 0) {
          setStyleBorder({ width: 2, color: colors.error })
        } else if (leftMileage <= 100 || leftDay <= 30) {
          setStyleBorder({ width: 2, color: colors.yellow })
        } else {
          setStyleBorder({ width: 0, color: '' })
        }
      }
    }
  }

  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }

  const pressDel = () => {
    Alert.alert('Удалить задачу?', 'Задача будет полностью удалена', [
      {
        text: 'Cancel',
        // ***
        onPress: () => { closeMenu() },
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(delStateCarReducer({ type: 'tasks', numberCar: carId, id: item.id }))
          closeMenu()
        }
      }
    ])
  }

  useEffect(() => {
    checkBorder()
  }, [])

  useEffect(() => {
    typeIcon()
  }, [])
  const typeIcon = (): void => {
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
        style={{ borderRadius: 5, borderWidth: styleBorder.width, borderColor: styleBorder.color }}

        onPress={() => { handlePress(item) }}
      >
        <List.Item title={String(item.name)}
                   titleEllipsizeMode={'tail'}
                   left={() => <List.Icon icon={icon} color={colors.tertiary} />}
                   right={() => <View style={{ justifyContent: 'flex-start' }}>
                     <Menu

                       anchor={
                         <IconButton icon={'dots-vertical'} size={24} style={{ margin: 0, alignItems: 'flex-end', height: 20 }} onPress={openMenu}/>
                       }
                       visible={visibleMenu}
                       onDismiss={closeMenu}
                     >
                       <Menu.Item title={'delete'}
                                  dense
                                  leadingIcon={'delete'}
                                  onPress={pressDel}
                       />
                       <Menu.Item title={'edit'}
                                  onPress={() => {
                                    handlePress(item)
                                  }}
                                  dense
                                  leadingIcon={'file-document-edit'}
                       />
                     </Menu>
                   </View>}
                   style={{ paddingHorizontal: 10, paddingVertical: 2 }}
                   contentStyle={{ }}
        />
        <Divider bold/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <List.Item title={`До пробега: ${(item.milesEndTask != null) ? String(item.milesEndTask) : null} km`}
                   style={{ paddingHorizontal: 0, paddingVertical: 2 }} titleStyle={{ fontSize: 13 }}
                   description={leftMileageState !== undefined
                     ? `Осталось: ${String(leftMileageState)} km`
                     : ''
                   }
                   descriptionStyle={{ fontSize: 12 }}
        />
        <List.Item title={`До даты: ${String(new Date(item.dateEndTask).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}`}
                   style={{ paddingHorizontal: 0, paddingVertical: 2 }} titleStyle={{ fontSize: 13 }}
                   description={leftDayState !== undefined
                     ? `Осталось: ${dayOrMonth(leftDayState)}`
                     : ''
                   }
                   descriptionStyle={{ fontSize: 12 }}
        />
        </View>
        <List.Item title={`Стоимость: ${String(item.amount)} грн`} titleStyle={{ fontSize: 13 }} style={{ paddingTop: 0, paddingBottom: 5 }}/>

      </Card>

    </View>

  )
}
const styles = StyleSheet.create({
  listItem: {
    /* paddingRight: 0, */
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1
  }
})
