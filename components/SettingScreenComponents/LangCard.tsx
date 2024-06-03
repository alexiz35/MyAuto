import { JSX, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, Dialog, Divider, Icon, Portal, RadioButton } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { useTranslation } from 'react-i18next'

export const LangCard = (): JSX.Element => {
  // ****************************** THEME change *********************************
  // ------------------------- Toggle Theme --------------------------------------
  const { colors } = useAppTheme()
  const { t, i18n } = useTranslation()
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [checkedLang, setCheckedLang] = useState('')

  const resultCheckLang = (value: string) => {
    setCheckedLang(value)
    setVisibleDialog(false)
  }
  useEffect(() => {
    setCheckedLang(i18n.language)
  }, [])

  useEffect(() => {
    try {
      i18n.changeLanguage(checkedLang)
    } catch (e) {
      console.log(e)
    }
  }, [checkedLang])

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <View style={stylesSettingScreen.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button style={stylesSettingScreen.text} >{`${t('setting.SET_LANG')}`}</Button>
        </View>
        <View style={{ paddingRight: 10 }}>
          <Button

            icon={'translate'}
            /* size={18} */
            mode={'text'}
            onPress={() => { setVisibleDialog(true) }}
          >{`${t('setting.LANG')}`}</Button>
        </View>
      </View>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => { setVisibleDialog(false) }}>
          <Dialog.Title >{`${t('setting.TITLE_LANG')}`}</Dialog.Title>
          <Divider bold/>
          <Dialog.Content>
            <RadioButton.Group onValueChange={(value) => { resultCheckLang(value) }} value={checkedLang} >
              <RadioButton.Item value={'ru'} label={'Русский'} mode={'ios'} color={colors.tertiary}/>
              <Divider horizontalInset bold/>
              <RadioButton.Item value={'en'} label={'English'} mode={'ios'} color={colors.tertiary}/>
              <Divider horizontalInset bold/>
              <RadioButton.Item value={'uk'} label={'Українська'} mode={'ios'} color={colors.tertiary}/>
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Card>
  )
}
