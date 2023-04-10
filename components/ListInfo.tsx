import { PartList, TEXT_WHITE } from '../type'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Divider, Icon } from '@rneui/themed'
import React from 'react'

export const listsInfo = (item: PartList, index: number, onInfo: (id: number) => void): JSX.Element => {
  return (
    <View>
      <Pressable onPress={() => (onInfo(item.id))}>
      <View style={styles.viewTop}>

        <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 14, color: 'white' }}>{index + 1}</Text>
        <Text style={{ flex: 2, textAlign: 'center', fontSize: 14, color: 'white' }}>{item.namePart}</Text>
        <Text style={{ flex: 0.5, textAlign: 'left', fontSize: 14, color: 'white' }}>{`${item.quantityPart} x`}</Text>
        <Text style={{ flex: 1, textAlign: 'left', fontSize: 14, color: 'white' }}>{item.costPart}</Text>
        <View style={{ height: '80%' }}>

            <Text style={{ paddingBottom: 2 }}>
              <Icon
                name={'info'}
                color={TEXT_WHITE}
                size={22}
                onPress={() => (onInfo(item.id))}
              >
              </Icon>
            </Text>

        </View>

      </View>
      <View>
        <Divider inset={true} insetType={'middle'}/>
      </View>
      </Pressable>

</View>
  )
}

const styles = StyleSheet.create({
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2,
    padding: 10
  }
})
