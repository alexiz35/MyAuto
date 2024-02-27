import { StateCar, StateFuel, StateService } from '../../type'
import { TypeSelect } from '../../screens/StatScreen'

export const ALL_BAR = '#23C50AFF'
export const FUEL_BAR = '#177AD5'
export const PART_BAR = '#79D2DE'
export const OTHER_BAR = '#ED6665'

export const initialBarChart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export const minMiles = (arr: number[]): number => Math.min(...arr)
export const maxMiles = (arr: number[]): number => Math.max(...arr)

const calcSumCostParts = (targetArray: StateService[]): number => {
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
// ************************************ function barChart ******************************************
export const yearDataFuelBarChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number[] => {
  const selectYear = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)
  const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  selectYear.forEach((item) => {
    tempData[new Date(item.dateFuel).getMonth()] += item.AmountFuel
  })
  return tempData
}
export const yearDataOtherBarChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number[] => {
  const selectYear = dataState.others.filter((value) => new Date(value.dateBuy).getFullYear() === searchYear)
  const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  selectYear.forEach((item) => {
    tempData[new Date(item.dateBuy).getMonth()] += item.amountCostOther
  })
  return tempData
}
export const yearDataPartsBarChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number[] => {
  const selectYear = dataState.services.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
  const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  selectYear.forEach((item) => {
    if (item.sumCostParts === undefined)item.sumCostParts = 0
    if (item.sumCostService === undefined)item.sumCostService = 0
    tempData[new Date(item.startDate).getMonth()] += (item.sumCostParts + item.sumCostService)
  })
  return tempData
}
export const yearDataAllChart = (searchYear = new Date().getFullYear(), dataState: StateCar): { all: number[], fuel: number[], parts: number[], other: number[] } => {
  const fuel = yearDataFuelBarChart(searchYear, dataState)
  const parts = yearDataPartsBarChart(searchYear, dataState)
  const other = yearDataOtherBarChart(searchYear, dataState)
  const all = fuel.map((value, index) => (Number(value) + Number(parts[index]) + Number(other[index])))
  return { all, fuel, parts, other }
}
// *************************************************************************************************
// ------------------------------------ function select Year date ----------------------------------
export const yearDataFuelChart = (searchYear = new Date().getFullYear(), dataState: StateCar): { amountFuel: number, volumeFuel: number } => {
  const selectYear = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)

  const amountFuel = selectYear.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = selectYear.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)

  return { amountFuel, volumeFuel }
  /* setDataChartFuel(tempData) */
}

