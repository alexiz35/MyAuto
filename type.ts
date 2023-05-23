// --------------------------------constant Color --------------------------------------------

export const BACKGROUND = '#13171A'
export const BACK_OPACITY = 'rgba(0,0,0,0)'
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
  UPDATE_STATE = 'UPDATE_STATE',
  CHANGE_CAR = 'CHANGE_CAR',
  UPDATE_MILES = 'UPDATE_MILES',
  ADD_SERVICE = 'ADD_SERVICE',
  DEL_SERVICE = 'DEL_SERVICE',
  EDIT_SERVICE = 'EDIT_SERVICE',
  ADD_CAR = 'ADD_CAR',
  UPDATE_CAR = 'UPDATE_CAR',
  DEL_CAR = 'DEL_CAR',
  ADD_TOKEN = 'ADD_TOKEN',
  DEL_TOKEN = 'DEL_TOKEN',
  ADD_FUEL = 'ADD_FUEL',
  DEL_FUEL = 'DEL_FUEL',
  EDIT_FUEL = 'EDIT_FUEL',
  ADD_PARTS = 'ADD_PARTS',
  DEL_PARTS = 'DEL_PARTS',
  EDIT_PARTS = 'EDIT_PARTS',
  INSTALL_PART = 'INSTALL_PART',
  ADD_OTHERS = 'ADD_OTHERS',
  DEL_OTHERS = 'DEL_OTHERS',
  EDIT_OTHERS = 'EDIT_OTHERS',
  ADD_TASK = 'ADD_TASK',
  DEL_TASK = 'DEL_TASK',
  EDIT_TASK = 'EDIT_TASK',
  FINISH_TASK = 'FINISH_TASK',
}

export interface StateMain {
  cars: StateCar[]
  numberCar: number
  token: string
}

export interface StateCar {
  carId: number
  info: StateInfo
  currentMiles: CurrentMiles
  fuel: StateFuel[]
  services: StateService[]
  parts: StatePart[]
  mileage: CurrentMiles[]
  others: StateOther[]
}

export interface StateFuel {
  id: number
  dateFuel: Date
  mileageFuel: number
  volumeFuel: number
  CostFuel: number
  AmountFuel: number
  StationFuel: string
  typeFuel?: string
}

export interface StateInfo {
  brand: string
  model: string
  fuel: string
  body: string
  year: string
  engine?: string
  capacity?: string
  gear?: string
  vin: string
  dateBuy: Date
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
  dateBuy: new Date(),
  buyMileage: 0
}

export interface StateService {
  id: number
  title: string
  startKm: number
  endKm: number
  startDate: string
  endData: string
  /* isFinished: boolean */
  sumCostParts?: number
  sumCostService?: number
  addition?:
  {
    parts?: [ModalPart]
    services?: [ServiceList]
  }
}

export interface StatePart {
  id: number
  namePart: string
  dateBuy: Date
  dateInstall?: Date
  mileageInstall?: number
  costPart: number
  quantityPart: number
  amountCostPart: number
  numberPart: string
  numberPart1?: string
  numberPart2?: string
  seller?: Seller
  isInstall: boolean
}
export interface StateOther {
  id: number
  namePart: string
  dateBuy: Date
  amountCostPart: number
  numberPart: string
  seller?: Seller
}
export interface Seller {
  name: string
  phone?: string
  link?: string
}

export interface StateTask {
  id: number
  typeTask: string
  name: string
  name2: string
  name3: string
  dateStartTask: Date
  dateEndTask: Date
  milesStartTask: number
  milesEndTask: number
  cost: number
  quantity: number
  amount: number
  seller: Seller
  isFinished: boolean
}
// -------------------------------------------------------------------------------------------
// -----------------------------------type for Miles state----------------------------------
export interface CurrentMiles {
  currentMileage: number
  dateMileage: Date
}
// ------------------------------------------------------------------------------------------
/* export interface StateMiles {
  currentMiles: number
} */
export interface ActionUpdateState {
  type: ActionType.UPDATE_STATE
  newState: StateMain
}
// ----------------------------- interface ActionToken -------------------------

export interface ActionAddToken {
  type: ActionType.ADD_TOKEN
  token: string
}
export interface ActionDelToken {
  type: ActionType.DEL_TOKEN
  token: string
}
// ----------------------------- interface Action ------------------------------

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
// ----------------------------- interface ActionTask -------------------------

