import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleVerify = () => {
    navigation.navigate('Otp'); // Change 'Otp' to the correct screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Forget Password ?</Text>
        <Text style={styles.label1}>Enter Your Registered Email Address to Receive</Text>
        <Text style={styles.label2}>OTP for Account Verification</Text>
        <Text style={styles.label}>Email</Text>
        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.inputfield}
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="#ACACAC"
          />
        </View>
        <View style={styles.gap}></View>
        <LinearGradient
          colors={['#0F0C29', '#302B63', '#24243E']}
          style={{ borderRadius: 6 }}
          start={{ x: 0.1, y: 2.95 }}
          end={{ x: 0, y: 0 }}>
          <TouchableOpacity style={styles.buttons} onPress={handleVerify}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontFamily: "Lora-Bold",
    color: '#000000',
    marginBottom: 20,
    top: 35
  },
  label1: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: "Montserrat-Medium",
    color: "black",
    top: 20,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginLeft: 22,
    marginTop: 25,
    width: 400,
    lineHeight: 20,
  },
  label2: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: "Montserrat-Medium",
    color: "black",
    top: 20,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginLeft: 22,
    marginTop: 5,
    width: 400,
    lineHeight: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: "Montserrat-Medium",
    color: 'black',
    top: 25,
    alignSelf: 'flex-start',
    marginLeft: 22,
    marginTop: 25
  },
  inputfield: {
    marginTop: 30,
    flex: 1,
    borderColor: '#ACACAC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 45,
    fontFamily: "Lora-VariableFont_wght",
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 370,
  },
  gap: {
    height: 95,
  },
  buttons: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: 370,
   
  },
  buttonText: {
    textAlign: "center",
    color: 'white',
    fontFamily: "Lora-Bold",

    fontSize:20
    
  },
});

export default ForgotPassword;
