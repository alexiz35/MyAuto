import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/Navigation/Navigation'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { CheckBox, Divider, Icon } from '@rneui/themed'
import { useAppSelector } from '../components/Redux/hook'
import { useEffect } from 'react'
import { COLOR_GREEN, TEXT_WHITE } from '../type'

type Props = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>

const SettingScreen = ({ navigation }: Props): JSX.Element => {
  const state = useAppSelector(state => state)
  /* useEffect(() => {
    state.cars.forEach((item) => {

    })
  }, []) */
  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1, paddingHorizontal: 10 }}>
        <Divider style={{ marginTop: 10 }}/>
        <View>
        <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Машины</Text>
        </View>
        <Divider />
        {
          state.cars.map((item, index) => (
            <View key={index} style={styles.viewText}>
            <Text style={styles.text}>{item.info.model}</Text>
            <Divider/>
            </View>
          ))
        }
        <Divider inset insetType={'middle'}/>
        <Pressable onPress={() => navigation.navigate('CarInfoScreen')}>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Добавить машину</Text>
        </Pressable>
        <Divider/>
        <Pressable >
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Подключить GoogleDisk для бэкапа</Text>
        </Pressable>
        <Divider/>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Импорт данных</Text>
        <Divider inset insetType={'middle'}/>
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Экспорт данных</Text>
        <Divider/>
        <View>
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Контроль пробега</Text>
        </View>
        <Divider />
        <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Контроль пробега</Text>

      </ScrollView>
    </ImageBackground>
  )
}
export default SettingScreen

const styles = StyleSheet.create({
  viewText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: TEXT_WHITE
  }
})
