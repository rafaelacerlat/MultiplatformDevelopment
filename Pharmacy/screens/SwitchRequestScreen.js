import { View, StyleSheet } from "react-native";
import Request from "../components/Request";


const SwitchRequestScreen = () => {
    return(
        <View style={styles.container}>
            <Request></Request>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SwitchRequestScreen;