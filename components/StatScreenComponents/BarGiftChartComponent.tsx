import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
/* import { BarChart } from 'react-native-chart-kit' */
import { BarChart } from 'react-native-gifted-charts'

import { useEffect, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import { Button, Text } from '@rneui/themed'
import { COLOR_GREEN, StateCar, TEXT_WHITE } from '../../type'
import { color } from '@rneui/base'
import { ALL_BAR, FUEL_BAR, OTHER_BAR, PART_BAR } from './PieGiftChartComponent'
import { Icon, SegmentedButtons } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'

interface PropsBarChat {
  selectDate: number
  dataProps: StateCar
}
interface BarChartData {
  value: number
  label: string
}

const BarGiftChartComponent = ({ selectDate, dataProps }: PropsBarChat): JSX.Element => {
  /* const state = useAppSelector((state) => state.cars[state.numberCar]) */
  const { colors } = useAppTheme()

  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec']

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
    const selectYear = dataProps.services.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
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

  const formBarChartData = (data: number[]) => {
    const tempData: BarChartData[] = data.map((value, index) => (
      {
        value,
        label: MONTH[index]
      }
    ))
    return tempData
  }

  useEffect(() => {
    console.log('eff', colorBar)
    switch (selectData) {
      case 'all':
        setColorBar(ALL_BAR)
        setDataChart(dataChartAll)
        break
      case 'fuel':
        setColorBar(FUEL_BAR)
        setDataChart(dataChartFuel)
        console.log('selectfuel', dataChart)
        break
      case 'parts':
        setColorBar(PART_BAR)
        setDataChart(dataChartParts)
        break
      default: break
    }
    console.log('effect', dataChart)
  }, [selectData, dataChart])

  const barData1 = [
    { value: 250, label: 'Jan' },
    { value: 500, label: 'Feb', frontColor: colorBar },
    { value: 745, label: 'Mar', frontColor: colorBar },
    { value: 320, label: 'Apr' },
    { value: 600, label: 'Jun', frontColor: colorBar },
    { value: 256, label: 'Jul' },
    { value: 300, label: 'Aug' },
    { value: 300, label: 'Sep' },
    { value: 300, label: 'Oct' },
    { value: 300, label: 'Nov' },
    { value: 300, label: 'Dec' }
  ]

  /*  useEffect(()=>{
    barData1.
  },[]) */

  return (
    <View>
      {/*
      <View style={styles.viewButtons}>
        <Button type={'outline'} title={'Всего'} titleStyle={{ color: COLOR_GREEN }} buttonStyle={[styles.button, { borderColor: ALL_BAR }]}
                onPress={() => {
                  setSelectData('all')
                }}/>
        <Button type={'outline'} title={'Заправка'} titleStyle={{ color: '#177AD5' }} buttonStyle={[styles.button, { borderColor: FUEL_BAR }]}
                onPress={() => setSelectData('fuel')}/>
        <Button type={'outline'} title={'Ремонт'} titleStyle={{ color: '#79D2DE' }} buttonStyle={[styles.button, { borderColor: PART_BAR }]}
                onPress={() => setSelectData('parts')}/>
        <Button type={'outline'} title={'Другое'} titleStyle={{ color: '#ED6665' }} buttonStyle={[styles.button, { borderColor: OTHER_BAR }]}
                onPress={() => setSelectData('other')}/>
      </View>
      <Text style={{ color: TEXT_WHITE }}>Hello {String(dataChart)}</Text> */}
      <SegmentedButtons
        value={selectData} onValueChange={setSelectData}
        density={'small'}
        style={{ width: '90%', alignSelf: 'center', paddingBottom: 10, paddingTop: 15, borderRadius: 0 }}

        buttons={[
          { value: 'all', label: 'all', icon: () => <Icon source={'cart'} size={20} color={ALL_BAR} />, style: { borderRadius: 0, borderWidth: 0 } },
          { value: 'fuel', label: 'fuel', icon: () => <Icon source={'gas-station'} size={20} color={FUEL_BAR}/>, style: { borderRadius: 0, borderWidth: 0 } },
          { value: 'parts', label: 'part', icon: () => <Icon source={'car-wrench'} size={20} color={PART_BAR}/>, style: { borderRadius: 0, borderWidth: 0 } },
          { value: 'other', label: 'other', icon: () => <Icon source={'account-cash'} size={20} color={OTHER_BAR}/>, style: { borderRadius: 0, borderWidth: 0 } }
        ]}
      />
      <View style={{ paddingVertical: 10 }}>
      <BarChart
        barWidth={22}
        noOfSections={5}
        barBorderRadius={4}
        frontColor={colorBar}
        data={formBarChartData(dataChart)}
        yAxisThickness={1}
        xAxisThickness={1}
        isAnimated={true}
        rulesColor={colors.secondary}
        yAxisColor={colors.secondary}
        xAxisColor={colors.secondary}
        xAxisLabelTextStyle={{ color: colors.secondary }}
        yAxisTextStyle={{ color: colors.secondary }}
        yAxisLabelWidth={40}

      />
      </View>

     {/*  {isActivity ? <ActivityIndicator style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', paddingTop: 130 }}/> : null} */}
    </View>
  )
}

export default BarGiftChartComponent

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
