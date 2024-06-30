import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ProfileScreen from './ProfileScreen';
import BottomNavbar from './BottomNavbar';

const HomeScreen = ({ navigation }) => {
    const [selectedNavItem, setSelectedNavItem] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStore, setSelectedStore] = useState('clothing');

    const handleNavItemClick = (itemName) => {
        setSelectedNavItem(itemName);
        if (itemName === 'profile') {
            navigation.navigate('Profile');
        } else if (itemName === 'home') {
            navigation.navigate('Home');
        } else if (itemName === 'market') {
            navigation.navigate('Market'); 
        }  else if (itemName === 'settings') {
            navigation.navigate('Settings');
        } else if (itemName === 'cart') {
            navigation.navigate('Cart');
        }
    };

    const handleSearchInputChange = (query) => {
        setSearchQuery(query);
        // Handle search logic here if needed
    };

    const carouselData = [
        { id: '1', imageUrl: 'https://via.placeholder.com/300', title: 'Promo 1' },
        { id: '2', imageUrl: 'https://via.placeholder.com/300', title: 'Promo 2' },
        { id: '3', imageUrl: 'https://via.placeholder.com/300', title: 'Promo 3' },
    ];

    const productsData = [
        { id: '1', imageUrl: 'https://via.placeholder.com/150', title: 'Product 1', price: '$50' },
        { id: '2', imageUrl: 'https://via.placeholder.com/150', title: 'Product 2', price: '$80' },
        { id: '3', imageUrl: 'https://via.placeholder.com/150', title: 'Product 3', price: '$120' },
        { id: '4', imageUrl: 'https://via.placeholder.com/150', title: 'Product 4', price: '$90' },
        { id: '5', imageUrl: 'https://via.placeholder.com/150', title: 'Product 5', price: '$60' },
        { id: '6', imageUrl: 'https://via.placeholder.com/150', title: 'Product 6', price: '$100' },
        { id: '7', imageUrl: 'https://via.placeholder.com/150', title: 'Product 6', price: '$100' },
        { id: '8', imageUrl: 'https://via.placeholder.com/150', title: 'Product 6', price: '$100' },
        { id: '9', imageUrl: 'https://via.placeholder.com/150', title: 'Product 6', price: '$100' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Icon name="search-outline" size={24} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={handleSearchInputChange}
                />
                <TouchableOpacity onPress={() => console.log('Notification icon pressed')}>
                    <Icon name="notifications-outline" size={30} color="#333" style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
                {carouselData.map((item) => (
                    <View key={item.id} style={styles.carouselItem}>
                        <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
                        {/* <Text style={styles.carouselText}>{item.title}</Text> */}
                    </View>
                ))}
            </ScrollView>

            <Picker
                selectedValue={selectedStore}
                onValueChange={(itemValue, itemIndex) => setSelectedStore(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Clothing Store" value="clothing" />
                <Picker.Item label="Electronic Store" value="electronics" />
                <Picker.Item label="Hardware Store" value="hardware" />
                <Picker.Item label="Building Materials Store" value="materials" /> 
            </Picker>

            <FlatList
                data={productsData}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productItem} onPress={() => console.log('Product detail pressed')}>
                        <View style={styles.productContainer}>
                            <Image source={{ uri: item.imageUrl }} style={[styles.productImage, styles.productImageBorder]} />
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            <TouchableOpacity style={styles.productButton} onPress={() => console.log('Detail button pressed')}>
                                <Text style={styles.productButtonText}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <BottomNavbar navigation={navigation} selectedNavItem={'home'} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'space-between', 
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
    },
    notificationIcon: {
        marginLeft: 8,
    },
    carouselContainer: {
        height: 280, 
        marginBottom: 16,
        padding: 2,
    },
    carouselItem: {
        width: 390, 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8, 
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    carouselImage: {
        width: 370, 
        height: 170, 
        borderRadius: 8,
    },
    carouselText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    picker: {
        marginBottom: 16,
    },
    productItem: {
        alignItems: 'center',
        margin: 5,
        marginBottom: 0,
    },
    productContainer: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00796B',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 16,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    productButton: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    productButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default HomeScreen;
