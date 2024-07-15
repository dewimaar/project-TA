import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BottomNavbar from "./BottomNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const MarketScreen = ({ navigation }) => {
  const [store, setStore] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      console.log("Retrieved Token:", token);

      const response = await axios.get("http://192.168.154.23:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      Alert.alert("Error", "Failed to fetch user data.");
    }
  };

  const fetchStore = async () => {
    try {
      const response = await fetch(`http://192.168.154.23:8000/api/stores/${userData.id}`);
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
    if (userData) {
      fetchStore();
    }
  }, [userData]);

  useEffect(() => {
    const Refresh = navigation.addListener("focus", () => {
      fetchUserData();
    });
    return Refresh;
  }, [navigation]);

  const handleNavItemClick = (itemName) => {
    if (itemName === "home") {
      navigation.navigate("Home");
    } else if (itemName === "profile") {
      navigation.navigate("Profile");
    } else if (itemName === "market") {
      navigation.navigate("Market");
    } else if (itemName === "settings") {
      navigation.navigate("Settings");
    } else if (itemName === "cart") {
      navigation.navigate("Cart");
    }
  };

  const handleRegisterStore = () => {
    navigation.navigate("StoreRegistration");
  };

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const handleMyProducts = () => {
    navigation.navigate("MyProducts");
  };

  const handleTransactions = () => {
    navigation.navigate("Transactions");
  };

  const handleStoreFinance = () => {
    navigation.navigate("StoreFinance");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Toko Saya</Text>
        {store ? (
          <View style={styles.storeContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `http://192.168.154.23:8000/storage/${store.image}`,
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.storeTitle}>Nama Toko: {store.name}</Text>
            <Text style={styles.storeCategory}>Kategori: {store.category}</Text>
            <Text style={styles.storeAddress}>Alamat: {store.address}</Text>
            <Text style={styles.storeDescription}>Deskripsi: {store.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <Icon name="add-circle-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Tambah Produk</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleMyProducts}>
                <Icon name="albums-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Produk Saya</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleTransactions}>
                <Icon name="cash-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Transaksi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleStoreFinance}>
                <Icon name="wallet-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Keuangan Toko Saya</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.noStoreText}>Anda belum memiliki toko?</Text>
            <TouchableOpacity style={styles.button} onPress={handleRegisterStore}>
              <Icon name="create-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Daftarkan Sekarang</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <BottomNavbar
        navigation={navigation}
        selectedNavItem={"market"}
        handleNavItemClick={handleNavItemClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  noStoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  storeContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 180,
    borderRadius: 4,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  storeCategory: {
    fontSize: 18,
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
  storeDescription: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default MarketScreen;
