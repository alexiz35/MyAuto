import { StateService } from '../../type'

export const tableService = (service: StateService[]) => {
  const arrayTableService = service.map((service, index) => `
            <tr>
                <td>${String(index)}</td>
                <td>${service.typeService.nameService}</td>
                <td>${new Date(service.startDate).toLocaleDateString()}</td>
                <td>${service.startKm}</td>
            </tr>
        `)
  const bodyTableService = `
    <table>
        <thead>
            <tr>
                <th>№</th>
                <th>Дата выполнения</th>
                <th>Пробег</th>
                <th>Тип работ</th>
            </tr>
        </thead>
        <tbody>
    ${arrayTableService}
        </tbody>
    </table>
  `
  return bodyTableService
}
