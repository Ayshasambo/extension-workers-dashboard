import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { livestockList, breeds, healthStatus, farmers, workTypes} from '@/constants/dummy'
import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// const defaultImage = {img: require('./../../../assets/images/cow.jpg') }


export default function Profile() {
  const { id } = useLocalSearchParams();
  const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const farmer = farmers.find((f) => f.id === farmerId);
  const [livestock, setLivestock] = useState(livestockList[0]?.type || '');
  const [farmingtype, setFarmingtype] = useState('');
  const [nin, setNin] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [livestockcount, setLivestockcount] = useState('');
  
  const handleSave = () => {
    //console.log('Updated info:', { name, email, phone, lga, state });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>{farmer.title}</Text>
      </View> */}
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full name" />
        <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Gender" />
        {/* <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="Date of birth" /> */}
        <View style={styles.dobIcon}>
            <MaterialIcons name="calendar-today" size={24} color="#888" style={styles.dobicon} />
            <TextInput
                style={styles.dobinput}
                value={dob}
                onChangeText={setDob}
                placeholder="Date of birth"
            />
        </View>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />
        <TextInput style={styles.input} value={nin} onChangeText={setNin} placeholder="Nin" keyboardType="email-address" />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={livestock}
            onValueChange={(itemValue) => setLivestock(itemValue)}
            style={styles.picker}
          >
            {livestockList.map((item, index) => (
              <Picker.Item key={index} label={item.type} value={item.type} />
            ))}
          </Picker>
        </View>
        <TextInput style={styles.input} value={livestockcount} onChangeText={setLivestockcount} placeholder="Livestock count"  />

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
    marginTop:20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F7F7FA',
  },
  dobIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    //paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#F7F7FA',
  },
  dobicon: {
    marginRight: 8,
  },
  dobinput: {
    flex: 1,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F7F7FA',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
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
