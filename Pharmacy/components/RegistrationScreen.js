import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from 'react-native';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {app} from '../Firebase.config.js';


const auth = getAuth(app); 


const RegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
  const handleRegister = () => {
    try{ 
      const userCred = createUserWithEmailAndPassword(auth, email, password); 
      console.log(userCred);
      sendEmailVerification(userCred.user); 
    }catch(error) { 
      switch(error.code) { 
        case'auth/email-already-in-use': alert("Email already in use"); break; 
        case'auth/weak-password': alert("Weak password"); break; 
        default: alert(error);
      }
    }
  };

      return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Register</Text>
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
            <Button title="Register" onPress={handleRegister} color="#fff"/>
          </View>
          <Text style={styles.switchFormText} onPress={() => navigation.navigate('Login')}>
            Already registered? Login here
          </Text>
        </View>
        </View>
      );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
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
export default RegistrationScreen;