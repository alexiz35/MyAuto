import * as Print from 'expo-print'
import { Alert } from 'react-native'
import { shareAsync } from 'expo-sharing'
import { StateService } from '../../type'
import { InfoTaskHTML } from './InfoTaskHTML'

export const printToFile = async (task: StateService): Promise<void> => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const html = InfoTaskHTML(task)
  try {
    const { uri } = await Print.printToFileAsync({ html })
    Alert.alert('file has created')
    // sending file somewere
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
  } catch (err) {
    console.log('ErrorPrintPDF')
  }
}
