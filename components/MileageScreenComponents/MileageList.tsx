import { CurrentMiles, getIndexCar, Seller } from '../../type'
import { useAppSelector } from '../Redux/hook'
import { JSX, useEffect, useState } from 'react'
import { BusyIndicator } from '../useIsReadyHook'
import { FlatList } from 'react-native'
import { RenderRowMileage } from './RenderRowMileage'

interface handleProp {
  handlePress: (item: CurrentMiles) => void
  editPress: (item: CurrentMiles) => void
  filterList: string
}

export const MileageList = ({ handlePress, editPress, filterList = 'last' }: handleProp): JSX.Element => {
  let listMileage = useAppSelector(
    state => state.cars[getIndexCar(state.cars, state.numberCar)].mileage
  )
  const [isSortMileage, setIsSortMileage] = useState(false)

  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
  }, [filterList])

  const filter = (): CurrentMiles[] => {
    listMileage = listMileage.slice().sort((a, b) => b.currentMileage - a.currentMileage)
    switch (filterList) {
      case 'last': return listMileage.slice(0, 3)
      case 'ten': return listMileage.slice(0, 10)
      default: return listMileage
    }
  }
  return (
    <>
      {isLoad
        ? <BusyIndicator/>/* <ActivityIndicator size={'large'} color={'green'} /> */
        : <FlatList
          scrollEnabled
          data={filter()}
          extraData={isSortMileage}
          renderItem={({ item }) => <RenderRowMileage item={item} handlePress={handlePress} editPress={editPress}/>}
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
