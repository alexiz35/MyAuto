import { Dimensions, StyleSheet } from 'react-native'
import { useAppTheme } from '../CommonComponents/Theme'
import { JSX, useCallback, useState } from 'react'
import BackgroundView from '../CommonComponents/BackgroundView'
import { RootStackParamList } from '../components/Navigation/TypeNavigation'
// eslint-disable-next-line import/named
import { StackScreenProps } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Pdf from 'react-native-pdf'
import { FAB, Portal } from 'react-native-paper'
import { savePDFFile } from '../components/MyFileSystem'
import { shareAsync } from 'expo-sharing'
import Toast from 'react-native-toast-message'

type Props = StackScreenProps<RootStackParamList, 'ReportScreen'>

const ReportScreen = ({ route }: Props): JSX.Element => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  /* const uriState = route.params.uri */
  const [uri, setUri] = useState<string>('')
  const [openFab, setOpenFab] = useState({ open: false })
  const toggleFab = ({ open }: { open: boolean }) => {
    setOpenFab({ open })
  }
  const { open } = openFab

  const pressSavePdf = async () => {
    try {
      await savePDFFile(uri)
      Toast.show({
        type: 'success',
        text1: t('pdfCard.FILE_SAVED'),
        visibilityTime: 2000
      })
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: t('pdfCard.FILE_SAVED_ERROR'),
        visibilityTime: 2000
      })
    }
  }

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
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'content-save-move'}
          backdropColor={colors.backdrop}
          actions={[
            {
              icon: 'file-send',
              /* label: t('pdfCard.SEND'), */
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onPress: async () => {
                await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
              }
            },
            {
              icon: 'content-save',
              /* label: t('pdfCard.SAVE'), */
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onPress: async () => { await pressSavePdf() }
            }
          ]}
          onStateChange={toggleFab}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>

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
