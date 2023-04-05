import { Dimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import { StateCar, StateFuel, StateTask } from '../../type'
import { TypeSelect } from '../../screens/StatScreen'
import {
  monthDataFuelChart,
  monthDataPartsChart,
  periodDataFuelChart, periodDataPartsChart,
  yearDataFuelChart,
  yearDataPartsChart
} from './FunctionStatistic'

interface PropsBarChat {
  selectDate: TypeSelect
  dataProps: StateCar
}

const PieChartComponent = ({ selectDate, dataProps }: PropsBarChat): JSX.Element => {
  const GREEN_BAR = 'rgb(0,255,0)'
  const CYAN_BAR = 'rgb(0,255,255)'
  const YELLOW_BAR = 'rgb(255,255,0)'

  const [dataChartFuel, setDataChartFuel] = useState<number>(50)
  const [dataChartParts, setDataChartParts] = useState<number>(30)
  const [dataChartOther, setDataChartOther] = useState<number>(70)
  const [colorBar, setColorBar] = useState('255,255,255')
  const [dataChart, setDataChart] = useState(0)

  const dataPieChart = [
    {
      name: 'fuel',
      amount: dataChartFuel,
      color: CYAN_BAR,
      legendFontColor: CYAN_BAR
    },
    {
      name: 'parts',
      amount: dataChartParts,
      color: YELLOW_BAR,
      legendFontColor: YELLOW_BAR
    },
    {
      name: 'other',
      amount: dataChartOther,
      color: GREEN_BAR,
      legendFontColor: GREEN_BAR
    }
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
    <PieChart
      data={dataPieChart}
      accessor={'amount'}
      width={Dimensions.get('window').width}
      height={250}
      backgroundColor={'transparent'}
      absolute
      chartConfig={
        {
          color: (opacity = 1) => `rgba(${colorBar}, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        }}
      style={{
        marginTop: 20,
        borderRadius: 10
      }}

     paddingLeft={'55'}
    /* center={[10, 50]} */
    />
  )
}

export default PieChartComponent
