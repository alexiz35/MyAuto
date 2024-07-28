import Purchases, { CustomerInfo } from 'react-native-purchases'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

export type TypeLevelAccess = 'Free' | 'Lite' | 'Plus' | 'Pro'
export const checkLevelAccess = async (info?: CustomerInfo): Promise<TypeLevelAccess> => {
  try {
    const purchaserInfo = info ?? await Purchases.getCustomerInfo()
    if (purchaserInfo.entitlements.active.Pro) {
      // Pro entitlement logic
      void saveLevelAccessDataSecurely('Pro')
      return 'Pro'
    } else if (purchaserInfo.entitlements.active.Plus) {
      // Plus entitlement logic
      void saveLevelAccessDataSecurely('Plus')
      return 'Plus'
    } else if (purchaserInfo.entitlements.active.Lite) {
      // Lite entitlement logic
      void saveLevelAccessDataSecurely('Lite')
      return 'Lite'
    } else {
      // No entitlements active logic
      void saveLevelAccessDataSecurely('Free')
      return 'Free'
    }

    // access latest customerInfo
  } catch (e) {
    console.log('Error getting Access', e)
    return await getLevelAccessDataSecurely()
  }
}

// ------------------------------
export const getPackages = async () => {
  try {
    const offerings = await Purchases.getOfferings()
    if (offerings.current !== null && offerings.current.availablePackages.length !== 0) return offerings.current.availablePackages
    else return []
  } catch (e) {
    console.log('Error getting offers', e)
    return []
  }
}

// ------------------------------

// Получение данных о подписке
export const getLevelAccessDataSecurely = async (): Promise<TypeLevelAccess> => {
  try {
    const tempAccess = await SecureStore.getItemAsync('levelAccess')
    if (tempAccess === null) return 'Free'
    else {
      // @ts-expect-error type return
      return tempAccess
    }
  } catch (error) {
    // Обработка ошибок при получении данных
    console.error('Ошибка при безопасном получении данных о подписке', error)
    return 'Free'
  }
}

// Сохранение данных о подписке
const saveLevelAccessDataSecurely = async (levelAccess: string) => {
  try {
    await SecureStore.setItemAsync('levelAccess', levelAccess)
  } catch (error) {
    // Обработка ошибок при сохранении данных
    console.error('Ошибка при безопасном сохранении данных о подписке', error)
  }
}

/* export const getLevelAccessSecure = () => {
  let levelAccess: TypeLevelAccess | null = 'Free'
  SecureStore.getItemAsync('levelAccess')
    .then(result => {
      if (result != null) {
        console.log('UseGet', result)
        levelAccess = result
        return levelAccess
      } else {
        console.log('Нет значений, сохраненных под этим ключом.')
        levelAccess = 'Free'
        return levelAccess
      }
    }
    )
    .catch(e => {
      console.log(e)
      levelAccess = 'Free'
      return levelAccess
    })
} */
