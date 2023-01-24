import {
  ActionAddTask, ActionDelTask,
  ActionMiles,
  ActionType,
  CurrentMiles,
  StateTask
} from '../../type'

export const updateMiles = (currentMiles: CurrentMiles): ActionMiles => (
  {
    type: ActionType.UPDATE_MILES,
    currentMiles
  })

export const addTask = (task: StateTask): ActionAddTask => (
  {
    type: ActionType.ADD_TASK,
    task
  })

export const delTask = (id: number): ActionDelTask => (
  {
    type: ActionType.DEL_TASK,
    id
  })
