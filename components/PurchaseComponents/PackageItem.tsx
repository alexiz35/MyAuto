import Purchases, { PurchasesPackage } from 'react-native-purchases'
import { Alert, Pressable } from 'react-native'
import { Card, RadioButton } from 'react-native-paper'
import { Dispatch, SetStateAction, useState } from 'react'
import { TypeLevelAccess } from './PurchaseFunctions'
import { useAppTheme } from '../../CommonComponents/Theme'

interface PropsPackageItem {
  purchasePackage: PurchasesPackage
  levelAccess: TypeLevelAccess
  selectedItem: PurchasesPackage | null
  setSelectedItem: Dispatch<SetStateAction<PurchasesPackage | null>>
}
export const PackageItem = ({ purchasePackage, levelAccess, selectedItem, setSelectedItem }: PropsPackageItem) => {
  const {
    product: { title, description, priceString },
    identifier
  } = purchasePackage
  const { colors } = useAppTheme()
  const isSelected = purchasePackage.identifier === selectedItem?.identifier
  const disabled = purchasePackage.identifier === levelAccess
  console.log('level', levelAccess, purchasePackage.identifier, disabled)
  const disableStyle = {

  }
  const onSelection = async () => {
    setSelectedItem(purchasePackage)
    /* const navigation = useNavigation() */
    /* try {
      const { customerInfo } = await Purchases.purchasePackage(purchasePackage)

      if (typeof customerInfo.entitlements.active.Pro !== 'undefined') {
        console.log('finish', customerInfo)
      }
    } catch (e) {
      if (e.code === 1) {
        Alert.alert('Error purchasing package', e.message)
      }
    } finally {
      setIsPurchasing(false)
    } */
  }
  return (
  <Pressable onPress={onSelection} style={{
    marginHorizontal: 10,
    marginVertical: 4
  }}>
    <Card mode={isSelected ? 'outlined' : 'elevated'} contentStyle={{ padding: 0 }}>
      {/* <Card.Cover source={require('../assets/IconPro.png')} style={{ width: 90, height: 100, alignSelf: 'center', padding: 5 }} /> */}
      <Card.Title title={identifier + ' - ' + priceString}
                  subtitle={disabled ? `Ваш ${description}` : description}
                  titleStyle={{ color: disabled ? colors.tertiary : colors.primary }}
                  subtitleStyle={{ color: disabled ? colors.tertiary : colors.primary }}
                  left={() =>
                    disabled
                      ? <RadioButton.IOS value={''} status={'checked'} color={colors.tertiary} />
                      : <RadioButton status={isSelected ? 'checked' : 'unchecked'} value={''} onPress={onSelection} />
                  }
      />
      {/* <Text>{title}</Text> */}
      {/* <Text >{description}</Text> */}
      {/* <Text>{priceString}</Text> */}

    </Card>

  </Pressable>
  )
}
