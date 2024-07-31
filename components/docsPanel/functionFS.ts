import * as FileSystem from 'expo-file-system'
import { TypeImages } from './DocsPanel'

export const saveImages = async (directory: 'Fuel/' | 'Other/' | 'Part/' | 'Service/', images: TypeImages[] = [], id: number) => {
  let savedImages: TypeImages[] = []
  const DIRECTORY_PARENT = 'photoDocs/'
  const idDirectory = `${id}/`
  const fullPath = FileSystem.documentDirectory + DIRECTORY_PARENT + directory + idDirectory
  // ----------------------- check directory and create it -------------------------------------------------------------
  await FileSystem.getInfoAsync(FileSystem.documentDirectory + DIRECTORY_PARENT)
    .then(value => {
      if (value.exists) {
        void FileSystem.getInfoAsync(FileSystem.documentDirectory + DIRECTORY_PARENT + directory)
          .then(result => {
            console.log('isParent?')
            if (!result.exists) {
              void FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + DIRECTORY_PARENT + directory)
              console.log('MakeParent')
            }
          }
          )
          .catch(reason => {
            console.log('ERROR', reason)
          })
      } else {
        console.log('NoParent')
        void FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + DIRECTORY_PARENT + directory)
        console.log('NoParents-MakeParent')
      }
    })
    .catch((reason) => {
      console.log('ERROR', reason)
    })
  await FileSystem.getInfoAsync(fullPath)
    .then(async value => {
      if (value.exists) {
        savedImages = images.slice()
        console.log('IsFULLPATH', savedImages)
        try {
          // Получаем список файлов в директории
          const filesInDirectory = await FileSystem.readDirectoryAsync(fullPath)
          // Создаем набор имен файлов в директории для быстрого поиска
          const filesInDirectorySet = new Set(filesInDirectory)
          // Создаем набор имен новых файлов для быстрого поиска
          const newFileNames = new Set(images.map(file => file.name))
          // Удаляем файлы, которых нет в новом массиве
          for (const fileName of filesInDirectory) {
            if (!newFileNames.has(fileName)) {
              console.log('Delete', fileName)
              await FileSystem.deleteAsync(fullPath + fileName)
            }
          }
          // Добавляем новые файлы, которых нет в директории
          for (const newFile of images) {
            if (!filesInDirectorySet.has(newFile.name)) {
              console.log('ADDFile, Images : ', images)
              // копируем файл из временного кэша ImagePicker в папку программы
              await FileSystem.copyAsync({
                from: newFile.uri,
                to: fullPath + newFile.name
              })
                .then(() => {
                  savedImages.forEach(image => {
                    if (image.name === newFile.name) {
                      image.uri = fullPath + newFile.name
                    }
                    console.log('ADDFor', savedImages)
                  })
                })
                .catch((reason) => {
                  console.log('ERROR', reason)
                })
            }
          }
          console.log('Файлы успешно обновлены Return:', savedImages)
        } catch (error) {
          console.error('Ошибка при обновлении файлов:', error)
        }
      } else {
        console.log('NoFullPath')
        await FileSystem.makeDirectoryAsync(fullPath)
        for (const image of images) {
          // копируем файл из временного кэша ImagePicker в папку программы
          await FileSystem.copyAsync({
            from: image.uri,
            to: fullPath + image.name
          })
            .then(() => {
              savedImages.push({
                name: image.name,
                uri: fullPath + image.name
              })
            })
            .catch((reason) => {
              console.log('ERROR', reason)
            })
        }
        console.log('Файлы успешно созданы')
      }
    })
  console.log('RETURNALL:', savedImages)
  return savedImages
}
