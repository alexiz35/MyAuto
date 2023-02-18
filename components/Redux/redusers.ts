import { ActionType, Dispatch, StateCar } from '../../type'

export const initialState: StateCar = {
  currentMiles: 0,
  tasks: []
}

export const milesReducer: Dispatch = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_MILES:
      return { ...state, currentMiles: action.currentMiles }

    case ActionType.ADD_TASK:
      console.log('reduceAdd', state)
      return {
        ...state,
        tasks: state.tasks.concat(action.task)
        /* [...state.tasks, action.task] */
      }

    case ActionType.DEL_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.id)
      }

    case ActionType.EDIT_TASK: {
      const tempTasks = state.tasks.filter(item => item.id !== action.payload.id)
      const newTasks = tempTasks.concat(action.payload.task)
      return {
        ...state,
        tasks: newTasks
      }
    }

    case ActionType.FINISH_TASK:
      return {
        ...state,
        tasks: state.tasks.map(
          task => task.id === action.payload.id
            ? {
                ...task,
                isFinished: action.payload.isFinished
              }
            : task
        )
      }

    default:
      return state
  }
}
