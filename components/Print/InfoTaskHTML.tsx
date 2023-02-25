import { StateTask } from '../../type'

export const InfoTaskHTML = (task: StateTask): string => `
    <!doctype html>
    <html class="no-js" lang="">
    
    <head>
      <meta charset="utf-8">
      <title></title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <style type="text/css">
        TABLE {
          width: 300px; /* Ширина таблицы */
          border-bottom: 2px solid maroon; /* Линия внизу таблицы */
          background: #fffacd; /* Цвет фона таблицы */
        }
        TH {
          background: maroon; /* Цвет фона заголовка */
          color: white; /* Цвет текста */
          text-align: left; /* Выравнивание по левому краю */
        }
        TD, TH {
          padding: 3px; /* Поля вокруг текста */
        }
      </style>
    </head>
    
    <body>
    
      <!-- Add your site or application content here -->
      <p style="text-align: center">Замена масла</p>
      <table width="100%" border=1  border-collapse="collapse" >
        <thead>
          <tr>
            <th>№</th>
            <th>Дата выполнения</th>
            <th>Пробег</th>
            <th>Тип работ</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>${task.id}</td>
          <td>${task.startDate}</td>
          <td>${task.startKm}</td>
          <td>${task.title}</td>
        </tr>
        </tbody>
      </table>
    
    </body>
    
    </html>
`
