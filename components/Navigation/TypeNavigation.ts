import { type CompositeScreenProps, type NavigatorScreenParams } from '@react-navigation/native'
import { type Seller } from '../../type'
import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  BottomTabNav: NavigatorScreenParams<RootTabParamList>
  InputDoneScreen: { editable: boolean, taskId?: number, typeTask: string }
  CarInfoScreen: undefined
  SettingScreen: undefined
  FuelScreen: undefined
  SellerScreen: undefined | { item: Seller }
}
export type RootTabParamList = {
  Home: undefined
  InputDoneScreen: { editable: boolean, taskId?: number, typeTask: string }
  Fuel: undefined
  TaskScreen: undefined
  StatScreen: undefined
}

export type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>