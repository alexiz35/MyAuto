import { StateCar, StatePart } from '../../type'
import { TypeReport } from './FormHTML'
import {
  calcSumCostPartsInService,
  calcSumCostPartsInStock,
  createArrayAllParts,
  monthDataPartsChart,
  periodDataPartsChart,
  yearDataPartsChart
} from '../StatScreenComponents/FunctionStatistic'
// eslint-disable-next-line import/named
import { TFunction } from 'i18next'

export const tablePart = (state: StateCar, selectReport: TypeReport, t: TFunction<'translation', undefined>) => {
  let sumPart = 0
  let arrayPart: StatePart[] = []
  if (selectReport.date !== undefined) {
    switch (selectReport.date.type) {
      case 'year':
        // eslint-disable-next-line no-case-declarations
        const { sumCostPart, arraySelectYearParts, arraySelectYearPartsInService } = yearDataPartsChart(Number(selectReport.date.valueYear), state)
        sumPart = sumCostPart
        arrayPart = createArrayAllParts(arraySelectYearPartsInService, arraySelectYearParts)
        break
      case 'month':
        if (selectReport.date.valueMonth !== undefined) {
          const { sumCostPartMonth, arraySelectMonthPartsInService, arraySelectMonthParts } = monthDataPartsChart((selectReport.date), state)
          sumPart = sumCostPartMonth
          arrayPart = createArrayAllParts(arraySelectMonthPartsInService, arraySelectMonthParts)
        }
        break
      case 'period':
        if (selectReport.date.period?.valueStartMonth !== undefined) {
          const { sumCostPartPeriod, arraySelectPeriodPartInService, arraySelectPeriodPart } = periodDataPartsChart((selectReport.date), state)
          sumPart = sumCostPartPeriod
          arrayPart = createArrayAllParts(arraySelectPeriodPartInService, arraySelectPeriodPart)
        }
        break
      default:
        break
    }
  } else {
    sumPart = calcSumCostPartsInStock(state.parts) + calcSumCostPartsInService(state.services)
    arrayPart = createArrayAllParts(state.services, state.parts)
  }
  const arrayTablePart = arrayPart.map((part, index) => `
            <tr>
                <td>${String(index + 1)}</td>
                <td>${part.namePart}</td>
                <td>${part.numberPart}</td>
                <td>${new Date(part.dateBuy).toLocaleDateString()}</td>
                <td>${part.seller?.name}</td>
                <td>${part.costPart}</td>
                <td>${part.quantityPart}</td>
                <td>${part.amountCostPart}</td>
            </tr>
        `).join('')
  const bodyTablePart = `
    <h4 >${t('statScreen.PARTS_COSTS', { currency: state.info.currency })} ${sumPart}</h4>
    <table>
        <thead>
            <tr>
                <th>№</th>
                <th>${t('NAME')}</th>
                <th>${t('inputPart.NUMBER')}</th>
                <th>${t('inputPart.DATE')}</th>
                <th>${t('SUPPLIER')}</th>
                <th>${t('COST')}</th>
                <th>${t('AMOUNT')}</th>
                <th>${t('TOTAL_COST')}</th>
            </tr>
        </thead>
        <tbody>
    ${arrayTablePart}
        </tbody>
    </table>
    <hr>
  `
  return bodyTablePart
}
