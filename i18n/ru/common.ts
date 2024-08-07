export default {
  CURRENCY: '₴',
  PCS: 'шт',
  UNTIL: 'До',
  NOT_TRACKED: 'Не отслеживается',
  LEFT: 'Осталось',
  MONTH: 'Месяц',
  MONTHS: 'Мес.',
  DAYS: 'Дней',
  YEAR: 'Год',
  CUSTOM: 'Свой',
  KM: 'км',
  L: 'л',
  CURRENCY_L: '₴/л',
  CONSUMPTION: 'л/100 км',
  FUEL_TANK: 'Объем бака',
  PART: 'Детали',
  SERVICE: 'Сервис',
  OTHER: 'Другое',
  NAME: 'Название',
  NUMBER: 'Артикул',
  COST: 'Цена',
  AMOUNT: 'Количество',
  TOTAL_COST: 'Стоимость',
  SUPPLIER: 'Поставщик',
  PHONE: 'Телефон',
  LINK: 'Ссылки',
  DEV_FUNCTION: 'Функция в разработке',
  button: {
    CANCEL: 'Отмена',
    OK: 'Ok',
    CREATE: 'Создать',
    RESET: 'Сброс'
  },
  navi: {
    HOME: 'Главная',
    BUY: 'Покупки',
    TASKS: 'Задачи',
    STATISTIC: 'Статистика',
    CAR_INFO_TITLE: 'Информация по авто',
    SELLER_TITLE: 'Список поставщиков',
    MILEAGE_TITLE: 'Список точек пробега',
    FUEL_TITLE: 'Заправки',
    SETTING_TITLE: 'Настройки',
    PREMIUM_TITLE: 'Премиум доступ'
  },
  setting: {
    CHANGE_THEME: 'Переключение темы',
    SET_LANG: 'Язык',
    TITLE_LANG: 'Язык',
    LANG: 'Русский',
    ADD_CAR: 'Добавить авто',
    ADD_CAR_TITLE: 'Мои машины',
    alertSellerCard: {
      TITLE: 'Вы уверены?',
      MESSAGE: 'Список продавцов будет удален!'
    },
    alertCarsCard: {
      TITLE: 'Удалить машину?',
      MESSAGE: 'Все данные по этой машине будут удалены!'
    },
    alertMileageCard: {
      TITLE: 'Вы уверены?',
      MESSAGE: 'Все точки пробега будут удалены!'
    },
    alertReset: {
      TITLE: 'Вы уверены?',
      MESSAGE: 'Данная операция полностью сбросит программу. Все данные и настройки будут удалены.'
    },
    TITLE_CONTROL_CARD: 'Контроль пробега',
    NOTIFICATION_START: 'Напоминание при старте приложения',
    NOTIFICATION_PERIOD: 'Периодическое напоминание в фоне',
    SYNCHRON_MILEAGE: 'Синхронизация пробега с авто',
    TITLE_GOOGLE_CARD: 'Использовать Google Drive для бэкапа',
    LOGIN_GOOGLE: 'Войти с Google',
    IMPORT_DATA: 'Импорт данных',
    EXPORT_DATA: 'Экспорт данных',
    TITLE_BACKUP: 'Backup данных',
    SAVE_DATA: 'Сохранить данные',
    RECOVERY_DATA: 'Восстановить данные из Backup',
    ALERT_BACKUP_SUCCES: 'Backup выполнен успешно',
    ALERT_BACKUP_ERROR: 'Ошибка создания Backup',
    ALERT_IMPORT_ERROR: 'Ошибка при загрузке Backup',
    ALERT_IMPORT_SUCCES: 'Backup загружен успешно',
    ALERT_ERROR_AUTH: 'Требуется авторизация'
  },
  homeScreen: {
    mainCard: {
      CURRENT_MILEAGE: 'Текущий пробег',
      UPDATE_MILEAGE: 'Обновите пробег',
      modalMileage: {
        TITLE: 'Обновите пробег',
        INPUT_MILEAGE: 'Введите пробег',
        ERROR_INPUT: 'Пробег меньше текущего!'
      },
      modalTire: {
        TITLE: 'Данный шин',
        INPUT_SIZE: 'Размер шин',
        INPUT_BRAND: 'Производитель шин',
        INPUT_YEAR: 'Год изготовления шин',
        HELPER_INFO: 'Размер шин в формате Rxx/xxx/xx',
        HELPER_ERROR: 'Неправильный формат размера шин (Rxx/xxx/xx)'
      }
    },
    TITLE_TASK: 'Ближайшие задачи'
  },
  carInfo: {
    BRAND: 'Бренд',
    MODEL: 'Модель',
    FUEL: 'Топливо',
    BODY: 'Кузов',
    Year: 'Год',
    ENGINE: 'Двигатель',
    GEAR: 'Трансмиссия',
    VIN: 'VIN код',
    DATE_BUY: 'Дата покупки',
    MILEAGE_BUY: 'Пробег при покупке',
    BUTTON_TO: 'Регламент ТО',
    BUTTON_CURRENCY: 'Валюта - {{currency}}',
    RESET_TO: 'Сброс',
    modalNameCar: {
      TITLE_NEW: 'Введите уникальное название машины для начала',
      TITLE_EDIT: 'Измените название авто',
      TITLE_ADD_NEW: 'Введите уникальное название авто',
      INPUT: 'Название авто',
      ERROR_NUL: 'Введите название авто',
      ERROR_UNIQ: 'Такое название уже существует'
    },
    regMaintenance: {
      TITLE_ADD: 'Добавьте новый регламент',
      TITLE_EDIT: 'Изменить регламент',
      INPUT_SERVICE: 'Сервис',
      INPUT_MILES: '',
      INPUT_MONTH: '',
      BUTTON_ADD: 'Добавить новый регламент',
      BUTTON_SAVE: 'Сохранить изменения'
    },
    alert: {
      TITLE: 'Покинуть страницу?',
      MESSAGE: 'Все введенные данные не сохранятся'
    }
  },
  menu: {
    EDIT: 'Изменить',
    DELETE: 'Удалить'
  },
  fuelScreen: {
    TITLE_SUM_FUEL: 'Заправлено топлива в текушем месяце: ',
    TITLE_ACCORDION_ADD: 'Добавьте заправку',
    TITLE_ACCORDION_EDIT: 'Редактируйте заправку',
    DATE_FUEL: 'Дата заправки',
    MILEAGE_FUEL: 'Пробег',
    VOLUME_FUEL: 'Объем топлива',
    COST_FUEL: 'Цена топлива',
    TOTAL_COST: 'Стоимость топлива',
    FUEL_STATION: 'Название заправки',
    TITLE_OFF_CONSUMPTION: 'Отключить более точный расчет среднего расхода?',
    OFF_CONSUMPTION: 'При отключении данной функции вы сможете вносить заправки без обязательного указания остатка ' +
      'топлива в баке и пробега при заправке. Это упростит ведение учета заправок, но сильно уменьшит точность расчета ' +
      'среднего расхода топлива.\n \n Отключить функцию?',
    TITLE_CHECKBOX_CONSUMPTION: 'Вести точный расчет расхода?',
    INPUT_MILEAGE: 'Введите пробег',
    REST_FUEL: 'Остаток топлива',
    alertHelp: {
      TITLE: 'Расчет среднего расхода топлива.',
      MESSAGE: 'В программе возможны несколько способов расчетов среднего расхода топлива.\n' +
        '1.\tПо умолчанию, приблизительный. В этом случае программа использует для расчета пройденного расстояния данные пробега автомобиля, которые вы вводите периодически и сумму заправленного топлива за период. Такой расчет не учитывает остатки топлива в топливном баке при заправке и пройденное расстояние по пробегу может не совпадать с точками заправки. Поэтому, если вам важно вести учет заправок и их стоимости без точного расчета расхода топлива, но без лишних вводимых данных, то этот вариант вам подходит. Но, если вам важно проконтролировать расход топлива вашего авто, то выберите 2 способ, более точный.\n' +
        '2.\tТочный расчет среднего расхода топлива. В этом случае программа будет требовать от вас обязательного ввода остатка топлива в баке перед заправкой и пробег автомобиля во время заправки. Это позволит более точно рассчитать средний расход топлива. Также, для удобства, если вы заправляете полный бак – нажмите кнопку в поле «Остаток топлива» и программа автоматически рассчитает остаток (для этого должен быть в настройка авто указан объем топливного бака). \n' +
        '\n' +
        'Внимание! Учитывайте, что любые расчеты в программе являются приблизительными и их можно использовать только, как дополнительную информацию.\n'
    }
  },
  taskScreen: {
    TASKS_NOT: 'Задач пока нет',
    FILTER_FINISH: 'Завершенные',
    FILTER_UNFINISH: 'Не завершенные',
    FILTER_ALL: 'Все',
    TITLE_ACCORDION_ADD: 'Добавьте задачу',
    TITLE_ACCORDION_EDIT: 'Редактируйте задачу',
    TITLE_PART: 'Комплектующие',
    TITLE_SERVICE: 'Сервис',
    TITLE_OTHER: 'Другое',
    NAME_TASK: 'Название задачи',
    DATE: 'До даты',
    MILEAGE: 'До пробега',
    COST: 'Цена',
    AMOUNT: 'Количество',
    TOTAL_COST: 'Сумма',
    UNTIL_MILEAGE: 'До пробега',
    DEL_TASK: 'Удалить задачу?',
    WILL_DEL_TASK: 'Задача будет полностью удалена',
    CREATE_TASK: 'Хотите создать задачу, чтобы запланировать повторное обслуживание?',
    parts: {
      PARTS: 'Комплектующие',
      NUMBER_PART: 'Номер детали',
      ANALOG_PART: 'Аналоги',
      ADDITION: 'Дополнительно'
    }
  },
  seller: {
    TITLE_ACCORDION_ADD: 'Добавить поставщика',
    TITLE_ACCORDION_EDIT: 'Редактировать поставщика',
    DATA_SELLER: 'Данные поставщика',
    NAME_SELLER: 'Имя/Название',
    PHONE_SELLER: 'Телефон',
    SPECIALIZATION: 'Специализация',
    WEB_SELLER: 'Ссылки',
    PART_SELLER: 'Комплектующие',
    SERVICE_SELLER: 'Сервис',
    ERROR_SELLER: 'Имя обязательно',
    TITLE_DIALOG: 'Список поставщиков/Сервисов',
    EDIT_LIST: 'Редактировать список поставщиков'
  },
  inputPart: {
    TITLE_ACCORDION_ADD: 'Добавьте деталь',
    TITLE_ACCORDION_EDIT: 'Редактируйте деталь',
    FILTER_ONLY_INSTALL: 'Только установленные',
    FILTER_WITHOUT_INSTALL: 'Без установленных',
    FILTER_ALL: 'Все',
    NAME: 'Название',
    DATE: 'Дата покупки',
    NUMBER: 'Артикул',
    INSTALLED: 'Установлено',
    NOT_INSTALLED: 'Не установлено'
  },
  inputService: {
    TITLE_ACCORDION_ADD: 'Добавьте сервис',
    TITLE_ACCORDION_EDIT: 'Редактируйте сервис',
    SELECT_TO: 'Выберите тип сервиса',
    CURRENT_MILEAGE: 'Текущий пробег',
    REPLACE_MILEAGE: 'Пробег замены',
    DATE_SERVICE: 'Дата сервиса',
    DATE_REPLACE: 'Дата замены',
    COST_SERVICE: 'Цена сервиса',
    REMINDER: 'Создать \nнапоминание',
    ADD_PARTS: 'Добавить комплектующие',
    ADD_SUM: 'Добавлено: {{amountPart}} $t(PCS) на общую сумму {{sumCost}} {{currency}}',
    ENTER_VALUE: 'или введите свое значение',
    MAINTENANCE: 'ТО',
    REPAIR: 'Ремонт',
    add_parts: {
      TITLE: 'Добавьте детали, которые использовали',
      SEARCH: 'Поиск на складе',
      ADD: 'Добавьте эту деталь в список'
    },
    COST_PARTS: 'Цена запчастей',
    TOAST_TEXT1: 'Не забудьте отметить на складе ',
    TOAST_TEXT2: 'установку/снятие запчастей после сохранения'
  },
  inputOther: {
    TITLE_ACCORDION_ADD: 'Добавьте другие затраты',
    TITLE_ACCORDION_EDIT: 'Редактируйте другие затраты',
    DATE_BUY: 'Дата покупки'
  },
  statScreen: {
    TITLE: 'Статистика за: ',
    MILEAGE: 'Пробег за {{date}}, $t(KM) ',
    FUEL_BUY: 'Топлива заправлено {{fuel}} $t(L)',
    FUEL_COST: 'на {{fuel_cost}} {{currency}}',
    FUEL_AVERAGE: 'Средний расход, $t(CONSUMPTION)',
    PARTS_COSTS: 'Стоимость запчастей, {{currency}}',
    SERVICE_COSTS: 'Стоимость работ, {{currency}}',
    OTHER_COSTS: 'Затраты на другое, {{currency}}',
    ALL: 'Все',
    FUEL: 'Топливо',
    PART: 'Детали',
    OTHER: 'Другое',
    SERVICE: 'Сервис',
    NO_COST: 'Нет затрат за выбранный период',
    TITLE_SELECT: 'Выберите дату',
    FROM: 'с {{date}}',
    TO: 'до {{date}}'
  },
  calendar: {
    CREATE_EVENT: 'Напоминание в календаре создано',
    DELETE_EVENT: 'Напоминание в календаре удалено',
    UPDATE_EVENT: 'Напоминание в календаре обновлено',
    ERROR_CREATE_EVENT: 'Ошибка создания напоминания',
    ERROR_DELETE_EVENT: 'Ошибка удаления напоминания',
    ERROR_UPDATE_EVENT: 'Ошибка обновления напоминания',
    NOTE_CALENDAR: 'Срок замены {{titleService}} истекает через 10 дней'
  },
  notification: {
    TITLE: 'Сообщение от DevizCar',
    NEED_UPDATE_MILEAGE: 'Вам необходимо обновить пробег в программе',
    START_NOTIFICATION: 'Еженедельные напоминания запущены',
    ALREADY_START: 'Еженедельные напоминания уже запущены',
    STOP_NOTIFICATION: 'Еженедельные напоминания отключены'
  },
  premium: {
    TITLE: 'Полный доступ',
    ALERT_TITLE: 'Дополнительный функционал в расширенной версии',
    ALERT_MESSAGE: 'Программа DevizCar на данный момент находится в активной фазе отладки, поэтому пока полный ' +
      'функционал доступен всем пользователям, без исключения.' +
      ' Вы можете поддержать проект своим активным тестированием, предложениями и отзывами.' +
      ' Самые активные участники тестирования будут вознаграждены в дальнейшем бесплатным доступом к премиум' +
      ' функциям программы.' +
      '\n И, конечно, вы можете поддержать проект чашкой кофе для наших разработчиков.' +
      ' Поддержав нас сейчас, вы автоматически получите полный доступ ко всем функциям программы.' +
      '\n С наилучшими пожеланиями, команда DevizCar',
    ALERT_BUTTON_REVIEW: 'Отзыв',
    ALERT_BUTTON_CANCEL: 'Назад',
    ALERT_BUTTON_DONAT: 'Поддержать',
    CARD_TITLE: 'Получи доступ к уникальным функциям DevizCar',
    LIST_FUNCTION_1: 'Учет 2-х и более автомобилей',
    LIST_FUNCTION_2: 'Подробная статистика',
    LIST_FUNCTION_3: 'Вывод отчета в PDF',
    LIST_FUNCTION_4: 'Загрузка фото чеков и документов',
    BUTTON_DONAT: 'Поддержать проект',
    alertAccess: {
      TITLE: 'Функция доступна при уровне доступа - {{levelAccess}}',
      MESSAGE: 'Хотите приобрести доступ?',
      TEXT: 'Получить доступ'
    }
  },
  pdfCard: {
    CREATE_PDF: 'Вывод отчета в PDF',
    DETAILED_REPORT: 'Подробный отчет',
    SERVICE: 'Выполненные работы',
    PART: 'Покупки запчастей',
    OTHER: 'Другие затраты',
    FUEL: 'Заправки',
    ALL_PERIOD: 'Весь период',
    TITLE_REPORT: 'Отчет DevizCar по автомобилю - ',
    SAVE: 'Сохранить',
    SEND: 'Отправить',
    ERROR_CREATE_PDF: 'Отчет не создан',
    ERROR_CREATE_PDF2: 'Попробуйте создать его еще раз',
    FILE_SAVED: 'Файл успешно сохранен',
    FILE_SAVED_ERROR: 'Файл не сохранен'
  },
  docsPanel: {
    TITLE: 'Добавьте фото документов',
    DEL_TITLE: 'Удалить файл?'
  },
  itemsFuel: {
    DIESEL: 'Дизель',
    GAS: 'Газ',
    PETROL: 'Бензин',
    ELECTRO: 'Электро'
  }

}
