import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StatePart } from '../../type'
import { addPart, editPart } from '../Redux/actions'

import BackgroundView from '../../CommonComponents/BackgroundView'
import {
  useTheme,
  List,
  ToggleButton
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { PartsList } from './PartsList'
import InputPartComponent from '../../CommonComponents/InputPartComponent'

/* type Props = NativeStackScreenProps<RootStackParamList, 'FuelScreen'> */
/* type Props = NativeStackScreenProps<RootStackParamList,'I'> */

const InputPart = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.cars[state.numberCar])
  const carId = useAppSelector(state => state.numberCar)
  const { colors } = useTheme()
  const nav = useNavigation()

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isEditPart, setIsEditPart] = useState(false)
  const [itemPart, setItemPart] = useState<StatePart | undefined>()

  const [isList, setIsList] = useState(true)
  const [dateList, setDateList] = useState('last')

  const clearInput = (): void => {
    setIsEditPart(false)
    setItemPart(undefined)
  }

  // --------------------------Hide tabBottom when openAccordion-----------------
  useEffect(() => {
    if (openAccordion) nav.setOptions({ tabBarStyle: { display: 'none', backgroundColor: colors.background } })
    else nav.setOptions({ tabBarStyle: { display: 'flex', backgroundColor: colors.background } })
  }, [openAccordion])
  // ------------------------- control according -------------------------------
  const handleOpen = (item: StatePart): void => {
    setIsList(false)
    setOpenAccordion(true)
    setIsEditPart(true)
    setItemPart(item)
  }

  const handleOnPress = (): void => {
    if (!openAccordion) {
      setIsList(false)
    } else setTimeout(() => setIsList(true), 100)
    setOpenAccordion(!openAccordion)
    clearInput()
  }
  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    handleOnPress()
  }

  const handleOk = (dataForm: StatePart): void => {
    setTimeout(() =>
      isEditPart
        ? dispatch(editPart(carId, itemPart?.id, dataForm))
        : dispatch(addPart(carId, dataForm))
    , 100)
    handleOnPress()
  }

  return (
    <BackgroundView props={{ flex: 1 }}>

      <View style={{ flex: 1 }} >
        {
/* ----------------------- Top String --------------------------------------- */
        }

        {
/* ----------------------- Form Accordion ----------------------------------- */
        }
        <KeyboardAvoidingView>
        <ScrollView style={{ marginTop: 5 }}>
            <List.Accordion
              title={isEditPart ? 'Редактируйте деталь' : 'Добавьте деталь'}
              /* description={ state.info.fuel } */
              style={{ backgroundColor: colors.secondaryContainer }}
              /* left={props => <List.Icon {...props} icon="car-cog" />} */
              expanded={openAccordion}
              onPress={handleOnPress}
            >

              <InputPartComponent isCancel={handleCancel} isOk={handleOk} part={itemPart} isEdit={isEditPart}/>

            </List.Accordion>
        </ScrollView>
        </KeyboardAvoidingView>
        {
/* ----------------------- List Fuel ---------------------------------------- */
        }

        {isList &&
          <View style={styles.flatList}>
            <ToggleButton.Row onValueChange={value => setDateList(value)}
                              value={dateList}
                              style={{ alignSelf: 'flex-end', marginBottom: 10 }}
            >
              <ToggleButton icon="numeric-3" value="last" size={20} style={{ height: 20 }}/>
              <ToggleButton icon="numeric-10" value="ten" size={20} style={{ height: 20 }}/>
              <ToggleButton icon="calendar" value="choice" size={15} style={{ height: 20 }}/>
            </ToggleButton.Row>

            <PartsList handlePress={handleOpen} filterList={dateList}/>

          </View>
        }
        {
/* -------------------------------------------------------------------------- */
        }
      </View>
    </BackgroundView>
  )
}

export default InputPart

const styles = StyleSheet.create({

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 10
    /* marginVertical: 10 */
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
