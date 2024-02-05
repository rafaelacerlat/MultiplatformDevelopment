import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import DocumentPicker from 'react-native-document-picker';
import Calendar from './Calendar';
import CustomButton from './CustomButton';

const AdminServiceDistribution = ({navigation}) => {
  // const handleFileUpload = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log(
  //       `Selected file ${result.name} with type ${result.type} and size ${result.size}`
  //     );
  //   } catch (error) {
  //     console.log('Error picking file:', error);
  //   }
  // };
  const [selectedDate, setSelectedDate] = useState();

  return (
    
    <View style={styles.container}>
      <Calendar
        selectedStartDate={selectedDate}
        setSelectedStartDate={setSelectedDate}
      />
      <View style={{marginTop: 20}}>
        <CustomButton title={'Pick Range'} onPress={() => navigation.navigate('PickRange')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default AdminServiceDistribution;
