import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {extensionWorker, workTypes} from '@/constants/dummy'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
const defaultImage = {img: require('./../../../assets/images/cow.jpg') }


export default function Profile() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState(extensionWorker.name);
  const [email, setEmail] = useState(extensionWorker.email);
  const [phone, setPhone] = useState(extensionWorker.phone);
  const [lga, setLga] = useState(extensionWorker.lga);
  const [state, setState] = useState(extensionWorker.state);
  const [selectedWorkType, setSelectedWorkType] = useState(extensionWorker.worktype || '');

  const handleSave = () => {
    console.log('Updated info:', { name, email, phone, lga, state });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
        <Image source={image ? { uri: image } : defaultImage.img} style={styles.profileImage} />
        </View>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name"/>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={lga} onChangeText={setLga} placeholder="LGA" />
      <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="State" />
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

        <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    alignSelf:'center',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#36813A',
    
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F7F7FA',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#F7F7FA',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F7F7FA',
    //backgroundColor: '#f9f9f9',
  },
  placeholder: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#36813A', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:80
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
