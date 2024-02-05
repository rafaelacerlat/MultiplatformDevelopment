import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const AdminAccountScreen = ({navigation}) => {

    return(
        <View style={styles.container}>

            <Image style={{width: 100, height: 100, borderRadius: 75}}
                    source={require('../assets/logo.png')}/>

            <View style={{padding: 10}}>
                <Text style={{ fontSize: 40}}>Admin</Text>
            </View>

            <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' , padding:10}}>
                <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('ServiceDistribution')} >
                <Text style={styles.text}> Service Distribution </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                <Text style={styles.text}> Admit new pharmacies</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


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


export default AdminAccountScreen;