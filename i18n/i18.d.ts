import 'i18next'
import { resources, defaultNS } from './i18n'
import commonRu from './ru/common'
import commonEn from './en/common'

declare module 'i18next' {
  interface CustomTypeOptions {
    /* defaultNS: typeof defaultNS; */
    resources: typeof resources['en']
  }
}
