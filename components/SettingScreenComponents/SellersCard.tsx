import { JSX } from 'react'
import { Button, Card, Icon } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { deletedAllSeller } from '../Redux/SellerSlice'
import { useAppDispatch } from '../Redux/hook'
// eslint-disable-next-line import/named
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'
import { useAppTheme } from '../../CommonComponents/Theme'

export const SellersCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { colors } = useAppTheme()

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <View style={styles.iconText}>
          <Icon source={'circle'} color={colors.tertiary} size={10} />
          <Button
            style={styles.text}
            onPress={() => { navigation.navigate('SellerScreen') }}
          >
            Список поставщиков
          </Button>
          <Button
            style={styles.text}
            onPress={() => dispatch(deletedAllSeller())}
          >
            RESET
          </Button>
        </View>
        <View style={{ paddingRight: 10 }}>
          {/* <IconButton icon={'theme-light-dark'} size={18} mode={'outlined'} onPress={toggleTheme} /> */}
          {/* <Switch value={switchTheme} onValueChange={toggleSwitchTheme}/> */}
        </View>
      </View>
    </Card>

  )
}

const styles = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 5
  },
  viewText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
