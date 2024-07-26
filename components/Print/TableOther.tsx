import { StateCar, StateOther } from '../../type'
import { TypeReport } from './FormHTML'
import {
  monthDataOtherChart,
  periodDataOtherChart,
  yearDataOtherChart
} from '../StatScreenComponents/FunctionStatistic'
import { TFunction } from 'i18next'

export const tableOther = (state: StateCar, selectReport: TypeReport, t: TFunction<'translation', undefined>) => {
  let sumOther = 0
  let arrayOther: StateOther[] = []
  if (selectReport.date !== undefined) {
    switch (selectReport.date.type) {
      case 'year':
        // eslint-disable-next-line no-case-declarations
        const { sumCostOther, arraySelectYearOther } = yearDataOtherChart(Number(selectReport.date.valueYear), state)
        sumOther = sumCostOther
        arrayOther = arraySelectYearOther
        break
      case 'month':
        if (selectReport.date.valueMonth !== undefined) {
          const { sumCostOtherMonth, arraySelectMonthOther } = monthDataOtherChart((selectReport.date), state)
          sumOther = sumCostOtherMonth
          arrayOther = arraySelectMonthOther
        }
        break
      case 'period':
        if (selectReport.date.period?.valueStartMonth !== undefined) {
          const { sumCostOtherPeriod, arraySelectPeriodOther } = periodDataOtherChart((selectReport.date), state)
          sumOther = sumCostOtherPeriod
          arrayOther = arraySelectPeriodOther
        }
        break
      default:
        break
    }
  } else {
    sumOther = state.others.reduce((accumulator, currentValue) => accumulator + currentValue.amountCostOther, 0)
    arrayOther = state.others
  }
  const arrayTableOther = arrayOther.map((other, index) => `
            <tr>
                <td>${String(index + 1)}</td>
                <td>${other.nameOther}</td>
                <td>${new Date(other.dateBuy).toLocaleDateString()}</td>
                <td>${other.seller?.name}</td>
                <td>${other.amountCostOther}</td>
            </tr>
        `).join('')
  const bodyTableOther = `
    <h4 >${t('statScreen.OTHER_COSTS', { currency: state.info.currency })} ${sumOther}</h4>
    <table>
        <thead>
            <tr>
                <th>№</th>
                <th>${t('NAME')}</th>
                <th>${t('inputOther.DATE_BUY')}</th>
                <th>${t('SUPPLIER')}</th>
                <th>${t('TOTAL_COST')}</th>
            </tr>
        </thead>
        <tbody>
    ${arrayTableOther}
        </tbody>
    </table>
    <hr>
  `
  return bodyTableOther
}
