import { StyleSheet, View } from 'react-native'
import { getIndexCar, StateService } from '../../../type'
import { Card, IconButton, Menu, ProgressBar } from 'react-native-paper'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { delStateCarReducer } from '../../Redux/CarsSlice'
import { transformValueDate } from './InputServiceComponent'
import { useTranslation } from 'react-i18next'

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
  const [progress, setProgress] = useState(0)
  const [colorProgress, setColorProgress] = useState(colors.tertiary)
  const [title, setTitle] = useState('')

  const calcProgress = (): void => {
    if (item.endKm !== undefined && item.startKm !== undefined && item.startKm < item.endKm) {
      const currentProgress = state.currentMiles.currentMileage - item.startKm
      const totalProgress = item.endKm - item.startKm
      if (currentProgress > 0 && totalProgress > 0) {
        setProgress(currentProgress / totalProgress)
      }
    }
  }
  const calcColor = (): void => {
    if (progress > 0.8) setColorProgress(colors.error)
    else if (progress < 0.8 && progress > 0.5) setColorProgress(colors.yellow)
  }

  useEffect(() => {
    calcProgress()
  }, [])

  useEffect(() => {
    calcColor()
  }, [progress])

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
                subtitle = {(item.endData != '')
                  ? String(new Date(item.endData).toLocaleDateString('ru',
                    { day: '2-digit', month: '2-digit', year: '2-digit' }))
                  : ''}
                titleVariant={'bodyMedium'}
                subtitleVariant={'bodyMedium'}
                titleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
                subtitleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
              />
          </View>

          <ProgressBar progress={progress} color={colorProgress}
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
          subtitle={item.endKm != 0 ? `${String(item.endKm)} ${t('KM')}` : ''}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
          subtitleStyle={{ textAlign: 'center', paddingLeft: 0, paddingRight: 0 }}
        />
          </View>
          <ProgressBar progress={progress} color={colorProgress}
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
            <Menu.Item title={'delete'}
                       dense
                       leadingIcon={'delete'}
                       onPress={() => {
                         dispatch(delStateCarReducer({ type: 'services', numberCar: carId, id: item.id }))
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
