import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, ScrollView, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon, { Icons } from '../bottomTab/Icons'; // Assuming you have the Icons component properly set up
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_GATEWAY_URL } from '@env';
 
const AddBusiness = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFooter, setSelectedFooter] = useState(null);
  const [logoFileName, setLogoFileName] = useState(null);
  const [footerFileName, setFooterFileName] = useState(null);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [requiredFields, setRequiredFields] = useState({ category: false, name: false, address: false, mobileNumber: false, email: false });
  const [data, setData] = useState([]); // State to hold fetched categories
  const { width: screenWidth } = Dimensions.get('window');
  const screenWidthAdjusted = screenWidth - 40; // Adjusting for padding/margin if needed
  const footerImageWidth = screenWidthAdjusted;
  const footerImageHeight = (footerImageWidth / 1080) * 150;
 
 
  const [businessDetails, setBusinessDetails] = useState({
    customer_id: "",
    upload_logo: "",
    selected_category: "",
    bussiness_name: "",
    address: "",
    footer_image: "",
    mobile_no: "",
    alternate_no: "",
    email: "",
    website: "",
  });
 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
 
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const customerId = await AsyncStorage.getItem('customerId');
        const parsedCustomerId = JSON.parse(customerId); // Parse the JSON string
        console.log("customer_id:", parsedCustomerId);
 
        if (parsedCustomerId !== null) {
          setBusinessDetails(prevDetails => ({
            ...prevDetails,
            customer_id: parsedCustomerId
          }));
        }
      } catch (error) {
        console.error('Error fetching customer ID from storage:', error);
      }
    };
 
    fetchCustomerId();
  }, []);
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/categoryposts`, {
          headers: {
            'Authorization': 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Fetched categories response:', response.data); // Log the response data
 
        // Check if the response data has the categoryframe key
        if (response.data && Array.isArray(response.data.categorypost)) {
          const categories = response.data.categorypost.map(category => ({
            label: category.category_name,
            value: category.category_name,
          }));
          setData(categories);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
 
    fetchCategories();
  }, []);
 
  const handleStartExplorings = async () => {
    const formData = new FormData();
 
    if (selectedImage) {
      const uploadLogo = {
        uri: selectedImage,
        type: 'image/jpeg',
        name: logoFileName,
      };
      formData.append('upload_logo', uploadLogo);
    }
 
    formData.append('customer_id', businessDetails.customer_id); // Use businessDetails.customer_id here
    formData.append('selected_category', businessDetails.selected_category);
    formData.append('bussiness_name', businessDetails.bussiness_name);
    formData.append('address', businessDetails.address);
 
    if (selectedFooter) {
      const uploadFooter = {
        uri: selectedFooter,
        type: 'image/jpeg',
        name: footerFileName,
      };
      formData.append('footer_image', uploadFooter);
    }
 
    formData.append('mobile_no', businessDetails.mobile_no);
    formData.append('alternate_no', businessDetails.alternate_no);
    formData.append('email', businessDetails.email);
    formData.append('website', businessDetails.website);
 
    console.log('FormData:', formData);
 
    try {
      const response = await axios.post(`${REACT_APP_API_GATEWAY_URL}/api/addbussiness`, formData, {
        headers: {
          'Authorization': 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
          'Content-Type': 'multipart/form-data',
        },
      });
 
      console.log('Response:', response.data);
      navigation.navigate('Tab');
    } catch (error) {
      console.error('Error during form submission:', error);
      throw error; // Re-throw the error to be caught in handleSubmit
    }
  };
 
  const handleStartExploring = () => {
    navigation.navigate('Tab');
  };
 
  const linearGradientColors = ['#0F0C29', '#302B63', '#24243E'];
 
  const handleChoosePhoto = () => {
    ImageCropPicker.openPicker({
      cropping: false, // Remove cropping option
      includeBase64: true, // Include base64 data for the image
    }).then(image => {
      setSelectedImage(image.path);
      const splitPath = image.path.split('/');
      setLogoFileName(splitPath[splitPath.length - 1]);
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };
 
 
  const handleChooseFooter = () => {
    ImageCropPicker.openPicker({
      width: 1080,
      height: 150,
      cropping: true,
    }).then(image => {
      setSelectedFooter(image.path);
      const splitPath = image.path.split('/');
      setFooterFileName(splitPath[splitPath.length - 1]);
 
      // Display the selected image in the desired width and height
      console.log(`Selected Image - Width: ${image.width}, Height: ${image.height}`);
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };
 
 
 
  const [isFocus, setIsFocus] = useState(false);
 
  const handleMobileNumberChange = (input) => {
    const formattedInput = input.replace(/[^\d]/g, '');
 
    setBusinessDetails(prevState => ({
      ...prevState,
      mobile_no: formattedInput
    }));
  };
 
 
  const handleAlternateNumberChange = (input) => {
    const formattedInput = input.replace(/[^\d]/g, '');
 
    setBusinessDetails(prevState => ({
      ...prevState,
      alternate_no: formattedInput
    }));
  };
 
  const handleSubmit = async () => {
    const newRequiredFields = {
      category: !businessDetails.selected_category,
      name: !businessDetails.bussiness_name,
      address: !businessDetails.address,
      mobileNumber: !businessDetails.mobile_no,
      email: !businessDetails.email,
    };
    setRequiredFields(newRequiredFields);
 
    const isValid = Object.values(newRequiredFields).every(field => !field);
 
    if (!isValid) {
      Alert.alert('Error', 'Please fill out all required fields.');
    } else {
      try {
        await handleStartExplorings();
        navigation.navigate('Tab');
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          Alert.alert('Submission Error', `Server error: ${error.response.data}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          Alert.alert('Submission Error', 'No response received from server.');
        } else {
          console.error('Error message:', error.message);
          Alert.alert('Submission Error', `Error in request setup: ${error.message}`);
        }
      }
    }
  };
 
  return (
    <LinearGradient
      colors={linearGradientColors}
      style={styles.container}
      useAngle={true}
      angle={45}
    >
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.text}>Add Business Details</Text>
          <Text style={styles.label}>Upload Logo</Text>
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.textfield}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadText}>{logoFileName ? logoFileName : 'Choose File...'}</Text>
              <Icon type={Icons.Feather} name="upload" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
 
          <Text style={styles.label}>Select Category *</Text>
          <Dropdown
            style={[styles.textfield, requiredFields.category && { borderColor: 'red' }]}
            placeholderStyle={[styles.placeholderStyle, { color: darkMode ? 'white' : 'white' }]}
            selectedTextStyle={[styles.selectedTextStyle, { color: darkMode ? 'white' : 'white' }]}
            inputSearchStyle={[styles.inputSearchStyle, { color: darkMode ? 'black' : 'black' }]}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Category' : '...'}
            searchPlaceholder="Search..."
            value={businessDetails.selected_category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setBusinessDetails({ ...businessDetails, selected_category: item.value });
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <Icon
                type={Icons.Feather}
                name="chevron-down"
                size={20}
                style={{ color: '#FFFFFF' }}
              />
 
            )}
            renderItem={(item) => (
              <Text style={{ color: darkMode ? 'black' : 'black', height: 50 }}>{item.label}</Text>
            )}
          />
 
          <Text style={styles.label}>Business Name *</Text>
          <TextInput
            style={[styles.textfield, requiredFields.name && { borderColor: 'red' }]}
            onChangeText={text => setBusinessDetails({ ...businessDetails, bussiness_name: text })}
            value={businessDetails.bussiness_name}
          />
 
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={[styles.textfield1, requiredFields.address && { borderColor: 'red' }]}
            onChangeText={text => setBusinessDetails({ ...businessDetails, address: text })}
            value={businessDetails.address}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
 
          <Text style={styles.label}>Address Footer</Text>
          <TouchableOpacity onPress={handleChooseFooter} style={styles.textfield}>
            <View style={styles.uploadIcon}>
              {selectedFooter ? (
                <Image
                  source={{ uri: selectedFooter }}
                  style={{ width: footerImageWidth, height: footerImageHeight }}
                />
              ) : (
                <>
                  <Text style={styles.uploadText}>{footerFileName ? footerFileName : 'Choose File...'}</Text>
                  <Icon type={Icons.Feather} name="upload" size={20} color="#FFFFFF" />
                </>
              )}
            </View>
          </TouchableOpacity>
 
 
          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            style={[styles.textfield, requiredFields.mobileNumber && { borderColor: 'red' }]}
            keyboardType="numeric"
            value={businessDetails.mobile_no}
            onChangeText={handleMobileNumberChange}
          />
 
          <Text style={styles.label}>Alternate Mobile Number</Text>
          <TextInput
            style={styles.textfield}
            keyboardType="numeric"
            value={businessDetails.alternate_no}
            onChangeText={handleAlternateNumberChange}
          />
 
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.textfield, requiredFields.email && { borderColor: 'red' }]}
            keyboardType="email-address"
            value={businessDetails.email}
            placeholder="demo@gmail.com"
            onChangeText={text => setBusinessDetails({ ...businessDetails, email: text })}
            placeholderTextColor="#FFFFFF"
          />
 
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.textfield}
            value={businessDetails.website}
            onChangeText={text => setBusinessDetails({ ...businessDetails, website: text })}
            placeholder="Ex : domain.com"
            placeholderTextColor="#FFFFFF"
          />
 
          <Text style={styles.label1}></Text>
 
          <LinearGradient
            colors={['#AE8625', '#F7EF8A', '#D2AC47', '#EDC967']}
            style={{ borderRadius: 6 }}
            start={{ x: 0.1, y: 2.95 }}
            end={{ x: 0, y: 0 }}>
            <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
              <Text style={{ textAlign: "center", color: linearGradientColors[0], fontFamily: "Lora-Bold" }}>Save & Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
 
          <Text style={styles.label1}></Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: "Lora-Bold",
    color: '#FFFFFF',
    marginBottom: 20,
    top: 35
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: '#FFFFFF',
    top: 20,
    alignSelf: 'flex-start',
    marginLeft: 22,
    marginTop: 25
  },
  label1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    top: 20,
    alignSelf: 'flex-start',
    marginLeft: 22,
    marginTop: 30,
  },
  textfield: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 370,
    top: 28,
    left: 2,
    fontFamily: "Lora-VariableFont_wght",
    color: "white"
  },
  textfield1: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
    height: 100,
    width: 370,
    top: 28,
    left: 2,
    fontFamily: "Lora-VariableFont_wght",
    color: "white"
  },
  uploadIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Lora-VariableFont_wght'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Lora-VariableFont_wght'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconStyle: {
    marginLeft: 10,
    width: 20,
    height: 20,
    color: '#FFFFFF',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 370,
    borderColor: '#fff',
  },
 
 
});
 
export default AddBusiness;
