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

        const response = await axios.get(`http://192.168.154.23:8000/api/transactions/${transactionId}`, {
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
      <View style={styles.detailContainer}>
        <Image
          style={styles.itemImage}
          source={{ uri: `http://192.168.154.23:8000/storage/${transaction.variation_image}` }}
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
});

export default MyOrdersDetailScreen;
