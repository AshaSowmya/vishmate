// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// const Otp = () => {
//   const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits

//   const handleChangeText = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   const navigation = useNavigation();

//   const handleVerify = () => {
//     navigation.navigate('VerifyPassword'); // Change 'VerifyPassword' to the correct screen name
//   };

//   const otpFilled = otp.every(digit => digit !== ''); // Check if all OTP digits are filled

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.text}>Unlock Your Next Chapter</Text>
//         <Text style={styles.label1}>Enter the verification code we just sent on your </Text>
//         <Text style={styles.label2}>Email Address</Text>

//         <View style={styles.otpContainer}>
//           {otp.map((digit, index) => (
//             <View key={index} style={[styles.otpInputWrapper, index !== otp.length - 1 && styles.otpInputMarginRight]}>
//               <TextInput
//                 style={[styles.inputfield, digit ? styles.filledInput : null]} // Apply filledInput style when OTP digit is entered
//                 keyboardType="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChangeText={(text) => handleChangeText(text, index)}
//               />
//             </View>
//           ))}
//         </View>

//         <View style={styles.gap}></View>
//         <LinearGradient
//           colors={otpFilled ? ['#0F0C29', '#302B63', '#24243E'] : ['#CCCCCC', '#CCCCCC', '#CCCCCC']} // Change colors based on whether OTP is filled
//           style={{ borderRadius: 6 }}
//           start={{ x: 0.1, y: 2.95 }}
//           end={{ x: 0, y: 0 }}>
//           <TouchableOpacity style={styles.buttons} onPress={handleVerify}>
//             <Text style={{ textAlign: "center", color: 'white', fontFamily: "Lora-Bold", fontWeight: 'bold' }}>Continue</Text>
//           </TouchableOpacity>
//         </LinearGradient>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 40,
//     marginTop: 25,
//   },
//   text: {
//     fontSize: 20,
//     fontFamily: "Lora-Bold",
//     color: '#000000',
//     marginBottom: 20,
//     top: 35
//   },
//   instructionsContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 20
//   },
//   instructions: {
//     fontSize: 16,
//     fontFamily: "Montserrat-Medium",
//     color: '#000000',
//     textAlign: 'center',
//     marginLeft: 20
//   },
//   label1: {
//     fontSize: 15,
//     fontWeight: '600',
//     fontFamily: "Montserrat-Medium",
//     color: "black",
//     top: 20,
//     alignSelf: 'flex-start',
//     justifyContent: 'center',
//     marginLeft: 22,
//     marginTop: 25,

//     lineHeight: 20,
//   },
//   label2: {
//     fontSize: 15,
//     fontWeight: '600',
//     fontFamily: "Montserrat-Medium",
//     color: "black",
//     top: 20,
//     alignSelf: 'flex-start',
//     justifyContent: 'center',
//     marginLeft: 22,
//     marginTop: 5,
//     width: 400,
//     lineHeight: 20,
//   },
//   inputfield: {
//     flex: 1,
//     borderColor: 'black',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//     height: 45,
//     fontFamily: "Lora-VariableFont_wght",
//     marginHorizontal: 5,
//     textAlign: 'center'
//   },
//   filledInput: {
//     backgroundColor: '#0F0C29', // Change the background color when OTP digit is entered
//     color: '#FFFFFF'
//   },
//   emailInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: 370,
//   },
 
//   gap: {
//     height: 95,
//   },
//   buttons: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     width: 370,
//     borderColor: '#ffffff',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     marginTop: 50,
//     width: 270,
//   },
//   otpInputWrapper: {
//     flex: 1,
//   },
//   otpInputMarginRight: {
//     marginRight: 10, // Adjust this value to control the gap between input boxes
//   },
  
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits

  const handleChangeText = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const navigation = useNavigation();

  const handleVerify = () => {
    navigation.navigate('VerifyPassword'); // Change 'VerifyPassword' to the correct screen name
  };

  const otpFilled = otp.every(digit => digit !== ''); // Check if all OTP digits are filled

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Unlock Your Next Chapter</Text>
        <Text style={styles.label1}>Enter the verification code we just sent on your </Text>
        <Text style={styles.label2}>Email Address</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={[styles.otpInputWrapper, index !== otp.length - 1 && styles.otpInputMarginRight]}>
              <TextInput
                style={[styles.inputfield, digit ? styles.filledInput : null]} // Apply filledInput style when OTP digit is entered
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
              />
            </View>
          ))}
        </View>

        <View style={styles.gap}></View>
        <LinearGradient
          colors={otpFilled ? ['#0F0C29', '#302B63', '#24243E'] : ['#CCCCCC', '#CCCCCC', '#CCCCCC']} // Change colors based on whether OTP is filled
          style={{ borderRadius: 6 }}
          start={{ x: 0.1, y: 2.95 }}
          end={{ x: 0, y: 0 }}>
          <TouchableOpacity style={styles.buttons} onPress={handleVerify}>
            <Text style={{ textAlign: "center", color: 'white', fontFamily: "Lora-Bold", fontWeight: 'bold' }}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  instructions: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: '#000000',
    textAlign: 'center',
    marginLeft: 20
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
  inputfield: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 45,
    fontFamily: "Lora-VariableFont_wght",
    marginHorizontal: 5,
    textAlign: 'center'
  },
  filledInput: {
    backgroundColor: '#0F0C29', // Change the background color when OTP digit is entered
    color: '#FFFFFF'
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 370,
    borderColor: '#ffffff',
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: 50,
    width: 270,
  },
  otpInputWrapper: {
    flex: 1,
  },
  otpInputMarginRight: {
    marginRight: 10, // Adjust this value to control the gap between input boxes
  },
  
});
export default Otp;
