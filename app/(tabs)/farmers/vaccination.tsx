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
    const filteredVaccination = farmer?.vaccination?.filter((animal) => 
        animal.diseaseType.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const renderItem = ({ item }: any) => (
        <View style={styles.resourceContainer}>  
            <View style={styles.diseaseTypeContainer}>
                <View style={{ flexDirection: 'row', flex:1 }}>
                    <View style={styles.diseaseItem}>
                        <Text style={styles.diseaseValue}>{item.diseaseType}</Text>
                    </View> 
                    {/* <View style={styles.diseaseItem}>
                        <Text style={styles.diseaseValue}>{item.status}</Text>
                    </View>  */}
                    {/* <View style={styles.diseaseItem}>
                      <Text style={[ styles.diseaseValue,  { color: item.status === 'Pending' ? '#fde767' 
                      : item.status === 'Needs update' ? '#ff0000' : item.status === 'Upto date' ? '#beedaa'  : '#209c05' } ]} >{item.status}
                      </Text>
                      </View>  */}
                      <View
    style={{
      backgroundColor: item.status === 'Pending' ? '#fde767'
        : item.status === 'Needs update' ? '#ffe5e5'
        : item.status === 'Upto date' ? '#beedaa'
        : '#e0f7e0',
      paddingHorizontal: 5,
      paddingVertical: 5,
      marginRight:5,
      marginLeft:15,
      borderRadius: 20,

    }}
  >
    <Text
      style={[
        styles.diseaseValue,
        {
          color: item.status === 'Pending' ? '#a57f00'
            : item.status === 'Needs update' ? '#ff0000'
            : item.status === 'Upto date' ? '#168543'
            : '#209c05',
          fontWeight: '600',
        }
      ]}
    >
      {item.status}
    </Text>
  </View>
                    <View style={styles.diseaseItem}>
                        <Text style={styles.diseaseValue}>{item.animalType}</Text>
                    </View> 
                </View>
                
                <TouchableOpacity onPress={() => console.log("More options tapped")}>
                  <MaterialIcons name="more-vert" size={24} color="#168543" />
                </TouchableOpacity> 
            </View>
            

            <View style={styles.vaccinationInfoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{item.count}</Text>
                    <Text style={styles.infoLabel}>Count</Text>
                </View> 
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{item.nextDue}</Text>
                    <Text style={styles.infoLabel}>Next Due</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{item.lastVaccinated}</Text>
                    <Text style={styles.infoLabel}>Last Vaccinated</Text>
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
                    data={filteredVaccination}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    ListEmptyComponent={<Text>No vaccination found.</Text>}
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
        // paddingBottom:15,
        // paddingTop:15,
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
    diseaseTypeContainer: {
        alignSelf: 'flex-start',
        flexDirection:'row',
        justifyContent: 'space-between',
        overflow:'scroll'
    },
    diseaseItem: {
        marginRight: 5,
        backgroundColor: '#EDEDF0',
        borderRadius:20,
        padding:7
      },
      
      diseaseValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00796b',
      },
    vaccinationInfoContainer: {
        flexDirection: 'row',
        padding:6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        gap:30,
    },   
    infoItem: {
        marginTop:10,
      },
      
      infoValue: {
        fontSize: 18,
        fontWeight: 500,
        color: '#7F8C8D',
      },
      
      infoLabel: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: 400,
      },
    livestockinfoText:{
        color:'black',
        fontSize: 10,
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
        marginTop: 5,
        gap:10
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









