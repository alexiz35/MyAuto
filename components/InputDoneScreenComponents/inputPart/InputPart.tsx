import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { JSX, useEffect, useState } from 'react'
import { StatePart } from '../../../type'

import {
  Checkbox, IconButton,
  List, Menu, RadioButton,
  ToggleButton
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { PartsList } from './PartsList'
import InputPartComponent from './InputPartComponent'
import { addStateCarReducer, editStateCarReducer } from '../../Redux/CarsSlice'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { useTranslation } from 'react-i18next'

const InputPart = (): JSX.Element => {
  const dispatch = useAppDispatch()
  /* const state = useAppSelector((state) => state.cars[state.numberCar]) */
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useAppTheme()
  const nav = useNavigation()
  const { t } = useTranslation()

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditPart, setIsEditPart] = useState(false)
  const [itemPart, setItemPart] = useState<StatePart | undefined>()

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const clearInput = (): void => {
    setIsEditPart(false)
    setItemPart(undefined)
  }

  // ----------------------------------------------------------------------------
  const [visibleFilterInstall, setVisibleFilterInstall] = useState<boolean>(false)
  const [filterInstall, setFilterInstall] = useState<'all' | 'onlyInstall' | 'withoutInstall' | string>('all')

  const checkFilter = (value: 'all' | 'onlyInstall' | 'withoutInstall' | string) => {
    setFilterInstall(value)
    closeMenu()
  }
  const closeMenu = () => {
    setVisibleFilterInstall(false)
  }

  // --------------------------Hide tabBottom when openAccordion-----------------
  useEffect(() => {
    if (openAccordion) nav.setOptions({ tabBarStyle: { display: 'none', backgroundColor: colors.background } })
    else nav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: colors.background } })
  }, [openAccordion])
  // ------------------------- control according -------------------------------
  useEffect(() => {
    const onBackPress = () => {
      if (openAccordion) {
        handleOnPress()
        return true // Перехватываем событие "назад"
      }
      return false // Позволяем событию "назад" выполняться по умолчанию
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress) }
  }, [openAccordion])
  const handleOpen = (item: StatePart): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditPart(true)
    setItemPart(item)
  }

  const handleOnPress = (): void => {
    if (!openAccordion) {
      setIsList(false)
    } else setTimeout(() => { setIsList(true) }, 100)
    setOpenAccordion(!openAccordion)
    clearInput()
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  const handleOk = (dataForm: StatePart): void => {
    setTimeout(() =>
      isEditPart
        ? dispatch(editStateCarReducer({ type: 'parts', numberCar: carId, item: dataForm }))
        : dispatch(addStateCarReducer({ type: 'parts', numberCar: carId, item: dataForm }))
    , 100)
    handleOnPress()
  }

  return (

      <View style={{ flex: 1 }} >

        {
/* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView>
        <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={isEditPart ? t('inputPart.TITLE_ACCORDION_EDIT') : t('inputPart.TITLE_ACCORDION_ADD')}
              /* description={ state.info.fuel } */
              style={{ backgroundColor: colors.secondaryContainer }}
              /* left={props => <List.Icon {...props} icon="car-cog" />} */
              expanded={openAccordion}
              onPress={handleOnPress}
            >

              <InputPartComponent isCancel={handleCancel} isOk={handleOk} part={itemPart} isEdit={isEditPart}/>

            </List.Accordion>
        </ScrollView>
        </KeyboardAvoidingView>
        {
/* ----------------------- List Fuel ---------------------------------------- */
        }

        {isList &&
          <View style={styles.flatList}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ justifyContent: 'flex-start', paddingLeft: 10 }}>
                <Menu
                  anchor={
                    <IconButton icon={'filter-menu'} size={16} style={{ borderWidth: 1, borderRadius: 5, margin: 0 }} onPress={() => { setVisibleFilterInstall(true) }}/>
                  }
                  visible={visibleFilterInstall}
                  anchorPosition={'bottom'}
                  statusBarHeight={2}
                  onDismiss={() => { closeMenu() }}
                >
                  <RadioButton.Group onValueChange={value => { checkFilter(value) }} value={filterInstall} >
                    <RadioButton.Item
                      label={t('inputPart.FILTER_ONLY_INSTALL')}
                      mode={'ios'}
                      position={'leading'}
                      value="onlyInstall"
                      labelStyle={{ textAlign: 'left' }}
                      labelVariant={'bodyMedium'}
                      color={colors.tertiary}
                    />
                    <RadioButton.Item
                      label={t('inputPart.FILTER_WITHOUT_INSTALL')}
                      mode={'ios'}
                      position={'leading'}
                      value="withoutInstall"
                      labelStyle={{ textAlign: 'left' }}
                      labelVariant={'bodyMedium'}
                      color={colors.tertiary}
                    />
                    <RadioButton.Item
                      label={t('inputPart.FILTER_ALL')}
                      mode={'ios'}
                      position={'leading'}
                      value="all"
                      labelStyle={{ textAlign: 'left' }}
                      labelVariant={'bodyMedium'}
                      color={colors.tertiary}
                    />
                  </RadioButton.Group>

                </Menu>
              </View>
            <ToggleButton.Row onValueChange={value => { setDateList(value) }}
                              value={dateList}
                              style={{ alignSelf: 'flex-end', marginVertical: 8 }}
            >
              <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 30 }}/>
              <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 30 }}/>
              <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 30 }}/>
            </ToggleButton.Row>
            </View>
            <PartsList handlePress={handleOpen} filterList={dateList} filterInstall={filterInstall}/>

          </View>
        }
        {
/* -------------------------------------------------------------------------- */
        }
      </View>
  )
}

export default InputPart

const styles = StyleSheet.create({

  flatList: {
    marginTop: 1,
    height: 400
  }
})
