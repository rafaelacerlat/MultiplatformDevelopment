import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from 'react-native';
import {app} from '../Firebase.config.js';
import { StackActions } from '@react-navigation/native';
import { 
    getAuth,
    signOut,
    sendEmailVerification,
    signInWithEmailAndPassword
} from 'firebase/auth';



const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => { 
    try{
    const auth = getAuth(app);
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    await auth.currentUser.reload();
        let currentUser = auth.currentUser;
        if (!currentUser.emailVerified) {
            alert('Verify your email!');
            await sendEmailVerification(auth.currentUser);
            await signOut(auth);
        }else {
            alert('Signed in!');
            navigation.dispatch(StackActions.replace('Account'));
        }

    } catch (error){
        switch (error.code) {
            case 'auth/user-not-found':
                alert('User not found!')
                break;
            case 'auth/wrong-password':
                alert('Wrong password!')
                break;
            default:
                alert(error);
        }
    }
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
        <Button title="Login" onPress={async () => {handleLogin()}} color="#fff" />
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

export default Login;