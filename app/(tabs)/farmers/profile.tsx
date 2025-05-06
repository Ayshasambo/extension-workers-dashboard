import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NavMenu from '@/components/NavMenu';
import Details from '@/components/Farmersbiodata';
import Livestock from '@/components/Farmerslivestock';
//import Vaccination from '@/components/Vaccination';
import { useDataById } from '../../../hooks/useDataById'; 

export default function FarmerProfile() {
  const { id } = useLocalSearchParams(); 
  const [activeMenu, setActiveMenu] = useState<"Person" | "Pets" | "Hospital">("Person");
  const farmerId = Array.isArray(id) ? id[0] : id;
  
  console.log("Farmer ID from URL params:", id); 
  console.log("Parsed farmerId:", farmerId); 

  const { data: farmer, isLoading, isError } = useDataById<any>('farmers', farmerId);
  //const { data: farmer, isLoading, isError } = useFarmer(farmerId);
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#36813A" />
      </View>
    );
  }
  if (isError || !farmer) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Farmer not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} farmerId={farmerId} />
      {activeMenu === 'Person' && <Details farmer={farmer} />}  {/* Show biodata */}
      
       {activeMenu === 'Pets' && <Livestock farmerId={farmerId}/>}  
      {/* {activeMenu === 'Hospital' && <Vaccination farmerId={farmerId} />}   */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});