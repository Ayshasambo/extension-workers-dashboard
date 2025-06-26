import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { usePostData } from '@/hooks/usePostData';
import { useData } from '@/hooks/useData';
import AppButton from '@/components/AppButton'; 
import { COLORS } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


  interface notifications{
    description: string;
    affectedPlaces: string[];
    type: string;
    diseasesName:string[];
    severity: 'high' | 'moderate' | 'low';
    status: string;
    category:  string;
    informerId?: string;
  }

export default function AddNotification() {
    
  const [description, setdescription] = useState('');
  const [affectedPlaces, setAffectedPlaces] = useState('');
  const [type, settype] = useState('');
  const [diseasesName, setdiseasesName] = useState('');
  const [severity, setseverity] = useState('');
  const [status, setStatus] = useState('');
  const [category, setcategory] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const { mutate, isPending, isSuccess, isError } = usePostData<any, notifications>('/alerts');
  
  const { data: user } = useData<{ _id: string }>('/alerts/users');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (!storedUser) {
          console.log('⚠️ No logged-in user found');
          return;
        }
        const user = JSON.parse(storedUser);
        console.log('👤 Loaded user:', user);
        setCurrentUser(user);
      } catch (error) {
        console.error('❌ Error fetching user:', error);
      }
    };
  
    fetchUser();
  }, []);
  

  const handleSave = () => {
    if (!currentUser || !currentUser.id) {
      console.warn('❌ Cannot submit alert: no user');
      Alert.alert('Error', 'No logged-in user found.');
      return;
    }
    console.log('📤 Submitting alert with:',
    mutate(
      {
        description,
        affectedPlaces: affectedPlaces.split(',').map(d => d.trim()).filter(Boolean),
        type,
        diseasesName: diseasesName.split(',').map(d => d.trim()).filter(Boolean),
        severity: severity.toLowerCase() as 'high' | 'moderate' | 'low',
        status,
        category,
        informerId: currentUser.id,
      },
      {
        onSuccess: () => {
          console.log('✅ Alert submitted successfully');
        },
        onError: (error: any) => {
          console.log('❌ Submission failed. Error:');
          console.log(error?.response?.data || error?.message || error);
          Alert.alert('Failed', 'Error submitting alert');
        },
      }
    ));
  
    // mutate({
    //   description,
    //   affectedPlaces: affectedPlaces.split(',').map(d => d.trim()).filter(Boolean),
    //   type,
    //   diseasesName: diseasesName.split(',').map(d => d.trim()).filter(Boolean),
    //   severity: severity.toLowerCase() as 'high' | 'moderate' | 'low',
    //   status,
    //   category,
    //   informerId: currentUser.id, // ✅ This is what you're missing
    // });
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} value={type} onChangeText={settype} placeholder="Disease type" />
      <TextInput style={styles.input} value={diseasesName} onChangeText={setdiseasesName} placeholder="Name of disease" />
      <TextInput style={styles.input} value={description} onChangeText={setdescription} placeholder="Description" />
      <TextInput style={styles.input} value={affectedPlaces} onChangeText={setAffectedPlaces} placeholder="Affected places" />
      {/* <TextInput style={styles.input} value={severity} onChangeText={setseverity} placeholder="Select severity" /> */}
      <TextInput style={styles.input} value={category} onChangeText={setcategory} placeholder="Livestock Category" />
      <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder="Status" />
      <Picker
        selectedValue={severity}
        onValueChange={(itemValue) => setseverity(itemValue)}
        style={styles.input}
        >
        <Picker.Item label="Select severity" value="" />
        <Picker.Item label="High" value="high" />
        <Picker.Item label="Moderate" value="moderate" />
        <Picker.Item label="Low" value="low" />
        </Picker>

      <AppButton
        label={isPending ? 'Saving...' : isSuccess ? 'Saved ✅' : 'Submit'}
        //label={'Submit'}
        onPress={handleSave}
        backgroundColor={COLORS.primary}
        color="#fff"
      />

       {isError && <Text style={styles.error}>Failed to save. Please try again.</Text>}
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
