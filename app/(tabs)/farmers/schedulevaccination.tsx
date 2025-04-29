// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { MaterialIcons } from '@expo/vector-icons';
// import DropDownPicker from 'react-native-dropdown-picker';

// export default function ScheduleVaccination() {
//   const router = useRouter();
//   const { disease } = useLocalSearchParams();

//   const [vaccinationDate, setVaccinationDate] = useState<Date | null>(null);
//   const [nextVaccinationDate, setNextVaccinationDate] = useState<Date | null>(null);
//   const [vaccinationType, setVaccinationType] = useState('');
//   const [treatmentHistory, setTreatmentHistory] = useState('');

//   const [showDatePicker1, setShowDatePicker1] = useState(false);
//   const [showDatePicker2, setShowDatePicker2] = useState(false);

//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Initial', value: 'initial' },
//     { label: 'Booster', value: 'booster' },
//     { label: 'Follow-up', value: 'followup' },
//   ]);

//   const handleSubmit = () => {
//     const payload = {
//       disease,
//       vaccinationDate,
//       nextVaccinationDate,
//       vaccinationType: value,
//       treatmentHistory,
//     };
//     console.log('Submitting:', payload);
//     // Here you'd call your backend API to save the form
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Schedule Vaccination for {disease}</Text>

//       <Text style={styles.label}>Vaccination Date</Text>
//       <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker1(true)}>
//         <Text>{vaccinationDate ? vaccinationDate.toDateString() : 'Select Date'}</Text>
//         <MaterialIcons name="calendar-today" size={20} color="#4CAF50" />
//       </TouchableOpacity>
//       {showDatePicker1 && (
//         <DateTimePicker
//           value={vaccinationDate || new Date()}
//           mode="date"
//           display="default"
//           onChange={(event, date) => {
//             setShowDatePicker1(false);
//             if (date) setVaccinationDate(date);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Next Vaccination Date</Text>
//       <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker2(true)}>
//         <Text>{nextVaccinationDate ? nextVaccinationDate.toDateString() : 'Select Date'}</Text>
//         <MaterialIcons name="calendar-today" size={20} color="#4CAF50" />
//       </TouchableOpacity>
//       {showDatePicker2 && (
//         <DateTimePicker
//           value={nextVaccinationDate || new Date()}
//           mode="date"
//           display="default"
//           onChange={(event, date) => {
//             setShowDatePicker2(false);
//             if (date) setNextVaccinationDate(date);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Vaccination Type</Text>
//       <DropDownPicker
//         open={openDropdown}
//         value={value}
//         items={items}
//         setOpen={setOpenDropdown}
//         setValue={setValue}
//         setItems={setItems}
//         placeholder="Select vaccination type"
//         style={styles.dropdown}
//         dropDownContainerStyle={{ borderColor: '#ccc' }}
//       />

//       <Text style={styles.label}>Treatment History</Text>
//       <TextInput
//         multiline
//         numberOfLines={4}
//         style={styles.textArea}
//         value={treatmentHistory}
//         onChangeText={setTreatmentHistory}
//         placeholder="Enter treatment history..."
//       />

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   label: {
//     marginTop: 10,
//     marginBottom: 5,
//     fontWeight: '600',
//     color: '#333',
//   },
//   dateInput: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   dropdown: {
//     borderColor: '#ccc',
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 100,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 10,
//     textAlignVertical: 'top',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   submitText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
