import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity, Button, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { doc, updateDoc, getDoc, collection, onSnapshot } from "firebase/firestore";
import {db} from '../Firebase.config.js';
import { getAuth } from 'firebase/auth';

const Search = () => {

  const [data, setData] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    const subscriber1 = onSnapshot(collection(db, "activities"), (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          const activities = doc.data();
          activities["id"] = parseInt(doc.id);
          data.push(activities);
        });
        setData(data);
      });

      const subscriber2 = onSnapshot(doc(db, "wishlist", user.email), (doc) => setLiked(doc.data().activities_id));

    return () => {subscriber1(); subscriber2()};
  }, []);

  const [searchText, setSearchText] = useState('');

  const [selectedType1, setType1] = useState('');
  const [selectedType2, setType2] = useState('');
  const [selectedType3, setType3] = useState('');
  const [selectedType4, setType4] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [liked, setLiked] = useState([]);


  const handleSearch = (text) => {
    setSearchText(text);
  }

  const updateWishlist = async (liked) => {
    const bossRef = doc(db,"wishlist",user.email);
    await updateDoc(bossRef,{ "activities_id": liked})
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <View>
        <ImageBackground source={require('../assets/licensed-image.png')} style={styles.image}>
          <TouchableOpacity onPress={() => {
            var localLiked;
            console.log(liked.includes(item.id));
            if (liked.includes(item.id)) {
              localLiked = liked.filter((elem) => elem !== item.id);
            } else {
              localLiked = [...liked, item.id];
            }
            setLiked(localLiked);

            console.log(localLiked);
            updateWishlist(localLiked);
          }
            }>
            <Icon name={liked.includes(item.id) ? 'heart' : 'heart-outline'} size={24} color="#fff" style={styles.wishlist} />
          </TouchableOpacity>
        </ImageBackground>
        
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.dateTime}>{item.dateTime}</Text>
      </View>

      <View style={styles.cardFooter}>
        {item.availability !== 0
            ? <>
                <Text style={styles.availability}>{item.availability} places</Text>
                <Button title="Join"/>
              </>      
            : <Text style={styles.availability}>No more available places!</Text>
        }
      </View>   
    </TouchableOpacity>
  );

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search activities..."
          onChangeText={handleSearch}
          value={searchText}
        />
        <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                <Icon name="options" size={24} style={{ position: 'absolute', right: 0 }} />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      
      <Modal style={styles.bottomModalView} isVisible={modalVisible} backdropOpacity={0} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
              <Text > Hello </Text>
              {/* <View style={styles.item} >
                  <CheckBox value={selectedType1}  onValueChange={()=> setType1("radical")}/>
                  <Text style={styles.checkBoxTxt}
                    >Radical</Text>
              </View>
              <View style={styles.item}>
                  <CheckBox value={selectedType2}  onValueChange={()=> setType2("family")}/>
                  <Text style={styles.checkBoxTxt}
                    >For families</Text>
              </View>
              <View style={styles.item}>
                  <CheckBox value={selectedType3}  onValueChange={()=> setType3("water")}/>
                  <Text style={styles.checkBoxTxt}
                    >In Water</Text>
              </View>
              <View style={styles.item}>
                  <CheckBox value={selectedType4}  onValueChange={()=> setType4("air")}/>
                  <Text style={styles.checkBoxTxt}
                    >In Air</Text>
              </View>
              <TouchableOpacity style={styles.submit}>
                <Text style={{color:"white"}}>SAVE</Text>
              </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
  },
  searchInputContainer:{
    paddingLeft:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    backgroundColor:'#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  propertyListContainer:{
    paddingHorizontal:20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 5
  },
  // description: {
  //   fontSize: 14,
  //   marginBottom: 5,
  //   color: '#666'
  // },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth:1,
    borderTopColor:'#dcdcdc',
    justifyContent: 'space-between',
  },
  availability: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  },
  joinButton: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  },
  bottomModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    width: "100%",
    height: "30%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: "white"
  },
  modalText: {
    fontSize: 20
  },
  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },
  checkBoxTxt:{
    marginLeft:20
  },
  submit:{
    width:"80%",
    backgroundColor:"#fc5185",
    borderRadius:20,
    padding:10,
    alignItems:"center",
    marginTop:40
  },
  wishlist: {
    margin: 5,
    position: "absolute",
    top: 5,
    right: 10,
    width: 25,
    height: 25,
  }
});

export default Search;