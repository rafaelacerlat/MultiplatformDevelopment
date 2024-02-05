import { initializeApp } from "firebase/app";
import {initializeAuth} from 'firebase/auth'; 
import {getReactNativePersistence} from 'firebase/auth/react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ZwtID76XEEVQWZtZwY_bmUT53W7u5qU",
  authDomain: "mytestproject-f47e8.firebaseapp.com",
  projectId: "mytestproject-f47e8",
  storageBucket: "mytestproject-f47e8.appspot.com",
  messagingSenderId: "468732807114",
  appId: "1:468732807114:web:e3ba8c27a33140a56df133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getReactNativePersistence(ReactNativeAsyncStorage);

initializeAuth(app,{ 
  persistence: storage, });

const db = getFirestore(app);

export {app, db};