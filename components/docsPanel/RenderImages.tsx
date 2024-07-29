import React from 'react'
import { IconButton, Surface, TouchableRipple } from 'react-native-paper'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

interface PropsRenderImages {
  uri: string
  delImage: (uri: string) => void
  pressImage: (uri: string) => void
}
export const RenderImages = ({ uri, delImage, pressImage }: PropsRenderImages): React.JSX.Element => {
  return (
    <Surface style={styles.image} >
      <TouchableRipple onPress={() => { pressImage(uri) }} style={{ flex: 1 }}>
      <Image source={ uri } style={{ flex: 1 }} placeholder={require('../../assets/donat.png')}/>
      </TouchableRipple>
      <IconButton icon={'close'} style={styles.close} size={18} mode={'contained'} onPress={() => { delImage(uri) }}/>
    </Surface>
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
    top: 0,
    right: 0,
    margin: 4,
    height: 20,
    width: 20,
    borderRadius: 5
  }
})
