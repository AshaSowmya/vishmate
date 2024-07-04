/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tab from './bottomTab/Tab';
import AddBusiness from './screens/AddBusiness';
import Marketdetail from './screens/Marketdetail';
import Colors from './bottomTab/Colors';
import Landing1 from './screens/Landing1';
import CategoriesParticular from './screens/CategoriesParticular';
import Landing2 from './screens/Landing2';
import Landing3 from './screens/Landing3';
import Thankyou from './screens/Thankyou';
import SignUp from './screens/SignUp';
import Subscribe from './screens/Subscribe';
import BusinessDetails from './screens/BusinessDetails';
import personalInfo from './screens/personalInfo';
import ForgotPassword from './screens/ForgotPassword';
import VerifyPassword from './screens/VerifyPassword';
import Otp from './screens/Otp';
import News2 from './screens/News2';
import Frame from './screens/Frame';
import EditDetails from './screens/EditDetails';
import Jewellery from './screens/Jewellery';
import Theaters from './screens/Theaters';
import Restaurants from './screens/Restaurants';
import { Provider, MD2DarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <Provider theme={isDarkMode ? MD2DarkTheme : PaperDefaultTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor} />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

const options = {
  gestureEnabled: true, // This can be set to false globally if needed
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addBusiness, setAddBusiness] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
      const addBusiness = await AsyncStorage.getItem('addBusiness');
      setAddBusiness(addBusiness === 'true');
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    return null; // or a loading indicator
  }

  return (
    <Stack.Navigator screenOptions={options}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Landing1" component={Landing1} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Landing2" component={Landing2} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Landing3" component={Landing3} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: false }} />
          <Stack.Screen name="VerifyPassword" component={VerifyPassword} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Otp" component={Otp} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Subscribe" component={Subscribe} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Thankyou" component={Thankyou} options={{ gestureEnabled: false }} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Tab" component={Tab} options={{ gestureEnabled: false }} />
          <Stack.Screen name="CategoriesParticular" component={CategoriesParticular} options={{ gestureEnabled: false }} />
          <Stack.Screen name="personalInfo" component={personalInfo} options={{ gestureEnabled: false }} />
          <Stack.Screen name="EditDetails" component={EditDetails} options={{ gestureEnabled: false }} />
          <Stack.Screen name="News2" component={News2} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Marketdetail" component={Marketdetail} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Frame" component={Frame} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Jewellery" component={Jewellery} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Theaters" component={Theaters} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Restaurants" component={Restaurants} options={{ gestureEnabled: false }} />
        </>
      ) : !addBusiness ? (
        <>
          <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Tab" component={Tab} options={{ gestureEnabled: false }} />
          <Stack.Screen name="EditDetails" component={EditDetails} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Frame" component={Frame} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Marketdetail" component={Marketdetail} options={{ gestureEnabled: false }} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} options={{ gestureEnabled: false }} />
          <Stack.Screen name="BusinessDetails" component={BusinessDetails} options={{ gestureEnabled: false }} />
          <Stack.Screen name="personalInfo" component={personalInfo} options={{ gestureEnabled: false }} />
          <Stack.Screen name="News2" component={News2} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Subscribe" component={Subscribe} options={{ gestureEnabled: false }} />
          <Stack.Screen name="CategoriesParticular" component={CategoriesParticular} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Jewellery" component={Jewellery} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Theaters" component={Theaters} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Restaurants" component={Restaurants} options={{ gestureEnabled: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Tab" component={Tab} options={{ gestureEnabled: false }} />
          <Stack.Screen name="EditDetails" component={EditDetails} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Frame" component={Frame} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Marketdetail" component={Marketdetail} options={{ gestureEnabled: false }} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} options={{ gestureEnabled: false }} />
          <Stack.Screen name="BusinessDetails" component={BusinessDetails} options={{ gestureEnabled: false }} />
          <Stack.Screen name="personalInfo" component={personalInfo} options={{ gestureEnabled: false }} />
          <Stack.Screen name="News2" component={News2} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Subscribe" component={Subscribe} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }} />
          <Stack.Screen name="CategoriesParticular" component={CategoriesParticular} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Jewellery" component={Jewellery} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Theaters" component={Theaters} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Restaurants" component={Restaurants} options={{ gestureEnabled: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default App;
