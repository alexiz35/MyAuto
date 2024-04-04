import { useAppSelector } from './Redux/hook'
import { JSX, useEffect } from 'react'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import Toast from 'react-native-toast-message'
export const startPeriodNotification = async () => {
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
          shouldSetBadge: false
        })
      })
      void Notifications.scheduleNotificationAsync({
        content: {
          title: 'Сообщение от DevizCar',
          body: 'Вам необходимо обновить пробег в программе ',
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.MAX
        },
        trigger: {
          seconds: 10,
          repeats: true
          /* hour: 16,
              minute: 0,
              repeats: true,
              weekday: 3 */
        }
      }).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Еженедельные напоминания запущены',
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
      text1: 'Еженедельные напоминания уже запущены',
      visibilityTime: 2500
      /* text2: 'This is some something 👋' */
    })
  }
}

export const cancelNotification = () => {
  Notifications.cancelAllScheduledNotificationsAsync()
    .then(() => {
      Toast.show({
        type: 'error',
        text1: 'Еженедельные напоминания отключены',
        visibilityTime: 2500
        /* text2: 'This is some something 👋' */
      })
    })
    .catch((e) => { console.log('errorCancelNotification', e) })
}

export const NotificationComponent = (): JSX.Element => {
  const setting = useAppSelector(state => state.setting)
  useEffect(() => {
    if (setting.alarmMileagePeriod) void startPeriodNotification()
    else if (!setting.alarmMileagePeriod) cancelNotification()
  }, [])
  return (
    <>

    </>
  )
}
