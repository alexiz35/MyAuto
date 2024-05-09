import { Alert, StyleSheet, View } from 'react-native'
import { Card, Divider, IconButton, List, Menu } from 'react-native-paper'
import { JSX, useEffect, useState } from 'react'
import { getIndexCar, StateTask } from '../../type'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { delStateCarReducer } from '../Redux/CarsSlice'
import { useAppTheme } from '../../CommonComponents/Theme'
import { useTranslation } from 'react-i18next'

interface propsRowTask {
  handlePress: (item: StateTask) => void
  item: StateTask
}

export const RenderRowTask = ({ item, handlePress }: propsRowTask): JSX.Element => {
  const calcLeftDay = () => {
    const leftDay = Math.round((Number(new Date(item.dateEndTask)) - Date.now()) / (1000 * 3600 * 24))
    if (leftDay < 0) return 0
    else return leftDay
  }
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const carId = useAppSelector(state => state.numberCar)
  const currentMileage = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].currentMiles)
  const [visibleMenu, setVisibleMenu] = useState(false)

  const [leftMileageState, setLeftMileageState] = useState<number | undefined>()
  const [leftDayState, setLeftDayState] = useState<number>(calcLeftDay())
  const [styleBorder, setStyleBorder] = useState({
    width: 0,
    color: ''
  })
  const [icon, setIcon] = useState('basket-check')

  const [titleEndDate, setTitleEndDate] = useState('')
  const [titleLeftDate, setTitleLeftDate] = useState('')

  const dayOrMonth = (day: number): string => {
    if (day <= 30) return `${String(day)} ${t('DAYS')}`
    else return `${String(Math.round(day / 30))} ${t('MONTHS')}`
  }

  const checkBorder = () => {
    if (item.isFinished) {
      setStyleBorder({
        width: 2,
        color: colors.tertiary
      })
      setLeftMileageState(undefined)
    } else {
      if (item.milesEndTask !== undefined && item.milesEndTask !== 0) {
        const leftMileage = item.milesEndTask - currentMileage.currentMileage
        setLeftMileageState(leftMileage <= 0 ? 0 : leftMileage)
        if (leftMileage <= 0) {
          setStyleBorder({ width: 2, color: colors.error })
        } else if (leftMileage <= 100) {
          if (item.dateEndTask !== '' && item.dateEndTask !== undefined) {
            if (leftDayState <= 0) {
              setStyleBorder({ width: 2, color: colors.error })
              return
            }
          }
          setStyleBorder({ width: 2, color: colors.yellow })
        } else {
          if (item.dateEndTask !== '' && item.dateEndTask !== undefined) {
            if (leftDayState <= 0) {
              setStyleBorder({ width: 2, color: colors.error })
              return
            } else if (leftDayState <= 30) {
              setStyleBorder({ width: 2, color: colors.yellow })
              return
            }
          }
          setStyleBorder({ width: 0, color: '' })
        }
      } else if (item.dateEndTask !== '' && item.dateEndTask !== undefined) {
        if (leftDayState <= 0) {
          setStyleBorder({ width: 2, color: colors.error })
        } else if (leftDayState <= 30) {
          setStyleBorder({ width: 2, color: colors.yellow })
        } else setStyleBorder({ width: 0, color: '' })
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
    Alert.alert(t('taskScreen.DEL_TASK'), t('taskScreen.WILL_DEL_TASK'), [
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
    if (item.dateEndTask === '') {
      setTitleEndDate(`${t('UNTIL')}: --//--`)
      setTitleLeftDate(t('NOT_TRACKED'))
    } else {
      setTitleEndDate(`${t('UNTIL')}: ${new Date(item.dateEndTask).toLocaleDateString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      })}`)
      setTitleLeftDate(`${t('LEFT')}: ${dayOrMonth(leftDayState)}`)
    }
  }, [])

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
                       <Menu.Item title={t('menu.DELETE')}
                                  dense
                                  leadingIcon={'delete'}
                                  onPress={pressDel}
                       />
                       <Menu.Item title={t('menu.EDIT')}
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
        <List.Item title={`${t('taskScreen.UNTIL_MILEAGE')}: ${(item.milesEndTask != null) ? String(item.milesEndTask) : null} ${t('KM')}`}
                   style={{ paddingHorizontal: 0, paddingVertical: 2 }} titleStyle={{ fontSize: 13 }}
                   description={leftMileageState !== undefined
                     ? `${t('LEFT')}: ${String(leftMileageState)} ${t('KM')}`
                     : ''
                   }
                   descriptionStyle={{ fontSize: 12 }}
        />
        <List.Item
          title={titleEndDate}
          style={{ paddingHorizontal: 0, paddingVertical: 2 }} titleStyle={{ fontSize: 13 }}
          description={titleLeftDate}
          descriptionStyle={{ fontSize: 12 }}
        />
        </View>
        <List.Item title={`${t('TOTAL_COST')}: ${String(item.amount)} ${t('CURRENCY')}`} titleStyle={{ fontSize: 13 }} style={{ paddingTop: 0, paddingBottom: 5 }}/>

      </Card>

    </View>

  )
}
const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 5,
    marginVertical: 5,
    flex: 1
  }
})
