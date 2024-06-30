import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomNavbar from './BottomNavbar';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                console.log('Retrieved Token:', token);

                const response = await axios.get('http://192.168.100.91:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                Alert.alert('Error', 'Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('auth_token');
            navigation.replace('Login');
        } catch (e) {
            console.error('Failed to logout:', e);
        }
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

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.email}>{userData.email}</Text>
                {userData.store ? (
                    <Text style={styles.status}>Status: Penjual</Text>
                ) : (
                    <Text style={styles.status}>Status: Pengguna Biasa</Text>
                )}
            </View>
            {userData.store ? (
                <View style={styles.storeInfo}>
                    <Text style={styles.storeTitle}>Informasi Toko</Text>
                    <Text style={styles.storeDetail}>Nama Toko: {userData.store.name}</Text>
                    <Text style={styles.storeDetail}>Kategori: {userData.store.category}</Text>
                    <Text style={styles.storeDetail}>Alamat: {userData.store.address}</Text>
                    <Text style={styles.storeDetail}>Deskripsi: {userData.store.description}</Text>
                </View>
            ) : (
                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Market')}>
                    <Text style={styles.registerButtonText}>Daftar Toko</Text>
                </TouchableOpacity>
            )}
            <ScrollView style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Nomor Telepon</Text>
                    <Text style={styles.menuDetail}>{userData.noTelp}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Alamat</Text>
                    <Text style={styles.menuDetail}>Jl. Kebon Jeruk No. 27</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Tanggal Lahir</Text>
                    <Text style={styles.menuDetail}>01 Januari 1990</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Jenis Kelamin</Text>
                    <Text style={styles.menuDetail}>Perempuan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Bantuan/Dukungan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Tentang Aplikasi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomNavbar navigation={navigation} selectedNavItem={'profile'} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#013B0A',
        paddingVertical: 30,
        alignItems: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    email: {
        fontSize: 14,
        color: '#fff',
    },
    status: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    storeInfo: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    storeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    storeDetail: {
        fontSize: 16,
        color: 'grey',
    },
    registerButton: {
        backgroundColor: '#013B0A',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    registerButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        marginTop: 5,
        fontSize: 14,
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
    },
    menu: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuText: {
        fontSize: 16,
    },
    menuDetail: {
        fontSize: 16,
        color: 'grey',
    },
});

export default ProfileScreen;
