import { getLocales } from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORE_LANGUAGE_KEY = 'settings.lang'

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string | null) => void) {
    try {
      // get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          // if language was stored before, use this language in the app
          callback(language)
        } else {
          // if language was not stored yet, use device's locale
          callback(getLocales()[0].languageCode)
        }
      })
    } catch (error) {
      console.log('Error reading language', error)
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      // save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language)
    } catch (error) {}
  }
}
module.exports = { languageDetectorPlugin }
