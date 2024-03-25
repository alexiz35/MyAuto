export interface TypePickedDate {
  type: 'year' | 'month' | 'period' | string
  valueYear: string
  valueMonth: number
  valueMonthYear: string
  period: {
    valueStartYear: string
    valueStartMonth: number
    valueEndYear: string
    valueEndMonth: number
  }
}
export const NAME_MONTH = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
