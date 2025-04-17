// import React, { useState }  from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { farmers } from '@/constants/dummy';
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export default function LivestockDetail() {
//     const { id } = useLocalSearchParams();
//     const [activeMenu, setActiveMenu] = useState("Details");
//     const farmer = farmers.find((f) => f.id.toString() === id);

//     if (!farmer) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>Farmer not found</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.navMenu}>
//         <TouchableOpacity
//           onPress={() => setActiveMenu("Person")}
//           style={[styles.menuItem, activeMenu === "Person" && styles.activeMenuItem]}
//         >
//           <MaterialIcons
//             name="person"
//             size={24}
//             color={activeMenu === "Person" ? "#4CAF50" : "white"}
//             style={styles.menuIcon}
//           />
//           <Text style={[styles.menuText, activeMenu === "Person" && styles.activeMenuText]}>Biodata</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setActiveMenu("Pets")}
//           style={[styles.menuItem, activeMenu === "Pets" && styles.activeMenuItem]}
//         >
//           <MaterialIcons
//             name="pets"
//             size={24}
//             color={activeMenu === "Pets" ? "#4CAF50" : "white"}
//             style={styles.menuIcon}
//           />
//           <Text style={[styles.menuText, activeMenu === "Pets" && styles.activeMenuText]}>Livestock</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => setActiveMenu("Hospital")}
//           style={[styles.menuItem, activeMenu === "Hospital" && styles.activeMenuItem]}
//         >
//           <MaterialIcons
//             name="local-hospital"
//             size={24}
//             color={activeMenu === "Hospital" ? "#4CAF50" : "white"}
//             style={styles.menuIcon}
//           />
//           <Text style={[styles.menuText, activeMenu === "Hospital" && styles.activeMenuText]}>Vaccination</Text>
//         </TouchableOpacity>
//       </View>

//             <View style={styles.imageContainer}>
//                 <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
//             </View>

//             <View style={styles.formContainer}>
//                 <Text style={styles.label}>Name</Text>
//                 <TextInput style={styles.input} value={farmer.title} editable={true} />

//                 <Text style={styles.label}>Email</Text>
//                 <TextInput style={styles.input} value={farmer.email} editable={false} />

//                 <Text style={styles.label}>state</Text>
//                 <TextInput style={styles.input} value={farmer.state} editable={false} /> 

//                 <Text style={styles.label}>work type</Text>
//                 <TextInput style={styles.input} value={farmer.worktype} editable={false} /> 
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         alignItems: 'center',
//         paddingVertical: 20,
//     },
//     navMenu: {
//         flexDirection: "row",
//         backgroundColor: "#4CAF50",
//         padding: 15,
//         justifyContent: "space-around",
//         borderRadius: 15, 
//         margin: 10, 
//         width: "90%"
//       },
//       menuItem: {
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         borderRadius: 20,
//         alignItems: "center",
//         backgroundColor: "#4CAF50",
//         flexDirection: "column"
//       },
//       activeMenuItem: {
//         backgroundColor: "white",
//       },
//       menuIcon: {
//         marginRight: 5,
//       },
//       menuText: {
//         color: "white",
//         fontWeight: "bold",
//       },
//       activeMenuText: {
//         color: "#4CAF50",
//       },
//     imageContainer: {
//         width: 120,
//         height: 120,
//         borderRadius: 15,
//         overflow: 'hidden',
//         marginBottom: 20,
//         borderWidth: 2,
//         borderColor: '#4CAF50',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     formContainer: {
//         width: wp('80%'),
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#CCC',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//         backgroundColor: '#F7F7FA',
//     },
//     errorText: {
//         fontSize: 18,
//         color: 'red',
//         marginTop: 20,
//     },
// });
