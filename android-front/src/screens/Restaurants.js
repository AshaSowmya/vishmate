import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Restaurants = () => {
  return (
    <View style={styles.container}>
      <Text>Restaurants Screen</Text>
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Restaurants;
