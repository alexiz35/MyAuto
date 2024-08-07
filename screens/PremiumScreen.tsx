import { Alert, FlatList, Linking, ScrollView, StyleSheet } from 'react-native'
import { useAppTheme } from '../CommonComponents/Theme'
import { JSX, useCallback, useEffect, useState } from 'react'
import BackgroundView from '../CommonComponents/BackgroundView'
import {
  Button, Card,
  List,
  Portal,
  IconButton,
  Icon, FAB
} from 'react-native-paper'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import { PackageItem } from '../components/PurchaseComponents/PackageItem'
import { checkLevelAccess, getPackages, TypeLevelAccess } from '../components/PurchaseComponents/PurchaseFunctions'

type Props = StackScreenProps<RootStackParamList, 'PremiumScreen'>

const PremiumScreen = ({ route, navigation }: Props): JSX.Element => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  // - State for all available package
  const [packages, setPackages] = useState<PurchasesPackage[]>([])

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false)

  const [checkLevel, setCheckLevel] = useState<TypeLevelAccess>('Free')
  const [selectedItem, setSelectedItem] = useState<PurchasesPackage | null>(null)

  useFocusEffect(useCallback(() => {
    checkLevelAccess()
      .then(levelAccess => { setCheckLevel(levelAccess) })
      .catch(e => { console.log(e) })
  }, []))

  const pressPay = async () => {
    setIsPurchasing(true)
    if (selectedItem !== null) {
      try {
        const { customerInfo } = await Purchases.purchasePackage(selectedItem)
        const purchasedAccess = await checkLevelAccess(customerInfo)
        setCheckLevel(purchasedAccess)
      } catch (e) {
        // @ts-expect-error e type
        if (e.code === 1) {
          // @ts-expect-error e type
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
      })
      .catch(e => {
        console.log('Error list packages', e)
        setPackages([])
      })

    /* setTimeout(() => {
      Alert.alert(
        t('premium.ALERT_TITLE'),
        t('premium.ALERT_MESSAGE'),
        [{
          text: t('premium.ALERT_BUTTON_REVIEW'),
          onPress: () => {
            void Linking.openURL('mailto:' + 'devizcar.sup@gmail.com')
            navigation.goBack()
          }
        }, {
          text: t('premium.ALERT_BUTTON_CANCEL'),
          onPress: navigation.goBack,
          style: 'cancel'
        }, {
          text: t('premium.ALERT_BUTTON_DONAT'),
          onPress: () => {
            void Linking.openURL('https://www.buymeacoffee.com/devizcarsub')
            navigation.goBack()
          }
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
