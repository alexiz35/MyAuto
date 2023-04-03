import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import { Button, Text } from '@rneui/themed'
import { COLOR_GREEN, StateCar, TEXT_WHITE } from '../../type'

interface PropsBarChat {
  selectDate: number
  dataProps: StateCar
}

const BarChartComponent = ({ selectDate, dataProps }: PropsBarChat): JSX.Element => {
  /* const state = useAppSelector((state) => state.cars[state.numberCar]) */

  const GREEN_BAR = '0,255,0'
  const CYAN_BAR = '0,255,255'
  const YELLOW_BAR = '255,255,0'

  const [dataChartFuel, setDataChartFuel] = useState<number[]>([])
  const [dataChartParts, setDataChartParts] = useState<number[]>([])
  const [dataChartOther, setDataChartOther] = useState<number[]>([])
  const [dataChartAll, setDataChartAll] = useState<number[]>([])
  const [colorBar, setColorBar] = useState('255,255,255')
  const [dataChart, setDataChart] = useState<number[]>([1, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [selectData, setSelectData] = useState('all')
  /* const [isActivity, setIsActivity] = useState(true) */

  const yearDataFuelChart = (searchYear = new Date().getFullYear()): number[] => {
    const selectYear = dataProps.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)
    const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    selectYear.forEach((item) => {
      tempData[new Date(item.dateFuel).getMonth()] += item.AmountFuel
    })
    console.log('fuel', tempData)
    return tempData
  }
  const yearDataPartsChart = (searchYear = new Date().getFullYear()): number[] => {
    const selectYear = dataProps.tasks.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
    const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    selectYear.forEach((item) => {
      if (item.sumCostParts === undefined)item.sumCostParts = 0
      if (item.sumCostService === undefined)item.sumCostService = 0
      tempData[new Date(item.startDate).getMonth()] += (item.sumCostParts + item.sumCostService)
    })
    console.log('parts', tempData)
    return tempData
  }
  const yearDataAllChart = (): number[] => {
    const fuel = yearDataFuelChart()
    const parts = yearDataPartsChart()
    const tempAllData = fuel.map((value, index) => (value + parts[index]))
    console.log('all', tempAllData)
    setDataChartFuel(fuel)
    setDataChartParts(parts)
    return tempAllData
  }

  useEffect(() => {
    setDataChartAll(yearDataAllChart())
  }, [])

  useEffect(() => {
    console.log('eff', dataChart, dataChartAll)
    switch (selectData) {
      case 'all':
        setColorBar(GREEN_BAR)
        setDataChart(dataChartAll)
        break
      case 'fuel':
        setColorBar(CYAN_BAR)
        setDataChart(dataChartFuel)
        console.log('selectfuel', dataChart)
        break
      case 'parts':
        setColorBar(YELLOW_BAR)
        setDataChart(dataChartParts)
        break
      default: break
    }
    console.log('effect', dataChart)
  }, [selectData, dataChart])

  return (
    <View>
      <View style={styles.viewButtons}>
        <Button type={'outline'} title={'Всего'} titleStyle={{ color: COLOR_GREEN }} buttonStyle={[styles.button, { borderColor: GREEN_BAR }]}
                onPress={() => {
                  setSelectData('all')
                }}/>
        <Button type={'outline'} title={'Заправка'} titleStyle={{ color: 'cyan' }} buttonStyle={[styles.button, { borderColor: CYAN_BAR }]}
                onPress={() => setSelectData('fuel')}/>
        <Button type={'outline'} title={'Ремонт'} titleStyle={{ color: 'yellow' }} buttonStyle={[styles.button, { borderColor: YELLOW_BAR }]}
                onPress={() => setSelectData('parts')}/>
        <Button type={'outline'} title={'Другое'} titleStyle={{ color: 'blue' }} buttonStyle={[styles.button, { borderColor: 'blue' }]}
                onPress={() => setSelectData('other')}/>
      </View>
      <Text style={{ color: TEXT_WHITE }}>Hello {String(dataChart)}</Text>
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
      marginTop: 10,
      borderRadius: 10
    }}
    yLabelsOffset={20}

  />
     {/*  {isActivity ? <ActivityIndicator style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', paddingTop: 130 }}/> : null} */}
    </View>
  )
}

export default BarChartComponent

const styles = StyleSheet.create({
  viewTitleStat: {},
  titleStat: {
    color: TEXT_WHITE,
    textAlign: 'center',
    paddingVertical: 10,
    fontStyle: 'italic'
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    borderRadius: 10,
    paddingVertical: 2
  },
  viewBarChart: {
  }
})
