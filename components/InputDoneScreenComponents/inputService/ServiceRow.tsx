import { StyleSheet, View } from 'react-native'
import { StateService } from '../../../type'
import { Card, IconButton, Menu, ProgressBar } from 'react-native-paper'
import { JSX, useEffect, useState } from 'react'
import { delService } from '../../Redux/actions'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { delStateCarReducer } from '../../Redux/CarsSlice'

interface propsRowService {
  handlePress: (item: StateService) => void
  item: StateService
}

export const RenderRowService = ({ item, handlePress }: propsRowService): JSX.Element => {
  const { colors } = useAppTheme()

  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const state = useAppSelector((state) => state.cars[state.numberCar])

  const [visibleMenu, setVisibleMenu] = useState(false)
  const [progress, setProgress] = useState(0)
  const [colorProgress, setColorProgress] = useState(colors.tertiary)

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
    calcColor()
  }, [progress])

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
        /* bottomDivider
        topDivider */
        /* leftContent={() => (
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
            /!* onPress={() => { nav() }} *!/
          />
        )} */
        /* rightContent={() => (
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
              dispatch(delFuel(carId, item.id))
            }}
          />
        )} */

        onPress={() => handlePress(item)}
      >

        <Card.Title
          style={{ flex: 3.6, paddingLeft: 0 }}
          leftStyle={{ marginRight: 2 }}
          left={(props) =>
            <>
              <IconButton {...props} icon={'car-cog'} size={22} iconColor={colors.tertiary}/>
              {/* <Icon name={'car-cog'} type='material-community' size={22} color={colors.tertiary} style={{ paddingBottom: 3 }}/> */}
            {/*   <Icon name={'check-decagram' } type='material-community' size={22}
                    color={ item.isInstall ? colors.tertiary : colors.secondary} /> */}
            </>
          }
          title={String(item.typeService.nameService)}
          titleStyle={{ paddingRight: 2, paddingTop: 4 }}
          subtitleStyle={{ paddingRight: 2 }}
          /* subtitle={() => <ProgressBar progress={0.5}/>} */
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
        />
        {/* <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {String(new Date(item.dateFuel).toLocaleDateString())}
            </ListItem.Title> */}
        {/* <ListItem.Subtitle style={{ fontSize: 14, color: colors.onSurface }}>
              {item.StationFuel}
            </ListItem.Subtitle> */}

        <Card.Title
          style={{ flex: 2.3 }}

          title={String(new Date(item.startDate).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}
          subtitle = {(item.endData != null)
            ? String(new Date(item.endData).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))
            : null}

          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.3 }}
          title={`${String(item.startKm)} km`}
          subtitle={`${String(item.endKm)} km`}
          titleVariant={'bodyMedium'}
          subtitleVariant={'bodyMedium'}
          titleStyle={{ paddingRight: 1, paddingLeft: 1 }}
          subtitleStyle={{ paddingRight: 1 }}
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
                         dispatch(delStateCarReducer({type:'services',numberCar:carId,id: item.id}))
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
      <ProgressBar progress={progress} color={colorProgress}/>
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
