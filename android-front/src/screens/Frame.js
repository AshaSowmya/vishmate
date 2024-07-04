import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, TextInput, Alert, ActivityIndicator, PermissionsAndroid, PanResponder, Platform, Animated } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Icon, { Icons } from '../bottomTab/Icons';
import MyHeader from '../bottomTab/MyHeader';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_GATEWAY_URL } from '@env';
import Draggable from 'react-native-draggable';
import Ico from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import { Buffer } from 'buffer';
import { ScrollView } from 'react-native-gesture-handler';

// import TextEdit from "./TextEdit";



const Frame = ({ route }) => {
  //camera and gallery
  const [ModalVisible, setModalVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const toggleCameraModals = () => {
    setModalVisible(!ModalVisible);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    }).then(newImages => {
      const formattedImages = newImages.map(image => ({
        path: image.path,
        isFixed: false,
        position: { x: 0, y: 0 },
      }));
      setImages([...images, ...formattedImages]);
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleToggleFixImage = (index) => {
    setImages(images.map((image, idx) =>
      idx === index ? { ...image, isFixed: !image.isFixed } : image
    ));
  };


  // const handleDragRelease = (event, gestureState, index) => {
  //   const { moveX, moveY } = gestureState;
  //   setImages(images.map((image, idx) =>
  //     idx === index ? { ...image, position: { x: moveX, y: moveY } } : image
  //   ));
  // };

  const handleDragRelease = (event, gestureState, index) => {
    const { moveX, moveY } = gestureState;
    const borderBoxWidth = 1080; // width of the borderBox
    const borderBoxHeight = 1080; // height of the borderBox
    const imageWidth = 100; // width of the draggable image
    const imageHeight = 100; // height of the draggable image

    let newX = moveX;
    let newY = moveY;

    // Ensure the image stays within the bounds of the borderBox
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > borderBoxWidth - imageWidth) newX = borderBoxWidth - imageWidth;
    if (newY > borderBoxHeight - imageHeight) newY = borderBoxHeight - imageHeight;

    setImages(images.map((image, idx) =>
      idx === index ? { ...image, position: { x: newX, y: newY } } : image
    ));
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };
  //camera and gallery

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibles, setIsModalVisibles] = useState(false);
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const [isEyeVisible, setIsEyeVisible] = useState(true);
  const [isLockVisible, setIsLockVisible] = useState(true);
  const [islogoVisible, setIslogoVisible] = useState(true);
  const [islogoLockVisible, setlogoLockVisible] = useState(true);
  const [isNumberVisible, setNumberVisible] = useState(true);
  const [isNumberLockVisible, setNumberLockVisible] = useState(true);
  const [isIdVisible, setIsIdVisible] = useState(true);
  const [isIdLockVisible, setIdLockVisible] = useState(true);
  const [iswebVisible, setWebVisible] = useState(true);
  const [isWebLockVisible, setWebLockVisible] = useState(true);
  const [isLocationVisible, setLocationVisible] = useState(true);
  const [isLocationLockVisible, setLocationLockVisible] = useState(true);
  const [isMediaVisible, setMediaVisible] = useState(true);
  const [isMediaLockVisible, setMediaLockVisible] = useState(true);
  const [isContactVisible, setContactVisible] = useState(true);
  const [isContactLockVisible, setContactLockVisible] = useState(true);
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [footer, setFooter] = useState('');
  const [color, setColor] = useState('');
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  //camera
  const { width } = Dimensions.get('window');
  const cardWidth = 320;
  const [goldPosition, setGoldPosition] = useState({ x: 0, y: 0 });
  const [silverPosition, setSilverPosition] = useState({ x: 0, y: 0 });
  const [datePosition, setDatePosition] = useState({ x: 0, y: 0 });
  const [footerPosition, setFooterPosition] = useState({ x: 0, y: 925 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [fontSize, setFontSize] = useState(14);

  const posterWidthFromFigma = 1080;
  const posterHeightFromFigma = 1080;

  const footerWidthFromFigma = 1080; // replace with actual width from Figma
  const footerHeightFromFigma = 155; // replace with actual height from Figma



  // Calculate the scaling ratio to maintain the aspect ratio
  const widthRatio = screenWidth / posterWidthFromFigma;
  const heightRatio = screenHeight / posterHeightFromFigma;
  const minRatio = Math.min(widthRatio, heightRatio);

  // Calculate the actual poster dimensions on the device
  const posterWidth = posterWidthFromFigma * minRatio;
  const posterHeight = posterHeightFromFigma * minRatio;

  // Calculate translation offsets to center the poster on the screen
  const translateX = (screenWidth - posterWidth) / 2;

  // Calculate the text positions in terms of the scaled poster dimensions
  const scaledGoldX = goldPosition.x * minRatio;
  const scaledGoldY = goldPosition.y * minRatio;
  const scaledSilverX = silverPosition.x * minRatio;
  const scaledSilverY = silverPosition.y * minRatio;
  const scaledDateX = datePosition.x * minRatio;
  const scaledDateY = datePosition.y * minRatio;

  const scaledFooterWidth = footerWidthFromFigma * minRatio;
  const scaledFooterHeight = footerHeightFromFigma * minRatio;

  const scaledFooterX = footerPosition.x * minRatio;
  const scaledFooterY = footerPosition.y * minRatio;
  const scaledLogoX = logoPosition.x * minRatio;
  const scaledLogoY = logoPosition.y * minRatio;


  useEffect(() => {
    console.log('Address state:', address);
    console.log('Mobile state:', mobile);
    console.log("scaledFooterX:", scaledFooterX)
    console.log("scaledFooterY:", scaledFooterY)
    console.log("scaledLogoX:", scaledLogoX)
    console.log("scaledLogoY:", scaledLogoY)
  }, [address, mobile, logo]);

  const { goldValue, silverValue, selectedDate, subCategory1 } = route.params;

  console.log("subCategory1", subCategory1)


  const toggleModals = () => {
    setIsModalVisibles(!isModalVisibles);
  };

  const toggleModald = () => {
    setIsModalVisibled(!isModalVisibled);
  };

  const [user, setUser] = useState({
    user_name: "",

  });

  const handleInputChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const { frameImage, categoryFrameId, takenPhoto } = route.params;

  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);

  useEffect(() => {
    // Fetch x and y axis when component mounts
    fetchAxisFromServer();
    fetchFromServer();
  }, []);

  const fetchAxisFromServer = async () => {
    try {
      const headers = {
        Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        'Content-Type': 'application/json',
      };
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/categoryframesbyid/${categoryFrameId}`, { headers });
      const categoryFrameData = response.data.Categoryframe[0];

      console.log('Category Frame Data:', categoryFrameData);

      // Destructure the response data
      const { gold_x, gold_y, silver_x, silver_y, date_x, date_y, footer_x, footer_y, footer1_x, footer1_y, logo_x, logo_y, color_code, font_size } = categoryFrameData;

      // Log individual properties
      console.log('gold_x:', gold_x);
      console.log('gold_y:', gold_y);
      console.log('silver_x:', silver_x);
      console.log('silver_y:', silver_y);
      console.log('date_x:', date_x);
      console.log('date_y:', date_y);
      console.log('footer_x:', footer_x);
      console.log('footer_y:', footer_y);
      console.log('footer1_x:', footer1_x);
      console.log('footer1_y:', footer1_y);
      console.log('logo_x:', logo_x);
      console.log('logo_y:', logo_y);
      console.log('color_code:', color_code);
      console.log('font_size:', font_size);

      // Function to calculate adjusted font size based on device dimensions
      const calculateFontSize = (baseFontSize) => {
        const scaleFactor = 0.5; // You can adjust this factor to fit your needs
        const scaledFontSize = baseFontSize * (windowWidth / 475) * scaleFactor; // 375 is a common base width used in design
        return Math.abs(scaledFontSize); // Ensure it's positive
      };

      const adjustedFontSize = font_size !== undefined ? calculateFontSize(Number(font_size)) : undefined;
      console.log('adjustedFontSize:', adjustedFontSize);

      // Set state only if properties exist
      if (gold_x !== undefined && gold_y !== undefined) setGoldPosition({ x: gold_x, y: gold_y });
      if (silver_x !== undefined && silver_y !== undefined) setSilverPosition({ x: silver_x, y: silver_y });
      if (date_x !== undefined && date_y !== undefined) setDatePosition({ x: date_x, y: date_y });
      if (logo_x !== undefined && logo_y !== undefined) setLogoPosition({ x: logo_x, y: logo_y });
      if (color_code !== undefined) setColor(color_code);
      if (adjustedFontSize !== undefined) setFontSize(adjustedFontSize); // Set the adjusted font size

    } catch (error) {
      console.error('Error fetching category frame from server:', error);
    }
  };



  const fetchFromServer = async () => {
    try {
      const customerIdString = await AsyncStorage.getItem('customerId');
      if (customerIdString !== null) {
        const customerId = JSON.parse(customerIdString);
        const headers = {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
          'Content-Type': 'application/json',
        };

        const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/addbussinessesbyid/${customerId}`, { headers });
        console.log("Addbussiness:", response.data);

        // Check if AddBussiness property exists and is an array
        if (response.data.AddBussiness && Array.isArray(response.data.AddBussiness) && response.data.AddBussiness.length > 0) {
          // Update the state variables with the most recent rates
          // setAddress(response.data.AddBussiness[0].address); // Accessing correct property name
          setLogo(response.data.AddBussiness[0].upload_logo); // Accessing correct property name
          setFooter(response.data.AddBussiness[0].footer_image);
          // setMobile(response.data.AddBussiness[0].mobile_no); // Accessing correct property name
          // console.log('Address:', response.data.AddBussiness[0].address);
          // console.log('Mobile:', response.data.AddBussiness[0].mobile_no);
        }
      } else {
        console.log('No business details found in the response.');
        console.log('customerId is null');
      }
    } catch (error) {
      console.error('Error fetching addbussiness from server:', error);
    }
  };



  const captureAndShare = async () => {
    // Alert.alert('Sharing', 'Preparing the image for sharing...');
    setLoading(true);
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        const filePath = `${RNFS.DocumentDirectoryPath}/image.png`;

        // Save the captured image to file system
        await RNFS.moveFile(uri, filePath);

        // Now share the image
        await shareToInstagramPost(`file://${filePath}`);
      } catch (error) {
        console.log('Error capturing and sharing image', error);
      }
      finally {
        setLoading(false); // Set loading to false when the process ends
      }
    }
  };

  const shareToInstagramPost = async (imagePath) => {
    const shareOptions = {
      title: 'Share via',
      message: 'Poster!',
      url: imagePath, // The file path of the image
      social: Share.Social.INSTAGRAM,
      type: 'image/png'
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };
  const viewShotRef = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission();
    }
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Needed',
          message: 'This app needs the storage permission to save images to your device',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  const downloadImage = async () => {
    setLoading(true);
    try {
      const uri = await viewShotRef.current.capture();

      // Determine file extension based on the frameImage URI
      const extension = frameImage.split('.').pop(); // Extract extension from frameImage URI

      const destPath = `${RNFS.DownloadDirectoryPath}/image_${Date.now()}.${extension}`;

      await RNFS.copyFile(uri, destPath);

      // Check if the file exists
      const fileExists = await RNFS.exists(destPath);
      if (fileExists) {
        Alert.alert('Image saved', `Image saved to ${destPath}`);
        setLoading(false); 
      } else {
        Alert.alert('Error', 'File not found after saving.');
      }
    } catch (error) {
      console.log('Error capturing view:', error);
      Alert.alert('Error', 'An error occurred while saving the image.');
    }
  };
  const handlePress = async () => {
    await updateCategoryFrameStatus(categoryFrameId);
    await downloadImage();
  };

  const handleShare = async () => {
    await updateCategoryFrameStatus(categoryFrameId);
    await captureAndShare();
  };
  const updateCategoryFrameStatus = async (categoryFrameId) => {
    try {
      const headers = {
        Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        'Content-Type': 'application/json',
      };

      // Prepare the request body with the updated status
      const requestBody = {
        status: 'inactive'
      };

      const response = await axios.put(`${REACT_APP_API_GATEWAY_URL}/api/categoryframes/${categoryFrameId}`, requestBody, { headers });
      console.log("Category Frame Updated:", response.data);
    } catch (error) {
      console.error('Error updating category frame status:', error);
    }
  };
  //Text Draggable
  const [textInputValue, setTextInputValue] = useState('');
  const [texts, setTexts] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const handleAddText = () => {
    if (textInputValue.trim() !== '') {
      setTexts([...texts, { text: textInputValue, x: 100, y: 100 }]);
      setTextInputValue('');
    }
  };

  const handleDrag = (index, dx, dy) => {
    const newPositions = [...texts];
    newPositions[index] = { ...newPositions[index], x: newPositions[index].x + dx, y: newPositions[index].y + dy };
    setTexts(newPositions);
  };


  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        if (draggedIndex !== null) {
          handleDrag(draggedIndex, gestureState.dx, gestureState.dy);
        }
        Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y },
          ],
          { useNativeDriver: false }
        )(evt, gestureState);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        setDraggedIndex(null);
      },
    })
  ).current;

  const [scale, setScale] = useState(1.0); // Initial scale factor
  const [showControls, setShowControls] = useState(false); // State to manage visibility of controls


  const handleZoomIn = () => {
    setScale(scale + 0.1); // Increase scale by 0.1
  };

  const handleZoomOut = () => {
    if (scale > 0.2) {
      setScale(scale - 0.1); // Decrease scale by 0.1, with minimum scale limit
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls); // Toggle visibility of controls
  };

  // const [visibleIcons, setVisibleIcons] = useState(new Array(imageList.length).fill(false));

  const handleDoubleTap = (index) => {
    setVisibleIcons((prevVisibleIcons) => {
      const newVisibleIcons = [...prevVisibleIcons];
      newVisibleIcons[index] = !newVisibleIcons[index];
      return newVisibleIcons;
    });
  };

  // Double-tap detection logic
  const lastTap = useRef(null);
  const handleTap = (index) => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < 300) {
      handleDoubleTap(index);
    } else {
      lastTap.current = now;
    }
  };

  const [isVisible, setIsVisible] = useState(false); // State to manage visibility of TextEdit component

  const toggleModal = () => {
    // Handle onPress event to toggle the visibility of TextEdit component
    setIsVisible(!isVisible);
    setIsModalVisible(!isModalVisible);
  };


  // const renderModalContent = () => (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

  //   {isModalVisible && <TextEdit />}
  //   </View>
  // );



  const renderModalContentd = () => (

    <View style={styles.modalContents}>
      <LinearGradient
        colors={['#A9A0FA', '#302B63', '#24243E']}
        start={{ x: 4, y: 2 }} // Top left
        end={{ x: 2, y: 3 }}
        style={[styles.linearGradiend]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', top: -200 }}>
          <TouchableOpacity onPress={toggleModald}>
            <Image source={require('../assets/images/firstpart/arow.png')} style={{ right: 145, height: 30, top: 4 }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Lora-Bold', color: 'white', fontSize: 22, left: -17 }}>Layers</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', top: -170, left: 15 }}>
          <TouchableOpacity onPress={() => setIsEyeVisible(!isEyeVisible)}>
            <Icon type={Icons.Feather} name={isEyeVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 76, height: 30 }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 12, right: 40 }}>PM Towers kalavasal mad</Text>
          <TouchableOpacity onPress={() => setIsLockVisible(!isLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isLockVisible ? 'lock' : 'lock-open'} color='white' />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -48 }} />
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10, top: -140 }}>
          <TouchableOpacity onPress={() => setIslogoVisible(!islogoVisible)}>
            <Icon type={Icons.Feather} name={islogoVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 140, height: 30 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/image.png')} style={{ left: -40, height: 40, width: 40 }} />
          <TouchableOpacity onPress={() => setlogoLockVisible(!islogoLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={islogoLockVisible ? 'lock' : 'lock-open'} color='white' style={{ left: 70 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -120 }} />
        </View>



        <View style={{ flexDirection: 'row', alignItems: 'center', left: 15, top: -115 }}>
          <TouchableOpacity onPress={() => setNumberVisible(!isNumberVisible)}>
            <Icon type={Icons.Feather} name={isNumberVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 119, height: 30 }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 12, right: 40 }}>+91 0123456789</Text>
          <TouchableOpacity onPress={() => setNumberLockVisible(!isNumberLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isNumberLockVisible ? 'lock' : 'lock-open'} color='white' style={{ marginLeft: 1, left: 40 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -90 }} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', top: -80, left: 15 }}>
          <TouchableOpacity onPress={() => setIsIdVisible(!isIdVisible)}>
            <Icon type={Icons.Feather} name={isIdVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 76, height: 30, left: -104 }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 12, right: 40 }}>Jewellry_123456778</Text>
          <TouchableOpacity onPress={() => setIdLockVisible(!isIdLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isIdLockVisible ? 'lock' : 'lock-open'} color='white' style={{ right: -30 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -78 }} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', left: 15, top: -40 }}>
          <TouchableOpacity onPress={() => setWebVisible(!iswebVisible)}>
            <Icon type={Icons.Feather} name={iswebVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 111, height: 30 }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 12, right: 40 }}>www.jewerly.com</Text>
          <TouchableOpacity onPress={() => setWebLockVisible(!isWebLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isWebLockVisible ? 'lock' : 'lock-open'} color='white' style={{ right: -35 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -83 }} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', left: 15, top: -3 }}>
          <TouchableOpacity onPress={() => setLocationVisible(!isLocationVisible)}>
            <Icon type={Icons.Feather} name={isLocationVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 152, height: 30 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/location.png')} style={styles.centerimage} />
          <TouchableOpacity onPress={() => setLocationLockVisible(!isLocationLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isLocationLockVisible ? 'lock' : 'lock-open'} color='white' style={{ right: -75 }} />
          </TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -126 }} />
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', left: 15, top: 35 }}>
          <TouchableOpacity onPress={() => setMediaVisible(!isMediaVisible)}>
            <Icon type={Icons.Feather} name={isMediaVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 152, height: 30 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/insta.png')} style={styles.centerimage} />
          <TouchableOpacity onPress={() => setMediaLockVisible(!isMediaLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isMediaLockVisible ? 'lock' : 'lock-open'} color='white' style={{ right: -77 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -128 }} />
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', left: 15, top: 75 }}>
          <TouchableOpacity onPress={() => setContactVisible(!isContactVisible)}>
            <Icon type={Icons.Feather} name={isContactVisible ? 'eye' : 'eye-off'} color='white' style={{ right: 152, height: 30 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/phone.png')} style={styles.centerimage} />
          <TouchableOpacity onPress={() => setContactLockVisible(!isContactLockVisible)}>
            <Icon type={Icons.MaterialIcons} name={isContactLockVisible ? 'lock' : 'lock-open'} color='white' style={{ right: -80 }} />
          </TouchableOpacity>
          <Image source={require('../assets/images/firstpart/intwo.png')} style={{ right: -128 }} />
        </View>

      </LinearGradient>
    </View>

  );

  const toggleIcons = (index) => {
    setImages(images.map((image, idx) =>
      idx === index ? { ...image, showIcons: !image.showIcons } : image
    ));
  };

  // const captureAndShare = async () => {
  //   if (viewShotRef.current) {
  //     try {
  //       const uri = await viewShotRef.current.capture();
  //       const filePath = `${RNFS.DocumentDirectoryPath}/image.png`;

  //       // Save the captured image to file system
  //       await RNFS.moveFile(uri, filePath);

  //       // Now share the image
  //       const shareOptions = {
  //         title: 'Share via',
  //         url: `file://${filePath}`,
  //         social: Share.Social.INSTAGRAM,
  //       };
  //       await Share.open(shareOptions);
  //     } catch (error) {
  //       console.log('Error capturing and sharing image', error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <MyHeader
        back={true}
        onPressBack={() => navigation.goBack()}
        headerBg="transparent"
        titleFontFamily="Lora-Bold"
        onRightPress={() => console.log('right')}
        height={84}
      />
      <ScrollView>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1, width: 1080, height: 1080 }}>
          <View style={[styles.borderBox, { width: posterWidth, height: posterHeight, left: translateX }]}>
            <View style={styles.imageWrapper}>
              <ImageBackground source={{ uri: takenPhoto }} style={[styles.imageInBox]}
                onLoad={handleImageLoad}
                {...panResponder.panHandlers} >
                {imageLoaded && (
                  <FastImage
                    source={{ uri: frameImage }}
                    style={styles.overlayImage}
                  />
                )}
              </ImageBackground>
            </View>
            {images.map((image, index) => (
              <Draggable
                key={index}
                x={image.position.x}
                y={image.position.y}
                onDragRelease={(event, gestureState) => handleDragRelease(event, gestureState, index)}
                isFixed={image.isFixed} // Ensure isFixed prop to disable dragging
              >
                <View style={styles.imageContaine}>
                  <TouchableOpacity onPress={() => handleToggleFixImage(index)}>
                    <Image
                      source={{ uri: image.path }}
                      style={styles.selectedImage}
                    />
                  </TouchableOpacity>
                  {!image.isFixed && (
                    <>
                      <TouchableOpacity style={styles.tickIcon} onPress={() => handleToggleFixImage(index)}>
                        <Ico name="check" size={18} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.crossIcon} onPress={() => handleRemoveImage(index)}>
                        <Ico name="close" size={18} color="white" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </Draggable>
            ))}
            {texts.map((item, index) => (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: item.x,
                  top: item.y,
                  backgroundColor: 'transparent',
                }}
                {...panResponder.panHandlers}
                onStartShouldSetResponder={() => {
                  setDraggedIndex(index);
                  return true;
                }}
              >
                <Text>{item.text}</Text>
              </View>
            ))}
            {/* {images.map((image, index) => (
            <Draggable
              key={index}
              x={image.position.x}
              y={image.position.y}
              shouldReverse
              disabled={image.isFixed} // Disable dragging when image is fixed
              onDragRelease={(event, gestureState) => handleDragRelease(event, gestureState, index)}
            >
              <View style={styles.imageContaine}>
 
                <TouchableOpacity onPress={() => handleToggleFixImage(index)}>
                  <Image
                    source={{ uri: image.path }} // Selected image source
                    style={styles.selectedImage} // Set the dimensions of your selected image
                   
 
                  />
                </TouchableOpacity>
 
                {!image.isFixed && (
                  <>
                    <TouchableOpacity style={styles.tickIcon} onPress={() => handleToggleFixImage(index)}>
                      <Ico name="check" size={18} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.crossIcon} onPress={() => handleRemoveImage(index)}>
                      <Ico name="close" size={18} color="white" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </Draggable>
          ))} */}




            <View style={[styles.textContainer, { left: scaledGoldX, top: scaledGoldY }]}>
              <Text style={[styles.text, { color: color, fontSize: fontSize }]}>{goldValue}</Text>
            </View>
            <View style={[styles.textContainer, { left: scaledSilverX, top: scaledSilverY }]}>
              <Text style={[styles.text, { color: color, fontSize: fontSize }]}>{silverValue}</Text>
            </View>
            <View style={[styles.textContainer, { left: scaledDateX, top: scaledDateY }]}>
              <Text style={[styles.text1, { color: color }]}>
                {moment(selectedDate).isValid() ? moment(selectedDate).format('DD/MM/YYYY') : ' '}
              </Text>
            </View>
            <View style={[styles.textContainer, { left: scaledLogoX, top: scaledLogoY }]}>
              <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getLayout(), { transform: [{ scale }] }]}
              >
                {showControls && (
                  <TouchableOpacity onPress={toggleControls}>
                    <Icon
                      color='white'
                      type={Icons.AntDesign}
                      name='checkcircle'
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={toggleControls}>
                  <Image source={{ uri: `https://gurutheatre.s3.ap-south-1.amazonaws.com/${logo}` }} style={{ ...styles.logo, transform: [{ scale }] }} resizeMode="contain" />
                </TouchableOpacity>
                {showControls && (
                  <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
                      <Icon
                        color='white'
                        type={Icons.FontAwesome}
                        name='plus-circle'


                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
                      <Icon
                        color='white'
                        type={Icons.Entypo}
                        name='circle-with-minus'


                      />
                    </TouchableOpacity>
                  </View>


                )}
              </Animated.View>

            </View>

            <View style={[styles.textContainer, { left: scaledFooterX, top: scaledFooterY }]}>
              <Image source={{ uri: `https://gurutheatre.s3.ap-south-1.amazonaws.com/${footer}` }} style={{ width: scaledFooterWidth, height: scaledFooterHeight }} />
            </View>

          </View>
        </ViewShot>
        <View style={styles.imagesContainer}>
          {/* <TouchableOpacity onPress={toggleModald}>
          <Icon
            type={Icons.FontAwesome6}
            name='layer-group'
            style={[styles.images, { right: 100 }]}
            color='#302B63'
          />
          <Modal
            isVisible={isModalVisibled}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={600} // Adjust the animation speed here
            animationOutTiming={600} // Adjust the animation speed here
            onBackdropPress={toggleModald}
          >
            <View style={styles.modalContainer}>
              {renderModalContentd()}
            </View>
          </Modal>
        </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={toggleModal}>
          <Icon
           
            type={Icons.MaterialCommunityIcons}
            name='format-text'
            color='#302B63'
            style={[styles.images, { right: 60 }]}
          />
          <Modal
 
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              {renderModalContent()}
            </View>
          </Modal>
        </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={toggleCameraModals}>
          <Icon
 
            type={Icons.MaterialCommunityIcons}
            color='#302B63'
            name='folder-multiple-image'
            style={[styles.images, { right: 10 }]}
          />
 
        </TouchableOpacity> */}
          {ModalVisible && (
            <View style={[styles.card, { left: (width - cardWidth) / 2 }]}>
              <LinearGradient
                colors={['#0F0C29', '#302B63', '#24243E']}
                style={[styles.linearGradient]}
              >
                <Text style={styles.modalTitle}>
                  &nbsp;
                  Add Image

                </Text>
              </LinearGradient>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: 200 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ left: -10, color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 17 }}>&nbsp; Select an image from gallery &nbsp; or camera</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.buttons, styles.cancelButtons]} onPress={openGallery}>
                  <Text style={styles.buttonTexts}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttond, styles.signupButtond, styles.linearGradients]} onPress={toggleCameraModals} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.buttonText}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          )}

          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{ padding: 15, bottom: 70, zIndex: 1, elevation: 2 }}>
              <Icon
                type={Icons.Feather}
                name='download'
                // style={[styles.images, { right: -45 }]}
                color='#302B63'
              />
            </View>
          </TouchableWithoutFeedback>

         
          <TouchableWithoutFeedback onPress={handleShare}>
          <View style={{ padding: 15, bottom: 70, zIndex: 1, elevation:2}}>
            <Icon
              color='#302B63'
              type={Icons.Fontisto}
              name='share'
              // style={[styles.images, { right: -105 }]}

            />
             </View>
          </TouchableWithoutFeedback>
          {loading && (
            <View style={styles.loadingContainer}>
               <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
            </View>
          )}
        </View>
        <View>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>

          <Text> </Text>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({

  //camera and gallery
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -360,
    width: 300,
    height: 222,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: -125,
    position: 'absolute',
    marginRight: 80
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imagesContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically
    left: 132,
    top: 122,

  },
  image: {
    top: -160,
    height: 375,
    width: 375
  },
  logo: {
    width: 100, // Adjust the size as needed
    height: 70, // Adjust the size as needed
    resizeMode: 'contain', // Ensures the image scales proportionally
  },
  footer: {
    width: 420, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    resizeMode: 'contain', // Ensures the image scales proportionally
  },
  borderBox: {
    width: 280,
    height: 380,
    position: 'relative',
    top: 5,
    borderRadius: 20
  },
  imageWrapper: {


  },
  imageInBox: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    // borderRadius: 20
  },
  logoInBox: {
    width: '25%',
    height: '25%',
    resizeMode: 'cover',
    borderRadius: 20
  },
  instagramIcon: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },

  separator: {
    width: 1,
    height: '80%',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  iconTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    left: -10
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 5,
    right: 20,
    top: 10
  },
  icons: {
    width: 10,
    height: 10,
    marginRight: 5,
    left: -33,
    top: 5
  },
  iconText: {
    color: 'white',
    left: 9,
    fontSize: 9
  },
  iconTexts: {
    color: 'white',
    left: -6,
    fontSize: 9,
    marginTop: -4,
    top: -3
  },
  images: {
    bottom: 109,
    height: 28,
    width: 28,
  },

  modalContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 350,
    bottom: 50,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 'auto',
    width: 300
  },
  modalContents: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 500,
    width: 400,
    top: 160
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
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    width: 250,
    marginBottom: -1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
  },
  linearGradients: {
    borderRadius: 7,
    width: 110,
  },

  controls: {
    flexDirection: 'row',
    marginTop: 20,
    left: 5
  },
  controlButton: {
    marginHorizontal: 9,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  controlTexts: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    top: -15,
    bottom: 17
  },
  centerimage: {
    left: -43
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  linearGradient: {
    height: 85,
    width: 300,
    top: -20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  linearGradiend: {
    height: 740,
    width: 410,
    top: -130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginLeft: 10
  },
  buttonTexts: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginLeft: 10
  },
  cbuttonTexts: {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginLeft: 10
  },
  buttons: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    width: 110,
    // Add borderWidth
    borderColor: '#fff', // Add borderColor
    position: 'flex',

  },
  buttond: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    width: 110,
    // Add borderWidth
    borderColor: '#FFA700', // Add borderColor
    position: 'flex',
    color: '#FFA700'

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
  signupButtond: {
    backgroundColor: '#FFA700', // Change color as needed
    marginRight: 6,
  },
  cancelButton: {
    backgroundColor: 'white', // Set background color to transparent
    borderColor: 'red',
    borderWidth: 1,
    marginLeft: 6, // Adjust as needed for spacing
  },
  cancelButtons: {
    backgroundColor: '#1CE16B', // Set background color to transparent
    borderColor: '#1CE16B',
    borderWidth: 1,
    marginLeft: 6, // Adjust as needed for spacing
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: -7,
    fontFamily: 'Lora-Bold',
  },
  text1: {
    fontSize: 13,
    textAlign: 'center',

    fontFamily: 'Lora-Bold',
  },
  text2: {
    fontSize: 10,
    width: 150,
    color: 'white',
    fontFamily: 'Lora-Bold',
    // Text-specific styles for word wrapping
    flexWrap: 'wrap',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
  text3: {
    width: 50,
    height: 50

  },
  cancelButtonn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    backgroundColor: 'red', // Adjust as needed
    borderRadius: 1,
  },
  fixButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    backgroundColor: 'green', // Adjust as needed
    borderRadius: 12,
  },
  selectedImage: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
  },
  imageContaine: {
    position: 'relative',
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
  },
  tickIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  crossIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  loadingContainer: {
   right:100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: semi-transparent background
    padding: 20, // Optional: add padding to the container
  },
  activityIndicator: {
    transform: [{ scale: 1.9 }], // Increase the size of the ActivityIndicator
  },
});

export default Frame;
