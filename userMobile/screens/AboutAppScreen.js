import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutAppScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halaman Tentang Aplikasi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AboutAppScreen;
