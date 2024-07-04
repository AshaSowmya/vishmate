
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions,ImageBackground, TouchableOpacity, ScrollView, Modal, Animated, Platform } from 'react-native';
import MyHeader from '../bottomTab/MyHeader';
import { SelectCountry } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { REACT_APP_API_GATEWAY_URL } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const EditDetails = ({ route, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState('');
  const [country, setCountry] = useState('1');
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));
  const [goldRate, setGoldRate] = useState('');
  const [silverRate, setSilverRate] = useState('');
  const [locations, setLocations] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);


  const { frameImage, categoryFrameId, takenPhoto,subCategory1, subCategory2 } = route.params;

  console.log("Route Params:", route.params);

  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    fetchGoldAndSilverRates();
  }, []);

  const fetchGoldAndSilverRates = async (locationId) => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/goldrates`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
          'Content-Type': 'application/json',
        },
        params: {
          sortBy: 'updated_at',
          sortOrder: 'desc',
        },
      });

      console.log('Gold and Silver Rates Response:', response.data); // Log the entire response data to check its structure

      if (response.data.goldrate) {
        // Update locations dropdown
        setLocations(response.data.goldrate.map(rate => ({
          id: rate.goldrate_id,
          name: rate.location,
        })));

        // Filter rates by selected location if locationId is provided
        const filteredRates = locationId
          ? response.data.goldrate.filter(rate => rate.goldrate_id === locationId)
          : response.data.goldrate;

        // Update gold and silver rates based on filtered data
        if (filteredRates.length > 0) {
          setGoldRate(filteredRates[0].goldrate); // Accessing correct property name
          setSilverRate(filteredRates[0].silverrate); // Accessing correct property name
        } else {
          console.log('No gold and silver rates found for the selected location.');
        }
      } else {
        console.log('Gold and silver rates data is undefined or empty.');
        // Handle this case as per your application logic
      }
    } catch (error) {
      console.error('Error fetching gold and silver rates:', error);
      Alert.alert('Error', 'Failed to fetch gold and silver rates. Please try again later.');
    }
  };

  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const openDatePicker = () => {
    setShowModal(true);
  };

  const handleOKPress = () => {
    setShowModal(false);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleContinue = () => {
    let goldValue = '';
    let silverValue = '';
 
    // Check which radio button is selected
    if (checked === 'Apple') {
      // If the first radio button is selected, use the textInput1 and textInput2 values
      goldValue = `₹ ${textInput1}`;
      silverValue = `₹ ${textInput2}`;
    } else if (checked === 'Samsung') {
      // If the second radio button is selected, use the hard-coded values
      goldValue = `₹ ${goldRate}`;
      silverValue = `₹ ${silverRate}`;
    }
 
    // Log the values to check if they are correct
    console.log('Gold Value:', goldValue);
    console.log('Silver Value:', silverValue);
    console.log('Date:', selectedDate);
 
    // Navigate to the next screen and pass the values as params
    navigation.navigate('Frame', {
      goldValue: goldValue,
      silverValue: silverValue,
      selectedDate: selectedDate,
      takenPhoto: takenPhoto,
      frameImage: frameImage, // Use takenPhoto if available, otherwise fallback to frameImage
      categoryFrameId: categoryFrameId,
      subCategory1: subCategory1,
      subCategory2: subCategory2,
    });
  };
 
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (isEnabled) {
      setChecked('Samsung');
    } else {
      setChecked('');
    }
  }, [isEnabled, animatedValue]);

  const handlePosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.08],
  });

  const datePickerStyle = Platform.OS === 'android' && {
    textColor: datePickerTextColor,
  };
  const datePickerTextColor = darkMode ? 'black' : 'black';

  const backgroundGradientColors = isEnabled ? ['#0F0C29', '#302B63', '#24243E'] : ['#AE8625', '#F7EF8A', '#D2AC47', '#EDC967'];
  const handleGradientColors = isEnabled ? ['#AE8625', '#F7EF8A', '#D2AC47', '#EDC967'] : ['#0F0C29', '#302B63', '#24243E'];



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <MyHeader
            back={true}
            onPressBack={() => navigation.goBack()}
            headerBg="transparent"
            titleFontFamily="Lora-Bold"
            onRightPress={() => console.log('right')}
            height={84}
          />
          <View style={styles.imageContainer}>
          <ImageBackground
              source={{ uri: takenPhoto }}
              style={styles.imageBackground} 
              onLoad={handleImageLoad}
            >
              {/* Show takenPhoto inside frameImage */}
              {imageLoaded && (
                <FastImage
                  source={{ uri: frameImage }} 
                  style={styles.overlayImage}
                />
              )}
            </ImageBackground>
          </View>
          <Text style={styles.JewellryTitle}>Jewellry Information :</Text>
          <View style={styles.rowContainer2}>
            <SelectCountry
              style={[styles.dropdown, { color: darkMode ? 'black' : 'black' }]}
              selectedTextStyle={[styles.selectedTextStyle, { color: darkMode ? 'black' : 'black' }]}
              placeholderStyle={styles.placeholderStyle}
              inputSearchStyle={[styles.inputSearchStyle, { color: darkMode ? 'black' : 'black' }]}
              iconStyle={styles.iconStyle}
              search
              maxHeight={height * 0.25}
              maxWidth={width * 0.5} // Set the maxWidth property to increase the width of the dropdown items container
              value={country}
              data={locations.map(location => ({ value: location.id, label: location.name }))} // Assuming locations have 'id' and 'name' properties
              valueField="value"
              labelField="label"
              placeholder="Select place"
              searchPlaceholder="Search..."
              onChange={(e) => {
                setCountry(e.value);
                fetchGoldAndSilverRates(e.value); 
              }}
              renderItem={(item) => (
                <View>
                  <Text>{item.label}</Text>
                </View>
              )}
            />

            <TouchableOpacity style={styles.button} onPress={openDatePicker}>
              <Text style={styles.buttonText}>{formatDate(selectedDate)}</Text>
              <View style={styles.iconContainer}>
                <Icon name="calendar" size={13} color="#706F6F" style={{ left: 10 }} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Modal for date picker */}
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.datePickerContainer}>
                <DatePicker
                  date={selectedDate}
                  onDateChange={handleDateChange}
                  mode="date"
                  androidVariant="nativeAndroid"
                  textColor={Platform.OS === 'android' ? datePickerTextColor : 'black'}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.okButton} onPress={handleOKPress}>
                    <Text style={styles.okButtonText}>OK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.switchContainer}
              onPress={() => setIsEnabled(!isEnabled)}
            >
              <LinearGradient
                colors={backgroundGradientColors}
                style={styles.switchGradient}
                start={{ x: 0.3, y: 1.5 }}
                end={{ x: 0, y: 0 }}
              >
                <Animated.View style={[styles.switchHandle, { left: handlePosition }]}>
                  <LinearGradient
                    colors={handleGradientColors}
                    style={styles.handleGradient}
                  />
                </Animated.View>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.Title}>Attach today’s rate</Text>
          </View>

          {/* First row with radio button and text input fields */}
          <View style={styles.rowContainer}>

            <RadioButton
              value="Apple"
              status={checked === 'Apple' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
              onPress={() => setChecked('Apple')}
              disabled={isEnabled} // Disable the radio button when the switch is enabled
              uncheckedColor={darkMode ? 'black' : 'black'} // Set unchecked color based on darkMode
              color={darkMode ? 'black' : 'black'} // Set checked color based on darkMode
            />

            <Text style={styles.label}> Gold ₹</Text>
            <TextInput
              style={[styles.textField, { color: darkMode ? 'black' : 'black' }]}
              value={textInput1}
              onChangeText={setTextInput1}
            />
            <Text style={styles.label}> Silver ₹</Text>
            <TextInput
              style={[styles.textField, { color: darkMode ? 'black' : 'black' }]}
              value={textInput2}
              onChangeText={setTextInput2}
            />
          </View>

          <Text style={styles.Title2}>Customize your daily rate</Text>

          {/* Second row with radio button and text input fields */}
          <View style={styles.rowContainer1}>

            <RadioButton
              value="Samsung"
              status={checked === 'Samsung' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Samsung')}
              disabled={isEnabled}
              uncheckedColor={darkMode ? 'black' : 'black'} // Set unchecked color based on darkMode
              color={darkMode ? 'black' : 'black'} // Set checked color based on darkMode
            />


            <Text style={styles.label1}>Gold </Text>
            <Text style={styles.label2}>{goldRate}</Text>

            <Text style={styles.label1}>Silver </Text>
            <Text style={styles.label2}>{silverRate}</Text>

          </View>


          <TouchableOpacity onPress={handleContinue}>
            <LinearGradient
              colors={['#0F0C29', '#302B63', '#24243E']}
              style={styles.buttonLinear}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 0, y: 0 }}
            >
              <Text style={styles.buttonText1}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ top: 50 }}><Text>   </Text></View>
          <View style={{ top: 50 }}><Text>  </Text></View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageBackground: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.45,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden', // Ensure images inside ImageBackground don't exceed its bounds
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  foregroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: width * 0.9,
    height: height * 0.45,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20
  },
  JewellryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: height * 0.01,
    marginHorizontal: height * 0.03,
    textAlign: 'left',
    color: 'black',
  },
  Title: {
    fontSize: 16,
    marginHorizontal: height * 0.01,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  Title2: {
    fontSize: 16,
    marginHorizontal: height * 0.03,
    color: '#706F6F',
    fontFamily: 'Montserrat-Medium',
    marginVertical: width * 0.02,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: height * 0.02,
    justifyContent: 'space-between',
    marginTop: height * 0.01,
    width: '100%',

  },
  rowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: height * 0.02,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: height * 0.00,
  },
  rowContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: height * 0.01,
  },
  textField: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    right: width * 0.07,
    width: 60,
    borderRadius: 10,
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: "#000000",
    right: width * 0.06,
  },
  label1: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: "#000000",
    right: width * 0.08,
  },
  label2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: "#000000",
    right: width * 0.15,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    right: height * 0.01,
  },
  placeholderStyle: {
    fontFamily: 'Roboto-Medium',
    color: 'grey',
    left: height * 0.02,
  },
  dropdown: {
    margin: width * 0.03,
    height: 50,
    borderColor: '#706F6F',
    fontFamily: 'Montserrat-Medium',
    borderWidth: 1.5,
    width: width * 0.40,
    height: height * 0.04,
    borderRadius: 10,
    marginTop: height * 0.01,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: width * 0.03,
    fontFamily: 'Montserrat-Medium',
  },
  iconStyle: {
    width: width * 0.03,
    height: height * 0.03,
    right: width * 0.03
  },
  inputSearchStyle: {
    height: height * 0.01,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Medium',
    padding: 2,
    left: 9,
    borderRadius: 9,
    borderWidth: 1,
    marginBottom: height * 0.01,
    height: height * 0.04,
    width: width * 0.37,
  },
  buttonText: {
    color: '#706F6F',
    fontSize: 17,
    left: width * 0.04,
  },
  iconContainer: {
    marginLeft: width * 0.06,
    marginTop: height * 0.00,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    backgroundColor: '#9397f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  okButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 30,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#fffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  buttonLinear: {
    borderRadius: 10,
    paddingVertical: -10,
    paddingHorizontal: 75,
    width: width * 0.90,
    height: height * 0.05,
    top: height * 0.02,
    left: width * 0.05,
  },
  buttonText1: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Lora-Bold',
    fontSize: 20,
    marginTop: 2
  },
  switchContainer: {
    width: 55,
    height: 25,
    borderRadius: 15,
    padding: 3,
    marginLeft: 18
  },
  switchGradient: {
    flex: 1,
    borderRadius: 15,
  },
  switchHandle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    position: 'absolute',
    top: 0,
  },
  handleGradient: {
    flex: 1,
    borderRadius: 12,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  dropdownItemText: {
    fontSize: 4,
  },
});

export default EditDetails;