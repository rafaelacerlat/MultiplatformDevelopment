import { View, Text, StyleSheet, Image, Button } from "react-native";

const OnBoardingScreen = ({navigation})  => { 
    return(
        <View style={styles.container}>
            <View style={{padding:10}}>
                <Image 
                style={{width: 450, height: 300}}
                source={require('../assets/pharmacy.jpg')}/>
            </View>

            <View style={{padding:10}}>
                <Text style={{fontSize:35}}>Find pharmacy near you</Text>
                <Text style={{fontSize:20}}>It's easy to find pharmacy that is near to your location. With just one tap.</Text>
            </View>

            <View style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' , padding:10}}>
                <Button rounded color="#082567" title="Pharmacy Account" style={styles.button}
                    onPress={() => navigation.navigate('Login')}/>
                <Button rounded color="#082567" title="Next" style={styles.button}
                    onPress={() => navigation.navigate('FreeAccess')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
  });

export default OnBoardingScreen;