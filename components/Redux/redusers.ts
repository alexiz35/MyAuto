import { ActionType, Dispatch, initialStateInfo, StateMain } from '../../type'

export const initialState: StateMain = {
  numberCar: 0,
  sellerList: [{
    name: 'rere',
    phone: '1'
  }, {
    name: 'rerere',
    phone: '2'
  }],
  token: '',
  setting: {
    themeSet: 'dark',
    alarmMileageStart: true,
    alarmMileagePeriod: true,
    alarmMileagePeriodNumber: 6
  },
  cars: [
    {
      info: initialStateInfo,
      carId: 0,
      currentMiles: {
        currentMileage: 0,
        dateMileage: new Date()
      },
      fuel: [],
      services: [],
      mileage: [],
      parts: [],
      others: [],
      tasks: []
    }
  ]
}

export const milesReducer: Dispatch = (state = initialState, action) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const selectCar = (numberCar: number) => ({
    indexArray: state.cars.findIndex(item => numberCar === item.carId),
    newArray: [...state.cars]
  })

  switch (action.type) {
    case ActionType.UPDATE_STATE:{
      return {
        ...state, ...action.newState
      }
    }
    // ------------------------------------------------------------------
    case ActionType.ADD_TOKEN:{
      return {
        ...state,
        token: action.token
      }
    }
    // ------------------------------------------------------------------
    case ActionType.CHANGE_THEME:{
      return {
        ...state,
        setting: { ...state.setting, themeSet: action.typeTheme }
      }
    }
    // ------------------------------------------------------------------
    case ActionType.CHANGE_ALARM_START:{
      return {
        ...state,
        setting: { ...state.setting, alarmMileageStart: action.alarmStart }
      }
    }
    // ------------------------------------------------------------------
    case ActionType.CHANGE_ALARM_PERIOD:{
      return {
        ...state,
        setting: { ...state.setting, alarmMileagePeriod: action.alarmPeriod }
      }
    }
    // ------------------------------------------------------------------
    case ActionType.CHANGE_ALARM_PERIOD_NUMBER:{
      return {
        ...state,
        setting: { ...state.setting, alarmMileagePeriodNumber: action.alarmPeriodNumber }
      }
    }
    // -------------------------------------------------------------------
    case ActionType.CHANGE_CAR: {
      return {
        ...state,
        numberCar: action.numberCar
      }
    }

    case ActionType.ADD_CAR: {
      return {
        ...state,
        cars: state.cars.concat(action.payload.car)
      }
    }

    case ActionType.UPDATE_CAR: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      newArray[indexArray].info = action.payload.carInfo
      return {
        ...state,
        cars: newArray
      }
    }
    // -------------------------------------------------------------------
    case ActionType.UPDATE_MILES: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      /* const indexArray = state.cars.findIndex(item => action.payload.carId === item.carId)
      const newArray = [...state.cars] */
      newArray[indexArray].currentMiles = action.payload.currentMiles
      newArray[indexArray].mileage.push(action.payload.currentMiles)
      return {
        ...state,
        cars: newArray
      }
    }
    // -------------------------------------------------------------------
    case ActionType.ADD_SERVICE: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].services.push(action.payload.service)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.DEL_SERVICE: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].services = newArray[indexArray].services.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.EDIT_SERVICE: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      const tempTasks = newArray[indexArray].services.filter(item => item.id !== action.payload.id)
      newArray[indexArray].services = tempTasks.concat(action.payload.service)
      return {
        ...state,
        cars: newArray
      }
    }

    // -------------------------------------------------------------------
    case ActionType.ADD_FUEL: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      newArray[indexArray].fuel.push(action.payload.fuel)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.DEL_FUEL: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].fuel = newArray[indexArray].fuel.filter(item => item.id !== action.payload.id)

      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.EDIT_FUEL: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      const tempFuel = newArray[indexArray].fuel.filter(item => item.id !== action.payload.id)
      newArray[indexArray].fuel = tempFuel.concat(action.payload.fuel)
      return {
        ...state,
        cars: newArray
      }
    }

    // -------------------------------------------------------------------
    case ActionType.ADD_SELLER: {
      const tempSeller = state.sellerList
      return {
        ...state,
        sellerList: tempSeller.concat(action.seller)
      }
    }

    case ActionType.DEL_SELLER: {
      const tempSellerList = state.sellerList
      const tempSeller = tempSellerList.filter(item => item.id !== action.id)
      return {
        ...state,
        sellerList: tempSeller
      }
    }

    case ActionType.DELALL_SELLER: {
      return {
        ...state,
        sellerList: []
      }
    }

    case ActionType.EDIT_SELLER: {
      const tempSellerList = state.sellerList
      const tempSeller = tempSellerList.filter(item => item.id !== action.id)
      const editSeller = tempSeller.concat(action.seller)
      return {
        ...state,
        sellerList: editSeller
      }
    }

    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    case ActionType.ADD_PARTS: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      newArray[indexArray].parts.push(action.payload.part)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.DEL_PARTS: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].parts = newArray[indexArray].parts.filter(item => item.id !== action.payload.id)

      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.EDIT_PARTS: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      const tempPart = newArray[indexArray].parts.filter(item => item.id !== action.payload.id)
      newArray[indexArray].parts = tempPart.concat(action.payload.part)
      return {
        ...state,
        cars: newArray
      }
    }

    // -------------------------------------------------------------------
    case ActionType.ADD_OTHERS: {
      const { newArray, indexArray } = selectCar(action.payload.carId)
      newArray[indexArray].others.push(action.payload.other)
      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.DEL_OTHERS: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      newArray[indexArray].others = newArray[indexArray].others.filter(item => item.id !== action.payload.id)

      return {
        ...state,
        cars: newArray
      }
    }

    case ActionType.EDIT_OTHERS: {
      const { newArray, indexArray } = selectCar(action.payload.carId)

      const tempPart = newArray[indexArray].others.filter(item => item.id !== action.payload.id)
      newArray[indexArray].others = tempPart.concat(action.payload.other)
      return {
        ...state,
        cars: newArray
      }
    }

    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
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

            return true
          }
          return false
        }
      )

      return {
        ...state,
        cars: newArray
      }
    }

    // ----------------------------------------------------------------------------------------------

    default:
      return state
  }
}
