import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { useAppTheme } from '../CommonComponents/Theme'
import { CurrentMiles, getIndexCar } from '../type'
import { JSX, useState } from 'react'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  Card,
  HelperText, IconButton,
  TextInput,
  ToggleButton
} from 'react-native-paper'
import { MileageList } from '../components/MileageScreenComponents/MileageList'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { delItemMileage, editedCurrentMiles, editedItemMileage } from '../components/Redux/CarsSlice'

const MileageScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()

  const tempNullMileage: CurrentMiles = {
    dateMileage: new Date(),
    currentMileage: 0
  }
  let listMileage: CurrentMiles[]
  listMileage = useAppSelector(
    state => state.cars[getIndexCar(state.cars, state.numberCar)].mileage
  )
  const numberCar = useAppSelector(state => state.numberCar)
  const currentMiles = useAppSelector(state =>
    state.cars[getIndexCar(state.cars, state.numberCar)].currentMiles
  )
  const [itemChecked, setItemChecked] = useState<CurrentMiles>(tempNullMileage)
  const [itemMileage, setItemMileage] = useState<CurrentMiles>(tempNullMileage)
  const [mileageError, setMileageError] = useState('')

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const [visibleEditMileage, setVisibleEditMileage] = useState(false)

  const clearInput = (): void => {
    setItemMileage(tempNullMileage)
    setMileageError('')
  }

  const changeTextMileage = (value: string) => {
    if (isNaN(Number(value))) return
    setItemMileage({
      ...itemMileage,
      currentMileage: Number(value)
    })
  }

  const inputDateMileage = (): void => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, date = new Date()) => { setItemMileage({ ...itemMileage, dateMileage: date }) }
    })
  }

  const pressRowMileage = (item: CurrentMiles): void => {
    setMileageError('')
    setItemMileage(item)
    setItemChecked(item)
    setVisibleEditMileage(true)
  }

  const delRowMileage = (item: CurrentMiles): void => {
    // ************ check deleting item is currentMileage **************************************
    if (Date.parse(String(item.dateMileage)) === Date.parse(String(currentMiles.dateMileage))) {
      // **************** check deleting item isn't one ***************************************
      if (listMileage.length !== 1) {
        const tempListMileage = listMileage.slice().sort((a, b) =>
          a.currentMileage - b.currentMileage
        )
        const index = tempListMileage.findIndex((value) =>
          Date.parse(String(value.dateMileage)) === Date.parse(String(item.dateMileage))
        )
        const tempItem: CurrentMiles = tempListMileage[index - 1]
        // ******* if deleting item is currentMileage then currentMiles  = before item ********
        dispatch(editedCurrentMiles({ numberCar, currentMiles: tempItem }))
        // ********if deleting item is one then delete currentMiles ***************************
      } else dispatch(editedCurrentMiles({ numberCar, currentMiles: tempNullMileage }))
    }
    dispatch(delItemMileage({ numberCar, item }))
  }
  const closeEditMileage = (): void => {
    clearInput()
    setVisibleEditMileage(false)
  }
  // -------- navigation by another screen with item param ---------------------
  /* useFocusEffect(
    useCallback(() => {

    }, [])
  ) */

  // ------------------------- button result -----------------------------------

  const checkMileage = (array: CurrentMiles[], item: CurrentMiles) => {
    const index = array.findIndex((value) =>
      Date.parse(String(value.dateMileage)) === Date.parse(String(item.dateMileage))
    )
    const isLessPrev = () => {
      return !(item.currentMileage > array[index - 1].currentMileage)
    }
    const isMoreNext = () => {
      return !(item.currentMileage < array[index + 1].currentMileage)
    }
    if (index !== -1 && array.length !== 1) {
      if (index === 0) {
        if (isMoreNext()) {
          setMileageError('Пробег больше следующего')
          return false
        } else {
          setMileageError('')
          return true
        }
      } else if (index === array.length - 1) {
        if (isLessPrev()) {
          setMileageError('Пробег меньше предыдущего')
          return false
        } else {
          setMileageError('')
          return true
        }
      } else if (isLessPrev()) {
        setMileageError('Пробег меньше предыдущего')
        return false
      } else if (isMoreNext()) {
        setMileageError('Пробег больше следующего')
        return false
      } else {
        setMileageError('')
        return true
      }
    }
  }

  const handleOk = (): void => {
    listMileage = listMileage.slice().sort((a, b) => a.currentMileage - b.currentMileage)
    if (checkMileage(listMileage, itemMileage)) {
      if (Date.parse(String(itemMileage.dateMileage)) === Date.parse(String(currentMiles.dateMileage))) {
        dispatch(editedCurrentMiles({ numberCar, currentMiles: itemMileage }))
      }
      dispatch(editedItemMileage({ numberCar, item: itemMileage }))
      closeEditMileage()
    }
  }

  return (
    <BackgroundView props={{ flex: 1 }}>

      <View style={{ flex: 1 }} >
        {
          /* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView>
          <ScrollView style={{ marginTop: 5 }}>
            {visibleEditMileage
              ? <Card mode={'elevated'} style={{ margin: 15 }}>

              <Card.Title title={'Корректировка пробега'} titleStyle={{ textAlign: 'center' }}/>
              <Card.Content style={{
                flexDirection: 'row',
                columnGap: 10,
                justifyContent: 'space-around'
              }}>

                <View style={{ flex: 1 }}>
                  <TextInput
                    dense
                    mode={'flat'}
                    onPressIn={inputDateMileage}
                    value={new Date(itemMileage.dateMileage).toLocaleDateString()}
                    disabled
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <TextInput
                    keyboardType={'numeric'}
                    dense
                    mode={'flat'}
                    value={String(itemMileage.currentMileage)}
                    onChangeText={value => { changeTextMileage(value) }}
                    error={!!mileageError}
                  />
                </View>
              </Card.Content>
                {mileageError ? <HelperText type={'error'} style={{ textAlign: 'center' }}>{mileageError}</HelperText> : null}

              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                columnGap: 20
              }}>
                <IconButton icon={'close-thick'} mode={'outlined'} style={{ borderWidth: 0 }} iconColor={colors.error}
                            onPress={() => {
                              closeEditMileage()
                            }} />
                <IconButton icon={'check-bold'} mode={'outlined'} style={{ borderWidth: 0 }} iconColor={colors.tertiary}
                            onPress={handleOk}
                />
              </View>
            </Card>
              : null}
          </ScrollView>
        </KeyboardAvoidingView>
        {
          /* ----------------------- List Fuel ---------------------------------------- */
        }
        {isList &&
          <View style={styles.flatList}>
            <ToggleButton.Row onValueChange={value => { setDateList(value) }}
                              value={dateList}
                              style={{ alignSelf: 'flex-end', marginBottom: 10 }}
            >
              <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 20 }}/>
              <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 20 }}/>
              <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 20 }}/>
            </ToggleButton.Row>

            <MileageList delPress={delRowMileage} handlePress={pressRowMileage} filterList={dateList} editPress={pressRowMileage} />

          </View>
        }
        {
          /* -------------------------------------------------------------------------- */
        }
       {/*  <Portal>
          <ModalInfoSeller item={itemSeller} visible={visibleInfo} close={closeModalInfo} />
        </Portal> */}
      </View>
    </BackgroundView>
  )
}
export default MileageScreen

const styles = StyleSheet.create({

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 10
  },
  surface: {
    margin: 5,
    flex: 1
  },
  flatList: {
    marginTop: 15,
    height: 400
  },
  inputText: {
    textAlign: 'center',
    fontSize: 14
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },

  button: {
    textAlign: 'center',
    color: 'red'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
