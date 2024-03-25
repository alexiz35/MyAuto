import { FlatList } from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { getIndexCar, StateTask } from '../../type'
import { useAppSelector } from '../Redux/hook'
import { BusyIndicator } from '../useIsReadyHook'
import { RenderRowTask } from './TaskRow'

interface handleProp {
  handlePress: (item: StateTask) => void
  filterList: string
  checkedFilter: 'finish' | 'unFinish' | 'all' | string
}

export const TasksList = ({ handlePress, filterList = 'last', checkedFilter }: handleProp): JSX.Element => {
  const listTasks = useAppSelector(state => state.cars[getIndexCar(state.cars, state.numberCar)].tasks)
  const [listIsFilter, setListIsFilter] = useState(listTasks)
  const [isSortTasks, setIsSortTasks] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    if (listTasks.length > 0) {
      switch (checkedFilter) {
        case 'unFinish': {
          const tempListTasks = listTasks.filter(value => !value.isFinished)
          tempListTasks.sort(function (a, b) {
            // @ts-expect-error date
            return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
          })
          setListIsFilter(tempListTasks)
          setIsSortTasks(!isSortTasks)
        }
          break
        case 'finish': {
          const tempListTasks = listTasks.filter(value => value.isFinished)
          tempListTasks.sort(function (a, b) {
            // @ts-expect-error date
            return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
          })
          setListIsFilter(tempListTasks)
          setIsSortTasks(!isSortTasks)
        }
          break
        case 'all': {
          listTasks.sort(function (a, b) {
            // @ts-expect-error date
            return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
          })
          setListIsFilter(listTasks)
          setIsSortTasks(!isSortTasks)
        }
      }

      /*  if (filterIsFinished) {
        const tempListTasks = listTasks.filter(value => !value.isFinished)
        tempListTasks.sort(function (a, b) {
          // @ts-expect-error date
          return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
        })
        setListIsFilter(tempListTasks)
      } else {
        listTasks.sort(function (a, b) {
          // @ts-expect-error date
          return Date.parse(a.dateBuy) - Date.parse(b.dateBuy)
        })
        setListIsFilter(listTasks)
      } */
    }
  }, [listTasks, checkedFilter])

  useEffect(() => {
    setTimeout(() => { setIsLoad(false) }, 10)
    setIsLoad(true)
  }, [filterList, checkedFilter])

  const filter = (): StateTask[] => {
    switch (filterList) {
      case 'last': return listIsFilter.slice(0, 3)
      case 'ten': return listIsFilter.slice(0, 10)
      default: return listIsFilter
    }
  }

  return (
    <>

    { isLoad
      ? <BusyIndicator />
      : <FlatList
        data={filter()}
        extraData={isSortTasks}
        renderItem={({ item }) => <RenderRowTask handlePress={handlePress} item={item}/>}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => (
          {
            length: 126,
            offset: 126 * index,
            index
          }
        )}
        initialNumToRender={6}
        />
    }
    </>
  )
}
