import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../constant/common";

const TransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [store, setStore] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get(`${apiUrl}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        console.error('No token found in AsyncStorage');
        return;
      }

      const response = await axios.get(`${apiUrl}api/transaction/${store.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - logging out user');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', 'Error fetching transactions.');
      }
    }
  };

  const fetchStore = async () => {
    try {
      const response = await fetch(`${apiUrl}api/stores/${userData.id}`);
      if (response.ok) {
        const data = await response.json();
        setStore(data);
      } else {
        // Alert.alert('Error', 'Failed to fetch store data');
      }
    } catch (error) {
      // Alert.alert('Error', 'Failed to fetch store data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchStore();
    }
  }, [userData]);

  useEffect(() => {
    if (store) {
      fetchTransactions();
    }
  }, [store]);

  const handleTransactionMethods = () => {
    navigation.navigate('TransactionMethods');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.itemImage}
        source={{ uri: `${apiUrl}storage/${item.variation_image}` }}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.variation_name}</Text>
        <Text style={styles.itemPrice}>{formatCurrency(item.total_price)}</Text>
        <Text style={styles.itemStatus}>Status: {item.status}</Text>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
        >
          <Text style={styles.detailButtonText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Transaksi Toko Saya</Text> */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
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
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemStatus: {
    fontSize: 12,
    color: '#555',
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
  button: {
    backgroundColor: '#00796B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TransactionsScreen;
