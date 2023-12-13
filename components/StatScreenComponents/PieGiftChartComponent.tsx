import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { useAppTheme } from '../../CommonComponents/Theme'
import { List } from 'react-native-paper'
import { FUEL_BAR, OTHER_BAR, PART_BAR } from './FunctionStatistic'

interface PropsBarChat {
  dataProps: {
    fuel: number
    parts: number
    other: number
  }
}

const PieGiftChartComponent = ({ dataProps }: PropsBarChat): JSX.Element => {
  const { colors } = useAppTheme()

  /*  const [dataChartFuel, setDataChartFuel] = useState<number>(50)
  const [dataChartParts, setDataChartParts] = useState<number>(30)
  const [dataChartOther, setDataChartOther] = useState<number>(70)
  const [colorBar, setColorBar] = useState('255,255,255')
  const [dataChart, setDataChart] = useState(0) */

  const pieData = [
    { value: dataProps.fuel, color: FUEL_BAR, text: String(dataProps.fuel) },
    { value: dataProps.parts, color: PART_BAR, text: String(dataProps.parts) },
    { value: 26, color: OTHER_BAR, text: '26%' }
  ]

  // --------------------------------------------------------------------------------------------------
  /*  useEffect(() => {
    switch (selectDate.type) {
      case 'year':
        /!* setDataChartFuel(yearDataFuelChart(Number(selectDate.valueYear), dataProps))
        setDataChartParts(yearDataPartsChart(Number(selectDate.valueYear), dataProps)) *!/
        break
      case 'month':
        /!* setDataChartFuel(monthDataFuelChart(selectDate, dataProps))
        setDataChartParts(monthDataPartsChart(selectDate, dataProps)) *!/
        break
      case 'period':
        /!* setDataChartFuel(periodDataFuelChart(selectDate, dataProps))
        setDataChartParts(periodDataPartsChart(selectDate, dataProps)) *!/
        break
      default: break
    }
  }, [selectDate]) */

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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <PieChart
      donut
      showText
      textColor="black"
      innerRadius={30}
      radius={100}
      showTextBackground={false}
      textBackgroundColor="white"
      textBackgroundRadius={22}
      data={pieData}
      focusOnPress
      sectionAutoFocus
      /* labelsPosition={'mid'} */
    />
    <View>
      <List.Item title={'fuel'}
                 left={() => <List.Icon color={'#177AD5'} icon="circle"/>}
                 description={dataProps.fuel}
      />
      <List.Item title={'parts'}
                 left={() => <List.Icon color={'#79D2DE'} icon="circle"/>}
                 description={dataProps.parts}

      />
      <List.Item title={'other'}
                 left={() => <List.Icon color={'#ED6665'} icon="circle"/>}
                 description={'2000 грн'}

      />
    </View>
    </View>
  )
}

export default PieGiftChartComponent
