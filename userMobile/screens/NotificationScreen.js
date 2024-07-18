import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomNavbar from './BottomNavbar';
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
    const [selectedRole, setSelectedRole] = useState('buyer');

    const renderItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
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

    const filteredNotifications = notifications.filter(notification => notification.role === selectedRole);

    return (
        <View style={styles.container}>
            <View style={styles.roleSelector}>
                <TouchableOpacity onPress={() => setSelectedRole('buyer')} style={[styles.roleButton, selectedRole === 'buyer' && styles.selectedRoleButton]}>
                    <Text style={styles.roleButtonText}>User Pembeli</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedRole('seller')} style={[styles.roleButton, selectedRole === 'seller' && styles.selectedRoleButton]}>
                    <Text style={styles.roleButtonText}>Penjual</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredNotifications}
                renderItem={renderItem}
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
