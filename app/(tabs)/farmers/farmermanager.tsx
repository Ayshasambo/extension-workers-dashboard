import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { usePostData } from '@/hooks/usePostData';
import AppButton from '@/components/AppButton'; 
import { COLORS } from '@/constants/theme';
import axios from 'axios'


type District = {
    _id: string;
    name: string;
  };

  interface farmers{
    //_id:string
    fullName: string,
    gender: string,
    dateOfBirth: string,
    phone: string,
    nationalIdNumber: string,
    email: string,
    district: string,
    role: string
  }

export default function AddFarmer() {
    
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalIdNumber, setNationalIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [districtId, setDistrictId] = useState('');
  const [role, setRole] = useState('farmer');
  

  //const { mutate: addFarmer, isPending } = useAddFarmer();
  const { mutate, isPending, isSuccess, isError } = usePostData<any, farmers>('/farmers');

  useEffect(() => {
    axios.get('https://l-press-backend.onrender.com/districts')
      .then((res) => setDistricts(res.data))
      .catch((err) => console.error('Failed to fetch districts:', err));
  }, []);

//   const handleSave = () => {
//     if (!fullName || !gender || !dateOfBirth || !phone || !nationalIdNumber ) {
//       alert('Please fill all required fields');
//       return;
//     }

const handleSave = () => {
    mutate({
      //id,
      fullName,
      gender,
      dateOfBirth,
      phone,
      nationalIdNumber,
      email,
      district:districtId,
      role
    });
  };
    

    // addFarmer({
    //   fullName,
    //   gender,
    //   dateOfBirth,
    //   phone,
    //   nationalIdNumber,
    //   email,
    //   role,
    //   ...(districtId && { district: districtId }),
    // },
    // {
    //     onSuccess: () => {
    //       Alert.alert('Success', 'Farmer added successfully!');
    //       setFullName('');
    //       setGender('');
    //       setDateOfBirth('');
    //       setPhone('');
    //       setNationalIdNumber('');
    //       setEmail('');
    //       setDistrictId('');
    //       setRole('farmer');
    //     },
    //     onError: (error) => {
    //       console.error('Error adding farmer:', error);
    //       Alert.alert('Error', 'Failed to add farmer');
    //     }
    //   });
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full name" />
      <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Gender" />
      <View style={styles.dobIcon}>
        <MaterialIcons name="calendar-today" size={24} color="#888" style={styles.dobicon} />
        <TextInput
          style={styles.dobinput}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="Date of birth (YYYY-MM-DD)"
        />
      </View>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={nationalIdNumber} onChangeText={setNationalIdNumber} placeholder="NIN" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email (optional)" />
      
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={districtId}
        onValueChange={(itemValue) => setDistrictId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select District(Optional)" value="" />
        {districts.map((dist) => (
          <Picker.Item key={dist._id} label={dist.name} value={dist._id} />
        ))}
      </Picker>
      </View>
      <AppButton
        label={isPending ? 'Saving...' : isSuccess ? 'Saved ✅' : 'Submit'}
        onPress={handleSave}
        backgroundColor={COLORS.primary}
        color="#fff"
      />

      {isError && <Text style={styles.error}>Failed to save. Please try again.</Text>}

      {/* <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isPending}>
        <Text style={styles.buttonText}>{isPending ? 'Saving...' : 'Add Farmer'}</Text>
      </TouchableOpacity> */}
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
  error: {
    color: 'red',
    marginTop: 10,
  },
  
});
