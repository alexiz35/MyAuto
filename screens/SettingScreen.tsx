import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  return (
<View></View>
  )
}
export default SettingScreen
