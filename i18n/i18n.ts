import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonRu from './ru/common'
import commonEn from './en/common'
import commonUk from './uk/common'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { languageDetectorPlugin } = require('./languageDetectorPlugin')

export const resources = { // list of languages
  ru: {
    translation: commonRu
  },
  en: {
    translation: commonEn
  },
  uk: {
    translation: commonUk
  }
} as const

void i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3', // To make it work for Android devices, add this line.
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
