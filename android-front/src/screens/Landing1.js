
import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
 
const Landing1 = () => { // Change 'yoga2' to 'Yoga2'
   const navigation = useNavigation();
 
  const handleStartExploring = () => {
    navigation.navigate('Landing2');
  };
  const handleStartExplorings = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <View style={styles.skipContainer} >
        <Text style={styles.Skipfont} onPress={handleStartExplorings}> SKIP</Text>
      </View>
      <Image
        source={require('../assets/images/firstpart/welcome.png')}
        style={styles.image}
      />
 
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Vishmate!</Text>
        <Text></Text>
        <Text style={styles.subtitle}>  Welcome aboard! Let's get started with creating</Text>
        <Text style={styles.subtitle}>stunning posters for your business and special</Text>
        <Text style={styles.lsubtitle}>     occasions</Text>
        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={require('../assets/images/firstpart/1.png')}
              style={{height:13, width:54 ,right:80,top:60}}
            />
            <TouchableOpacity style={styles.button} onPress={handleStartExploring} >
              <LinearGradient
                colors={['#0F0C29', '#302B63', '#0F0C29','#0F0C29']}
                style={styles.gradient}
                start={{ x: 0, y: 0.8 }} // Horizontal alignment
                end={{ x: 0, y: 0}}>
                <Text style={styles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Add background color here
    paddingTop: 50, // Add padding to align content downward
  },
  image: {
    width: 310,
    height: 350,
    marginBottom: 90,
    top:-39
  },
  contentContainer: {
    marginBottom: -30,
    alignItems: 'center', // Align content to center horizontally
    top:-40
  },
  title: {
    fontFamily: "Lora-Bold",
    color: "black",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "Montserrat-Medium",
    color: "black",
    fontSize: 14,
    marginBottom: 10,
  },
  lsubtitle: {
    fontFamily: "Montserrat-Medium",
    color: "black",
    fontSize: 14,
    marginBottom: 10,
    right: 140
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Adjust this as needed
  },
 
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  button: {
    width: 110,
    height: 37,
    top:50,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    right: -99,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'gold',
    fontFamily: "VollkornSC-SemiBold",
  },
  Skipfont: {
    fontFamily: "Lora-Bold",
    color: "#133987",
    fontSize: 22,
    marginBottom: 10,
    left:-10
  }
});
export default Landing1;