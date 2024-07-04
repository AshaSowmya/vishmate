/********************************************Password Verification*********************************************************************************************** */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const VerifyPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
 

  const handleContinue = () => {
    navigation.navigate('SignUp'); // Change 'yoga2' to the correct screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Fortify Your Account</Text>
        <Text style={styles.label1}>Create a Strong Password to Unlock into</Text>
        <Text style={styles.label2}>Creative world </Text>
        <Text style={styles.label}>New Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.textfield}
            onChangeText={setPassword}
            value={password}
            placeholder="Business name"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={!passwordVisibility}
          />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon name={showConfirmPassword ? 'eye-off-outline' : 'eye'} size={20} />
            </TouchableOpacity>
        </View>
        <Text style={styles.label}>Confirm Password *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.textfield}
            onChangeText={setConfirmPassword}
            value={confirmpassword}
            secureTextEntry={!confirmPasswordVisibility}
          />
          <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon name={showConfirmPassword ? 'eye-off-outline' : 'eye'} size={20} />
            </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <LinearGradient
          colors={['#0F0C29', '#302B63', '#24243E']}
          style={{ borderRadius: 6 }}
          start={{ x: 0.1, y: 2.95 }}
          end={{ x: 0, y: 0 }}>
          <TouchableOpacity style={styles.buttons}  onPress={handleContinue}>
            <Text style={{ textAlign: "center", color: 'white', fontFamily: "Lora-Bold", fontWeight: 'bold' }}>Continue</Text>
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
    marginTop: 25
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
  text: {
    fontSize: 20,
    fontFamily: "Lora-Bold",
    color: '#000000',
    marginBottom: 20,
    top: 35
  },
  label: {
    fontSize: 15,
    fontFamily: "Montserrat-Medium",
    color: '#000000',
    top: 20,
    alignSelf: 'flex-start',
    marginLeft: 22,
    marginTop: 25
  },
  textfield: {
    marginTop:25,
    flex: 1,
    borderColor: '#ACACAC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 45,
    fontFamily: "Lora-VariableFont_wght",
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 370,
  },
  eyeIcon: {
    position: 'absolute',
    top: 35,
    right: 10,
    zIndex: 1,
  },
  space: {
    height: 50,
  },
  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 370,
    
  },
});

export default VerifyPassword;