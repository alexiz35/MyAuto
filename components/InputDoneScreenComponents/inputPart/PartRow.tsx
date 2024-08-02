import { StyleSheet, View } from 'react-native'
import { StatePart } from '../../../type'
import { Card, Checkbox, IconButton, Menu, Surface, Text, TextInput, useTheme } from 'react-native-paper'
import { JSX, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { dateInstallPart, delStateCarReducer, installPart } from '../../Redux/CarsSlice'
import { useTranslation } from 'react-i18next'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { deleteDirectory } from '../../docsPanel/functionFS'

interface propsRowPart {
  handlePress: (item: StatePart) => void
  item: StatePart
}

export const RenderRowPart = ({ item, handlePress }: propsRowPart): JSX.Element => {
  const dispatch = useAppDispatch()
  const carId = useAppSelector(state => state.numberCar)
  const { t } = useTranslation()

  const [visibleMenu, setVisibleMenu] = useState(false)
  const { colors } = useTheme()

  // ----------------------------- dateInstall -----------------------------------------------------------------
  const pickDate = (date: Date | undefined = new Date()) => {
    dispatch(dateInstallPart({ numberCar: carId, date, item }))
  }

  const dateInstallPress = () => {
    DateTimePickerAndroid.open({
      value: item.dateInstall === undefined ? new Date() : new Date(item.dateInstall),
      onChange: (event, date) => {
        if (event.type === 'set') pickDate(date)
      }
    })
  }

  const installPress = () => {
    dispatch(installPart({ numberCar: carId, isInstall: !item.isInstall, item }))
  }

  // -------------------------------------------------------------------------------------------------------------
  const openMenu = (): void => {
    setVisibleMenu(true)
  }
  const closeMenu = (): void => {
    setVisibleMenu(false)
  }

  return (

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
              <IconButton {...props} icon={'basket-check'} size={22} iconColor={colors.tertiary} style={{ height: 22, margin: 0, paddingTop: 2 }}/>
              <IconButton
                icon={'check'} size={22} iconColor={item.isInstall ? colors.tertiary : colors.surfaceDisabled}
                style={{ margin: 0, paddingTop: 2 }}
                onPress={() => { installPress() }}
              />
            </View>
          }
          title={String(item.namePart)}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
          subtitle={<Text style={{ fontSize: 12 }} onPress={() => { installPress() }}>{item.isInstall ? t('inputPart.INSTALLED') : t('inputPart.NOT_INSTALLED')}</Text>}
          titleVariant={'bodyMedium'}
          /* subtitleVariant={'bodySmall'} */
        />
        {/* <ListItem.Title style={{ fontSize: 14, color: colors.onSurface }}>
              {String(new Date(item.dateFuel).toLocaleDateString())}
            </ListItem.Title> */}
        {/* <ListItem.Subtitle style={{ fontSize: 14, color: colors.onSurface }}>
              {item.StationFuel}
            </ListItem.Subtitle> */}

        <Card.Title
          style={{ flex: 2.3 }}

          title={String(new Date(item.dateBuy).toLocaleDateString('ru', { day: '2-digit', month: '2-digit', year: '2-digit' }))}
          subtitle = {<Text style={{ color: !item.isInstall ? colors.surfaceDisabled : colors.onBackground }} onPress={dateInstallPress} disabled={!item.isInstall}>
            {(item.dateInstall != null)
              ? String(new Date(item.dateInstall).toLocaleDateString('ru', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              }))
              : String(new Date(item.dateBuy).toLocaleDateString('ru', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              }))
            }
          </Text>
        }

          titleVariant={'bodyMedium'}
          subtitleVariant={'bodySmall'}
          titleStyle={{ paddingRight: 2 }}
          subtitleStyle={{ paddingRight: 2 }}
        />

        <Card.Title
          style={{ flex: 2.2 }}
          title={`${item.quantityPart} ${t('PCS')} х `}
          subtitle={`${item.costPart} ${t('CURRENCY')}`}
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
            <Menu.Item title={t('menu.DELETE') }
                       dense
                       leadingIcon={'delete'}
                       onPress={() => {
                         dispatch(delStateCarReducer({ type: 'parts', numberCar: carId, id: item.id }))
                         deleteDirectory('Part/', item.id)
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
      {/* <Surface style={{ position: 'absolute', top: 20, left: 35, width: '70%', flexDirection: 'row', justifyContent: 'space-between', elevation: 5 }}>
      <TextInput dense label={'дата установки'} style={{ flex: 1, backgroundColor: colors.surface }}/>
        <IconButton icon={'check-outline'}/>
      </Surface> */}
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
