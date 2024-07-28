import * as FileSystem from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker'
import Toast from 'react-native-toast-message'
const { StorageAccessFramework } = FileSystem

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveFile = async (data: any) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const directoryUri = permissions.directoryUri
    console.log('dir', directoryUri)
    /* const data = 'Hello World' */
    // Create file and pass it's SAF URI
    const result = await StorageAccessFramework.createFileAsync(directoryUri, 'myfilename', 'application/json')
      .then(async (fileUri) => {
        console.log('result', fileUri)
        // Save data to newly created file
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 })
      })
      .catch((e) => {
        console.log(e)
      })
  } else {
    alert('You must allow permission to save.')
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const writeFile = (filename: string, data: object) => {
  /* const filename = 'test.json' */
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const path = `${FileSystem.documentDirectory}${filename}`
  console.log('path', path)

  FileSystem.writeAsStringAsync(path, JSON.stringify(data))
    .then((FileInfo) => { console.log('FILE WRITTEN!', FileInfo) })
    .catch((err) => { console.log('errSave', err.message) })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loadFile = async (filename: string) => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const uri = FileSystem.documentDirectory + filename
  return await FileSystem.readAsStringAsync(uri)
}

// @ts-expect-error boolean
export function isFile (filename: string): boolean {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const uri = FileSystem.documentDirectory + filename
  FileSystem.getInfoAsync(uri)
    .then((infoResult) => {
      return infoResult.exists
    })
    .catch((errInfo) => {
      console.log('errInfo', errInfo)
      return false
    })
}
// ********************************************************************************************
// Функция для копирования PDF-файла
export const savePDFFile = async (uriPDF: string) => {
  const fileName = 'ReportCar ' + new Date().toLocaleDateString()
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const directoryUri = permissions.directoryUri
    try {
      const dataPDF = await StorageAccessFramework.readAsStringAsync(uriPDF, { encoding: 'base64' })
      await StorageAccessFramework.createFileAsync(directoryUri, fileName, 'application/pdf')
        .then(async (fileUri) => {
          // Save data to newly created file
          await FileSystem.writeAsStringAsync(fileUri, dataPDF, { encoding: FileSystem.EncodingType.Base64 })
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (e) {
      console.log('ERR_SavePdfFile', e)
    }
  } else {
    alert('You must allow permission to save.')
  }
}
