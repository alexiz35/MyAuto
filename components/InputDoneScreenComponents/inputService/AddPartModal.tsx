import { JSX, useEffect, useState } from 'react'
import {
  StyleSheet,
  View, ScrollView
} from 'react-native'
import { StatePart, ModalAddPartsProps, ModalPart } from '../../../type'
import { useAppSelector } from '../../Redux/hook'
import BackgroundView from '../../../CommonComponents/BackgroundView'
import Accordion from '../../Accordion'
import { Surface, TextInput, TouchableRipple, Button, IconButton, Text, Divider } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { useAppTheme } from '../../../CommonComponents/Theme'

interface FormAddParts {
  namePart: string
  numberPart: string
  costPart: string
  quantityPart: string
  sellerName: string
  sellerPhone: string
  sellerLink: string
}

export const AddPartModal = ({ onPressOk, onPressCancel, initialParts = [] }: ModalAddPartsProps): JSX.Element => {
  const state = useAppSelector(state => state.cars[0].parts)
  const theme = useAppTheme()

  const tempNullAddParts: FormAddParts = {
    namePart: '',
    numberPart: '',
    quantityPart: '',
    costPart: '',
    sellerName: '',
    sellerPhone: '',
    sellerLink: ''
  }

  const dataToForm = (data: ModalPart): FormAddParts => {
    return {
      namePart: data.namePart,
      numberPart: data.numberPart,
      costPart: String(data.costPart),
      quantityPart: String(data.quantityPart),
      sellerName: data.seller?.name === undefined ? '' : data.seller.name,
      sellerPhone: data.seller?.phone === undefined ? '' : data.seller.phone,
      sellerLink: data.seller?.web === undefined ? '' : data.seller.web
    }
  }

  const formToData = (data: FormAddParts): ModalPart => {
    return {
      id: Date.now(),
      namePart: data.namePart,
      numberPart: data.numberPart,
      costPart: Number(data.costPart),
      quantityPart: Number(data.quantityPart),
      seller: {
        name: data.sellerName,
        phone: data.sellerPhone,
        web: data.sellerLink
      }
    }
  }

  const [modalPart, setModalPart] = useState<ModalPart>(formToData(tempNullAddParts))

  const {
    control,
    handleSubmit,
    setFocus
  } = useForm<FormAddParts>({ mode: 'onBlur', defaultValues: tempNullAddParts, values: dataToForm(modalPart) })

  const [searchPart, setSearchPart] = useState('')
  const [filterPart, setFilterPart] = useState<StatePart[]>(state.filter((item) => !item.isInstall))
  const [visibleSearchList, setVisibleSearchList] = useState(false)

  const [parts, setParts] = useState<ModalPart[]>(initialParts)

  const delPart = (id: number): void => {
    const newParts = parts.filter((item: ModalPart) => item.id !== id)
    setParts(newParts)
  }

  const addPart = (dataForm: FormAddParts): void => {
    setParts([...parts, formToData(dataForm)])
    setModalPart(formToData(tempNullAddParts))
  }

  const filterSearch = (value: string): void => {
    if (searchPart !== '') {
      setFilterPart(state.filter((item: StatePart) => item.namePart.includes(value)))
    } else {
      setFilterPart(state.filter((item) => !item.isInstall))
    }
  }

  const selectSearch = (id: number): void => {
    const selectPart = state.filter((item: StatePart) => item.id === id)
    const tempSelectPart: ModalPart = {
      id: selectPart[0].id,
      namePart: selectPart[0].namePart,
      numberPart: selectPart[0].numberPart,
      costPart: selectPart[0].costPart,
      quantityPart: selectPart[0].quantityPart,
      seller: selectPart[0].seller
    }

    setModalPart(tempSelectPart)
    setSearchPart(tempSelectPart.namePart)
    setVisibleSearchList(false)
  }

  const listSearch = (item: StatePart): JSX.Element => {
    return (
      <TouchableRipple onPress={() => selectSearch(item.id) }>
        <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 2, padding: 10 }}>
          <Text style={{ flex: 2, textAlign: 'left', fontSize: 16 }}>{item.namePart}</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>
            {String(new Date(item.dateBuy).toLocaleDateString())}
          </Text>
        </View>
        <Divider horizontalInset bold/>
        </>
      </TouchableRipple>
    )
  }

  const listParts = (item: ModalPart, key: number): JSX.Element => {
    return (
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 2, height: 25, padding: 0 }}>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{key + 1}</Text>
          <Text style={{ flex: 2, textAlign: 'center', fontSize: 16 }}>{item.namePart}</Text>
          <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 16 }}>{`${item.quantityPart} x`}</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>{item.costPart}</Text>
          <IconButton icon={'delete'} style={{ margin: 2, alignSelf: 'center' }}
                      onPress={() => delPart(item.id)}
          />
        </View>
      <Divider horizontalInset bold/>
      </View>
    )
  }

  useEffect(() => {
    filterSearch(searchPart)
  }, [searchPart, state])

  return (
  <BackgroundView props={{ padding: 10 }}>
      <ScrollView >

      <View>

        <Text style={styles.textPart} >
          Добавьте детали, которые вы использовали
        </Text>

        <View style={{ zIndex: 2 }}>
          <Surface style={{ margin: 5, flex: 1 }}>
            <TextInput
              dense
              placeholder={'поиск на складе'}
              value={searchPart}
              onChangeText={(search) => setSearchPart(String(search))}
              onFocus={() => setVisibleSearchList(true)}
              right={
                <TextInput.Icon
                  style={{ zIndex: 10 }}
                  icon={'magnify'}
                  size={26}
                />
              }
            />
            {visibleSearchList &&
              <View style={{
                zIndex: 10,
                marginHorizontal: 0,
                position: 'absolute',
                top: 40,
                backgroundColor: theme.colors.background,
                /* height: 200, */
                width: '100%',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: theme.colors.outline
              }}>

                {
                  filterPart.map((item, index) => (
                    /* item.isInstall
                      ? null
                      :  */<View key={index}>
                      {listSearch(item)}
                    </View>
                  ))
                }
                <Button mode={'text'} onPress={() => setVisibleSearchList(false)}>^ Close ^</Button>
              </View>
            }
          </Surface>
        </View>
        <Text style={styles.textPart} >
          деталь
        </Text>
        <View style={styles.viewGroupInput}>
          <Surface elevation={2} style={styles.surface}>
            <Controller name={'namePart'}
                        control={control}
                        rules={{ required: 'введите название' }}
                        render={ ({ field: { onChange, value, ref, onBlur }, fieldState: { error } }) => (
                          <TextInput
                            ref={ref}
                            dense
                            style={{ flex: 1, backgroundColor: theme.colors.surface }}
                            label={'название'}
                            value={value}
                            onChangeText={(value) => onChange(value)}
                            onBlur={onBlur}
                            onSubmitEditing={() => setFocus('numberPart')}
                            error={(error != null) && true}
                          />
                        )}
            />
          </Surface>
          <Surface elevation={2} style={styles.surface}>
            <Controller name={'numberPart'}
                        control={control}
                        render={ ({ field: { onChange, value, ref, onBlur } }) => (
                          <TextInput
                            ref={ref}
                            dense
                            style={{ flex: 1, backgroundColor: theme.colors.surface }}
                            label={'номер детали'}
                            value={value}
                            onChangeText={(value) => onChange(value)}
                            onBlur={onBlur}
                            onSubmitEditing={() => setFocus('quantityPart')}
                          />
                        )}
            />
          </Surface>
        </View>

        <View style={styles.viewGroupInput}>
          <Surface elevation={2} style={styles.surface}>
            <Controller name={'quantityPart'}
                        control={control}
                        render={ ({ field: { onChange, value, ref, onBlur } }) => (
                          <TextInput
                            ref={ref}
                            dense
                            keyboardType={'numeric'}
                            style={{ flex: 1, backgroundColor: theme.colors.surface }}
                            label={'количество'}
                            value={value}
                            onChangeText={(value) => onChange(value)}
                            onBlur={onBlur}
                            onSubmitEditing={() => setFocus('costPart')}
                          />
                        )}
            />
          </Surface>
          <Surface elevation={2} style={styles.surface}>
            <Controller name={'costPart'}
                        control={control}
                        render={ ({ field: { onChange, value, ref, onBlur } }) => (
                          <TextInput
                            ref={ref}
                            dense
                            keyboardType={'numeric'}
                            style={{ flex: 1, backgroundColor: theme.colors.surface }}
                            label={'цена детали'}
                            value={value}
                            onChangeText={(value) => onChange(value)}
                            onBlur={onBlur}
                          />
                        )}
            />
          </Surface>
        </View>
        <Surface elevation={2} style={styles.surface}>
        <Accordion
          insideView={
          <>
          <View style={styles.viewGroupInput}>
            <Surface elevation={0} style={styles.surface}>
              <Controller name={'sellerName'}
                          control={control}
                          render={ ({ field: { onChange, value, ref, onBlur } }) => (
                            <TextInput
                              ref={ref}
                              dense
                              style={{ flex: 1, backgroundColor: theme.colors.surface }}
                              label={'продавец'}
                              value={value}
                              onChangeText={(value) => onChange(value)}
                              onBlur={onBlur}
                              onSubmitEditing={() => setFocus('sellerPhone')}
                            />
                          )}
              />
            </Surface>
            <Surface elevation={0} style={styles.surface}>
              <Controller name={'sellerPhone'}
                          control={control}
                          render={ ({ field: { onChange, value, ref, onBlur } }) => (
                            <TextInput
                              ref={ref}
                              dense
                              keyboardType={'phone-pad'}
                              style={{ flex: 1, backgroundColor: theme.colors.surface }}
                              label={'телефон продавца'}
                              value={value}
                              onChangeText={(value) => onChange(value)}
                              onBlur={onBlur}
                              onSubmitEditing={() => setFocus('sellerLink')}
                            />
                          )}
              />
            </Surface>
          </View>
            <Surface elevation={0} style={styles.surface}>
              <Controller name={'sellerLink'}
                          control={control}
                          render={ ({ field: { onChange, value, ref, onBlur } }) => (
                            <TextInput
                              ref={ref}
                              dense
                              style={{ flex: 1, backgroundColor: theme.colors.surface }}
                              label={'данные продавца'}
                              value={value}
                              onChangeText={(value) => onChange(value)}
                              onBlur={onBlur}
                            />
                          )}
              />
            </Surface>
          </>
        }
          title={'Информация о продавце'}
          controlled={false}
          textBannerStyle={{
            fontSize: 14,
            color: theme.colors.secondary
          }}
        />
        </Surface>
        <View style={styles.viewPart}>
          <Button
            style={{ flex: 1, borderRadius: 5 }}
            mode={'elevated'}
            icon={'basket-plus'}
            onPress={handleSubmit(addPart)}
          >Добавьте деталь</Button>
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
        style={styles.buttonStyle}
        onPress={() => {
          onPressCancel()
        }}
        mode={'elevated'}
      >Cancel</Button>
        <Button
        style={styles.buttonStyle}
        onPress={() => {
          // @ts-expect-error parts type
          onPressOk(parts)
        }}
        mode={'elevated'}
        >Finish</Button>
      </View>
      </ScrollView>
  </BackgroundView>

  )
}

const styles = StyleSheet.create({
  surface: {
    margin: 5,
    flex: 1
  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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
