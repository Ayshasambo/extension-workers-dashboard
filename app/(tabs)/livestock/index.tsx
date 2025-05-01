import React, { useState,  } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons} from '@expo/vector-icons';
import {farmers, livestockList} from '@/constants/dummy'



export default function LivestockList() {
    const [searchQuery, setSearchQuery] = useState('');
    const category = "LivestockList"; 
    const dataMapping = {
        "LivestockList": livestockList,
    };
    
    const data = dataMapping[category] || [];
    const filteredLivestock = data.filter((item) =>
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
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
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>No data available for this resource.</Text>}
                />
                <Link href="/livestock/livestockmanager" asChild>
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









