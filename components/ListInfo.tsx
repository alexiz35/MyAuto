import { PartList, ServiceList } from '../type'
import { StyleSheet, TextInput, View } from 'react-native'
import { Divider } from '@rneui/themed'

export const listsInfo = (item: PartList | ServiceList, isEdit: boolean): JSX.Element => {
  return (
    <View >

      <View style={styles.allInput}>
        <TextInput
          placeholder={'Пробег текущий'}
          placeholderTextColor={'black'}
          keyboardType={'numeric'}
          editable={isEdit}
          defaultValue={'200000'}
          value={String(item.id)}
          style={{ color: 'black', paddingHorizontal: 10 }}
        />
        <TextInput
          placeholder={'Пробег текущий'}
          placeholderTextColor={'black'}
          keyboardType={'numeric'}
          editable={isEdit}
          defaultValue={'200000'}
          value={String('namePart' in item ? item.namePart : item.nameService)}
          style={{ color: 'black' }}
        />
        <TextInput
          placeholder={'Пробег текущий'}
          placeholderTextColor={'black'}
          keyboardType={'numeric'}
          editable={isEdit}
          defaultValue={'200000'}
          value={String('costPart' in item ? item.costPart : item.costService)}
          style={{ color: 'black' }}
        />
      </View>
      <View>
        <Divider inset={true} insetType={'middle'}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  allInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
    /* borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1 */
  }

})
