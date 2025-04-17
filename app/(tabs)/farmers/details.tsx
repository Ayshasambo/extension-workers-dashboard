import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { farmers, states, workTypes } from '@/constants/dummy';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NavMenu from '@/components/NavMenu'
export default function FarmerDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Details");
  const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const farmer = farmers.find((f) => f.id.toString() === id);
  const [selectedState, setSelectedState] = useState(farmer?.state || '');
  const [selectedWorkType, setSelectedWorkType] = useState(farmer?.worktype || '');

  if (!farmer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Farmer not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ✅ Reusable Navigation */}
      <NavMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} farmerId={farmerId} />

      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={farmer.title} editable={true} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={farmer.email} editable={false} />

        <Text style={styles.label}>State</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}
            style={styles.picker}
          >
            {states.map((state, index) => (
              <Picker.Item key={index} label={state} value={state} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Work Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedWorkType}
            onValueChange={(itemValue) => setSelectedWorkType(itemValue)}
            style={styles.picker}
          >
            {workTypes.map((work, index) => (
              <Picker.Item key={index} label={work} value={work} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={() => console.log("Update button pressed")}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#36813A',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    width: wp('80%'),
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F7F7FA',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#F7F7FA',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  updateButton: {
    backgroundColor: "#36813A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});





// import React, { useState }  from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
// import { useRouter,useLocalSearchParams } from 'expo-router';
// import { farmers, states,workTypes } from '@/constants/dummy';
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export default function FarmerDetail() {
//     const { id } = useLocalSearchParams();
//     const router = useRouter();
//     const [activeMenu, setActiveMenu] = useState("Details");
//     const farmer = farmers.find((f) => f.id.toString() === id);
//     const [selectedState, setSelectedState] = useState(farmer?.state || '');
//     const [selectedWorkType, setSelectedWorkType] = useState(farmer?.worktype || '');
    

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
//           //onPress={() => setActiveMenu("Pets")}
//           onPress={() => router.push(`/farmers/${id}/livestock`)}
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
//           //onPress={() => setActiveMenu("Hospital")}
//           onPress={() => router.push(`/farmers/${id}/vaccination`)}
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

//                 <Text style={styles.label}>State</Text>
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={selectedState}
//                         onValueChange={(itemValue) => setSelectedState(itemValue)}
//                         style={styles.picker}
//                     >
//                         {(states ?? []).map((state, index) => (
//                         <Picker.Item key={index} label={state} value={state} />
//                         ))}
//                     </Picker>
//                 </View>
                

//                 <Text style={styles.label}>Work Type</Text>
//                 <View style={styles.pickerContainer}>
//                     <Picker
//                         selectedValue={selectedWorkType}
//                         onValueChange={(itemValue) => setSelectedWorkType(itemValue)}
//                         style={styles.picker}
//                     >
//                         {workTypes.map((work, index) => (
//                             <Picker.Item key={index} label={work} value={work} />
//                         ))}
//                     </Picker>
//                 </View>

//                 <TouchableOpacity style={styles.updateButton} onPress={() => console.log("Update button pressed")}>
//                  <Text style={styles.updateButtonText}>Update</Text>
//                 </TouchableOpacity>
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
//         backgroundColor: "#36813A",
//         padding: 10,
//         justifyContent: "space-around",
//         borderRadius: 15, 
//         margin: 10, 
//         width: "80%"
//       },
//       menuItem: {
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         borderRadius: 20,
//         alignItems: "center",
//         backgroundColor: "#36813A",
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
//         color: "#5F6368",
//       },
//     imageContainer: {
//         width: 120,
//         height: 120,
//         borderRadius: 15,
//         overflow: 'hidden',
//         marginBottom: 10,
//         marginTop:10,
//         borderWidth: 2,
//         borderColor: '#36813A',
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
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#CCC',
//         borderRadius: 5,
//         marginBottom: 15,
//         backgroundColor: '#F7F7FA',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//     },
//     updateButton: {
//         backgroundColor: "#36813A",
//         padding: 15,
//         borderRadius: 10,
//         alignItems: "center",
//         marginTop: 10,
//         width: "100%",
//     },
//       updateButtonText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     errorText: {
//         fontSize: 18,
//         color: 'red',
//         marginTop: 20,
//     },
// });


