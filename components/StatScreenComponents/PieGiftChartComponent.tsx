import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { List } from 'react-native-paper'
import { FUEL_BAR, OTHER_BAR, PART_BAR } from './FunctionStatistic'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'

interface PropsBarChat {
  dataProps: {
    fuel: number
    parts: number
    other: number
  }
}

const PieGiftChartComponent = ({ dataProps }: PropsBarChat): JSX.Element => {
  const pieData = [
    { value: dataProps.fuel, color: FUEL_BAR, text: String(dataProps.fuel) },
    { value: dataProps.parts, color: PART_BAR, text: String(dataProps.parts) },
    { value: dataProps.other, color: OTHER_BAR, text: String(dataProps.other) }
  ]
  const pieDataNull = [
    { value: 0, color: FUEL_BAR, text: String('нет трат') },
    { value: 0, color: PART_BAR, text: String(dataProps.parts) },
    { value: 0, color: OTHER_BAR, text: String(dataProps.other) }
  ]
  const { t } = useTranslation()

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
      textBackgroundRadius={20}
      data={(dataProps.fuel === 0 && dataProps.parts === 0 && dataProps.other === 0) ? pieDataNull : pieData}
      focusOnPress
      sectionAutoFocus
      /* labelsPosition={'inward'} */

    />
    <View>
      <List.Item title={t('statScreen.FUEL')}
                 left={() => <List.Icon color={'#177AD5'} icon="circle"/>}
                 description={dataProps.fuel}
      />
      <List.Item title={t('statScreen.PART')}
                 left={() => <List.Icon color={'#79D2DE'} icon="circle"/>}
                 description={dataProps.parts}

      />
      <List.Item title={t('statScreen.OTHER')}
                 left={() => <List.Icon color={'#ED6665'} icon="circle"/>}
                 description={dataProps.other}

      />
    </View>
    </View>
  )
}

export default PieGiftChartComponent
