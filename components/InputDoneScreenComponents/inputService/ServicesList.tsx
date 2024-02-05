import { FlatList } from 'react-native'
import { indexCar, StateService } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowService } from './ServiceRow'

interface handleProp {
  handlePress: (item: StateService) => void
  filterList: string

}

export const ServicesList = ({ handlePress, filterList = 'last' }: handleProp): JSX.Element => {
  const listServices = useAppSelector(state => state.cars[indexCar(state.cars,state.numberCar)].services)
  const [isSortServices, setIsSortServices] = useState(false)
  const [isLoad, setIsLoad] = useState(true)


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
    setTimeout(() => setIsLoad(false), 10)
    return setIsLoad(true)
  }, [filterList])

  const filter = (): StateService[] => {
    switch (filterList) {
      case 'last': return listServices.slice(0, 3)
      case 'ten': return listServices.slice(0, 10)
      default: return listServices
    }
  }

  return (
    <>

    { isLoad
      ? <BusyIndicator />
      : <FlatList
        data={filter()}
        extraData={isSortServices}
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
