import { ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Button, Icon, Input } from '@rneui/themed'
import { BACK_INPUT, COLOR_GREEN, StatePart, Seller, StateService, TEXT_WHITE } from '../type'
import { useState } from 'react'
import { editTask } from './Redux/actions'
import { useAppDispatch, useAppSelector } from './Redux/hook'

interface ModalInfoPartProps {
  currentTask: StateService
  currentPart: StatePart
  onPressCancel: () => void
}
enum ButtonEditType {
  edit = 'edit',
  read = 'read',
  save = 'save'
}

export const ModalInfoPart = ({ currentTask, currentPart, onPressCancel }: ModalInfoPartProps): JSX.Element => {
  const initSeller: Seller = {
    name: '',
    phone: '',
    link: ''
  }
  const setEditTask = useAppDispatch()
  const numberCar = useAppSelector(state => state.numberCar)

  // -----------------------State Input------------------------------
  const [namePart, setNamePart] = useState(currentPart.namePart)
  const [numberPart, setNumberPart] = useState(currentPart.numberPart)
  const [costPart, setCostPart] = useState(currentPart.costPart)
  const [amountPart, setAmountPart] = useState(currentPart.quantityPart)
  const [seller, setSeller] = useState<Seller>((currentPart.seller !== undefined) ? currentPart.seller : initSeller)

  // ----------------------------------------------------------------

  const showToast = (text: string): void => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    )
  }

  // --------------------------BUTTON BLOCK ------------------------------
  const [toggleEdit, setToggleEdit] = useState<ButtonEditType>(ButtonEditType.read)

  const handlerSave = (): void => {
    const tempParts: StatePart[] | undefined = currentTask.addition?.parts?.filter((item) => (item.id !== currentPart.id))
    // @ts-expect-error undefined
    currentTask.addition.parts = tempParts.concat({
      id: currentPart.id,
      namePart,
      numberPart,
      costPart,
      amountPart,
      seller
    })
    setEditTask(editTask(numberCar, currentTask.id, currentTask))
  }

  // ----------------------------------------------------------------

  return (

    <ImageBackground source={require('../assets/Back2.png')} style={{ padding: 10 }} >
    <ScrollView >

    <View style={styles.viewAdditional}>

      <View style={styles.viewTittle}>

        <Icon type={'material-community'} name={'circle'} color={COLOR_GREEN} size={10} style={{ }}/>
        <Text style={styles.textTittle} >
          Подробная информация о детали
        </Text>
        <Button
          type='outline'
          size='md'
          buttonStyle={{ borderColor: COLOR_GREEN, marginLeft: 5 }}
          icon = {
            toggleEdit === 'read'
              ? {
                  name: 'pencil',
                  type: 'material-community',
                  color: TEXT_WHITE,
                  size: 20
                }
              : {
                  name: 'content-save',
                  type: 'material-community',
                  color: TEXT_WHITE,
                  size: 20
                }
          }
          onPress={() => {
            switch (toggleEdit) {
              case ButtonEditType.read:
                setToggleEdit(ButtonEditType.edit)
                showToast('измените данные')
                break
              case ButtonEditType.edit:
                handlerSave()
                setToggleEdit(ButtonEditType.save)
                showToast('DATA SAVED')
                onPressCancel()
                break
              case ButtonEditType.save:
                setToggleEdit(ButtonEditType.read)
                break
              default: break
            }
          }}
        />
      </View>

    <View style={styles.viewGroupInput}>
      <View style={styles.input}>
        <Input
          editable= {toggleEdit !== 'read'}
          placeholder={'наименование'}
          placeholderTextColor={'red'}
          inputStyle={styles.inputText}
          errorMessage={'наименование'}
          errorStyle={{ color: 'gray', marginTop: 1, textAlign: 'center' }}
          value={namePart}
          onChangeText={(value) => setNamePart(String(value))}
        />
      </View>
      <View style={styles.input}>
        <Input
          editable= {toggleEdit !== 'read'}
          placeholder={'введите номер'}
          containerStyle={{ flex: 1 }}
          inputStyle={styles.inputText}
          errorMessage={'номер детали'}
          errorStyle={styles.errorInput}
          value={numberPart}
          onChangeText={(value) => setNumberPart(String(value))}
        />
      </View>
    </View>

    <View style={styles.viewGroupInput}>
      <View style={styles.input}>
        <Input
          editable= {toggleEdit !== 'read'}
          placeholder={'кол-во'}
          containerStyle={{ flex: 1 }}
          inputStyle={styles.inputText}
          onChangeText={(value) => setAmountPart(Number(value))}
          errorMessage={'количество'}
          errorStyle={styles.errorInput}
          value={String(amountPart)}
          keyboardType={'numeric'}
        />
      </View>
      <View style={styles.input}>
        <Input
          editable= {toggleEdit !== 'read'}
          placeholder={'введите цену'}
          inputStyle={styles.inputText}
          errorMessage={'цена детали'}
          errorStyle={styles.errorInput}
          value={String(costPart)}
          onChangeText={(value) => setCostPart(Number(value))}
          keyboardType={'numeric'}
        />
      </View>
    </View>
      <View style={styles.viewGroupInput}>
        <View style={styles.input}>
          <Input
            editable= {toggleEdit !== 'read'}
            placeholder={'продавец'}
            containerStyle={{ flex: 1 }}
            inputStyle={styles.inputText}
            onChangeText={
              (value) => setSeller({ ...seller, name: value })
            }
            errorMessage={'продавец'}
            errorStyle={styles.errorInput}
            value={String(seller?.name)}
          />
        </View>
        <View style={styles.input}>
          <Input
            editable= {toggleEdit !== 'read'}
            placeholder={'телефон'}
            inputStyle={styles.inputText}
            errorMessage={'номер телефона'}
            errorStyle={styles.errorInput}
            value={String(seller?.phone)}
            onChangeText={
              (value) => setSeller({ ...seller, phone: value })
            }
          />
        </View>
      </View>
      <Input
        editable= {toggleEdit !== 'read'}
        placeholder={'данные продавца'}
        inputStyle={styles.inputText}
        errorMessage={'данные продавца'}
        errorStyle={styles.errorInput}
        value={String(seller?.link)}
        onChangeText={
          (value) => setSeller({ ...seller, link: value })
        }
      />
    </View>
      <Button
        containerStyle={styles.buttonStyle}
        buttonStyle={{ borderColor: 'red' }}
        titleStyle={{ color: 'red' }}
        iconRight
        title={'Back'}
        icon = {{
          name: 'undo-variant',
          type: 'material-community',
          color: 'red',
          size: 18
        }}
        onPress={() => { onPressCancel() }}
        type='outline'
      />
    </ScrollView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  viewAdditional: {
  },
  viewTittle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  textTittle: {
    color: TEXT_WHITE,
    fontStyle: 'italic',
    paddingTop: 6,
    marginHorizontal: 15
  },
  viewGroupInput: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    margin: 5,
    backgroundColor: BACK_INPUT,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2
  },
  inputText: {
    textAlign: 'center',
    fontSize: 12,
    color: TEXT_WHITE
  },
  errorInput: {
    color: 'gray',
    marginTop: 1,
    textAlign: 'center'
  },
  textTop: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
    color: TEXT_WHITE
  },
  inputPartStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  inputServiceStyle: {
    textAlign: 'center',
    fontSize: 14
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  buttonStyle: {
    width: '40%',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15
  }
})
