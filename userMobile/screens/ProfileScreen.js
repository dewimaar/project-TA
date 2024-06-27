// ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavbar from './BottomNavbar';

const ProfileScreen = ({ navigation }) => {

    const handleLogout = async () => {
        try {
            // Lakukan proses logout di sini, misalnya dengan menghapus token dari AsyncStorage
            await AsyncStorage.removeItem('auth_token'); 

            // Navigasi kembali ke layar login
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                <Text style={styles.name}>Ardiani Dewi</Text>
                <Text style={styles.email}>ardianidewi@gmail.com</Text>
            </View>
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.tab}>
                    <MaterialIcons name="list" size={24} color="black" />
                    <Text style={styles.tabText}>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <MaterialIcons name="favorite" size={24} color="black" />
                    <Text style={styles.tabText}>Wishlist</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <MaterialIcons name="notifications" size={24} color="black" />
                    <Text style={styles.tabText}>Notifications</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>5</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Nomor Telepon</Text>
                    <Text style={styles.menuDetail}>+62 812-3456-7890</Text>
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