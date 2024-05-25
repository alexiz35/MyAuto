import { FlatList } from 'react-native'
import { getIndexCar, StatePart } from '../../../type'
import { JSX, useEffect, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { BusyIndicator } from '../../useIsReadyHook'
import { RenderRowPart } from './PartRow'

interface handleProp {
  handlePress: (item: StatePart) => void
  filterList: string
  filterInstall: 'all' | 'onlyInstall' | 'withoutInstall' | string
}

export const PartsList = ({ handlePress, filterList = 'last', filterInstall }: handleProp): JSX.Element => {
  const listParts = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].parts)

  const [isSortParts, setIsSortParts] = useState(false)
  const [isLoad, setIsLoad] = useState(true)
  const [isLoadFlatlist, setIsLoadFlatlist] = useState(false)
  const [stateParts, setStateParts] = useState<StatePart[]>(listParts)

  useEffect(() => {
    console.log('Update')
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
    setStateParts(filter())
  }, [listParts, filterInstall, filterList])

  const sort = (array: StatePart[]) => {
    if (array.length > 1) {
      return array.slice().sort(function (a, b) {
        // @ts-expect-error date
        return Date.parse(new Date(b.dateBuy)) - Date.parse(new Date(a.dateBuy))
      })
    }
    return array
  }

  /* useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
  }, []) */

  const isInstallFilter = () => {
    if (filterInstall === 'withoutInstall') {
      return sort(listParts.filter(value => !value.isInstall))
    } else if (filterInstall === 'onlyInstall') {
      return sort(listParts.filter(value => value.isInstall))
    }
    return sort(listParts)
  }

  const filter = (): StatePart[] => {
    /* console.log(isInstallFilter()) */
    switch (filterList) {
      case 'last': return isInstallFilter().slice(0, 3)
      case 'ten': return isInstallFilter().slice(0, 10)
      default: return isInstallFilter()
    }
  }

  return (
    <>

    { isLoad
      ? <BusyIndicator />
      : <FlatList
        data={stateParts}
        /* extraData={isSortParts} */
        renderItem={({ item }) => <RenderRowPart handlePress={handlePress} item={item}/>}
        keyExtractor={(item, index) => item.id.toString()}
        ListFooterComponent={isLoadFlatlist
          ? (
          <BusyIndicator />
            )
          : null}
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
