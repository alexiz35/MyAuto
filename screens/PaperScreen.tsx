import { Button, ImageBackground, Pressable, Text, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { CheckBox, Divider, Icon } from '@rneui/themed'
import { BACK_OPACITY, COLOR_GREEN, TEXT_WHITE } from '../type'

const PaperScreen = (): JSX.Element => {
  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1, paddingHorizontal: 10 }}>
        <Divider style={{ marginTop: 10 }}/>
        <View>
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Машины</Text>
        </View>
        <Divider />

        <Divider/>
        <View>
          <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} containerStyle={{ position: 'absolute', paddingLeft: 5, top: 5 }}/>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Контроль пробега</Text>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Напоминание при входе в приложении</Text>
          <CheckBox containerStyle={{ backgroundColor: BACK_OPACITY, paddingVertical: 3 }} checked={true} checkedColor={COLOR_GREEN}/>
        </View>
        <Divider inset insetType={'middle'}/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Периодическое напоминание в фоне</Text>
          <CheckBox containerStyle={{ backgroundColor: BACK_OPACITY, paddingVertical: 3 }} checked={true} checkedColor={COLOR_GREEN}/>
        </View>
        <Divider inset insetType={'middle'}/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: TEXT_WHITE, padding: 10, textAlign: 'center' }}>Синхронизация пробега с авто</Text>
          <CheckBox containerStyle={{ backgroundColor: BACK_OPACITY, paddingVertical: 3 }} checked={true} checkedColor={COLOR_GREEN}/>
        </View>
        <Divider inset insetType={'middle'}/>

      </ScrollView>
    </ImageBackground>
  )
}

export default PaperScreen
