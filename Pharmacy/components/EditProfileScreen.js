import {View, Image, Text, TextInput,StyleSheet, Button} from 'react-native';
import React from 'react';


const EditProfileScreen = ({navigation})  => { 
    const [number, onChangeNumber] = React.useState('');
    const [text2, onChangeText2] = React.useState('');
    return(
        <View style={styles.container}>

            <Image
                style={{width: 100, height: 100, borderRadius: 75}}
                source={require('../assets/logo.png')}
            />

        <Text onPress={() => navigation.navigate()}>Edit Profile Picture</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="phone"
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
                placeholder="address"
                
            />

        <Button title="Update"/> 
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    }
)

export default EditProfileScreen;