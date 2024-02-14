import { FlatList } from 'react-native'
import { getIndexCar, StateFuel } from '../../type'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../Redux/hook'
import { BusyIndicator } from '../useIsReadyHook'
import { RenderRowFuel } from './fuelRow'

interface handleProp {
  handlePress: (item: StateFuel) => void
  filterList: string
}

export const FuelList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listFuel = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].fuel)
  const [isSortFuel, setIsSortFuel] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  /* useEffect(() => {
    listFuel.sort(function (a, b) {
      // @ts-expect-error data
      return Date.parse(b.dateFuel) - Date.parse(a.dateFuel)
    })
    setIsSortFuel(!isSortFuel)
  }, [listFuel]) */

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
  }, [filterList])

  const filter = (): StateFuel[] => {
    switch (filterList) {
      case 'last': return listFuel.slice(0, 3)
      case 'ten': return listFuel.slice(0, 10)
      default: return listFuel
    }
  }

  return (
    <>
    {isLoad
      ? <BusyIndicator/>/* <ActivityIndicator size={'large'} color={'green'} /> */
      : <FlatList
    scrollEnabled
    data={filter()}
    extraData={isSortFuel}
    renderItem={({ item }) => <RenderRowFuel item={item} handlePress={handlePress} />}
    keyExtractor={(item, index) => index.toString()}
    getItemLayout={(data, index) => (
      {
        length: 70,
        offset: 70 * index,
        index
      }
    )}
    initialNumToRender={6}
  />
}
    </>
  )
}
