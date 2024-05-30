import { FlatList } from 'react-native'
import { getIndexCar, StateFuel, StateOther } from '../../type'
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
  const [isLoad, setIsLoad] = useState(true)
  const [stateFuel, setStateFuel] = useState<StateFuel[]>(listFuel)

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
    setStateFuel(filter())
  }, [filterList, listFuel])

  const sort = (array: StateFuel[]) => {
    if (array.length > 1) {
      return array.slice().sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(new Date(b.dateFuel)) - Date.parse(new Date(a.dateFuel))
      })
    }
    return array
  }

  const filter = (): StateFuel[] => {
    switch (filterList) {
      case 'last': return sort(listFuel).slice(0, 3)
      case 'ten': return sort(listFuel).slice(0, 10)
      default: return sort(listFuel)
    }
  }

  return (
    <>
    {isLoad
      ? <BusyIndicator/>/* <ActivityIndicator size={'large'} color={'green'} /> */
      : <FlatList
    scrollEnabled
    data={stateFuel}
    /* extraData={isSortFuel} */
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
