import { KeyboardAvoidingView, Linking, ScrollView, StyleSheet, View } from 'react-native'
import { SellerList } from '../components/SellerScreenComponents/SellerList'
import { useAppDispatch } from '../components/Redux/hook'
import { useAppTheme } from '../CommonComponents/Theme'
import { Seller } from '../type'
import { JSX, useCallback, useState } from 'react'
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
  Icon
} from 'react-native-paper'
import { ModalInfoSeller } from '../components/SellerScreenComponents/ModalInfoSeller'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { addedSeller, editedSeller } from '../components/Redux/SellerSlice'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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

  return (
    <BackgroundView props={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} >
        <Card mode={'elevated'} elevation={5} style={{ margin: 5, marginBottom: 0, padding: 1 }}>
         {/*  <Card.Title title={'Дополнительный функционал в расширенной версии'} titleNumberOfLines={2} titleStyle={{ textAlign: 'center' }}/> */}
          <Card.Content>
            <Text style={{ textAlign: 'center' }}>
              Программа DevizCar на данный момент находится в активной фазе отладки, поэтому пока полный функционал доступен всем пользователям, без исключения. Вы можете поддержать проект
              своим активным тестированием, предложениями и отзывами отправив их на адрес
            </Text>
              <Button labelStyle={{ marginVertical: 1 }} mode={'text'} onPress={async () => await Linking.openURL('mailto:' + 'devizcar.sup@gmail.com')}>devizcar.sup@gmail.com</Button>
              <Text style={{ textAlign: 'center' }}>
              Самые активные участники тестирования
              будут вознаграждены в дальнейшем бесплатным доступом к премиум функциям программы. Программа активно разрабатывается и на данный момент
              это только часть функционала. В программе появится хранение документов, чеков и т.д., возможность установки на андроид в авто и автоматический
              контроль за пробегом и многое другое.
              И, конечно, вы можете поддержать проект чашкой кофе для наших разработчиков. Поддержав нас сейчас, вы автоматически получите полный доступ ко всем функциям программы.
            </Text>
            <Text style={{ textAlign: 'center' }}>
              С наилучшими пожеланиями, команда DevizCar
            </Text>
          </Card.Content>
        </Card>

        <IconButton
          onPress={async () => await Linking.openURL('https://www.buymeacoffee.com/devizcarsub')}
          icon={require('../assets/iconDonat.png')}
          size={40} style={{ alignSelf: 'center' }}
        />
        <Button mode={'outlined'} style={{ width: '80%', alignSelf: 'center' }}
        onPress={async () => await Linking.openURL('https://www.buymeacoffee.com/devizcarsub')}
        >Поддержать проект
        </Button>
        {/* <Button icon={() =>
         <Icon source={require('../assets/iconDonat.png')} size={30} />
        } mode={'outlined'} style={{ width: '80%', alignSelf: 'center', margin: 10 }}>Поддержать проект</Button> */}
        {/* <Surface elevation={5} style={{ margin: 5, padding: 5 }} >
        <Button mode={'outlined'} disabled>Подписка на 6 месяцев</Button>
        <Button mode={'outlined'} disabled>Подписка на год</Button>
        <Button mode={'outlined'} disabled>Купить полную версию</Button>
        </Surface> */}
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
