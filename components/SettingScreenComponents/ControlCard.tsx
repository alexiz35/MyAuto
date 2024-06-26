import { Badge, Card, Checkbox, Divider, HelperText, Icon, Text, Tooltip } from 'react-native-paper'
import { View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../Redux/hook'
import { useEffect, useRef, useState } from 'react'
import { changeAlarmPeriod, changeAlarmPeriodNumber, changeAlarmStart } from '../Redux/SettingSlice'
import { useAppTheme } from '../../CommonComponents/Theme'
import { stylesSettingScreen } from './StyleSettingScreen'
import { cancelNotification, startPeriodNotification } from '../NotificationComponent'
import { useTranslation } from 'react-i18next'

export const useFirstMount = () => {
  const ref = useRef()
  useEffect(() => {
    // @ts-expect-error
    ref.current = true
  }, [])
  return ref.current
}

export const ControlCard = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  const { colors } = useAppTheme()
  const isFirst = useFirstMount()
  const { t } = useTranslation()

  // ************************************************ ALARM section ***************************************************

  const [checkAlarmStart, setCheckAlarmStart] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.alarmMileageStart ? 'checked' : 'unchecked')

  const [checkAlarmPeriod, setCheckAlarmPeriod] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.alarmMileagePeriod ? 'checked' : 'unchecked')

  const [checkAlarmPeriodNumber, setCheckAlarmPeriodNumber] = useState<
  'checked' | 'unchecked' | 'indeterminate'
  >(state.setting.alarmMileagePeriodNumber === 2 ? 'unchecked' : 'checked')

  const pressAlarm = (typeCheck: string): void => {
    switch (typeCheck) {
      case 'alarmStart':
        if (checkAlarmStart === 'checked') {
          setCheckAlarmStart('unchecked')
          dispatch(changeAlarmStart(false))
        } else if (checkAlarmStart === 'unchecked') {
          setCheckAlarmStart('checked')
          dispatch(changeAlarmStart(true))
        }
        break
      case 'alarmPeriod':
        if (checkAlarmPeriod === 'checked') {
          setCheckAlarmPeriod('unchecked')
          dispatch(changeAlarmPeriod(false))
        } else if (checkAlarmPeriod === 'unchecked') {
          setCheckAlarmPeriod('checked')
          dispatch(changeAlarmPeriod(true))
        }
        break
      case 'alarmPeriodNumber':
        if (checkAlarmPeriodNumber === 'checked') {
          setCheckAlarmPeriodNumber('unchecked')
          dispatch(changeAlarmPeriodNumber(2))
        } else if (checkAlarmPeriodNumber === 'unchecked') {
          setCheckAlarmPeriodNumber('checked')
          dispatch(changeAlarmPeriodNumber(1))
        }
        break
    }
  }

  useEffect(() => {
    if (checkAlarmPeriod === 'checked' && isFirst) {
      void startPeriodNotification(t)
    } else if ((checkAlarmPeriod === 'unchecked' && isFirst)) {
      cancelNotification(t)
    }
  }, [checkAlarmPeriod])
  // ******************************************************************************************************************

  return (
    <Card style={{ marginVertical: 5 }}>
      <View style={stylesSettingScreen.iconText}>
        <Icon source={'circle'} color={colors.tertiary} size={10} />
        <Text style={stylesSettingScreen.text}>{t('setting.TITLE_CONTROL_CARD')}</Text>
      </View>
      <Checkbox.Item
        status={checkAlarmStart}
        label={t('setting.NOTIFICATION_START')}
        onPress={() => { pressAlarm('alarmStart') }}
        labelVariant={'bodyMedium'}
      />
      <Divider horizontalInset />
      <Checkbox.Item
        status={checkAlarmPeriod}
        label={t('setting.NOTIFICATION_PERIOD')}
        onPress={() => { pressAlarm('alarmPeriod') }}
        labelVariant={'bodyMedium'}
      />
      <Divider horizontalInset />
      <Tooltip title={t('DEV_FUNCTION')} enterTouchDelay={200} leaveTouchDelay={2000}>
      <Checkbox.Item
        disabled
        status={'unchecked'}
        label={t('setting.SYNCHRON_MILEAGE')}
        onPress={() => { pressAlarm('alarmPeriodNumber') }}
        labelVariant={'bodyMedium'}
      />
      </Tooltip>
    </Card>

  )
}
