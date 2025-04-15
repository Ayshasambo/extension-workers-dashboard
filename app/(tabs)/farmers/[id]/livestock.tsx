import React, { useState,  } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons} from '@expo/vector-icons';
import {farmers} from '@/constants/dummy'

export default function FarmersList() {
    const [searchQuery, setSearchQuery] = useState('');

    const category = "Farmers"; 
    const dataMapping = {
        "Farmers": farmers,
    };
   
    const data = dataMapping[category] || [];
    //console.log('Selected Data:', data); 
    const filteredData = data.filter((item) =>
        //item.title.toLowerCase().includes(searchQuery.toLowerCase())
        item.livestock.some((livestockItem) =>
        livestockItem.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    );
   
    const renderItem = ({ item }: any) => (
        <View style={styles.resourceContainer}>
        {item.livestock.map((animal:any, index:number) => (
            <View key={index} style={styles.livestockCountContainer}>
                <Text style={styles.livestockCountText}>
                    {animal.count} {animal.type}
                </Text>
                {/* Optional: Add the extra container below with health info */}
                <View style={styles.livestockInfoContainer}>
                    <Text>Health: {animal.healthStatus}</Text>
                    <Text>Weight: {animal.averageWeight}</Text>
                    <Text>Breed: {animal.breed}</Text>
                    <Text>Age: {animal.averageAge}</Text>
                </View>
            </View>
        ))}
    </View>
    );
 
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="#5F6368" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search here"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    /> 
                </View>

                <FlatList
                    data={filteredData} 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>No data available for this resource.</Text>}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex:1,
    },
    innerContainer:{
       width: wp('100%'), 
       alignSelf:'center',
       marginTop:20,
       flex:1
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
        alignSelf: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F7F7FA',
        borderRadius: 7,
        paddingHorizontal: 10, 
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        shadowColor: '#5A5B6A', 
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        elevation: 5, 
    },
    searchBar: {
        flex: 1, 
        height: hp('5%'),
    },
    searchIcon: {
        marginRight: 10, 
    },
    tuneIcon: {
        marginLeft: 10,  
    },
    resourceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#F7F7FA',
        borderRadius: 7,
        padding: 20,
        marginVertical: 5,
        height:hp('10%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        
    },
    // livestockCountContainer: {
    //     backgroundColor: '#36813A',
    //     padding: 10,
    //     borderRadius: 8,
    //     marginBottom: 10,
    // },
    // livestockCountText: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#fff',
    // },
    livestockCountContainer: {
        backgroundColor: '#e0f2f1',
        padding: 10,
        borderRadius: 10,
       // marginBottom: 5,
    },
    livestockCountText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00796b',
    },  
    livestockInfoContainer: {
        backgroundColor: '#f9fbe7',
        padding: 8,
        borderRadius: 8,
        marginTop: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center', 
        paddingLeft: 5,
        marginTop:10,
    },
    titleContainer: {
       marginVertical:5
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: '#3A3A44',
    },
    infoContainer: {
        flexDirection: 'row', 
        //alignItems: 'center',
        //justifyContent: 'space-between',
        marginTop: 5,
        gap:10
    },
    livestockContainer: {
        // flexDirection: 'row',
         flexWrap: 'wrap',
        backgroundColor: "#EDEDF0",
        padding: 6,
        borderRadius: 99,
    }, 
    livestockText: {
        fontSize: 12,
        color: '#666',
    },
    stateContainer: {
        // flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#EDEDF0",
        padding: 6,
        borderRadius: 70,
       // marginRight:10,
    },
    stateText: {
        fontSize: 12,
        color: '#666',
    },
    lgaContainer: {
        // flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#EDEDF0",
        padding: 6,
        borderRadius: 70,
        //marginLeft:10
    },
    lgaText: {
        fontSize: 12,
        color: '#666',
    },
    distanceIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:5,
        //justifyContent: 'space-between',
        marginLeft: 10
    },
    distanceItem: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    distancetext: {
        fontSize: 12,
        color: '#36813A',
        fontWeight: 'bold',
        marginTop: 2,
    },
    categoriesContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        marginTop: 5,
    },
    categoryItem: {
        paddingVertical:5 ,
        paddingHorizontal: 5,
        backgroundColor: "#EDEDF0",
        borderRadius:70,
        marginVertical:10
    },
    categoryText: {
        fontSize: 10,
        color: '#333333',
    },
    menuContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginTop: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 14,
        color: "#333",
    },
});

// import { View, Text, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// export default function LivestockPage() {
//   const { id } = useLocalSearchParams();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Livestock for Farmer ID: {id}</Text>
//       {/* Add livestock info here */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#FFF"
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10
//   }
// });









