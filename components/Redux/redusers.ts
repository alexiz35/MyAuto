import { ActionType, Dispatch, initialStateInfo, StateMain } from '../../type'

export const initialState: StateMain = {
  numberCar: 0,
  cars: [
    {
      info: initialStateInfo,
      carId: 0,
      currentMiles: 0,
      tasks: []
    }
  ]
}

export const milesReducer: Dispatch = (state = initialState, action) => {
  const selectCar = (numberCar: number) => ({
    indexArray: state.cars.findIndex(item => numberCar === item.carId),
    newArray: [...state.cars]
  })

  switch (action.type) {
    case ActionType.CHANGE_CAR: {
      return {
        ...state,
        numberCar: action.numberCar
      }
    }

    case ActionType.UPDATE_MILES: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      /* const indexArray = state.cars.findIndex(item => action.payload.carId === item.carId)
      const newArray = [...state.cars] */
      newArray[indexArray].currentMiles = action.payload.currentMiles
      return {
        ...state,
        cars: newArray
      }
    }
    case ActionType.ADD_TASK: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].tasks.push(action.payload.task)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.DEL_TASK: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].tasks = newArray[indexArray].tasks.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.EDIT_TASK: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      const tempTasks = newArray[indexArray].tasks.filter(item => item.id !== action.payload.id)
      newArray[indexArray].tasks = tempTasks.concat(action.payload.task)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.FINISH_TASK: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      newArray[indexArray].tasks.find(
        (task, index) => {
          if (task.id === action.payload.id) {
            newArray[indexArray].tasks[index].isFinished = action.payload.isFinished
            console.log('finish', newArray)

            return true
          }
          return false
        }
      )
      console.log('finish', newArray)

      return {
        ...state,
        cars: newArray
      }
    }
    default:
      return state
  }
}
