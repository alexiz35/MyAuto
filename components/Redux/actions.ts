import {
  ActionAddTask, ActionDelTask, ActionEditTask, ActionFinishTask,
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

export const finishTask = (id: number, isFinished: boolean): ActionFinishTask => (
  {
    type: ActionType.FINISH_TASK,
    payload: {
      id,
      isFinished
    }
  }
)

export const editTask = (id: number | undefined, task: StateTask): ActionEditTask => (
  {
    type: ActionType.EDIT_TASK,
    payload: {
      id,
      task
    }
  })
