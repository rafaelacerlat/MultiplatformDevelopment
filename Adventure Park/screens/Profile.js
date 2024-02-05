import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import { getAuth, signOut} from 'firebase/auth';
import { doc,onSnapshot } from "firebase/firestore";
import {db} from '../Firebase.config.js';

const Profile = ()  => { 
  const [userData, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const subscriber = onSnapshot(doc(db, "users", user.email), (doc) => setUser(doc.data()));

    return () => {subscriber};

    }, []);


  const handleSignOut = async() => { 
    const auth = getAuth();
    await signOut(auth).then(() => console.log('User signed out!'));
  }

    return(
        <View style={styles.container}>

            <Image style={{width: 100, height: 100, borderRadius: 75}}
                    source={require('../assets/park.png')}/>

            <View style={{padding: 10}}>
                <Text style={styles.name}> {userData.name + ' ' + userData.surname} </Text>
                <Text style={styles.username}> {'@' + userData.username} </Text>
            </View>

            <View >
                <TouchableOpacity style={styles.button}  onPress={() => {}} >
                <Text style={styles.text}>Edit profile</Text>
                </TouchableOpacity>
            </View>

            <View >
                <TouchableOpacity style={styles.button}  onPress={() => {handleSignOut()}} >
                <Text style={styles.text}>Sign out!</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        marginLeft: 50,
        borderRadius: 40,
      },
    text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
    name: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
    username: {
        fontSize: 14,
        lineHeight: 14,
      }
  });

export default Profile;