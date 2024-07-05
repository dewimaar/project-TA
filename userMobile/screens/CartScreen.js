import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import BottomNavbar from './BottomNavbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(null);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                const response = await axios.get('http://192.168.195.23:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserId(response.data.id); // Assuming the API response includes user id
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                Alert.alert('Error', 'Failed to fetch user data.');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            if (userId) {
                try {
                    const token = await AsyncStorage.getItem('auth_token');
                    const response = await axios.get(`http://192.168.195.23:8000/api/cart?user_id=${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCartData(response.data);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                    Alert.alert('Error', 'Error fetching cart data.');
                }
            }
        };

        fetchCartData();
    }, [userId]);

    const handleNavItemClick = (itemName) => {
        if (itemName === 'home') {
            navigation.navigate('Home');
        } else if (itemName === 'profile') {
            navigation.navigate('Profile');
        } else if (itemName === 'market') {
            navigation.navigate('Market');
        } else if (itemName === 'settings') {
            navigation.navigate('Settings');
        } else if (itemName === 'cart') {
            navigation.navigate('Cart');
        }
    };

    return (
        <View style={styles.container}>
            {cartData.length === 0 ? (
                <Text style={styles.emptyCartText}>Anda belum menambahkan produk</Text>
            ) : (
                <FlatList
                    data={cartData}
                    keyExtractor={(item) => item.id.toString()} // Assuming item.id is unique
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image
                                style={styles.itemImage}
                                source={{ uri: `http://192.168.195.23:8000/storage/${item.variation_image}` }}
                                resizeMode="contain"
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.variation_name}</Text>
                                <Text style={styles.itemPrice}>{item.total_price}</Text>
                                <TouchableOpacity style={styles.removeItemButton} onPress={() => console.log('Remove item pressed')}>
                                    <Text style={styles.removeItemButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
            <BottomNavbar navigation={navigation} selectedNavItem={'cart'} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    cartItem: {
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
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    removeItemButton: {
        backgroundColor: '#ff4444',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeItemButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default CartScreen;
