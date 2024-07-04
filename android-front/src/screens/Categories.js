import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_GATEWAY_URL } from '@env';
 
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const navigation = useNavigation();
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_GATEWAY_URL}/api/categoryposts`,
          {
            headers: {
              Authorization: 'Bearer 86EE3824F5B2BACC2DDCB1D6B9799A4C8C355BC132BEFDB4C1CB6AF287',
            },
          }
        );
        const categoryData = response.data.categorypost;  // Extract the categorypost array
        setCategories(categoryData);
        console.log("categoryposts:", categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
 
    fetchCategories();
 
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
    };
 
    Dimensions.addEventListener('change', updateDimensions);
 
    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);
 
  const itemWidth = screenWidth / 2 - 30; // Adjusted to account for padding/margin
  const itemHeight = itemWidth; // To keep the image square
 
  const handlePress = (x) => {
    navigation.navigate(x);
  };
 
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.category_name)}>
      <View style={[styles.itemContainer, { width: itemWidth, height: itemHeight + 40 }]}>
        {item.category_image ? (
          <Image source={{ uri: item.category_image }} style={{ width: itemWidth, height: itemHeight, resizeMode: 'cover' }} />  
        ) : (
          <View style={[styles.imagePlaceholder, { width: itemWidth, height: itemHeight }]}>
            <Text>No Image</Text>
          </View>
        )}
        <Text style={styles.text}>{item.category_name || 'No Name'}</Text>
      </View>
    </TouchableOpacity>
  );
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => item.category_id ? item.category_id.toString() : index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "Lora-Bold",
    color: "black"
  },
});
 
export default Categories;
 
