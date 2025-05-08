import React, { useState,  } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AppButton from '@/components/AppButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { COLORS, FONTS } from '@/constants/theme';
import { useRouter,  } from 'expo-router';
import { useAuth } from '@/context/AuthContext';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = () => {
      router.push({
          pathname: '/(auth)/register',
      })
  }
   
  const handleReset = () => {
    router.push({
      pathname: '/(auth)/forgotpassword',
  })
  }


  const handleLogin = async () => {
    setLoading(true); 
    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginBottom: heightPercentageToDP(5) }}>
        <View>
          {/* <Image source={require('@/assets/images/paylodr-primary.png')}
            style={{
              resizeMode: 'contain',
              width: 200,
              height: 150
            }}
          /> */}
        </View>
        <Text style={{ ...FONTS.body2 }}>
          Login
        </Text>
      </View>

      <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
        <Text style={{ marginLeft: 10, ...FONTS.body5 }}> Enter Your Email </Text>
        <TextInput
          style={{ margin: 12, borderWidth: 0.5, padding: 10, width: '90%', borderRadius: 10 }}
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: wp(2) }}>
        <Text style={{ marginLeft: 10, ...FONTS.body5 }}> Enter Your Password </Text>
        <TextInput
          style={{ margin: 12, borderWidth: 0.5, padding: 10, width: '90%', borderRadius: 10 }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>

      <View style={{ alignItems: 'center', width: '90%', marginLeft: wp(5) }}>
        <AppButton
          label={loading ? 'Loading...' : 'LOGIN'}
           onPress={handleLogin}
          backgroundColor={COLORS.primary}
          color={COLORS.white}
          disabled={loading}
        />
      </View>

      <View style={{ alignSelf: 'center', marginTop: hp(5), flexDirection: 'row' }}>
        <Text style={{ ...FONTS.body5, marginRight: 3 }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ color: 'blue', ...FONTS.body5 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignSelf: 'center', marginTop: hp(1), flexDirection: 'row' }}>
        <Text style={{ ...FONTS.body5, marginRight: 3 }}>
          Forgot Password?
        </Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={{ color: 'blue', ...FONTS.body5 }}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{ alignSelf: 'center', marginTop: hp(25), flexDirection: 'column' }}>
        <Text style={{ ...FONTS.body5 }}>
          Nigerian Meteorological Agency Copyright © 2024
        </Text>
      </View> */}
    </View>
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

