import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import BottomNavbar from './BottomNavbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import Modal from 'react-native-modal';

const CartScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [resetCartItems, setResetCartItems] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
                    <Text style={styles.headerRightText}>Pesanan Saya</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const fetchUserId = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const response = await axios.get('http://192.168.173.23:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserId(response.data.id);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            Alert.alert('Error', 'Failed to fetch user data.');
        }
    };

    useEffect(() => {
        if (resetCartItems) {
            setSelectedItems([]);
            setResetCartItems(false);
        }
    }, [resetCartItems]);

    const fetchCartData = async () => {
        if (userId) {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                const response = await axios.get(`http://192.168.173.23:8000/api/cart?user_id=${userId}`, {
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

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        fetchCartData();
    }, [userId]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCartData().finally(() => setRefreshing(false));
    };

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

    const toggleCheckbox = (item) => {
        const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedItems = [...selectedItems];
            updatedItems.splice(selectedIndex, 1);
            setSelectedItems(updatedItems);
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            Alert.alert('Alert', 'Pilih produk terlebih dahulu');
        } else {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const confirmCheckout = () => {
        setModalVisible(false);
        navigation.navigate('TransactionsPayment', { selectedItems, setResetCartItems });
    };

    return (
        <View style={styles.container}>
            {cartData.length === 0 ? (
                <Text style={styles.emptyCartText}>Anda belum menambahkan produk</Text>
            ) : (
                <View style={styles.listContainer}>
                    <FlatList
                        data={cartData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <CheckBox
                                    value={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                                    onValueChange={() => toggleCheckbox(item)}
                                    style={styles.checkbox}
                                />
                                <Image
                                    style={styles.itemImage}
                                    source={{ uri: `http://192.168.173.23:8000/storage/${item.variation_image}` }}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemTitle}>{item.variation_name}</Text>
                                    <Text style={styles.itemPrice}>{item.total_price}</Text>
                                </View>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
            <BottomNavbar navigation={navigation} selectedNavItem={'cart'} handleNavItemClick={handleNavItemClick} />

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Selected Products</Text>
                    <ScrollView style={styles.modalScroll}>
                        {selectedItems.map((item) => (
                            <View key={item.id} style={styles.modalItem}>
                                <Image
                                    style={styles.modalItemImage}
                                    source={{ uri: `http://192.168.173.23:8000/storage/${item.variation_image}` }}
                                    resizeMode="contain"
                                />
                                <View style={styles.modalItemDetails}>
                                    <Text style={styles.modalItemTitle}>{item.variation_name}</Text>
                                    <Text style={styles.modalItemPrice}>{item.total_price}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmCheckout}>
                        <Text style={styles.modalConfirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    listContainer: {
        flex: 1,
        paddingBottom: 80, // To ensure FlatList is not covered by the BottomNavbar
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
    checkbox: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginRight: 10,
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
    checkoutButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: -10, // To avoid overlap with BottomNavbar
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalScroll: {
        maxHeight: 300,
    },
    modalItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    modalItemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    modalItemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    modalItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalItemPrice: {
        fontSize: 14,
        color: '#888',
    },
    modalConfirmButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    modalConfirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalCloseButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    modalCloseButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRightText: {
        color: '#007bff',
        fontSize: 16,
        marginRight: 15,
    },
});

export default CartScreen;
