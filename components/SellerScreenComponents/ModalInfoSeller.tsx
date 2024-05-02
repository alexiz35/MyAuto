import { Button, Dialog, List } from 'react-native-paper'
import { Seller } from '../../type'
import { Linking } from 'react-native'
import { useEffect, useState } from 'react'

interface PropsModalSeller {
  item: Seller
  visible: boolean
  close: () => void
}

export const ModalInfoSeller = ({ item, visible, close }: PropsModalSeller): JSX.Element => {
  const tel = 'tel:'
  const linkStart = 'http://'
  const [link, setLink] = useState<string>('')

  useEffect(() => {
    if (item.web !== undefined) {
      if (!item.web.startsWith('http://') && !item.web.startsWith('https://')) {
        setLink(linkStart + item.web)
      } else setLink(item.web)
    } else setLink('')
  }, [item])
  return (
    <Dialog visible={visible}>
        <Dialog.Title>{item.type === 'seller' ? 'Продавец' : 'Сервис'}</Dialog.Title>
      <Dialog.Content>
        <List.Item title={item.name} left={props => <List.Icon {...props} icon="account" />} />
        <List.Item title={item.phone} left={props => <List.Icon {...props} icon="phone" />}
                   onPress={async () => await Linking.openURL(tel + '+380680051196')}/>
        <List.Item title={link} left={props => <List.Icon {...props} icon="web" />}
                   onPress={
          async () => await Linking.openURL(link)

        } />
        <List.Item title={item.specialism} left={props => <List.Icon {...props} icon="car-info" />} />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={close}>Закрыть</Button>
      </Dialog.Actions>
    </Dialog>
  )
}
