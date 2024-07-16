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
    const [store, setStore] = useState(null);
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
            const response = await axios.get('http://192.168.154.23:8000/api/user', {
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
                const response = await axios.get(`http://192.168.154.23:8000/api/cart?user_id=${userId}`, {
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
        const fetchStore = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://192.168.154.23:8000/api/stores/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore(data);
                    } else {
                        Alert.alert('Error', 'Failed to fetch store data');
                    }
                } catch (error) {
                    Alert.alert('Error', 'Failed to fetch store data');
                }
            }
        };

        fetchStore();
    }, [userId]);

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
    
        const handleDeleteCartItem = async (itemId) => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                await axios.delete(`http://192.168.154.23:8000/api/cart/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Update cartData by removing the deleted item
                setCartData(prevCartData => prevCartData.filter(item => item.id !== itemId));
                Alert.alert('Success', 'Item deleted successfully');
            } catch (error) {
                console.error('Error deleting item:', error);
                Alert.alert('Error', 'Failed to delete item');
            }
        };
    
        const closeModal = () => {
            setModalVisible(false);
        };
    
        const confirmCheckout = () => {
            setModalVisible(false);
            navigation.navigate('TransactionsPayment', { selectedItems, setResetCartItems });
        };
    
        const formatPrice = (price) => {
            if (price === undefined || price === null || isNaN(Number(price))) {
                return 'Price not available';
            }
            const numberPrice = Number(price);
            return `Rp ${numberPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
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
                                        source={{ uri: `http://192.168.154.23:8000/storage/${item.variation_image}` }}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemTitle}>{item.variation_name}</Text>
                                        <Text style={styles.itemTitle}>{item.store.name}</Text>
                                        <Text style={styles.itemPrice}>{formatPrice(item.total_price)}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeleteCartItem(item.id)} style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
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
                                        source={{ uri: `http://192.168.154.23:8000/storage/${item.variation_image}` }}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.modalItemDetails}>
                                        <Text style={styles.modalItemTitle}>{item.variation_name}</Text>
                                        <Text style={styles.modalItemPrice}>{formatPrice(item.total_price)}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmCheckout}>
                            <Text style={styles.modalConfirmButtonText}>Konfirmasi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                            <Text style={styles.modalCloseButtonText}>Kembali</Text>
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
              paddingBottom: 80,
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
              backgroundColor: '#00796B',
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginBottom: -10,
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
              fontWeight: 'bold',
              marginRight: 15,
          },
          deleteButton: {
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
          },
          deleteButtonText: {
              color: '#dc3545', 
              fontWeight: 'bold',
          },
        });

export default CartScreen;