export interface ActionAddService {
  type: ActionType.ADD_SERVICE
  payload: {
    carId: number
    task: StateService
  }
}
export interface ActionDelService {
  type: ActionType.DEL_SERVICE
  payload: {
    carId: number
    id: number
  }
}

export interface ActionEditService {
  type: ActionType.EDIT_SERVICE
  payload: {
    carId: number
    id: number | undefined
    task: StateService
  }
}

/* export interface ActionFinishTask {
  type: ActionType.FINISH_TASK
  payload: {
    carId: number
    id: number
    isFinished: boolean
  }
} */
// ----------------------------- interface ActionCar -------------------------

export interface ActionAddCar {
  type: ActionType.ADD_CAR
  payload: {
    car: StateCar
  }
}
export interface ActionDelCar {
  type: ActionType.DEL_CAR
  payload: {
    carId: number
  }
}

export interface ActionEditCar {
  type: ActionType.UPDATE_CAR
  payload: {
    carId: number
    carInfo: StateInfo
  }
}
// ----------------------------- interface ActionFuel -------------------------

export interface ActionAddFuel {
  type: ActionType.ADD_FUEL
  payload: {
    carId: number
    fuel: StateFuel
  }
}
export interface ActionDelFuel {
  type: ActionType.DEL_FUEL
  payload: {
    carId: number
    id: number
  }
}

export interface ActionEditFuel {
  type: ActionType.EDIT_FUEL
  payload: {
    carId: number
    id: number | undefined
    fuel: StateFuel
  }
}
// ----------------------------- interface ActionParts -------------------------
export interface ActionAddParts {
  type: ActionType.ADD_PARTS
  payload: {
    carId: number
    part: StatePart
  }
}
export interface ActionDelParts {
  type: ActionType.DEL_PARTS
  payload: {
    carId: number
    id: number
  }
}

export interface ActionEditParts {
  type: ActionType.EDIT_PARTS
  payload: {
    carId: number
    id: number | undefined
    part: StatePart
  }
}

export interface ActionInstallPart {
  type: ActionType.INSTALL_PART
  payload: {
    carId: number
    id: number
    isInstall: boolean
  }
}

// -----------------------------------------------------------------------------
// ----------------------------- interface ActionOthers -------------------------
export interface ActionAddOthers {
  type: ActionType.ADD_OTHERS
  payload: {
    carId: number
    other: StateOther
  }
}
export interface ActionDelOthers {
  type: ActionType.DEL_OTHERS
  payload: {
    carId: number
    id: number
  }
}

export interface ActionEditOthers {
  type: ActionType.EDIT_OTHERS
  payload: {
    carId: number
    id: number | undefined
    other: StateOther
  }
}

// -----------------------------------------------------------------------------
// ----------------------------- interface ActionTask -------------------------

export interface ActionAddTask {
  type: ActionType.ADD_SERVICE
  payload: {
    carId: number
    task: StateService
  }
}
export interface ActionDelTask {
  type: ActionType.DEL_SERVICE
  payload: {
    carId: number
    id: number
  }
}

export interface ActionEditTask {
  type: ActionType.EDIT_SERVICE
  payload: {
    carId: number
    id: number | undefined
    task: StateService
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
// -------------------------------------------------------------------------------------------

export type AppAction = ActionMiles | ActionChangeCar |
ActionAddService | ActionDelService | ActionEditService |
ActionAddCar | ActionEditCar | ActionDelCar | ActionAddToken | ActionDelToken |
ActionUpdateState | ActionAddFuel | ActionDelFuel | ActionEditFuel |
ActionAddParts | ActionDelParts | ActionEditParts | ActionInstallPart |
ActionAddOthers | ActionDelOthers | ActionEditOthers |
ActionAddTask | ActionDelTask | ActionEditTask | ActionFinishTask

/* export type DispatchMiles = (state: StateCar, action: ActionMiles) => ActionMiles */

export type Dispatch = (state: StateMain, action: AppAction) => StateMain

// -------------------------------------------------------------------------------------------
// ----------------------------------BottomSheet----------------------------------------------

export interface ServiceList {
  id: number
  nameService: string
  costService: number
}

export interface ModalPart {
  id: number
  namePart: string
  costPart: number
  quantityPart: number
  numberPart: string
  seller?: Seller
}

export interface PropsBottomSheet {
  initialParts: ModalPart[] | undefined
  onPressOk: (parts: [ModalPart]) => void
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
