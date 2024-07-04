import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.195.23:8000/api/products/detail/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return 'Price not available';
    }
    const numberPrice = Number(price);
    return 'Rp ' + numberPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').replace('.00', '.00');
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.productImage}
        source={{ uri: `http://192.168.195.23:8000/storage/${product.image}` }}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {product.variations.map((variation) => (
        <View key={variation.id} style={styles.variationContainer}>
          <Text style={styles.variationName}>{variation.name}</Text>
          <Text style={styles.variationPrice}>Price: {formatPrice(variation.price)}</Text>
          <Text style={styles.variationStock}>Stock: {variation.stock}</Text>
          {variation.image && (
            <Image
              style={styles.variationImage}
              source={{ uri: `http://192.168.195.23:8000/storage/${variation.image}` }}
              resizeMode="contain"
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  variationContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  variationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  variationPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  variationStock: {
    fontSize: 16,
    marginBottom: 10,
  },
  variationImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});

export default ProductDetailScreen;
