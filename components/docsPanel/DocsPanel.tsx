import React, { useState } from 'react'
import {
  StyleSheet, Modal, Dimensions, FlatList, Alert
} from 'react-native'
import { Card, FAB, IconButton, Portal, Surface } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'
import { RenderImages } from './RenderImages'
import { FullImage } from './FullImage'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useTranslation } from 'react-i18next'

interface TypeImages {
  name: string
  uri: string
}
interface PropsDocsPanel {
  images: TypeImages[]
  setImages: React.Dispatch<React.SetStateAction<TypeImages[]>>
}
export const DocsPanel = (): React.JSX.Element => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  /* const [images, setImages] = useState<TypeImages[]>([]) */
  const [openFab, setOpenFab] = useState({ open: false })
  const toggleFab = ({ open }: { open: boolean }) => {
    setOpenFab({ open })
  }
  const { open } = openFab
  const [visiblePanel, setVisiblePanel] = useState(false)
  const [visibleFullImage, setVisibleFullImage] = useState(false)
  const [selectUri, setSelectUri] = useState('')
  const pressImage = (uri: string) => {
    setSelectUri(uri)
    setVisibleFullImage(true)
  }
  const closeFullImage = () => {
    setVisibleFullImage(false)
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    void FileSystem.getInfoAsync(FileSystem.documentDirectory + '/photoDocs')
      .then(value => {
        if (!value.exists) {
          FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + '/photoDocs')
          console.log('MakeDir')
        }
      })
      .catch((reason) => {
        console.log('ERROR', reason)
      })

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      /* allowsEditing: true, */
      /* aspect: [3, 3], */
      quality: 1
    })
    if (!result.canceled) {
      // копируем файл из временного кэша ImagePicker в папку программы
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: FileSystem.documentDirectory + '/photoDocs/' + result.assets[0].fileName
      })
        .then(() => {
          console.log('Pick', result.assets[0].exif, result)
          setImages([...images, { name: result.assets[0].fileName, uri: FileSystem.documentDirectory + '/photoDocs/' + result.assets[0].fileName }])
        })
        .catch((reason) => {
          console.log('ERROR', reason)
        })
    }
  }

  const dalImage = (uri: string) => {
    Alert.alert(t('docsPanel.DEL_TITLE'), '', [
      {
        text: t('button.CANCEL')
      },
      {
        text: t('button.OK'),
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(uri, { idempotent: true })
            const tempImagesAfterDel = images.filter((item) => item.uri !== uri)
            setImages(tempImagesAfterDel)
          } catch (e) {
            console.log(e)
          }
        }
      }
    ])
  }

  const tempImage = [
    { id: 1, uri: require('../../assets/icon1.png') },
    { id: 2, uri: require('../../assets/icon1.png') },
    { id: 3, uri: '' },
    { id: 4, uri: require('../../assets/icon1.png') },
    { id: 5, uri: require('../../assets/icon1.png') },
    { id: 6, uri: require('../../assets/icon1.png') },
    { id: 7, uri: require('../../assets/icon1.png') },
    { id: 8, uri: require('../../assets/icon1.png') },
    { id: 9, uri: require('../../assets/icon1.png') },
    { id: 10, uri: require('../../assets/icon1.png') },
    { id: 11, uri: require('../../assets/icon1.png') }
  ]
  const numColumns = Math.floor(Dimensions.get('screen').width / 100)
  return (
    <>
      <Modal visible={visiblePanel} onRequestClose={() => { setVisiblePanel(false) }}
      animationType={'slide'} transparent={true}
      >
        <>
        <Card mode={'elevated'} style={{ position: 'absolute', paddingHorizontal: 10, bottom: 0, height: 500, width: '100%' }}>
        <Card.Title title={t('docsPanel.TITLE')} right={() => <IconButton icon={'close'} onPress={() => { setVisiblePanel(false) }} /> }/>
          <Card.Content >
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <RenderImages uri={item.uri} delImage={dalImage} pressImage={pressImage}/>
              )}
              keyExtractor={item => String(item.name)}
              numColumns={numColumns}
              columnWrapperStyle={styles.row}
            />
          </Card.Content>
        </Card>
          <FAB.Group
            open={open}
            visible
            icon={open ? 'close' : 'plus'}
            backdropColor={colors.backdrop}
            actions={[
              {
                icon: 'file-image-plus',
                /* label: t('pdfCard.SEND'), */
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress: () => { pickImage() }
              },
              {
                icon: 'camera',
                /* label: t('pdfCard.SAVE'), */
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress: () => {}
              }
            ]}
            onStateChange={toggleFab}
            onPress={() => {
              if (open) {

                // do something if the speed dial is open
              }
            }}
          />
</>
      </Modal>
      <FAB
        icon="file-image"
        style={styles.fab}
        onPress={() => { setVisiblePanel(true) }}
      />
      <Portal>
        <Modal visible={visibleFullImage} onRequestClose={() => { setVisibleFullImage(false) }}
               animationType={'slide'}
        >
          <FullImage uri={selectUri} closeImage={closeFullImage}/>
        </Modal>
      </Portal>

    </>
  )
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  image: {
    width: 90,
    height: 120
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 15
  }
})
