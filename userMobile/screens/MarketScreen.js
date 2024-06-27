// MarketScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomNavbar from './BottomNavbar'; 
import { Ionicons } from '@expo/vector-icons'; 

const MarketScreen = ({ navigation }) => {
    const handleNavItemClick = (itemName) => {
        // Handle navigation logic here, if needed
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
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Market Screen</Text>
                {/* Tambahkan konten Market Screen sesuai kebutuhan */}
                <TouchableOpacity style={styles.itemContainer} onPress={() => console.log('Item pressed')}>
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>Product 1</Text>
                        <Text style={styles.itemPrice}>$50</Text>
                    </View>
                </TouchableOpacity>
                {/* Tambahkan item-item lainnya sesuai kebutuhan */}
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
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
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
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
});

export default MarketScreen;
