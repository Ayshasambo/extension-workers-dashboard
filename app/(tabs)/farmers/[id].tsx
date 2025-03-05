// import { View, Text } from "react-native";
// import { useLocalSearchParams } from "expo-router";

// const FarmerDetails = () => {
//     const { id } = useLocalSearchParams(); // Get farmer ID from URL

//     return (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//             <Text>Farmer Details Page</Text>
//             <Text>Farmer ID: {id}</Text>
//         </View>
//     );
// };

//  export default FarmerDetails;

import React, { useState }  from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { farmerDetails, farmers } from '@/constants/dummy';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function FarmerDetail() {
    const { id } = useLocalSearchParams();
    const [activeMenu, setActiveMenu] = useState("Details");
    const farmer = farmers.find((f) => f.id.toString() === id);

    if (!farmer) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Farmer not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.navMenu}>
        <TouchableOpacity
          onPress={() => setActiveMenu("Person")}
          style={[styles.menuItem, activeMenu === "Person" && styles.activeMenuItem]}
        >
          <MaterialIcons
            name="person"
            size={24}
            color={activeMenu === "Person" ? "#4CAF50" : "white"}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, activeMenu === "Person" && styles.activeMenuText]}>Biodata</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveMenu("Pets")}
          style={[styles.menuItem, activeMenu === "Pets" && styles.activeMenuItem]}
        >
          <MaterialIcons
            name="pets"
            size={24}
            color={activeMenu === "Pets" ? "#4CAF50" : "white"}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, activeMenu === "Pets" && styles.activeMenuText]}>Livestock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveMenu("Hospital")}
          style={[styles.menuItem, activeMenu === "Hospital" && styles.activeMenuItem]}
        >
          <MaterialIcons
            name="local-hospital"
            size={24}
            color={activeMenu === "Hospital" ? "#4CAF50" : "white"}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuText, activeMenu === "Hospital" && styles.activeMenuText]}>Vaccination</Text>
        </TouchableOpacity>
      </View>

            {/* Navigation Menu */}
            {/* <View style={styles.navContainer}>
                <View style={styles.navItem}>
                    <MaterialIcons name="person" size={24} color="#4CAF50" />
                    <Text style={styles.navText}>Biodata</Text>
                </View>
                <View style={styles.navItem}>
                    <MaterialIcons name="pets" size={24} color="#4CAF50" />
                    <Text style={styles.navText}>Livestock</Text>
                </View>
                <View style={styles.navItem}>
                    <FontAwesome5 name="hospital" size={24} color="#4CAF50" />
                    <Text style={styles.navText}>Vaccination</Text>
                </View>
            </View> */}

            {/* Farmer Image Container */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
            </View>

            {/* Farmer Details Form */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value={farmer.title} editable={true} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={farmer.email} editable={false} />

                <Text style={styles.label}>state</Text>
                <TextInput style={styles.input} value={farmer.state} editable={false} /> 

                <Text style={styles.label}>work type</Text>
                <TextInput style={styles.input} value={farmer.worktype} editable={false} /> 
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
    navMenu: {
        flexDirection: "row",
        backgroundColor: "#4CAF50",
        padding: 15,
        justifyContent: "space-around",
        borderRadius: 15, // Added border radius
        margin: 10, // Added margin for spacing
        width: "90%"
      },
      menuItem: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#4CAF50",
        flexDirection: "column"
      },
      activeMenuItem: {
        backgroundColor: "white",
      },
      menuIcon: {
        marginRight: 5,
      },
      menuText: {
        color: "white",
        fontWeight: "bold",
      },
      activeMenuText: {
        color: "#4CAF50",
      },
    // navContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor: '#F7F7FA',
    //     width: wp('80%'),
    //     borderRadius: 10,
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     marginBottom: 20,
    // },
    // navItem: {
    //     alignItems: 'center',
    // },
    // navText: {
    //     fontSize: 14,
    //     color: '#333',
    //     marginTop: 5,
    // },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
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
    errorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 20,
    },
});
