import { StyleSheet, Text, View } from 'react-native'
import { JSX, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import WheelPickerSelectDate from './WheelPickerSelectDate'
import WheelPickerSelectDouble, { TypeResultPicker } from './WheelPickerSelectDouble'
import { Dialog, Divider, Button, RadioButton, Portal, Modal } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'
import { getIndexCar } from '../../type'
import { NAME_MONTH_RU, NAME_MONTH_EN, TypePickedDate } from './TypeStat'
import { useTranslation } from 'react-i18next'

interface Props {
  handleOk: (selectModal: TypePickedDate) => void
  handleCancel: () => void
  selectedDate: TypePickedDate
}

export const SelectDateModal = ({ handleOk, handleCancel, selectedDate }: Props): JSX.Element => {
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])
  const { colors } = useAppTheme()
  const { t, i18n } = useTranslation()

  const [checked, setChecked] = useState<'year' | 'month' | 'period' | string >('year')
  const [visibleYear, setVisibleYear] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(false)
  const [visibleStartDate, setVisibleStartDate] = useState(false)
  const [visibleEndDate, setVisibleEndDate] = useState(false)
  const [NAME_MONTH, SET_NAME_MONTH] = useState(i18n.language === 'en' ? NAME_MONTH_EN : NAME_MONTH_RU)

  const [pickedYear, setPickedYear] = useState<string>(selectedDate.valueYear === undefined
    ? String(new Date().getFullYear())
    : selectedDate.valueYear)

  const [pickedMonth, setPickedMonth] = useState<string>(selectedDate.valueMonth === undefined
    ? String(NAME_MONTH[new Date().getMonth()])
    : String(NAME_MONTH[selectedDate.valueMonth])
  )
  const [pickedMonthYear, setPickedMonthYear] = useState<string>(selectedDate.valueYear === undefined
    ? String(new Date().getFullYear())
    : String(selectedDate.valueYear)
  )
  const [pickedStartMonth, setPickedStartMonth] = useState<string>(selectedDate.period.valueStartMonth === undefined
    ? String(NAME_MONTH[new Date().getMonth()])
    : String(NAME_MONTH[selectedDate.period.valueStartMonth])
  )
  const [pickedStartYear, setPickedStartYear] = useState<string>(selectedDate.period.valueStartYear === undefined
    ? String(new Date().getFullYear())
    : String(selectedDate.period.valueStartYear)
  )
  const [pickedEndMonth, setPickedEndMonth] = useState<string>(selectedDate.period.valueEndMonth === undefined
    ? String(NAME_MONTH[new Date().getMonth()])
    : String(NAME_MONTH[selectedDate.period.valueEndMonth])
  )
  const [pickedEndYear, setPickedEndYear] = useState<string>(selectedDate.period.valueEndYear === undefined
    ? String(new Date().getFullYear())
    : String(selectedDate.period.valueEndYear)
  )

  const createListYears = (): string[] => {
    const minYear = new Date(state.info.dateBuy).getFullYear()
    const maxYear = new Date().getFullYear()
    const YEAR = []
    let tempIndex = 0
    for (let i = minYear - 1; i < maxYear + 1; i++) {
      YEAR[tempIndex] = String(i)
      tempIndex++
    }
    return YEAR
  }

  const resultPickerYear = (result: string): void => {
    setPickedYear(result)
    setVisibleYear(false)
  }
  const resultPickerMonth = (result: TypeResultPicker): void => {
    setPickedMonth(result.left)
    setPickedMonthYear(result.right)
    setVisibleMonth(false)
  }
  const resultPickerStartDate = (result: TypeResultPicker): void => {
    setPickedStartMonth(result.left)
    setPickedStartYear(result.right)
    setVisibleStartDate(false)
  }
  const resultPickerEndDate = (result: TypeResultPicker): void => {
    setPickedEndMonth(result.left)
    setPickedEndYear(result.right)

    setVisibleEndDate(false)
  }

  const pressConfirm = (): TypePickedDate => {
    return {
      type: checked,
      valueYear: pickedYear,
      valueMonth: NAME_MONTH.indexOf(pickedMonth),
      valueMonthYear: pickedMonthYear,
      period: {
        valueStartMonth: NAME_MONTH.indexOf(pickedStartMonth),
        valueStartYear: pickedStartYear,
        valueEndMonth: NAME_MONTH.indexOf(pickedEndMonth),
        valueEndYear: pickedEndYear
      }
    }
  }

  return (
    <View>

        <Dialog.Title>{
          t('statScreen.TITLE_SELECT')
        }</Dialog.Title>
        {
          // ------------------------------------ select Year ---------------------------------------------------------
        }
        <Dialog.Content >
          <RadioButton.Group onValueChange={(item) => { setChecked(item) }} value={checked} >
            <View style={styles.viewRowChecked}>
          <RadioButton.Item
            label={t('YEAR')}
            value={'year'}
            position={'leading'}
          />
              <Button onPress={ () => { setVisibleYear(true) }} disabled={checked !== 'year'} mode={'elevated'}>
                <Text>{String(pickedYear)}</Text>
              </Button>
        <Portal>
          <Modal visible={visibleYear} style={{ alignItems: 'center' }} onDismiss={() => { setVisibleYear(false) }}>
            <WheelPickerSelectDate list={createListYears()} handlerEnterPicker={resultPickerYear} initial={pickedYear}/>
          </Modal>
        </Portal>
            </View>
        <Divider bold style={{ marginVertical: 10 }}/>
        {
          // -------------------------------------- select Month -------------------------------------------------------
        }
        <View style={styles.viewRowChecked}>
        <RadioButton.Item
          position={'leading'}
          label={t('MONTH')}
          value={'month'}
        />
          <Button onPress={ () => { setVisibleMonth(true) }} disabled={checked !== 'month'} mode={'elevated'}>
            <Text>{String(pickedMonth)} </Text>
            <Text> {String(pickedMonthYear)}</Text>
          </Button>

        </View>
        <Portal>
          <Modal visible={visibleMonth} style={{ alignItems: 'center' }} onDismiss={() => { setVisibleMonth(false) }}>
            <WheelPickerSelectDouble listLeft={NAME_MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerMonth}
                                     initial={{ left: pickedMonth, right: pickedMonthYear }}/>
          </Modal>
        </Portal>
        <Divider bold style={{ marginVertical: 10 }}/>
        {
          // -------------------------------------- select Period ------------------------------------------------------}
        }
        <View style={styles.viewRowChecked}>
        <RadioButton.Item
          position={'leading'}
          label={t('CUSTOM')}
          value={'period'}
          />
          <View style={{ flexDirection: 'column', gap: 10 }}>
            <Button onPress={() => { setVisibleStartDate(true) }} disabled={checked !== 'period'} mode={'elevated'}>
              {/* <Text>{`с  ${String(pickedStartMonth)}`}</Text> */}
              <Text>{t('statScreen.FROM', { date: String(pickedStartMonth) })}</Text>
              <Text style={{ paddingHorizontal: 2 }}>{` ${String(pickedStartYear)}`}</Text>
            </Button>

            <Button onPress={() => { setVisibleEndDate(true) }} disabled={checked !== 'period'} mode={'elevated'}>
              {/* <Text>{`до ${String(pickedEndMonth)}`}</Text> */}
              <Text>{t('statScreen.TO', { date: String(pickedEndMonth) })}</Text>
              <Text style={{ paddingHorizontal: 2 }}>{` ${String(pickedEndYear)}`}</Text>
            </Button>
          </View>
        </View>
            <Portal>
              <Modal visible={visibleStartDate} style={{ alignItems: 'center' }} onDismiss={() => { setVisibleStartDate(false) }}>
                <WheelPickerSelectDouble listLeft={NAME_MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerStartDate}
                                         initial={{ left: pickedStartMonth, right: pickedStartYear }}/>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={visibleEndDate} style={{ alignItems: 'center' }} onDismiss={() => { setVisibleEndDate(false) }}>
                <WheelPickerSelectDouble listLeft={NAME_MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerEndDate}
                                         initial={{ left: pickedEndMonth, right: pickedEndYear }}/>
              </Modal>
            </Portal>
          </RadioButton.Group>
          <Divider bold style={{ marginTop: 10 }}/>

        </Dialog.Content>

      {
          // -----------------------------------------------------------------------------------------------------------}
        }
        <Dialog.Actions>
          <Button
            textColor={colors.error}
            onPress={() => {
              handleCancel()
            }}
          >CANCEL</Button>
          <Button
            /* title="CONFIRM" */
            onPress={() => {
              handleOk(pressConfirm())
              /*   switch (checked) {
                  case 'year': handleOk({ type: checked, valueYear: pickedYear })
                    break
                  case 'month': handleOk({ type: checked, valueYear: pickedMonthYear, valueMonth: NAME_MONTH.indexOf(pickedMonth) })
                    break
                  case 'period': handleOk({
                    type: checked,
                    period: {
                      valueStartMonth: NAME_MONTH.indexOf(pickedStartMonth),
                      valueStartYear: pickedStartYear,
                      valueEndMonth: NAME_MONTH.indexOf(pickedEndMonth),
                      valueEndYear: pickedEndYear
                    }
                  })
                    break
                  default: break
                }
              } */
            }}
            textColor={colors.tertiary}

          >CONFIRM</Button>

        </Dialog.Actions>
    </View>
  )
}

const styles = StyleSheet.create({
  viewRowChecked: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
