import { typeTask } from './Tasks'
import { createContext, useContext } from 'react'

export interface GlobalContent {
  listTasks: [typeTask]
  setListTasks: (dataHome: any) => void
}
export const GlobalContext = createContext<GlobalContent>({
  listTasks: [{
    title: 'engine oil',
    startKm: 0,
    endKm: 0,
    startDate: '00.00.00',
    endData: '00.00.00'
  }],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setListTasks: () => {}
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/* export const useGlobalContext = () => useContext(GlobalContext) */
