import { StateCar, StateInfo, StateService } from '../../type'
import { tableService } from './TableService'

export const InfoTaskHTML = (stateCar: StateCar): string => {
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
            <p>Год выпуска: ${stateCar.info.currency}</p>
            <p>Пробег при покупке: ${stateCar.info.buyMileage}</p>
            <p>Текущий пробег: ${stateCar.info.year}</p>
        </div>
        <div>
            <p>Топливо: ${stateCar.info}</p>
            <p>Объем бака: ${stateCar.info}</p>
            <p>Двигатель: ${stateCar.info}</p>
            <p>Трансмиссия: ${stateCar.info}</p>
        </div>
    </div>
    <hr>
    <h3>Выполнено работ на сумму </h3>
    ${tableService(stateCar.services)}
    <hr>
    <h3>Куплено запчастей на сумму</h3>
    ${tableService(stateCar.services)}
    <hr>
    <h3>Другие затраты на сумму</h3>
    ${tableService(stateCar.services)}
    <hr>
    <h3>Заправлено топлива л на сумму</h3>
    ${tableService(stateCar.services)}
    
           
     
</body>

</html>

`
}
