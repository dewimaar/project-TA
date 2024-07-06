import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionsScreen = ({ navigation }) => {
  const handleTransactionMethods = () => {
    navigation.navigate('TransactionMethods');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaksi Saya</Text>
      {/* Add your transaction list or details here */}
      <TouchableOpacity style={styles.button} onPress={handleTransactionMethods}>
        <Icon name="wallet-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Metode Transaksi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TransactionsScreen;
