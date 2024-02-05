import { View, Image,Text, StyleSheet } from "react-native";

const FreeAccessScreen = ()  => { 
    const pharmacyInfo = {
      name: "Pharmacy",
      address: "street.ygj",
      phone: '+351989808080',
      email: "pharmacy@gmail.com",
      hours: "8:30 AM - 6:00 PM"
    }
    return(
        <View style={styles.container}>
            <Image style={{width: 80, height: 80, resizeMode: 'cover', margin:20}}
                    source={require('../assets/logo.png')}/>
            <View style={{ flex: 5, minWidth: 90 }}>
                <Text style={styles.text}> Name: {pharmacyInfo.name} </Text>
                <Text style={styles.text}> Address: {pharmacyInfo.address}</Text>
                <Text style={styles.text}> Phone: {pharmacyInfo.phone}</Text>
                <Text style={styles.text}> Email: {pharmacyInfo.email}</Text>
                <Text style={styles.text}> Hours: {pharmacyInfo.hours}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:150,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    text: {
        fontWeight: 'bold',
    }
  });

export default FreeAccessScreen;