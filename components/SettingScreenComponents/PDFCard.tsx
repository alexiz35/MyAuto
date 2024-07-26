import { JSX, useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  Divider,
  Icon,
  IconButton,
  Portal,
  Text,
  TouchableRipple
} from 'react-native-paper'
import { View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'
import { printToFile } from '../Print/Print'
import { getIndexCar, initialStateInfo, StateInfo } from '../../type'
import { SelectDateModal, selectTextDate } from '../StatScreenComponents/SelectDateModal'
import { TypePickedDate } from '../StatScreenComponents/TypeStat'
import { initialDate } from '../../screens/StatScreen'
import { TypeReport } from '../Print/FormHTML'

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
  const { t, i18n } = useTranslation()

  const [visibleCheckReport, setVisibleCheckReport] = useState(false)
  const [fullReport, setFullReport] = useState(false)
  const [serviceReport, setServiceReport] = useState(false)
  const [partReport, setPartReport] = useState(false)
  const [otherReport, setOtherReport] = useState(false)
  const [fuelReport, setFuelReport] = useState(false)
  const [dateReport, setDateReport] = useState<undefined | TypePickedDate>()

  // -------------------------------------------------------------------------------------
  const [visiblePickDateModal, setVisiblePickDateModal] = useState(false)
  const toggleVisibleCheckReport = () => {
    setVisibleCheckReport(!visibleCheckReport)
  }
  // -------------------  date select handlers ---------------------------------------
  const dateOk = (date: TypePickedDate) => {
    setVisiblePickDateModal(false)
    setDateReport(date)
    console.log('date', date)
  }
  const dateCancel = () => {
    setVisiblePickDateModal(false)
    setDateReport(undefined)
  }
  // -------------------------------------------------------------------------------------
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
    setVisibleCheckReport(false)
  }
  // -------------------------------------------------------------------------------------

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
  // ------------------------------------------------------------------------
  const formSelectReport = (): TypeReport => {
    return {
      all: fullReport,
      service: serviceReport,
      part: partReport,
      other: otherReport,
      fuel: fuelReport,
      date: dateReport
    }
  }
  const pressCreatePdf = async () => {
    const uri = await printToFile(state, formSelectReport(), t)
    if (uri !== undefined) navigation.navigate('ReportScreen', { uri })
  }

  return (
    <Card style={{ marginVertical: 5 }}>

      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button style={stylesSettingScreen.text} onPress={pressCreatePdf}>
            {t('pdfCard.CREATE_PDF')}
          </Button>
        </View>

        <View style={{ paddingRight: 10 }}>
            <IconButton icon={'file-cog'} mode={'outlined'} size={18} onPress={toggleVisibleCheckReport}/>
        </View>
        <Portal>
          <Dialog visible={visibleCheckReport} onDismiss={toggleVisibleCheckReport} dismissable>
            <Dialog.Title>
              {t('pdfCard.CREATE_PDF')}
            </Dialog.Title>
            <Dialog.Content>
              <Checkbox.Item status={fullReport ? 'checked' : 'unchecked'} label={t('pdfCard.DETAILED_REPORT')} onPress={toggleFullReport} />
              <Checkbox.Item status={serviceReport ? 'checked' : 'unchecked'} label={t('pdfCard.SERVICE')} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('service') }}/>
              <Checkbox.Item status={partReport ? 'checked' : 'unchecked'} label={t('pdfCard.PART')} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('part') }}/>
              <Checkbox.Item status={otherReport ? 'checked' : 'unchecked'} label={t('pdfCard.OTHER')} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('other') }}/>
              <Checkbox.Item status={fuelReport ? 'checked' : 'unchecked'} label={t('pdfCard.FUEL')} disabled={!fullReport}
                             onPress={() => { toggleCheckbox('fuel') }}/>
              <Divider bold/>
              <TouchableRipple onPress={() => { setVisiblePickDateModal(true) }}>
                <Text style={{ paddingVertical: 9, textAlign: 'center', color: colors.primary }}>
                  {dateReport === undefined ? t('pdfCard.ALL_PERIOD') : String(selectTextDate(dateReport, i18n))}
                </Text>
              </TouchableRipple>
              <Portal>
                <Dialog visible={visiblePickDateModal} dismissable onDismiss={() => { setVisiblePickDateModal(false) }}>
                  <SelectDateModal handleOk={dateOk} handleCancel={dateCancel} selectedDate={initialDate}/>
                </Dialog>
              </Portal>
              <Divider bold/>

            </Dialog.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
              <Button onPress={resetSettingReport}>{t('button.RESET')}</Button>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button onPress={cancelSettingReport}>{t('button.CANCEL')}</Button>
              <Button onPress={toggleVisibleCheckReport}>{t('button.OK')}</Button>
              </View>
            </View>
          </Dialog>
        </Portal>
      </View>
    </Card>

  )
}
