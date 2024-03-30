import { useAppSelector } from '../Redux/hook'
import { JSX, useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Surface, TouchableRipple } from 'react-native-paper'
import { Image } from 'expo-image'

export const LogoTitle = (): JSX.Element => {
  const numberCar = useAppSelector(state => state.numberCar)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const [image, setImage] = useState(require('../../assets/renaultLogo2.png'))
  useEffect(() => {
    setImage(FileSystem.documentDirectory + String(numberCar) + '.jpeg')
  }, [numberCar])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    })
    if (!result.canceled) {
      // удаляем файл 1.png , с опцией игнора ошибки если файл не существует
      await FileSystem.deleteAsync(FileSystem.documentDirectory + String(numberCar) + '.jpeg', { idempotent: true })
      // копируем файл из временного кэша ImagePicker в папку программы
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: FileSystem.documentDirectory + String(numberCar) + '.jpeg'
      })
        .then(() => {
          setImage(result.assets[0].uri)
        })
        .catch((reason) => {
          console.log('ERROR', reason)
        })
    }
  }

  return (

    <Surface elevation={5} style={{ borderRadius: 5 }} >
      <TouchableRipple onPress={async () => { await pickImage() }}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 5
        }}
        source={ image }
        cachePolicy={'none'}
      />
      </TouchableRipple>
    </Surface>
  )
}
