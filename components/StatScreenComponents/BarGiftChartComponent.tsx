import { StyleSheet, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

import { JSX, useEffect, useState } from 'react'
import {
  ALL_BAR,
  FUEL_BAR, initialBarChart,
  OTHER_BAR,
  PART_BAR
} from './FunctionStatistic'
import { Icon, SegmentedButtons } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'

export interface PropsBarChat {
  dataProps: {
    all: number[]
    fuel: number[]
    parts: number[]
    other: number[]
  }
}
interface BarChartData {
  value: number
  label: string
}

const BarGiftChartComponent = ({ dataProps }: PropsBarChat): JSX.Element => {
  const { colors } = useAppTheme()

  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec']

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

  const selectionTypeChart = (): void => {
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
      case 'other':
        setColorBar(OTHER_BAR)
        setDataChart(formBarChartData(dataProps.other))
        break
      default: break
    }
  }

  useEffect(() => {
    selectionTypeChart()
  }, [selectData, dataProps])

  return (
    <View>
      <SegmentedButtons
        value={selectData} onValueChange={setSelectData}
        density={'small'}
        style={{ width: '90%', alignSelf: 'center', paddingBottom: 10, paddingTop: 15, borderRadius: 0 }}

        buttons={[
          { value: 'all', label: 'all', icon: () => <Icon source={'cart'} size={20} color={ALL_BAR} />, style: styles.segmentButton },
          { value: 'fuel', label: 'fuel', icon: () => <Icon source={'gas-station'} size={20} color={FUEL_BAR}/>, style: styles.segmentButton },
          { value: 'parts', label: 'part', icon: () => <Icon source={'car-wrench'} size={20} color={PART_BAR}/>, style: styles.segmentButton },
          { value: 'other', label: 'other', icon: () => <Icon source={'account-cash'} size={20} color={OTHER_BAR}/>, style: styles.segmentButton }
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

    </View>
  )
}

export default BarGiftChartComponent

const styles = StyleSheet.create({
  segmentButton: {
    borderRadius: 0,
    borderWidth: 0
  }
})
