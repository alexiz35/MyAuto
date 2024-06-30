import { JSX, useEffect, useState } from 'react'
import { Button, Card, Dialog, Icon, IconButton, Portal } from 'react-native-paper'
import { Alert, Dimensions, Platform, View } from 'react-native'
import { deletedAllSeller } from '../Redux/SellerSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'
import { printToFile } from '../Print/Print'
import { getIndexCar, initialStateInfo, StateInfo } from '../../type'
import Pdf from 'react-native-pdf'
export const PDFCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const infoCar: StateInfo = useAppSelector(state => (
    state.cars[getIndexCar(state.cars, state.numberCar)].info === undefined
      ? initialStateInfo
      : state.cars[getIndexCar(state.cars, state.numberCar)].info
  ))
  const { colors } = useAppTheme()
  const { t } = useTranslation()

  const pressCreatePdf = async () => {
    const uri = await printToFile(infoCar)
    console.log('URI', uri)
    if (uri !== undefined) navigation.navigate('ReportScreen', { uri })
  }

  return (
    <Card style={{ marginVertical: 5 }}>

      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={stylesSettingScreen.text}
            onPress={ pressCreatePdf}
          >
            Вывод отчета в PDF
          </Button>
        </View>

        <View style={{ paddingRight: 5 }}>
            <IconButton icon={'close'} iconColor={colors.error} />
        </View>
      </View>
    </Card>

  )
}
