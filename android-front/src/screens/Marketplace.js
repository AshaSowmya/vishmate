import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator ,Dimensions} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_GATEWAY_URL } from '@env';
 
const { width, height } = Dimensions.get('window');
 
const MarketItem = ({ image, description, amountDescription, amount, about, toolsUsed, navigation }) => {
  const navigateToDetail = async () => {
    try {
      await AsyncStorage.setItem('service_name', description || '');
      await AsyncStorage.setItem('price_amount', (amount || '').toString());
      await AsyncStorage.setItem('selected_image', image || '');
      await AsyncStorage.setItem('about', about || '');
      await AsyncStorage.setItem('tools_used', toolsUsed || '');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
    navigation.navigate('Marketdetail', { description, amount });
  };
 
  return (
    <TouchableOpacity onPress={navigateToDetail} style={styles.itemContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amountDescription}>{amountDescription}</Text>
        <Text style={styles.amount}>{amount}/-</Text>
      </View>
    </TouchableOpacity>
  );
};
 
const Marketplace = ({ navigation }) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const fetchMarket = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_GATEWAY_URL}/api/marketplaces`, {
        headers: {
          Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
        },
      });
      console.log('MarketPlace response:', response.data.marketplace);
      const activeCategories = response.data.marketplace
        .filter(cat => cat.status === 'active')
        .sort((a, b) => a.someProperty > b.someProperty ? 1 : -1);
      setMarketData(activeCategories);
    } catch (error) {
      console.error('Error fetching MarketPlace:', error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchMarket();
    const interval = setInterval(() => {
      fetchMarket();
    }, 5000); // Refresh data every 5 seconds
 
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Ensure loading indicator shows for at least 10 seconds
 
    return () => clearTimeout(timer);
  }, []);
 
  const renderMarketItem = ({ item }) => (
    <MarketItem
      key={item.id}
      image={item.selected_image}
      description={item.service_name}
      amountDescription="Starts From"
      amount={item.price_amount}
      about={item.about}
      toolsUsed={item.tools_used}
      navigation={navigation}
    />
  );
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <FlatList
        data={marketData}
        renderItem={renderMarketItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    left: width * 0.04,
    marginBottom: 10,
    top: 10
  },
  image: {
    width: width * 0.400,
    height: height * 0.194,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Lora-Bold',
    color: "#000000"
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountDescription: {
    fontSize: 10,
    textAlign: 'center',
    color: '#000000',
    marginRight: 5,
    fontFamily: "Montserrat-Medium",
    fontWeight: "bold",
    marginTop: 7
  },
  amount: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    left: width * 0.10,
    fontFamily: "inter",
    fontWeight: "bold",
    marginTop: 7
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
export default Marketplace;