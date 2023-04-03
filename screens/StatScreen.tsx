import { Dimensions, ImageBackground, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { COLOR_GREEN, StateFuel, TEXT_WHITE } from '../type'
import { Button, ButtonGroup, Icon } from '@rneui/themed'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { useAppSelector } from '../components/Redux/hook'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import BarChartComponent from '../components/StatScreenComponents/BarChartComponent'
import PieChartComponent from '../components/StatScreenComponents/PieChartComponent'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { SelectDateModal } from '../components/StatScreenComponents/SelectDateModal'

export interface TypeSelect {
  type: string
  valueYear: string
  valueMonth?: string
  period?: {
    valueStartYear: string
    valueStartMonth: string
    valueEndYear: string
    valueEndMonth: string
  }
}

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
  const [selectedDate, setSelectedDate] = useState<TypeSelect>({ type: 'year', valueYear: String(new Date().getFullYear()) })

  const [checked, setChecked] = useState(true)
  const [checkedSelected, setCheckedSelected] = useState(false)

  const calcSum = (targetArray: number[]): number => {
    if (targetArray.length !== 0) {
      return targetArray.reduce((accumulator, currentValue) => accumulator + currentValue)
    } else { return 0 }
  }
  const handleCancel = (): void => {
    setCheckedSelected(false)
  }
  const handleOk = (selectModal: TypeSelect): void => {
    setCheckedSelected(false)
    setSelectedDate(selectModal)
  }

  useFocusEffect(
    useCallback(() => {
      /* setChecked(true) */
    }, []))

  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView>
      <View style={styles.viewTitleStat}>
        <Text style={styles.titleStat}>
          Стастика за {}
          {/* {calcSum(dataChartFuel)}{calcSum(dataChartParts)} */}
        </Text>
        <Button type={'outline'} title={String(selectedDate.valueYear)} titleStyle={{ color: COLOR_GREEN }}
                buttonStyle={[styles.button, { borderColor: COLOR_GREEN }]}
                onPress={() => {
                  setCheckedSelected(!checkedSelected)
                }} />
      </View>

        <View>
          <SelectDateModal visible={checkedSelected} handleCancel={handleCancel} handleOk={handleOk}/>
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
          ? <PieChartComponent dataProps={state} selectDate={selectedDate}/>
          : <BarChartComponent selectDate={Number(selectedDate.valueYear)} dataProps={state} />}
      </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default StatScreen

const styles = StyleSheet.create({
  viewTitleStat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
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
    paddingVertical: 2,
    marginVertical: 6
  },
  viewBarChart: {
  }
})
