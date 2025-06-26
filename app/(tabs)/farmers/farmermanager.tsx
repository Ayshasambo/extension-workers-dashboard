import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { usePostData } from '@/hooks/usePostData';
import AppButton from '@/components/AppButton'; 
import { COLORS } from '@/constants/theme';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';



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
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [nationalIdNumber, setNationalIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [districtId, setDistrictId] = useState('');
  const [role, setRole] = useState('farmer');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { mutate, isPending, isSuccess, isError } = usePostData<any, farmers>('/farmers');

  useEffect(() => {
    axios.get('https://l-press-backend.onrender.com/districts')
      .then((res) => {
        setDistricts(res.data);
        // Format districts for the dropdown
        const dropdownItems = res.data.map((district: District) => ({
          label: district.name,
          value: district._id
        }));
        setItems(dropdownItems);
      })
      .catch((err) => console.error('Failed to fetch districts:', err));
  }, []);

  // const handleSave = () => {
  //   mutate({
  //     //id,
  //     fullName,
  //     gender,
  //     dateOfBirth,
  //     phone,
  //     nationalIdNumber,
  //     email,
  //     district: districtId,
  //     role
  //   });
  // };
  
  const handleSave = async () => {
    const requiredFields = [
      { key: fullName, label: 'Full name' },
      { key: gender, label: 'Gender' },
      { key: dateOfBirth, label: 'Date of birth' },
      { key: phone, label: 'Phone number' },
      { key: nationalIdNumber, label: 'National ID Number' }
    ];
  
    for (const field of requiredFields) {
      if (!field.key || field.key.toString().trim() === '') {
        Alert.alert('Validation Error', `${field.label} is required.`);
        return;
      }
    }  
    const formData: farmers = {
      fullName,
      gender,
      dateOfBirth:dateOfBirth!.toISOString(),
      phone,
      nationalIdNumber,
      email,
      district: districtId,
      role
    };
  
    const netState = await NetInfo.fetch();
  
    if (netState.isConnected) {
      mutate(formData);
    } else {
      try {
        await AsyncStorage.setItem('@unsynced_farmer', JSON.stringify(formData));
        Alert.alert('Offline', 'Data saved locally. It will be synced when network is available.');
      } catch (error) {
        Alert.alert('Error', 'Failed to save data locally.');
      }
    }
  };
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const stored = await AsyncStorage.getItem('@unsynced_farmer');
        if (stored) {
          const parsed = JSON.parse(stored);
          mutate(parsed, {
            onSuccess: () => {
              AsyncStorage.removeItem('@unsynced_farmer');
              Alert.alert('Success', 'Offline data synced successfully.');
            }
          });
        }
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput 
          style={styles.input} 
          value={fullName} 
          onChangeText={setFullName} 
          placeholder="Enter farmer's full name"
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Gender *</Text>
        <DropDownPicker
          open={genderOpen}
          value={gender}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGender}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          placeholder="Select gender"
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth (YYYY-MM-DD) *</Text>
        <TextInput 
          style={styles.input} 
          value={dateOfBirth} 
          onChangeText={setDateOfBirth} 
          placeholder="YYYY-MM-DD" 
          //keyboardType="phone-pad"
        />
      </View>      */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth *</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, { justifyContent: 'center' }]}
        >
          <Text>
            {dateOfBirth ? dateOfBirth.toDateString() : 'Select date of birth'}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth || new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput 
          style={styles.input} 
          value={phone} 
          onChangeText={setPhone} 
          placeholder="Enter phone number" 
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>National ID Number (NIN) *</Text>
        <TextInput 
          style={styles.input} 
          value={nationalIdNumber} 
          onChangeText={setNationalIdNumber} 
          placeholder="Enter NIN"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          placeholder="Enter email address (optional)"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>District</Text>
        <DropDownPicker
          open={open}
          value={districtId}
          items={items}
          setOpen={setOpen}
          setValue={setDistrictId}
          setItems={setItems}
          placeholder="Select District (Optional)"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>

      <AppButton
        label={isPending ? 'Saving...' : isSuccess ? 'Saved ✅' : 'Submit'}
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
    marginTop: 20,
    paddingBottom: 200
  },
  inputContainer: {
    marginBottom: 15,
    zIndex: 1,
  },
  dropdownContainer: {
    marginBottom: 15,
    zIndex: 3000,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
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
  dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#F7F7FA',
  },
  dropdownList: {
    backgroundColor: '#F7F7FA',
    borderColor: '#ccc',
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
    textAlign: 'center',
  },
  
});
