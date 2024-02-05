import React, { useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Calendar from '../components/Calendar';
import CustomButton from '../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';

const PickRangeScreen = ({navigation}) => {
    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();

    const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
        const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
        });
        setFileResponse(response);
        } catch (err) {
        console.warn(err);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={{paddingHorizontal: 50}}>
                <Calendar
                    selectedStartDate={selectedStartDate}
                    setSelectedStartDate={setSelectedStartDate}
                    selectedEndDate={selectedStartDate}
                    setSelectedEndDate={setSelectedEndDate}
                    rangeSelection={true}
                />
            </View>
            <View>
                <Text>SELECTED START DATE: {selectedStartDate ? selectedStartDate.toString() : ''}</Text>
                <Text>SELECTED END DATE: {selectedEndDate ? selectedEndDate.toString() : ''}</Text>
            </View>
            <View style={{marginTop: 20, flex: 1, justifyContent: 'space-evenly'}}>
                <CustomButton
                    title={'Upload File'}
                    onPress={handleDocumentSelection}
                />
                <CustomButton
                    title={'Download File'}
                    onPress={() => {}}
                />
            </View>
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

export default PickRangeScreen;
