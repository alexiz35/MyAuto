import { Dimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { useEffect, useState } from 'react'
import { useAppSelector } from './Redux/hook'

interface PropsBarChat {
  selectDate: string
}

const PieChartComponent = ({ selectDate }: PropsBarChat): JSX.Element => {
  const state = useAppSelector((state) => state.cars[state.numberCar])

  const GREEN_BAR = 'rgb(0,255,0)'
  const CYAN_BAR = 'rgb(0,255,255)'
  const YELLOW_BAR = 'rgb(255,255,0)'

  const dataPieChart = [
    {
      name: 'fuel',
      amount: 20,
      color: CYAN_BAR,
      legendFontColor: CYAN_BAR
    },
    {
      name: 'parts',
      amount: 50,
      color: YELLOW_BAR,
      legendFontColor: YELLOW_BAR
    },
    {
      name: 'other',
      amount: 40,
      color: GREEN_BAR,
      legendFontColor: GREEN_BAR
    }
  ]

  const [dataChartFuel, setDataChartFuel] = useState<number[]>([])
  const [dataChartParts, setDataChartParts] = useState<number[]>([])
  const [colorBar, setColorBar] = useState('255,255,255')
  const [dataChart, setDataChart] = useState<number[]>([])

  const yearDataFuelChart = (searchYear = new Date().getFullYear()): void => {
    const selectYear = state.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)
    const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    selectYear.forEach((item) => {
      tempData[new Date(item.dateFuel).getMonth()] += item.AmountFuel
    })
    setColorBar(CYAN_BAR)
    setDataChartFuel(tempData)
    setDataChart(tempData)
  }
  const yearDataPartsChart = (searchYear = new Date().getFullYear()): void => {
    const selectYear = state.tasks.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
    const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    selectYear.forEach((item) => {
      if (item.sumCostParts === undefined)item.sumCostParts = 0
      if (item.sumCostService === undefined)item.sumCostService = 0
      tempData[new Date(item.startDate).getMonth()] += (item.sumCostParts + item.sumCostService)
    })
    setColorBar(YELLOW_BAR)
    setDataChartParts(tempData)
    setDataChart(tempData)
  }
  const formDataAllChart = (): void => {
    const tempAllData = dataChartFuel.map((value, index) => (value + dataChartParts[index]))
    setColorBar(GREEN_BAR)
    setDataChart(tempAllData)
  }

  useEffect(() => {
    yearDataFuelChart()
    yearDataPartsChart()
    formDataAllChart()
  }, [])

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
