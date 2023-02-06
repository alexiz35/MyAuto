import React, { PropsWithChildren, useState } from 'react'
import {
  FlatList, Pressable,
  SafeAreaView,
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native'
import { Button, Divider, Icon, Input } from '@rneui/themed'
import { PartList, PropsBottomSheet } from '../type'

export const BottomSheetAddition = ({ onPressOk, onPressCancel, initialParts }: PropsBottomSheet): JSX.Element => {
  const [namePart, setNamePart] = useState('')
  const [numberPart, setNumberPart] = useState('')
  const [costPart, setCostPart] = useState(0)
  const [amountPart, setAmountPart] = useState(1)
  const [idPart, setIdPart] = useState(initialParts === undefined ? 1 : initialParts.length + 1)

  const [parts, setParts] = useState<PartList[]>(initialParts === undefined ? [] : initialParts)

  /* const [isVisiblePart, setIsVisiblePart] = useState(false) */
  /*  const [nameService, setNameService] = useState('')
  const [costService, setCostService] = useState('')
  const [idService, setIdService] = useState(1) */
  /*   const [services, setServices] = useState([]) */
  /*  const [isVisibleService, setIsVisibleService] = useState(false) */

  const inputNamePart = React.createRef<PropsWithChildren<TextInput>>()
  const inputCostPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputAmountPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputNumberPart = React.createRef<PropsWithChildren<TextInput>>()

  const delPart = (id: number): void => {
    let newId = 0
    const newParts = parts.filter((item: PartList) => item.id !== id)
    newParts.forEach((item: PartList) => {
      item.id = newId + 1
      ++newId
    })
    ;(newParts.length > 0)
      ? setIdPart(newParts.length + 1)
      : setIdPart(1)
    setParts(newParts)
  }
  /* const delService = (id: number): void => {
    let newId = 0
    const newServices = services.filter((item: ServiceList) => item.id !== id)
    newServices.forEach((item: ServiceList) => {
      item.id = newId + 1
      ++newId
    })
    ;(newServices.length > 0)
      ? setIdService(newServices.length + 1)
      : setIdService(1)
    setServices(newServices)
  } */

  const addPart = (): void => {
    if (namePart === '') return
    setIdPart(idPart + 1)
    setParts([...parts, { id: idPart, namePart, costPart, amountPart, numberPart }])
    setNamePart('')
    setCostPart(0)
    setNumberPart('')
    setAmountPart(1)
    inputNamePart.current?.clear()
    inputCostPart.current?.clear()
    inputNumberPart.current?.clear()
    console.log('add', parts)
  }
  /*  const addService = (): void => {
    if (nameService === '' || costService === '') return
    setIdService(idService + 1)
    // @ts-expect-error initial state
    setServices([...services, { id: idService, nameService, costService }])
    setNameService('')
    setCostService('')
    inputNameService.current?.clear()
    inputCostService.current?.clear()
  } */

  /* const handleOkModal = (partName: string, partCost: string): void => {
    setIsVisiblePart(false)
    setNamePart(partName)
    setCostPart(partCost)
  } */

  /*   useEffect(() => {
    addPart()
  }, [namePart, costPart]) */

  /* const handleCancelModal = (): void => {
    setIsVisiblePart(false)
  } */

  const listParts = (item: PartList): JSX.Element => {
    return (
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 2 }}>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{item.id}</Text>
          <Text style={{ flex: 2, textAlign: 'center', fontSize: 16 }}>{item.namePart}</Text>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{`${item.amountPart} x`}</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>{item.costPart}</Text>
          <View style={{ height: '80%' }}>
            <Pressable>
              <Text>
                <Icon name={'delete'} onPress={() =>
                  /* 'namePart' in item ? delPart(item.id) : delService(item.id) */
                  delPart(item.id)
                }>
                </Icon>
              </Text>
            </Pressable>

          </View>
        </View>
      <Divider inset={true} insetType={'middle'}/>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <Text style={styles.textTop} >
        Добавьте доп информацию по текущему ТО или ремонту
      </Text>

      <View style={styles.viewAdditional}>

        <Text style={styles.textPart} >
          Добавьте детали, которые вы использовали
        </Text>

        <View style={styles.viewGroupInput}>
          <View style={styles.input}>
            <Input
              ref={inputNamePart}
              placeholder={'наименование'}
              placeholderTextColor={'red'}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'наименование'}
              errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
              onChangeText={(value) => setNamePart(String(value))}
            />
          </View>
          <View style={styles.input}>
            <Input
              ref={inputNumberPart}
              placeholder={'введите номер'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'номер детали'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setNumberPart(String(value))}
            />
          </View>
        </View>

        <View style={styles.viewGroupInput}>
          <View style={styles.input}>
            <Input
              ref={inputAmountPart}
              placeholder={'кол-во'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              onChangeText={(value) => setAmountPart(Number(value))}
              errorMessage={'количество'}
              errorStyle={styles.errorInput}
              value={String(amountPart)}
              defaultValue={String(1)}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.input}>
            <Input
              ref={inputCostPart}
              placeholder={'введите цену'}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'цена деиали'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setCostPart(Number(value))}
              keyboardType={'numeric'}
            />
          </View>
        </View>

        <View style={styles.viewPart}>
          <Button
            radius={'5'}
            /* title={'+'} */
            color={'secondary'}
            buttonStyle={{ paddingHorizontal: 0 }}
            /* type={'outline'} */
            icon={{ name: 'plus', type: 'font-awesome', color: 'white' }}
            containerStyle={{ flex: 1, padding: 0, margin: 0 }}
            onPress={addPart}
            /* onPress={() => setIsVisiblePart(true)} */
          />
        </View>

        <FlatList
          style={styles.flatList}
          renderItem={({ item }) => listParts(item)}
          data={parts}
          keyExtractor={item => item.id.toString()}
        />
      {/*   <Text style={styles.textPart} >
          Добавьте работы, которые были проведены
        </Text>

        <View style={styles.viewPart}>
          <Button
            title={'+'}
            radius={'5'}
            color={'secondary'}
            containerStyle={{ flex: 1 }}
            onPress={addService}
          />
        </View>
        <FlatList
          style={styles.flatList}
          renderItem={({ item }) => listParts(item)}
          data={services}
          // @ts-expect-error initial state
          keyExtractor={item => item.id.toString()}
        />
      </View> */}
      </View>
      <View style={styles.viewButton}>

      <Button
        containerStyle={styles.buttonStyle}
        buttonStyle={{ borderColor: 'black' }}
        titleStyle={{ color: 'black' }}
        title={'Cancel'}
        onPress={onPressCancel}
        type='outline'
      />
        <Button
        containerStyle={styles.buttonStyle}
        buttonStyle={{ borderColor: 'black' }}
        titleStyle={{ color: 'black' }}
        title={'Finish'}
        onPress={() => { onPressOk(parts) }}
        type={'outline'}
      />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewAdditional: {
    /* backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10 */
  },

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    margin: 5,
    backgroundColor: 'white',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },

  textTop: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10
  },
  textPart: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic'
  },
  viewPart: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10
  },
  flatList: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  inputPartStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  inputServiceStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
