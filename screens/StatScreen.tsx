import { Dimensions, ImageBackground, ScrollView, StyleSheet, Switch, View } from 'react-native'
import { BACK_INPUT, COLOR_GREEN, StateFuel, TEXT_WHITE } from '../type'
import { Button, ButtonGroup, useTheme } from '@rneui/themed'
import { TextInput, Divider, Text, Icon, SegmentedButtons } from 'react-native-paper'

import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { useAppSelector } from '../components/Redux/hook'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import BarChartComponent from '../components/StatScreenComponents/BarChartComponent'
import PieChartComponent from '../components/StatScreenComponents/PieChartComponent'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { SelectDateModal } from '../components/StatScreenComponents/SelectDateModal'
import { yearDataFuelChart, yearDataPartsChart } from '../components/StatScreenComponents/FunctionStatistic'
import BackgroundView from '../CommonComponents/BackgroundView'
import { useAppTheme } from '../CommonComponents/Theme'

export interface TypeSelect {
  type: string
  valueYear?: string
  valueMonth?: number
  period?: {
    valueStartYear: string
    valueStartMonth: number
    valueEndYear: string
    valueEndMonth: number
  }
}

const StatScreen = (): JSX.Element => {
  const state = useAppSelector((state) => state.cars[state.numberCar])
  const theme = useAppTheme()

  const GREEN_BAR = '0,255,0'
  const RED_BAR = '0,255,255'
  const YELLOW_BAR = '255,255,0'
  const NAME_MONTH = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

  const [dataChartFuel, setDataChartFuel] = useState<number[]>([])
  const [dataChartParts, setDataChartParts] = useState<number[]>([])
  const [sumParts, setSumParts] = useState(0)
  const [sumFuel, setSumFuel] = useState<number>(0)
  const [sumMileage, setSumMileage] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<TypeSelect>({ type: 'year', valueYear: String(new Date().getFullYear()) })
  const [textButtonDate, setButtonDate] = useState<string | undefined>('выберите')

  const [checked, setChecked] = useState(true)
  const [checkedSelected, setCheckedSelected] = useState(false)

  const [typeChart, setTypeChart] = useState('pie')

  const calcSum = (targetArray: number[]): number => {
    if (targetArray.length !== 0) {
      return targetArray.reduce((accumulator, currentValue) => accumulator + currentValue)
    } else { return 0 }
  }

  /* const calcMileage = () => {

  } */

  const handleCancel = (): void => {
    setCheckedSelected(false)
  }
  const handleOk = (selectModal: TypeSelect): void => {
    setCheckedSelected(false)
    setSelectedDate(selectModal)
    switch (selectModal.type) {
      case 'year':
        setButtonDate(selectModal.valueYear)
        setSumFuel(yearDataFuelChart(Number(selectModal.valueYear), state))
        setSumParts(yearDataPartsChart(Number(selectModal.valueYear), state))
        break
      case 'month':
        if (selectModal.valueMonth !== undefined) {
          setButtonDate(`${String(NAME_MONTH[selectModal.valueMonth])} ${String(selectModal.valueYear)}`)
        }
        break
      case 'period':
        if (selectModal.period?.valueStartMonth !== undefined) {
          setButtonDate(`${String(NAME_MONTH[selectModal.period?.valueStartMonth])} ${String(selectModal.period?.valueStartYear)}-
${String(NAME_MONTH[selectModal.period?.valueEndMonth])} ${String(selectModal.period?.valueEndYear)}`)
        }
        break
      default: break
    }
  }

  /*   useFocusEffect(
    useCallback(() => {
    }, [])) */

  return (
    <BackgroundView>
      <ScrollView>
      <View style={styles.viewTitleStat}>
        <Text style={styles.titleStat}>
          Статистика за {}
          {/* {calcSum(dataChartFuel)}{calcSum(dataChartParts)} */}
        </Text>
        <Button type={'outline'} title={textButtonDate} titleStyle={{ color: theme.colors.tertiary }}
                buttonStyle={[styles.button, { borderColor: theme.colors.tertiary }]}
                onPress={() => {
                  setCheckedSelected(!checkedSelected)
                }} />
      </View>

        <View>
          <SelectDateModal visible={checkedSelected} handleCancel={handleCancel} handleOk={handleOk}/>
        </View>

        <SegmentedButtons
          value={typeChart} onValueChange={setTypeChart}
          density={'small'}
          style={{ width: '50%', alignSelf: 'center' }}
          buttons={[
            { value: 'pie', label: '', icon: () => <Icon source={'chart-arc'} size={28}/> },
            { value: 'bar', label: '', icon: () => <Icon source={'chart-bar'} size={28}/> }
          ]}
        />

      <View style={styles.viewAllInput}>
        {typeChart === 'pie'
          ? <PieChartComponent dataProps={state} selectDate={selectedDate}/>
          : <BarChartComponent selectDate={Number(selectedDate.valueYear)} dataProps={state} />}
      </View>
        <View style={styles.viewAllInput}>
          <View style={{ flexDirection: 'row' }}>
            <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} style={{ paddingLeft: 5, paddingTop: 5 }}/>
            <Text style={styles.textKm}>Пробег за {textButtonDate}</Text>
            <Text style={styles.textKm}>{sumMileage} km</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textKm}>Использовано топлива {sumFuel}</Text>
          </View>
        </View>
      </ScrollView>
    </BackgroundView>
  )
}

export default StatScreen

const styles = StyleSheet.create({
  viewTitleStat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  titleStat: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    fontStyle: 'italic'
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    borderRadius: 10,
    paddingVertical: 2,
    marginVertical: 6
  },
  viewBarChart: {
  },
  viewAllInput: {
    margin: 10,
    backgroundColor: BACK_INPUT,
    /* borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey', */
    borderRadius: 10,
    paddingBottom: 5
  },
  textKm: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 10
  }
})
