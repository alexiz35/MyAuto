import {
  ActionAddCar,
  ActionAddTask, ActionDelTask, ActionEditCar, ActionEditTask, ActionFinishTask,
  ActionMiles,
  ActionType,
  CurrentMiles, StateCar, StateInfo,
  StateTask
} from '../../type'

export const updateMiles = (carId: number, currentMiles: CurrentMiles): ActionMiles => (
  {
    type: ActionType.UPDATE_MILES,
    payload: {
      carId,
      currentMiles
    }
  })

export const addTask = (carId: number, task: StateTask): ActionAddTask => (
  {
    type: ActionType.ADD_TASK,
    payload: {
      carId,
      task
    }
  })

export const delTask = (carId: number, id: number): ActionDelTask => (
  {
    type: ActionType.DEL_TASK,
    payload: {
      carId,
      id
    }
  })

export const finishTask = (carId: number, id: number, isFinished: boolean): ActionFinishTask => (
  {
    type: ActionType.FINISH_TASK,
    payload: {
      carId,
      id,
      isFinished
    }
  }
)

export const editTask = (carId: number, id: number | undefined, task: StateTask): ActionEditTask => (
  {
    type: ActionType.EDIT_TASK,
    payload: {
      carId,
      id,
      task
    }
  })

export const addCar = (car: StateCar): ActionAddCar => (
  {
    type: ActionType.ADD_CAR,
    payload: {
      car
    }
  })

export const editCar = (carId: number, carInfo: StateInfo): ActionEditCar => (
  {
    type: ActionType.UPDATE_CAR,
    payload: {
      carId,
      carInfo
    }
  })
