import {
    View, TouchableOpacity, Text, StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';

const Request = () => {
    return(
        <View style={{
            width: '100%',
            height: '20%',
            backgroundColor: 'gray',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
        
        <Text>Farmácia Confiança wants to change dates with you</Text>

            <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' , padding:10}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.rejectButton}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      acceptButton: {
        color: '#147312',
        fontSize: 16,
        fontWeight: 'bold',
      },
      rejectButton: {
        color: '#801c11',
        fontSize: 16,
        fontWeight: 'bold',
      }
});


export default Request;