import { Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useEffect, useState } from 'react'
import { useAppSelector } from './Redux/hook'

interface PropsBarChat {
  selectData: string
}

const BarChartComponent = ({ selectData }: PropsBarChat): JSX.Element => {
  const state = useAppSelector((state) => state.cars[state.numberCar])

  const GREEN_BAR = '0,255,0'
  const RED_BAR = '0,255,255'
  const YELLOW_BAR = '255,255,0'

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
    setColorBar(RED_BAR)
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

  useEffect(() => {
    switch (selectData) {
      case 'all': formDataAllChart()
        break
      case 'fuel': yearDataFuelChart()
        break
      case 'parts': yearDataPartsChart()
        break
      default: break
    }
  }, [selectData])

  return (
  <BarChart
    yAxisLabel={''}
    yAxisSuffix={'$'}
    verticalLabelRotation={70}
    fromZero={true}
    data={{
      labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: dataChart
        }
      ]
    }}
    width={Dimensions.get('window').width}
    height={250}
    showValuesOnTopOfBars={true}
    chartConfig={
      {
        /* backgroundColor: '#e26a00',
        backgroundGradientFrom: '#0032fb',
        backgroundGradientTo: '#e226ff', */
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(${colorBar}, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        paddingTop: 20,
        style: {},
        barPercentage: 0.3
        /* propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#7dff26'
        } */
      }}
    style={{
      marginTop: 20,
      borderRadius: 10
    }}
    yLabelsOffset={20}

  />
  )
}

export default BarChartComponent
