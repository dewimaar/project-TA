import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomNavbar from './BottomNavbar';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            console.log('Retrieved Token:', token);

            const response = await axios.get('http://192.168.195.23:8000/api/user', {
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

    useEffect(() => {
        fetchUserData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserData();
        setRefreshing(false);
    };

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

    const navigateToEditProfile = () => {
        navigation.navigate('EditProfile', { userData });
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
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: userData.profile_photo ? `http://192.168.195.23:8000/storage/${userData.profile_photo}` : 'https://via.placeholder.com/150' }}
                            resizeMode="contain"
                        />
                    </View>
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
                        <Text style={styles.menuDetail}>{userData.address}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Tanggal Lahir</Text>
                        <Text style={styles.menuDetail}>{userData.birthdate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Jenis Kelamin</Text>
                        <Text style={styles.menuDetail}>{userData.gender}</Text>
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
                    <TouchableOpacity style={styles.editProfileButton} onPress={navigateToEditProfile}>
                        <Text style={styles.editProfileButtonText}>Edit Profil</Text>
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
        paddingBottom: 80,
    },
    header: {
        backgroundColor: '#013B0A',
        paddingVertical: 30,
        alignItems: 'center',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
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
    editProfileButton: {
        backgroundColor: '#013B0A',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    editProfileButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        width: '100%',
    },
});

export default ProfileScreen;
