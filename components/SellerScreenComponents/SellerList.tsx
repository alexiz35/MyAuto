import { Seller, StateFuel } from '../../type'
import { useAppSelector } from '../Redux/hook'
import { useEffect, useState } from 'react'
import { BusyIndicator } from '../useIsReadyHook'
import { FlatList } from 'react-native'
import { RenderRowFuel } from '../FuelScreenComponents/fuelRow'
import { RenderRowSeller } from './RenderRowSeller'

interface handleProp {
  handlePress: (item: Seller) => void
  editPress: (item: Seller) => void
  filterList: string
}

export const SellerList = ({ handlePress, editPress, filterList = 'last' }: handleProp): JSX.Element => {
  const listSeller = useAppSelector(state => state.sellerList)
  const [isSortSeller, setIsSortSeller] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    listSeller.sort(function (a, b) {
      // @ts-expect-error data
      return Date.parse(b.dateFuel) - Date.parse(a.dateFuel)
    })
    setIsSortSeller(!isSortSeller)
  }, [listSeller])

  useEffect(() => {
    setTimeout(() => setIsLoad(false), 10)
    return setIsLoad(true)
  }, [filterList])

  const filter = (): Seller[] => {
    switch (filterList) {
      case 'last': return listSeller.slice(0, 3)
      case 'ten': return listSeller.slice(0, 10)
      default: return listSeller
    }
  }

  return (
    <>
      {isLoad
        ? <BusyIndicator/>/* <ActivityIndicator size={'large'} color={'green'} /> */
        : <FlatList
          scrollEnabled
          data={filter()}
          extraData={isSortSeller}
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
      }
    </>
  )
}
