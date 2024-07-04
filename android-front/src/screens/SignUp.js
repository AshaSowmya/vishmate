




import React, { useState,useEffect ,useCallback} from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView,Dimensions, Alert,Linking ,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_API_GATEWAY_URL } from '@env';
 
const { width, height } = Dimensions.get('window');
const SignUpForm = () => {
 
  const [form, setForm] = useState({
    name: '',
    mobilenumber: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [isChecke, setChecke] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState('signIn'); // Default mode is 'signUp'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPasswords, setShowConfirmPasswords] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable for login status
  const navigation = useNavigation();
 
 
  const privacyPolicy = () => {
    Linking.openURL('https://vishmate.com/privacyPolicy.html'); // Replace with your actual URL
  };
 
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const loggedIn = await AsyncStorage.getItem('isLoggedIn');
  //     if (loggedIn === 'true') {
  //       setIsLoggedIn(true);
  //       navigation.navigate('Tab');
  //     }
  //     setLoading(false); // Set loading to false after checking login status
  //   };
  //   checkLoginStatus();
  // }, []);
 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
  const handleSignUp = async () => {
    if (!form.name.trim()) {
      Alert.alert('Name field is empty');
      return;
    }
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
 
    setEmailError('');
 
    if (form.mobilenumber.length !== 10) {
      setMobileNumberError('Mobile number must be 10 digits');
      return;
    }
 
    setMobileNumberError('');
 
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (!isChecked) {
      Alert.alert('Please agree to the Privacy Policy');
      return;
    }
 
    try {
      const response = await axios.post(
        `${REACT_APP_API_GATEWAY_URL}/api/signupdata`,
        {
          name: form.name,
          mobilenumber: form.mobilenumber,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287`,
            'Content-Type': 'application/json',
          },
        }
      );
 
      if (response.status === 201) {
        await AsyncStorage.setItem('userName', form.name);
        await AsyncStorage.setItem('userMobile', form.mobilenumber);
        await AsyncStorage.setItem('userEmail', form.email);
        await AsyncStorage.setItem('userPassword', password);
        await AsyncStorage.setItem('privacyStatus', JSON.stringify(isChecked));
 
        Alert.alert('Sign Up Successful');
        navigation.navigate('Subscribe');
      } else {
        Alert.alert('Sign Up Failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert('User Already Exists');
      } else {
        console.error('Error during sign up:', error);
        Alert.alert('An error occurred during sign up');
      }
    }
  };
 
 
  const handleInputChange = (name, value) => {
    if (name === 'mobilenumber') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };
 
  const handleCheckBoxToggle = () => {
    setChecked(!isChecked);
  };
 
  const handleCheckBoxToggles = () => {
    setChecke(!isChecke);
  };
 
  const handleContinue = () => {
    navigation.navigate('ForgotPassword');
  };
 
  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_GATEWAY_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287`,
            'Content-Type': 'application/json',
          },
        }
      );
 
      if (response.status === 200) {
        Alert.alert('Login successful');
 
        const token = response.data.token;
        const customerId = response.data.Customer_id || 'default_customer_id';
        const userStatus = response.data.User_status || 'unpaid';
 
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('customerId', JSON.stringify(customerId));
        
        // await AsyncStorage.setItem('isLoggedIn', 'true');
 
        const hasLoggedInBefore = await AsyncStorage.getItem('hasLoggedInBefore');
 
        if (userStatus === 'paid') {
          const customerExists = await checkCustomerIdExists(customerId);
          if (customerExists) {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('addBusiness', 'true');
            setIsLoggedIn(true);
            navigation.navigate('Tab');

          } else {
            navigation.navigate('AddBusiness');
          
            await AsyncStorage.setItem('hasLoggedInBefore', 'true');
         
          }
        } else if (userStatus === 'unpaid') {
          navigation.navigate('Subscribe');
        } else {
          Alert.alert('Unexpected user status:', userStatus);
        }
      } else {
        Alert.alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert('Invalid email or password');
        } else if (error.response.status === 429) {
          Alert.alert('Please wait for 60 seconds');
        } else {
          Alert.alert('An error occurred during login');
        }
      } else {
        Alert.alert('An error occurred during login');
      }
    }
  };
 
 
  const checkCustomerIdExists = async (customerId) => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/addbussinessesbyid/${customerId}`, {
        headers: {
          Authorization: `Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287`,
          'Content-Type': 'application/json',
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error checking customer ID:', error);
      return false;
    }
  };
 

  const handleBackButtonPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => {
            // Close the app
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false }
    );
 
    // Return true to prevent further handling of the back button
    return true;
  };
 
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
 
      return () => backHandler.remove();
    }, [])
  );
  const CustomButton = ({ title, onPress, isActive }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={isActive ? ['#0F0C29', '#302B63', '#24243E'] : ['white', 'white']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, { borderColor: 'black' }]}
        >
          <Text style={[styles.buttonText, { left: -9, top: -2, fontSize: 12, color: isActive ? '#fff' : '#000' }]}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
 
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={{ marginRight: -158 }}>
            <CustomButton
              title="Sign Up"
              onPress={() => setMode('signUp')}
              isActive={mode === 'signUp'}
           
            />
          </View>
          <CustomButton
            title="Sign In"
            onPress={() => setMode('signIn')}
            isActive={mode === 'signIn'}
          />
        </View>
        {mode === 'signUp' && (
          <>
            <Text style={{ color: 'black', marginBottom: 15, fontFamily: 'Montserrat-Medium', top: 8 ,textAlign: 'left', alignSelf: 'flex-start'}}>Name *</Text>
            <TextInput
              style={[styles.input, { fontSize: width * 0.035 },{ color: darkMode ? 'black' : 'black' }]}
              placeholder=""
              onChangeText={(value) => handleInputChange('name', value)}
              value={form.name}
            />
            <Text style={{  color: 'black', marginTop: 10, marginBottom: 15, fontFamily: 'Montserrat-Medium', top: 8,textAlign: 'left', alignSelf: 'flex-start' }}>Mobile Number *</Text>
            <View style={styles.inputContainer}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <TextInput
                style={[styles.minput, { color: darkMode ? 'black' : 'black' }]}
                placeholder=""
                onChangeText={(value) => handleInputChange('mobilenumber', value)}
                value={form.mobilenumber}
                keyboardType="numeric"
                maxLength={10}
              />
           
            </View>
 
            {mobileNumberError ? <Text style={{ color: 'red', marginBottom: 10 }}>{mobileNumberError}</Text> : null}
 
            <Text style={{  color: 'black', marginBottom: 15, fontFamily: 'Montserrat-Medium', top: 8,textAlign: 'left', alignSelf: 'flex-start' }}>Email *</Text>
            <TextInput
              style={[styles.input,{ fontSize: width * 0.035 }, { color: darkMode ? 'black' : 'black' }]}
              placeholder=""
              onChangeText={(value) => handleInputChange('email', value)}
              value={form.email}
              keyboardType="email-address"
            />
              {emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
             
            <Text style={{  color: 'black', marginBottom: 15, fontFamily: 'Montserrat-Medium',textAlign: 'left', alignSelf: 'flex-start' }}>Password *</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                secureTextEntry={!showConfirmPasswords}
                style={[styles.input,{ fontSize: width * 0.035 }, { color: darkMode ? 'black' : 'black' }]}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPasswords(!showConfirmPasswords)}
              >
                 <Icon name={showConfirmPasswords ? 'eye-off-outline' : 'eye'} size={20} color={darkMode ? 'gray' : 'black'}/>
              </TouchableOpacity>
            </View>
            <Text style={{  color: 'black', marginBottom: 15, fontFamily: 'Montserrat-Medium' ,textAlign: 'left', alignSelf: 'flex-start' }}>Confirm Password *</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                secureTextEntry={!showConfirmPassword}
                style={[styles.input, { color: darkMode ? 'black' : 'black' }]}
                placeholder="Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
           <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon name={showConfirmPassword ? 'eye-off-outline' : 'eye'} size={20} color={darkMode ? 'gray' : 'black'} />
              </TouchableOpacity>
             
            </View>
              <View style={{ width: '89%', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: -20, marginTop: 10, height: 100, top: 5, color: '' }}
                  checked={isChecked}
                  onPress={handleCheckBoxToggle}              
                  checkedColor="black"
                />
                <TouchableOpacity  onPress={privacyPolicy}  style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Text style={{ fontSize: 10, color: 'black', fontFamily: 'Montserrat-Medium', marginLeft: -30, marginTop: -29 }}>
                    I have read the <Text style={{ color: '#24243E', fontWeight: 'bold', fontSize: 12 }} >Privacy Policy </Text> and agree to this policy.
                  </Text>
                </TouchableOpacity>
              </View>
             
              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <LinearGradient
                colors={['#0F0C29', '#302B63', '#24243E']}
                start={{ x: 0, y: 0.6 }}
                end={{ x: 0, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={[styles.signUpButtonText, { fontSize: width * 0.035 }]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View>
              <Text style={{ marginTop: 60 }}></Text>
            </View>
          </>
        )}
        {mode === 'signIn' && (
          <>
            <Text style={{color: 'black', marginBottom: 15,textAlign: 'left', alignSelf: 'flex-start' }}>Email *</Text>
            <TextInput
              style={[styles.input, { color: darkMode ? 'black' : 'black' }]}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
            <Text style={{ marginBottom: 15, color: 'black' ,textAlign: 'left', alignSelf: 'flex-start'}}>Password *</Text>
            <View style={[styles.inputWrapper, { marginBottom: 65 }]}>
              <TextInput
                secureTextEntry={!showPassword}
                style={[styles.input, { color: darkMode ? 'black' : 'black' }]}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity onPress={handleContinue}>
                <Text style={{ textAlign: 'right', alignSelf: 'flex-end', top: 3, color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>Forgot Password ?</Text>
              </TouchableOpacity>
              <View style={{ width: '89%', marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
               
              </View>
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'eye-off-outline' : 'eye'} size={20} color={darkMode ? 'gray' : 'black'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignIn}>
              <LinearGradient
                colors={['#0F0C29', '#302B63', '#24243E']}
                start={{ x: 0, y: 0.6 }}
                end={{ x: 0, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={[styles.signUpButtonText, { fontSize: width * 0.035 }]}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View>
              <Text style={{ marginTop: 320 }}></Text>
            </View>
          </>
        )}
       
      </View>
 
    </ScrollView>
 
  );
};
 
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: height * 0.07,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
    borderRadius: 5,
  },
  pinput: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 65,
    height: 40,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 150,
    borderWidth: 1, // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex',
  },
  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 374,
    height: 50,
    // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex',
  },
  buttond: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 374,
    // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex',
  },
  buttonss: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 150,
    // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex',
  },
  Inbutton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 150,
    // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex',
  },
  signUpButton: {
    marginTop: height * 0.02,
    borderRadius: 10,
    overflow: 'hidden',
    width:'100%'
  },
  signUpButtonText: {
    textAlign: 'center',
    padding: height * 0.015,
    color: '#fff',
    fontFamily: 'Lora-Bold',
    fontSize: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Lora-Bold',
    fontSize: 15,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
  },
  inputd: {
    width: '100%',
   
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
  },
  minput: {
    width: '86%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 1, // Rounded top-left corner
    borderBottomLeftRadius: 1, // Rounded bottom-left corner
    borderTopRightRadius: 10, // Straight top-right corner
    borderBottomRightRadius: 10, // Straight bottom-right corner
    height: 50,
    marginRight: 7,
  },
  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countryCodeContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 1,
    padding: 5,
    marginRight: 10,
    left: 10,
    top: -5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
  },
  countryCode: {
    fontSize: 16,
    color: 'black',
    height: 37,
    top: 8,
    width: 42,
    left: 5,
  },
});
 
export default SignUpForm;