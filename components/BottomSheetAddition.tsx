import React, { PropsWithChildren, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native'
import { Button, Divider, Input } from '@rneui/themed'

interface PartList {
  id: number
  namePart: string
  costPart: number
}
interface ServiceList {
  id: number
  nameService: string
  costService: number
}

interface Props {
  onPress: () => void
}

export const BottomSheetAddition = ({ onPress }: Props): JSX.Element => {
  const [namePart, setNamePart] = useState('')
  const [costPart, setCostPart] = useState('')
  const [idPart, setIdPart] = useState(1)

  const [nameService, setNameService] = useState('')
  const [costService, setCostService] = useState('')
  const [idService, setIdService] = useState(1)

  const [parts, setParts] = useState([])
  const [services, setServices] = useState([])

  const inputNamePart = React.createRef<PropsWithChildren<TextInput>>()
  const inputCostPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputNameService = React.createRef<PropsWithChildren<TextInput>>()
  const inputCostService = React.createRef<PropsWithChildren<TextInput>>()

  const listParts = (item: PartList | ServiceList): JSX.Element => {
    return (
      <View >
        {/* <ListItem.Content>
          <ListItem.Title>
            {item.id}
          </ListItem.Title>
          </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title>
            {item.namePart}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title>
            {item.costPart}
          </ListItem.Title>
        </ListItem.Content> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 2 }}>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{item.id}</Text>
          <Text style={{ flex: 2, textAlign: 'center', fontSize: 16 }}>{'namePart' in item ? item.namePart : item.nameService}</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>{'costPart' in item ? item.costPart : item.costService}</Text>
        </View>
      <Divider inset={true} insetType={'middle'}/>
      </View>
    )
  }

  const addPart = (): void => {
    if (namePart === '' || costPart === '') return
    setIdPart(idPart + 1)
    // @ts-expect-error initial state
    setParts([...parts, { id: idPart, namePart, costPart }])
    setNamePart('')
    setCostPart('')
    inputNamePart.current?.clear()
    inputCostPart.current?.clear()
  }
  const addService = (): void => {
    if (nameService === '' || costService === '') return
    setIdService(idService + 1)
    // @ts-expect-error initial state
    setServices([...services, { id: idService, nameService, costService }])
    setNameService('')
    setCostService('')
    inputNameService.current?.clear()
    inputCostService.current?.clear()
  }

  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center', fontSize: 12, fontStyle: 'italic', marginBottom: 10 }} >Добавьте доп информацию по текущему ТО или ремонту</Text>

      <View style={styles.viewAdditional}>
        <Text style={{ textAlign: 'center', fontSize: 12, fontStyle: 'italic' }} >Добавьте детали, которые вы использовали</Text>

        <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
          <Input
            ref={inputNamePart}
            placeholder={'артикул'}
            containerStyle={{ flex: 2 }}
            inputStyle={{ textAlign: 'center', fontSize: 16 }}
            /* label={'артикул детали'}
            labelStyle={{ textAlign: 'center' }} */
            /* errorMessage={'введите артикул'} */
            onChangeText={(value) => setNamePart(String(value)) }
            onSubmitEditing={() => inputCostPart.current?.focus()}
            value={namePart}
            defaultValue={''}
          />
          <Input
            ref={inputCostPart}
            placeholder={'цена'}
            containerStyle={{ flex: 1 }}
            inputStyle={{ textAlign: 'center', fontSize: 16 }}
            /* label={'цена'}
            labelStyle={{ textAlign: 'center' }} */
            /* errorMessage={'введите цену'} */
            onChangeText={(value) => setCostPart(value) }
            value={String(costPart)}
            keyboardType={'numeric'}
            defaultValue={''}
          />
          <Button
            title={'+'}
            containerStyle={{ flex: 0.5 }}
            onPress={addPart}
          />
        </View>

        <FlatList
          style={{ borderStyle: 'solid', borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginVertical: 10, marginHorizontal: 10 }}
          renderItem={({ item }) => listParts(item)}
          data={parts}
          // @ts-expect-error initial state
          keyExtractor={item => item.id.toString()}
        />
        <Text style={{ textAlign: 'center', fontSize: 12, fontStyle: 'italic' }} >Добавьте работы, которые были проведены</Text>

        <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
          <Input
            ref={inputNameService}
            placeholder={'название сервиса'}
            containerStyle={{ flex: 2 }}
            inputStyle={{ textAlign: 'center', fontSize: 12 }}
            /* label={'название сервиса'}
            labelStyle={{ textAlign: 'center' }} */
            onChangeText={(value) => { setNameService(String(value)) }}
            onSubmitEditing={() => inputCostService.current?.focus()}
            value={nameService}
            defaultValue={''}

          />
          <Input
            ref={inputCostService}
            placeholder={'цена работы'}
            containerStyle={{ flex: 1 }}
            inputStyle={{ textAlign: 'center', fontSize: 12 }}
            /* label={'цена'}
            labelStyle={{ textAlign: 'center' }} */
            onChangeText={(value) => { setCostService(value) }}
            value={String(costService)}
            keyboardType={'numeric'}
            defaultValue={''}
          />
          <Button
            title={'+'}
            containerStyle={{ flex: 0.5 }}
            onPress={addService}
          />
        </View>
        <FlatList
          style={{ borderStyle: 'solid', borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginVertical: 10, marginHorizontal: 10 }}
          renderItem={({ item }) => listParts(item)}
          data={services}
          // @ts-expect-error initial state
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>

      <Button
        containerStyle={{ width: '40%', borderRadius: 5 }}
        title={'Cancel'}
        color={'error'}
        onPress={onPress}
      />
        <Button
        containerStyle={{ width: '40%', borderRadius: 5 }}
        title={'Ok'}
        color={'success'}
        /* onPress={onPress} */
      />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textKm: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  viewKm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1
  },
  textDate: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1
  },
  viewAdditional: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10
  },
  button: {
    textAlign: 'center',
    color: 'red'
  }
})
