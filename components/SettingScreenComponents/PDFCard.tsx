import { JSX, useEffect, useState } from 'react'
import { Button, Card, Checkbox, Dialog, Divider, Icon, IconButton, Modal, Portal } from 'react-native-paper'
import { Alert, Dimensions, GestureResponderEvent, Platform, View } from 'react-native'
import { deletedAllSeller } from '../Redux/SellerSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'
import { printToFile } from '../Print/Print'
import { getIndexCar, initialStateInfo, StateInfo } from '../../type'
import { SelectDateModal } from '../StatScreenComponents/SelectDateModal'
import { TypePickedDate } from '../StatScreenComponents/TypeStat'
import { initialDate } from '../../screens/StatScreen'

export const PDFCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const infoCar: StateInfo = useAppSelector(state => (
    state.cars[getIndexCar(state.cars, state.numberCar)].info === undefined
      ? initialStateInfo
      : state.cars[getIndexCar(state.cars, state.numberCar)].info
  ))
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])

  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const [visibleCheckReport, setVisibleCheckReport] = useState(false)
  const [fullReport, setFullReport] = useState(false)
  const [serviceReport, setServiceReport] = useState(false)
  const [partReport, setPartReport] = useState(false)
  const [otherReport, setOtherReport] = useState(false)
  const [fuelReport, setFuelReport] = useState(false)
  const [dateReport, setDateReport] = useState<undefined | TypePickedDate>()

  // -------------------------------------------------------------------------------------
  const [visiblePickDateModal, setVisiblePickDateModal] = useState(false)
  const dateOk = (date: TypePickedDate) => {
    setVisiblePickDateModal(false)
    setDateReport(date)
  }
  const dateCancel = () => {
    setVisiblePickDateModal(false)
    setDateReport(undefined)
  }

  const resetSettingReport = () => {
    setDateReport(undefined)
    setServiceReport(false)
    setPartReport(false)
    setOtherReport(false)
    setFuelReport(false)
    setFullReport(false)
  }
  const cancelSettingReport = () => {
    resetSettingReport()
    setVisibleCheckReport()
  }

  // -------------------------------------------------------------------------------------

  const toggleVisibleCheckReport = () => {
    setVisibleCheckReport(!visibleCheckReport)
  }
  const toggleFullReport = () => {
    if (fullReport) {
      setServiceReport(false)
      setPartReport(false)
      setOtherReport(false)
      setFuelReport(false)
    }
    setFullReport(!fullReport)
  }

  const toggleCheckbox = (type: 'service' | 'part' | 'other' | 'fuel') => {
    switch (type) {
      case 'service':setServiceReport(!serviceReport)
        break
      case 'part':setPartReport(!partReport)
        break
      case 'other':setOtherReport(!otherReport)
        break
      case 'fuel':setFuelReport(!fuelReport)
        break
    }
  }

  const pressCreatePdf = async () => {
    const uri = await printToFile(state)
    if (uri !== undefined) navigation.navigate('ReportScreen', { uri })
  }

  return (
    <Card style={{ marginVertical: 5 }}>

      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={stylesSettingScreen.text}
            onPress={ pressCreatePdf}
          >
            Вывод отчета в PDF
          </Button>
        </View>

        <View style={{ paddingRight: 10 }}>
            <IconButton icon={'file-cog'} mode={'outlined'} size={18} onPress={toggleVisibleCheckReport}/>
        </View>
        <Portal>
          <Dialog visible={visibleCheckReport} onDismiss={toggleVisibleCheckReport} dismissable>
            <Dialog.Title>
              Вывод отчета по авто в PDF
            </Dialog.Title>
            <Dialog.Content>
              <Checkbox.Item status={fullReport ? 'checked' : 'unchecked'} label={'Подробный отчет'} onPress={toggleFullReport} />
              <Checkbox.Item status={serviceReport ? 'checked' : 'unchecked'} label={'Выполненные работы'} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('service') }}/>
              <Checkbox.Item status={partReport ? 'checked' : 'unchecked'} label={'Покупка запчастей'} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('part') }}/>
              <Checkbox.Item status={otherReport ? 'checked' : 'unchecked'} label={'Другие затраты'} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('other') }}/>
              <Checkbox.Item status={fuelReport ? 'checked' : 'unchecked'} label={'Заправки'} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('fuel') }}/>
              <Divider bold/>
              <Button mode={'text'} onPress={() => { setVisiblePickDateModal(true) }}>
                {dateReport === undefined ? 'Весь период' : String(dateReport.valueYear)}
              </Button>
              <Portal>
                <Dialog visible={visiblePickDateModal} dismissable onDismiss={() => { setVisiblePickDateModal(false) }}>
                  <SelectDateModal handleOk={dateOk} handleCancel={dateCancel} selectedDate={initialDate}/>
                </Dialog>
              </Portal>
              <Divider bold/>

            </Dialog.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
              <Button onPress={resetSettingReport}>Reset</Button>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button onPress={cancelSettingReport}>Cancel</Button>
              <Button onPress={toggleVisibleCheckReport}>Ok</Button>
              </View>
            </View>
          </Dialog>
        </Portal>
      </View>
    </Card>

  )
}
