import { CurrentMiles, ModalPart, StateCar, StateFuel, StatePart, StateService } from '../../type'
import { TypePickedDate } from './TypeStat'
import { TypeReport } from '../Print/FormHTML'

export const ALL_BAR = '#23C50AFF'
export const FUEL_BAR = '#177AD5'
export const PART_BAR = '#79D2DE'
export const OTHER_BAR = '#ED6665'

export const initialBarChart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export const minMiles = (arr: number[]): number => Math.min(...arr)
export const maxMiles = (arr: number[]): number => Math.max(...arr)

export const calcSumCostPartsInService = (targetArray: StateService[]): number => {
  return targetArray.reduce((accumulator, currentValue) => {
    if (currentValue.sumCostParts !== undefined) {
      return accumulator + currentValue.sumCostParts
    }
    return accumulator
  }, 0)
}

export const calcSumCostPartsInStock = (targetArray: StatePart[]): number => {
  return targetArray.reduce((accumulator, currentValue) => {
    if (currentValue.amountCostPart !== undefined && !currentValue.isInstall) {
      return accumulator + currentValue.amountCostPart
    }
    return accumulator
  }, 0)
}
export const calcSumCostService = (targetArray: StateService[]) => {
  return targetArray.reduce((accumulator, currentValue) => {
    if (currentValue.sumCostService !== undefined) {
      return accumulator + currentValue.sumCostService
    }
    return accumulator
  }, 0)
}

export const createArrayAllParts = (arraySelectPartsInService: StateService[], arraySelectParts: StatePart[]): StatePart[] => {
  /* const { arraySelectYearParts, arraySelectYearPartsInService } = yearDataPartsChart(Number(selectReport.date.valueYear), state)
 */
  const tempArrayPartsinService: ModalPart[] = arraySelectPartsInService.map(item => {
    if (item.addition?.parts !== undefined) {
      return item.addition.parts
      // eslint-disable-next-line array-callback-return
    } else return []
  }
  ).flat()
  const createdArrayPartsInService: StatePart[] = tempArrayPartsinService.map(item => {
    return {
      id: item.id,
      namePart: item.namePart,
      numberPart: item.numberPart,
      seller: item.seller,
      costPart: item.costPart,
      quantityPart: item.quantityPart,
      amountCostPart: Number(item.costPart * item.quantityPart),
      dateBuy: item.dateBuy !== undefined ? item.dateBuy : new Date(),
      isInstall: true
    }
  })
  const arrayFilteredIsInstallParts: StatePart[] = arraySelectParts.filter(item => !item.isInstall)
  return [...arrayFilteredIsInstallParts, ...createdArrayPartsInService]
}
// ************************************ function calculate all period ******************************
export const allPeriodFuel = (dataState: StateCar): { amountFuel: number, volumeFuel: number } => {
  /* const arraySelectYearFuel = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)
 */
  const amountFuel = dataState.fuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = dataState.fuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)

  return {
    amountFuel,
    volumeFuel
  }
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
  const selectYearService = dataState.services.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
  const selectYearPart = dataState.parts.filter((value) => new Date(value.dateBuy).getFullYear() === searchYear)

  const tempData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  selectYearService.forEach((item) => {
    if (item.sumCostParts === undefined)item.sumCostParts = 0
    if (item.sumCostService === undefined)item.sumCostService = 0
    tempData[new Date(item.startDate).getMonth()] += (item.sumCostParts + item.sumCostService)
  })
  selectYearPart.forEach((item) => {
    if (!item.isInstall) {
      if (item.amountCostPart === undefined) item.amountCostPart = 0
      tempData[new Date(item.dateBuy).getMonth()] += item.amountCostPart
    }
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
export const yearDataFuelChart = (searchYear = new Date().getFullYear(), dataState: StateCar): { amountFuel: number, volumeFuel: number, arraySelectYearFuel: StateFuel[] } => {
  const arraySelectYearFuel = dataState.fuel.filter((value) => new Date(value.dateFuel).getFullYear() === searchYear)

  const amountFuel = arraySelectYearFuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = arraySelectYearFuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)

  return { amountFuel, volumeFuel, arraySelectYearFuel }
  /* setDataChartFuel(tempData) */
}

export const yearDataPartsChart = (searchYear = new Date().getFullYear(), dataState: StateCar) => {
  const arraySelectYearPartsInService = dataState.services.filter((value) => new Date(value.startDate).getFullYear() === searchYear)
  const arraySelectYearParts = dataState.parts.filter((value) => new Date(value.dateBuy).getFullYear() === searchYear)
  const sumCostPart = calcSumCostPartsInService(arraySelectYearPartsInService) + calcSumCostPartsInStock(arraySelectYearParts)
  return /* calcSumCostPartsInService(selectYearService) + calcSumCostPartsInStock(selectYearPart) */{
    sumCostPart,
    arraySelectYearParts,
    arraySelectYearPartsInService
  }
}
export const yearDataServiceChart = (searchYear = new Date().getFullYear(), dataState: StateCar) => {
  const arraySelectYearService = dataState.services.filter((value) =>
    new Date(value.startDate).getFullYear() === searchYear)
  const sumCostService = calcSumCostService(arraySelectYearService)
  return /* calcSumCostService(selectYearService) */ {
    arraySelectYearService,
    sumCostService
  }
}
export const yearDataOtherChart = (searchYear = new Date().getFullYear(), dataState: StateCar) => {
  const arraySelectYearOther = dataState.others.filter((value) => new Date(value.dateBuy).getFullYear() === searchYear)
  const sumCostOther = arraySelectYearOther.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amountCostOther), 0)
  return /* selectYear.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amountCostOther), 0) */{
    arraySelectYearOther,
    sumCostOther
  }
}
// ----------------------------------- function select Month Date ----------------------------------
export const monthDataFuelChart = (searchDate: TypePickedDate, dataState: StateCar): { amountFuel: number, volumeFuel: number, arraySelectMonthFuel: StateFuel[] } => {
  const arraySelectMonthFuel = dataState.fuel.filter((value) =>
    new Date(value.dateFuel).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateFuel).getMonth() === searchDate.valueMonth
  )
  const amountFuel = arraySelectMonthFuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = arraySelectMonthFuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)
  return { amountFuel, volumeFuel, arraySelectMonthFuel }
}
export const monthDataPartsChart = (searchDate: TypePickedDate, dataState: StateCar) => {
  const arraySelectMonthPartsInService = dataState.services.filter((value) =>
    new Date(value.startDate).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.startDate).getMonth() === searchDate.valueMonth
  )
  const arraySelectMonthParts = dataState.parts.filter((value) =>
    new Date(value.dateBuy).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateBuy).getMonth() === searchDate.valueMonth
  )
  const sumCostPartMonth = calcSumCostPartsInService(arraySelectMonthPartsInService) + calcSumCostPartsInStock(arraySelectMonthParts)
  return /* calcSumCostPartsInService(arrayPartsInServiceMonth) + calcSumCostPartsInStock(arrayPartsMonth) */{
    sumCostPartMonth,
    arraySelectMonthParts,
    arraySelectMonthPartsInService
  }
  /* setDataChartParts(temp) */
}
export const monthDataServicesChart = (searchDate: TypePickedDate, dataState: StateCar) => {
  const arraySelectMonthService = dataState.services.filter((value) =>
    new Date(value.startDate).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.startDate).getMonth() === searchDate.valueMonth
  )
  const sumCostServiceMonth = calcSumCostService(arraySelectMonthService)
  return /* calcSumCostService(arraySelectYearService) */{
    arraySelectMonthService,
    sumCostServiceMonth
  }
  /* setDataChartParts(temp) */
}
export const monthDataOtherChart = (searchDate: TypePickedDate, dataState: StateCar) => {
  const arraySelectMonthOther = dataState.others.filter((value) =>
    new Date(value.dateBuy).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
    new Date(value.dateBuy).getMonth() === searchDate.valueMonth
  )
  const sumCostOtherMonth = arraySelectMonthOther.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0)
  return /* arraySelectMonthOther.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0) */{
    arraySelectMonthOther,
    sumCostOtherMonth
  }
}

