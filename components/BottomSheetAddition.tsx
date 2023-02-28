import React, { PropsWithChildren, useEffect, useState } from 'react'
import {
  FlatList, ImageBackground, Pressable,
  SafeAreaView,
  StyleSheet,
  Text, TextInput,
  View, ScrollView
} from 'react-native'
import { Button, Divider, Icon, Input } from '@rneui/themed'
import { BACK_INPUT, COLOR_GREEN, PartList, PropsBottomSheet, Seller, TEXT_WHITE } from '../type'
import { SimpleAccordion } from 'react-native-simple-accordion'
import { FlashList } from '@shopify/flash-list'

export const BottomSheetAddition = ({ onPressOk, onPressCancel, initialParts }: PropsBottomSheet): JSX.Element => {
  const [namePart, setNamePart] = useState('')
  const [numberPart, setNumberPart] = useState('')
  const [costPart, setCostPart] = useState(0)
  const [amountPart, setAmountPart] = useState(1)
  const [sellerName, setSellerName] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [sellerLink, setSellerLink] = useState('')
  const [seller, setSeller] = useState<Seller>()

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
  const inputSellerName = React.createRef<PropsWithChildren<TextInput>>()
  const inputSellerPhone = React.createRef<PropsWithChildren<TextInput>>()
  const inputSellerLink = React.createRef<PropsWithChildren<TextInput>>()

  const delPart = (id: number): void => {
    let newId = 0
    const newParts = parts.filter((item: PartList) => item.id !== id)
    newParts.forEach((item: PartList) => {
      item.id = newId + 1
      ++newId
    })
    newParts.length > 0
      ? setIdPart(newParts.length + 1)
      : setIdPart(1)
    /* setParts(newParts) */
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
  const handleCancel = () => {
    onPressCancel()
  }

  const addPart = (): void => {
    if (namePart === '') return
    setIdPart(idPart + 1)
    setSeller({ name: sellerName, phone: sellerPhone, link: sellerLink })
    setParts([...parts, { id: idPart, namePart, costPart, amountPart, numberPart, seller }])
    setNamePart('')
    setCostPart(0)
    setNumberPart('')
    setAmountPart(1)
    inputNamePart.current?.clear()
    inputCostPart.current?.clear()
    inputNumberPart.current?.clear()
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
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16, color: TEXT_WHITE }}>{item.id}</Text>
          <Text style={{ flex: 2, textAlign: 'center', fontSize: 16, color: TEXT_WHITE }}>{item.namePart}</Text>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16, color: TEXT_WHITE }}>{`${item.amountPart} x`}</Text>
          <Text style={{ flex: 1, textAlign: 'center', color: TEXT_WHITE }}>{item.costPart}</Text>
          <View style={{ height: '80%' }}>
            <Pressable>
              <Text style={{ paddingBottom: 2 }}>
                <Icon
                  name={'delete'}
                  color={TEXT_WHITE}
                  onPress={() =>
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
    <ImageBackground source={require('../assets/Back2.png')} style={{ padding: 10 }} >
      <ScrollView >
    {/* <Text style={styles.textTop} >
        Добавьте доп информацию по текущему ТО или ремонту
      </Text> */}

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
              inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
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
              inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
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
              inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
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
              inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
              errorMessage={'цена детали'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setCostPart(Number(value))}
              keyboardType={'numeric'}
            />
          </View>
        </View>
        <SimpleAccordion
          viewInside={
          <View style={{ height: '100%' }}>
          <View style={styles.viewGroupInput}>
            <View style={styles.input}>
              <Input
                ref={inputSellerName}
                placeholder={'продавец'}
                placeholderTextColor={'red'}
                inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                errorMessage={'магазин или имя продавца'}
                errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                onChangeText={(value) => setSellerName(String(value))}
              />
            </View>
            <View style={styles.input}>
              <Input
                ref={inputSellerPhone}
                placeholder={'телефон'}
                containerStyle={{ flex: 1 }}
                inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                errorMessage={'номер телефона'}
                errorStyle={styles.errorInput}
                onChangeText={(value) => setSellerPhone(String(value))}
              />
            </View>
          </View>
            <View style={styles.input}>
              <Input
                ref={inputSellerLink}
                placeholder={'данные продавцв'}
                multiline={true}
                containerStyle={{ flex: 1 }}
                inputStyle={{ textAlign: 'center', fontSize: 12, color: TEXT_WHITE }}
                errorMessage={'данные продавца'}
                errorStyle={styles.errorInput}
                onChangeText={(value) => setSellerLink(String(value))}
              />
            </View>
          </View>
        }
          title={'Информация о покупке'}
          bannerStyle={{ backgroundColor: BACK_INPUT, height: 30, padding: 5 }}
          titleStyle={{ color: TEXT_WHITE, textAlign: 'center', fontWeight: 'normal', fontSize: 16 }}
          viewContainerStyle={{ backgroundColor: BACK_INPUT }}
        />

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
        <View style={styles.flatList}>
        {/* <FlashList
          scrollEnabled={false}
          nestedScrollEnabled={true}
          renderItem={({ item }) => listParts(item)}
          data={parts}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={20}
          ListEmptyComponent={<View style={{ height: 25 }}></View>}
        /> */}
          {
            parts.map((item, index) => (
              <View key ={index}>
                {listParts(item)}
              </View>
            ))
          }
        </View>
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
        buttonStyle={{ borderColor: 'red' }}
        titleStyle={{ color: 'red' }}
        title={'Cancel'}
        onPress={
          handleCancel
        }
        type='outline'
      />
        <Button
        containerStyle={styles.buttonStyle}
        buttonStyle={{ borderColor: COLOR_GREEN }}
        titleStyle={{ color: COLOR_GREEN }}
        title={'Finish'}
        onPress={() => { onPressOk(parts) }}
        type={'outline'}
      />
      </View>
      </ScrollView>
    </ImageBackground>

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
    backgroundColor: BACK_INPUT,
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
    marginBottom: 10,
    color: TEXT_WHITE
  },
  textPart: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    color: TEXT_WHITE

  },
  viewPart: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10
  },
  flatList: {
    flex: 1,
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
