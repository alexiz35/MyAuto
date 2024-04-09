// modal screen for picking the type of service from const PickService.
// When clicking on a row flatlist, it is filling these values inputs below
// Component have props : 2 callback function Cancel and Ok and previous value typeService
// OkPress callback function passes the selected value typeService to the parent screen

import { FlatList, View } from 'react-native'
import { Button, Card, Divider, List, Surface, Text, TextInput } from 'react-native-paper'
import { JSX, useState } from 'react'
import { ListService } from '../../type'
import { useAppTheme } from '../../CommonComponents/Theme'
import { RenderRowMaintenance } from './RenderRowMaintenance'
import { useTranslation } from 'react-i18next'

interface PickServiceProps {
  cancelPress: () => void
  okPress: (listMaintenance: ListService[]) => void
  listMaintenance: ListService[]
}

export const RegMaintenance = ({ cancelPress, okPress, listMaintenance }: PickServiceProps): JSX.Element => {
  const nullSelectedService: ListService = {
    nameService: '',
    mileage: 0,
    date: 0
  }

  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const [stateListMaintenance, setStateListMaintenance] = useState<ListService[]>(listMaintenance)
  const [selectedService, setSelectedService] = useState<ListService>(nullSelectedService)
  const [typeAction, setTypeAction] = useState<'edit' | 'add' | undefined>(undefined)

  const editListMaintenance = (): void => {
    const tempList = stateListMaintenance
    tempList.push(selectedService)
    setStateListMaintenance(tempList)
    setTypeAction('add')
    setSelectedService(nullSelectedService)
  }

  const handlePick = (item: ListService): void => {
    setSelectedService(item)
    setTypeAction('edit')
  }
  const handleDelMaintenance = (itemForDel: ListService): void => {
    const tempList = stateListMaintenance.filter(item => item.nameService !== itemForDel.nameService)
    setStateListMaintenance(tempList)
    setTypeAction('add')
    setSelectedService(nullSelectedService)
  }

  return (
    <View>
      <View style={{ height: 300 }}>
    <FlatList
      data={stateListMaintenance}
      /* extraData={isSortOthers} */
      ListHeaderComponent={
        <View>
        <View style={{ flexDirection: 'row', backgroundColor: colors.background }}>
          <Card.Title title={t('carInfo.regMaintenance.INPUT_SERVICE')} style={{ flex: 1.1 }}/>
          <Card.Title title={`| ${t('KM')} |`} style={{ flex: 0.7 }} titleStyle={{ paddingRight: 5 }}/>
          <Card.Title title={`| ${t('MONTHS')} |`} style={{ flex: 1.0 }} titleStyle={{ paddingRight: 5 }}/>
        </View>
          <Divider horizontalInset style={{ marginBottom: 4 }}/>
        </View>}
      renderItem={({ item }) => <RenderRowMaintenance handlePick={handlePick} handleDelMaintenance={handleDelMaintenance} item={item}/>}
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
      <Surface >
      <Text style={{ textAlign: 'center' }}>
        {typeAction === 'edit'
          ? t('carInfo.regMaintenance.TITLE_EDIT')
          : t('carInfo.regMaintenance.TITLE_ADD')}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 5, gap: 5 }}>
      <TextInput label={t('carInfo.regMaintenance.INPUT_SERVICE')} style={{ flex: 2 }} mode={'outlined'}
                 value={selectedService.nameService}
                 onChangeText={(value) => { setSelectedService({ ...selectedService, nameService: value }) }}/>
      <TextInput label={t('KM')} style={{ flex: 1 }} mode={'outlined'}
                 keyboardType={'numeric'}
                 value={String(selectedService.mileage)}
                 onChangeText={(value) => { setSelectedService({ ...selectedService, mileage: Number(value) }) }}/>
      <TextInput label={t('MONTHS')} style={{ flex: 1 }} mode={'outlined'}
                 keyboardType={'numeric'}
                 value={String(selectedService.date)}
                 onChangeText={(value) => { setSelectedService({ ...selectedService, date: Number(value) }) }}/>
      </View>
      <Button mode={'contained'} style={{ borderRadius: 5, margin: 10 }} onPress={editListMaintenance}>
        {typeAction === 'edit'
          ? t('carInfo.regMaintenance.BUTTON_SAVE')
          : t('carInfo.regMaintenance.BUTTON_ADD')}
      </Button>
      </Surface>
      <Divider horizontalInset style={{ marginVertical: 10 }}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, gap: 10 }}>
        <Button mode={'outlined'} style={{ borderRadius: 5, flex: 1, marginHorizontal: 10 }} onPress={cancelPress}>Cancel</Button>
        <Button mode={'outlined'} style={{ borderRadius: 5, flex: 1, marginHorizontal: 10 }} onPress={() => { okPress(stateListMaintenance) }}>Ok</Button>
      </View>
    </View>
  )
}
