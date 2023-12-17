import { StyleSheet, View } from 'react-native'
/* import { BarChart } from 'react-native-chart-kit' */
import { BarChart } from 'react-native-gifted-charts'

import { useEffect, useState } from 'react'
import { StateCar, TEXT_WHITE } from '../../type'
import {
  ALL_BAR,
  FUEL_BAR,
  OTHER_BAR,
  PART_BAR,
  yearDataFuelBarChart,
  yearDataPartsBarChart
} from './FunctionStatistic'
import { Icon, SegmentedButtons } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'

export interface PropsBarChat {
  dataProps: {
    all: number[]
    fuel: number[]
    parts: number[]
  }
}
interface BarChartData {
  value: number
  label: string
}
export const initialBarChart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const BarGiftChartComponent = ({ dataProps }: PropsBarChat): JSX.Element => {
  /* const state = useAppSelector((state) => state.cars[state.numberCar]) */
  const { colors } = useAppTheme()
  console.log('first', dataProps)

  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec']

  /* const [dataChartFuel, setDataChartFuel] = useState<number[]>(() => yearDataFuelBarChart(selectDate, dataProps))
  const [dataChartParts, setDataChartParts] = useState<number[]>(() => yearDataPartsBarChart(selectDate, dataProps)) */

  /* const [dataChartAll, setDataChartAll] = useState<number[]>(() => yearDataAllChart()) */

  const [colorBar, setColorBar] = useState('255,255,255')
  const [dataChart, setDataChart] = useState<BarChartData[]>()
  const [selectData, setSelectData] = useState('all')

  const formBarChartData = (data: number[] = initialBarChart): BarChartData[] => {
    return data.map((value, index) => (
      {
        value,
        label: MONTH[index]
      }
    ))
  }

  /* useEffect(() => {
    console.log('start', dataChart)
  }, []) */

  const selectionTypeChart = () => {
    switch (selectData) {
      case 'all':
        setColorBar(ALL_BAR)
        setDataChart(formBarChartData(dataProps.all))
        break
      case 'fuel':
        setColorBar(FUEL_BAR)
        setDataChart(formBarChartData(dataProps.fuel))
        break
      case 'parts':
        setColorBar(PART_BAR)
        setDataChart(formBarChartData(dataProps.parts))
        break
      default: break
    }
  }

  /* useEffect(() => {
    setDataChartFuel(yearDataFuelBarChart(selectDate, dataProps))
    setDataChartParts(yearDataPartsBarChart(selectDate, dataProps))
    setDataChartAll(yearDataAllChart())
    selectionTypeChart()
    console.log('stateFuel', selectDate)
  }, [selectDate]) */

  useEffect(() => {
    selectionTypeChart()
  }, [selectData, dataProps])

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
        data={dataChart}
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
