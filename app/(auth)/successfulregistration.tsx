import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Image, Alert } from 'react-native'
import AppButton from '@/components/AppButton'
import axios from 'axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '@/constants/theme'
import { useLocalSearchParams, useRouter } from 'expo-router';
const SuccessfulRegistration = () => {
    const { email } = useLocalSearchParams();
    const [token, setToken] = useState('');
    
    const router = useRouter();
    const handleNavigate = () => {
        router.push({ pathname: `/` });
      };
    const handleVerify = async() => {
        try {
            const response = await axios.post('https://payloader.fctdme.org.ng/clientRsrc/codeVerifier', {
                newUserEmail: email,
                newUserVrfCode: token,
            });
        
            if (response.status === 201) {
              setTimeout(() => {
                Alert.alert('Verification Successful', response.data.message || 'Login Successful');
                handleNavigate();  
              }, 1000);
        
            } else {
              Alert.alert('Login Failed', response.data.message || 'Invalid email or password');
            }
          } catch (error: any) {
            console.error('Login Error:', error);
            if (error.response) {
              Alert.alert('Login Failed', error.response.data.message || 'Invalid email or password');
            } else if (error.request) {
              Alert.alert('Login Failed', 'No response from the server');
            } else {
              Alert.alert('Login Failed', 'An error occurred while trying to login');
            }
          }
    }

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>   
    <View style={{alignItems:'center', justifyContent: 'center',}}>
   
    <View>
    
     {/* <Image source={require('@/assets/images/paylodr-primary.png')} 
          style={{
            resizeMode: 'contain',
            width: 200,
            height: 150
          }}
     /> */}
    
     </View>
          
      <Text style={{...FONTS.body3, marginBottom: hp(5)}}>
        Account Created Successfully
      </Text>
      <Text style={{...FONTS.body4, marginBottom: hp(5)}}>
        Check your email for verification Link
      </Text>

    <View style={{width: '100%', alignItems: 'flex-start', marginLeft: wp(2)}}>
    <Text style={{marginLeft: 10, ...FONTS.body5}}> Token </Text>
      <TextInput 
      onChangeText={setToken}
      style={{ margin: 12, borderWidth: 0.5, padding: 10, width: '90%', borderRadius: 10}}
      />
    </View>
    </View>
        

    <View style={{alignItems: 'center', width: '90%', marginLeft: wp(5)}}>
    <AppButton 
        label="VERIFY"
        onPress={handleVerify}
        backgroundColor={COLORS.primary}
        color={COLORS.white}
      />
      </View>     

        {/* <View style={{alignSelf: 'center', marginTop: hp(45), flexDirection: 'column'}}>
            <Text style={{...FONTS.body5}}>
               Nigerian Meteorological Agency Copyright © 2024 
            </Text>
        </View> */}
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderColor: '#E2E1E1',
      borderRadius: 10
    },
    button: {
      color: '#00BA9D',
      borderRadius: 10

    }
  });

export default SuccessfulRegistration