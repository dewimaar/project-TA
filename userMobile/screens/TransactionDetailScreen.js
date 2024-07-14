import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const TransactionDetailScreen = ({ route }) => {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) {
          console.error('No token found in AsyncStorage');
          return;
        }

        const response = await axios.get(`http://192.168.92.23:8000/api/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransaction(response.data);
        setStatus(response.data.status); // Set initial status from fetched data
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        Alert.alert('Error', 'Error fetching transaction details.');
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  const handleUpdateStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        console.error('No token found in AsyncStorage');
        return;
      }

      await axios.put(
        `http://192.168.92.23:8000/api/transactions/${transactionId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Status updated successfully.');
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Error updating status.');
    }
  };

  if (!transaction) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
console.log(transaction)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Transaksi</Text>
      <Image
        style={styles.itemImage}
        source={{ uri: `http://192.168.92.23:8000/storage/${transaction.variation_image}` }}
        resizeMode="contain"
      />
      <Text style={styles.itemText}>Nama Produk: {transaction.variation_name}</Text>
      <Text style={styles.itemText}>Nama Pembeli: {transaction.user.name}</Text>
      <Text style={styles.itemText}>Jumlah: {transaction.quantity}</Text>
      <Text style={styles.itemText}>Harga Unit: ${transaction.unit_price}</Text>
      <Text style={styles.itemText}>Total Harga: ${transaction.total_price}</Text>
      <Text style={styles.itemText}>Alamat: {transaction.full_address}</Text>
      <Text style={styles.itemText}>Link Google Maps: {transaction.google_maps_link}</Text>
      <Text style={styles.itemText}>Metode Pembayaran: {transaction.payment_method}</Text>
      <Text style={styles.itemText}>Status:</Text>
      <RNPickerSelect
        onValueChange={(value) => setStatus(value)}
        items={[
          { label: 'Pending', value: 'Pending' },
          { label: 'Diproses', value: 'Diproses' },
          { label: 'Dikirim', value: 'Dikirim' },
          { label: 'Selesai', value: 'Selesai' },
          { label: 'Dibatalkan', value: 'Dibatalkan' },
        ]}
        value={status}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStatus}>
        <Text style={styles.updateButtonText}>Update Status</Text>
      </TouchableOpacity>
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
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionDetailScreen;
