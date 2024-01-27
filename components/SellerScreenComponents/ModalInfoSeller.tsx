import { Button, Dialog, List } from 'react-native-paper'
import { Seller } from '../../type'
import { Linking } from 'react-native'

interface PropsModalSeller {
  item: Seller
  visible: boolean
  close: () => void
}

export const ModalInfoSeller = ({ item, visible, close }: PropsModalSeller): JSX.Element => {
  return (
    <Dialog visible={visible}>
        <Dialog.Title>{item.type === 'seller' ? 'Продавец' : 'Сервис'}</Dialog.Title>
      <Dialog.Content>
        <List.Item title={item.name} left={props => <List.Icon {...props} icon="account" />} />
        <List.Item title={item.phone} left={props => <List.Icon {...props} icon="phone" />}
                   onPress={async () => await Linking.openURL('tel:+380680051196')}/>
        <List.Item title={item.web} left={props => <List.Icon {...props} icon="web" />}
                   onPress={async () => await Linking.openURL('https://reactnativedev.ru/rn/linking/#methods')} />
        <List.Item title={item.specialism} left={props => <List.Icon {...props} icon="car-info" />} />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={close}>Закрыть</Button>
      </Dialog.Actions>
    </Dialog>
  )
}
