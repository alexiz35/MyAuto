import * as Print from 'expo-print'
import { StateCar } from '../../type'
import { FormHTML, TypeReport } from './FormHTML'
// eslint-disable-next-line import/named
import { TFunction } from 'i18next'

export const printToFile = async (state: StateCar, selectReport: TypeReport, t: TFunction<'translation', undefined>): Promise<string | undefined> => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const html = FormHTML({ stateCar: state, selectReport, t })
  try {
    const { uri } = await Print.printToFileAsync({ html })
    return uri
  } catch (err) {
    console.log('ErrorPrintPDF')
    return undefined
  }
}