// ----------------------------------- function period Date -----------------------------------------
const createPeriodDate = (searchDate: TypePickedDate): { startDate: Date, endDate: Date } => {
  const startDate = new Date(Number(searchDate.period?.valueStartYear), Number(searchDate.period?.valueStartMonth))
  const endDate = new Date(Number(searchDate.period?.valueEndYear), Number(searchDate.period?.valueEndMonth))
  return {
    startDate,
    endDate
  }
}
export const periodDataFuelChart = (searchDate: TypePickedDate, dataState: StateCar): { amountFuel: number, volumeFuel: number, arraySelectPeriodFuel: StateFuel[] } => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const arraySelectPeriodFuel = dataState.fuel.filter((value) => {
    const tempDate = new Date(value.dateFuel)
    return startDate <= tempDate && tempDate <= endDate
  })
  const amountFuel = arraySelectPeriodFuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.AmountFuel), 0)
  const volumeFuel = arraySelectPeriodFuel.reduce((accumulator, currentValue) => accumulator + Number(currentValue.volumeFuel), 0)
  return { amountFuel, volumeFuel, arraySelectPeriodFuel }
  /* setDataChartFuel(tempData) */
}
export const periodDataPartsChart = (searchDate: TypePickedDate, dataState: StateCar) => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const arraySelectPeriodPartInService = dataState.services.filter((value) => {
    const tempDate = new Date(value.startDate)
    return startDate <= tempDate && tempDate <= endDate
  })
  const arraySelectPeriodPart = dataState.parts.filter((value) => {
    const tempDate = new Date(value.dateBuy)
    return startDate <= tempDate && tempDate <= endDate
  })
  const sumCostPartPeriod = calcSumCostPartsInService(arraySelectPeriodPartInService) + calcSumCostPartsInStock(arraySelectPeriodPart)
  return /* calcSumCostPartsInService(arraySelectPartInServicePeriod) + calcSumCostPartsInStock(arraySelectPartPeriod) */{
    sumCostPartPeriod,
    arraySelectPeriodPart,
    arraySelectPeriodPartInService
  }
  /* setDataChartParts(tempData) */
}
export const periodDataServicesChart = (searchDate: TypePickedDate, dataState: StateCar) => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const arraySelectPeriodService = dataState.services.filter((value) => {
    const tempDate = new Date(value.startDate)
    return startDate <= tempDate && tempDate <= endDate
  })
  const sumCostServicePeriod = calcSumCostService(arraySelectPeriodService)
  return /* calcSumCostService(arraySelectPeriodService) */{
    sumCostServicePeriod,
    arraySelectPeriodService
  }
  /* setDataChartParts(tempData) */
}
export const periodDataOtherChart = (searchDate: TypePickedDate, dataState: StateCar) => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const arraySelectPeriodOther = dataState.others.filter((value) => {
    const tempDate = new Date(value.dateBuy)
    return startDate <= tempDate && tempDate <= endDate
  })
  const sumCostOtherPeriod = arraySelectPeriodOther.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0)
  return /* arraySelectPeriodOther.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0) */{
    sumCostOtherPeriod,
    arraySelectPeriodOther
  }
}

