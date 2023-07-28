import {
  View,
  StyleSheet,
  TextInput, ActivityIndicator, Pressable
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Dialog, Divider, Icon, Input, ListItem, Text } from '@rneui/themed'
import React, {
  PropsWithChildren,
  RefObject, useEffect,
  useState
} from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { BACK_INPUT, COLOR_GREEN, StatePart } from '../../type'
import { RootStackParamList } from '../Navigation/Navigation'
import { addPart, editPart } from '../Redux/actions'
import Accordion from '../Accordion'
import ShadowBox from '../../CommonComponents/ShadowBox'
import { PartsList } from './PartsList'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputPartComponent from '../../CommonComponents/InputPartComponent'
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar'
import { useTheme } from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'InputDoneScreen'>
const InputPart = ({ navigation, route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const theme = useTheme()
  /* const { mode } = useThemeMode() */

  const [openAccordion, setOpenAccordion] = useState(false)
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)
  const [isEditPart, setIsEditPart] = useState(false)

  const [itemPart, setItemPart] = useState<StatePart | null>(null)

  /* useEffect(() => {
    navigation.setOptions({ title: 'Купить деталь' })
  }, []) */

  // ------------------------- control according -------------------------------
  const handleOpenForEdit = (item: StatePart): void => {
    setIsEditPart(true)
    setItemPart(item)
    handleOnPressAccordion()
    /* setOpenAccordion(true) */
  }

  const handleOnPressAccordion = (): void => {
    setIsOpenAccordion(true)
    setTimeout(() => {
      setOpenAccordion(!openAccordion)
      setIsOpenAccordion(false)
    }, 600)
  }

  // ------------------------- button result -----------------------------------
  const handleCancel = (): void => {
    setItemPart(null)
    handleOnPressAccordion()
  }
  const handleOk = (tempNewPart: StatePart): void => {
    /* const tempNewPart: StatePart = {
      namePart,
      dateBuy,
      numberPart,
      numberPart1,
      numberPart2,
      seller: {
        name: seller,
        phone: sellerPhone,
        link: sellerWeb
      },
      costPart,
      quantityPart,
      amountCostPart,
      id: Date.now(),
      isInstall: false
    } */

    isEditPart
      ? dispatch(editPart(state.numberCar, itemPart?.id, tempNewPart))
      : dispatch(addPart(state.numberCar, tempNewPart))
    handleOnPressAccordion()
    /* navigation.navigate('Home') */
  }

  /*  useEffect(() => {
    console.log('hello')
    setIsOpenAccordion(true)
    setTimeout(() => setIsOpenAccordion(false), 2000)
  }, [openAccordion]) */

  return (
    <View >
      {/* {isOpenAccordion ? <ActivityIndicator/> : null} */}
      <View>
      <KeyboardAwareScrollView nestedScrollEnabled={true} style={{ marginTop: 10 }} >
       <Accordion
         insideView={
<View></View>
       }
         title={'Добавьте деталь'}
         bannerStyle={{ backgroundColor: BACK_INPUT }}
         open={openAccordion}
         /* isOpen={isOpen} */
         onPress={handleOnPressAccordion}
         />
      </KeyboardAwareScrollView>
      </View>
      <Dialog isVisible={isOpenAccordion} overlayStyle={{ backgroundColor: theme.colors.background }}>
        <Dialog.Loading loadingProps={{ size: 'large', color: theme.colors.tertiary }}/>
      </Dialog>
      {/* </ScrollView> */}
      <View style={{ marginTop: 10, height: '85%' }}>
      { openAccordion
        ? null
        : null/* <PartsList handlePress={handleOpenForEdit} /> */

      }
      </View>
      {/* <Text>HELLO</Text> */}

      {/* </ScrollView> */}
    </View>

  )
}

export default InputPart

const styles = StyleSheet.create({
  viewAllInput: {
    margin: 5,
    borderRadius: 10
  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputText: {
    textAlign: 'center',
    fontSize: 14
  },
  errorInput: {
    color: 'gray',
    marginTop: 0,
    marginBottom: 2,
    textAlign: 'center'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
