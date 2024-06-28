import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import BottomNavbar from './BottomNavbar'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const MarketScreen = ({ navigation }) => {
    const [store, setStore] = useState(null);

    useEffect(() => {
        const fetchStore = async () => {
            const storeId = await AsyncStorage.getItem('storeId');
            if (storeId) {
                try {
                    const response = await fetch(`http://192.168.118.23:8000/api/stores/${storeId}`);
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
    }, []);

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

    const handleRegisterStore = () => {
        navigation.navigate('StoreRegistration');
    };

    const handleAddProduct = () => {
        navigation.navigate('AddProduct');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Market Screen</Text>
                {store ? (
                    <View style={styles.storeContainer}>
                        <Text style={styles.storeTitle}>Nama Toko: {store.name}</Text>
                        <Text style={styles.storeCategory}>Kategori: {store.category}</Text>
                        <Text style={styles.storeAddress}>Alamat: {store.address}</Text>
                        <Text style={styles.storeDescription}>Deskripsi: {store.description}</Text>
                        <Button title="Tambah Produk" onPress={handleAddProduct} />
                    </View>
                ) : (
                    <>
                        <Text style={styles.noStoreText}>Anda belum memiliki toko</Text>
                        <Button title="Daftarkan Sekarang" onPress={handleRegisterStore} />
                    </>
                )}
            </ScrollView>
            <BottomNavbar navigation={navigation} selectedNavItem={'market'} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    noStoreText: {
        fontSize: 18,
        marginBottom: 10,
    },
    storeContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 20,
        width: '100%',
    },
    storeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
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
        color: '#888',
    },
});

export default MarketScreen;
