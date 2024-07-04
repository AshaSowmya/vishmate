import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text, ScrollView,ActivityIndicator, TouchableOpacity, FlatList, Alert, BackHandler ,SafeAreaView} from 'react-native';
import SwiperComponent from '../screens/SwiperComponent';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { REACT_APP_API_GATEWAY_URL } from '@env';
 
const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
 
  /****************************************************Latest News************************************************************************************* */
  const [news, setNews] = useState();
  const fetchNews = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/newses`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      console.log('Particulars response:', response.data.news);
      setNews(response.data.news);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // other than 2xx.
        console.error('Server responded with error status:', error.response.status);
        Alert.alert('Error', 'Server responded with an error. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received, or the request failed
        // to be sent.
        console.error('No response received from server:', error.request);
        Alert.alert(' Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error.
        console.error('Error setting up request:', error.message);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };
 
  /****************************************************Category************************************************************************************* */
  const [category, setCategory] = useState();
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/categoryframes`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      console.log('Particulars response:', response.data.categoryframe);
      const activeCategories = response.data.categoryframe
        .filter(cat => cat.status === 'active')
        .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);
 
      setCategory(activeCategories || []);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
      setCategory([]); // Set to empty array on error
    }
  };
 
  const [categoryPost, setCategoryPost] = useState([]);
  const fetchCategoryPost = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/categoryposts`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      console.log('Particulars response:', response.data.categorypost);
 
      setCategoryPost(response.data.categorypost || []);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
      setCategoryPost([]); // Set to empty array on error
    }
  };
 
  useEffect(() => {
    // Fetch data initially
    fetchCategoryPost();
    fetchNews();
    fetchCategory();

    // Set loading to false after 10 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);
 
  const uniqueCategories = Array.isArray(category) && category.length > 0
    ? [...new Set(category.map(cat => cat.category_type))].sort()
    : [];
 
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
        <Image source={{ uri: item.category_image }} style={styles.smallImage1} />
        <Text style={styles.categoryName}>{item.category_name}</Text>
      </TouchableOpacity>
    </View>
  );
 
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
 
  return (
    <>
  
    {isLoading ? ( // Display activity indicator if loading
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <SwiperComponent />
       
        <View style={{ marginTop: 20 }}>
          {Array.isArray(uniqueCategories) && uniqueCategories.length > 0 ? uniqueCategories.map((uniqueCategory, index) => (
            <View key={index}>
              <View style={styles.group}>
              <TouchableOpacity onPress={() => navigation.navigate('Categories', { category: uniqueCategory })}>
                <Text style={styles.category}>{uniqueCategory}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Categories', { category: uniqueCategory })}>
                <Text style={styles.ViewAll}></Text>
              </TouchableOpacity>
              <View style={styles.text}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {category
                    .filter(cat => cat.category_type === uniqueCategory)
                    .map((filteredCategory, idx) => (
                      <View key={idx} style={styles.categoryContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                          <Image
                            source={{ uri: filteredCategory.frame_image }}
                            style={styles.smallImage}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </View>
          )) : (
            <Text style={styles.noCategories}>No categories available</Text>
          )}
        </View>
        <View style={styles.group}>
       
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.category}>Category&nbsp;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
            data={categoryPost.filter(cat => cat.category_status === 'active')}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4} // 4 columns per row
            columnWrapperStyle={styles.row} // Custom style for row
            contentContainerStyle={styles.listContainer} // Custom style for list container
          />
        </View>
        <View>
          <Text style={{ marginLeft: 20, marginTop: 10, fontFamily: "Lora-Bold", color: '#000000', fontSize: 18 }}>Latest News</Text>
          <View style={styles.outerContainer}>
          {news && news.length > 0 ? (
            news.slice(-1).map((newsDetails, index) => (
              <Image
                key={index}
                source={{ uri: newsDetails.news_image }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 380,
                  height: 200,
                  marginLeft: 8,
                  marginTop: 10,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              />
            ))
          ) : (
            <Text style={{ marginLeft: 20, marginTop: 10 }}>No news available</Text>
          )}
          </View>
        </View>
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
      </ScrollView>
      </SafeAreaView>
      )}
    
    </>
        
  );
}
 


const styles = StyleSheet.create({
  imageText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: "Montserrat-Medium",
  },
  smallImage1: {
    width: 65,
    height: 65,
    marginHorizontal: 5,
  },
  smallImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  images: {
    flexDirection: 'row',
  },
  categoryName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14, // Adjust font size as needed
    color: '#000', // Ensure text is a visible color
  },
  text: {
    flexDirection: 'row',
    marginLeft: 10,

  },
  text1: {
    flexDirection: 'row',
  },
  group: {
    flexDirection: 'row',
    marginTop: 10,
  },
  category: {
    marginLeft: 20,
    fontFamily: "Lora-Bold",
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  ViewAll1: {
    marginLeft: 210,
    fontSize: 18,
    fontWeight: '600',
    color: '#706F6F',
    fontFamily: "Lora-Bold",
  },
  ViewAll: {
    marginLeft: 310,
    fontSize: 18,
    top: -20,
    fontWeight: '600',
    color: '#706F6F',
    fontFamily: "Lora-Bold",
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 10, // Add marginBottom to leave gap between rows
  },
  listContainer: {
    paddingHorizontal: 10, // Optional: Add padding around the entire list
  },
});
 
export default Home;