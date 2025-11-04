import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
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
  const [affectedPlaces, setAffectedPlaces] = useState<string[]>([]);
  const [type, settype] = useState('');
  const [diseasesName, setdiseasesName] = useState('');
  const [severity, setseverity] = useState('');
  const [status, setStatus] = useState('');
  const [category, setcategory] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const { mutate, isPending, isSuccess, isError } = usePostData<any, notifications>('/alerts');
  
  const { data: user } = useData<{ _id: string }>('/alerts/users');
  const alertTypeOptions = [
    { label: 'Danger', value: 'Danger' },
    { label: 'Disease', value: 'Disease' },
    { label: 'Disaster', value: 'Disaster' },
  ];
  const severityOptions = [
    { label: 'High', value: 'high' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Low', value: 'low' },
  ];
  const livestockOptions = [
    { label: 'Cattle', value: 'Cattle' },
    { label: 'Goats', value: 'Goats' },
    { label: 'Sheep', value: 'Sheep' },
    { label: 'Poultry (Chicken)', value: 'Poultry' },
    { label: 'Pigs', value: 'Pigs' },
    { label: 'Fish', value: 'Fish' },
    { label: 'Rabbits', value: 'Rabbits' },
  ];
  const abujaLgaOptions = [
    { label: 'Abaji', value: 'Abaji' },
    { label: 'Abuja Municipal (AMAC)', value: 'Abuja Municipal' },
    { label: 'Bwari', value: 'Bwari' },
    { label: 'Gwagwalada', value: 'Gwagwalada' },
    { label: 'Kuje', value: 'Kuje' },
    { label: 'Kwali', value: 'Kwali' },
  ];
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
        affectedPlaces,
        type: type.toLowerCase(),
        diseasesName: diseasesName.split(',').map(d => d.trim()).filter(Boolean),
        severity: severity.toLowerCase() as 'high' | 'moderate' | 'low',
        status: 'active',
        category,
        informerId: currentUser.id,
      },
      {
        onSuccess: () => {
          console.log('✅ Alert submitted successfully');
          // Clear form fields after successful submit
          setdescription('');
          setAffectedPlaces([]);
          settype('');
          setdiseasesName('');
          setseverity('');
          setStatus('active');
          setcategory('');
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Alert type</Text>
      <Dropdown
        style={styles.input}
        data={alertTypeOptions}
        labelField="label"
        valueField="value"
        placeholder="Select alert type"
        value={type}
        onChange={(item: any) => settype(item.value)}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={diseasesName} onChangeText={setdiseasesName} placeholder="Name of disease" />


      <Text style={styles.label}>Affected places</Text>
      <MultiSelect
        style={styles.input}
        data={abujaLgaOptions}
        labelField="label"
        valueField="value"
        placeholder="Select affected LGAs"
        value={affectedPlaces}
        onChange={(items: any) => setAffectedPlaces(items)}
      />
      {/* <TextInput style={styles.input} value={severity} onChangeText={setseverity} placeholder="Select severity" /> */}
      
      <Text style={styles.label}>Livestock Category</Text>
      <Dropdown
        style={styles.input}
        data={livestockOptions}
        labelField="label"
        valueField="value"
        placeholder="Select livestock category"
        value={category}
        onChange={(item: any) => setcategory(item.value)}
      />

      {/* <Text style={styles.label}>Status</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder="Status" /> */}

      <Text style={styles.label}>Severity</Text>
      <Dropdown
        style={styles.input}
        data={severityOptions}
        labelField="label"
        valueField="value"
        placeholder="Select severity"
        value={severity}
        onChange={(item: any) => setseverity(item.value)}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
        value={description}
        onChangeText={setdescription}
        placeholder="Description"
        multiline
        numberOfLines={3}
      />
      
      <AppButton
        label={isPending ? 'Submitting...' : isSuccess ? 'Submitted ' : 'Submit'}
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
    marginTop:20,
    paddingBottom: 500,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
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
