import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable, Alert } from 'react-native';
import BottomNavbar from './BottomNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../constant/common";
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const notifications = [
    { id: '1', role: 'buyer', title: 'Pesanan Tertunda', description: 'Pesanan Anda #1234 sedang tertunda.' },
    { id: '2', role: 'buyer', title: 'Pesanan Diproses', description: 'Pesanan Anda #1234 sedang diproses.' },
    { id: '3', role: 'buyer', title: 'Pesanan Dikirim', description: 'Pesanan Anda #1234 telah dikirim.' },
    { id: '4', role: 'buyer', title: 'Pesanan Diterima', description: 'Pesanan Anda #1234 telah diterima.' },
    { id: '5', role: 'buyer', title: 'Pesanan Selesai', description: 'Pesanan Anda #1234 telah selesai.' },
    { id: '6', role: 'buyer', title: 'Pesanan Dibatalkan', description: 'Pesanan Anda #1234 telah dibatalkan.' },
    { id: '7', role: 'seller', title: 'Pesanan Tertunda', description: 'Pesanan #1234 dari pembeli sedang tertunda.' },
    { id: '8', role: 'seller', title: 'Pesanan Diproses', description: 'Pesanan #1234 dari pembeli sedang diproses.' },
    { id: '9', role: 'seller', title: 'Pesanan Dikirim', description: 'Pesanan #1234 dari pembeli telah dikirim.' },
    { id: '10', role: 'seller', title: 'Pesanan Diterima', description: 'Pesanan #1234 dari pembeli telah diterima.' },
    { id: '11', role: 'seller', title: 'Pesanan Selesai', description: 'Pesanan #1234 dari pembeli telah selesai.' },
    { id: '12', role: 'seller', title: 'Pesanan Dibatalkan', description: 'Pesanan #1234 dari pembeli telah dibatalkan.' },
];

const NotificationScreen = ({ navigation }) => {
    // const [selectedRole, setSelectedRole] = useState('buyer');
  const [products, setProducts] = useState([]);
    

  const fetchProducts = async () => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        const response = await axios.get(`${apiUrl}api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      if (error.response && error.response.status === 404) {
        setProducts([]); 
      }
    }
  };

  const handleDeleteCartItem = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      await axios.delete(`${apiUrl}api/notifications/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      Alert.alert("Success", "Item deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item");
    }
  };

  useEffect(() => {
      fetchProducts();
  }, []);

  useEffect(() => {     
    if (products) {
        console.log(products); 
    } 
  }, [products]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => item.transaction_id? item.customer === 1 ?navigation.navigate('MyOrdersDetail', { transactionId: item.transaction_id }):navigation.navigate('TransactionDetail', { transactionId: item.transaction_id }):navigation.navigate('ProductDetail', { productId: item.variation.product_id })} style={styles.notificationItem}>
            <Text style={styles.title}>{item.pesan}</Text>
            <Text style={styles.description}>{item.sub_pesan}</Text>
            <Pressable onPress={()=>handleDeleteCartItem(item.id)}>
            <Text style={{color:'red'}}>Hapus</Text>
            </Pressable>
        </TouchableOpacity>
    );

    const handleNavItemClick = (itemName) => {
        if (itemName === 'home') {
            navigation.navigate('Home');
        } else if (itemName === 'profile') {
            navigation.navigate('Profile');
        } else if (itemName === 'market') {
            navigation.navigate('Market');
        } else if (itemName === 'notification') {
            navigation.navigate('Notification');
        } else if (itemName === 'cart') {
            navigation.navigate('Cart');
        }
    };

    // const filteredNotifications = notifications.filter(notification => notification.role === selectedRole);

    return (
        <View style={styles.container}>
            {/* <View style={styles.roleSelector}>
                <TouchableOpacity onPress={() => setSelectedRole('buyer')} style={[styles.roleButton, selectedRole === 'buyer' && styles.selectedRoleButton]}>
                    <Text style={styles.roleButtonText}>User Pembeli</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedRole('seller')} style={[styles.roleButton, selectedRole === 'seller' && styles.selectedRoleButton]}>
                    <Text style={styles.roleButtonText}>Penjual</Text>
                </TouchableOpacity>
            </View> */}
            <FlatList
                data={products}
                renderItem={renderItem}
                component
                keyExtractor={item => item.id}
            />
            <BottomNavbar
                navigation={navigation}
                selectedNavItem={"notification"}
                handleNavItemClick={handleNavItemClick}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom:100,
    },
    roleSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    roleButton: {
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedRoleButton: {
        backgroundColor: '#ccc',
        borderColor: '#00796B',
    },
    roleButtonText: {
        color: '#00796B',
    },
    notificationItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default NotificationScreen;
