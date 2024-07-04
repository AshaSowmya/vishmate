import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Theaters = () => {
  return (
    <View style={styles.container}>
      <Text>Theaters Screen</Text>
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

export default Theaters;
