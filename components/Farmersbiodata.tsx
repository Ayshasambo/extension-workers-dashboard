import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { farmers, workTypes, states } from '@/constants/dummy';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
const defaultImage = {img: require('@/assets/images/cows.jpg')}


type Farmer = (typeof farmers)[0];
type BiodataProps = {
  farmer: Farmer;
};

export default function Details({ farmer }: BiodataProps) {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState(farmer.title);
  const [email, setEmail] = useState(farmer.email);
  const [selectedState, setSelectedState] = useState(farmer.state || '');
  const [selectedWorkType, setSelectedWorkType] = useState(farmer.worktype || '');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
       {/* <Image source={image ? { uri: image } : defaultImage.img} style={styles.profileImage} /> */}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Name" />

        <Text style={styles.label}>State</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}
            style={styles.picker}
          >
            {states.map((state, index) => (
              <Picker.Item key={index} label={state} value={state} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Work Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedWorkType}
            onValueChange={(itemValue) => setSelectedWorkType(itemValue)}
            style={styles.picker}
          >
            {workTypes.map((work, index) => (
              <Picker.Item key={index} label={work} value={work} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.uploadField} onPress={async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission is required to access media library');
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
            }}>
            <MaterialIcons name="cloud-upload" size={24} color="#aaa" />
            <Text style={styles.placeholder}>Upload Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateButton} onPress={() => console.log("Update button pressed")}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    backgroundColor: '#F7F7FA',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#36813A',
    alignSelf:'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  formContainer: {
    width: wp('80%'),
    alignSelf: 'center',
    marginBottom:80,
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
    //backgroundColor: '#F7F7FA',
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginBottom: 15,
    //backgroundColor: '#F7F7FA',
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  updateButton: {
    backgroundColor: "#36813A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  uploadField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    paddingVertical:5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    //backgroundColor: '#f9f9f9',
  },
  placeholder: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
});





