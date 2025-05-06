// import React, { useState } from 'react';
// import {View, Text, StyleSheet,FlatList,TextInput,TouchableOpacity,Modal,Pressable} from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { farmers } from '@/constants/dummy';

// type VaccinationProps = {
//   farmerId: string; 
// };

// export default function Vaccination({ farmerId }: VaccinationProps) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const router = useRouter();
//   const farmer = farmers.find((farmer) => farmer.id === farmerId);
//   const filteredVaccination = farmer?.vaccination?.filter((animal) =>
//     animal.diseaseType.toLowerCase().includes(searchQuery.toLowerCase())
//   ) || [];
  
//   const openMenu = (index: number) => {
//     setSelectedItemIndex(index);
//     setMenuVisible(true);
//   };

//   const closeMenu = () => {
//     setMenuVisible(false);
//     setSelectedItemIndex(null);
//   };

//   const handleSchedule = () => {
//     const item = filteredVaccination[selectedItemIndex!];
//     //router.push({ pathname: '/schedule', params: { disease: item.diseaseType } });
//     closeMenu();
//   };

//   const handleDetails = () => {
//     const item = filteredVaccination[selectedItemIndex!];
//     //router.push({ pathname: '/details', params: { disease: item.diseaseType } });
//     closeMenu();
//   };

//   const renderItem = ({ item, index }: { item: any; index: number }) => (
//     <View style={styles.resourceContainer}>
//       <View style={styles.diseaseTypeContainer}>
//         <View style={{ flexDirection: 'row', flex: 1 }}>
//           <View style={styles.diseaseItem}>
//             <Text style={styles.diseaseValue}>{item.diseaseType}</Text>
//           </View>

//           <View
//             style={{
//               backgroundColor:
//               item.status === 'Pending'? '#fde767' : item.status === 'Needs update' ? '#ffe5e5' : item.status === 'Upto date' ? '#beedaa' : '#e0f7e0',
//               paddingHorizontal: 5,
//               paddingVertical: 5,
//               marginRight: 5,
//               marginLeft: 15,
//               borderRadius: 20,
//             }}
//           >
//             <Text
//               style={[
//                 styles.diseaseValue,
//                 {
//                   color:
//                   item.status === 'Pending'? '#a57f00' : item.status === 'Needs update' ? '#ff0000' : item.status === 'Upto date' ? '#168543': '#209c05',
//                   fontWeight: '600',
//                 },
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>

//           <View style={styles.diseaseItem}>
//             <Text style={styles.diseaseValue}>{item.animalType}</Text>
//           </View>
//         </View>

//         <TouchableOpacity onPress={() => openMenu(index)}>
//           <MaterialIcons name="more-vert" size={24} color="#168543" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.vaccinationInfoContainer}>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoValue}>{item.count}</Text>
//           <Text style={styles.infoLabel}>Count</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoValue}>{item.nextDue}</Text>
//           <Text style={styles.infoLabel}>Next Due</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoValue}>{item.lastVaccinated}</Text>
//           <Text style={styles.infoLabel}>Last Vaccinated</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.innerContainer}>
//       <View style={styles.searchContainer}>
//         <MaterialIcons
//           name="search"
//           size={24}
//           color="#5F6368"
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search here"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       <FlatList
//         data={filteredVaccination}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         ListEmptyComponent={<Text>No vaccination found.</Text>}
//       />

//       <Modal
//             transparent
//             animationType="fade"
//             visible={menuVisible}
//             onRequestClose={closeMenu}
//           >
//           <Pressable style={styles.overlay} onPress={closeMenu}>
//             <View style={styles.menu}>
//               <TouchableOpacity onPress={handleSchedule}>
//                 <Text style={styles.menuItem}>Schedule Vaccination</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleDetails}>
//                 <Text style={styles.menuItem}>Details</Text>
//               </TouchableOpacity>
//             </View>
//           </Pressable>
//       </Modal>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   innerContainer:{
//     width: wp('100%'), 
//     alignSelf:'center',
//     marginTop:20,
//     flex:1
//  },
//  searchContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   width: wp('90%'),
//   alignSelf: 'center',
//   marginBottom: 10,
//   borderWidth: 1,
//   borderColor: '#F7F7FA',
//   borderRadius: 7,
//   paddingHorizontal: 10, 
//   backgroundColor: '#FFFFFF',
//   borderTopWidth: 0,
//   shadowColor: '#5A5B6A', 
//   shadowOffset: {width: 0, height: 2},
//   shadowOpacity: 0.1, 
//   shadowRadius: 5, 
//   elevation: 5, 
//  },
//   searchBar: {
//       flex: 1, 
//       height: hp('7%'),
//   },
//   searchIcon: {
//       marginRight: 10, 
//   },
//   tuneIcon: {
//       marginLeft: 10,  
//   },
//   resourceContainer: {
//       flexDirection: 'column',
//       paddingHorizontal: 20,
//       marginHorizontal: 10,
//       backgroundColor: '#FFFFFF',
//       borderColor: '#F7F7FA',
//       borderRadius: 7,
//       padding: 15,
//       marginVertical: 5,
//       marginBottom:10,
//       height:hp('14%'),
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 5,
//       elevation: 2,
      
//   },
//   diseaseTypeContainer: {
//       alignSelf: 'flex-start',
//       flexDirection:'row',
//       justifyContent: 'space-between',
//       overflow:'scroll'
//   },
//   diseaseItem: {
//       marginRight: 5,
//       backgroundColor: '#EDEDF0',
//       borderRadius:20,
//       padding:7
//     },
    
//     diseaseValue: {
//       fontSize: 14,
//       fontWeight: 'bold',
//       color: '#00796b',
//     },
//   vaccinationInfoContainer: {
//       flexDirection: 'row',
//       padding:6,
//       borderRadius: 8,
//       alignSelf: 'flex-start',
//       gap:30,
//   },   
//   infoItem: {
//       marginTop:10,
//     },
    
//     infoValue: {
//       fontSize: 18,
//       fontWeight: 500,
//       color: '#7F8C8D',
//     }, 
//     infoLabel: {
//       fontSize: 13,
//       color: '#7F8C8D',
//       fontWeight: 400,
//     },
//     overlay: {
//       flex: 1, 
//       backgroundColor: 
//       'rgba(0,0,0,0.3)', 
//       justifyContent: 'center', 
//       alignItems: 'center',
//     },
//     menu: {
//       width: 250, 
//       backgroundColor: 'white', 
//       borderRadius: 10, 
//       padding: 15,
//     },
//     menuItem: {
//       paddingVertical: 10, 
//       fontSize: 16, 
//       //borderBottomWidth: 0.5,
//       //borderBottomColor: '#ccc',
//     },
// });