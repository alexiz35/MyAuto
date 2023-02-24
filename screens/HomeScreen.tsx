/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { View, StyleSheet, Platform, PermissionsAndroid, Alert, Text, ImageBackground } from 'react-native'
import { Button, Card, Divider, FAB, Icon } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Tasks } from '../components/Tasks'
import { addTask, updateMiles } from '../components/Redux/actions'
import { useAppDispatch, useAppSelector } from '../components/Redux/hook'
import { BACK_CARD, StateTask } from '../type'
import { useEffect, useState } from 'react'
import { RootStackParamList, RootTabParamList } from '../components/Navigation/Navigation'
import * as Print from 'expo-print'

import { shareAsync } from 'expo-sharing'
import { Shadow } from 'react-native-shadow-2'
import { MainCard } from '../components/MainCard'
import InfoScreen from './InfoScreen'
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InputTaskScreen from './InputTaskScreen'
import StatScreen from './StatScreen'
import PaperScreen from './PaperScreen'
import { CompositeScreenProps } from '@react-navigation/native'

/* type Props = NativeStackScreenProps<RootStackParamList, 'BottomTabNav'> */
type PropsTab = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, NativeStackScreenProps<RootStackParamList>>

const HomeScreen = ({ navigation }: PropsTab): JSX.Element => {
  const setMiles = useAppDispatch()
  const miles = useAppSelector((state) => state)
  const currentTask: StateTask = {
    id: 0,
    title: 'Oil',
    startKm: 200000,
    endKm: 250000,
    startDate: '25.01.22',
    endData: '25.01.22',
    isFinished: false
  }

  const html = `
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

 <!-- <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">

  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href="icon.png">
  &lt;!&ndash; Place favicon.ico in the root directory &ndash;&gt;

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">

  <meta name="theme-color" content="#fafafa">-->
  <style type="text/css">
    TABLE {
      width: 300px; /* Ширина таблицы */
      border-bottom: 2px solid maroon; /* Линия внизу таблицы */
      background: #fffacd; /* Цвет фона таблицы */
    }
    TH {
      background: maroon; /* Цвет фона заголовка */
      color: white; /* Цвет текста */
      text-align: left; /* Выравнивание по левому краю */
    }
    TD, TH {
      padding: 3px; /* Поля вокруг текста */
    }
  </style>
</head>

<body>

  <!-- Add your site or application content here -->
  <p style="text-align: center">Замена масла</p>
  <table width="100%" border=1  border-collapse="collapse" >
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>date</th>
        <th>mile</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
    </tbody>
  </table>





  <!--<script src="js/vendor/modernizr-3.11.2.min.js"></script>
  <script src="js/plugins.js"></script>
  <script src="js/main.js"></script>-->

  <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
  <!--<script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-XXXXX-Y', 'auto'); ga('set', 'anonymizeIp', true); ga('set', 'transport', 'beacon'); ga('send', 'pageview')
  </script>
  <script src="https://www.google-analytics.com/analytics.js" async></script>-->
</body>

</html>
`

  const printToFile = async (): Promise<void> => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      const { uri } = await Print.printToFileAsync({ html })
      Alert.alert('file has created')
      // sending file somewere
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
    } catch (err) {
      console.log('ErrorPrintPDF')
    }
  }

  /*  const navigateInfo = (): void => {
    navigation.navigate('Info')
  } */

  useEffect(() => {
    /* setMiles(updateMiles(15)) */
    /* setMiles(addTask(currentTask)) */
    console.log('homelog', miles)
  }, [miles.currentMiles])

  return (

    <View style={styles.viewContainer}>
      <ImageBackground source={require('../assets/Back2.png')}>
      <Shadow stretch={true}
              /* startColor={'#2C2F34'}
              endColor={'#383C42'}
              distance={5}
              /!* offset={[-2, -2]} *!/
              corners={{ bottomStart: false, bottomEnd: true, topStart: true, topEnd: true }} */
              containerStyle={{ margin: 20, alignSelf: 'center', width: '90%' }}
      >
        <MainCard/>
      </Shadow>
      <View style={styles.viewTasks}>
        <Tasks />
      </View>
     {/*  <View style={styles.viewFab}>
        <FAB
          style={styles.fab}
          placement={'right'}
          icon={{ name: 'add', color: 'white' }}
          onPress={() => {
            navigation.navigate('InputTaskScreen', { editable: false })
          }}
        />
        <FAB
          style={{ marginBottom: 70 }}
          placement={'right'}
          icon={{ name: 'save', color: 'white' }}
          onPress={() => { void printToFile() }}
        />
      </View> */}
      {/* <MapView
        style={{ width: '100%', height: '50%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      /> */}
      </ImageBackground>
      </View>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: BACK_CARD

  },
  viewTasks: {
    height: '80%'
  },
  viewFab: {
    position: 'absolute',
    right: 0,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fab: {
    marginRight: 10,
    marginBottom: 5
  }
})
