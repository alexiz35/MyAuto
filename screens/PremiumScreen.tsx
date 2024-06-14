import { Alert, FlatList, KeyboardAvoidingView, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { SellerList } from '../components/SellerScreenComponents/SellerList'
import { useAppDispatch } from '../components/Redux/hook'
import { useAppTheme } from '../CommonComponents/Theme'
import { Seller } from '../type'
import { Dispatch, JSX, SetStateAction, useCallback, useEffect, useState } from 'react'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  Button, Card, Text,
  HelperText,
  List,
  Portal,
  RadioButton,
  Surface,
  TextInput,
  ToggleButton, IconButton,
  Icon, Avatar, Checkbox, FAB
} from 'react-native-paper'
import { ModalInfoSeller } from '../components/SellerScreenComponents/ModalInfoSeller'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { addedSeller, editedSeller } from '../components/Redux/SellerSlice'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Purchases, { PurchasesError, PurchasesPackage } from 'react-native-purchases'
import { PackageItem } from '../components/PurchaseComponents/PackageItem'
import * as SecureStore from 'expo-secure-store'
import { checkLevelAccess, getPackages, TypeLevelAccess } from '../components/PurchaseComponents/PurchaseFunctions'

interface FormSeller {
  name: string
  phone: string
  web: string
  type: string
  specialism: string
}

type Props = StackScreenProps<RootStackParamList, 'PremiumScreen'>

const PremiumScreen = ({ route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const navigate = useNavigation()

  // - State for all available package
  const [packages, setPackages] = useState<PurchasesPackage[]>([])

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false)

  const [checkLevel, setCheckLevel] = useState<TypeLevelAccess>('Free')
  const [selectedItem, setSelectedItem] = useState<PurchasesPackage | null>(null)

  useEffect(() => {
    checkLevelAccess()
      .then(levelAccess => { setCheckLevel(levelAccess) })
      .catch(e => { console.log(e) })
  }, [])

  const pressPay = async () => {
    setIsPurchasing(true)
    if (selectedItem !== null) {
      try {
        const { customerInfo } = await Purchases.purchasePackage(selectedItem)
        const purchasedAccess = await checkLevelAccess(customerInfo)
        setCheckLevel(purchasedAccess)
      } catch (e) {
        if (e.code === 1) {
          Alert.alert('Error purchasing package', e.message)
        }
      } finally {
        setIsPurchasing(false)
      }
    }
  }

  useEffect(() => {
    // Get current available packages
    getPackages()
      .then(result => {
        if (checkLevel === 'Plus') setPackages(result.filter(value => value.identifier !== 'Lite'))
        else setPackages(result)
        console.log('111', checkLevel, packages)
      })
      .catch(e => {
        console.log('Error list packages', e)
        setPackages([])
      })

    /* setTimeout(() => {
      Alert.alert(
        'Дополнительный функционал в расширенной версии',
        'Программа DevizCar на данный момент находится в активной фазе отладки, поэтому пока полный функционал доступен всем пользователям, без исключения.' +
      ' Вы можете поддержать проект своим активным тестированием, предложениями и отзывами.' +
      ' Самые активные участники тестирования будут вознаграждены в дальнейшем бесплатным доступом к премиум функциям программы.' +
      '\n И, конечно, вы можете поддержать проект чашкой кофе для наших разработчиков.' +
      ' Поддержав нас сейчас, вы автоматически получите полный доступ ко всем функциям программы.' +
      '\n С наилучшими пожеланиями, команда DevizCar',
        [{
          text: 'Отзыв',
          onPress: () => async () => await Linking.openURL('mailto:' + 'devizcar.sup@gmail.com')
        }, {
          text: 'Cancel',
          /!* onPress: navigate.goBack, *!/
          style: 'cancel'
        }, {
          text: 'Поддержать',
          onPress: async () => await Linking.openURL('https://www.buymeacoffee.com/devizcarsub')
        }]

      )
    }, 3000) */
  }, [checkLevel])

  return (
    <BackgroundView props={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} >
        <Card mode={'elevated'} elevation={5} style={{ margin: 10, marginBottom: 0, padding: 1 }}>
          {/* The paywall flat list displaying each package */}
          <Card.Cover source={require('../assets/imagePaywall.png')}/>
          <Card.Title title={'Получи доступ к уникальным функциям DevizCar'}
                      titleNumberOfLines={2} titleVariant={'titleLarge'}
                      titleStyle={{ textAlign: 'center' }}
          />
          <Card.Content>
              <List.Item title={'Учет 2-х и более автомобилей'} style={{ paddingVertical: 0, marginVertical: 0 }}
                          left={props =>
                            <Icon source={'check'} size={18} color={colors.tertiary}/>}
                         titleStyle={{ fontSize: 14 }}
              />
            <List.Item title={'Подробная статистика'} style={{ paddingVertical: 0 }}
                          left={props =>
                            <Icon source={
                              selectedItem?.identifier === 'Lite'
                                ? 'close'
                                : 'check'
                              }
                              color={
                              selectedItem?.identifier === 'Lite'
                                ? colors.error
                                : colors.tertiary
                              }
                              size={18}
                          />
                          }
                          titleStyle={{ fontSize: 14 }}
              />
            <List.Item title={'Вывод отчета в PDF'} style={{ paddingVertical: 0 }}
                          left={props =>
                            <Icon source={
                              selectedItem?.identifier === 'Plus' || selectedItem?.identifier === 'Lite'
                                ? 'close'
                                : 'check'
                              }
                              color={
                              selectedItem?.identifier === 'Plus' || selectedItem?.identifier === 'Lite'
                                ? colors.error
                                : colors.tertiary
                              }
                              size={18}
                            />
                          }
                          titleStyle={{ fontSize: 14 }}
              />
            <List.Item title={'Загрузка фото чеков и документов'} style={{ paddingVertical: 0 }}
                          left={props =>
                            <Icon source={
                              selectedItem?.identifier === 'Plus' || selectedItem?.identifier === 'Lite'
                                ? 'close'
                                : 'check'
                              }
                              color={
                              selectedItem?.identifier === 'Plus' || selectedItem?.identifier === 'Lite'
                                ? colors.error
                                : colors.tertiary
                              }
                              size={18}
                            />
                          }
                          titleStyle={{ fontSize: 14 }}
              />
          </Card.Content>
          <FlatList
            scrollEnabled={false}
            data={packages}
            renderItem={({ item }) =>
              <PackageItem purchasePackage={item} levelAccess={checkLevel} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
          }
            keyExtractor={(item) => item.identifier}
          />
        </Card>

        <IconButton
          onPress={async () => await Linking.openURL('https://www.buymeacoffee.com/devizcarsub')}
          icon={require('../assets/iconDonat.png')}
          size={40} style={{ alignSelf: 'center' }}
        />
        <Button mode={'outlined'} style={{ width: '80%', alignSelf: 'center', marginBottom: 50 }}
        onPress={async () => await Linking.openURL('https://www.buymeacoffee.com/devizcarsub')}
        >
        Поддержать проект
        </Button>
        <Portal>
          <FAB style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: '80%' }}
               variant={'tertiary'} label={'Оплатить ' + selectedItem?.product.priceString}
               customSize={40}
               visible={selectedItem !== null && selectedItem.identifier !== checkLevel}
               animated={true}
               onPress={pressPay}
          />
        </Portal>
      </ScrollView>
    </BackgroundView>
  )
}
export default PremiumScreen

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
