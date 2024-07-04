
 

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const News2= () => {
//   const [newsImage, setNewsImage] = useState('');
//   const [heading, setHeading] = useState('');
//   const [tagline, setTagline] = useState('');

//   const fetchStoredData = async () => {
//     try {
//       const storedNewsImage = await AsyncStorage.getItem('news_image');
//       const storedHeading = await AsyncStorage.getItem('heading');
//       const storedTagline = await AsyncStorage.getItem('tagline');

//       if (storedNewsImage) setNewsImage(storedNewsImage);
//       if (storedHeading) setHeading(storedHeading);
//       if (storedTagline) setTagline(storedTagline);
//     } catch (error) {
//       console.error('Error fetching data from AsyncStorage:', error);
//     }
//   };

//   useEffect(() => {
//     fetchStoredData();
//   }, []);

//   return (
//     <ScrollView style={styles.scrollView}>
//       <View style={styles.container}>
//         <Text>&nbsp;</Text>
//         <TouchableOpacity>
//           {newsImage ? (
//             <Image
//               source={{ uri: newsImage }}
//               style={styles.newsImage}
//             />
//           ) : null}
//         </TouchableOpacity>
//         {heading ? (
//           <Text style={styles.heading}>{heading}</Text>
//         ) : null}
//         {tagline ? (
//           <Text style={styles.tagline}>{tagline}</Text>
//         ) : null}
//         <Text>&nbsp;</Text>
//       </View>
//     </ScrollView>
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
//   scrollView: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   heading: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     marginRight: 95,
//     marginBottom: 50,
//     top: 10,
//     color: 'black',
//     fontFamily: "Montserrat-Medium",
//   },
//   tagline: {
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 16,
//     justifyContent:'center',
//     alignContent:'center',
//     fontFamily: "Montserrat-Medium",
//   },
// });

// export default News2;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const News2= () => {
  const [newsImage, setNewsImage] = useState('');
  const [heading, setHeading] = useState('');
  const [tagline, setTagline] = useState('');

  const fetchStoredData = async () => {
    try {
      const storedNewsImage = await AsyncStorage.getItem('news_image');
      const storedHeading = await AsyncStorage.getItem('heading');
      const storedTagline = await AsyncStorage.getItem('tagline');

      if (storedNewsImage) setNewsImage(storedNewsImage);
      if (storedHeading) setHeading(storedHeading);
      if (storedTagline) setTagline(storedTagline);
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    fetchStoredData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text>&nbsp;</Text>
          <TouchableOpacity>
            {newsImage ? (
              <Image
                source={{ uri: newsImage }}
                style={styles.newsImage}
              />
            ) : null}
          </TouchableOpacity>
          {heading ? (
            <Text style={styles.heading}>{heading}</Text>
          ) : null}
          {tagline ? (
            <Text style={styles.tagline}>{tagline}</Text>
          ) : null}
          <Text>&nbsp;</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 95,
    marginBottom: 50,
    top: 10,
    color: 'black',
    fontFamily: "Montserrat-Medium",
  },
  tagline: {
    fontSize: 14,
    color: 'black',
    marginBottom: 16,
    justifyContent:'center',
    alignContent:'center',
    fontFamily: "Montserrat-Medium",
  },
});

export default News2;
