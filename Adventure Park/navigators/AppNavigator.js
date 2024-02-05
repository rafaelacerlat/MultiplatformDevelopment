import { StyleSheet, Text, View } from 'react-native';
import ParkDetails from '../screens/ParkDetails';
import OnBoarding from '../screens/OnBoarding';
import {NavigationContainer} from '@react-navigation/native' 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../screens/Registration';
import Login from '../screens/Login';
import AccountNavigator from './AccountNavigator';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Stack = createNativeStackNavigator();


const AppNavigator =  () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);

useEffect(() => {
  const auth = getAuth();

  const listener = onAuthStateChanged(auth, async (user) => {
    setIsAuthenticated(!!user);
    setEmailVerified(user.emailVerified);
  });

  return () => {
    listener();
  };
}, []);


  return (
    <NavigationContainer>
    <Stack.Navigator>      
      {!isAuthenticated || !isEmailVerified ? (
        <Stack.Group initialRouterName="OnBoarding">
          <Stack.Screen name="OnBoarding" component ={OnBoarding}/>
          <Stack.Screen name="ParkDetails" component ={ParkDetails}/>
          <Stack.Screen name="Registration" component ={Registration}/>
          <Stack.Screen name="Login" component ={Login}/>
        </Stack.Group>
      ) : (
        <Stack.Screen name="Account" component ={AccountNavigator}/>
      )}
    </Stack.Navigator>
    

   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
