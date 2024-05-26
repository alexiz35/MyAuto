import { useAppSelector } from './Redux/hook'
import { JSX, useEffect } from 'react'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import Toast from 'react-native-toast-message'
// eslint-disable-next-line import/named
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
export const startPeriodNotification = async (t: TFunction<'translation', undefined>) => {
  const listNotification = await Notifications.getAllScheduledNotificationsAsync()
  if (listNotification.length === 0) {
    if (Platform.OS !== 'web') {
      const result = await Notifications.getPermissionsAsync()
      if (result.status !== 'granted') {
        __DEV__ && console.log('Requesting notification permission')
        const reqPermissions = await Notifications.requestPermissionsAsync()
        if (reqPermissions.status !== 'granted') { throw new Error("Didn't receive permission to save notifications") }
        __DEV__ && console.log('Permission for notifications granted')
        // This code is needed for Android to work
        if (Platform.OS === 'android') {
          void Notifications.setNotificationChannelAsync('devizcar', {
            name: 'devizcar',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
          })
        }
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true
        })
      })
      void Notifications.scheduleNotificationAsync({
        content: {
          title: t('notification.TITLE'),
          body: t('notification.NEED_UPDATE_MILEAGE'),
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.MAX
        },
        trigger: {
          /* seconds: 10, */
          repeats: true,
          hour: 14,
          minute: 0,
          weekday: 1
        }
      }).then(() => {
        Toast.show({
          type: 'success',
          text1: t('notification.START_NOTIFICATION'),
          visibilityTime: 2500
          /* text2: 'This is some something 👋' */
        })
      })
        .catch((e) => {
          console.log('errorOkNotification', e)
        })
    }
  } else {
    Toast.show({
      type: 'info',
      text1: t('notification.ALREADY_START'),
      visibilityTime: 2500
      /* text2: 'This is some something 👋' */
    })
  }
}

export const cancelNotification = (t: TFunction<'translation', undefined>) => {
  Notifications.cancelAllScheduledNotificationsAsync()
    .then(() => {
      Toast.show({
        type: 'error',
        text1: t('notification.STOP_NOTIFICATION'),
        visibilityTime: 2500
        /* text2: 'This is some something 👋' */
      })
    })
    .catch((e) => { console.log('errorCancelNotification', e) })
}

export const NotificationComponent = (): JSX.Element => {
  const setting = useAppSelector(state => state.setting)
  const { t } = useTranslation()
  useEffect(() => {
    if (setting.alarmMileagePeriod) void startPeriodNotification(t)
    else if (!setting.alarmMileagePeriod) cancelNotification(t)
  }, [])
  return (
    <>

    </>
  )
}
