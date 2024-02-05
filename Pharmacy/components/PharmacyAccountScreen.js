import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState , useEffect} from 'react';
import Calendar from "./Calendar";
import CalendarPicker from "react-native-calendar-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserData } from "../service";

const PharmacyAccountScreen = ({navigation})  => { 

    const [selectedDate, setSelectedDate] = useState();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData(setUserData)
    }, []);

    return(
        <View style={styles.container}>
            <View style={{marginLeft:'80%', marginBottom:40}}>
            <TouchableOpacity onPress={() => {}}>
                <Icon name="options" size={24} style={{ position: 'absolute', right: 0 }} />
            </TouchableOpacity>
            </View>

            <Image style={{width: 100, height: 100, borderRadius: 75}}
                    source={require('../assets/logo.png')}/>

            <View style={{padding: 10}}>
                <Text style={{ fontSize: 10}}>{userData.phone}</Text>
                <Text style={{ fontSize: 10}}>{userData.address}</Text>
            </View>

            <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' , padding:10}}>
                <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('EditProfile')} >
                <Text style={styles.text}> Edit profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                <Text style={styles.text}> Change Access Credentials</Text>
                </TouchableOpacity>
            </View>

            <View style={{padding:30}}>
            <CalendarPicker
            startFromMonday={true}
            minDate={new Date()}
            maxDate={new Date(2050, 6, 3)}
            todayBackgroundColor="#f2e6ff"
            markedDates={{
                "2023-06-15": { selected: true, marked: true, selectedColor: "blue" },
                "2023-06-25": { selected: true, marked: true, selectedColor: "blue" }
                }}
            />
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
  });

export default PharmacyAccountScreen;