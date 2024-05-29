import { FlatList } from 'react-native'
import { getIndexCar, StateOther, StatePart, StateService } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowService } from './ServiceRow'

interface handleProp {
  handlePress: (item: StateService) => void
  filterList: string

}

export const ServicesList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listServices = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].services)
  const [isLoad, setIsLoad] = useState(true)
  const [stateServices, setStateServices] = useState<StateService[]>(listServices)

  /* useEffect(() => {
    if (listServices.length > 1) {
      listServices.sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
      })
      setIsSortServices(!isSortServices)
    }
  }, [listServices]) */

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
    setStateServices(filter())
  }, [filterList, listServices])

  const sort = (array: StateService[]) => {
    if (array.length > 1) {
      return array.slice().sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(new Date(b.startDate)) - Date.parse(new Date(a.startDate))
      })
    }
    return array
  }

  const filter = (): StateService[] => {
    switch (filterList) {
      case 'last': return sort(listServices).slice(0, 3)
      case 'ten': return sort(listServices).slice(0, 10)
      default: return sort(listServices)
    }
  }

  return (
    <>

    { isLoad
      ? <BusyIndicator />
      : <FlatList
        data={stateServices}
        /* extraData={isSortServices} */
        renderItem={({ item }) => <RenderRowService handlePress={handlePress} item={item}/>}
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
