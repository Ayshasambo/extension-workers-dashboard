import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AppButton from '@/components/AppButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS } from '@/constants/theme';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<0 | 1>(0); // Default is "Client" (0)

  const router = useRouter();

  const handleNavigate = () => {
    router.push({ pathname: `/` });
  };

  const handleNavigateSuccess = () => {
    router.push({ pathname: `/successfulregistration`,
      params: {email}
     });
  };


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const registrationData = {
      newUserName: firstName + lastName,
      newUserEmail: email,
      newUserPhone: phoneNumber,
      newUsrCat: role,
      newUserPassword: password,
    };
     try {
        const response = await axios.post('https://payloader.fctdme.org.ng/clientRsrc/creatUser', registrationData);
      if (response.status === 201) {
        handleNavigateSuccess()
      } else {
        Alert.alert('Registration Failed', 'An error occurred. Please try again.');
      }
    } 
    catch (error: any) {
      console.error('Registration Error:', error);
      if (error.response) {
        Alert.alert('Registration Failed', error.response.data.error || 'An error occurred.');
      } else {
        Alert.alert('Registration Failed', 'No response from the server.');
      }
    }
    console.log(registrationData);
  };

  const renderRadioButton = (label: string, value: 0 | 1) => (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => setRole(value)}
    >
      <View style={[styles.radioCircle, role === value && styles.radioSelected]} />
      <Text style={{ ...FONTS.body5, marginLeft: 8 }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* <Image
            source={require('@/assets/images/paylodr-primary.png')}
            style={{ resizeMode: 'contain', width: 200, height: 150 }}
          /> */}
          <Text style={{ ...FONTS.body2 }}>Register</Text>
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>Physical Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
          <Text style={{ marginLeft: 10, ...FONTS.body5 }}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* <View style={{ marginTop: hp(1), marginLeft: wp(4) }}>
          <Text style={{ ...FONTS.body5, marginBottom: 8 }}>Register As</Text>
          <View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: 20 }}>
            {renderRadioButton('Client', 0)}
            {renderRadioButton('Driver', 1)}
          </View>
        </View> */}

        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%', marginLeft: wp(5), marginTop: hp(2) }}>
          <AppButton
            label="Register"
            onPress={handleRegister}
            backgroundColor={COLORS.primary}
            color={COLORS.white}
          />
        </View>

        <View style={{ alignSelf: 'center', marginTop: hp(3), flexDirection: 'row' }}>
          <Text style={{ ...FONTS.body5, marginRight: 3 }}>Already have an account?</Text>
          <TouchableOpacity onPress={handleNavigate}>
            <Text style={{ color: 'blue', ...FONTS.body5 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    width: '90%',
    borderRadius: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: COLORS.primary,
  },
});

export default Register;
