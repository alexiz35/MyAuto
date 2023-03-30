import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLOR_GREEN, StateFuel, TEXT_WHITE } from '../type'
import { Button, ButtonGroup } from '@rneui/themed'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { useAppSelector } from '../components/Redux/hook'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import BarChartComponent from '../components/BarChartComponent'

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
  const [selectData, setSelectData] = useState('all')

  const calcSum = (targetArray: number[]): number => {
    if (targetArray.length !== 0) {
      return targetArray.reduce((accumulator, currentValue) => accumulator + currentValue)
    } else { return 0 }
  }

  /* useFocusEffect(
    useCallback(() => {
      yearDataFuelChart()
      yearDataPartsChart()
      formDataAllChart()
    /!* yearDataPartsChart() *!/
    }, [])) */

  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView>
      <View style={styles.viewTitleStat}>
        <Text style={styles.titleStat}>
          HELLO {calcSum(dataChartFuel)}{calcSum(dataChartParts)}
        </Text>
        <View style={styles.viewButtons}>
        <Button type={'outline'} title={'Всего'} titleStyle={{ color: COLOR_GREEN }} buttonStyle={{ borderColor: COLOR_GREEN, borderRadius: 10 }}
        onPress={() => setSelectData('all')}/>
        <Button type={'outline'} title={'Заправка'} titleStyle={{ color: 'cyan' }} buttonStyle={{ borderColor: 'cyan', borderRadius: 10 }}
        onPress={() => setSelectData('fuel')}/>
        <Button type={'outline'} title={'Ремонт'} titleStyle={{ color: 'yellow' }} buttonStyle={{ borderColor: 'yellow', borderRadius: 10 }}
        onPress={() => setSelectData('parts')}/>
        <Button type={'outline'} title={'Другое'} titleStyle={{ color: 'blue' }} buttonStyle={{ borderColor: 'blue', borderRadius: 10 }}
        onPress={() => setSelectData('other')}/>
        </View>
      </View>
      <View style={styles.viewBarChart}>
          <BarChartComponent selectData={selectData}/>
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
