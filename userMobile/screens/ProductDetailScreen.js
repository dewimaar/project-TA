import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [editingVariation, setEditingVariation] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.154.23:8000/api/products/detail/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          setToken(token);
        } else {
          console.error('No authentication token found');
          Alert.alert('Error', 'No authentication token found');
        }
      } catch (error) {
        console.error('Failed to fetch authentication token:', error);
        Alert.alert('Error', 'Failed to fetch authentication token');
      }
    };

    fetchToken();
  }, []);

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return 'Price not available';
    }
    const numberPrice = Number(price);
    return numberPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (variationId, field, value) => {
    setEditingVariation((prev) => ({
      ...prev,
      [variationId]: {
        ...prev[variationId],
        [field]: value,
      },
    }));
  };

  const updateVariation = async (variationId) => {
    try {
      const { price, stock } = editingVariation[variationId];
      const response = await axios.put(
        `http://192.168.154.23:8000/api/variations/${variationId}`,
        { price: parseFloat(price), stock: parseInt(stock) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data.message);

      setProduct((prev) => {
        const updatedVariations = prev.variations.map((variation) => {
          if (variation.id === variationId) {
            return { ...variation, price, stock };
          }
          return variation;
        });
        return { ...prev, variations: updatedVariations };
      });

      setEditingVariation((prev) => {
        const updatedEditing = { ...prev };
        delete updatedEditing[variationId];
        return updatedEditing;
      });

      Alert.alert('Success', 'Variation updated successfully');
    } catch (error) {
      console.error('Failed to update variation:', error);
      Alert.alert('Error', 'Failed to update variation');
    }
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
        source={{ uri: `http://192.168.154.23:8000/storage/${product.image}` }}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {product.variations.map((variation) => (
        <View key={variation.id} style={styles.variationContainer}>
          <Text style={styles.variationName}>{variation.name}</Text>
          <Text style={styles.variationPrice}>Harga: Rp{formatPrice(variation.price)}</Text>
          <Text style={styles.variationStock}>Stok: {variation.stock}</Text>
          <TextInput
            placeholder="Update Price"
            value={editingVariation[variation.id]?.price || ''}
            onChangeText={(text) => handleInputChange(variation.id, 'price', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Update Stock"
            value={editingVariation[variation.id]?.stock || ''}
            onChangeText={(text) => handleInputChange(variation.id, 'stock', text)}
            style={styles.input}
          />
          <Button title="Update" onPress={() => updateVariation(variation.id)} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default ProductDetailScreen;