export const averageFuel = (selectDate: TypeSelect, dataState: StateCar): number => {
  // array is filtered by period time
  let filteredArrayByDate: StateFuel[]

  switch (selectDate.type) {
    case 'year':
      filteredArrayByDate = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === Number(selectDate.valueYear))
      break
    case 'month':
      filteredArrayByDate = dataState.fuel.filter((value) =>
        new Date(value.dateFuel).getFullYear() === Number(selectDate.valueYear) &&
        new Date(value.dateFuel).getMonth() === selectDate.valueMonth)
      break
    case 'period': {
      const { startDate, endDate } = createPeriodDate(selectDate)
      filteredArrayByDate = dataState.fuel.filter((value) => {
        const tempDate = new Date(value.dateFuel)
        return startDate <= tempDate && tempDate <= endDate
      })
    }
      break
    default: {
      filteredArrayByDate = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === Number(selectDate.valueYear))
    }
  }
  if (filteredArrayByDate.length === 0) return 0
  // array is sorted by ascending order
  filteredArrayByDate.sort((a, b) => a.mileageFuel - b.mileageFuel)
  console.log('ARRAY', filteredArrayByDate)
  // mileage - difference between last and first mileageFuel
  const mileage = filteredArrayByDate[filteredArrayByDate.length - 1].mileageFuel - filteredArrayByDate[0].mileageFuel
  console.log('Mile', mileage, filteredArrayByDate[filteredArrayByDate.length - 1].volumeFuel, filteredArrayByDate.length - 1)
  // amount of fuel - sum fuel without last refueling
  const amountFuel = filteredArrayByDate.reduce((accumulator, currentValue, currentIndex) =>
    (currentIndex === (filteredArrayByDate.length - 1))
      ? accumulator
      : (accumulator + Number(currentValue.volumeFuel))
  , 0)
  console.log('fuel', amountFuel)
  return Number(((amountFuel / mileage) * 100).toFixed(2))
  /* const mileage = selectYear.reduce((accumulator, currentValue) => accumulator + Number(currentValue.mileageFuel), 0) */
}
export const yearDataMilesChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number => {
  const selectYear = dataState.mileage.filter((value) => new Date(value.dateMileage).getFullYear() === searchYear)
  const selectMiles = selectYear.map(item => item.currentMileage)
  if (selectMiles.length === 0) return 0
  //* *****************************************************************************
  selectMiles.splice(0, 1) // temp string
  //* *****************************************************************************

  const minMiles = (arr: number[]): number => Math.min(...arr)
  const maxMiles = (arr: number[]): number => Math.max(...arr)
  return maxMiles(selectMiles) - minMiles(selectMiles)
}
export const yearDataPartsChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number => {
  const selectYear = dataState.services.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
  return calcSumCostParts(selectYear)
}
export const yearDataOtherChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number => {
  const selectYear = dataState.others.filter((value) => new Date(value.dateBuy).getFullYear() === searchYear)
  return selectYear.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amountCostOther), 0)
}
// ----------------------------------- function select Month Date ----------------------------------
export const monthDataFuelChart = (searchDate: TypeSelect, dataState: StateCar): { amountFuel: number, volumeFuel: number } => {
  const tempArrayFuelSelectMonth = dataState.fuel.filter((value) =>
    // @ts-expect-error valueYear?undefined
    new Date(value.dateFuel).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateFuel).getMonth() === searchDate.valueMonth
  )
  const amountFuel = tempArrayFuelSelectMonth.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = tempArrayFuelSelectMonth.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)
  return { amountFuel, volumeFuel }
}
export const monthDataPartsChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const selectYear = dataState.services.filter((value) =>
    // @ts-expect-error valueYear?undefined
    new Date(value.startDate).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.startDate).getMonth() === searchDate.valueMonth
  )
  return calcSumCostParts(selectYear)
  /* setDataChartParts(temp) */
}
export const monthDataOtherChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const selectYear = dataState.others.filter((value) =>
    // @ts-expect-error valueYear?undefined
    new Date(value.dateBuy).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateBuy).getMonth() === searchDate.valueMonth
  )

  return selectYear.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0)
}
export const monthDataMilesChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const selectYear = dataState.mileage.filter((value) =>
    // @ts-expect-error valueYear?undefined
    new Date(value.dateMileage).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateMileage).getMonth() === searchDate.valueMonth
  )
  const selectMiles = selectYear.map(item => item.currentMileage)
  if (selectMiles.length === 0) return 0
  //* *****************************************************************************
  selectMiles.splice(0, 1) // temp string
  //* *****************************************************************************

  const minMiles = (arr: number[]): number => Math.min(...arr)
  const maxMiles = (arr: number[]): number => Math.max(...arr)
  return maxMiles(selectMiles) - minMiles(selectMiles)
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
export const periodDataFuelChart = (searchDate: TypeSelect, dataState: StateCar): { amountFuel: number, volumeFuel: number } => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.fuel.filter((value) => {
    const tempDate = new Date(value.dateFuel)
    return startDate <= tempDate && tempDate <= endDate
  })
  const amountFuel = filterDate.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = filterDate.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)
  return { amountFuel, volumeFuel }
  /* setDataChartFuel(tempData) */
}
export const periodDataPartsChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.services.filter((value) => {
    const tempDate = new Date(value.startDate)
    return startDate <= tempDate && tempDate <= endDate
  })
  return calcSumCostParts(filterDate)
  /* setDataChartParts(tempData) */
}
export const periodDataOtherChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.others.filter((value) => {
    const tempDate = new Date(value.dateBuy)
    return startDate <= tempDate && tempDate <= endDate
  })
  return filterDate.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0)
}
export const periodDataMilesChart = (searchDate: TypeSelect, dataState: StateCar): number => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.mileage.filter((value) => {
    const tempDate = new Date(value.dateMileage)
    return startDate <= tempDate && tempDate <= endDate
  })
  const selectMiles = filterDate.map(item => item.currentMileage)
  if (selectMiles.length === 0) return 0
  //* *****************************************************************************
  selectMiles.splice(0, 1) // temp string
  //* *****************************************************************************

  return maxMiles(selectMiles) - minMiles(selectMiles)
}
// ----------------------------------- function fuel/miles ------------------------------------------
export const fuelMiles = (fuel: number, miles: number): number => {
  return Number(((fuel / miles) * 100).toFixed(2))
}

// ----------------------------------- function fuel/miles ------------------------------------------
