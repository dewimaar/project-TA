import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const MyProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get('http://192.168.195.23:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchProducts = async () => {
    if (!userData) return;
    try {
      const response = await axios.get(`http://192.168.195.23:8000/api/products/${userData.id}`);
      const updatedProducts = response.data.map(product => ({
        ...product,
        images: Array.isArray(product.image) ? product.image : [product.image]
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      if (error.response && error.response.status === 404) {
        setProducts([]); // Handle 404 by setting products to an empty array
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchProducts();
    }
  }, [userData]);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      {item.images.map((image, index) => (
        <Image
          key={index}
          style={styles.productImage}
          source={{ uri: `http://192.168.195.23:8000/storage/${image}` }}
          resizeMode="contain"
        />
      ))}
      <Text style={styles.productName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
      >
        <Icon name="information-circle-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      ListEmptyComponent={<Text>No products found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productInfo: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MyProductsScreen;
