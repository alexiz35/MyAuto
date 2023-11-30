import { Dimensions, View } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { PieChart } from 'react-native-gifted-charts'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import { StateCar, StateFuel, StateService } from '../../type'
import { TypeSelect } from '../../screens/StatScreen'
import {
  monthDataFuelChart,
  monthDataPartsChart,
  periodDataFuelChart, periodDataPartsChart,
  yearDataFuelChart,
  yearDataPartsChart
} from './FunctionStatistic'
import { useAppTheme } from '../../CommonComponents/Theme'
import { List, Text } from 'react-native-paper'

interface PropsBarChat {
  selectDate: TypeSelect
  dataProps: StateCar
}
export const ALL_BAR = '#23C50AFF'
export const FUEL_BAR = '#177AD5'
export const PART_BAR = '#79D2DE'
export const OTHER_BAR = '#ED6665'

const PieGiftChartComponent = ({ selectDate, dataProps }: PropsBarChat): JSX.Element => {
  const { colors } = useAppTheme()

  const [dataChartFuel, setDataChartFuel] = useState<number>(50)
  const [dataChartParts, setDataChartParts] = useState<number>(30)
  const [dataChartOther, setDataChartOther] = useState<number>(70)
  const [colorBar, setColorBar] = useState('255,255,255')
  const [dataChart, setDataChart] = useState(0)

  const pieData = [
    { value: 54, color: FUEL_BAR, text: '54%' },
    { value: 30, color: PART_BAR, text: '30%' },
    { value: 26, color: OTHER_BAR, text: '26%' }
  ]

  // --------------------------------------------------------------------------------------------------
  useEffect(() => {
    switch (selectDate.type) {
      case 'year':
        setDataChartFuel(yearDataFuelChart(Number(selectDate.valueYear), dataProps))
        setDataChartParts(yearDataPartsChart(Number(selectDate.valueYear), dataProps))
        break
      case 'month':
        setDataChartFuel(monthDataFuelChart(selectDate, dataProps))
        setDataChartParts(monthDataPartsChart(selectDate, dataProps))
        break
      case 'period':
        setDataChartFuel(periodDataFuelChart(selectDate, dataProps))
        setDataChartParts(periodDataPartsChart(selectDate, dataProps))
        break
      default: break
    }
    console.log('effPie')
  }, [selectDate])

  /* useEffect(() => {
    switch (selectData) {
      case 'all': formDataAllChart()
        break
      case 'fuel': yearDataFuelChart()
        break
      case 'parts': yearDataPartsChart()
        break
      default: break
    }
  }, [selectData]) */

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <PieChart
      donut
      showText
      textColor="black"
      innerRadius={30}
      radius={100}
      showTextBackground={false}
      textBackgroundColor="white"
      textBackgroundRadius={22}
      data={pieData}
      focusOnPress
      sectionAutoFocus
      /* labelsPosition={'mid'} */
    />
    <View>
      <List.Item title={'fuel'}
                 left={() => <List.Icon color={'#177AD5'} icon="circle"/>}
                 description={'2000 грн'}
      />
      <List.Item title={'parts'}
                 left={() => <List.Icon color={'#79D2DE'} icon="circle"/>}
                 description={'2000 грн'}

      />
      <List.Item title={'other'}
                 left={() => <List.Icon color={'#ED6665'} icon="circle"/>}
                 description={'2000 грн'}

      />
    </View>
    </View>
  )
}

export default PieGiftChartComponent
