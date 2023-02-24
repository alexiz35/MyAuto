import { PartList } from '../type'
import { StyleSheet, Text, View } from 'react-native'
import { Divider } from '@rneui/themed'

export const listsInfo = (item: PartList): JSX.Element => {
  return (
    <View>

      <View style={styles.viewTop}>
        <Text style={{ flex: 0.5, textAlign: 'center', fontSize: 14, color: 'white' }}>{item.id}</Text>
        <Text style={{ flex: 2, textAlign: 'center', fontSize: 14, color: 'white' }}>{item.namePart}</Text>
        <Text style={{ flex: 0.5, textAlign: 'left', fontSize: 14, color: 'white' }}>{`${item.amountPart} x`}</Text>
        <Text style={{ flex: 1, textAlign: 'left', fontSize: 14, color: 'white' }}>{item.costPart}</Text>
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
