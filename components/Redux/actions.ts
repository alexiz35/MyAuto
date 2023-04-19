import {
  ActionAddCar,
  ActionAddFuel, ActionAddParts,
  ActionAddTask,
  ActionAddToken,
  ActionDelFuel, ActionDelParts,
  ActionDelTask,
  ActionDelToken,
  ActionEditCar, ActionEditFuel, ActionEditParts,
  ActionEditTask,
  ActionFinishTask,
  ActionMiles,
  ActionType,
  ActionUpdateState,
  CurrentMiles,
  StateCar,
  StateFuel,
  StateInfo,
  StateMain, StatePart,
  StateTask
} from '../../type'
// -------------------------- Action State -------------------------------------
export const updateState = (newState: StateMain): ActionUpdateState => (
  {
    type: ActionType.UPDATE_STATE,
    newState
  })
// -------------------------- Action Mileage -----------------------------------
export const updateMiles = (carId: number, currentMiles: CurrentMiles): ActionMiles => (
  {
    type: ActionType.UPDATE_MILES,
    payload: {
      carId,
      currentMiles
    }
  })
// ----------------------------- Action Task -----------------------------------
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
// -----------------------------------------------------------------------------
// ------------------------------- Action Car ----------------------------------
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
// -----------------------------------------------------------------------------
// ------------------------------- Action Token --------------------------------
export const addToken = (token: string): ActionAddToken => (
  {
    type: ActionType.ADD_TOKEN,
    token
  })

export const delToken = (token: string): ActionDelToken => (
  {
    type: ActionType.DEL_TOKEN,
    token
  })
// -----------------------------------------------------------------------------
// ----------------------------- Action Fuel -----------------------------------
export const addFuel = (carId: number, fuel: StateFuel): ActionAddFuel => (
  {
    type: ActionType.ADD_FUEL,
    payload: {
      carId,
      fuel
    }
  })

export const delFuel = (carId: number, id: number): ActionDelFuel => (
  {
    type: ActionType.DEL_FUEL,
    payload: {
      carId,
      id
    }
  })

export const editFuel = (carId: number, id: number | undefined, fuel: StateFuel): ActionEditFuel => (
  {
    type: ActionType.EDIT_FUEL,
    payload: {
      carId,
      id,
      fuel
    }
  })
// -----------------------------------------------------------------------------
// ----------------------------- Action Parts -----------------------------------
export const addPart = (carId: number, part: StatePart): ActionAddParts => (
  {
    type: ActionType.ADD_PARTS,
    payload: {
      carId,
      part
    }
  })

export const delPart = (carId: number, id: number): ActionDelParts => (
  {
    type: ActionType.DEL_PARTS,
    payload: {
      carId,
      id
    }
  })

export const editPart = (carId: number, id: number | undefined, part: StatePart): ActionEditParts => (
  {
    type: ActionType.EDIT_PARTS,
    payload: {
      carId,
      id,
      part
    }
  })
// -----------------------------------------------------------------------------
