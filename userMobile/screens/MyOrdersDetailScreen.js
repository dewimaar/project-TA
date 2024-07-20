import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../constant/common";
import RNPickerSelect from 'react-native-picker-select';

const MyOrdersDetailScreen = ({ route }) => {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState('Pesanan Belum Diterima');

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) {
          console.error('No token found in AsyncStorage');
          return;
        }

        const response = await axios.get(`${apiUrl}api/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransaction(response.data);
        setStatus(response.data.shipping_confirm)
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
        `${apiUrl}api/transactions/${transactionId}/shipping-confirm`,
        { shipping_confirm:status },
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

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Detail Transaksi</Text> */}
      <View style={styles.detailContainer}>
        <Image
          style={styles.itemImage}
          source={{ uri: `${apiUrl}storage/${transaction.variation_image}` }}
          resizeMode="contain"
        />
        <View style={styles.row}>
          <Text style={styles.label}>Nama Produk:</Text>
          <Text style={styles.value}>{transaction.variation_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Jumlah:</Text>
          <Text style={styles.value}>{transaction.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Harga Unit:</Text>
          <Text style={styles.value}>Rp{formatPrice(transaction.unit_price)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Harga:</Text>
          <Text style={styles.value}>Rp{formatPrice(transaction.total_price)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{transaction.full_address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Link Google Maps:</Text>
          <Text style={styles.value}>{transaction.google_maps_link}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Metode Pembayaran:</Text>
          <Text style={styles.value}>{transaction.payment_method}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{transaction.status}</Text>
        </View>
        {/* Add other transaction details as needed */}
      </View>
      {transaction.status==="Dikirim"&&
      <>
      <RNPickerSelect
        onValueChange={(value) => setStatus(value)}
        items={[
          { label: 'Pesanan Belum Diterima', value: 'Pesanan Belum Diterima' },
          { label: 'Pesanan Diterima', value: 'Pesanan Diterima' },
        ]}
        value={status}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStatus}>
        <Text style={styles.updateButtonText}>Update Status Pengiriman</Text>
      </TouchableOpacity>
      </>}
    </View>
  );
};

const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(Number(price))) {
    return 'Price not available';
  }
  const numberPrice = Number(price);
  return numberPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  detailContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
  itemImage: {
    width: '100%',
    height: 200,
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

export default MyOrdersDetailScreen;
