// --------------------------------constant Color --------------------------------------------

import { listService } from './components/InputDoneScreenComponents/inputService/ListServices'
import { cars } from './cars.json'

export const BACKGROUND = '#13171A'
/* export const BACK_OPACITY = 'rgba(0,0,0,0)' */
export const BACK_CARD = '#3d3d3d'
export const TEXT_CARD = '#191a1e'
export const BACK_INPUT = 'rgba(61,61,61,0.35)'
export const TEXT_WHITE = '#ffffff'
/* export const HEADER_TINT_COLOR = '#a2a2a2'
export const BACK_TAB_BOTTOM = 'rgba(0,0,0,0.94)'
export const BACK_TAB_TOP = 'rgba(0,0,0,0.94)'
export const COLOR_GREEN = '#23c50a'
export const INPUT_BACK = 'rgba(61,61,61,0.35)' */

// --------------------------------type for redux --------------------------------------------
export enum ActionType {
  UPDATE_STATE = 'UPDATE_STATE',
  // -------------------------------
  CHANGE_CAR = 'CHANGE_CAR',
  ADD_CAR = 'ADD_CAR',
  UPDATE_CAR = 'UPDATE_CAR',
  DEL_CAR = 'DEL_CAR',
  // -------------------------------
  UPDATE_MILES = 'UPDATE_MILES',
  // -------------------------------
  ADD_SERVICE = 'ADD_SERVICE',
  DEL_SERVICE = 'DEL_SERVICE',
  EDIT_SERVICE = 'EDIT_SERVICE',
  // -------------------------------
  CHANGE_THEME = 'CHANGE_THEME',
  CHANGE_ALARM_START = 'CHANGE_ALARM_START',
  CHANGE_ALARM_PERIOD = 'CHANGE_ALARM_PERIOD',
  CHANGE_ALARM_PERIOD_NUMBER = 'CHANGE_ALARM_PERIOD_NUMBER',
  // -------------------------------
  ADD_TOKEN = 'ADD_TOKEN',
  DEL_TOKEN = 'DEL_TOKEN',
  // -------------------------------
  ADD_FUEL = 'ADD_FUEL',
  DEL_FUEL = 'DEL_FUEL',
  EDIT_FUEL = 'EDIT_FUEL',
  // -------------------------------
  ADD_SELLER = 'ADD_SELLER',
  DEL_SELLER = 'DEL_SELLER',
  DELALL_SELLER = 'DELALL_SELLER',
  EDIT_SELLER = 'EDIT_SELLER',
  // -------------------------------
  ADD_PARTS = 'ADD_PARTS',
  DEL_PARTS = 'DEL_PARTS',
  EDIT_PARTS = 'EDIT_PARTS',
  INSTALL_PART = 'INSTALL_PART',
  // -------------------------------
  ADD_OTHERS = 'ADD_OTHERS',
  DEL_OTHERS = 'DEL_OTHERS',
  EDIT_OTHERS = 'EDIT_OTHERS',
  // -------------------------------
  ADD_TASK = 'ADD_TASK',
  DEL_TASK = 'DEL_TASK',
  EDIT_TASK = 'EDIT_TASK',
  FINISH_TASK = 'FINISH_TASK',
}
interface ListCar {
  label: string
  value: string
}
const listBrand = (): ListCar[] => {
  const tempList: ListCar[] = []
  const tempBrand = Object.keys(cars)
  tempBrand.forEach((item, index) =>
    (tempList[index] = {
      label: item,
      value: item
    })
  )
  console.log('brand')
  return tempList
}
export const brand = listBrand()

export interface StateMain {
  cars: StateCar[]
  numberCar: number
  token: string
  setting: Setting
  sellerList: Seller[]
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
  tasks: StateTask[]
}
export interface Setting {
  themeSet: string
  alarmMileageStart: boolean
  alarmMileagePeriod: boolean
  alarmMileagePeriodNumber: number
}
export interface Seller {
  id?: number
  name: string
  phone?: string
  web?: string
  type?: string
  specialism?: string
}

