// modal screen for picking the type of service from const PickService.
// When clicking on a row flatlist, it is filling these values inputs below
// Component have props : 2 callback function Cancel and Ok and previous value typeService
// OkPress callback function passes the selected value typeService to the parent screen

import { FlatList, View } from 'react-native'
import { Button, Card, Divider, List, Text, TextInput } from 'react-native-paper'
import { JSX, useState } from 'react'
import { ListService } from '../../../type'
import { listServiceRu } from './ListServices'
import { useAppTheme } from '../../../CommonComponents/Theme'
import { useTranslation } from 'react-i18next'

interface PickServiceProps {
  cancelPress: () => void
  okPress: (typeService: ListService) => void
  typeService: ListService | undefined
}

export const PickService = ({ cancelPress, okPress, typeService }: PickServiceProps): JSX.Element => {
  const nullTypeService: ListService = {
    nameService: '',
    mileage: 0,
    date: 0
  }

  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const [service, setService] = useState<ListService >(
    typeService !== undefined
      ? typeService
      : nullTypeService
  )

  const handlePick = (item: ListService): void => {
    setService(item)
  }

  return (
    <View>
      <View style={{ height: 250 }}>
    <FlatList
      data={listServiceRu}
      /* extraData={isSortOthers} */
      ListHeaderComponent={
        <View style={{ flexDirection: 'row', backgroundColor: colors.background }}>
          <List.Item title={t('SERVICE')} style={{ flex: 2 }}/>
          <List.Item title={t('KM')} style={{ flex: 0.9 }} />
          <List.Item title={t('MONTHS')} style={{ flex: 1.1 }}/>
        </View>}
      renderItem={({ item }) =>
        <Card
          style={{ borderRadius: 5, margin: 5 }}
          contentStyle={{ flexDirection: 'row' }}
          onPress={() => { handlePick(item) }}
        >
          <List.Item left={props => <List.Icon {...props} icon={'oil'} />} title={item.nameService} style={{ flex: 2 }}/>
          <List.Item title={item.mileage} style={{ flex: 1 }}/>
          <List.Item title={item.date} style={{ flex: 1 }}/>
        </Card>}
      keyExtractor={(item, index) => index.toString()}
      stickyHeaderIndices={[0]}
      scrollEnabled
      getItemLayout={(data, index) => (
        {
          length: 52,
          offset: 52 * index,
          index
        }
      )}
      initialNumToRender={6}
    />
      </View>
      <Text style={{ textAlign: 'center' }}>{t('inputService.ENTER_VALUE')}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 5, gap: 5 }}>
      <TextInput label={t('SERVICE')} style={{ flex: 2 }} mode={'outlined'}
                 value={service.nameService}
                 onChangeText={(value) => { setService({ ...service, nameService: value }) }}/>
      <TextInput label={t('KM')} style={{ flex: 1 }} mode={'outlined'}
                 keyboardType={'numeric'}
                 value={String(service.mileage)}
                 onChangeText={(value) => { setService({ ...service, mileage: Number(value) }) }}/>
      <TextInput label={t('MONTH')} style={{ flex: 1 }} mode={'outlined'}
                 keyboardType={'numeric'}
                 value={String(service.date)}
                 onChangeText={(value) => { setService({ ...service, date: Number(value) }) }}/>
      </View>
      <Divider horizontalInset style={{ marginVertical: 10 }}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, gap: 10 }}>
        <Button mode={'outlined'} style={{ borderRadius: 5, flex: 1, marginHorizontal: 10 }} onPress={cancelPress}>Cancel</Button>
        <Button mode={'outlined'} style={{ borderRadius: 5, flex: 1, marginHorizontal: 10 }} onPress={() => { okPress(service) }}>Ok</Button>
      </View>
    </View>
  )
}
