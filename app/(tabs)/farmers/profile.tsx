import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NavMenu from '@/components/NavMenu';
import Details from '@/components/Farmersbiodata';
import Livestock from '@/components/Farmerslivestock';
import Vaccination from '@/components/Vaccination';
import { farmers } from '@/constants/dummy';

export default function FarmerProfile() {
  const { id } = useLocalSearchParams();
  const [activeMenu, setActiveMenu] = useState<"Person" | "Pets" | "Hospital">("Person");

  const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);
  const farmer = farmers.find((f) => f.id === farmerId);

  if (!farmer) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Farmer not found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <NavMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} farmerId={farmerId} />
      {activeMenu === 'Person' && <Details farmer={farmer} />}
      {activeMenu === 'Pets' && <Livestock farmerId={farmerId} />}
      {activeMenu === 'Hospital' && <Vaccination farmerId={farmerId} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: '#F7F7FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
