import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../constant/common";

const ShippingMethodsScreen = () => {
  const [userData, setUserData] = useState(null);
  const [store, setStore] = useState(null);
  const [shippingName, setShippingName] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [shippingContact, setShippingContact] = useState('');
  const [shippingInfos, setShippingInfos] = useState([]);

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
      fetchShippingInfos();
    }
  }, [store]);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      console.log("Retrieved Token:", token);

      const response = await axios.get(`${apiUrl}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
      Alert.alert("Error", "Gagal mengambil data pengguna.");
    }
  };

  const fetchStore = async () => {
    try {
      const response = await fetch(`${apiUrl}api/stores/${userData.id}`);
      if (response.ok) {
        const data = await response.json();
        setStore(data);
      } else {
        Alert.alert('Error', 'Gagal mengambil data toko');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data toko');
    }
  };

  const fetchShippingInfos = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.get(`${apiUrl}api/shipping-infos/${store.id}/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShippingInfos(response.data);
      } else {
        console.error("Gagal mengambil informasi pengiriman");
      }
    } catch (error) {
      console.error("Gagal mengambil informasi pengiriman:", error);
    }
  };

  const saveShippingInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");

      const response = await axios.post(
        `${apiUrl}api/shipping-infos`,
        {
          user_id: userData.id,
          store_id: store.id,
          shipping_name: shippingName,
          shipping_cost: parseFloat(shippingCost),
          shipping_contact: shippingContact,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Sukses", "Informasi pengiriman berhasil disimpan.");
        // Reset input fields
        setShippingName('');
        setShippingCost('');
        setShippingContact('');
        // Fetch updated shipping info
        fetchShippingInfos();
      } else {
        Alert.alert("Error", "Gagal menyimpan informasi pengiriman.");
      }
    } catch (error) {
      console.error("Gagal menyimpan informasi pengiriman:", error);
      Alert.alert("Error", "Gagal menyimpan informasi pengiriman.");
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(Number(price))) {
      return 'Price not available';
    }
    const numberPrice = Math.round(Number(price));
    return `Rp ${numberPrice.toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metode Pengiriman</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Pengiriman"
        value={shippingName}
        onChangeText={setShippingName}
      />
      <TextInput
        style={styles.input}
        placeholder="Biaya Pengiriman"
        value={shippingCost}
        onChangeText={setShippingCost}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Kontak Pengiriman"
        value={shippingContact}
        onChangeText={setShippingContact}
      />
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={saveShippingInfo}
      >
        <Text style={styles.saveButtonText}>Simpan Informasi Pengiriman</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 20 }]}>Daftar Informasi Pengiriman</Text>
      <FlatList
        data={shippingInfos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nama Pengiriman: {item.shipping_name}</Text>
            <Text>Biaya Pengiriman: {formatPrice(item.shipping_cost)}</Text>
            <Text>Kontak: {item.shipping_contact}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
  },
});

export default ShippingMethodsScreen;
