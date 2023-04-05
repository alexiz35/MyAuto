
import { StateCar, StateTask } from '../../type'
import { TypeSelect } from '../../screens/StatScreen'

const calcSumCostParts = (targetArray: StateTask[]): number => {
  const temp: number[] = []
  targetArray.forEach((item, index) => {
    if (item.sumCostParts === undefined)item.sumCostParts = 0
    if (item.sumCostService === undefined)item.sumCostService = 0
    temp[index] = item.sumCostParts + item.sumCostService
  })
  return temp.reduce((accumulator, currentValue) => (
    accumulator + currentValue
  ), 0)
}

// ------------------------------------ function select Year date ----------------------------------
export const yearDataFuelChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number => {
  const selectYear = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)
  return selectYear.reduce((accumulator, currentValue) => accumulator + currentValue.AmountFuel, 0)

  /* setDataChartFuel(tempData) */
}
export const yearDataPartsChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number => {
  const selectYear = dataState.tasks.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
  return calcSumCostParts(selectYear)
  /* setDataChartParts(tempData) */
}
// ----------------------------------- function select Month Date ---------------------------------
export const monthDataFuelChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const selectYear = dataState.fuel.filter((value) =>
    // @ts-expect-error valueYear?undefined
    new Date(value.dateFuel).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateFuel).getMonth() === searchDate.valueMonth
  )
  return selectYear.reduce((accumulator, currentValue) => accumulator + currentValue.AmountFuel, 0)
  /* setDataChartFuel(tempData) */
}
export const monthDataPartsChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const selectYear = dataState.tasks.filter((value) =>
    // @ts-expect-error valueYear?undefined
    new Date(value.startDate).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.startDate).getMonth() === searchDate.valueMonth
  )
  return calcSumCostParts(selectYear)
  /* setDataChartParts(temp) */
}
// ----------------------------------- function period Date -----------------------------------------
const createPeriodDate = (searchDate: TypeSelect): { startDate: Date, endDate: Date } => {
  const startDate = new Date(Number(searchDate.period?.valueStartYear), Number(searchDate.period?.valueStartMonth))
  const endDate = new Date(Number(searchDate.period?.valueEndYear), Number(searchDate.period?.valueEndMonth))
  return {
    startDate,
    endDate
  }
}
export const periodDataFuelChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.fuel.filter((value) => {
    const tempDate = new Date(value.dateFuel)
    return startDate <= tempDate && tempDate <= endDate
  })
  return filterDate.reduce((accumulator, currentValue) => accumulator + currentValue.AmountFuel, 0)
  /* setDataChartFuel(tempData) */
}
export const periodDataPartsChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.tasks.filter((value) => {
    const tempDate = new Date(value.startDate)
    return startDate <= tempDate && tempDate <= endDate
  })
  return calcSumCostParts(filterDate)
  /* setDataChartParts(tempData) */
}
