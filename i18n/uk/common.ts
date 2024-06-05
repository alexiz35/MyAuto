export default {
  CURRENCY: '₴',
  PCS: 'шт',
  UNTIL: 'До',
  NOT_TRACKED: 'Не відстежується',
  LEFT: 'Залишилось',
  MONTH: 'Місяць',
  MONTHS: 'Міс.',
  DAYS: 'Днів',
  YEAR: 'Рік',
  CUSTOM: 'Свій',
  KM: 'км',
  L: 'л',
  CURRENCY_L: '₴/л',
  CONSUMPTION: 'л/100 км',
  FUEL_TANK: 'Об\'єм бака',
  PART: 'Деталі',
  SERVICE: 'Сервіс',
  OTHER: 'Інше',
  NAME: 'Назва',
  NUMBER: 'Артикул',
  COST: 'Ціна',
  AMOUNT: 'Кількість',
  TOTAL_COST: 'Вартість',
  SUPPLIER: 'Постачальник',
  PHONE: 'Телефон',
  LINK: 'Посилання',
  DEV_FUNCTION: 'Функція у розробці',
  button: {
    CANCEL: 'Відміна',
    OK: 'Ok',
    CREATE: 'Створити'
  },
  navi: {
    HOME: 'Головна',
    BUY: 'Покупки',
    TASKS: 'Завдання',
    STATISTIC: 'Статистика',
    CAR_INFO_TITLE: 'Інформація по авто',
    SELLER_TITLE: 'Список постачальників',
    MILEAGE_TITLE: 'Список точок пробігу',
    FUEL_TITLE: 'Заправки',
    SETTING_TITLE: 'Налаштування',
    PREMIUM_TITLE: 'Преміум доступ'
  },
  setting: {
    CHANGE_THEME: 'Зміна теми',
    SET_LANG: 'Мова',
    TITLE_LANG: 'Мова',
    LANG: 'Українська',
    ADD_CAR: 'Добавити авто',
    ADD_CAR_TITLE: 'Мої машини',
    alertSellerCard: {
      TITLE: 'Ви впевнені?',
      MESSAGE: 'Список продавців буде видалено!'
    },
    alertCarsCard: {
      TITLE: 'Видалити машину?',
      MESSAGE: 'Всі дані по цій машині будуть видалені!'
    },
    alertMileageCard: {
      TITLE: 'Ви впевнені?',
      MESSAGE: 'Всі точки пробігу будуть видалені!'
    },
    alertReset: {
      TITLE: 'Ви впевнені?',
      MESSAGE: 'Ця операція повністю перезавантажить програму. Усі дані та налаштування будуть видалені.'
    },
    TITLE_CONTROL_CARD: 'Контроль пробігу',
    NOTIFICATION_START: 'Нагадування при старті програми',
    NOTIFICATION_PERIOD: 'Періодичне нагадування у фоні',
    SYNCHRON_MILEAGE: 'Синхронізація пробігу з авто',
    TITLE_GOOGLE_CARD: 'Використовувати Google Drive для бекапу',
    LOGIN_GOOGLE: 'Увійти з Google',
    IMPORT_DATA: 'Імпорт даних',
    EXPORT_DATA: 'Експорт даних',
    TITLE_BACKUP: 'Backup даних',
    SAVE_DATA: 'Зберегти дані',
    RECOVERY_DATA: 'Відновити дані з Backup',
    ALERT_BACKUP_SUCCES: 'Backup завершено успішно',
    ALERT_BACKUP_ERROR: 'Помилка створення Backup',
    ALERT_IMPORT_ERROR: 'Помилка завантаження Backup',
    ALERT_IMPORT_SUCCES: 'Backup завантажений успішно',
    ALERT_ERROR_AUTH: 'Потрібна авторизація'
  },
  homeScreen: {
    mainCard: {
      CURRENT_MILEAGE: 'Поточний пробіг',
      UPDATE_MILEAGE: 'Оновіть пробіг',
      modalMileage: {
        TITLE: 'Оновіть пробіг',
        INPUT_MILEAGE: 'Введіть пробіг',
        ERROR_INPUT: 'Пробіг менше поточного!'
      },
      modalTire: {
        TITLE: 'Дані шин',
        INPUT_SIZE: 'Розмір шин',
        INPUT_BRAND: 'Виробник шин',
        INPUT_YEAR: 'Рік виготовлення шин',
        HELPER_INFO: 'Розмір шин у форматі Rxx/xxx/xx',
        HELPER_ERROR: 'Неправильный формат розміра шин (Rxx/xxx/xx)'
      }
    },
    TITLE_TASK: 'Найближчі завдання'
  },
  carInfo: {
    BRAND: 'Бренд',
    MODEL: 'Модель',
    FUEL: 'Пальне',
    BODY: 'Кузов',
    Year: 'Рік',
    ENGINE: 'Двигун',
    GEAR: 'Трансмісія',
    VIN: 'VIN код',
    DATE_BUY: 'Дата купівлі',
    MILEAGE_BUY: 'Пробіг при покупці',
    BUTTON_TO: 'Регламент ТО',
    BUTTON_CURRENCY: 'Валюта - {{currency}}',
    RESET_TO: 'Скидання',
    modalNameCar: {
      TITLE_NEW: 'Введіть унікальну назву машини для початку',
      TITLE_EDIT: 'Змінити назву авто',
      TITLE_ADD_NEW: 'Введіть унікальну назву авто',
      INPUT: 'Назва авто',
      ERROR_NUL: 'Введіть назву авто',
      ERROR_UNIQ: 'Така назва вже існує'
    },
    regMaintenance: {
      TITLE_ADD: 'Додайте новий регламент',
      TITLE_EDIT: 'Змінити регламент',
      INPUT_SERVICE: 'Сервіс',
      INPUT_MILES: '',
      INPUT_MONTH: '',
      BUTTON_ADD: 'Додати новий регламент',
      BUTTON_SAVE: 'Зберегти зміни'
    },
    alert: {
      TITLE: 'Залишити сторінку?',
      MESSAGE: 'Всі введені дані не будуть збережені'
    }
  },
  menu: {
    EDIT: 'Змінити',
    DELETE: 'Видалити'
  },
  fuelScreen: {
    TITLE_SUM_FUEL: 'Заправлено пального цього місяця: ',
    TITLE_ACCORDION_ADD: 'Додайте заправку',
    TITLE_ACCORDION_EDIT: 'Редагуйте заправку',
    DATE_FUEL: 'Дата заправки',
    MILEAGE_FUEL: 'Пробіг',
    VOLUME_FUEL: 'Об\'єм пального',
    COST_FUEL: 'Ціна пального',
    TOTAL_COST: 'Вартість пального',
    FUEL_STATION: 'Назва заправки',
    TITLE_OFF_CONSUMPTION: 'Відключити більш точний розрахунок середньої витрати пального?',
    OFF_CONSUMPTION: 'При відключенні цієї функції ви зможете вносити заправки без обов\'язкового внесення залишку ' +
      'пального у баку та пробігу під час заправці. Це спростить ведення обліку заправок, але дуже зменшить точність розрахунку ' +
      'середньої витрати пального.\n \n Відключити функцію?',
    TITLE_CHECKBOX_CONSUMPTION: 'Вести точний розрахунок витрати пального?',
    INPUT_MILEAGE: 'Введіть пробіг',
    REST_FUEL: 'Залишок пального',
    alertHelp: {
      TITLE: 'Розрахунок середньої витрати пального.',
      MESSAGE: 'У програмі можливі кілька способів розрахунку середньої витрати пального.\n' +
        '1.\tЗа замовчуванням, приблизний. У цьому випадку програма використовує для розрахунку пройденої відстані дані пробігу автомобіля, які ви періодично вводите і суму заправленого пального за період. ' +
        'Такий розрахунок не враховує залишки пального у  баку під час заправці та пройдена відстань по пробігу може не співпадати з точками заправки. Тому, якщо вам важливо вести облік заправок та їх вартості без точного розрахунку витрати пального, але без вводу зайвих даних, то цей варіант вам підходить.' +
        ' Але,якщо вам важливо проконтролювати витрату пального вашого авто, то оберіть 2 спосіб, більш точний.\n' +
        '2.\tТочний розрахунок середньої витрати пального. У цьому випадку програма вимагатиме від вас введення залишку пального в баку ' +
        'перед заправкою та пробіг автомобіля . ' +
        'Це дозволить більш точно розрахувати середню витрату пального. ' +
        'Також, для зручності, якщо ви заправляєте повний бак – натисніть кнопку у полі «Залишок пального» і програма' +
        ' автоматично розрахує залишок (для цього повинно бути у налаштуваннях авто вказано об\'єм баку). \n' +
        '\n' +
        'Увага! Враховуйте, що будь які розрахунки у програмі є приблизними та використовувати їх можливо лише як додаткову інформацію.\n'
    }
  },
  taskScreen: {
    TASKS_NOT: 'Завданнь поки немає',
    FILTER_FINISH: 'Завершені',
    FILTER_UNFINISH: 'Не завершені',
    FILTER_ALL: 'Всі',
    TITLE_ACCORDION_ADD: 'Додайте завдання',
    TITLE_ACCORDION_EDIT: 'Редагуйте завдання',
    TITLE_PART: 'Запчастини',
    TITLE_SERVICE: 'Сервіс',
    TITLE_OTHER: 'Інше',
    NAME_TASK: 'Назва завдання',
    DATE: 'До дати',
    MILEAGE: 'До пробігу',
    COST: 'Ціна',
    AMOUNT: 'Кількість',
    TOTAL_COST: 'Сума',
    UNTIL_MILEAGE: 'До пробігу',
    DEL_TASK: 'Видалити завдання?',
    WILL_DEL_TASK: 'Завдання буде повністю видалено',
    CREATE_TASK: 'Бажаєте створити завдання, щоби запланувати повторне обслуговування?',
    parts: {
      PARTS: 'Комплектуючі',
      NUMBER_PART: 'Номер деталі',
      ANALOG_PART: 'Аналоги',
      ADDITION: 'Додатково'
    }
  },
  seller: {
    TITLE_ACCORDION_ADD: 'Додати постачальника',
    TITLE_ACCORDION_EDIT: 'Редагувати постачальника',
    DATA_SELLER: 'Дані постачальника',
    NAME_SELLER: 'Ім\'я/Назва',
    PHONE_SELLER: 'Телефон',
    SPECIALIZATION: 'Спеціалізація',
    WEB_SELLER: 'Посилання',
    PART_SELLER: 'Запчастини',
    SERVICE_SELLER: 'Сервіс',
    ERROR_SELLER: 'Ім\'я обов\'язково',
    TITLE_DIALOG: 'Список постачальників/Сервісов',
    EDIT_LIST: 'Редагувати список постачальників'
  },
  inputPart: {
    TITLE_ACCORDION_ADD: 'Додайте запчастину',
    TITLE_ACCORDION_EDIT: 'Редагуйте запчастину',
    FILTER_ONLY_INSTALL: 'Тільки встановлені',
    FILTER_WITHOUT_INSTALL: 'Без встановлених',
    FILTER_ALL: 'Всі',
    NAME: 'Назва',
    DATE: 'Дата купівлі',
    NUMBER: 'Артикул',
    INSTALLED: 'Встановлено',
    NOT_INSTALLED: 'Не встановлено'
  },
  inputService: {
    TITLE_ACCORDION_ADD: 'Додайте сервіс',
    TITLE_ACCORDION_EDIT: 'Редагуйте сервіс',
    SELECT_TO: 'Виберіть тип сервіса',
    CURRENT_MILEAGE: 'Поточний пробіг',
    REPLACE_MILEAGE: 'Пробіг заміни',
    DATE_SERVICE: 'Дата сервісу',
    DATE_REPLACE: 'Дата заміни',
    COST_SERVICE: 'Ціна сервісу',
    REMINDER: 'Створити \nнагадування',
    ADD_PARTS: 'Додати запчастини',
    ADD_SUM: 'Додано: {{amountPart}} $t(PCS) на загальну суму {{sumCost}} {{currency}}',
    ENTER_VALUE: 'або введіть своє значення',
    MAINTENANCE: 'ТО',
    REPAIR: 'Ремонт',
    add_parts: {
      TITLE: 'Додайте запчастини, які використовували',
      SEARCH: 'Пошук на складі',
      ADD: 'Додайте цю запчастину до списку'
    }
  },
  inputOther: {
    TITLE_ACCORDION_ADD: 'Додайте інші витрати',
    TITLE_ACCORDION_EDIT: 'Редагуйте інші витрати',
    DATE_BUY: 'Дата купівлі'
  },
  statScreen: {
    TITLE: 'Статистика за: ',
    MILEAGE: 'Пробіг за {{date}}, $t(KM) ',
    FUEL_BUY: 'Пального заправлено {{fuel}} $t(L)',
    FUEL_COST: 'на {{fuel_cost}} {{currency}}',
    FUEL_AVERAGE: 'Середня витрата пального, $t(CONSUMPTION)',
    PARTS_COSTS: 'Вартість запчастин, {{currency}}',
    SERVICE_COSTS: 'Вартість робіт, {{currency}}',
    OTHER_COSTS: 'Витрати на інше, {{currency}}',
    ALL: 'Все',
    FUEL: 'Пальне',
    PART: 'Запчастини',
    OTHER: 'Інше',
    SERVICE: 'Сервіс',
    NO_COST: 'Немає витрат за обраний період',
    TITLE_SELECT: 'Оберіть дату',
    FROM: 'з {{date}}',
    TO: 'по {{date}}'
  },
  calendar: {
    CREATE_EVENT: 'Нагадування у календарі створено',
    DELETE_EVENT: 'Нагадування у календарі видалено',
    UPDATE_EVENT: 'Нагадування у календарі оновлено',
    ERROR_CREATE_EVENT: 'Помилка створення нагадування',
    ERROR_DELETE_EVENT: 'Помилка видалення нагадування',
    ERROR_UPDATE_EVENT: 'Помилка оновлення нагадування',
    NOTE_CALENDAR: 'Строк заміни {{titleService}} завершується за 10 днів'
  },
  notification: {
    TITLE: 'Повідомлення від DevizCar',
    NEED_UPDATE_MILEAGE: 'Вам необхідно оновити пробіг у програмі',
    START_NOTIFICATION: 'Щотижневі нагадування запущено',
    ALREADY_START: 'Щотижневі нагадування вже запущено',
    STOP_NOTIFICATION: 'Щотижневі нагадування вимкнено'
  }

}
