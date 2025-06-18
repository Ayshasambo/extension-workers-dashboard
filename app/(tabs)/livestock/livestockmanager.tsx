import React, { useState } from 'react';
import axios from 'axios';
import {View, Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Switch,Alert} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AppButton from '@/components/AppButton'; 
import { COLORS } from '@/constants/theme';
import { usePostData } from '@/hooks/usePostData';
import { useData } from '@/hooks/useData';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [expectedBreedingDate, setExpectedBreedingDate] = useState('');
  const [nextVaccinationDate, setNextVaccinationDate] = useState('');
  const [lastHealthCheckDate, setLastHealthCheckDate] = useState('');
  const [region, setRegion] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null); 
  const [isInBreedingCycle, setIsInBreedingCycle] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  // Dropdown state
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const { mutate, isPending, isSuccess, isError } = usePostData<any, Animals>('/animals');
  const { data: farmers = [] } = useData<Farmer[]>('/farmers');

  // Format farmers for dropdown
  React.useEffect(() => {
    const dropdownItems = farmers.map((farmer) => ({
      label: farmer.fullName,
      value: farmer._id
    }));
    setItems(dropdownItems);
  }, [farmers]);

  const handleSave = () => {
    if (!selectedFarmer) {
      alert("Please select a farmer.");
      return;
    }
    mutate({
      type,
      breed,
      age: Number(age),
      weight: Number(weight),
      healthStatus,
      farmer: selectedFarmer, 
      identifier,
      vaccinationHistory: vaccinationHistory.split(',').map(s => s.trim()),
      isInBreedingCycle,
      expectedBreedingDate,
      isVaccinated,
      nextVaccinationDate,
      lastHealthCheckDate,
      healthIssues: healthIssues.split(',').map(s => s.trim()),
      isAlive,
      region,
    }, {
      onError: (error: any) => {
        console.error("API Error:", error?.response?.data || error.message);
        alert("Failed to save. Please try again.");
      },
      onSuccess: () => {
        console.log("Livestock saved successfully!");
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
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
          dropDownContainerStyle={styles.dropdownList}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
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
        <Text style={styles.label}>Expected Breeding Date(YYYY-MM-DD)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="YYYY-MM-DD" 
          value={expectedBreedingDate} 
          onChangeText={setExpectedBreedingDate} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Next Vaccination Date (YYYY-MM-DD)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="YYYY-MM-DD"    
          value={nextVaccinationDate}   
          onChangeText={setNextVaccinationDate} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Health Check Date (YYYY-MM-DD)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="YYYY-MM-DD" 
          value={lastHealthCheckDate} 
          onChangeText={setLastHealthCheckDate} 
        />
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

