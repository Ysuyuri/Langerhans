import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDj8mdRFxl9OJ70PtEgB4xlyScMaGa1Blk",
  authDomain: "langerhans-61f05.firebaseapp.com",
  projectId: "langerhans-61f05",
  storageBucket: "langerhans-61f05.appspot.com",
  messagingSenderId: "256233845058",
  appId: "1:256233845058:web:53b556b22085bf4aa098db"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;