// import React, { useState,  } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Link, useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialIcons} from '@expo/vector-icons';
// import {farmers} from '@/constants/dummy'

// export default function LivestockManager() {
//     const { id } = useLocalSearchParams(); // get the id from route params
//     const [searchQuery, setSearchQuery] = useState('');
//     const router = useRouter();

//     const farmer = farmers.find((farmer) => farmer.id.toString() === id);

//     const filteredLivestock = farmer?.livestock?.filter((animal) =>
//         animal.type.toLowerCase().includes(searchQuery.toLowerCase())
//     ) || [];

//     const renderItem = ({ item }: any) => (
//         <View style={styles.resourceContainer}>  

        
//         </View>
//     );
 
//     return (
//         <View style={styles.container}>
//             <View style={styles.innerContainer}>
//             <View style={styles.searchContainer}>
//                     <MaterialIcons name="search" size={24} color="#5F6368" style={styles.searchIcon} />
//                     <TextInput
//                         style={styles.searchBar}
//                         placeholder="Search here"
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                     /> 
//                 </View>

//                 <FlatList
//                     data={filteredLivestock}
//                     renderItem={renderItem}
//                     keyExtractor={(_, index) => index.toString()}
//                     ListEmptyComponent={<Text>No livestock found.</Text>}
//                 />
//             </View>
            
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#FFFFFF',
//         flex:1,
//     },
//     innerContainer:{
//        width: wp('100%'), 
//        alignSelf:'center',
//        marginTop:20,
//        flex:1
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: wp('90%'),
//         alignSelf: 'center',
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: '#F7F7FA',
//         borderRadius: 7,
//         paddingHorizontal: 10, 
//         backgroundColor: '#FFFFFF',
//         borderTopWidth: 0,
//         shadowColor: '#5A5B6A', 
//         shadowOffset: {width: 0, height: 2},
//         shadowOpacity: 0.1, 
//         shadowRadius: 5, 
//         elevation: 5, 
//     },
//     searchBar: {
//         flex: 1, 
//         height: hp('5%'),
//     },
//     searchIcon: {
//         marginRight: 10, 
//     },
//     tuneIcon: {
//         marginLeft: 10,  
//     },
//     resourceContainer: {
//         flexDirection: 'column',
//         paddingHorizontal: 10,
//         marginHorizontal: 10,
//         backgroundColor: '#FFFFFF',
//         borderColor: '#F7F7FA',
//         borderRadius: 7,
//         // paddingBottom:15,
//         // paddingTop:15,
//         padding: 15,
//         marginVertical: 5,
//         marginBottom:10,
//         height:hp('13%'),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
        
//     },
// })









