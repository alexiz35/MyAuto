// --------------------------------constant Color --------------------------------------------

export const BACKGROUND = '#13171A'
export const BACK_CARD = '#3d3d3d'
export const TEXT_CARD = '#191a1e'
export const BACK_INPUT = 'rgba(61,61,61,0.35)'
export const TEXT = '#F7F8FB'
export const TEXT_WHITE = '#ffffff'
export const HEADER_TINT_COLOR = '#a2a2a2'
export const BACK_TAB_BOTTOM = 'rgba(0,0,0,0.94)'
export const BACK_TAB_TOP = 'rgba(0,0,0,0.94)'
export const COLOR_GREEN = '#23c50a'
export const INPUT_BACK = 'rgba(61,61,61,0.35)'

// --------------------------------type for redux --------------------------------------------
export enum ActionType {
  CHANGE_CAR = 'CHANGE_CAR',
  UPDATE_MILES = 'UPDATE_MILES',
  ADD_TASK = 'ADD_TASK',
  DEL_TASK = 'DEL_TASK',
  EDIT_TASK = 'EDIT_TASK',
  FINISH_TASK = 'FINISH_TASK'
}

export interface StateMain {
  cars: StateCar[]
  numberCar: number
}

export interface StateCar {
  carId: number
  info: StateInfo
  currentMiles: CurrentMiles
  tasks: StateTask[]
}

export interface StateInfo {
  brand: string
  model: string
  fuel: string
  body: string
  year: string
  engine: string
  capacity: string
  gear: string
  vin: string
  dateBuy: string
  buyMileage: number
}
export const initialStateInfo = {
  brand: '',
  model: '',
  fuel: '',
  body: '',
  year: '',
  engine: '',
  capacity: '',
  gear: '',
  vin: '',
  dateBuy: '',
  buyMileage: 0
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
export interface ActionChangeCar {
  type: ActionType.CHANGE_CAR
  numberCar: number
}

export interface ActionMiles {
  type: ActionType.UPDATE_MILES
  payload: {
    carId: number
    currentMiles: CurrentMiles
  }
}
export interface ActionAddTask {
  type: ActionType.ADD_TASK
  payload: {
    carId: number
    task: StateTask
  }
}
export interface ActionDelTask {
  type: ActionType.DEL_TASK
  payload: {
    carId: number
    id: number
  }
}

export interface ActionFinishTask {
  type: ActionType.FINISH_TASK
  payload: {
    carId: number
    id: number
    isFinished: boolean
  }
}

export interface ActionEditTask {
  type: ActionType.EDIT_TASK
  payload: {
    carId: number
    id: number | undefined
    task: StateTask
  }
}

export type AppAction = ActionMiles | ActionAddTask | ActionDelTask | ActionEditTask | ActionFinishTask | ActionChangeCar

/* export type DispatchMiles = (state: StateCar, action: ActionMiles) => ActionMiles */

export type Dispatch = (state: StateMain, action: AppAction) => StateMain

// -------------------------------------------------------------------------------------------
// ----------------------------------BottomSheet----------------------------------------------
export interface PartList {
  id: number
  namePart: string
  costPart: number
  amountPart: number
  numberPart: string
  seller?: Seller
}
export interface Seller {
  name: string
  phone: string
  link: string
}
export interface ServiceList {
  id: number
  nameService: string
  costService: number
}

export interface PropsBottomSheet {
  initialParts: PartList[] | undefined
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