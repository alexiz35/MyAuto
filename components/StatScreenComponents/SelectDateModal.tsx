import { Button, CheckBox, Dialog, Divider } from '@rneui/themed'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { useState } from 'react'
import { BACK_INPUT } from '../../type'
import { useAppSelector } from '../Redux/hook'
import { TypeSelect } from '../../screens/StatScreen'
import WheelPickerSelectDate from './WheelPickerSelectDate'
import WheelPickerSelectDouble, { TypeResultPicker } from './WheelPickerSelectDouble'

interface Props {
  visible: boolean
  handleOk: (selectModal: TypeSelect) => void
  handleCancel: () => void
}

export const SelectDateModal = ({ visible, handleOk, handleCancel }: Props): JSX.Element => {
  const state = useAppSelector((state) => state.cars[state.numberCar])
  const MONTH = 'Январь,февраль,Март,Апрель,Май,Июнь,Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь'.split(',')

  const [checked, setChecked] = useState('year')
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

  const [visibleMonthYear, setVisibleMonthYear] = useState(false)

  const createListYears = (): string[] => {
    const minYear = new Date(state.info.dateBuy).getFullYear()
    const maxYear = new Date().getFullYear()
    const YEAR = []
    let tempIndex = 0
    for (let i = minYear; i < maxYear + 1; i++) {
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
      <Dialog
        isVisible={visible}
        /* onBackdropPress={toggleDialog5} */
      >
        <Dialog.Title title="Выберите период"/>
        {
          // ------------------------------------ select Year ---------------------------------------------------------
        }
        <View style={styles.viewRowChecked}>
          <CheckBox
            title={'год'}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === 'year'}
            onPress={() => {
              setChecked('year')
            }}
          />
          <Pressable onPress={ () => setVisibleYear(true)} disabled={checked !== 'year'} style={styles.pressable}>
          <Text>{String(checkedYear)}</Text>
          </Pressable>
        </View>
        <View style={{ position: 'absolute', zIndex: 3, justifyContent: 'center', alignSelf: 'center' }}>
          {visibleYear
            ? <WheelPickerSelectDate list={createListYears()} handlerEnterPicker={resultPickerYear}/>
            : null}
        </View>
        <Divider/>
        {
          // -------------------------------------- select Month -------------------------------------------------------
        }
        <View style={styles.viewRowChecked}>
        <CheckBox
            title={'месяц'}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === 'month'}
            onPress={() => {
              setChecked('month')
            }}
          />
          <Pressable onPress={() => setVisibleMonth(true)} disabled={checked !== 'month'} style={[styles.pressable, { flexDirection: 'row' }]}>
        <Text>{String(checkedMonth)} </Text>
            <Text> {String(checkedMonthYear)}</Text>
          </Pressable>
          {/* <Pressable onPress={() => setVisibleMonthYear(true)}>
        <Text> {String(checkedMonthYear)}</Text>
          </Pressable> */}
        </View>
        <View style={{ position: 'absolute', zIndex: 3, justifyContent: 'center', alignSelf: 'center' }}>
          {visibleMonth
            ? <WheelPickerSelectDouble listLeft={MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerMonth}/>
            : null}
        </View>
        <Divider style={{ marginBottom: 20 }}/>
        {
          // -------------------------------------- select Period ------------------------------------------------------}
        }
        <View style={styles.viewRowChecked}>
        <CheckBox
            title={'свой'}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === 'period'}
            onPress={() => setChecked('period')}
          />
          <View style={{ flexDirection: 'column' }}>
            <Pressable onPress={() => setVisibleStartDate(true)} disabled={checked !== 'period'} style={[styles.pressable, { flexDirection: 'row', marginBottom: 10 }]}>
              <Text>{`с  ${String(checkedStartMonth)}`}</Text>
              <Text style={{ paddingHorizontal: 2 }}>{` ${String(checkedStartYear)}`}</Text>
            </Pressable>

            <Pressable onPress={() => setVisibleEndDate(true)} disabled={checked !== 'period'} style={[styles.pressable, { flexDirection: 'row' }]}>
              <Text>{`до ${String(checkedEndMonth)}`}</Text>
              <Text style={{ paddingHorizontal: 2 }}>{` ${String(checkedEndYear)}`}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ position: 'absolute', zIndex: 3, justifyContent: 'center', alignSelf: 'center' }}>
          {visibleStartDate
            ? <WheelPickerSelectDouble listLeft={MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerStartDate}/>
            : null}
        </View>
        <View style={{ position: 'absolute', zIndex: 3, justifyContent: 'center', alignSelf: 'center' }}>
          {visibleEndDate
            ? <WheelPickerSelectDouble listLeft={MONTH} listRight={createListYears()} handlerEnterPicker={resultPickerEndDate}/>
            : null}
        </View>
        {
          // -----------------------------------------------------------------------------------------------------------}
        }
        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
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
          />
          <Dialog.Button title="CANCEL" onPress={() => {
            handleCancel()
          }}/>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  viewRowChecked: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pressable: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5
  }
})

/*

<WheelPickerExpo
height={300}
width={150}
initialSelectedIndex={3}
haptics={true}
items={CITIES.map(name => ({ label: name, value: '' }))}
onChange={({ item }) => setSelectedDate(item.label)} /> */