/* export interface StateListSeller {
  name: string
  phone: string
  web: string
  specialism: string
  type: string
} */

// ---------------------------------------------------------------------------------

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
  nameCar: string
  brand: string
  model: string
  fuel: string
  body: string
  year: string
  engine?: string
  capacity?: string
  gear?: string
  vin?: string
  dateBuy: Date
  buyMileage: number
  regMaintenance: ListService[]
}
export const initialStateInfo = {
  nameCar: '',
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
  buyMileage: 0,
  regMaintenance: listService
}

/* export interface StateServiceTask {
  id: number
  title: string
  dateService: Date
  milesService: number
  seller?: Seller
  amountCostService: number
} */

export interface StateService {
  id: number
  typeService: ListService
  /* title: string */
  startKm: number
  endKm: number
  startDate: Date
  endData: Date
  /* isFinished: boolean */
  sumCostParts?: number
  sumCostService?: number
  addition?:
  {
    parts?: [ModalPart]
    services?: Seller
  }
}

export interface ListService {
  nameService: string
  mileage: number
  date: number
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
  nameOther: string
  dateBuy: Date
  amountCostOther: number
  numberPart: string
  seller?: Seller
}

export interface StateTask {
  id: number
  typeTask: string
  name: string
  numberPart1?: string
  numberPart2?: string
  numberPart3?: string
  dateStartTask?: Date
  dateEndTask: Date
  milesStartTask?: number
  milesEndTask?: number
  cost?: number
  quantity?: number
  amount: number
  seller?: Seller
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
// ----------------------------- interface ActionTheme -------------------------

export interface ActionChangeTheme {
  type: ActionType.CHANGE_THEME
  typeTheme: string
}
// --------------------------- interface ActionAlarmMileageStart --------------

export interface ActionAlarmMileageStart {
  type: ActionType.CHANGE_ALARM_START
  alarmStart: boolean
}
// --------------------------- interface ActionAlarmMileagePeriod --------------

export interface ActionAlarmMileagePeriod {
  type: ActionType.CHANGE_ALARM_PERIOD
  alarmPeriod: boolean
}
// --------------------- interface ActionAlarmMileagePeriodNumber --------------

export interface ActionAlarmMileagePeriodNumber {
  type: ActionType.CHANGE_ALARM_PERIOD_NUMBER
  alarmPeriodNumber: number
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
    service: StateService
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
    service: StateService
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

// ----------------------------- interface ActionSeller -------------------------

export interface ActionAddSeller {
  type: ActionType.ADD_SELLER
  seller: Seller
}
export interface ActionDelSeller {
  type: ActionType.DEL_SELLER
  id: number | undefined
}

export interface ActionEditSeller {
  type: ActionType.EDIT_SELLER
  id: number | undefined
  seller: Seller
}
export interface ActionDelAllSeller {
  type: ActionType.DELALL_SELLER
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

export interface ActionEditTask {
  type: ActionType.EDIT_TASK
  payload: {
    carId: number
    id: number | undefined
    task: StateTask
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
ActionAddTask | ActionDelTask | ActionEditTask | ActionFinishTask | ActionChangeTheme |
ActionAlarmMileageStart | ActionAlarmMileagePeriod | ActionAlarmMileagePeriodNumber |
ActionAddSeller | ActionEditSeller | ActionDelSeller | ActionDelAllSeller

/* export type DispatchMiles = (state: StateCar, action: ActionMiles) => ActionMiles */

export type Dispatch = (state: StateMain, action: AppAction) => StateMain

// -------------------------------------------------------------------------------------------
// ----------------------------------BottomSheet----------------------------------------------

export interface ModalPart {
  id: number
  namePart: string
  costPart: number
  quantityPart: number
  numberPart: string
  seller?: Seller
}

export interface ModalAddPartsProps {
  initialParts: ModalPart[] | undefined
  onPressOk: (parts: [ModalPart]) => void
  onPressCancel: () => void
}

// --------------------------------------------------------------------------------------------
/* export interface PartModal {
  partName: string
  costName: number
} */
