import { StateCar } from '../../type'
import { tableService } from './TableService'
import { TypePickedDate } from '../StatScreenComponents/TypeStat'
import { tableOther } from './TableOther'
import { tableFuel } from './TableFuel'
import { tablePart } from './TablePart'
import { TFunction } from 'i18next'

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
  t: TFunction<'translation', undefined>
}
export const FormHTML = ({ stateCar, selectReport, t }: PropsHTML): string => {
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
        h4 {
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
        },
        .title-table {
            font-weight: bold;
            margin-bottom: 50px;
        }
    </style>
</head>

<body>
    <!-- Add your site or application content here -->
    <h5>${t('pdfCard.TITLE_REPORT')} ${stateCar.info.nameCar}</h5>
    <h2>${stateCar.info.brand} ${stateCar.info.model}</h2>
    <h3>${t('carInfo.VIN')}: ${stateCar.info.vin}</h3> 
    <div class="info-columns" >
        <div>
            <p>${t('carInfo.BODY')}: ${stateCar.info.body}</p>
            <p>${t('carInfo.Year')}: ${stateCar.info.year}</p>
            <p>${t('carInfo.MILEAGE_BUY')}: ${stateCar.info.buyMileage}</p>
            <p>${t('homeScreen.mainCard.CURRENT_MILEAGE')}: ${stateCar.currentMiles.currentMileage}</p>
        </div>
        <div>
            <p>${t('carInfo.FUEL')}: ${stateCar.info.fuel}</p>
            <p>${t('FUEL_TANK')}: ${stateCar.info.fuelTank}</p>
            <p>${t('carInfo.ENGINE')}: ${stateCar.info.engine}</p> 
            <p>${t('carInfo.GEAR')}: ${stateCar.info.gear}</p>
        </div>
    </div>
    <hr>
    ${selectReport.service ? tableService(stateCar, selectReport, t) : ''}
    ${selectReport.part ? tablePart(stateCar, selectReport, t) : ''}
    ${selectReport.other ? tableOther(stateCar, selectReport, t) : ''}
    ${selectReport.fuel ? tableFuel(stateCar, selectReport, t) : ''}
</body>

</html>

`
}
