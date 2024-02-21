import { useAppSelector } from './Redux/hook'
import { JSX } from 'react'
import { View } from 'react-native'

export const NotificationComponent = (): JSX.Element => {
  const setting = useAppSelector(state => state.setting)
  console.log('setting', setting)
  return (
    <>

    </>
  )
}
