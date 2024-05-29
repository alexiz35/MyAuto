import { FlatList } from 'react-native'
import { getIndexCar, StateOther } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowOther } from './OtherRow'

interface handleProp {
  handlePress: (item: StateOther) => void
  filterList: string
}

export const OthersList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listOthers = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].others)
  const [isLoad, setIsLoad] = useState(true)
  const [stateOthers, setStateOthers] = useState<StateOther[]>(listOthers)

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
    setStateOthers(filter())
  }, [filterList, listOthers])

  const sort = (array: StateOther[]) => {
    if (array.length > 1) {
      return array.slice().sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(new Date(b.dateBuy)) - Date.parse(new Date(a.dateBuy))
      })
    }
    return array
  }

  const filter = (): StateOther[] => {
    switch (filterList) {
      case 'last': return sort(listOthers).slice(0, 3)
      case 'ten': return sort(listOthers).slice(0, 10)
      default: return sort(listOthers)
    }
  }

  return (
    <>

      {isLoad
        ? <BusyIndicator />
        : <FlatList
          data={stateOthers}
          /* extraData={isSortOthers} */
          renderItem={({ item }) =>
            <RenderRowOther handlePress={handlePress} item={item}/>}
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
