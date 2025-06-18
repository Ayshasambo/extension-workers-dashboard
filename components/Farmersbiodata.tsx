import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useUpdateById } from '@/hooks/useUpdate'; 
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [dateOfBirth, setDateOfBirth] = useState(
    farmer.dateOfBirth ? moment(farmer.dateOfBirth).format('YYYY-MM-DD') : ''
  );
  const [phone, setPhone] = useState(farmer.phone || '');
  const [nationalIdNumber, setNationalIdNumber] = useState(farmer.nationalIdNumber || '');
  const [email, setEmail] = useState(farmer.email || '');
  const [districtId, setDistrictId] = useState(
    typeof farmer.district === 'object' && farmer.district !== null
    ? farmer.district._id
    : farmer.district || ''
  );
  const [role, setRole] = useState(farmer.role || 'farmer');
  const [districts, setDistricts] = useState<District[]>([]);
  
  // Dropdown state
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const { mutate: updateFarmer } = useUpdateById<Farmer>('farmers');

  useEffect(() => {
    fetch('https://l-press-backend.onrender.com/districts')
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
        // Format districts for the dropdown
        const dropdownItems = data.map((district: District) => ({
          label: district.name,
          value: district._id
        }));
        setItems(dropdownItems);
      })
      .catch((err) => console.error('Failed to fetch districts:', err));
  }, []);

  const handleSubmit = () => {
    const selectedDistrict = districts.find(d => d._id === districtId);
  
    const payload = {
      fullName,
      gender,
      dateOfBirth: moment(dateOfBirth, 'YYYY-MM-DD').toISOString(),
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

  const handleDateChange = (text: string) => {
    setDateOfBirth(text);
    
    if (text.length === 10) {
      const isValid = moment(text, 'YYYY-MM-DD', true).isValid();
      if (!isValid) {
        Alert.alert('Invalid Date', 'Please enter date in YYYY-MM-DD format');
      }
    }
  };

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

        <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
        <TextInput 
          style={styles.input} 
          value={dateOfBirth} 
          onChangeText={handleDateChange}
          placeholder="YYYY-MM-DD"
          maxLength={10}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone}  />

        <Text style={styles.label}>National ID Number</Text>
        <TextInput style={styles.input} value={nationalIdNumber} onChangeText={setNationalIdNumber} />

        <Text style={styles.label}>District</Text>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={districtId}
            items={items}
            setOpen={setOpen}
            setValue={setDistrictId}
            setItems={setItems}
            placeholder="Select District (Optional)"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownList}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
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
    marginBottom: 80,
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
    backgroundColor: '#FFFFFF',
  },
  dropdownContainer: {
    marginBottom: 15,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: '#CCC',
    backgroundColor: '#FFFFFF',
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCC',
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
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    marginLeft: 10,
    color: '#999',
    fontSize: 16,
  },
});





