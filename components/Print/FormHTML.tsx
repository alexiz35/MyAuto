import { StateCar, StateInfo, StateService } from '../../type'
import { tableService } from './TableService'
import { TypePickedDate } from '../StatScreenComponents/TypeStat'

export interface TypeReport {
  all: boolean
  service: boolean
  part: boolean
  other: boolean
  fuel: boolean
  date: undefined | TypePickedDate
}
interface PropsHTML {
  stateCar: StateCar
  selectReport: TypeReport
}
export const FormHTML = ({ stateCar, selectReport }: PropsHTML): string => {
  console.log('HTML', selectReport, stateCar.info.currency)
  return `
    <!DOCTYPE html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8" />
    <title></title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style type="text/css">
        h2,h3 {
            text-align: center;
        }
        .info-columns {
           display: flex;
           flex-direction: row;
           justify-content: space-around; 
        }

        TABLE {
            width: 100%;
            /* Ширина таблицы */
            border-bottom: 2px solid maroon;
            /* Линия внизу таблицы */
            border-collapse: collapse;
            background: #fffacd;
            /* Цвет фона таблицы */
        }

        TH {
            background: maroon;
            /* Цвет фона заголовка */
            color: white;
            /* Цвет текста */
            text-align: left;
            /* Выравнивание по левому краю */
        }

        TD,
        TH {
            padding: 3px;
            /* Поля вокруг текста */
        }
    </style>
</head>

<body>
    <!-- Add your site or application content here -->
    <h5>Отчет DevizCar по автомобилю ${stateCar.info.nameCar}</h5>
    <h2>${stateCar.info.brand} ${stateCar.info.model}</h2>
    <h3>VIN: ${stateCar.info.vin}</h3> 
    <div class="info-columns" >
        <div>
            <p>Кузов: ${stateCar.info.body}</p>
            <p>Год выпуска: ${stateCar.info.year}</p>
            <p>Пробег при покупке: ${stateCar.info.buyMileage}</p>
            <p>Текущий пробег: ${stateCar.currentMiles.currentMileage}</p>
        </div>
        <div>
            <p>Топливо: ${stateCar.info.fuel}</p>
            <p>Объем бака: ${stateCar.info.fuelTank}</p>
            <p>Двигатель: ${stateCar.info.engine}</p>
            <p>Трансмиссия: ${stateCar.info.gear}</p>
        </div>
    </div>
    <hr>
    <h3>Выполнено работ на сумму </h3>
    ${selectReport.service ? tableService(stateCar.services) : ''}
    <hr>
    <h3>Куплено запчастей на сумму</h3>
    ${selectReport.part ? tableService(stateCar.services) : ''}
    <hr>
    <h3>Другие затраты на сумму</h3>
    ${selectReport.other ? tableService(stateCar.services) : ''}
    <hr>
    <h3>Заправлено топлива л на сумму</h3>
    ${selectReport.fuel ? tableService(stateCar.services) : ''}
    
           
     
</body>

</html>

`
}
