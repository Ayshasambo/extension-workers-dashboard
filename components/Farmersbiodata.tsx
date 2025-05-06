import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useUpdateById } from '@/hooks/useUpdate'; 
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//rconst defaultImage = {img: require('./../../../assets/images/cow.jpg') }

type Farmer = {
  _id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  nationalIdNumber: string;
  email: string;
  role: string;
  district:string | { _id: string; name: string };
};

type District = {
  _id: string;
  name: string;
};

type FarmersBiodataProps = {
  farmer: Farmer;
};

export default function FarmersBiodata({ farmer }: FarmersBiodataProps) {
  const { id } = useLocalSearchParams();
  const farmerId = Array.isArray(id) ? Number(id[0]) : Number(id);

  const [image, setImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState(farmer.fullName || '');
  const [gender, setGender] = useState(farmer.gender || '');
  const [dateOfBirth, setDateOfBirth] = useState(farmer.dateOfBirth || '');
  const [phone, setPhone] = useState(farmer.phone || '');
  const [nationalIdNumber, setNationalIdNumber] = useState(farmer.nationalIdNumber || '');
  const [email, setEmail] = useState(farmer.email || '');
  const [districtId, setDistrictId] = useState(
    typeof farmer.district === 'object' && farmer.district !== null
    ? farmer.district._id
    : farmer.district || ''
  );//useState(farmer.district || '');
  const [role, setRole] = useState(farmer.role || 'farmer');
  const [districts, setDistricts] = useState<District[]>([]);

  const { mutate: updateFarmer } = useUpdateById<Farmer>('farmers');
  useEffect(() => {
    fetch('https://l-press-backend.onrender.com/districts')
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error('Failed to fetch districts:', err));
  }, []);

  const handleSubmit = () => {
    const selectedDistrict = districts.find(d => d._id === districtId);
  
    const payload = {
      fullName,
      gender,
      dateOfBirth,
      phone,
      nationalIdNumber,
      email,
      role,
      ...(selectedDistrict && { district: selectedDistrict }),
    };
  
    console.log('Submitting update for farmer ID:', farmer._id);
    console.log('Payload:', payload);
  
    updateFarmer(
      {
        id: farmer._id,
        data: payload,
      },
      {
        onSuccess: () => {
          console.log('Update success for farmer ID:', farmer._id);
          Alert.alert('Success', 'Farmer updated successfully');
        },
        onError: (err: any) => {
          console.error('Update failed:', err);
          Alert.alert('Error', err?.response?.data?.message || 'Update failed');
        },
      }
    );
  };
  

  // const handleSubmit = () => {
  //   updateFarmer(
  //     {
  //       id: farmer._id,
  //       data: {
  //         fullName,
  //         gender,
  //         dateOfBirth,
  //         phone,
  //         nationalIdNumber,
  //         email,
  //         role,
  //         ...(districtId && { district: districtId }),
  //       },
  //     },
      
  //     {
  //       onSuccess: () => Alert.alert('Success', 'Farmer updated successfully'),
  //       onError: (err: any) => Alert.alert('Error', err?.response?.data?.message || 'Update failed'),
  //     }
  //   );
  // };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
       {/* <Image source={image ? { uri: image } : defaultImage.img} style={styles.profileImage} /> */}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName}  />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail}  />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} value={gender} onChangeText={setGender}  />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} value={dateOfBirth} onChangeText={setDateOfBirth}  />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone}  />

        <Text style={styles.label}>National ID Number</Text>
        <TextInput style={styles.input} value={nationalIdNumber} onChangeText={setNationalIdNumber} />

        <Text style={styles.label}>District</Text>
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={districtId}
        onValueChange={(itemValue) => setDistrictId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select District(Optional)" value="" />
        {districts.map((dist) => (
          <Picker.Item key={dist._id} label={dist.name} value={dist._id} />
        ))}
      </Picker>
      </View> 

      <Text style={styles.label}>Upload photo</Text>
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

        {/* <TouchableOpacity style={styles.updateButton} onPress={() => console.log("Update button pressed")}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
  <Text style={styles.updateButtonText}>Update</Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    //backgroundColor: '#F7F7FA',
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





