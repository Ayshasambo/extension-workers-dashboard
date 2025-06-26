import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {View, Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Switch,Alert,Pressable, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AppButton from '@/components/AppButton'; 
import { COLORS } from '@/constants/theme';
import { usePostData } from '@/hooks/usePostData';
import { useData } from '@/hooks/useData';
import DropDownPicker from 'react-native-dropdown-picker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


interface Farmer {
  _id: string;
  fullName: string;
}

interface Animals{
  type: string;
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  farmer: string;
  identifier: string;
  vaccinationHistory: string[];
  isInBreedingCycle: boolean;
  expectedBreedingDate: string;
  isVaccinated: boolean;
  nextVaccinationDate: string;
  lastHealthCheckDate: string;
  healthIssues: string[];
  isAlive: boolean;
  region: string;
}

export default function LivestockManager() {
  const { id } = useLocalSearchParams();
  const farmerId = Array.isArray(id) ? id[0] : id;
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [vaccinationHistory, setVaccinationHistory] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [expectedBreedingDate, setExpectedBreedingDate] = useState<Date | null>(null);
  const [nextVaccinationDate, setNextVaccinationDate] = useState<Date | null>(null);
  const [lastHealthCheckDate, setLastHealthCheckDate] = useState<Date | null>(null);
  //const [showDatePicker, setShowDatePicker] = useState(false);
  const [region, setRegion] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null); 
  const [isInBreedingCycle, setIsInBreedingCycle] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [showExpectedDatePicker, setShowExpectedDatePicker] = useState(false);
  const [showNextVaccinationPicker, setShowNextVaccinationPicker] = useState(false);
  const [showLastHealthCheckPicker, setShowLastHealthCheckPicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const { mutate, isPending, isSuccess, isError } = usePostData<any, Animals>('/animals');
  const { data: farmers = [] } = useData<Farmer[]>('/farmers');

  React.useEffect(() => {
    const dropdownItems = farmers.map((farmer) => ({
      label: farmer.fullName,
      value: farmer._id
    }));
    console.log("Dropdown items count:", dropdownItems.length); // should be 10
    setItems(dropdownItems);
  }, [farmers]);

  // const handleSave = async () => {
  //   const formData: Animals = {
  //     type,
  //     breed,
  //     age: Number(age),
  //     weight: Number(weight),
  //     healthStatus,
  //     farmer: selectedFarmer!, 
  //     identifier,
  //     vaccinationHistory: vaccinationHistory.split(',').map(s => s.trim()),
  //     isInBreedingCycle,
  //     expectedBreedingDate:new Date(expectedBreedingDate).toISOString(),
  //     isVaccinated,
  //     nextVaccinationDate:new Date(nextVaccinationDate).toISOString(),
  //     lastHealthCheckDate:new Date(lastHealthCheckDate).toISOString(),
  //     healthIssues: healthIssues.split(',').map(s => s.trim()),
  //     isAlive,
  //     region,
  //   };
  //   console.log('Form Data:', formData);
  //   const netState = await NetInfo.fetch();
  
  //   if (netState.isConnected) {
  //     mutate(formData, {
  //       onError: (error: any) => {
  //         console.log("Error saving animal:", error?.response?.data || error.message || error);
  //         Alert.alert("Failed to save", "Please try again.");
  //       },
  //       onSuccess: () => {
  //         console.log("Animal saved successfully!");
  //         Alert.alert("Success", "Animal saved successfully!");
  //       }
  //     });
  //   }
  // };
  
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(async state => {
  //     if (state.isConnected) {
  //       const stored = await AsyncStorage.getItem('@unsynced_animal');
  //       if (stored) {
  //         const parsed = JSON.parse(stored);
  //         mutate(parsed, {
  //           onSuccess: () => {
  //             AsyncStorage.removeItem('@unsynced_animal');
  //             Alert.alert('Success', 'Offline data synced successfully.');
  //           }
  //         });
  //       }
  //     }
  //   });
  
  //   return () => unsubscribe(); // cleanup
  // }, []);
  

  const handleSave = () => {
    if (!selectedFarmer) {
      alert("Please select a farmer.");
      return;
    }
    const requiredFields = [
      { key: type, label: 'Livestock Type' },
      { key: breed, label: 'Breed' },
      { key: age, label: 'Age (in months)' },
      { key: weight, label: 'Weight (in kg)' },
      { key: healthStatus, label: 'Health Status' },
      { key: identifier, label: 'Identifier' },
      { key: vaccinationHistory, label: 'Vaccination history' },
      //{ key: isInBreedingCycle, label: 'Is in Breeding Cycle' },
      { key: expectedBreedingDate, label: 'Expected Breeding Date' },
      { key: isVaccinated, label: 'Is vaccinated' },
      { key: nextVaccinationDate, label: 'Next Vacccination Date' },
      { key: lastHealthCheckDate, label: 'Last Health Check Date' },
      { key: healthIssues, label: 'Health Issues' },
      //{ key: isAlive, label: 'is Alive' },
      { key: region, label: 'Location' }
    ];
  
    for (const field of requiredFields) {
      if (!field.key || field.key.toString().trim() === '') {
        Alert.alert('Validation Error', `${field.label} is required.`);
        return;
      }
    }  
    const payload = {
      type:type.trim(),
      breed:breed.trim(),
      age: Number(age),
      weight: Number(weight),
      healthStatus:healthStatus.trim(),
      farmer: selectedFarmer,
      identifier:identifier.trim(),
      vaccinationHistory: vaccinationHistory.split(',').map(s => s.trim()),
      isInBreedingCycle,
      expectedBreedingDate: expectedBreedingDate!.toISOString(),
      isVaccinated,
      nextVaccinationDate: nextVaccinationDate!.toISOString(),
      lastHealthCheckDate: lastHealthCheckDate!.toISOString(),
      healthIssues: healthIssues.split(',').map(s => s.trim()),
      isAlive,
      region:region.trim(),
    };
  
    console.log("🚀 Submitting payload:", JSON.stringify(payload, null, 2));
    mutate(payload, {
      onError: (error: any) => {
        console.error("Full error response:", error);
        console.error("API Error:", error?.response?.data || error.message);
        Alert.alert("Failed", "Something went wrong.");
      },
      
    });
  
    
    // mutate({
    //   type,
    //   breed,
    //   age: Number(age),
    //   weight: Number(weight),
    //   healthStatus,
    //   farmer: selectedFarmer, 
    //   identifier,
    //   vaccinationHistory: vaccinationHistory.split(',').map(s => s.trim()),
    //   isInBreedingCycle,
    //   expectedBreedingDate:expectedBreedingDate!.toISOString(),
    //   isVaccinated,
    //   nextVaccinationDate:nextVaccinationDate!.toISOString(),
    //   lastHealthCheckDate:lastHealthCheckDate!.toISOString(),
    //   healthIssues: healthIssues.split(',').map(s => s.trim()),
    //   isAlive,
    //   region,
    // }, {
    //   onError: (error: any) => {
    //     console.error("API Error:", error?.response?.data || error.message);
    //     alert("Failed to save. Please try again.");
    //   },
    //   onSuccess: () => {
    //     console.log("Livestock saved successfully!");
    //   }
    // });
  };

  const handleDateChange = (
    selectedField: 'expected' | 'vaccination' | 'health',
    event: any,
    selectedDate?: Date
  ) => {
    if (!selectedDate) return;
  
    switch (selectedField) {
      case 'expected':
        setShowExpectedDatePicker(false);
        setExpectedBreedingDate(selectedDate);
        break;
      case 'vaccination':
        setShowNextVaccinationPicker(false);
        setNextVaccinationDate(selectedDate);
        break;
      case 'health':
        setShowLastHealthCheckPicker(false);
        setLastHealthCheckDate(selectedDate);
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginBottom: 20, zIndex: 2000}}>
        <Text style={styles.label}>Select Farmer *</Text>
        <DropDownPicker
          open={open}
          value={selectedFarmer}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedFarmer}
          setItems={setItems}
          placeholder="Select a farmer"
          style={styles.dropdown}
          dropDownContainerStyle={{ borderColor: '#ccc',
          borderRadius: 8,
          maxHeight: 800,
          zIndex: 3000,}} 
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          zIndex={3000} // ensures dropdown is on top
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Livestock Type *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter livestock type" 
          value={type} 
          onChangeText={setType} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter breed" 
          value={breed} 
          onChangeText={setBreed} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age (in months) *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter age" 
          value={age} 
          onChangeText={setAge} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (in kg) *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter weight" 
          value={weight} 
          onChangeText={setWeight} 
          keyboardType="numeric" 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Health Status *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter health status" 
          value={healthStatus} 
          onChangeText={setHealthStatus} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Identifier/Tag Number *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter identifier" 
          value={identifier} 
          onChangeText={setIdentifier} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vaccination History</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter vaccination history (comma-separated)" 
          value={vaccinationHistory} 
          onChangeText={setVaccinationHistory}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Health Issues</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter health issues (comma-separated)" 
          value={healthIssues} 
          onChangeText={setHealthIssues}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expected Breeding Date</Text>
        <Pressable
          onPress={() => setShowExpectedDatePicker(true)}
          style={[styles.input, { justifyContent: 'center' }]}
        >
          <Text>{expectedBreedingDate ? expectedBreedingDate.toDateString() : 'Select date'}</Text>
        </Pressable>
        {showExpectedDatePicker && (
          <DateTimePicker
            value={expectedBreedingDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(e, date) => handleDateChange('expected', e, date)}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Next Vaccination Date</Text>
        <Pressable
          onPress={() => setShowNextVaccinationPicker(true)}
          style={[styles.input, { justifyContent: 'center' }]}
        >
          <Text>{nextVaccinationDate ? nextVaccinationDate.toDateString() : 'Select date'}</Text>
        </Pressable>
        {showNextVaccinationPicker && (
          <DateTimePicker
            value={nextVaccinationDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(e, date) => handleDateChange('vaccination', e, date)}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Health Check Date</Text>
        <Pressable
          onPress={() => setShowLastHealthCheckPicker(true)}
          style={[styles.input, { justifyContent: 'center' }]}
        >
          <Text>{lastHealthCheckDate ? lastHealthCheckDate.toDateString() : 'Select date'}</Text>
        </Pressable>
        {showLastHealthCheckPicker && (
          <DateTimePicker
            value={lastHealthCheckDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(e, date) => handleDateChange('health', e, date)}
          />
        )}
      </View>
     
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter region" 
          value={region} 
          onChangeText={setRegion} 
        />
      </View>

      <View style={styles.switchesContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>In Breeding Cycle</Text>
          <Switch 
            value={isInBreedingCycle} 
            onValueChange={setIsInBreedingCycle}
            trackColor={{ false: '#767577', true: '#36813A' }}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Is Vaccinated</Text>
          <Switch 
            value={isVaccinated} 
            onValueChange={setIsVaccinated}
            trackColor={{ false: '#767577', true: '#36813A' }}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Is Alive</Text>
          <Switch 
            value={isAlive} 
            onValueChange={setIsAlive}
            trackColor={{ false: '#767577', true: '#36813A' }}
          />
        </View>
      </View>

      <AppButton
        label={isPending ? 'Saving...' : isSuccess ? 'Saved' : 'Submit'}
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
    padding: 16,
    paddingBottom: 200,
  },
  inputContainer: {
    marginBottom: 16,
    zIndex: 1,
  },
  dropdownContainer: {
    marginBottom: 16,
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
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F7F7FA',
  },
  dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#F7F7FA',
  },
  dropdownList: {
    backgroundColor: '#F7F7FA',
    borderColor: '#ccc',
  },
  switchesContainer: {
    marginVertical: 16,
    zIndex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#F7F7FA',
    padding: 12,
    borderRadius: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

