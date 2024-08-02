import { cars } from '../../cars.json'
import { TFunction } from 'i18next'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

export interface ListCar {
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
  return tempList
}
export const listModel = (brand: string): ListCar[] => {
  let i = 0
  const tempList: ListCar[] = []
  if (brand !== '') {
    // @ts-expect-error hbhbh
    for (const key of cars[brand]) {
      tempList[i] = {
        label: key,
        value: key
      }
      i++
    }
    return tempList
  }
  return []
}
const listYear = (): ListCar[] => {
  const tempList: ListCar[] = []
  const endYear = new Date().getFullYear()
  let index = 0
  for (let i = 1990; i < endYear + 1; i++) {
    tempList[index] = {
      label: String(i),
      value: String(i)
    }
    index++
  }
  return tempList
}

export const brand = listBrand()
export const year = listYear()

export interface TypeDropDown {
  label: string
  value: string
}
export const itemsFuel = (t: TFunction<'translation', undefined>): TypeDropDown[] => [
  {
    label: t('itemsFuel.DIESEL'),
    value: t('itemsFuel.DIESEL')
  },
  {
    label: t('itemsFuel.PETROL'),
    value: t('itemsFuel.PETROL')
  },
  {
    label: t('itemsFuel.GAS'),
    value: t('itemsFuel.GAS')
  },
  {
    label: t('itemsFuel.ELECTRO'),
    value: t('itemsFuel.ELECTRO')
  },
  {
    label: t('itemsFuel.GAS') + '-' + t('itemsFuel.PETROL'),
    value: t('itemsFuel.GAS') + '-' + t('itemsFuel.PETROL')
  }
]
export const itemsBody = [
  {
    label: 'Hatch',
    value: 'Hatch'
  },
  {
    label: 'Sedan',
    value: 'Sedan'
  },
  {
    label: 'Cabriolet',
    value: 'Cabriolet'
  },
  {
    label: 'Coupe',
    value: 'Coupe'
  },
  {
    label: 'Universal',
    value: 'Universal'
  }
]
