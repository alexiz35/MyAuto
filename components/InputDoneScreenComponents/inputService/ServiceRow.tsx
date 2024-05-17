import { StyleSheet, View } from 'react-native'
import { getIndexCar, StateService } from '../../../type'
import { Card, IconButton, Menu, ProgressBar } from 'react-native-paper'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { delStateCarReducer } from '../../Redux/CarsSlice'
import { useTranslation } from 'react-i18next'
import { deleteEvent } from '../CalendarFunction'
import Toast from 'react-native-toast-message'

interface propsRowService {
  handlePress: (item: StateService) => void
  item: StateService
}

export const RenderRowService = ({ item, handlePress }: propsRowService): JSX.Element => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, carId)])

  const [visibleMenu, setVisibleMenu] = useState(false)
  const [progressMileage, setProgressMileage] = useState(0)
  const [progressDate, setProgressDate] = useState(0)
  const [colorProgressMileage, setColorProgressMileage] = useState(colors.tertiary)
  const [colorProgressDate, setColorProgressDate] = useState(colors.tertiary)
  const [title, setTitle] = useState('')

  const calcProgress = (): void => {
    if (item.endKm !== undefined && item.startKm !== undefined && item.startKm < item.endKm) {
      const currentProgress = state.currentMiles.currentMileage - item.startKm
      const totalProgress = item.endKm - item.startKm
      if (currentProgress > 0 && totalProgress > 0) {
        setProgressMileage(currentProgress / totalProgress)
      }
    }
    if (item.endData !== undefined && item.startDate !== undefined && item.endData !== '') {
      const currentProgress = (Number(Date.now() - Number(new Date(item.startDate)))) / (1000 * 3600 * 24)
      const totalProgress = (Number(new Date(item.endData)) - Number(new Date(item.startDate))) / (1000 * 3600 * 24)
      if (currentProgress > 0 && totalProgress > 0) {
        setProgressDate(currentProgress / totalProgress)
      }
    }
  }
  const calcColor = (): void => {
    if (progressMileage > 0.8) setColorProgressMileage(colors.error)
    else if (progressMileage < 0.8 && progressMileage > 0.5) setColorProgressMileage(colors.yellow)
    else setColorProgressMileage(colors.tertiary)

    if (progressDate > 0.8) setColorProgressDate(colors.error)
    else if (progressDate < 0.8 && progressDate > 0.5) setColorProgressDate(colors.yellow)
    else setColorProgressDate(colors.tertiary)
  }

  useEffect(() => {
    calcProgress()
  }, [])

  useEffect(() => {
    calcColor()
  }, [progressMileage, progressDate])

  useEffect(() => {
    if (item.title === '' || item.title === undefined) {
      if (item.typeService?.nameService !== '' || item.typeService?.nameService !== undefined) {
        setTitle(String(item.typeService.nameService))
      } else setTitle('')
    } else setTitle(String(item.title))
  }, [])

  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }

  const deleteEventWithService = () => {
    if (item?.calendarEventId !== '' && item?.calendarEventId !== undefined) {
      console.log('DELETE', item.calendarEventId)
      // delete event
      deleteEvent(item?.calendarEventId)
        .then(value => {
          Toast.show({
            type: 'info',
            text1: t('calendar.DELETE_EVENT'),
            visibilityTime: 5000,
            topOffset: 150
            /* text2: 'This is some something 👋' */
          })
        })
        .catch(reason => {
          Toast.show({
            type: 'error',
            text1: t('calendar.ERROR_DELETE_EVENT'),
            visibilityTime: 5000,
            topOffset: 150,
            text2: reason.message
          })
        })
    }
  }

  return (
<View>
    <View style={styles.listItem}>

      <Card
        style={{ height: 70, borderRadius: 5 }}
        contentStyle={{ flexDirection: 'row' }}
        onPress={() => { handlePress(item) }}
      >

        <Card.Title
          style={{ flex: 3.6, paddingLeft: 0 }}
          leftStyle={{ marginRight: 2, padding: 0 }}
          left={(props) =>
            <View style={{ alignItems: 'center' }}>
              <IconButton {...props} icon={'car-cog'} size={22} iconColor={colors.tertiary}/>
            </View>
          }
          title={title}
          titleNumberOfLines={2}
          titleStyle={{ paddingRight: 2, paddingTop: 4 }}
          subtitleStyle={{ paddingRight: 2 }}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
        />

        <View style={{
          flex: 2.3,
          height: 70,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.backdrop
        }}>
          <View>
              <Card.Title
                style={{ height: 65, paddingLeft: 0, paddingRight: 0 }}
                title={String(new Date(item.startDate).toLocaleDateString('ru',
                  { day: '2-digit', month: '2-digit', year: '2-digit' }))}
                subtitle = {(item.endData !== '')
                  ? String(new Date(item.endData).toLocaleDateString('ru',
                    { day: '2-digit', month: '2-digit', year: '2-digit' }))
                  : ''}
                titleVariant={'bodyMedium'}
                subtitleVariant={'bodyMedium'}
                titleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
                subtitleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
              />
          </View>

          <ProgressBar progress={progressDate} color={colorProgressDate}
                       style={{
                         marginBottom: 0,
                         marginHorizontal: 5,
                         height: 5
                       }}
          />
        </View>
        <View style={{
          flex: 2.3,
          height: 70,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.backdrop
        }}>
          <View>
        <Card.Title
          style={{ height: 65, paddingLeft: 0, paddingRight: 0 }}
          title={`${String(item.startKm)} ${t('KM')}`}
          subtitle={item.endKm !== 0 ? `${String(item.endKm)} ${t('KM')}` : ''}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
          subtitleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
        />
          </View>
          <ProgressBar progress={progressMileage} color={colorProgressMileage}
                       style={{
                         marginBottom: 0,
                         marginHorizontal: 5,
                         height: 5
                       }}
          />
          </View>
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
                         deleteEventWithService()
                         dispatch(delStateCarReducer({ type: 'services', numberCar: carId, id: item.id }))
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
