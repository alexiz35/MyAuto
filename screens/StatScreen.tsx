import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Text, Icon, SegmentedButtons, Surface, Button, Portal, Dialog } from 'react-native-paper'

import { useAppSelector } from '../components/Redux/hook'
import { JSX, useEffect, useState } from 'react'
import { SelectDateModal } from '../components/StatScreenComponents/SelectDateModal'
import {
  averageFuel,
  fuelMiles,
  initialBarChart,
  monthDataFuelChart,
  monthDataMilesChart,
  monthDataOtherChart,
  monthDataPartsChart,
  periodDataFuelChart, periodDataMilesChart, periodDataOtherChart, periodDataPartsChart,
  yearDataAllChart,
  yearDataFuelChart,
  yearDataMilesChart,
  yearDataOtherChart,
  yearDataPartsChart
} from '../components/StatScreenComponents/FunctionStatistic'
import BackgroundView from '../CommonComponents/BackgroundView'
import PieGiftChartComponent from '../components/StatScreenComponents/PieGiftChartComponent'
import BarGiftChartComponent from '../components/StatScreenComponents/BarGiftChartComponent'
import { getIndexCar } from '../type'

export interface TypeSelect {
  type: 'year' | 'month' | 'period'
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
  const state = useAppSelector((state) => state.cars[getIndexCar(state.cars, state.numberCar)])

  const NAME_MONTH = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

  const [dataBarChart, setDataBarChart] = useState({ all: initialBarChart, fuel: initialBarChart, parts: initialBarChart, other: initialBarChart })

  // топливо за период
  const [sumFuel, setSumFuel] = useState<number>(0)

  const [volumeFuel, setVolumeFuel] = useState<number>(0)
  const [sumParts, setSumParts] = useState(0)
  const [sumOther, setSumOther] = useState(0)
  const [sumMileage, setSumMileage] = useState<number>(0)
  // выбранная дата
  const [selectedDate, setSelectedDate] = useState<TypeSelect>(
    { type: 'year', valueYear: String(new Date().getFullYear()) }
  )
  const [textButtonDate, setButtonDate] = useState<string | undefined>(undefined)

  const [visiblePickDate, setVisiblePickDate] = useState(false)

  const [typeChart, setTypeChart] = useState('pie')

  /*   const calcSum = (targetArray: number[]): number => {
    if (targetArray.length !== 0) {
      return targetArray.reduce((accumulator, currentValue) => accumulator + currentValue)
    } else { return 0 }
  } */

  const selectTypeDate = (selectModal: TypeSelect): void => {
    switch (selectModal.type) {
      case 'year':
        setButtonDate(selectModal.valueYear)
        setSumFuel(yearDataFuelChart(Number(selectedDate.valueYear), state).amountFuel)
        setVolumeFuel(yearDataFuelChart(Number(selectedDate.valueYear), state).volumeFuel)
        setSumMileage(yearDataMilesChart(Number(selectedDate.valueYear), state))
        setSumParts(yearDataPartsChart(Number(selectedDate.valueYear), state))
        setSumOther(yearDataOtherChart(Number(selectedDate.valueYear), state))
        break
      case 'month':
        if (selectModal.valueMonth !== undefined) {
          setButtonDate(`${String(NAME_MONTH[selectModal.valueMonth])} ${String(selectModal.valueYear)}`)
          setSumFuel(monthDataFuelChart(selectedDate, state).amountFuel)
          setVolumeFuel(monthDataFuelChart(selectedDate, state).volumeFuel)
          setSumMileage(monthDataMilesChart(selectedDate, state))
          setSumParts(monthDataPartsChart(selectedDate, state))
          setSumOther(monthDataOtherChart(selectedDate, state))
        }
        break
      case 'period':
        if (selectModal.period?.valueStartMonth !== undefined) {
          setButtonDate(`${String(NAME_MONTH[selectModal.period?.valueStartMonth])} ${String(selectModal.period?.valueStartYear)}-
${String(NAME_MONTH[selectModal.period?.valueEndMonth])} ${String(selectModal.period?.valueEndYear)}`)
          setSumFuel(periodDataFuelChart(selectedDate, state).amountFuel)
          setVolumeFuel(periodDataFuelChart(selectedDate, state).volumeFuel)
          setSumMileage(periodDataMilesChart(selectedDate, state))
          setSumParts(periodDataPartsChart(selectedDate, state))
          setSumOther(periodDataOtherChart(selectedDate, state))
        }
        break
      default: break
    }
  }

  const handleCancel = (): void => {
    setVisiblePickDate(false)
  }
  const handleOk = (selectModal: TypeSelect): void => {
    setVisiblePickDate(false)
    setSelectedDate(selectModal)
  }

  useEffect(() => {
    selectTypeDate(selectedDate)
    if (typeChart === 'bar') setDataBarChart(yearDataAllChart(Number(selectedDate.valueYear), state))
  }, [selectedDate])

  useEffect(() => {
    if (typeChart === 'bar' && textButtonDate !== undefined) setDataBarChart(yearDataAllChart(Number(selectedDate.valueYear), state))
  }, [typeChart])

  /*   useFocusEffect(
    useCallback(() => {
    }, [])) */

  return (
    <ScrollView>

    <BackgroundView props={{ height: Dimensions.get('window').height }}>
      <View style={styles.viewTitleStat}>
        <Text style={styles.titleStat}>
          Статистика за
        </Text>
        <Button
                onPress={() => {
                  setVisiblePickDate(!visiblePickDate)
                }} >
          {textButtonDate ?? '-- --'}
        </Button>
      </View>

      {
        // -------------------------------- ModalPickSeller -----------------------
      }
      <Portal>
        <Dialog visible={visiblePickDate} onDismiss={() => { setVisiblePickDate(false) }}>
          <SelectDateModal handleCancel={handleCancel} handleOk={handleOk}/>
        </Dialog>
        </Portal>

        <SegmentedButtons
          value={typeChart} onValueChange={setTypeChart}
          density={'small'}
          style={{ width: '50%', alignSelf: 'center' }}
          buttons={[
            { value: 'pie', label: '', icon: () => <Icon source={'chart-arc'} size={26}/> },
            { value: 'bar', label: '', icon: () => <Icon source={'chart-bar'} size={26}/> }
          ]}
        />

         {typeChart === 'pie'
           ? <PieGiftChartComponent dataProps={{ fuel: sumFuel, parts: sumParts, other: sumOther }}/>
           : <BarGiftChartComponent dataProps={ { all: dataBarChart.all, fuel: dataBarChart.fuel, parts: dataBarChart.parts, other: dataBarChart.other } } />}

        <Divider horizontalInset bold />
        <Surface elevation={3} style={styles.viewAllInput} >
        <View style={{ paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textKm}>Пробег за  {textButtonDate ?? ' -- --'}</Text>
            <Text style={styles.textKm}>{sumMileage} (km)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textKm}>Использовано топлива {volumeFuel} (l)</Text>
            <Text style={styles.textKm}>на {sumFuel} (грн)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textKm}>Средний расход </Text>
            <Text style={styles.textKm}>{String(averageFuel(selectedDate, state))} (l/100km)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textKm}>Использовано на ремонт</Text>
            <Text style={styles.textKm}>{sumParts} (грн)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textKm}>Использовано на другое, грн</Text>
            <Text style={styles.textKm}>{sumOther} (грн)</Text>
          </View>
        </View>
        </Surface>
        <Divider horizontalInset bold />

    </BackgroundView>
    </ScrollView>
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
    borderRadius: 10,
    paddingBottom: 5
  },
  textKm: {
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 10
  }
})
