import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get('http://192.168.118.23:8000/api/user', {
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
      const response = await axios.get(`http://192.168.118.23:8000/api/products/${userData.id}`);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.length > 0 ? (
        products.map(product => (
          <View key={product.id} style={styles.productContainer}>
            {product.images.map((image, index) => (
              <Image
                key={index}
                style={styles.productImage}
                source={{ uri: `http://192.168.118.23:8000/storage/${image}` }}
                resizeMode="contain"
              />
            ))}
            <Text style={styles.productName}>{product.name}</Text>
            <Button
              title="Detail"
              onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
            />
          </View>
        ))
      ) : (
        <Text>No products found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  productContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default MyProductsScreen;
