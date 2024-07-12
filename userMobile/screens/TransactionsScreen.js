import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) {
          console.error('No token found in AsyncStorage');
          return;
        }

        const response = await axios.get('http://192.168.99.23:8000/api/transactions', {
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

    fetchTransactions();
  }, []);

  const handleTransactionMethods = () => {
    navigation.navigate('TransactionMethods');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.itemImage}
        source={{ uri: `http://192.168.99.23:8000/storage/${item.variation_image}` }}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.variation_name}</Text>
        <Text style={styles.itemPrice}>${item.total_price}</Text>
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
      <Text style={styles.title}>Transaksi Saya</Text>
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
    backgroundColor: '#4CAF50',
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
