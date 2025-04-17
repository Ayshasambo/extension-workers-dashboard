import React, { useState,  } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons} from '@expo/vector-icons';
import {farmers} from '@/constants/dummy'
import NavMenu from '@/components/NavMenu'

export default function FarmersList() {
    const { id } = useLocalSearchParams(); 
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState("Details");
    const farmer = farmers.find((farmer) => farmer.id.toString() === id);
    const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);
    const filteredLivestock = farmer?.livestock?.filter((animal) =>
        animal.type.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const renderItem = ({ item }: any) => (
        
        <View style={styles.resourceContainer}>
            <View style={styles.livestockCountContainer}>
                <Text style={styles.livestockCountText}>
                    {item.count} {item.type}
                </Text>
                <TouchableOpacity onPress={() => console.log("More options tapped")}>
                  <MaterialIcons name="more-vert" size={24} color="#168543" />
                </TouchableOpacity> 
            </View>

            <View style={styles.livestockInfoContainer}>
                <View style={styles.healthItemContainer}>
                <View style={styles.healthItem}>
                        <Text style={styles.healthValue}>{item.healthStatus}</Text>
                    </View> 
                    <Text style={styles.infoLabel}>Health</Text>
                </View>
            
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{item.breed}</Text>
                    <Text style={styles.infoLabel}>Breed</Text>
                </View> 
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{item.averageWeight}</Text>
                    <Text style={styles.infoLabel}>Weight</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{item.averageAge}</Text>
                    <Text style={styles.infoLabel}>Age</Text>
                </View>    
            </View>   
        </View>
    );
 
    return (
        <View style={styles.container}>
             <NavMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} farmerId={farmerId} />
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
                    data={filteredLivestock}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    ListEmptyComponent={<Text>No livestock found.</Text>}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex:1,
        marginBottom:50,
        alignItems:'center'
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
        height: hp('7%'),
    },
    searchIcon: {
        marginRight: 10, 
    },
    tuneIcon: {
        marginLeft: 10,  
    },
    resourceContainer: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#F7F7FA',
        borderRadius: 7,
        padding: 15,
        marginVertical: 5,
        marginBottom:10,
        height:hp('14%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        
    },
    livestockCountContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        //alignSelf: 'flex-start',
        marginBottom:5
    },
    livestockCountText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#00796b',
        backgroundColor: '#EDEDF0',
        padding: 5,
        borderRadius: 20,
    },  
    livestockInfoContainer: {
        flexDirection: 'row',
        padding:6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        gap:30,
    },
    healthItemContainer: {
        alignItems: 'center',
      },
      
    healthItem: {
        borderWidth: 2,
        borderColor: '#168543', 
        borderRadius: 50, 
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      healthValue: {
        color: '#3498DB',
        fontWeight: 'light',
        fontSize:12
      },
    infoItem: {
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop:10,
      },
      
      infoValue: {
        fontSize: 18,
        fontWeight: 500,
        color: '#7F8C8D',
      },
      
      infoLabel: {
        fontSize: 12,
        color: '#7F8C8D',
        fontWeight: 400,
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









