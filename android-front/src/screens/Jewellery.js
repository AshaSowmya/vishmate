import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, Image, ScrollView, SafeAreaView, FlatList, Dimensions, Text, TouchableOpacity, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_GATEWAY_URL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import MyHeader from '../bottomTab/MyHeader';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
 
const { width, height } = Dimensions.get('window');
 
const routes = [
  { key: '1', title: 'Rate Templates' },
  { key: '2', title: 'Plain Templates' },
  { key: '3', title: 'Live Photo Upload' },
  { key: '4', title: 'GIF Templates' },
  { key: '5', title: 'Model Templates' },
  { key: '6', title: 'Festival Templates' },
];
 
const TabViewExample = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [categoryFrames, setCategoryFrames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const navigation = useNavigation();
  const dropdownItems = ['Gold', 'Silver', 'Diamond'];
  const [takenPhoto, setTakenPhoto] = useState(null);
  const [liveUploadFilter, setLiveUploadFilter] = useState(null);
  const liveUploadDropdownItems = ['With Rate', 'Without Rate'];
  const [darkMode, setDarkMode] = useState(false);
 
  const handleSelect = (item) => {
    setSelectedItem(item);
    setShowDropdown(false);
  };
 
  const handleLiveUploadFilterSelect = (item) => {
    setLiveUploadFilter(item);
    setShowDropdown(false);
  };
 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
  const handleImageSelection = (frameImage, categoryFrameId, subCategory1, subCategory2) => {
    Alert.alert(
      'Choose Image Source',
      '',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(frameImage, categoryFrameId, subCategory1, subCategory2),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(frameImage, categoryFrameId, subCategory1, subCategory2),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
 
 
  const fetchCategoriesFrames = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/categoryframes`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      // console.log('Particulars response:', response.data.categoryframe);
      const activeCategories = response.data.categoryframe
        .filter(cat => cat.status === 'active')
        .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);
 
      setCategoryFrames(activeCategories || []);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
      setCategoryFrames([]);
      if (error.message === 'Network Error') {
        Alert.alert(
          'Network Error',
          'Check your network connection',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          { cancelable: false }
        );
      }
    } finally {
      setLoading(false); // Set loading to false when data fetching completes
    }
  };
 
  useEffect(() => {
    fetchCategoriesFrames();
  }, []);
 
  const openCamera = async (frameImage, categoryFrameId, subCategory1, subCategory2) => {
    setLoading(true);
    try {
      const result = await ImagePicker.openCamera({
        width: layout.width * 0.9, // Set the width as per your requirement
        height: layout.height * 0.45, // Set the height as per your requirement
        cropping: true,
        compressImageMaxWidth: 1920, // Maximum width of the image
        compressImageMaxHeight: 1080, // Maximum height of the image
        compressImageQuality: 1, // Quality of the image (1 means no compression)
        includeBase64: true, // Include base64 encoding if required
      });
 
      const takenPhotoPath = result.path;
 
      // Set takenPhoto state with the path
      setTakenPhoto(takenPhotoPath);
 
      // Navigate to EditDetails with combined images
      navigation.navigate('EditDetails', {
        frameImage,
        categoryFrameId,
        subCategory1,
        subCategory2,
        takenPhoto: takenPhotoPath,
      });
    } catch (error) {
      console.error('Error opening camera:', error);
    } finally {
      setLoading(false);
    }
  };
 
 
  const openGallery = async (frameImage, categoryFrameId, subCategory1, subCategory2) => {
    setLoading(true);
    try {
      const result = await ImagePicker.openPicker({
        width: layout.width * 0.9, // Set the width as per your requirement
        height: layout.height * 0.45, // Set the height as per your requirement
        cropping: true,
        compressImageMaxWidth: 1920, // Maximum width of the image
        compressImageMaxHeight: 1080, // Maximum height of the image
        compressImageQuality: 1, // Quality of the image (1 means no compression)
        includeBase64: true, // Include base64 encoding if required
      });
 
      const takenPhotoPath = result.path;
 
      // Set takenPhoto state with the path
      setTakenPhoto(takenPhotoPath);
 
      // Navigate to EditDetails with combined images
      navigation.navigate('EditDetails', {
        frameImage,
        categoryFrameId,
        subCategory1,
        subCategory2,
        takenPhoto: takenPhotoPath,
      });
    } catch (error) {
      console.error('Error opening gallery:', error);
    } finally {
      setLoading(false);
    }
  };
 
 // Replace the renderItem function to use FastImage
const renderScene = ({ route }) => {
  let filteredImages = categoryFrames.filter(frame =>
    frame.sub_category1 === route.title &&
    (selectedItem === null || frame.sub_category2 === selectedItem)
  );
 
  if (route.key === '3') {
    if (liveUploadFilter === 'With Rate') {
      filteredImages = filteredImages.filter(frame => frame.sub_category2 === 'With Rate');
    } else if (liveUploadFilter === 'Without Rate') {
      filteredImages = filteredImages.filter(frame => frame.sub_category2 === 'Without Rate');
    }
  }
    // console.log(`Filtered images for ${route.title}:`, filteredImages);
 
    return (
      <FlatList
      style={styles.flatlist}
      data={filteredImages}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (route.key === '3') {
              handleImageSelection(item.frame_image, item.categoryframe_id, route.title, selectedItem);
            } else {
              handleImageClick(item.frame_image, item.categoryframe_id, route.title, selectedItem);
            }
          }}
          style={styles.itemContainer}
        >
          <FastImage source={{ uri: item.frame_image }} style={styles.image} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => `image_${index}`}
      numColumns={3}
      contentContainerStyle={styles.flatListContent}
    />
    );
  };
 
  const renderTabBar = props => (
    <View>
      <TabBar
        {...props}
        style={styles.tabBar}
        indicatorStyle={[styles.indicator, { width: '20%' }]}
        labelStyle={styles.label}
        renderLabel={({ route, focused }) => (
          <Text style={[styles.label, focused && { color: 'black' }]} numberOfLines={1}>
            {route.title}
          </Text>
        )}
        tabStyle={styles.tabStyle}
        scrollEnabled
      />
      {index === 0 && ( // Render dropdown only if index is 0 (Rate Templates tab)
        <>
          <View style={styles.rowContainer}>
            <View style={styles.centeredTextContainer}>
              <Text style={styles.centeredText}>{selectedItem}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowDropdown(!showDropdown)}
              >
            <LinearGradient
              colors={['#0F0C29', '#302B63', '#24243E']}
              style={styles.buttonLinearGradient}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 0, y: 0 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={styles.buttonText}>Select Jewellery type</Text>
                <Icon style={styles.icon} name={showDropdown ? 'caret-up' : 'caret-down'} size={20} color="white" />
              </TouchableOpacity>
            </LinearGradient>
                   </TouchableOpacity>
          </View>
          {showDropdown && (
            <View style={styles.dropdown}>
              {dropdownItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.input, { fontSize: width * 0.035 }, { color: darkMode ? 'black' : 'black' }]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
      {index === 2 && (
        <>
          <View style={styles.rowContainer}>
            <View style={styles.centeredTextContainer}>
              <Text style={styles.centeredText}>{liveUploadFilter || 'All'}</Text>
            </View>
            <TouchableOpacity  onPress={() => setShowDropdown(!showDropdown)}>
            <LinearGradient
              colors={['#0F0C29', '#302B63', '#24243E']}
              style={styles.buttonLinearGradient}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 0, y: 0 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={styles.buttonText}>Select Type</Text>
                <Icon style={styles.icon} name={showDropdown ? 'caret-up' : 'caret-down'} size={20} color="white" />
              </TouchableOpacity>
            </LinearGradient>
            </TouchableOpacity>
          </View>
          {showDropdown && (
            <View style={styles.dropdown}>
              {liveUploadDropdownItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleLiveUploadFilterSelect(item)}
                >
                  <Text style={[styles.input, { fontSize: width * 0.035 }, { color: darkMode ? 'black' : 'black' }]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
 
  const handleImageClick = (frameImage, categoryFrameId, subCategory1, subCategory2) => {
    console.log('Navigating to CategoriesParticular with params:', { frameImage, categoryFrameId, subCategory1, subCategory2 });
    navigation.navigate('CategoriesParticular', { frameImage, categoryFrameId, subCategory1, subCategory2 });
  };
 
  return (
    <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00008b" />
            <Text style={styles.loadingText}>Processing</Text>
          </View>
        ) : (
          <>
            <MyHeader
              title="Jewellery"
              back={true}
              onPressBack={() => navigation.goBack()}
              headerBg="transparent"
              titleFontFamily="Lora-Bold"
              onRightPress={() => console.log('right')}
              height={84}
            />
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
            />
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to the next line
  },
  tabBar: {
    backgroundColor: 'white',
    top: -10,
  },
  indicator: {
    backgroundColor: 'black',
  },
  label: {
    color: 'grey',
    fontFamily: 'Lora-Bold',
    fontSize: 16,
    flexShrink: 1, // Prevent label from wrapping
    textAlign: 'center', // Center the text within the tab
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120, // Adjust width as needed
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  centeredTextContainer: {
    flex: 1,
    marginTop: -25,
  },
  centeredText: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Lora-Bold',
    top: 17,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 184,
    height: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    top: -6,
  },
  icon: {
    marginLeft: 7,
    top: -4,
  },
  dropdown: {
    position: 'absolute',
    top: 105, // Adjust this value as needed
    right: 30, // Align to the right if needed
    width: 160,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    zIndex: 9999, // Ensure the dropdown is above other content
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  buttonLinearGradient: {
    borderRadius: 10,
 
  },
  scrollView: {
    backgroundColor: 'white',
    top: 40,
  },
  image: {
    width: width * 0.29,
    height: height *0.150,
    borderRadius: 6,
    // marginRight: 13,
    marginBottom: 13, // Add margin to avoid overlapping
    marginRight:width *0.02,
  },
  containerWithMargin: {
    backgroundColor: 'white',
  },
  itemContainer: {
    flex: 1,
    margin: 1,
    aspectRatio: 1,
  },
  sceneContainer: {
    top: -30, // Adjust this value as needed to move the content down
    backgroundColor: 'white',
  },
  flatListContent: {},
  flatlist: {
    top: 15,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to the next line
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray', // Set background color to gray
  },
  loadingText: {
    marginTop: 10, // Space between loader and text
    color: 'black',
    fontSize: 16,
    fontFamily: 'Lora-Bold',
  }
});
 
export default TabViewExample;
