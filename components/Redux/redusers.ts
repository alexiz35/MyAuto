import { ActionType, Dispatch, DispatchMiles, StateCar } from '../../type'

const initialState: StateCar = {
  currentMiles: 100,
  tasks: [{
    id: 1,
    title: 'Oil',
    startKm: 200000,
    endKm: 250000,
    startDate: '25.01.22',
    endData: '25.01.22'
  }]
}

export const milesReducer: Dispatch = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_MILES:
      console.log('reduce', state)
      return { ...state, currentMiles: action.currentMiles }
    case ActionType.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks, action.task
        ]
      }
    case ActionType.DEL_TASK:
      console.log('delId', action.id)
      return { ...state, tasks: state.tasks.filter(item => item.id !== action.id) }
    default:
      return state
  }
}
