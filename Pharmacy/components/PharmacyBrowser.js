import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';
import Calendar from './Calendar';
import React, { useState } from 'react';


const PharmacyBrowser = () => {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <View style={styles.container}>
      <Calendar
      selectedStartDate={selectedDate}
      setSelectedStartDate={setSelectedDate}
      switchRequest={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 150,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  pharmacyContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
  },
});

export default PharmacyBrowser;