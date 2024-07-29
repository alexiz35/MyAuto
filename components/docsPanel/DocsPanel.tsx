import React, { useState } from 'react'
import {
  View,
  StyleSheet, Modal, Dimensions, FlatList
} from 'react-native'
import { Card, FAB, IconButton, Portal, Surface } from 'react-native-paper'
import { shareAsync } from 'expo-sharing'
import { useAppTheme } from '../../CommonComponents/Theme'
import CardTitle from 'react-native-paper/lib/typescript/components/Card/CardTitle'
import { Image } from 'expo-image'
import { RenderImages } from './RenderImages'
import { FullImage } from './FullImage'

export const DocsPanel = (): React.JSX.Element => {
  const { colors } = useAppTheme()
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
        <Card.Title title={'HELLO'} right={() => <IconButton icon={'close'} onPress={() => { setVisiblePanel(false) }} /> }/>
          <Card.Content >
            <FlatList
              data={tempImage}
              renderItem={({ item }) => (
                <RenderImages uri={item.uri} delImage={() => {}} pressImage={pressImage}/>
              )}
              keyExtractor={item => String(item.id)}
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
                onPress: () => {}
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
