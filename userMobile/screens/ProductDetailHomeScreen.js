import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProductDetailHomeScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [store, setStore] = useState(null);
  const [userId, setUserId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.23:8000/api/products/detail/${productId}`
        );
        setProduct(response.data);
        setStoreId(response.data.store.id); // Set store ID from product details
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        const response = await axios.get(
          "http://192.168.0.23:8000/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserId(response.data.id); // Assuming the API response includes user id
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };

    fetchUserId();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.23:8000/api/stores/${userId}`
      );
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
    if (userId) {
      fetchStore();
    }
  }, [userId]);

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return "Price not available";
    }
    const numberPrice = Number(price);
    return numberPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://192.168.0.23:8000/api/cart", {
        user_id: userId,
        store_id: storeId,
        variation_id: selectedVariation.id,
        variation_name: selectedVariation.name,
        variation_image: selectedVariation.image,
        quantity: quantity,
        unit_price: selectedVariation.price,
        total_price: selectedVariation.price * quantity,
      });
      console.log("Added to cart:", response.data);
      setModalVisible(false);
      navigation.navigate("Cart"); // Navigate to Cart screen
    } catch (error) {
      console.error("Failed to add to cart:", error);
      Alert.alert("Error", "Failed to add to cart.");
    }
  };

  const handleQuantityChange = (text) => {
    const value = Number(text);
    if (selectedVariation && value > selectedVariation.stock) {
      setQuantity(selectedVariation.stock);
    } else {
      setQuantity(value);
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
        source={{ uri: `http://192.168.0.23:8000/storage/${product.image}` }}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {product.variations.map((variation) => (
        <View key={variation.id} style={styles.variationContainer}>
          <Text style={styles.variationName}>{variation.name}</Text>
          <Text style={styles.variationPrice}>
            Price: Rp{formatPrice(variation.price)}
          </Text>
          <Text style={styles.variationStock}>Stock: {variation.stock}</Text>
          {variation.image && (
            <Image
              style={styles.variationImage}
              source={{
                uri: `http://192.168.0.23:8000/storage/${variation.image}`,
              }}
              resizeMode="contain"
            />
          )}
        </View>
      ))}

      {storeId !== store?.id && (
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Variation and Quantity</Text>

            <Picker
              selectedValue={selectedVariation}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedVariation(product.variations[itemIndex]);
                setQuantity(1); // Reset quantity when variation changes
              }}
            >
              {product.variations.map((variation) => (
                <Picker.Item
                  key={variation.id}
                  label={variation.name}
                  value={variation}
                />
              ))}
            </Picker>

            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
              placeholder="Quantity"
            />

            {selectedVariation && (
              <>
                <Text style={styles.unitPrice}>
                  Unit Price: Rp{formatPrice(selectedVariation.price)}
                </Text>
                <Text style={styles.totalPrice}>
                  Total Price: Rp
                  {formatPrice(selectedVariation.price * quantity)}
                </Text>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  variationContainer: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  variationName: {
    fontSize: 18,
    fontWeight: "bold",
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
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#000",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  unitPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductDetailHomeScreen;
