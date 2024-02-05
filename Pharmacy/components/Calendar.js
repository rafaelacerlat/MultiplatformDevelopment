import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import pharmaciesData from '../data.json';
import CustomButton from './CustomButton';
import { getSchedule } from '../service';


const Calendar = (
    {
        selectedStartDate, setSelectedStartDate,
        selectedEndDate=null, setSelectedEndDate=null,
        rangeSelection=false,
        switchRequest=false
    }
) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dates, setSchedule] = useState({});

    useEffect(() => {
        getSchedule(setSchedule)
    }, []);

    const onDateChangePickRange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
        setSelectedEndDate(date);
    } else {
        setSelectedEndDate(null);
        setSelectedStartDate(date);
    }
    };

    const onDateChange = (date) => {
        setSelectedStartDate(date);
        setModalVisible(true);
    }

    const returnPharmacyInfo = () => {
    for (let pd of pharmaciesData) {
        if (pd.date === formatDate( !selectedEndDate ? selectedStartDate : selectedEndDate )) {
            if (switchRequest){
             return (<>
                <Text>Name: {JSON.stringify(pd.name)}</Text>
                <Text>Email: {JSON.stringify(pd.email)}</Text>
                <Text>Address: {JSON.stringify(pd.address)}</Text>
                <Text>Date: {JSON.stringify(pd.date)}</Text>
                <Text>Hours: {JSON.stringify(pd.hours)}</Text>

                <CustomButton
                    title={'Request Exchange'}
                    onPress={() => {}}
                />
                </>)
            } 
            else
             return JSON.stringify(pd)
        }
    }

    // dates.forEach(doc => {
    //     console.log(doc.data());
    // })


    }

    const formatDate = date => {
        let actualDate = new Date(date);
        let day = actualDate.getDate();
        let month = actualDate.getMonth() + 1;
        let year = actualDate.getFullYear();
        return day + '/' + month + '/' + year;
    };

    return(
    <>
        <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={rangeSelection}
            minDate={new Date()}
            maxDate={new Date(2050, 6, 3)}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={rangeSelection ? onDateChangePickRange : onDateChange}
        />
        
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.pressable}
            >
                <View style={styles.modalView}>
                    <Text>{returnPharmacyInfo()}</Text>
                    
                </View>
            </Pressable>
        </Modal>
    </>   
    )
}

const styles = StyleSheet.create({
    pressable: {
        width: '100%',
        height: '100%'
    },
    modalView: {
        position: 'absolute',
        left: '10%',
        top: '35%',
        width: '80%',
        height: '30%',
        backgroundColor: '#d1d1d1',
        padding: 20,
        flex: 5
    }
});

export default Calendar;
