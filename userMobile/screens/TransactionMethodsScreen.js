import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionMethodsScreen = () => {
  const [bankName, setBankName] = useState('');
  const [bankUsername, setBankUsername] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [userId, setUserId] = useState(null); // Assuming user ID will be fetched and set here
  const [storeId, setStoreId] = useState(null); // State to store fetched store ID
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        console.log('Retrieved Token:', token);

        // Fetch user data
        const userResponse = await axios.get('http://192.168.195.23:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(userResponse.data.id); // assuming the user ID is in response.data.id

        // Fetch store data using user ID
        const storeResponse = await axios.get(`http://192.168.195.23:8000/api/stores/${userResponse.data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStoreId(storeResponse.data.id); // assuming the store ID is in response.data.id
        setStoreName(storeResponse.data.name); // assuming the store name is in response.data.name
      } catch (error) {
        console.error('Failed to fetch data:', error);
        Alert.alert('Error', 'Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const handleSavePaymentMethod = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      const response = await axios.post('http://192.168.195.23:8000/api/payment-methods', {
        user_id: userId, // Use fetched user ID
        store_id: storeId, // Use fetched store ID
        bank_name: bankName,
        bank_username: bankUsername,
        bank_account_number: bankAccountNumber,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data); // Optional: log the response data
      Alert.alert('Success', 'Metode pembayaran berhasil disimpan.');
    } catch (error) {
      console.error('Error saving payment method:', error);
      Alert.alert('Error', 'Gagal menyimpan metode pembayaran.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metode Transaksi</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Bank"
        value={bankName}
        onChangeText={setBankName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username Bank"
        value={bankUsername}
        onChangeText={setBankUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="No Rekening"
        value={bankAccountNumber}
        onChangeText={setBankAccountNumber}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSavePaymentMethod}>
        <Text style={styles.buttonText}>Simpan Metode Pembayaran</Text>
      </TouchableOpacity>

      {/* Optional: Display store name */}
      {storeName && (
        <Text style={styles.storeName}>Toko: {storeName}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeName: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionMethodsScreen;
