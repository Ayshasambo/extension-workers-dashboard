import React, { useState } from 'react';
import {View, Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Switch} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import AppButton from '@/components/AppButton'; 
import { COLORS } from '@/constants/theme';
import { usePostData } from '@/hooks/usePostData';
import { useData } from '@/hooks/useData';

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
  //const [farmer, setFarmer] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null); 
  const [isInBreedingCycle, setIsInBreedingCycle] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  const { mutate, isPending, isSuccess, isError } = usePostData<any, Animals>('/animals');
  const { data: farmers = [] } = useData<Farmer[]>('/farmers');

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
      {/* <TextInput style={styles.input} placeholder="Farmer's name" value={farmer} onChangeText={setFarmer} /> */}
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedFarmer}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedFarmer(itemValue)}
      >
        <Picker.Item label="Select a farmer" value={null} />
        {farmers.map((farmer: Farmer) => ( 
          <Picker.Item key={farmer._id} label={farmer.fullName} value={farmer._id} />
        ))}
      </Picker>
      </View>
      <TextInput style={styles.input} placeholder="Livestock" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="Breed" value={breed} onChangeText={setBreed} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Health Status" value={healthStatus} onChangeText={setHealthStatus} />
      <TextInput style={styles.input} placeholder="Identifier" value={identifier} onChangeText={setIdentifier} />
      <TextInput style={styles.input} placeholder="Vaccination History (comma-separated)" value={vaccinationHistory} onChangeText={setVaccinationHistory} />
      <TextInput style={styles.input} placeholder="Health Issues (comma-separated)" value={healthIssues} onChangeText={setHealthIssues} />
      <TextInput style={styles.input} placeholder="Expected Breeding Date (YYYY-MM-DD)" value={expectedBreedingDate} onChangeText={setExpectedBreedingDate} />
      <TextInput style={styles.input} placeholder="Next Vaccination Date (YYYY-MM-DD)" value={nextVaccinationDate} onChangeText={setNextVaccinationDate} />
      <TextInput style={styles.input} placeholder="Last Health Check Date (YYYY-MM-DD)" value={lastHealthCheckDate} onChangeText={setLastHealthCheckDate} />
      <TextInput style={styles.input} placeholder="Region" value={region} onChangeText={setRegion} />

      <View style={styles.switchContainer}>
        <Text>In Breeding Cycle:</Text>
        <Switch value={isInBreedingCycle} onValueChange={setIsInBreedingCycle} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Is Vaccinated:</Text>
        <Switch value={isVaccinated} onValueChange={setIsVaccinated} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Is Alive:</Text>
        <Switch value={isAlive} onValueChange={setIsAlive} />
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Saving...' : isSuccess ? 'Saved ✅' : 'Submit'}</Text>
      </TouchableOpacity> */}
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
    paddingBottom: 100,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#168543',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

