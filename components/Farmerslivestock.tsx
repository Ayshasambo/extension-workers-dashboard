import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDataWithQuery } from '@/hooks/useDateWithQuery';
import { useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Animal = {
  _id:string,
  type: string;
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  farmer: string;
  identifier: string;
  vaccinationHistory: string[];
  isInBreedingCycle: boolean;
  expectedBreedingDate: string;
  isVaccinated: boolean;
  nextVaccinationDate: string;
  lastHealthCheckDate: string;
  healthIssues: string[];
  isAlive: boolean;
  region: string;
};

type LivestockProps = {
  farmerId: string;
};

export default function Livestock({ farmerId }: LivestockProps) {
  const [searchQuery, setSearchQuery] = useState('');
  console.log("Livestock - farmerId:", farmerId);

  const { data: animals, isLoading, error } = useDataWithQuery<Animal[]>('animals', { farmer: farmerId });

  const filteredAnimals = animals?.filter((animal) =>
    animal.type.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const renderItem = ({ item }: { item: Animal }) => (
    <View style={styles.resourceContainer}>

      <View style={styles.livestockCountContainer}>
        <Text style={styles.livestockCountText}>{item.type}</Text>
        <TouchableOpacity onPress={() => console.log("More options tapped")}>
          <MaterialIcons name="more-vert" size={24} color="#168543" />
        </TouchableOpacity>
      </View>

      <View style={styles.livestockInfoContainer}>
        {/* <View style={styles.healthItemContainer}>
          <View style={styles.healthItem}>
            <Text style={styles.healthValue}>{item.healthStatus}</Text>
          </View>
          <Text style={styles.infoLabel}>Health</Text>
        </View> */}
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.healthStatus}</Text>
          <Text style={styles.infoLabel}>Health</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.breed}</Text>
          <Text style={styles.infoLabel}>Breed</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.weight} </Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>{item.age} </Text>
          <Text style={styles.infoLabel}>Age</Text>
        </View>
      </View>
    </View>
  );

  if (isLoading) return <ActivityIndicator size="large" color="#168543" />;
  if (error) return <Text>Failed to load livestock data.</Text>;

  return (
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
        data={filteredAnimals}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No livestock found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    innerContainer:{
       width: wp('100%'), 
       alignSelf:'center',
       marginTop:20,
       marginBottom:50,
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
        gap:15,
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


