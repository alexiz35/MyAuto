import { Dimensions, StyleSheet } from 'react-native'
import { useAppDispatch } from '../components/Redux/hook'
import { useAppTheme } from '../CommonComponents/Theme'
import { JSX, useCallback, useState } from 'react'
import BackgroundView from '../CommonComponents/BackgroundView'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Pdf from 'react-native-pdf'

type Props = StackScreenProps<RootStackParamList, 'ReportScreen'>

const ReportScreen = ({ route }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  /* const uriState = route.params.uri */
  const [uri, setUri] = useState(undefined)

  // -------- navigation by another screen with item param ---------------------
  useFocusEffect(
    useCallback(() => {
      setUri(route.params.uri)
    }, [])
  )

  return (
    <BackgroundView props={{ flex: 1 }}>
      <Pdf source={{ uri: route.params.uri, cache: false }}
           onError={(error) => { console.log(error) }}
           style={{
             flex: 1,
             width: Dimensions.get('window').width,
             height: Dimensions.get('window').height
           }}
      />
    </BackgroundView>
  )
}
export default ReportScreen

const styles = StyleSheet.create({

  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 10
  },
  surface: {
    margin: 5,
    flex: 1
  },
  flatList: {
    marginTop: 15,
    height: 400
  },
  inputText: {
    textAlign: 'center',
    fontSize: 14
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },

  button: {
    textAlign: 'center',
    color: 'red'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5
  }
})
