import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { livestockList, breeds, healthStatus, farmers} from '@/constants/dummy'
import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// const defaultImage = {img: require('./../../../assets/images/cow.jpg') }


export default function Profile() {
  const { id } = useLocalSearchParams();
  const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const farmer = farmers.find((f) => f.id === farmerId);
  const [livestock, setLivestock] = useState(livestockList[0]?.type || '');
  const [breed, setBreed] = useState(breeds[0]?.name || '');
  const [health, setHealth] = useState(healthStatus[0]?.status || '');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  
  const handleSave = () => {
    //console.log('Updated info:', { name, email, phone, lga, state });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>{farmer.title}</Text>
      </View> */}
        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={livestock}
            onValueChange={(itemValue) => setLivestock(itemValue)}
            style={styles.picker}
            >
            {livestockList.map((item, index) => (
                <Picker.Item
                key={index}
                label={item.type} 
                value={item.type} 
                />
            ))}
        </Picker>
        </View>

        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={breed}
            onValueChange={(itemValue) => setBreed(itemValue)}
            style={styles.picker}
            >
            {breeds.map((item, index) => (
                <Picker.Item
                key={index}
                label={item.name} 
                value={item.name} 
                />
            ))}
        </Picker>
        </View>

        <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Weight" />

        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={health}
            onValueChange={(itemValue) => setHealth(itemValue)}
            style={styles.picker}
            >
            {healthStatus.map((item, index) => (
                <Picker.Item
                key={index}
                label={item.status} 
                value={item.status} 
                />
            ))}
        </Picker>
        </View>

        <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" />
        

        <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    marginTop:30
  },
  titleContainer:{
     backgroundColor:'green',
     alignSelf:"center",
     color:"white",
     width:"80%",
     fontSize:16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    //marginBottom: 20,
    color:'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F7F7FA',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#F7F7FA',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    //backgroundColor: '#f9f9f9',
  },
  placeholder: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#36813A', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
