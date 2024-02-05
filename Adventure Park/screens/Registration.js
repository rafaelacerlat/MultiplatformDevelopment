import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Platform } from 'react-native';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {app, db} from '../Firebase.config.js';
import ImagePickerExample from '../components/ImagePickerExample.js';
import { doc, setDoc, onSnapshot} from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { validateUserData } from '../utils/Validator.js';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';

const Registration = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [isFocus, setIsFocus] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {
      const subscriber = onSnapshot(doc(db, "appData", "citiesList"), (doc) => setCities(doc.data().cities));
      return () => {subscriber};
    }, []);

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);


    const toggleDatePicker = () => {
      setShowPicker(!showPicker);
    }

    const onChangePicker = ({type}, selectedDate) => {
      if( type == "set"){
        const currentDate = selectedDate;
        setDate(currentDate);

        if(Platform.OS === "android"){
          toggleDatePicker();
          setDateOfBirth(formatDate(currentDate));
        }

      }else{
        toggleDatePicker();
      }
    }

    const confirmIOSDate = () => {
      setDateOfBirth(formatDate(date));
      toggleDatePicker();
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        if (month.length == 1)
            month = '0' + month;
        let day = date.getDate();

      return `${year}-${month}-${day}`;
    }

    const renderItem = item => {
      return (
          <View >
              <Text >{item.label}</Text>
          </View>
      );
  };

    const createNewUser = async () => {
      const docRef = doc(db, 'users', email);
      // Create user data document.
      await setDoc(docRef, {
          name: name,
          surname: surname,
          username: username,
          dateOfBirth: dateOfBirth,
          street: street,
          city: city,
          postcode: postalCode,
          email: email
      });
  };

  const createUserWishlist = async () => {
    const docRef = doc(db, 'wishlist', email);
    // Create user wislisht document.
    await setDoc(docRef, {
      activities_id: []
    });
};
  

  const handleRegister = async (validityOutput) => {
    if (validityOutput.length === 0) {
        
            const auth = getAuth(app); 
            await createUserWithEmailAndPassword(auth, email?.trim(), password?.trim())
            .then( _ => {
              //Send email verification link
              sendEmailVerification(auth.currentUser)
              .then(async _ => {
                  await createNewUser();
                  await createUserWishlist();
                  //navigation.navigate('Login');
              })
            }
              
              )
              .catch((error)=>{
                switch(error.code) { 
                      case'auth/email-already-in-use': alert("Email already in use"); break; 
                      default: alert(error);
                    }
              });
          } else {
            alert(validityOutput.join("\n"));
      }
  };

  const getTrimmed = () => {
    return {
        name: name?.trim(),
        username: username?.trim(),
        surname: surname?.trim(),
        street: street?.trim(),
        city: city?.trim(),
        postcode: postalCode?.trim(),
        email: email?.trim(),
        password: password?.trim(),
    };
  };

      return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Register</Text>

          <ImagePickerExample/>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

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

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
          />

          {showPicker && (
            <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChangePicker}
            style={styles.datePickerStyle}
          />
          )}

          {showPicker && Platform.OS === "ios" && (
            <View 
            style={{flexDirection: "row",
            justifyContent: "space-around"}}
            >
              <TouchableOpacity onPress={toggleDatePicker}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmIOSDate}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            
          </View>
          )}
        
        {!showPicker && (
          <Pressable
          onPress={toggleDatePicker}
        >
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
        )}
          

          <TextInput
            style={styles.input}
            placeholder="Street"
            value={street}
            onChangeText={setStreet}
          />

        
              {/* <Picker
                mode= "dropdown"
                selectedValue={city}
                onValueChange={setCity}
                style={{ height: 54, marginTop: 10 }}
              >
               <Picker.Item key='' label='City' value={null} enabled={false}/>
              {cities.map(item => {
                  return (<Picker.Item label={item} value={item} key={item}/>) 
              })}
              </Picker> */}

{/* <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={cities}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'City' : '...'}
          value={city}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCity(item.value);
            setIsFocus(false);
          }}
        /> */}

           
              
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
            

         

        <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
          />

          <View style={styles.buttonContainer}>
            <Button 
            title="Register" 
            color="#fff"
            onPress={ async () => {
              let trimmedData = getTrimmed();
              let validityOutput = await validateUserData(
                  trimmedData?.name, 
                  trimmedData?.surname, 
                  trimmedData?.username, 
                  dateOfBirth, 
                  trimmedData?.street,
                  trimmedData?.city,
                  trimmedData?.postcode,
                  trimmedData?.email,
                  trimmedData?.password
                );
              handleRegister(validityOutput);
              } 
            }
            />
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
    datePickerStyle: {
      height: 120,
      marginTop: -10,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
export default Registration;