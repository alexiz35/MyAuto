import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native'
import { Divider, Icon } from '@rneui/themed'
import { COLOR_GREEN, TEXT_CARD } from '../type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from './Navigation/Navigation'
import { useNavigation } from '@react-navigation/native'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'CarInfoScreen'
>

export const MainCard = (): JSX.Element => {
  const nav = useNavigation<ProfileScreenNavigationProp>()
  return (
    <ImageBackground source={require('../assets/darkBack.jpg')} resizeMethod={'auto'} resizeMode={'cover'} >
  <View style={styles.containerView}>
    <Pressable onPress={() => nav.navigate('CarInfoScreen')}>
    <Text style={styles.carText}>RENAULT MEGANE 3</Text>
    <Divider inset={true} insetType="middle" />
    </Pressable>
    <View style={styles.infoView}>
      <View style={styles.kmView}>
        <Icon
          style={{ marginHorizontal: 10 }}
          name='location-arrow'
          type='font-awesome'
          color={TEXT_CARD}
        />
        <Text style={styles.kmText}>200000 km</Text>
      </View>

      <View style={styles.costView}>
        <View style={styles.costTOView}>
        <Icon
          style={{ marginHorizontal: 10 }}
          name='car-wrench'
          type='material-community'
          color={TEXT_CARD}
        />
        <Text style={{
          fontSize: 16,
          color: TEXT_CARD
        }}>
          22000 грн
        </Text>
        </View>
        <View style={styles.costFuelView}>
        <Icon
          style={{ marginHorizontal: 10 }}
          name='gas-station'
          type='material-community'
          color={TEXT_CARD}
        />
        <Text style={{
          fontSize: 16,
          color: TEXT_CARD
        }}>
          22000 грн
        </Text>
        </View>
      </View>

      {/* <View style={{ position: 'relative', left: 0, flex: 0.5 }}>
        <Image source={require('../assets/renaultLogo2.png')} resizeMethod={'scale'} resizeMode={'cover'} style={{ height: 70, width: 70 }}/>
      </View> */}
      {/*  <Text style={{ fontSize: 16, color: TEXT_CARD }}>
              Заправка: 22000 грн
            </Text> */}

    </View>
  </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  imgBack: {
    resizeMode: 'cover'
  },
  containerView: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 100,
    /* backgroundColor: BACK_CARD, */
    borderRadius: 10

  },
  carText: {
    color: TEXT_CARD,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  kmView: {
    paddingTop: 3,
    flex: 1
  },
  kmText: {
    fontSize: 16,
    color: TEXT_CARD,
    textAlign: 'center',
    textShadowColor: COLOR_GREEN,
    /* textShadowOffset: { height: 2, width: 2 }, */
    textShadowRadius: 10
  },
  costView: {
    flex: 1
  },
  costTOView: {
    flexDirection: 'row'
  },
  costFuelView: {
    flexDirection: 'row'
  }

})
