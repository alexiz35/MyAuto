import { AppStateStatus } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const CloseFunction = (nextAppState: AppStateStatus) => {
  if (
    nextAppState === 'background'
  ) {
    void AsyncStorage.setItem('isStart', 'false')
  }
}
