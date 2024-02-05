import { View, Text, StyleSheet, Image, Button } from "react-native";

const OnBoarding = ({navigation})  => { 
    return(
        <View style={styles.container1}>
            
            <View style={styles.container2}>
                <Text style={styles.text1}>Welcome!</Text>
                <Text style={styles.text2}>Discover the amazing world of fun and childhood.</Text>
            </View>

            <View style={styles.container3}>
                <Button rounded color="#082567" title="Authentication" style={styles.button}
                    onPress={() => navigation.navigate('Registration')}/>
                <Button rounded color="#082567" title="Next" style={styles.button}
                    onPress={() => navigation.navigate('ParkDetails')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container2: {
        padding:10
    },
    container3: {
        flexDirection: "row",
        marginLeft: 20, 
        justifyContent: 'space-evenly', 
        padding: 10
    },
    text1: {
        fontSize: 35, 
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 20
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

export default OnBoarding;