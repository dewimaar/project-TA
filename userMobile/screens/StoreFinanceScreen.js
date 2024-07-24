import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, TouchableOpacity, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../constant/common";

const StoreFinanceScreen = () => {
  const [financialData, setFinancialData] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get(`${apiUrl}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const storeResponse = await axios.get(`${apiUrl}api/stores/${response.data.id}`);
      setStoreId(storeResponse.data.id);
    } catch (error) {
      console.error('Failed to fetch user or store data:', error);
    }
  };

  const fetchFinancialData = async (storeId) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get(`${apiUrl}api/bank-transfers/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFinancialData(response.data);
    } catch (error) {
      console.error('Error fetching financial data:', error);
      Alert.alert('Error', 'Error fetching financial data.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchUserData();
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchFinancialData(storeId);
    }
  }, [storeId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Keuangan Toko Saya</Text> */}
      {financialData.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Nama Produk:</Text>
            <Text style={styles.itemValue}>{item.product_name}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Nama Bank:</Text>
            <Text style={styles.itemValue}>{item.bank_name}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Username Bank:</Text>
            <Text style={styles.itemValue}>{item.bank_username}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Nomor Rekening Bank:</Text>
            <Text style={styles.itemValue}>{item.bank_account_number}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Dana Diterima:</Text>
            <Text style={styles.itemValue}>{item.payment_seller}</Text>
          </View>
          <TouchableOpacity onPress={() => handleImageClick(item.payment_image)}>
            <Text style={styles.itemLink}>Lihat Bukti Transaksi</Text>
          </TouchableOpacity>
        </View>
      ))}
      
      {/* Modal for displaying payment image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: `${apiUrl}storage/${selectedImage}` }}
              style={styles.modalImage}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
  },
  itemLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },
  modalImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default StoreFinanceScreen;
