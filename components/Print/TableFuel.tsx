import { StateCar, StateFuel } from '../../type'
import { TypeReport } from './FormHTML'
import {
  allPeriodFuel,
  monthDataFuelChart,
  periodDataFuelChart,
  yearDataFuelChart
} from '../StatScreenComponents/FunctionStatistic'
// eslint-disable-next-line import/named
import { TFunction } from 'i18next'

export const tableFuel = (state: StateCar, selectReport: TypeReport, t: TFunction<'translation', undefined>) => {
  let sumFuel = 0
  let arrayFuel: StateFuel[] = []
  let fuelVolume = 0
  if (selectReport.date !== undefined) {
    switch (selectReport.date.type) {
      case 'year':
        // eslint-disable-next-line no-case-declarations
        const { amountFuel, volumeFuel, arraySelectYearFuel } = yearDataFuelChart(Number(selectReport.date.valueYear), state)
        sumFuel = amountFuel
        fuelVolume = volumeFuel
        arrayFuel = arraySelectYearFuel
        break
      case 'month':
        if (selectReport.date.valueMonth !== undefined) {
          const { amountFuel, volumeFuel, arraySelectMonthFuel } = monthDataFuelChart((selectReport.date), state)
          sumFuel = amountFuel
          fuelVolume = volumeFuel
          arrayFuel = arraySelectMonthFuel
        }
        break
      case 'period':
        if (selectReport.date.period?.valueStartMonth !== undefined) {
          const { amountFuel, volumeFuel, arraySelectPeriodFuel } = periodDataFuelChart((selectReport.date), state)
          sumFuel = amountFuel
          fuelVolume = volumeFuel
          arrayFuel = arraySelectPeriodFuel
        }
        break
      default:
        break
    }
  } else {
    const { amountFuel, volumeFuel } = allPeriodFuel(state)
    sumFuel = amountFuel
    fuelVolume = volumeFuel
    arrayFuel = state.fuel
  }

  const arrayTableFuel = arrayFuel.map((fuel, index) => `
            <tr>
                <td>${String(index + 1)}</td>
                <td>${new Date(fuel.dateFuel).toLocaleDateString()}</td>
                <td>${fuel.mileageFuel}</td>
                <td>${fuel.StationFuel}</td>
                <td>${fuel.volumeFuel}</td>
                <td>${fuel.CostFuel}</td>
                <td>${fuel.AmountFuel}</td>
            </tr>
        `).join('')
  const bodyTableFuel = `
    <h4 >${t('statScreen.FUEL_BUY', { fuel: fuelVolume })}  ${t('statScreen.FUEL_COST',
            { fuel_cost: sumFuel, currency: state.info.currency })} 
    </h4>
    <table>
        <thead>
            <tr>
                <th>№</th>
                <th>${t('fuelScreen.DATE_FUEL')}</th>
                <th>${t('fuelScreen.MILEAGE_FUEL')}</th>
                <th>${t('fuelScreen.FUEL_STATION')}</th>
                <th>${t('AMOUNT')}</th>
                <th>${t('COST')}</th>
                <th>${t('TOTAL_COST')}</th>
            </tr>
        </thead>
        <tbody>
    ${arrayTableFuel}
        </tbody>
    </table>
    <hr>
  `
  return bodyTableFuel
}
