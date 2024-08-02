import { StateCar, StateService } from '../../type'
import { TypeReport } from './FormHTML'
import {
  calcSumCostService,
  monthDataServicesChart,
  periodDataServicesChart,
  yearDataServiceChart
} from '../StatScreenComponents/FunctionStatistic'
// eslint-disable-next-line import/named
import { TFunction } from 'i18next'

export const tableService = (state: StateCar, selectReport: TypeReport, t: TFunction<'translation', undefined>) => {
  let sumService = 0
  let arrayService: StateService[] = []
  if (selectReport.date !== undefined) {
    switch (selectReport.date.type) {
      case 'year':
        // eslint-disable-next-line no-case-declarations
        const { sumCostService, arraySelectYearService } = yearDataServiceChart(Number(selectReport.date.valueYear), state)
        sumService = sumCostService
        arrayService = arraySelectYearService
        break
      case 'month':
        if (selectReport.date.valueMonth !== undefined) {
          const { sumCostServiceMonth, arraySelectMonthService } = monthDataServicesChart((selectReport.date), state)
          sumService = sumCostServiceMonth
          arrayService = arraySelectMonthService
        }
        break
      case 'period':
        if (selectReport.date.period?.valueStartMonth !== undefined) {
          const { sumCostServicePeriod, arraySelectPeriodService } = periodDataServicesChart((selectReport.date), state)
          sumService = sumCostServicePeriod
          arrayService = arraySelectPeriodService
        }
        break
      default:
        break
    }
  } else {
    sumService = calcSumCostService(state.services)
    arrayService = state.services
  }
  const arrayTableService = arrayService.map((service, index) => `
            <tr>
                <td>${String(index + 1)}</td>
                <td>${service.typeService !== undefined ? service.typeService.nameService : service.title}</td>
                <td>${new Date(service.startDate).toLocaleDateString()}</td>
                <td>${service.startKm}</td>
                <td>${service.sumCostService}</td>
                <td>${service.sumCostParts}</td>
            </tr>
        `).join('')
  const bodyTableService = `
    <h4 >${t('statScreen.SERVICE_COSTS', { currency: state.info.currency })} ${sumService}</h4>
    <table>
        <thead>
            <tr>
                <th>№</th>
                <th>${t('NAME')}</th>
                <th>${t('inputService.DATE_REPLACE')}</th>
                <th>${t('fuelScreen.MILEAGE_FUEL')}</th>
                <th>${t('inputService.COST_SERVICE')}</th>
                <th>${t('inputService.COST_PARTS')}</th>
            </tr>
        </thead>
        <tbody>
    ${arrayTableService}
        </tbody>
    </table>
    <hr>
  `
  return bodyTableService
}
