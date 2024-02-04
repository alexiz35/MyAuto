import { cars } from '../../cars.json'

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
export const listModel = (brand:string): ListCar[] => {
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
  let index = 0
  for (let i = 1990; i < 2023; i++) {
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

export const itemsFuel = [
  {
    label: 'Дизель',
    value: 'Дизель'
  },
  {
    label: 'Бензин',
    value: 'Бензин'
  },
  {
    label: 'Газ',
    value: 'Газ'
  },
  {
    label: 'Электро',
    value: 'Электро'
  },
  {
    label: 'Газ-бензин',
    value: 'Газ-бензин'
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
