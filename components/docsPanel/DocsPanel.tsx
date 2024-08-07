import React, { useState } from 'react'
import {
  StyleSheet, Modal, Dimensions, FlatList, Alert
} from 'react-native'
import { Card, FAB, IconButton, Portal } from 'react-native-paper'
import { useAppTheme } from '../../CommonComponents/Theme'
import { RenderImages } from './RenderImages'
import { FullImage } from './FullImage'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'
import { getLevelAccessDataSecurely } from '../PurchaseComponents/PurchaseFunctions'
import { LEVEL_DOCS } from '../PurchaseComponents/TypesPurchases'
// eslint-disable-next-line import/named
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/TypeNavigation'

// ***************************** Using DocsPanel *******************************************************
// **************************** In parent Component
//  const [images, setImages] = useState<TypeImages[] | undefined>(itemOther.images)

//  const handleOk = async (dataForm: FormOther) => {
//  const temp = formToData(dataForm)
//  if (images !== undefined) {
//    temp.images = await saveImages('Other/', images, temp.id)
//    }
//  isOk(temp)
//  }
//
//  return (
//    <View>
//    <Portal>
//      <DocsPanel images={images} setImages={setImages}/>
//    </Portal>
//    **********
//    </View>
//  )
// ****************************** In Row Render *********************************************************
//  <Menu.Item title={t('menu.DELETE')}
//                        dense
//                        leadingIcon={'delete'}
//                        onPress={() => {
//                          dispatch(delStateCarReducer({ type: 'others', numberCar: carId, id: item.id }))
//     ******>>                     deleteDirectory('Other/', item.id)
//                          closeMenu()
//                        }}
//  />
//* *****************************************************************************************************

export interface TypeImages {
  name: string
  uri: string
}
interface PropsDocsPanel {
  images: TypeImages[] | undefined
  setImages: React.Dispatch<React.SetStateAction<TypeImages[] | undefined>>
  navigation: NavigationProp<RootStackParamList>
}
export const DocsPanel = ({ images, setImages, navigation }: PropsDocsPanel): React.JSX.Element => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()

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

  const openPanel = async () => {
    const levelAccess = await getLevelAccessDataSecurely()
    if (!LEVEL_DOCS.includes(levelAccess)) {
      Alert.alert(
        t('premium.alertAccess.TITLE', { levelAccess: 'PRO' }),
        t('premium.alertAccess.MESSAGE'),
        [
          { text: t('button.CANCEL'), onPress: () => {} },
          {
            text: t('premium.alertAccess.TEXT'),
            onPress: () => {
              navigation.navigate('PremiumScreen')
            }
          }
        ]
      )
    } else {
      setVisiblePanel(true)
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      /* allowsEditing: true, */
      /* aspect: [3, 3], */
      quality: 1
    })
    if (!result.canceled) {
      if (images !== undefined) {
        setImages([...images, {
          name: String(Date.now()),
          uri: result.assets[0].uri
        }])
      } else {
        setImages([{
          name: String(Date.now()),
          uri: result.assets[0].uri
        }])
      }
    }
  }

  const delImage = (uri: string) => {
    Alert.alert(t('docsPanel.DEL_TITLE'), '', [
      {
        text: t('button.CANCEL')
      },
      {
        text: t('button.OK'),
        onPress: () => {
          if (images !== undefined) {
            setImages(images.filter((item) => item.uri !== uri))
          }
        }
      }
    ])
  }

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
                    <RenderImages uri={item.uri} delImage={delImage} pressImage={pressImage}/>
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
                    onPress: () => { void pickImage() }
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
      <Portal>
      <FAB
        variant={'surface'}
        icon="file-image"
        style={styles.fab}
        onPress={ openPanel}
      />
      </Portal>
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
