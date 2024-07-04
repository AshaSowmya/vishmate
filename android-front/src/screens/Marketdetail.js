import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,Linking,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyHeader from '../bottomTab/MyHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon, { Icons } from '../bottomTab/Icons';
 
const { width, height } = Dimensions.get('window');
const MarketDetail = ({ navigation }) => {
 
 
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState('');
  const [about, setAbout] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [technologies, setTechnologies] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const service_name = await AsyncStorage.getItem('service_name');
        const price_amount = await AsyncStorage.getItem('price_amount');
        const selected_image = await AsyncStorage.getItem('selected_image');
        const about = await AsyncStorage.getItem('about');
        const tools_used = await AsyncStorage.getItem('tools_used');
 
        setDescription(service_name || '');
        setAmount(price_amount || '');
        setImage(selected_image || '');
        setAbout(about || '');
        setToolsUsed(tools_used || '');
 
        // Simulating fetching paragraph and technologies from backend
       
   
 
        const fetchedTechnologies = [
          "Lorem ipsum dolor",
          "Lorem ipsum dolor",
          "Lorem ipsum dolor",
        ];
        setTechnologies(fetchedTechnologies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
 
  const callNumber = () => {
    const phoneNumber = '7418415755';
    const url = `tel:${phoneNumber}`;
   
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    };
 
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
      <View style={styles.itemContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.description}>{description}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountDescription}>Starts From</Text>
          <Text style={styles.amount}>₹{amount}/-</Text>
        </View>
        <Text style={styles.paragraph}>{about}</Text>
        <View style={styles.technologyContainer}>
          <Text style={styles.technologyTitle}>Technology Used:</Text>
          <Text style={styles.technology}>{toolsUsed}</Text>
          <View style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#0F0C29', '#302B63', '#24243E']}
              style={styles.buttonLinearGradient}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 0, y: 0 }}>
              <TouchableOpacity style={styles.buttons}  onPress={callNumber}>
                <Icon type={Icons.Feather} name="phone-call" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Contact Us</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "white"
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 70,
  },
  description: {
    fontSize: 20,
    fontFamily: 'Lora-Bold',
    color: "#000000",
    top:-40,
    marginLeft:13
   
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
    marginRight: 5,
    fontFamily: "Montserrat-Medium",
    fontWeight: "bold",
    marginBottom: 40,
    top:-20,
    left:16
  },
  amount: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    flex: 1,
    fontFamily: "inter",
    fontWeight: "bold",
    marginBottom: 40,
    top:-20,
    left:90
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginHorizontal: 20,
    marginBottom: 10,
    color: '#000000',
    top:-50
  },
  technologyContainer: {
    marginTop: 10,
    marginLeft: 18,
  },
  technologyTitle: {
    fontSize: 16,
    fontFamily: 'Lora-Bold',
    marginBottom: 5,
    color: '#000000',
    top:-35
  },
  technology: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginLeft: 4,
    marginBottom: 60,
    color: '#000000',
    top:-20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Lora-Bold',
    fontSize: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    borderRadius: 20,
  },
  buttonIcon: {
    marginRight: 10,
    color: "#FFFFFF",
  },
  buttonLinearGradient: {
    borderRadius: 10,
    width: '109%',
    height: 45,
    justifyContent: 'center',
    top:-10,
    right:width * 0.02,
  },
});
 
export default MarketDetail;
 