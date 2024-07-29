import React from 'react'
import { Image } from 'expo-image'
import { FAB, IconButton, Portal } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { shareAsync } from 'expo-sharing'

interface PropsFullImage {
  uri: string
  closeImage: () => void
}
export const FullImage = ({ uri, closeImage }: PropsFullImage): React.JSX.Element => {
  return (
    <>
      <Image source={uri} style={{ flex: 1, width: '100%' }} contentFit={'none'}/>
      <IconButton icon={'close'} style={styles.close} size={18} mode={'contained'} onPress={closeImage}/>
      <FAB icon={'share-variant'} style={styles.fab}
           onPress={async () => {
             await shareAsync(uri, { mimeType: 'image/png' })
           }}/>
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
    justifyContent: 'space-between',
    marginBottom: 15
  },
  close: {
    position: 'absolute',
    top: 15,
    right: 15,
    margin: 4,
    height: 24,
    width: 24,
    borderRadius: 5
  }
})
