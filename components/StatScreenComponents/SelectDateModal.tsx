import { Button, CheckBox, Dialog } from '@rneui/themed'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo'
import { useState } from 'react'
import { BACK_INPUT } from '../../type'
import { useAppSelector } from '../Redux/hook'
import { TypeSelect } from '../../screens/StatScreen'
import WheelPickerSelectDate from './WheelPickerSelectDate'

interface Props {
  visible: boolean
  handleOk: (selectModal: TypeSelect) => void
  handleCancel: () => void
}

export const SelectDateModal = ({ visible, handleOk, handleCancel }: Props): JSX.Element => {
  const state = useAppSelector((state) => state.cars[state.numberCar])

  const [checked, setChecked] = useState('year')
  const [checkedYear, setCheckedYear] = useState<string>(String(new Date().getFullYear()))
  const [visibleYear, setVisibleYear] = useState(false)
  const [checkedMonth, setCheckedMonth] = useState<string>(String(new Date().getFullYear()))
  const [visibleMonth, setVisibleMonth] = useState(false)

  const createListYears = (): string[] => {
    const minYear = new Date(state.info.dateBuy).getFullYear()
    const maxYear = new Date().getFullYear()
    const YEAR = []
    let tempIndex = 0
    for (let i = minYear; i < maxYear + 1; i++) {
      YEAR[tempIndex] = String(i)
      tempIndex++
    }
    return YEAR
  }

  const resultPickerYear = (result: string): void => {
    setCheckedYear(result)
    setVisibleYear(false)
  }
  const resultPickerMonth = (result: string): void => {
    setCheckedMonth(result)
    setVisibleMonth(false)
  }

  const MONTH = 'Январь,февраль,Март,Апрель,Май,Июнь,Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь'.split(',')
  return (
    <View>
      <Dialog
        isVisible={visible}
        /* onBackdropPress={toggleDialog5} */
      >
        <Dialog.Title title="Выберите период"/>
        <View style={styles.viewRowChecked}>
          <CheckBox
            title={'год'}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === 'year'}
            onPress={() => {
              setChecked('year')
            }}
          />
          <Pressable onPress={ () => setVisibleYear(true)}>
          <Text>{String(checkedYear)}</Text>
          </Pressable>
        </View>
        <View style={{ position: 'absolute', zIndex: 3, justifyContent: 'center', alignSelf: 'center' }}>
          {visibleYear
            ?
            /* <View style={{ backgroundColor: 'grey' }}><WheelPickerExpo
          backgroundColor={'#8f8b8b'}
          height={300}
          width={150}
          initialSelectedIndex={3}
          haptics={true}
          items={createListYears().map(name => ({ label: name, value: '' }))}
          onChange={({ item }) => {
            setCheckedYear(item.label)
            /!* setVisibleYear(false) *!/
          }} />
          <Button title={'Ok'} onPress={() => setVisibleYear(false)}/>
          </View> */
            <WheelPickerSelectDate list={createListYears()} handlerEnterPicker={resultPickerYear}/>
            : null}
        </View>
        <View style={styles.viewRowChecked}>
        <CheckBox
            title={'месяц'}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === 'month'}
            onPress={() => {
              setChecked('month')
            }}
          />
          <Pressable onPress={() => setVisibleMonth(true)}>
        <Text>{String(checkedMonth)}</Text>
          </Pressable>
        </View>
        <View style={{ position: 'absolute', zIndex: 3, justifyContent: 'center', alignSelf: 'center' }}>
          {visibleMonth
            ? /* <View style={{ backgroundColor: 'grey' }}><WheelPickerExpo
              backgroundColor={'#8f8b8b'}
              height={300}
              width={150}
              initialSelectedIndex={3}
              haptics={true}
              items={MONTH.map(name => ({ label: name, value: '' }))}
              onChange={({ item }) => {
                setCheckedMonth(item.label)
                /!* setVisibleYear(false) *!/
              }} />
              <Button title={'Ok'} onPress={() => setVisibleMonth(false)}/>
            </View> */
            <WheelPickerSelectDate list={MONTH} handlerEnterPicker={resultPickerMonth}/>

            : null}
        </View>

        <View style={styles.viewRowChecked}>
        <CheckBox
            title={'свой период'}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === 'period'}
            onPress={() => setChecked('period')}
          />
          <Pressable onPress={() => setVisibleMonth(true)}>
        <Text>{String(checkedYear)}</Text>
          </Pressable>
        </View>

        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              handleOk({ type: checked, valueYear: checked === 'year' ? checkedYear : checkedMonth })
            }}
          />
          <Dialog.Button title="CANCEL" onPress={() => {
            handleCancel()
          }}/>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  viewRowChecked: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

/*

<WheelPickerExpo
height={300}
width={150}
initialSelectedIndex={3}
haptics={true}
items={CITIES.map(name => ({ label: name, value: '' }))}
onChange={({ item }) => setSelectedDate(item.label)} /> */
