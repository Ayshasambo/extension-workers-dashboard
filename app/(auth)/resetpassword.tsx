import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import AppButton from '@/components/AppButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '@/constants/theme'

import axios from 'axios';

const ResetPassword = () => {
    
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
      
    const handleReset = async () => {
    //   try {
    //     const response = await axios.post('http://demo.nimet.gov.ng:3000/api/login/reset-password', {
    //       token: token,
    //       newpassword: newPassword
    //     });
    //     if (response.status === 200) {
    //       Alert.alert(
    //         'Successful',
    //         'Password Reset Successfully',
    //         [
    //           {
    //             text: 'OK',
    //             onPress: () => {
    //               console.log('Login');
    //             },
    //           },
    //         ]
    //       );
          
    
    //     } else {
    //       Alert.alert('Token Error', response.data.message || 'Invalid token');
    //     }
        
    //   } catch (error) {
    //     console.error('Login Error:', error);
    //     if (error.response) {
    //       // Server responded with a status other than 2xx
    //       Alert.alert('Validation Failed', error.response.data.message || 'Invalid token or password');
    //     } else if (error.request) {
    //       // Request was made but no response was received
    //       Alert.alert('Validation Failed', 'No response from the server');
    //     } else {
    //       // Something happened while setting up the request
    //       Alert.alert('Validation Failed', 'An error occurred while trying to Reset Password');
    //     }
    //   }
  
    };
  
    const handleResendToken = async () => {
        // try {
        //   const response = await axios.post('http://demo.nimet.gov.ng:3000/api/login/forgot-password', {
        //     email: email,
        //   });
        //   if (response.status === 200) {
        //     Alert.alert(
        //       'Successful',
        //       'Please check your email for the token',
        //       [
        //         {
        //           text: 'OK'},
        //       ]
        //     );

        //   } else {
        //     Alert.alert('Email Error', response.data.message || 'Invalid email');
        //   }
          
        // } catch (error) {
        //   console.error('Login Error:', error);
        //   if (error.response) {
        //     // Server responded with a status other than 2xx
        //     Alert.alert('Validation Failed', error.response.data.message || 'Invalid email or password');
        //   } else if (error.request) {
        //     // Request was made but no response was received
        //     Alert.alert('Validation Failed', 'No response from the server');
        //   } else {
        //     // Something happened while setting up the request
        //     Alert.alert('Validation Failed', 'An error occurred while trying to Reset Password');
        //   }
        // }
    
      };
  

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>   
    <View style={{alignItems:'center', justifyContent: 'center',}}>
   
    <View>
    
     {/* <Image source={require('@/assets/images/paylodr-primary.png')} 
          style={{
            resizeMode: 'contain',
            width: 300,
            height: 150
          }}
     /> */}
    
     </View>

      <Text style={{...FONTS.body2, marginBottom: hp(5)}}>
        Reset Password
      </Text>
    </View>
        
    <View style={{width: '100%', alignItems: 'flex-start', marginLeft: wp(2)}}>
    <Text style={{marginLeft: 10, ...FONTS.body5}}> Token </Text>
      <TextInput 
      onChangeText={setToken}
      style={{ margin: 12, borderWidth: 0.5, padding: 10, width: '90%', borderRadius: 10}}
      />
    </View>

    <View style={{width: '100%', alignItems: 'flex-start', marginLeft: wp(2)}}>
    <Text style={{marginLeft: 10, ...FONTS.body5}}> New Password </Text>
      <TextInput 
        onChangeText={setNewPassword}
      style={{ margin: 12, borderWidth: 0.5, padding: 10, width: '90%', borderRadius: 10}}
      />
    </View>

    <View style={{alignItems: 'center', width: '90%', marginLeft: wp(5)}}>
    <AppButton 
        label="REST PASSWORD"
        onPress={handleReset}
        backgroundColor={COLORS.primary}
        color={COLORS.white}
      />
      </View>     
      
      <View style={{alignSelf: 'center', marginTop: hp(5), flexDirection: 'row'}}>
            <Text style={{...FONTS.body5, marginRight: 3}}>
               Didn't receive code?   
            </Text>
            <TouchableOpacity onPress={handleResendToken}>
            <Text style={{color: 'blue', ...FONTS.body5}}>
               Resend Token 
            </Text>
            </TouchableOpacity>
      </View>


        {/* <View style={{alignSelf: 'center', marginTop: hp(30), flexDirection: 'column'}}>
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

export default ResetPassword