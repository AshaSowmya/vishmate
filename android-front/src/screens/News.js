// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { REACT_APP_API_GATEWAY_URL } from '@env';
 
// // const News = () => {
// //   const navigation = useNavigation();
// //   const [news, setNews] = useState([]);
 
// //   const fetchNews = async () => {
// //     try {
// //       const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/newses`, {
// //         headers: {
// //           Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
// //         },
// //       });
// //       console.log('Particulars response:', response.data.news);
// //       const activeCategories = response.data.news
// //       .filter(cat => cat.status === 'active')
// //       .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);
// //       setNews(activeCategories || []);
// //     } catch (error) {
// //       console.error('Error fetching Particulars:', error);
// //       setNews([]); // Set to empty array on error
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNews();
// //     const interval = setInterval(() => {
// //       fetchNews();
// //     }, 500); // Refresh data every 5 seconds

// //     return () => clearInterval(interval); // Clear interval on unmount
// //   }, []);
 
// //   const navigateToNews2 = async (newsItem) => {
// //     try {
// //       if (newsItem.news_image) {
// //         await AsyncStorage.setItem('news_image', newsItem.news_image);
// //       }
// //       if (newsItem.heading) {
// //         await AsyncStorage.setItem('heading', newsItem.heading);
// //       }
// //       if (newsItem.tagline) {
// //         await AsyncStorage.setItem('tagline', newsItem.tagline);
// //       }
// //       navigation.navigate('News2');
// //     } catch (error) {
// //       console.error('Error saving data to AsyncStorage:', error);
// //     }
// //   };
 
// //   return (
// //     <ScrollView>
// //       <View style={styles.container}>
// //         <Text>&nbsp;</Text>
// //         {news && news.length > 0 ? (
// //           news.map((newCategory, index) => (
// //             <TouchableOpacity key={index} onPress={() => navigateToNews2(newCategory)}>
// //               <Image
// //                 source={{ uri: newCategory.news_image }}
// //                 style={styles.newsImage}
// //               />
             
// //             </TouchableOpacity>
// //           ))
// //         ) : (
// //           <Text>No news available.</Text>
// //         )}
// //         <Text>&nbsp;</Text>
// //       </View>
// //     </ScrollView>
// //   );
// // };
 
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'white',
// //     padding: 16,
// //   },
// //   newsImage: {
// //     height: 210,
// //     width: 380,
// //     borderRadius: 18,
// //     marginBottom: 16,
// //   },
// //   heading: {
// //     fontSize: 17,
// //     fontWeight: 'bold',
// //     marginRight: 115,
// //     marginBottom: 50,
// //     top: 10,
// //     color: 'black',
// //   },
// //   tagline: {
// //     fontSize: 14,
// //     color: 'gray',
// //     marginBottom: 16,
// //   },
// // });
 
// // export default News;
 



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView,ActivityIndicator, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { REACT_APP_API_GATEWAY_URL } from '@env';

// const News = () => {
//   const navigation = useNavigation();
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/newses`, {
//         headers: {
//           Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
//         },
//       });
//       console.log('Particulars response:', response.data.news);
//       const activeCategories = response.data.news
//         .filter(cat => cat.status === 'active')
//         .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);
//       setNews(activeCategories || []);
//     } catch (error) {
//       console.error('Error fetching Particulars:', error);
//       Alert.alert(
//         'Network Error',
//         'Check your network connection.',
//         [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
//       );
//     } finally {
//       setLoading(false); // Hide loading spinner once data is fetched
//     }
//   };


//   useEffect(() => {
//     // Fetch data initially
//     fetchNews();
 

//     // Set loading to false after 10 seconds
//     const timeout = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     // Cleanup function
//     return () => clearTimeout(timeout);
//   }, []);

//   const navigateToNews2 = async (newsItem) => {
//     try {
//       if (newsItem.news_image) {
//         await AsyncStorage.setItem('news_image', newsItem.news_image);
//       }
//       if (newsItem.heading) {
//         await AsyncStorage.setItem('heading', newsItem.heading);
//       }
//       if (newsItem.tagline) {
//         await AsyncStorage.setItem('tagline', newsItem.tagline);
//       }
//       navigation.navigate('News2');
//     } catch (error) {
//       console.error('Error saving data to AsyncStorage:', error);
//     }
//   };

//   return (
//     <>
//     {isLoading ? ( // Display activity indicator if loading
//     <View style={[styles.container, styles.horizontal]}>
//       <ActivityIndicator size="large" color="#0000ff" />
//     </View>
//   ) : (
//     <ScrollView>
 
//       <View style={styles.container}>
//         <Text>&nbsp;</Text>
//         {news && news.length > 0 ? (
//           news.map((newCategory, index) => (
//             <TouchableOpacity key={index} onPress={() => navigateToNews2(newCategory)}>
//               <Image
//                 source={{ uri: newCategory.news_image }}
//                 style={styles.newsImage}
//               />
//             </TouchableOpacity>
//           ))
//         ) : (
//           !loading && <Text>No news available.</Text>
//         )}
//         <Text>&nbsp;</Text>
//       </View>
//     </ScrollView>
//      )}
//         </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   newsImage: {
//     height: 210,
//     width: 380,
//     borderRadius: 18,
//     marginBottom: 16,
//   },
//   heading: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     marginRight: 115,
//     marginBottom: 50,
//     top: 10,
//     color: 'black',
//   },
//   tagline: {
//     fontSize: 14,
//     color: 'gray',
//     marginBottom: 16,
//   },
//   spinnerTextStyle: {
//     color: '#FFFFFF',
//   },
// });

// export default News;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,ActivityIndicator, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_GATEWAY_URL } from '@env';

const News = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/newses`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      console.log('Particulars response:', response.data.news);
      const activeCategories = response.data.news
        .filter(cat => cat.status === 'active')
        .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);
      setNews(activeCategories || []);
    } catch (error) {
      console.error('Error fetching Particulars:', error);
      Alert.alert(
        'Network Error',
        'Check your network connection.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } finally {
      setLoading(false); // Hide loading spinner once data is fetched
    }
  };


  useEffect(() => {
    // Fetch data initially
    fetchNews();
 

    // Set loading to false after 10 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);

  const navigateToNews2 = async (newsItem) => {
    try {
      if (newsItem.news_image) {
        await AsyncStorage.setItem('news_image', newsItem.news_image);
      }
      if (newsItem.heading) {
        await AsyncStorage.setItem('heading', newsItem.heading);
      }
      if (newsItem.tagline) {
        await AsyncStorage.setItem('tagline', newsItem.tagline);
      }
      navigation.navigate('News2');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    {isLoading ? ( // Display activity indicator if loading
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <ScrollView>
 
      <View style={styles.container}>
        <Text>&nbsp;</Text>
        {news && news.length > 0 ? (
          news.map((newCategory, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToNews2(newCategory)}>
              <Image
                source={{ uri: newCategory.news_image }}
                style={styles.newsImage}
              />
            </TouchableOpacity>
          ))
        ) : (
          !loading && <Text>No news available.</Text>
        )}
        <Text>&nbsp;</Text>
      </View>
    </ScrollView>
     )}
     </SafeAreaView>
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  newsImage: {
    height: 210,
    width: 380,
    borderRadius: 18,
    marginBottom: 16,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 115,
    marginBottom: 50,
    top: 10,
    color: 'black',
  },
  tagline: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 16,
  },
  spinnerTextStyle: {
    color: '#FFFFFF',
  },
});

export default News;
