import { Dimensions, ImageBackground, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { COLOR_GREEN, StateFuel, TEXT_WHITE } from '../type'
import { Button, ButtonGroup, Icon } from '@rneui/themed'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { useAppSelector } from '../components/Redux/hook'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import BarChartComponent from '../components/BarChartComponent'
import PieChartComponent from '../components/PieChartComponent'

const StatScreen = (): JSX.Element => {
  const state = useAppSelector((state) => state.cars[state.numberCar])

  const GREEN_BAR = '0,255,0'
  const RED_BAR = '0,255,255'
  const YELLOW_BAR = '255,255,0'

  const [dataChartFuel, setDataChartFuel] = useState<number[]>([])
  const [dataChartParts, setDataChartParts] = useState<number[]>([])
  const [dataChartOther, setDataChartOther] = useState(0)
  const [dataChart, setDataChart] = useState<number[]>([])
  const [labelChart, setLabelChart] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState(0)

  const [checked, setChecked] = useState(false)

  const calcSum = (targetArray: number[]): number => {
    if (targetArray.length !== 0) {
      return targetArray.reduce((accumulator, currentValue) => accumulator + currentValue)
    } else { return 0 }
  }

  useFocusEffect(
    useCallback(() => {
      /* setSelectedDate(2023) */
    }, []))

  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView>
      <View style={styles.viewTitleStat}>
        <Text style={styles.titleStat}>
          HELLO {calcSum(dataChartFuel)}{calcSum(dataChartParts)}
        </Text>
      </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon type={'material-community'} name={'chart-arc'} color={checked ? TEXT_WHITE : 'grey'} size={28}
                onPress={() => setChecked(!checked)}/>
          <Icon type={'material-community'} name={'arrow-left-right'} color={COLOR_GREEN} size={28}
                onPress={() => setChecked(!checked)}/>
          <Icon type={'material-community'} name={'chart-bar'} color={checked ? 'grey' : TEXT_WHITE} size={28}
                onPress={() => setChecked(!checked)}/>
        </View>
      <View style={styles.viewBarChart}>
        {checked
          ? <PieChartComponent selectDate={'all'}/>
          : <BarChartComponent selectDate={selectedDate} dataProps={state} />}
      </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default StatScreen

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
  viewBarChart: {
  }
})
