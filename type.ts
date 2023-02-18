// --------------------------------type for redux --------------------------------------------
export enum ActionType {
  UPDATE_MILES = 'UPDATE_MILES',
  ADD_TASK = 'ADD_TASK',
  DEL_TASK = 'DEL_TASK',
  EDIT_TASK = 'EDIT_TASK',
  FINISH_TASK = 'FINISH_TASK'
}

export interface StateCar {
  currentMiles: CurrentMiles
  tasks: StateTask[]
}

export interface StateTask {
  id: number
  title: string
  startKm: number
  endKm: number
  startDate: string
  endData: string
  isFinished: boolean
  sumCostParts?: number
  sumCostService?: number
  addition?: {
    parts?: [PartList]
    services?: [ServiceList]
  }

}
// -------------------------------------------------------------------------------------------
// -----------------------------------type for Miles state----------------------------------
export type CurrentMiles = number

/* export interface StateMiles {
  currentMiles: number
} */

export interface ActionMiles {
  type: ActionType.UPDATE_MILES
  currentMiles: CurrentMiles
}
export interface ActionAddTask {
  type: ActionType.ADD_TASK
  task: StateTask
}
export interface ActionDelTask {
  type: ActionType.DEL_TASK
  id: number
}

export interface ActionFinishTask {
  type: ActionType.FINISH_TASK
  payload: {
    id: number
    isFinished: boolean
  }
}

export interface ActionEditTask {
  type: ActionType.EDIT_TASK
  payload: {
    id: number | undefined
    task: StateTask
  }
}

export type AppAction = ActionMiles | ActionAddTask | ActionDelTask | ActionEditTask | ActionFinishTask

/* export type DispatchMiles = (state: StateCar, action: ActionMiles) => ActionMiles */

export type Dispatch = (state: StateCar, action: AppAction) => StateCar

// -------------------------------------------------------------------------------------------
// ----------------------------------BottomSheet----------------------------------------------
export interface PartList {
  id: number
  namePart: string
  costPart: number
  amountPart: number
  numberPart: string
}
export interface ServiceList {
  id: number
  nameService: string
  costService: number
}

export interface PropsBottomSheet {
  initialParts: PartList[]
  onPressOk: (parts: PartList[]) => void
  onPressCancel: () => void
}

// --------------------------------------------------------------------------------------------
/* export interface PartModal {
  partName: string
  costName: number
} */

export interface PropsModalInput {
  onPressOk: (partName: string, costName: string) => void
  onPressCancel: () => void
}
