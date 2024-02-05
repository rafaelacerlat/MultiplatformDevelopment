import { View, Image,Text, TextInput, StyleSheet, Button, } from "react-native";
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import {db} from '../Firebase.config.js';
import { addDoc, collection, onSnapshot } from "firebase/firestore";


const ParkDetails = ({navigation})  => { 
  const [actionTriggered, setActionTriggered] = useState(''); 

  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUserMessage] = useState({ name: '', email: '', phone:'', message: '' });

  // useEffect(() => 
  //   onSnapshot(collection(db, "messages"), (snapshot) => 
  //     console.log(snapshot.docs.map(doc => doc.data()))
  //   ), []
  // );

  const  handleSubmit = async () => {
    const collectionRef = collection(db, "messages");
    await addDoc(collectionRef, user);

    Alert.alert('Message saved successfully');
    };

    const pharmacyInfo = {
      name: "Porirua Adventure Park",
      address: "Broken Hill Road, Broken Hill, Porirua, New Zealand",
      phone: '+351989808080',
      email: "pharmacy@gmail.com",
      about: "A lift-access bike park, with hiking and sightseeing trails, a village base with a 200-seat cafe, indoor surf park and hilltop cafe."
    }
    return(
        <View style={styles.container1}>
            <Image style={styles.image} source={require('../assets/park.png')}/>
            <View style={styles.container2}>
                <Text style={styles.text}> {pharmacyInfo.name} </Text>
                <Text> {pharmacyInfo.address}</Text>
                <Text> {pharmacyInfo.about}</Text>

                <View style={styles.container3}>
                  <Button rounded color="#082567" title="Contact" style={styles.button}
                      onPress={() => {
                                      setModalVisible(true); 
                                      setActionTriggered('ACTION_1')
                                    }
                              }/>
                  <Button rounded color="#082567" title="Message" style={styles.button}
                      onPress={() => 
                                    {
                                      setModalVisible(true); 
                                      setActionTriggered('ACTION_2')
                                    }
                              }/>
                </View>
            </View>
            
            <Modal style={styles.bottomModalView} isVisible={modalVisible} backdropOpacity={0} onBackdropPress={() => setModalVisible(false)}>
      {
        actionTriggered === 'ACTION_1' ?
          <View style={styles.modal}>
            <Text > Phone: </Text>
            <Text > Email: </Text> 
          </View>
        : actionTriggered === 'ACTION_2' ?
            <View style={styles.modal}>
              <Text>Get in touch!</Text> 
                        <View>
                          <TextInput placeholder="Name" onChangeText={(text) => setUserMessage({...user, name: text })} value={user.name}/> 
                          <TextInput placeholder="Email" onChangeText={(text) => setUserMessage({...user, email: text })} value={user.email}/> 
                          <TextInput placeholder="Phone" onChangeText={(text) => setUserMessage({...user, phone: text })} value={user.phone}/> 
                          <TextInput placeholder="Write a message ..." onChangeText={(text) => setUserMessage({...user, message: text })} value={user.message}/>  
                        </View>
              <Button rounded color="#082567" title="Message" 
                      onPress={() => {handleSubmit(); setModalVisible(false)}}
                      disabled = {!user.message || !user.email}/>
            </View>
        : null
        }
      </Modal>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:150,
    },
    container2:{
      flex: 5, 
      //minWidth: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container3: {
        flexDirection: "row",
        marginLeft: 20, 
        justifyContent: 'space-evenly', 
        padding: 10
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
        fontWeight: 'bold',
    },
    image:{
      width: 80, 
      height: 80, 
      resizeMode: 'cover', 
      margin:10
    },
    bottomModalView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modal: {
      width: "100%",
      height: "30%",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderStyle: 'solid',
      backgroundColor: "white"
    },
    modalText: {
      fontSize: 20
    }
  });

export default ParkDetails;