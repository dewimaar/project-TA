import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import BottomNavbar from './BottomNavbar';

const CartScreen = ({ navigation }) => {
    const cartData = [
        { id: '1', imageUrl: 'https://via.placeholder.com/150', title: 'Product 1', price: '$50' },
        { id: '2', imageUrl: 'https://via.placeholder.com/150', title: 'Product 2', price: '$80' },
        { id: '3', imageUrl: 'https://via.placeholder.com/150', title: 'Product 3', price: '$120' },
        // Add more items as needed
    ];

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
            <FlatList
                data={cartData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                            <TouchableOpacity style={styles.removeItemButton} onPress={() => console.log('Remove item pressed')}>
                                <Text style={styles.removeItemButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
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
