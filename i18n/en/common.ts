export default {
  CURRENCY: '$',
  PCS: 'pcs',
  MONTH: 'Month',
  MONTHS: 'Months',
  YEAR: 'Year',
  CUSTOM: 'Custom',
  KM: 'km',
  L: 'l',
  CONSUMPTION: 'l/100km',
  PART: 'Part',
  SERVICE: 'Service',
  OTHER: 'Other',
  NAME: 'Name',
  NUMBER: 'Number',
  COST: 'Cost',
  AMOUNT: 'Amount',
  TOTAL_COST: 'Total Cost',
  SUPPLIER: 'Supplier',
  PHONE: 'Phone',
  LINK: 'Web',
  DEV_FUNCTION: 'Feature in Development',
  TITLE: 'Current miles',
  navi: {
    HOME: 'Home',
    BUY: 'Buy',
    TASKS: 'Tasks',
    STATISTIC: 'Statistic',
    CAR_INFO_TITLE: 'Car Info',
    SELLER_TITLE: 'List of Seller',
    MILEAGE_TITLE: 'Mileage List',
    FUEL_TITLE: 'Fuel',
    SETTING_TITLE: 'Setting'
  },
  setting: {
    CHANGE_THEME: 'Switching Theme',
    SET_LANG: 'Language',
    TITLE_LANG: 'Language',
    LANG: 'English',
    ADD_CAR: 'Add Car',
    ADD_CAR_TITLE: 'My Cars',
    alertSellerCard: {
      TITLE: 'Are you sure?',
      MESSAGE: 'List of sellers will be deleted!'
    },
    alertCarsCard: {
      TITLE: 'Delete Car?',
      MESSAGE: 'All data on this car will be deleted!'
    },
    alertMileageCard: {
      TITLE: 'Are you sure?',
      MESSAGE: 'Mileage List will be deleted!'
    },
    TITLE_CONTROL_CARD: 'Mileage Control',
    NOTIFICATION_START: 'Notification when starting App',
    NOTIFICATION_PERIOD: 'Periodic Notification in the Background',
    SYNCHRON_MILEAGE: 'Synchronizing Mileage with Car',
    TITLE_GOOGLE_CARD: 'Use Google Drive for Backup',
    LOGIN_GOOGLE: 'Log In with Google',
    IMPORT_DATA: 'Import Data',
    EXPORT_DATA: 'Export Data'
  },
  homeScreen: {
    mainCard: {
      CURRENT_MILEAGE: 'Current Mileage',
      UPDATE_MILEAGE: 'Need to Update Mileage',
      modalMileage: {
        TITLE: 'Update Mileage',
        INPUT_MILEAGE: 'Input Mileage',
        ERROR_INPUT: 'Mileage less than current!'
      },
      modalTire: {
        TITLE: 'Tire Details',
        INPUT_SIZE: 'Tire Size',
        INPUT_BRAND: 'Tire Brand',
        INPUT_YEAR: 'Tire Year',
        HELPER_INFO: 'Size tire in format Rxx/xxx/xx',
        HELPER_ERROR: 'Incorrect tire size format (Rxx/xxx/xx)'
      }
    },
    TITLE_TASK: 'Upcoming Tasks'
  },
  carInfo: {
    BRAND: 'Brand',
    MODEL: 'Model',
    FUEL: 'Fuel',
    BODY: 'Body',
    Year: 'Year',
    ENGINE: 'Engine',
    GEAR: 'Gear',
    VIN: 'VIN code',
    DATE_BUY: 'Date of Purchase',
    MILEAGE_BUY: 'Mileage upon Purchase',
    BUTTON_TO: 'Maintenance Schedule',
    RESET_TO: 'Reset',
    modalNameCar: {
      TITLE_NEW: 'Enter unique Car Name to get Started',
      TITLE_EDIT: 'Change the Name car',
      TITLE_ADD_NEW: 'Enter unique Car Name',
      INPUT: 'Name Car',
      ERROR_NUL: 'Enter car name',
      ERROR_UNIQ: 'This name already exists'
    },
    regMaintenance: {
      TITLE_ADD: 'Add new maintenance',
      TITLE_EDIT: 'Change maintenance',
      INPUT_SERVICE: 'Service',
      INPUT_MILES: '',
      INPUT_MONTH: '',
      BUTTON_ADD: 'Add maintenance',
      BUTTON_SAVE: 'Save changes'
    },
    alert: {
      TITLE: 'Leave Page?',
      MESSAGE: 'The entered data is not saved'
    }
  },
  menu: {
    EDIT: 'Edit',
    DELETE: 'Delete'
  },
  fuelScreen: {
    TITLE_SUM_FUEL: 'Filled fuel in current month: ',
    TITLE_ACCORDION_ADD: 'Add filling fuel',
    TITLE_ACCORDION_EDIT: 'Edit filling fuel',
    DATE_FUEL: 'Refueling date',
    MILEAGE_FUEL: 'Mileage',
    VOLUME_FUEL: 'Fuel volume',
    COST_FUEL: 'Fuel cost',
    TOTAL_COST: 'Total cost',
    FUEL_STATION: 'Gas Station',
    TITLE_OFF_CONSUMPTION: 'Disable more correct calculate of average consumption fuel?',
    OFF_CONSUMPTION: 'When you disable this function, you will be able to record refueling' +
      ' without having to enter the remaining fuel in the tank and the mileage when refueling. ' +
      'This will simplify the accounting of refueling, but will greatly reduce the accuracy of ' +
      'calculating average fuel consumption.\n \n Disable the feature?',
    TITLE_CHECKBOX_CONSUMPTION: 'Accurate calculation of fuel consumption',
    INPUT_MILEAGE: 'Input mileage',
    REST_FUEL: 'Fuel remaining'

  },
  taskScreen: {
    TASKS_NOT: 'No tasks yet',
    FILTER_FINISH: 'Finished',
    FILTER_UNFINISH: 'Unfinished',
    FILTER_ALL: 'All',
    TITLE_ACCORDION_ADD: 'Add Task',
    TITLE_ACCORDION_EDIT: 'Edit Task',
    TITLE_PART: 'Part',
    TITLE_SERVICE: 'Service',
    TITLE_OTHER: 'Other',
    NAME_TASK: 'Name Task',
    DATE: 'By Date',
    MILEAGE: 'By Mileage',
    COST: 'Cost',
    AMOUNT: 'Quantity',
    TOTAL_COST: 'Total Cost',
    parts: {
      PARTS: 'Parts',
      NUMBER_PART: 'Number Part',
      ANALOG_PART: 'Analogs',
      ADDITION: 'Additionally'
    }
  },
  seller: {
    TITLE_ACCORDION_ADD: 'Add Supplier',
    TITLE_ACCORDION_EDIT: 'Edit Supplier',
    DATA_SELLER: 'Supplier details',
    NAME_SELLER: 'Name',
    PHONE_SELLER: 'Phone',
    SPECIALIZATION: 'Specialization',
    WEB_SELLER: 'Link',
    PART_SELLER: 'Part',
    SERVICE_SELLER: 'Service',
    ERROR_SELLER: 'Name required',
    TITLE_DIALOG: 'List Suppliers/Services',
    EDIT_LIST: 'Edit List Suppliers/Services'
  },
  inputPart: {
    TITLE_ACCORDION_ADD: 'Add Part',
    TITLE_ACCORDION_EDIT: 'Edit Part',
    NAME: 'Name',
    DATE: 'Purchase date',
    NUMBER: 'Number Part'
  },
  inputService: {
    TITLE_ACCORDION_ADD: 'Add Service',
    TITLE_ACCORDION_EDIT: 'Edit Service',
    SELECT_TO: 'Select Maintenance Type',
    CURRENT_MILEAGE: 'Current Mileage',
    REPLACE_MILEAGE: 'Replacement Mileage',
    DATE_SERVICE: 'Date of Service',
    DATE_REPLACE: 'Replacement Date',
    COST_SERVICE: 'Cost Service',
    REMINDER: 'Create \nReminder',
    ADD_PARTS: 'Add Parts',
    ADD_SUM: 'Added: {{amountPart}} $t(PCS) for a total of {{sumCost}} $t(CURRENCY)',
    ENTER_VALUE: 'or Enter your value',
    add_parts: {
      TITLE: 'Add the parts you used',
      SEARCH: 'Search in stock',
      ADD: 'Add this part'
    }
  },
  inputOther: {
    TITLE_ACCORDION_ADD: 'Add Other Costs',
    TITLE_ACCORDION_EDIT: 'Edit Other Costs',
    DATE_BUY: 'Date of Purchase'
  },
  statScreen: {
    TITLE: 'Statistics for: ',
    MILEAGE: 'Mileage for {{date}}, $t(KM) ',
    FUEL_BUY: 'Fuel purchased {{fuel}} $t(L)',
    FUEL_COST: 'for {{fuel_cost}} $t(CURRENCY)',
    FUEL_AVERAGE: 'Average consumption, $t(CONSUMPTION)',
    SERVICE_COSTS: 'Spent on services, $t(CURRENCY)',
    OTHER_COSTS: 'Spent on another, $t(CURRENCY)',
    ALL: 'All',
    FUEL: 'Fuel',
    PART: 'Parts',
    OTHER: 'Other',
    NO_COST: 'No cost for selected date range',
    TITLE_SELECT: 'Select the Date',
    FROM: 'from {{date}}',
    TO: 'to {{date}}'
  }

}
