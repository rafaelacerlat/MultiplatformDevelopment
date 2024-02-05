import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from 'react-native';
import { Image } from 'react-native';
import PharmacyAccountScreen from './PharmacyAccountScreen';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from '../Firebase.config.js';
import { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const auth = getAuth(app);

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => { 
    //signInWithEmailAndPassword(auth, 'email@gmail.com', 'pass1234')
    signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      alert('Signed in!');
      const user = userCred.user;

      // 1dM9LiHnOtRVZiyHwaYZjg9CiGU2
      if(user.uid == '1dM9LiHnOtRVZiyHwaYZjg9CiGU2'){
        navigation.dispatch(StackActions.replace('Admin'));
      } else{
      navigation.dispatch(StackActions.replace('PharmacyAccess'));
      }
    })
    .catch((error) => {alert(error)})
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
      
      <Text style={styles.formTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#fff" />
      </View>
      <Text style = {styles.switchFormText} onPress={() => navigation.navigate('Registration')}>
          Not a user? Register here
        </Text>
      
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight/2,
    width: deviceWidth/2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  formContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#000099',
    padding: 10,
    borderRadius: 5,
  },
  switchFormText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000099',
  },
  loggedInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000099',
  },
});

export default LoginScreen;