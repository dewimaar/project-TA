import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
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

                const response = await axios.get('http://192.168.118.23:8000/api/user', {
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
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                </View>
                {userData.store && (
                    <View style={styles.storeInfo}>
                        <Text style={styles.storeTitle}>Informasi Toko</Text>
                        <Text style={styles.storeDetail}>Nama Toko: {userData.store.name}</Text>
                        <Text style={styles.storeDetail}>Kategori: {userData.store.category}</Text>
                        <Text style={styles.storeDetail}>Alamat: {userData.store.address}</Text>
                        <Text style={styles.storeDetail}>Deskripsi: {userData.store.description}</Text>
                    </View>
                )}
                <View style={styles.menu}>
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
                    <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
                        <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                    </TouchableOpacity>
                </View>
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
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80, // Added padding to ensure content is not hidden behind the BottomNavbar
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
    logoutButton: {
        backgroundColor: '#990000',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    logoutText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        width: '100%',
    },
});

export default ProfileScreen;
