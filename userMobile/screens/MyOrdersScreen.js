import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrdersScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const response = await axios.get('http://192.168.173.23:8000/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            Alert.alert('Error', 'Error fetching orders.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <View style={styles.container}>
            {orders.length === 0 ? (
                <Text style={styles.emptyOrdersText}>Anda belum memiliki pesanan</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Image
                                style={styles.orderImage}
                                source={{ uri: `http://192.168.173.23:8000/storage/${item.variation_image}` }}
                                resizeMode="contain"
                            />
                            <View style={styles.orderDetails}>
                                <Text style={styles.orderTitle}>{item.variation_name}</Text>
                                <Text style={styles.orderPrice}>{item.total_price}</Text>
                                <Text style={styles.orderStatus}>{item.status}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    emptyOrdersText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    orderItem: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    orderImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    orderDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderPrice: {
        fontSize: 16,
        color: '#888',
    },
    orderStatus: {
        fontSize: 14,
        color: '#28a745',
        marginTop: 5,
    },
});

export default MyOrdersScreen;
