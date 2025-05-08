// app/farmers/FarmersList.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useData } from '../../../hooks/useData'; 


interface farmers{
  _id:string
  fullName: string,
  gender: string,
  dateOfBirth: string,
  phone: string,
  nationalIdNumber: string,
  email: string,
  district: string,
  role: string
}


export default function FarmersList() {
  const [searchQuery, setSearchQuery] = useState('');
  //const { data: farmers, isLoading } = useData();
  const { data:farmers=[], isLoading, error } = useData<farmers[]>('/farmers')

  //const filteredData = (farmers || []).filter((farmer: any) =>
  const filteredData = farmers.filter((farmer) =>
    farmer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => {
    // const livestock = dummyLivestockMap[item._id] || [];

    return (
      //<Link href={{ pathname: "/farmers/profile", params: { id: item._id } }} asChild>
      <Link href={`/farmers/profile?id=${item._id}`} asChild>
        <TouchableOpacity style={styles.resourceContainer}>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.fullName}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.stateContainer}>
                <Text style={styles.stateText}>{item.district?.region || 'Unknown Region'}</Text>
              </View>
{/* 
              <View style={styles.livestockContainer}>
                <Text style={styles.livestockText}>
                  {livestock.map((liv) => `${liv.count} ${liv.type}`).join(', ')}
                </Text>
              </View> */}

              <View style={styles.lgaContainer}>
                <Text style={styles.lgaText}>{item.district?.name || 'No District'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.distanceIconContainer}>
            <View style={styles.distanceItem}>
              <MaterialIcons name="pets" size={25} color="#36813A" />
              <Text style={styles.distancetext}></Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

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

        {isLoading ? (
          <ActivityIndicator size="large" color="#36813A" />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text>No farmers found.</Text>}
          />
        )}

        <Link href="/farmers/farmermanager" asChild>
          <TouchableOpacity style={styles.floatingButton}>
            <MaterialIcons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
                //backgroundColor: '#FFFFFF',
                flex:1,
                marginBottom: 50
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
            floatingButton: {
                position: 'absolute',
                bottom: hp('4%'), // Adjust as needed
                right: wp('5%'),
                backgroundColor: '#36813A',
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
              },
              
});



// import React, { useState,  } from 'react';
// import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Link, useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialIcons} from '@expo/vector-icons';
// import {farmers} from '@/constants/dummy'
// import { useFarmers } from '@/hooks/useFarmers';



// export default function FarmersList() {
//     // type FarmerType = {
//     //     id: number;
//     //     title: string;
//     //     iconName: string;
//     //     lga: string;
//     //     state: string;
//     //     distance: string;
//     //     email: string;
//     //     worktype: string;
//     //     livestock: {
//     //       type: string;
//     //       count: number;
//     //       breed: string;
//     //       averageWeight: string;
//     //       averageAge: string;
//     //       healthStatus: string;
//     //     }[];
//     //   };
      

//     const [searchQuery, setSearchQuery] = useState('');

//     const category = "Farmers"; 
//     const dataMapping = {
//         "Farmers": farmers,
//     };
    
//     const data = dataMapping[category] || [];
//     //console.log('Selected Data:', data); 
//     const filteredData = data.filter((item) =>
//         item.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
   
//     const renderItem = ({ item }: { item: farmerType }) => (
//        <Link href={{ pathname: "/farmers/profile", params: { id: item.id } }} asChild>
//         <TouchableOpacity style={styles.resourceContainer}>
//             <View style={styles.textContainer}>
//                 <View style={styles.titleContainer}>
//                     <Text style={styles.title}>{item.title}</Text>
//                 </View>

//                 <View style={styles.infoContainer}>
//                     <View style={styles.stateContainer}>
//                         <Text style={styles.stateText}>{item.state}</Text>
//                     </View> 

