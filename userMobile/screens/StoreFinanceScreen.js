// screens/StoreFinanceScreen.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StoreFinanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Keuangan Toko Saya</Text>
      {/* Add your financial details and components here */}
    </View>
  );
};

export default StoreFinanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
