import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrdersScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) {
          console.error('No auth token found');
          return;
        }

        const response = await axios.get('http://192.168.92.23:8000/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        Alert.alert('Error', 'Error fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MyOrdersDetail', { transactionId: item.id })}
    >
      <Image
        style={styles.modalItemImage}
        source={{ uri: `http://192.168.92.23:8000/storage/${item.variation_image}` }}
        resizeMode="contain"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.variation_name}</Text>
        <Text>Jumlah: {item.quantity}</Text>
        <Text style={styles.cardPrice}>Harga Total: Rp{formatPrice(item.total_price)}</Text>
        <Text>Status: {item.status}</Text>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  modalItemImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  detailButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  detailButtonText: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default MyOrdersScreen;
