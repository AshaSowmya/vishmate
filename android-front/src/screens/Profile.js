import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, TextInput, TouchableOpacity, Linking ,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 
const Profile = () => {
 
  const navigation = useNavigation();
 
  const { width, height } = Dimensions.get('window');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [bussinessId, setBussinessId] = useState('');
 
 
  const privacyPolicy = () => {
    Linking.openURL('https://vishmate.com/privacyPolicy.html'); // Replace with your actual URL
  };
  const terms = () => {
    Linking.openURL('https://vishmate.com/termsAndConditions.html'); // Replace with your actual URL
  };
  const cancelPolicy = () => {
    Linking.openURL('https://vishmate.com/cancelPolicy.html'); // Replace with your actual URL
  };
  const about = () => {
    Linking.openURL('https://vishmate.com/#home'); // Replace with your actual URL
  };
 
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const storedCustomerId = await AsyncStorage.getItem('customerId');
        const parsedCustomerId = JSON.parse(storedCustomerId); // Parse the JSON string
        console.log("customer_id:", parsedCustomerId);
 
        if (parsedCustomerId !== null) {
          setCustomerId(parsedCustomerId);
        }
      } catch (error) {
        console.error('Error fetching customer ID from storage:', error);
      }
    };
 
    fetchCustomerId();
  }, []);
 
 
  const logout = async () => {
    // Clear any user data stored in AsyncStorage
    await AsyncStorage.clear();
 
    // Navigate back to the login screen
    navigation.navigate('SignUp'); // Assuming 'SignUp' is your login screen
  };
 
  useEffect(() => {
    if (customerId) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`https://vishmate.com:2001/api/addbussinessesbyid/${customerId}`, {
            headers: {
              Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
            },
          });
 
          console.log('API Response:', response.data);
 
          if (response.data && Array.isArray(response.data.AddBussiness) && response.data.AddBussiness.length > 0) {
            const profile = response.data.AddBussiness[0];
            const baseUrl = 'https://gurutheatre.s3.ap-south-1.amazonaws.com/'; // Update base URL
            setSelectedImage(`${baseUrl}${profile.upload_logo}`);
            console.log('Full Image URL:', `${baseUrl}${profile.upload_logo}`);
            setBusinessName(profile.bussiness_name || '');
            setEmail(profile.email || '');
            setBussinessId(profile.bussiness_id || '');
          } else {
            console.error('Unexpected response structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
 
      fetchProfile();
    }
  }, [customerId]);
 
  const PersonalInfo = () => {
    navigation.navigate('personalInfo');
  };
  const BusinessDetails = () => {
    navigation.navigate('BusinessDetails');
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
 
 
  const handleChoosePhoto = async () => { // Accept businessId as a parameter
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
 
      // Send PUT request to update the image
      const formData = new FormData();
      formData.append('upload_logo', {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      });
 
      const response = await axios.put(
        `https://vishmate.com:2001/api/addbussinesses/${bussinessId}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('businessId', bussinessId)
      console.log('Image upload response:', response.data);
 
      // Update selectedImage state with the new image
      setSelectedImage(image.path);
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        console.error('Error choosing photo:', error);
      }
    }
  };
 
 
 
  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <LinearGradient
        colors={['#0F0C29', '#302B63', '#24243E']}
        style={[styles.linearGradient, styles.shadow]}
      >
        <Text style={styles.modalTitle}>
          <Image
            source={require('../assets/images/firstpart/Vectowhite.png')}
            style={{ alignSelf: 'flex-end' }}
          />
          &nbsp;
          Sign Out
        </Text>
      </LinearGradient>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Image
          source={require('../assets/images/firstpart/Vector.png')}
          style={{ height: 30, width: 30, right: 13, top: 10 }}
        />
 
        <Text style={{ left: -10, color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 17 }}>&nbsp; Are you sure you want to</Text>
      </View>
      <Text style={{ left: -55, color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 17 }}>Signout ?</Text>
 
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttons, styles.cancelButton]} onPress={toggleModal}>
          <Text style={styles.buttonTexts}>Back</Text>
        </TouchableOpacity>
 
        <TouchableOpacity style={[styles.buttons, styles.signupButton]} onPress={() => {
          logout();
          toggleModal();
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/firstpart/clarity_power-solid.png')}
              style={{ marginRight: -10, right: 5 }} // Adjust margin as needed
            />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
 
 
  return (
    <View style={styles.container}>
 
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
            source={{ uri: selectedImage }}
            style={[styles.imageThumbnail, { borderRadius: 45, top: 60, marginBottom: 80,  left: width * 0.10,  }]}
          />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', top: 10, left: width * 0.15,  }}>{businessName}</Text>
       
      </View>
      <Text style={{ fontSize: 14, color: 'black',  top: -55, marginBottom: 1,textAlign: 'center', alignSelf: 'center', left: width * 0.09,  }}>{email}</Text>
 
      <Text style={{ fontSize: 20, marginLeft: 20, color: 'black', marginBottom: 22, fontFamily: 'Lora-Bold' }}>
        Amount
      </Text>
      <TouchableOpacity onPress={PersonalInfo}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
          <View style={styles.row}>
            <Image
              source={require('../assets/images/firstpart/healthicons_ui-user-profile.png')}
              style={styles.image}
 
            />
            <Text style={styles.text} >Personal Info</Text>
          </View>
          <Image
            source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}
            style={styles.cornerimage}
            alignSelf='flex-end' // Align the image to the right side
 
          />
        </View>
      </TouchableOpacity>
      {/* <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
        <View style={styles.row}>
          <Image
            source={require('../assets/images/firstpart/king.png')} // Provide the path to your left image
            style={styles.image}
          />
          <Text style={styles.text}>Subcription</Text>
        </View>
        <Image
          source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
          style={styles.cornerimage}
          alignSelf='flex-end' // Align the image to the right side
        />
      </View> */}
      {/* <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
        <View style={styles.row}>
          <Image
            source={require('../assets/images/firstpart/streamline_business-user-curriculum.png')} // Provide the path to your left image
            style={styles.image}
          />
          <Text style={styles.text} onPress={BusinessDetails}>Business Details</Text>
        </View>
        <Image
          source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
          style={styles.cornerimage}
          alignSelf='flex-end' // Align the image to the right side
        />
      </View> */}
      <Text style={{ fontSize: 20, fontFamily: 'Lora-Bold', marginLeft: 20, color: 'black', marginBottom: 20 }}>
        General
      </Text>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
        {/* <View style={styles.row}>
          <Image
            source={require('../assets/images/firstpart/material-symbols_language.png')} // Provide the path to your left image
            style={styles.image}
          />
          <Text style={styles.text}>Language</Text>
 
        </View> */}
        {/* <Image
          source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
          style={styles.cornerimage}
          alignSelf='flex-end' // Align the image to the right side
        /> */}
      </View>
      <TouchableOpacity onPress={about}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
          <View style={styles.row}>
            <Image
              source={require('../assets/images/firstpart/ico.png')} // Provide the path to your left image
              style={styles.image}
            />
            <Text style={styles.text}>About Us</Text>
          </View>
          <Image
            source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
            style={styles.cornerimage}
            alignSelf='flex-end' // Align the image to the right side
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={privacyPolicy}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.row}>
            <Image
              source={require('../assets/images/firstpart/Group.png')} // Provide the path to your left image
              style={styles.imaged}
            />
            <Text style={styles.text}>Privacy Poicy</Text>
          </View>
          <Image
            source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
            style={styles.cornerimage}
            alignSelf='flex-end' // Align the image to the right side
          />
 
        </View>
      </TouchableOpacity>
 
      <TouchableOpacity onPress={terms}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
          <View style={styles.row}>
            <Image
              source={require('../assets/images/firstpart/Group.png')} // Provide the path to your left image
              style={styles.imaged}
            />
            <Text style={styles.text}>Terms and  Condition</Text>
          </View>
          <Image
            source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
            style={styles.cornerimage}
            alignSelf='flex-end' // Align the image to the right side
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelPolicy}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
          <View style={styles.row}>
            <Image
              source={require('../assets/images/firstpart/Group.png')} // Provide the path to your left image
              style={styles.imaged}
            />
            <Text style={styles.text}>Cancel Policy</Text>
          </View>
          <Image
            source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
            style={styles.cornerimage}
            alignSelf='flex-end' // Align the image to the right side
          />
        </View>
      </TouchableOpacity>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
 
        <Image
          source={require('../assets/images/firstpart/material-symbols_arrow-forward-ios-rounded.png')}// Provide the path to your right image
          style={styles.cornerimage}
          alignSelf='flex-end' // Align the image to the right side
        />
      </View>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
 
        <View style={styles.row}>
          <Image
            source={require('../assets/images/firstpart/Vector.png')} // Provide the path to your left image
            style={styles.image}
          />
          <Text style={styles.Stext} onPress={toggleModal}>Sign Out</Text>
        </View>
 
 
        <Modal
          // animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            {renderModalContent()}
          </View>
        </Modal>
      </View>
 
 
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    marginTop: -25,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  text: {
    fontSize: 17,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 36,
    color: 'black'
    , marginBottom: 10// Adjust as needed to add spacing between the images and text
  },
  ltext: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 150,
    color: 'gray'
    , marginBottom: 10,// Adjust as needed to add spacing between the images and text
    top: 3
  },
  Stext: {
    fontSize: 20,
    fontFamily: 'Lora-Bold',
    marginLeft: 36,
    color: 'red'
    , marginBottom: 10// Adjust as needed to add spacing between the images and text
  },
  image: {
    width: 24, // Adjust the width of the images as needed
    height: 24, // Adjust the height of the images as needed
    left: 15,
    marginBottom: 10
  },
  imaged: {
    width: 21, // Adjust the width of the images as needed
    height: 21, // Adjust the height of the images as needed
    left: 17,
    marginBottom: 10
  },
  cornerimage: {
    width: 24, // Adjust the width of the images as needed
    height: 24, // Adjust the height of the images as needed
    marginBottom: 10,
    left: -15
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 'auto',
    width: 300
  },
  modalTitle: {
    fontSize: 19,
    fontFamily: 'Lora-Bold',
    top: 3,
    color: 'white',
    top: '1%',
    left: '48%', // Align to the center horizontally
    transform: [{ translateX: -150 }],
 
  },
  input: {
    width: 250,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  linearGradient: {
    height: 85,
    width: 300,
    top: -20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginLeft: 10
  },
  buttonTexts: {
    color: '#302B63',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
 
    fontSize: 15
  },
  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    width: 110,
 
    // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 26, // Add margin top for spacing
  },
  signupButton: {
    backgroundColor: '#FF0000', // Change color as needed
    marginRight: 6,
    // Adjust as needed for spacing
  },
  cancelButton: {
    backgroundColor: 'transparent', // Set background color to transparent
    borderColor: '#302B63', // Border color same as button background color
    borderWidth: 1,
    marginLeft: 6, // Adjust as needed for spacing
  },
  uploadIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
 
  imageThumbnail: {
    width: 85,
    height: 85,
   
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
 
export default Profile;
 
 
