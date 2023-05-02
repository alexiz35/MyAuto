import React, { PropsWithChildren, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  TextInput,
  View, ScrollView
} from 'react-native'
import { Button, Text, Divider, Icon, Input, useTheme } from '@rneui/themed'
import { BACK_INPUT, StatePart, PropsBottomSheet, Seller, ModalPart } from '../type'
import { useAppSelector } from './Redux/hook'
import BackgroundView from '../CommonComponents/BackgroundView'
import ShadowBox from '../CommonComponents/ShadowBox'
import Accordion from './Accordion'

export const AddPartModal = ({ onPressOk, onPressCancel, initialParts = [] }: PropsBottomSheet): JSX.Element => {
  const state = useAppSelector(state => state.cars[0].parts)
  const { theme } = useTheme()

  const [namePart, setNamePart] = useState('')
  const [numberPart, setNumberPart] = useState('')
  const [costPart, setCostPart] = useState(0)
  const [quantityPart, setQuantityPart] = useState(1)
  const [sellerName, setSellerName] = useState('')
  const [sellerPhone, setSellerPhone] = useState('')
  const [sellerLink, setSellerLink] = useState('')
  const [seller, setSeller] = useState<Seller>()

  const [searchPart, setSearchPart] = useState('')
  const [visibleSearchList, setVisibleSearchList] = useState(false)

  const [parts, setParts] = useState<ModalPart[]>(initialParts)

  const inputNamePart = React.createRef<PropsWithChildren<TextInput>>()
  const inputCostPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputAmountPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputNumberPart = React.createRef<PropsWithChildren<TextInput>>()
  const inputSellerName = React.createRef<PropsWithChildren<TextInput>>()
  const inputSellerPhone = React.createRef<PropsWithChildren<TextInput>>()
  const inputSellerLink = React.createRef<PropsWithChildren<TextInput>>()

  const delPart = (id: number): void => {
    const newParts = parts.filter((item: ModalPart) => item.id !== id)
    setParts(newParts)
  }

  const addPart = (): void => {
    if (namePart === '') return
    setSeller({ ...seller, name: sellerName, phone: sellerPhone, link: sellerLink })
    setParts([...parts, { id: Date.now(), namePart, costPart, quantityPart, numberPart, seller }])
    setNamePart('')
    setCostPart(0)
    setNumberPart('')
    setQuantityPart(1)
    inputNamePart.current?.clear()
    inputCostPart.current?.clear()
    inputNumberPart.current?.clear()
  }

  const selectSearch = (id: number): void => {
    const selectPart = state.filter((item: StatePart) => item.id === id)
    setNamePart(selectPart[0].namePart)
    setNumberPart(selectPart[0].numberPart)
    setCostPart(selectPart[0].costPart)
    setVisibleSearchList(false)
  }

  const listSearch = (item: StatePart): JSX.Element => {
    return (
      <Pressable onPress={() => selectSearch(item.id)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 2, padding: 10 }}>
          <Text style={{ flex: 2, textAlign: 'left', fontSize: 16 }}>{item.namePart}</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>
            {String(new Date(item.dateBuy).toLocaleDateString())}
          </Text>

        </View>
        <Divider style={{ padding: 5 }}/>
      </Pressable>
    )
  }

  const listParts = (item: ModalPart, key: number): JSX.Element => {
    return (
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 2 }}>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{key + 1}</Text>
          <Text style={{ flex: 2, textAlign: 'center', fontSize: 16 }}>{item.namePart}</Text>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{`${item.quantityPart} x`}</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>{item.costPart}</Text>
          <View style={{ height: '80%' }}>
            <Pressable>
              <Text style={{ paddingBottom: 2 }}>
                <Icon
                  name={'delete'}
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
  <BackgroundView props={{ padding: 10 }}>
      <ScrollView >

      <View style={styles.viewAdditional}>

        <Text style={styles.textPart} >
          Добавьте детали, которые вы использовали
        </Text>

        <View style={{ zIndex: 2 }}>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              renderErrorMessage={false}
              inputStyle={styles.inputText}
              placeholder={'введите название'}
              value={searchPart}
              onChangeText={(search) => setSearchPart(String(search))}
              onFocus={() => setVisibleSearchList(true)}
              /* onBlur={() => setVisibleSearchList(false)} */
              /* cancelIcon={{ name: 'account-cash', type: 'material-community', size: 20 }} */
              rightIcon={
                <Icon
                  name={!visibleSearchList ? 'magnify' : 'close-box-outline'}
                  type={'material-community'}
                  size={22}
                  onPress={() => setVisibleSearchList(false)}
                />
              }
            />
          </ShadowBox>
          {visibleSearchList &&
            <View style={{
              marginHorizontal: 7,
              position: 'absolute',
              top: 53,
              backgroundColor: theme.colors.background,
              /* height: 200, */
              width: '95%',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: theme.colors.greyOutline
            }}>

            {
              state.map((item, index) => (
                item.isInstall
                  ? null
                  : <View key={index}>
            {listSearch(item)}
              </View>
              ))
            }
          </View>
              }
        </View>
        <Text style={styles.textPart} >
          или добавьте новые
        </Text>
        <View style={styles.viewGroupInput}>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={inputNamePart}
              placeholder={'наименование'}
              placeholderTextColor={'red'}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'наименование'}
              errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
              onChangeText={(value) => setNamePart(String(value))}
              value={String(namePart)}
            />
          </ShadowBox>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={inputNumberPart}
              placeholder={'введите номер'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'номер детали'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setNumberPart(String(value))}
              value={String(numberPart)}
            />
          </ShadowBox>
        </View>

        <View style={styles.viewGroupInput}>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={inputAmountPart}
              placeholder={'кол-во'}
              containerStyle={{ flex: 1 }}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              onChangeText={(value) => setQuantityPart(Number(value))}
              errorMessage={'количество'}
              errorStyle={styles.errorInput}
              value={String(quantityPart)}
              defaultValue={String(1)}
              keyboardType={'numeric'}
            />
          </ShadowBox>
          <ShadowBox style={{ margin: 5, flex: 1 }}>
            <Input
              ref={inputCostPart}
              placeholder={'введите цену'}
              inputStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={'цена детали'}
              errorStyle={styles.errorInput}
              onChangeText={(value) => setCostPart(Number(value))}
              keyboardType={'numeric'}
              value={String(costPart)}
            />
          </ShadowBox>
        </View>
        <Accordion
          insideView={
          <View style={{ borderWidth: 1, borderColor: theme.colors.greyOutline }}>
          <View style={styles.viewGroupInput}>
            <ShadowBox style={{ margin: 5, flex: 1 }}>
              <Input
                ref={inputSellerName}
                placeholder={'продавец'}
                placeholderTextColor={'red'}
                inputStyle={{ textAlign: 'center', fontSize: 12 }}
                errorMessage={'продавец'}
                errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
                onChangeText={(value) => setSellerName(String(value))}
              />
            </ShadowBox>
            <ShadowBox style={{ margin: 5, flex: 1 }}>
              <Input
                ref={inputSellerPhone}
                placeholder={'телефон'}
                inputStyle={{ textAlign: 'center', fontSize: 12 }}
                errorMessage={'номер телефона'}
                errorStyle={styles.errorInput}
                onChangeText={(value) => setSellerPhone(String(value))}
              />
            </ShadowBox>
          </View>
            <ShadowBox style={{ margin: 5, flex: 1 }}>
              <Input
                ref={inputSellerLink}
                placeholder={'данные продавцв'}
                multiline={true}
                inputStyle={{ textAlign: 'center', fontSize: 12 }}
                errorMessage={'данные продавца'}
                errorStyle={styles.errorInput}
                onChangeText={(value) => setSellerLink(String(value))}
              />
            </ShadowBox>
          </View>
        }
          title={'Информация о покупке'}
          controlled={false}
          bannerStyle={{ height: 30, padding: 5, backgroundColor: BACK_INPUT }}
        />

        <View style={styles.viewPart}>
          <Button
            radius={'5'}
            color={'secondary'}
            buttonStyle={{ paddingHorizontal: 0 }}
            icon={{ name: 'plus', type: 'font-awesome', color: 'white' }}
            containerStyle={{ flex: 1, padding: 0, margin: 0 }}
            onPress={addPart}
          />
        </View>
        <View style={styles.flatList}>

          {
            parts.map((item, index) => (
              <View key ={index}>
                {listParts(item, index)}
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.viewButton}>

      <Button
        containerStyle={styles.buttonStyle}
        title={'Cancel'}
        onPress={() => {
          onPressCancel()
        }}
        color={'error'}
        type={'solid'}
      />
        <Button
        containerStyle={styles.buttonStyle}
        title={'Finish'}
        onPress={() => {
          // @ts-expect-error parts type
          onPressOk(parts)
        }}
        color={'success'}
        type={'solid'}
      />
      </View>
      </ScrollView>
  </BackgroundView>

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
  inputText: {
    textAlign: 'center',
    fontSize: 14
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