//                     <View style={styles.livestockContainer}>
//                         {/* <Text style={styles.livestockText}>{item.livestock.join(', ')}</Text> */}
//                         <Text style={styles.livestockText}>
//                         {item.livestock?.map((liv: any) => `${liv.count} ${liv.type}`).join(', ')}
//                         </Text>
//                     </View>

//                     <View style={styles.lgaContainer}>
//                         <Text style={styles.lgaText}>{item.lga}</Text>
//                     </View> 
//                 </View>    
//             </View>

//             <View style={styles.distanceIconContainer}>
//                 <View style={styles.distanceItem}>
//                     <MaterialIcons name="pets" size={25} color="#36813A" />
//                     <Text style={styles.distancetext}>{item.distance}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     </Link>
//     );
 
//     return (
//         <View style={styles.container}>
//             <View style={styles.innerContainer}>
//                 <View style={styles.searchContainer}>
//                     <MaterialIcons name="search" size={24} color="#5F6368" style={styles.searchIcon} />
//                     <TextInput
//                         style={styles.searchBar}
//                         placeholder="Search here"
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                     /> 
//                 </View>
//                 <FlatList<farmerType>
//                     data={filteredData}
//                     renderItem={renderItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     ListEmptyComponent={<Text>No data available for this resource.</Text>}
//                 />
//                 <Link href="/farmers/farmermanager" asChild>
//                     <TouchableOpacity style={styles.floatingButton}>
//                         <MaterialIcons name="add" size={28} color="#fff" />
//                     </TouchableOpacity>
//                 </Link>

//             </View>
            
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         //backgroundColor: '#FFFFFF',
//         flex:1,
//         marginBottom: 50
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
//         height: hp('7%'),
//     },
//     searchIcon: {
//         marginRight: 10, 
//     },
//     tuneIcon: {
//         marginLeft: 10,  
//     },
//     resourceContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         marginHorizontal: 10,
//         backgroundColor: '#FFFFFF',
//         borderColor: '#F7F7FA',
//         borderRadius: 7,
//         padding: 20,
//         marginVertical: 5,
//         height:hp('10%'),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
        
//     },
//     textContainer: {
//         flex: 1,
//         flexDirection: 'column', 
//         justifyContent: 'center', 
//         paddingLeft: 5,
//         marginTop:10,
//     },
//     titleContainer: {
//        marginVertical:5
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: '#3A3A44',
//     },
//     infoContainer: {
//         flexDirection: 'row', 
//         //alignItems: 'center',
//         //justifyContent: 'space-between',
//         marginTop: 5,
//         gap:10
//     },
//     livestockContainer: {
//         // flexDirection: 'row',
//          flexWrap: 'wrap',
//         backgroundColor: "#EDEDF0",
//         padding: 6,
//         borderRadius: 99,
//     }, 
//     livestockText: {
//         fontSize: 12,
//         color: '#666',
//     },
//     stateContainer: {
//         // flexDirection: 'row',
//         flexWrap: 'wrap',
//         backgroundColor: "#EDEDF0",
//         padding: 6,
//         borderRadius: 70,
//        // marginRight:10,
//     },
//     stateText: {
//         fontSize: 12,
//         color: '#666',
//     },
//     lgaContainer: {
//         // flexDirection: 'row',
//         flexWrap: 'wrap',
//         backgroundColor: "#EDEDF0",
//         padding: 6,
//         borderRadius: 70,
//         //marginLeft:10
//     },
//     lgaText: {
//         fontSize: 12,
//         color: '#666',
//     },
//     distanceIconContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap:5,
//         //justifyContent: 'space-between',
//         marginLeft: 10
//     },
//     distanceItem: {
//         alignItems: 'center',
//         marginHorizontal: 5,
//     },
//     distancetext: {
//         fontSize: 12,
//         color: '#36813A',
//         fontWeight: 'bold',
//         marginTop: 2,
//     },
//     floatingButton: {
//         position: 'absolute',
//         bottom: hp('4%'), // Adjust as needed
//         right: wp('5%'),
//         backgroundColor: '#36813A',
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//       },
      
    
// });









