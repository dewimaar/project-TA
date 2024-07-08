import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionMethodsScreen = () => {
  const [bankName, setBankName] = useState('');
  const [bankUsername, setBankUsername] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [userId, setUserId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        console.log('Retrieved Token:', token);

        const userResponse = await axios.get('http://192.168.173.23:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(userResponse.data.id);

        const storeResponse = await axios.get(`http://192.168.173.23:8000/api/stores/${userResponse.data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStoreId(storeResponse.data.id);
        setStoreName(storeResponse.data.name);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        Alert.alert('Error', 'Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchPaymentMethods();
    }
  }, [storeId]);

  const fetchPaymentMethods = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get(`http://192.168.173.23:8000/api/payment-methods/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaymentMethods(response.data);
    } catch (error) {
    }
  };  

  const handleSavePaymentMethod = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      const response = await axios.post('http://192.168.173.23:8000/api/payment-methods', {
        user_id: userId,
        store_id: storeId,
        bank_name: bankName,
        bank_username: bankUsername,
        bank_account_number: bankAccountNumber,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      Alert.alert('Success', 'Metode pembayaran berhasil disimpan.');
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error saving payment method:', error);
      Alert.alert('Error', 'Gagal menyimpan metode pembayaran.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metode Transaksi</Text>
      {storeName && (
        <Text style={styles.storeName}>Toko: {storeName}</Text>
      )}
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

      {paymentMethods.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Metode Transaksi yang Sudah Ditambahkan:</Text>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.methodItem}>
              <Text style={styles.methodText}>Nama Bank: {method.bank_name}</Text>
              <Text style={styles.methodText}>Username Bank: {method.bank_username}</Text>
              <Text style={styles.methodText}>No Rekening: {method.bank_account_number}</Text>
            </View>
          ))}
        </View>
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
  listContainer: {
    marginTop: 20,
    width: '100%',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  methodItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  methodText: {
    fontSize: 16,
  },
  storeName: {
    marginTop: 0,
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionMethodsScreen;
