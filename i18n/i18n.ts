import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonRu from './ru/common'
import commonEn from './en/common'
const { languageDetectorPlugin } = require('./languageDetectorPlugin')

export const resources = { // list of languages
  ru: {
    translation: commonRu
  },
  en: {
    translation: commonEn
  }
} as const

void i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3', // To make it work for Android devices, add this line.
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
