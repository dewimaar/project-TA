import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        Alert.alert('Error', 'Failed to fetch store data');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch store data');
    }
  };

  const fetchShippingInfos = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.get(`http://192.168.154.23:8000/api/shipping-infos/${store.id}/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShippingInfos(response.data);
      } else {
        console.error("Failed to fetch shipping infos");
      }
    } catch (error) {
      console.error("Failed to fetch shipping infos:", error);
    }
  };

  const saveShippingInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");

      const response = await axios.post(
        "http://192.168.154.23:8000/api/shipping-infos",
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
        Alert.alert("Success", "Shipping information saved successfully.");
        // Refetch shipping infos after successful save
        fetchShippingInfos();
      } else {
        Alert.alert("Error", "Failed to save shipping information.");
      }
    } catch (error) {
      console.error("Failed to save shipping information:", error);
      Alert.alert("Error", "Failed to save shipping information.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metode Pengiriman</Text>
      <TextInput
        style={styles.input}
        placeholder="Shipping Name"
        value={shippingName}
        onChangeText={setShippingName}
      />
      <TextInput
        style={styles.input}
        placeholder="Shipping Cost"
        value={shippingCost}
        onChangeText={setShippingCost}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Shipping Contact"
        value={shippingContact}
        onChangeText={setShippingContact}
      />
      <Button title="Save Shipping Info" onPress={saveShippingInfo} />

      <Text style={[styles.title, { marginTop: 20 }]}>Shipping Information List</Text>
      <FlatList
        data={shippingInfos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Shipping Name: {item.shipping_name}</Text>
            <Text>Shipping Cost: ${item.shipping_cost}</Text>
            <Text>Contact: {item.shipping_contact}</Text>
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
