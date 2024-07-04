import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, useColorScheme, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from './Icons';
import Colors from './Colors';
import MyHeader from '../bottomTab/MyHeader';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Home from '../screens/Home';
import Market from '../screens/Marketplace';
import News from '../screens/News';
import Categories from '../screens/Categories';
import Profile from '../screens/Profile';
 
const TabArr = [
  { route: 'News', label: 'News', type: Icons.FontAwesome, icon: 'newspaper-o', component: News },
  { route: 'Categories', label: 'Categories', type: Icons.FontAwesome5, icon: 'table', component: Categories },
  { route: 'Home', label: 'Home', type: Icons.Entypo, icon: 'home', component: Home },
  { route: 'Market Place', label: 'Market', type: Icons.FontAwesome, icon: 'bar-chart', component: Market },
  { route: 'Profile', label: 'Profile', type: Icons.AntDesign, icon: 'user', component: Profile },
];
 
const Tab = createBottomTabNavigator();
 
const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }
 
const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }
 
const linearGradientColors = ['#0F0C29', '#302B63', '#24243E']; // Define gradient colors here
 
const AnimTab1 = ({ navigation }) => {
  const [headerTitle, setHeaderTitle] = useState('Home'); // Initialize header title to "Home"
 
  const handleTabPress = (routeName) => {
    setHeaderTitle(routeName); // Update header title dynamically
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={linearGradientColors}
        style={{ flex: 1 }}
      >
        <StatusBar backgroundColor={linearGradientColors[0]} barStyle="light-content" />
        <View>
          <MyHeader
            title={headerTitle} // Set the header title dynamically
            onPressMenu={() => navigation.goBack()}
            right="more-vertical"
            onRightPress={() => console.log('right')}
            height={84} // Adjust width as needed
            titleColor={Colors.white} // Set title color to white
            headerBg="transparent"
            titleFontFamily="Lora-Bold"
          />
        </View>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 54,
              position: 'absolute',
              margin: 16,
              borderRadius: 40,
              backgroundColor: linearGradientColors[0], // Set background color to transparent
            },
          }}
        >
          {TabArr.map((item, index) => (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                  <TabButton
                    {...props}
                    item={item}
                    onPress={() => {
                      navigation.navigate(item.route);
                      handleTabPress(item.label); // Update header title when navigating
                    }}
                  />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      </LinearGradient>
    </SafeAreaView>
  );
};
 
const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
 
  const { colors } = useTheme();
  const color = isDarkMode ? Colors.white : Colors.white; // Change text color based on dark mode
  const bgColor = colors.background;
 
  const handlePress = () => {
    onPress(); // Trigger navigation
  };
 
  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);
 
  // Conditionally render based on route name
  if (item.route === 'Marketdetail') {
    return null; // Render nothing if the route is 'Marketdetail'
  }
 
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={[styles.btn, { borderColor: focused ? Colors.white : "#24243E", borderWidth: 5 }
          , { backgroundColor: focused ? "#24243E" : "#24243E" }, { backgroundColor: focused ? "#24243E" : "#24243E" },
        { width: focused ? 60 : 40 }, { height: focused ? 60 : 40 }]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.black : Colors.white} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text, { color }, { fontFamily: 'Lora-Bold' }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    margin: 16,
    borderRadius: 50,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ECEBF3",
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '500'
  }
});
 
export default AnimTab1;
 