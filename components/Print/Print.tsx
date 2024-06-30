import * as Print from 'expo-print'
import { Alert } from 'react-native'
import { shareAsync } from 'expo-sharing'
import { StateInfo, StateService } from '../../type'
import { InfoTaskHTML } from './InfoTaskHTML'

export const printToFile = async (info: StateInfo): Promise<string | undefined> => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const html = InfoTaskHTML(info)
  try {
    const { uri } = await Print.printToFileAsync({ html })
    Alert.alert('file has created')
    return uri
    // sending file somewhere
    /* await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' }) */
  } catch (err) {
    console.log('ErrorPrintPDF')
    return undefined
  }
}
