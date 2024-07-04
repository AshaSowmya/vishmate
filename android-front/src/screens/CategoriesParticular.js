import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyHeader from '../bottomTab/MyHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { REACT_APP_API_GATEWAY_URL } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const CategoriesParticular = () => {
  const [categoryFrames, setCategoryFrames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategoryFrameId, setSelectedCategoryFrameId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef(null);

  const { frameImage, categoryFrameId, subCategory1, subCategory2, goldValue, silverValue, selectedDate, takenPhoto } = route.params || {};

  const fetchCategoriesFrames = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/categoryframes`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      // console.log('Particulars response:', response.data.categoryframe);

      const activeCategories = response.data.categoryframe
        .filter(cat => cat.status === 'active' && 
          (!subCategory1 || cat.sub_category1 === subCategory1) &&
          (!subCategory2 || cat.sub_category2 === subCategory2))
        .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);

      setCategoryFrames(activeCategories || []);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
      setCategoryFrames([]);
    }
  };

  useEffect(() => {
    fetchCategoriesFrames();
  }, []);

  const handleBack = () => {
    navigation.navigate('Jewellery');
  };

  const handleNext = () => {
    if ((subCategory1 === "Plain Templates" || subCategory1 === "Festival Templates") && subCategory2 !== "Without Rate") {
      navigation.navigate('Frame', {
        goldValue: '',
        silverValue: '',
        selectedDate: '',
        takenPhoto: takenPhoto,
        frameImage: selectedImage || frameImage,
        categoryFrameId: selectedCategoryFrameId || categoryFrameId,
        subCategory1: subCategory1,
        subCategory2: subCategory2
      });
    } else {
      navigation.navigate('EditDetails', {
        frameImage: selectedImage || frameImage,
        categoryFrameId: selectedCategoryFrameId || categoryFrameId,
      });
    }
  };

  const handleImageClick = (image, id) => {
    setSelectedImage(image);
    setSelectedCategoryFrameId(id);
    scrollViewRef.current.scrollTo({ y: 0, animated: true, duration: 100 }); // Scroll to the top with increased speed
  };

  const renderImagesInRows = () => {
    const rowSize = 3; // Number of images per row
    const rows = [];

    const firstImage = (
      <TouchableOpacity key={`image_0`} onPress={() => handleImageClick(frameImage, categoryFrameId)}>
        <FastImage source={{ uri: selectedImage || frameImage }} style={styles.largeImage} />
      </TouchableOpacity>
    );
    rows.push(firstImage);

    // Filter out the frames that match the categoryFrameId
    const filteredFrames = categoryFrames.filter(frame => frame.categoryframe_id !== categoryFrameId);

    let currentRow = [];
    filteredFrames.forEach((frame, index) => {
      currentRow.push(
        <TouchableOpacity key={`image_${index + 1}`} onPress={() => handleImageClick(frame.frame_image, frame.categoryframe_id)}>
          <Image source={{ uri: frame.frame_image }} style={styles.image} />
        </TouchableOpacity>
      );

      if (currentRow.length === rowSize || index === filteredFrames.length - 1) {
        rows.push(
          <View style={styles.row} key={`row_${index + 1}`}>
            {currentRow}
          </View>
        );
        currentRow = [];
      }
    });

    return rows;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <MyHeader
          title="Jewellery"
          onPressBack={() => navigation.goBack()}
          headerBg="transparent"
          titleFontFamily="Lora-Bold"
          onRightPress={() => console.log('right')}
          height={84} // Adjust width as needed
        />
        <View style={[styles.container, styles.containerWithMargin]}>
          {renderImagesInRows()}
        </View>
      </ScrollView>
      <LinearGradient
        colors={['#A9A0FA', '#302B63', '#24243E']}
        style={styles.footer}
        start={{ x: 0.9, y: -0.1 }}
        end={{ x: 0.8, y: 2.10 }}
      >
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText1}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <LinearGradient
            colors={['#0F0C29', '#302B63', '#24243E']}
            style={styles.buttonLinear}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 0 }}
          >
            <Text style={styles.buttonText2}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  largeImage: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width - 30,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 10
  },
  image: {
    width: (Dimensions.get('window').width - 60) / 3,
    height: (Dimensions.get('window').width - 60) / 3,
    borderRadius: 6,
    marginRight: 13,
    marginTop: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width *0.02,
    paddingVertical: 15,
    height: 105
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal:width * 0.18,
    width: width * 0.475,
    height: 38
  },
  buttonLinear: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: width * 0.18,
    width: width * 0.475,
    height: 40
  },
  buttonText1: {
    color: 'black',
    fontFamily: "Lora-Bold",
    fontSize: 13
  },
  buttonText2: {
    color: 'white',
    fontFamily: "Lora-Bold",
    fontSize: 13
  },
  containerWithMargin: {
    backgroundColor: 'white',
  },
});

export default CategoriesParticular;
