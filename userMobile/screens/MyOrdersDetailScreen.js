import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrdersDetailScreen = ({ route }) => {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) {
          console.error('No token found in AsyncStorage');
          return;
        }

        const response = await axios.get(`http://192.168.99.23:8000/api/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        Alert.alert('Error', 'Error fetching transaction details.');
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  if (!transaction) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Transaksi</Text>
      <Image
        style={styles.itemImage}
        source={{ uri: `http://192.168.99.23:8000/storage/${transaction.variation_image}` }}
        resizeMode="contain"
      />
      <Text style={styles.itemText}>Nama Produk: {transaction.variation_name}</Text>
      <Text style={styles.itemText}>Jumlah: {transaction.quantity}</Text>
      <Text style={styles.itemText}>Harga Unit: ${transaction.unit_price}</Text>
      <Text style={styles.itemText}>Total Harga: ${transaction.total_price}</Text>
      <Text style={styles.itemText}>Alamat: {transaction.full_address}</Text>
      <Text style={styles.itemText}>Link Google Maps: {transaction.google_maps_link}</Text>
      <Text style={styles.itemText}>Metode Pembayaran: {transaction.payment_method}</Text>
      <Text style={styles.itemText}>Status: {transaction.status}</Text>
      {/* Add other transaction details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MyOrdersDetailScreen;
