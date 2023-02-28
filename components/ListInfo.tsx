import { PartList, TEXT_WHITE } from '../type'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Divider, Icon } from '@rneui/themed'
import React from 'react'

export const listsInfo = (item: PartList, index: number): JSX.Element => {
  return (
    <View>

      <View style={styles.viewTop}>
        <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 14, color: 'white' }}>{index + 1}</Text>
        <Text style={{ flex: 2, textAlign: 'center', fontSize: 14, color: 'white' }}>{item.namePart}</Text>
        <Text style={{ flex: 0.5, textAlign: 'left', fontSize: 14, color: 'white' }}>{`${item.amountPart} x`}</Text>
        <Text style={{ flex: 1, textAlign: 'left', fontSize: 14, color: 'white' }}>{item.costPart}</Text>
        <View style={{ height: '80%' }}>
          <Pressable>
            <Text style={{ paddingBottom: 2 }}>
              <Icon
                name={'info'}
                color={TEXT_WHITE}
                size={20}

              >
              </Icon>
            </Text>
          </Pressable>

        </View>
      </View>
      <View>
        <Divider inset={true} insetType={'middle'}/>
      </View>
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
