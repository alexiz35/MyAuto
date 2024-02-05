import { FlatList } from 'react-native'
import { indexCar, StateOther } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowOther } from './OtherRow'

interface handleProp {
  handlePress: (item: StateOther) => void
  filterList: string
}

export const OthersList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listOthers = useAppSelector(state => state.cars[indexCar(state.cars,state.numberCar)].others)
  const [isSortOthers, setIsSortOthers] = useState(false)
  const [isLoad, setIsLoad] = useState(true)


  /* useEffect(() => {
    if (listOthers.length > 1) {
      listOthers.sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
      })
      setIsSortOthers(!isSortOthers)
    }
  }, [listOthers]) */

  useEffect(() => {
    setTimeout(() => setIsLoad(false), 10)
    return setIsLoad(true)
  }, [filterList])

  const filter = (): StateOther[] => {
    switch (filterList) {
      case 'last': return listOthers.slice(0, 3)
      case 'ten': return listOthers.slice(0, 10)
      default: return listOthers
    }
  }

  return (
    <>

      {isLoad
        ? <BusyIndicator />
        : <FlatList
          data={filter()}
          extraData={isSortOthers}
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
