import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,Linking ,ActivityIndicator} from 'react-native';
import { AppColor } from '../Config/index';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const Subscribe = () => {
  const [selectedValue, setSelectedValue] = useState('silver');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
 
  const axiosInstance = axios.create({
    baseURL: 'https://vishmate.com:2001',
    timeout: 10000, 
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
    },
  });
 
  const handleCreateSubscription = async () => {
    const planId = selectedValue === 'silver' ? 'plan_OIxQi7QNHbkZlt' : 'plan_OIxR4qPXNAm74W';
    console.log('Plan ID:', planId);
 
    setLoading(true);
 
    try {
      const response = await axiosInstance.post('/create-subscription', { planId });
      console.log('Subscription created:', response.data);
      const subscriptionId = response.data.subscription.id;
      const shortUrl = response.data.subscription.short_url;
 
      console.log('Subscription ID:', subscriptionId);
      console.log('Short URL:', shortUrl);
 
      if (shortUrl) {
        Linking.openURL(shortUrl).catch(err => {
          console.error('Error opening URL:', err);
          Alert.alert('Error', 'Unable to open URL.');
        });
      }
 
      const name = await AsyncStorage.getItem('userName');
      const mobile = await AsyncStorage.getItem('userMobile');
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');
      const privacyStatus = await AsyncStorage.getItem('privacyStatus');
 
      console.log('User Data:', { name, mobile, email, password, privacyStatus });
 
      const payload = {
        name,
        mobile,
        email,
        password,
        privacy_status: privacyStatus,
        select_plan: selectedValue,
        plan_price: selectedValue === 'silver' ? '₹600' : '₹5000',
        subscription_id: subscriptionId,
        userstatus: 'unpaid',
      };
 
      console.log('Payload for signup:', payload);
 
      const signupResponse = await axiosInstance.post('/api/signup', payload);
      console.log('Signup response:', signupResponse.data);
      console.log('Successfully posted');
      navigation.navigate('SignUp');
    } catch (error) {
      console.error('Error creating subscription or signing up:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'An error occurred while processing your subscription.');
    } finally {
      setLoading(false);
    }
  };
 
 
  const handleExit = () => {
    navigation.navigate('SignUp');
  };
 
  return (
    <LinearGradient
    colors={AppColor.loginBackground}
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity onPress={handleExit}>
        <View style={styles.row1}>
          <Image source={require('../assets/images/secondpart/cross.png')} style={styles.cross} />
          <Text style={styles.cardText1}>Subscribe</Text>
        </View>
      </TouchableOpacity>
      {loading ? (
   <View style={styles.loadingContainer}>
   <ActivityIndicator size="large" color="#FFFFFF" />
   <Text style={styles.loadingText}>Creating Subscription, please wait...</Text>
 </View>
  ) : (
    <>
 
      <View style={styles.container1}>
        <Image source={require('../assets/images/secondpart/Crown.png')} style={styles.crown} />
        <Text style={styles.text1}>Standard Monthly Plan</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
          <Text style={styles.cardText}>Unlimited premium posters designs</Text>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
          <Text style={styles.cardText}>Unlimited downloads</Text>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
          <Text style={styles.cardText}>Remove watermark</Text>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
          <Text style={styles.cardText}>category wise posters</Text>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
          <Text style={styles.cardText}>24/7 Customer Support</Text>
        </View>
        <View style={styles.row}>
          <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
          <Text style={styles.cardText}>Monthly Subscription Plan</Text>
        </View>
          <LinearGradient
            colors={['#F2F2F2', '#FFFFFF', '#C7C7C7']}
            style={{ borderRadius: 6 }}
            start={{ x: 0.1, y: 2.95 }}
            end={{ x: 0, y: 0 }}
          >
            <TouchableOpacity style={styles.buttons} onPress={handleCreateSubscription}>
              <View style={styles.container}>
                <RadioButton.Android
                  value="silver"
                  status={selectedValue === 'silver' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('silver')}
                  color="#000000"
                />
                <Text style={{ fontFamily: "Lora-Bold", color: '#000000', marginLeft: 8, fontSize: 14 }}>1 Month</Text>
                <Text style={{ marginLeft: 120, fontFamily: "Lora-Bold", color: '#000000', fontSize: 14 }}>
                  ₹600
                </Text>
                <Text style={{ textDecorationLine: 'line-through', fontFamily: "Lora-Bold", color: 'red', marginLeft: 4, fontSize: 14 }}>
                  ₹1000
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.container2}>
          <Image source={require('../assets/images/secondpart/gold.png')} style={styles.crown} />
          <Text style={styles.text1}>Premium Yearly Plan</Text>
        </View>
        <View style={styles.card1}>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>Unlimited premium posters designs</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>Unlimited downloads</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>Remove watermark</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>Category wise posters</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>24/7 Customer Support</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>Yearly Subscription Plan</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/secondpart/tick.png')} style={styles.image} />
            <Text style={styles.cardText}>Offers</Text>
          </View>
          <LinearGradient
            colors={['#AE8625', '#F7EF8A', '#D2AC47', '#EDC967']}
            style={{ borderRadius: 6 }}
            start={{ x: 0.1, y: 2.95 }}
            end={{ x: 0, y: 0 }}>
            <TouchableOpacity style={styles.buttons} onPress={handleCreateSubscription}>
              <View style={styles.container}>
                <RadioButton.Android
                  value="gold"
                  status={selectedValue === 'gold' ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue('gold')}
                  color="#000000"
                />
                <Text style={{ fontFamily: "Lora-Bold", color: '#000000', marginLeft: 8, fontSize: 14 }}>1 Year</Text>
                <Text style={{ marginLeft: 120, fontFamily: "Lora-Bold", color: '#000000', fontSize: 14 }}>
                  ₹5000
                </Text>
                <Text style={{ textDecorationLine: 'line-through', fontFamily: "Lora-Bold", color: 'red', marginLeft: 4, fontSize: 14 }}>
                  ₹7200
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        </>
  )}
      </ScrollView>
    </LinearGradient>
  );
};
 
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 10
  },
  buttons: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 380,
    borderColor: 'linear-gradient(180deg, #FFFFFF 0%, #252441 100%)',
    height: 40
  },
  container1: {
    top: 22,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container2: {
    top: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    marginRight: 10,
    width: 17,
    height: 13
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    marginLeft: 10
  },
  image1: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  cardText1: {
    fontSize: 24,
    fontFamily: "Lora-Bold",
    color: '#FFFFFF',
    top: 1
  },
  text: {
    marginLeft: 8,
    fontFamily: "Lora-Bold",
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600'
  },
  text1: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: "Lora-Bold",
    fontSize: 20,
  },
  crown: {
    width: 40,
    height: 40,
    marginLeft: 20
  },
  cross: {
    marginRight: 10,
    width: 21,
    height: 21,
    top: 3
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 370,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginLeft: 20,
    margin: 8,
    top: 30,
    height: 260
  },
  card1: {
    padding: 16,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(231, 216, 116, 0.2)',
    width: 370,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginLeft: 20,
    margin: 8,
    top: 45,
    height: 260
  },
  cardText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: "Montserrat-Medium",
  },
  overlayText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Lora-Bold',
  },
});
 
export default Subscribe;