// ---------------------------------- Mileage ------------------------------------------------------

/* export const yearDataMilesChart = (searchYear = new Date().getFullYear(), dataState: StateCar): number => {
  const selectYear = dataState.mileage.filter((value) => new Date(value.dateMileage).getFullYear() === searchYear)
  const selectMiles = selectYear.map(item => item.currentMileage)

  if (selectMiles.length === 0) return 0
  const minMiles = (arr: number[]): number => Math.min(...arr)
  const maxMiles = (arr: number[]): number => Math.max(...arr)
  return maxMiles(selectMiles) - minMiles(selectMiles)
} */

export const DataMilesChart = (searchDate: TypePickedDate, dataState: StateCar): number => {
  const calcMileage = (selectDate: CurrentMiles[]): number => {
    const selectMiles = selectDate.map(item => item.currentMileage)
    if (selectMiles.length === 0) return 0
    return maxMiles(selectMiles) - minMiles(selectMiles)
  }
  let selectDate: CurrentMiles[]
  switch (searchDate.type) {
    case 'month':
      selectDate = dataState.mileage.filter((value) =>
        new Date(value.dateMileage).getFullYear() === new Date(searchDate.valueYear).getFullYear() &&
        new Date(value.dateMileage).getMonth() === searchDate.valueMonth)
      break
    case 'year':
      selectDate = dataState.mileage.filter((value) =>
        new Date(value.dateMileage).getFullYear() === Number(searchDate.valueYear)
      )
      break
    case 'period':
      // eslint-disable-next-line no-case-declarations
      const { startDate, endDate } = createPeriodDate(searchDate)
      selectDate = dataState.mileage.filter((value) => {
        const tempDate = new Date(value.dateMileage)
        return startDate <= tempDate && tempDate <= endDate
      })
      break
    default: return 0
  }
  return calcMileage(selectDate)
}
/* export const periodDataMilesChart = (searchDate: TypePickedDate, dataState: StateCar): number => {
  const { startDate, endDate } = createPeriodDate(searchDate)
  const filterDate = dataState.mileage.filter((value) => {
    const tempDate = new Date(value.dateMileage)
    return startDate <= tempDate && tempDate <= endDate
  })
  const selectMiles = filterDate.map(item => item.currentMileage)

  if (selectMiles.length === 0) return 0

  return maxMiles(selectMiles) - minMiles(selectMiles)
} */
// ----------------------------------- function fuel/miles ------------------------------------------
export const averageFuel = (selectDate: TypePickedDate, dataState: StateCar): number => {
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
  if (filteredArrayByDate.length < 2) return 0
  // array is sorted by ascending order
  filteredArrayByDate.sort((a, b) => a.mileageFuel - b.mileageFuel)
  let mileage: number
  if (filteredArrayByDate[filteredArrayByDate.length - 1].mileageFuel === 0 || filteredArrayByDate[0].mileageFuel === 0) {
    mileage = DataMilesChart(selectDate, dataState)
  } else {
    mileage = filteredArrayByDate[filteredArrayByDate.length - 1].mileageFuel - filteredArrayByDate[0].mileageFuel
  }
  if (mileage === 0) return 0
  // mileage - difference between last and first mileageFuel

  const remainderStart = filteredArrayByDate[0].restFuel
  const remainderEnd = filteredArrayByDate[filteredArrayByDate.length - 1].restFuel
  // amount of fuel - sum fuel without last refueling
  const baseAmountFuel = filteredArrayByDate.reduce((accumulator, currentValue, currentIndex) =>
    (currentIndex === (filteredArrayByDate.length - 1))
      ? accumulator
      : (accumulator + Number(currentValue.volumeFuel))
  , 0)
  const amountFuel = baseAmountFuel + remainderStart - remainderEnd

  return Number(((amountFuel / mileage) * 100).toFixed(2))
  /* const mileage = selectYear.reduce((accumulator, currentValue) => accumulator + Number(currentValue.mileageFuel), 0) */
}

// ----------------------------------- function fuel/miles ------------------------------------------
