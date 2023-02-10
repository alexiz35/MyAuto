import {
  ActionAddTask, ActionDelTask, ActionEditTask,
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

export const editTask = (id: number | undefined, task: StateTask): ActionEditTask => (
  {
    type: ActionType.EDIT_TASK,
    payload: {
      id,
      task
    }
  })
