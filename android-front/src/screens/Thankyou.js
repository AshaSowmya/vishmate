import React, { useState, useEffect } from 'react'; 
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { AppColor } from '../Config/index';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
const Thankyou = () => {
  const navigation = useNavigation();

  // Use state to track whether the timeout has been triggered
  const [redirected, setRedirected] = useState(false);

  // useEffect to trigger navigation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!redirected) {
        // Navigate to 'AddBusiness' page
        navigation.navigate('AddBusiness');
        // Set the redirected state to true to prevent multiple navigations
        setRedirected(true);
      }
    }, 3000);

    // Clear the timer if the component unmounts or navigation occurs
    return () => clearTimeout(timer);
  }, [navigation, redirected]); // Include navigation and redirected in the dependency array

  return (
    <LinearGradient
      colors={AppColor.loginBackground}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
   
        <Text style={styles.text}>
          Congratulations! Payment successful for [App Name] Premium. Explore exclusive features, create stunning posters. Need help? Contact support. Thank you!
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  gif: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    alignSelf: 'center',
    marginBottom: 20 // Add margin bottom for spacing
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20 // Add horizontal padding for spacing
  },
});

export default Thankyou;
