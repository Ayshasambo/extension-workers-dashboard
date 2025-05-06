// import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import { livestockList, breeds, healthStatus, farmers} from '@/constants/dummy'
// import { Picker } from '@react-native-picker/picker';
// // import * as ImagePicker from 'expo-image-picker';
// // const defaultImage = {img: require('./../../../assets/images/cow.jpg') }



// export default function Profile() {
//   const { id } = useLocalSearchParams();
//   const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);
//   const farmer = farmers.find((f) => f.id === farmerId);
//   const [livestock, setLivestock] = useState(livestockList[0]?.type || '');
//   const [breed, setBreed] = useState(breeds[0]?.name || '');
//   const [health, setHealth] = useState(healthStatus[0]?.status || '');
//   const [age, setAge] = useState('');
//   const [weight, setWeight] = useState('');
  
//   const handleSave = () => {
//     //console.log('Updated info:', { name, email, phone, lga, state });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       {/* <View style={styles.titleContainer}>
//         <Text style={styles.title}>{farmer.title}</Text>
//       </View> */}
//         <View style={styles.pickerContainer}>
//         <Picker
//             selectedValue={livestock}
//             onValueChange={(itemValue) => setLivestock(itemValue)}
//             style={styles.picker}
//             >
//             {livestockList.map((item, index) => (
//                 <Picker.Item
//                 key={index}
//                 label={item.type} 
//                 value={item.type} 
//                 />
//             ))}
//         </Picker>
//         </View>

//         <View style={styles.pickerContainer}>
//         <Picker
//             selectedValue={breed}
//             onValueChange={(itemValue) => setBreed(itemValue)}
//             style={styles.picker}
//             >
//             {breeds.map((item, index) => (
//                 <Picker.Item
//                 key={index}
//                 label={item.name} 
//                 value={item.name} 
//                 />
//             ))}
//         </Picker>
//         </View>

//         <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Weight" />

//         <View style={styles.pickerContainer}>
//         <Picker
//             selectedValue={health}
//             onValueChange={(itemValue) => setHealth(itemValue)}
//             style={styles.picker}
//             >
//             {healthStatus.map((item, index) => (
//                 <Picker.Item
//                 key={index}
//                 label={item.status} 
//                 value={item.status} 
//                 />
//             ))}
//         </Picker>
//         </View>

//         <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" />
        

//         <TouchableOpacity style={styles.button} onPress={handleSave}>
//             <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     gap: 10,
//     marginTop:50
//   },
//   titleContainer:{
//      backgroundColor:'green',
//      alignSelf:"center",
//      color:"white",
//      width:"80%",
//      fontSize:16
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     //marginBottom: 20,
//     color:'white'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: '#F7F7FA',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginBottom: 20,
//     backgroundColor: '#F7F7FA',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   uploadField: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     height: 50,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     //backgroundColor: '#f9f9f9',
//   },
//   placeholder: {
//     marginLeft: 10,
//     color: '#999',
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#36813A', 
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

// });

import React, { useState } from 'react';
import {View, Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Switch,} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AppButton from '@/components/AppButton'; // Adjust path if needed
import { COLORS } from '@/constants/theme';
import { usePostData } from '@/hooks/usePostData';

interface Livestock{
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
  const [isInBreedingCycle, setIsInBreedingCycle] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  const { mutate, isPending, isSuccess, isError } = usePostData<any, Livestock>('/animals');

  const handleSave = () => {
    mutate({
      type,
      breed,
      age: Number(age),
      weight: Number(weight),
      healthStatus,
      farmer: farmerId,
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
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

