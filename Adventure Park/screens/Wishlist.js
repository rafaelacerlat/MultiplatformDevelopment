import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity, Button, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { doc, updateDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase.config.js';

const Wishlist = () => {

    const [liked, setLiked] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const subscriber1 = onSnapshot(doc(db, "wishlist", "rafaelac"), (doc) => setLiked(doc.data().activities_id));

        const subscriber2 = onSnapshot(collection(db, "activities"), (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                console.log(liked);
                console.log(liked.includes(doc.id));
                if (liked.includes(doc.id)) {
                    const activities = doc.data();
                    activities["id"] = parseInt(doc.id);
                    data.push(activities);
                }
            });
            setData(data);
        });

        return () => { subscriber1(); subscriber2() };
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => { }}>
            <View>
                <ImageBackground source={require('../assets/licensed-image.png')} style={styles.image}>
                    <TouchableOpacity onPress={() => {
                        console.log(liked.includes(item.id));
                        if (liked.includes(item.id)) {
                            let unlike = liked.filter((elem) => elem !== item.id);
                            setLiked(unlike);
                        } else {
                            setLiked([...liked, item.id]);
                        }
                        console.log(liked);
                        updateWishlist(liked);
                    }
                    }>
                        <Icon name={liked.includes(item.id) ? 'heart' : 'heart-outline'} size={24} color="#fff" style={styles.wishlist} />
                    </TouchableOpacity>
                </ImageBackground>

            </View>

            <View style={styles.cardBody}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.dateTime}>{item.dateTime}</Text>
            </View>

            <View style={styles.cardFooter}>
                {item.availability !== 0
                    ? <>
                        <Text style={styles.availability}>{item.availability} places</Text>
                        <Button title="Join" />
                    </>
                    : <Text style={styles.availability}>No more available places!</Text>
                }
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>

            <FlatList
                contentContainerStyle={styles.propertyListContainer}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:60,
    },
    searchInputContainer:{
      paddingLeft:20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor:'#dcdcdc',
      backgroundColor:'#fff',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    propertyListContainer:{
      paddingHorizontal:20,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 5,
      marginTop:10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    image: {
      height: 150,
      marginBottom: 10,
      borderTopLeftRadius:5,
      borderTopRightRadius:5,
    },
    cardBody: {
      marginBottom: 10,
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5
    },
    dateTime: {
      fontSize: 16,
      marginBottom: 5
    },
    cardFooter: {
      padding: 10,
      flexDirection: 'row',
      borderTopWidth:1,
      borderTopColor:'#dcdcdc',
      justifyContent: 'space-between',
    },
    availability: {
      fontSize: 14,
      color:'#ffa500',
      fontWeight: 'bold'
    },
    joinButton: {
      fontSize: 14,
      color:'#ffa500',
      fontWeight: 'bold'
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
    },
    item:{
      width:"80%",
      backgroundColor:"#fff",
      borderRadius:20,
      padding:10,
      marginBottom:10,
      flexDirection:"row",
    },
    checkBoxTxt:{
      marginLeft:20
    },
    submit:{
      width:"80%",
      backgroundColor:"#fc5185",
      borderRadius:20,
      padding:10,
      alignItems:"center",
      marginTop:40
    },
    wishlist: {
      margin: 5,
      position: "absolute",
      top: 5,
      right: 10,
      width: 25,
      height: 25,
    }
  });

export default Wishlist;