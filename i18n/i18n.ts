import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// eslint-disable-next-line import/no-unresolved
import commonRu from './ru/common'
import commonEn from './en/common'
import naviEn from './en/navi'
import naviRu from './ru/navi'
import setRu from './ru/setting'
import setEn from './en/setting'
const { languageDetectorPlugin } = require('./languageDetectorPlugin')
/* import ru from './translation/ru.json'
import en from './translation/en.json' */

const resources = { // list of languages
  ru: {
    translation: commonRu,
    navigation: naviRu,
    setting: setRu
  },
  en: {
    translation: commonEn,
    navigation: naviEn,
    setting: setEn
  }
}

void i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3', // To make it work for Android devices, add this line.
    resources,
    /* lng: 'en', */ // default language to use.
    // if you're using a language detector, do not define the lng option
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
