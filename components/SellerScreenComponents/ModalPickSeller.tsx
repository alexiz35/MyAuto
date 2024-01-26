import { Button, Card, Dialog, Portal } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import { useAppSelector } from '../Redux/hook'
import { RenderRowSeller } from './RenderRowSeller'
import { Seller } from '../../type'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { PropsTab, RootStackParamList } from '../Navigation/Navigation'

interface PropsPickSeller {
  handlePress: (item: Seller) => void
  editPress: (item: Seller) => void
  navigation: () => void/* StackNavigationProp<RootStackParamList> */
}

export const ModalPickSeller = ({ handlePress, editPress, navigation }: PropsPickSeller): JSX.Element => {
  /*  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>() */

  return (
    <>
    <Dialog.Title>Список поставщиков/сервисов</Dialog.Title>
  <Dialog.Content>
              <FlatList
          scrollEnabled
          data={useAppSelector((state) => state.sellerList)}
          /* extraData={isSortFuel} */
          renderItem={({ item }) => <RenderRowSeller item={item} handlePress={handlePress} editPress={editPress}/>}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => (
            {
              length: 40,
              offset: 40 * index,
              index
            }
          )}
          initialNumToRender={6}
        />

  </Dialog.Content>
      <Dialog.Actions>
        <Button icon={'file-edit'} onPress={navigation} >Редактировать список продавцов</Button>
      </Dialog.Actions>
    </>

  )
}
