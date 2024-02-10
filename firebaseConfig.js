import { initializeApp } from 'firebase/app'

// Optionally import the services that you want to use
// import { Auth } from 'firebase/auth'
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBnk8IVMSWugCBD6x5rkPZgfNLFnQCsRBU',
  authDomain: 'devizcar.firebaseapp.com',
  databaseURL: 'https://devizcar.firebaseio.com',
  projectId: 'devizcar',
  storageBucket: 'devizcar.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:879173884588:android:ff7b44c97849301d789d09',
  measurementId: 'G-measurement-id'
}

export const app = initializeApp(firebaseConfig)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
