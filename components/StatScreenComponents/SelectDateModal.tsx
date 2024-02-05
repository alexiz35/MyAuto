import { StyleSheet, Text, View } from 'react-native'
import { JSX, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import { TypeSelect } from '../../screens/StatScreen'
import WheelPickerSelectDate from './WheelPickerSelectDate'
import WheelPickerSelectDouble, { TypeResultPicker } from './WheelPickerSelectDouble'
import { Dialog, Divider, Button, RadioButton, Portal, Modal } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'
import { indexCar } from '../../type'

interface Props {
  handleOk: (selectModal: TypeSelect) => void
  handleCancel: () => void
}

export const SelectDateModal = ({ handleOk, handleCancel }: Props): JSX.Element => {
  const state = useAppSelector((state) => state.cars[indexCar(state.cars,state.numberCar)])
  const MONTH = 'Январь,февраль,Март,Апрель,Май,Июнь,Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь'.split(',')
  const { colors } = useAppTheme()

  const [checked, setChecked] = useState<'year' | 'month' | 'period' | string>('year')
  const [visibleYear, setVisibleYear] = useState(false)
  const [visibleMonth, setVisibleMonth] = useState(false)
  const [visibleStartDate, setVisibleStartDate] = useState(false)
  const [visibleEndDate, setVisibleEndDate] = useState(false)

  const [checkedYear, setCheckedYear] = useState<string>(String(new Date().getFullYear()))

  const [checkedMonth, setCheckedMonth] = useState<string>(String(MONTH[new Date().getMonth()]))
  const [checkedMonthYear, setCheckedMonthYear] = useState<string>(String(new Date().getFullYear()))
  const [checkedStartMonth, setCheckedStartMonth] = useState<string>(String(MONTH[new Date().getMonth()]))
  const [checkedStartYear, setCheckedStartYear] = useState<string>(String(new Date().getFullYear()))
  const [checkedEndMonth, setCheckedEndMonth] = useState<string>(String(MONTH[new Date().getMonth()]))
  const [checkedEndYear, setCheckedEndYear] = useState<string>(String(new Date().getFullYear()))

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
    setCheckedYear(result)
    setVisibleYear(false)
  }
  const resultPickerMonth = (result: TypeResultPicker): void => {
    setCheckedMonth(result.left)
    setCheckedMonthYear(result.right)
    setVisibleMonth(false)
  }
  const resultPickerStartDate = (result: TypeResultPicker): void => {
    setCheckedStartMonth(result.left)
    setCheckedStartYear(result.right)
    setVisibleStartDate(false)
  }
  const resultPickerEndDate = (result: TypeResultPicker): void => {
    setCheckedEndMonth(result.left)
    setCheckedEndYear(result.right)

    setVisibleEndDate(false)
  }

  return (
    <View>

        <Dialog.Title>Выберите дату</Dialog.Title>
        {
          // ------------------------------------ select Year ---------------------------------------------------------
        }
        <Dialog.Content >
          <RadioButton.Group onValueChange={(item) => setChecked(item)} value={checked} >
            <View style={styles.viewRowChecked}>
          <RadioButton.Item
            label={'год'}
            value={'year'}
            position={'leading'}
          />
              <Button onPress={ () => setVisibleYear(true)} disabled={checked !== 'year'} mode={'elevated'}>
                <Text>{String(checkedYear)}</Text>
              </Button>
        <Portal>
          <Modal visible={visibleYear} style={{ alignItems: 'center' }} onDismiss={() => setVisibleYear(false)}>
            <WheelPickerSelectDate list={createListYears()} handlerEnterPicker={resultPickerYear}/>
          </Modal>
        </Portal>
            </View>
        <Divider horizontalInset bold/>
        {
          // -------------------------------------- select Month -------------------------------------------------------
        }
        <View style={styles.viewRowChecked}>
        <RadioButton.Item
          position={'leading'}
          label={'месяц'}
          value={'month'}
        />
          <Button onPress={ () => setVisibleMonth(true)} disabled={checked !== 'month'} mode={'elevated'}>
            <Text>{String(checkedMonth)} </Text>
            <Text> {String(checkedMonthYear)}</Text>
          </Button>

        </View>
        <Portal>
          <Modal visible={visibleMonth} style={{ alignItems: 'center' }} onDismiss={() => setVisibleMonth(false)}>
            <WheelPickerSelectDouble listLeft={MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerMonth}/>
          </Modal>
        </Portal>
        <Divider style={{ marginBottom: 20 }}/>
        {
          // -------------------------------------- select Period ------------------------------------------------------}
        }
        <View style={styles.viewRowChecked}>
        <RadioButton.Item
          position={'leading'}
          label={'свой'}
          value={'period'}
          />
          <View style={{ flexDirection: 'column', gap: 10 }}>
            <Button onPress={() => setVisibleStartDate(true)} disabled={checked !== 'period'} mode={'elevated'}>
              <Text>{`с  ${String(checkedStartMonth)}`}</Text>
              <Text style={{ paddingHorizontal: 2 }}>{` ${String(checkedStartYear)}`}</Text>
            </Button>

            <Button onPress={() => setVisibleEndDate(true)} disabled={checked !== 'period'} mode={'elevated'}>
              <Text>{`до ${String(checkedEndMonth)}`}</Text>
              <Text style={{ paddingHorizontal: 2 }}>{` ${String(checkedEndYear)}`}</Text>
            </Button>
          </View>
        </View>
            <Portal>
              <Modal visible={visibleStartDate} style={{ alignItems: 'center' }} onDismiss={() => setVisibleStartDate(false)}>
                <WheelPickerSelectDouble listLeft={MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerStartDate}/>
              </Modal>
            </Portal>
            <Portal>
              <Modal visible={visibleEndDate} style={{ alignItems: 'center' }} onDismiss={() => setVisibleEndDate(false)}>
                <WheelPickerSelectDouble listLeft={MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerEndDate}/>
              </Modal>
            </Portal>
          </RadioButton.Group>
        </Dialog.Content>

      {
          // -----------------------------------------------------------------------------------------------------------}
        }
        <Dialog.Actions>
          <Button
            /* title="CONFIRM" */
            onPress={() => {
              switch (checked) {
                case 'year': handleOk({ type: checked, valueYear: checkedYear })
                  break
                case 'month': handleOk({ type: checked, valueYear: checkedMonthYear, valueMonth: MONTH.indexOf(checkedMonth) })
                  break
                case 'period': handleOk({
                  type: checked,
                  period: {
                    valueStartMonth: MONTH.indexOf(checkedStartMonth),
                    valueStartYear: checkedStartYear,
                    valueEndMonth: MONTH.indexOf(checkedEndMonth),
                    valueEndYear: checkedEndYear
                  }
                })
                  break
                default: break
              }
            }}
            textColor={colors.tertiary}

          >CONFIRM</Button>
          <Button
            textColor={colors.error}
                  onPress={() => {
                    handleCancel()
                  }}
                  >CANCEL</Button>
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
