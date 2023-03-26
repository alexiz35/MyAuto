import { ImageBackground, Text, View } from 'react-native'
import { COLOR_GREEN, TEXT_WHITE } from '../type'
import { Button } from '@rneui/themed'

const StatScreen = (): JSX.Element => {
  return (
    <ImageBackground source={require('../assets/Back2.png')} style={{ height: '100%' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: TEXT_WHITE, textAlign: 'center', paddingVertical: 10, fontStyle: 'italic' }}>
          HELLO
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button type={'outline'} title={'Всего'} color={COLOR_GREEN}/>
        <Button type={'outline'} title={'Всего'} color={COLOR_GREEN}/>
        <Button type={'outline'} title={'Всего'} color={COLOR_GREEN}/>
        <Button type={'outline'} title={'Всего'} color={COLOR_GREEN}/>
        </View>
      </View>
    </ImageBackground>
  )
}

export default StatScreen
