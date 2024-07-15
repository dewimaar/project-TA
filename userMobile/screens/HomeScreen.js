import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, RefreshControl, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import ProfileScreen from './ProfileScreen';
import BottomNavbar from './BottomNavbar';
import place1 from '../assets/place1.jpg';
import place2 from '../assets/place2.jpg';
import place3 from '../assets/place3.jpg';

const HomeScreen = ({ navigation }) => {
    const [selectedNavItem, setSelectedNavItem] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStore, setSelectedStore] = useState('clothing');
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isRefetching, setIsRefetching] = useState(false);

    const handleNavItemClick = (itemName) => {
        setSelectedNavItem(itemName);
        navigation.navigate(itemName.charAt(0).toUpperCase() + itemName.slice(1));
    };
    
    const handleSearchInputChange = (query) => {
        setSearchQuery(query);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, products]);

    const carouselData = [
        { id: '1', imageUrl: place1, title: 'Promo 1' },
        { id: '2', imageUrl: place2, title: 'Promo 2' },
        { id: '3', imageUrl: place3, title: 'Promo 3' },
    ];

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const response = await axios.get('http://192.168.154.23:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            if (userData) {
                const token = await AsyncStorage.getItem('auth_token');
                const response = await axios.get(`http://192.168.154.23:8000/api/product/${userData.id}`);
                const updatedProducts = response.data.map(product => {
                    const price = product.variations && product.variations.length > 0 
                        ? product.variations[0].price 
                        : 'N/A';
                    return {
                        ...product,
                        price,
                        images: Array.isArray(product.image) ? product.image : [product.image]
                    };
                });
                setProducts(updatedProducts);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const formatPrice = (price) => {
        if (price === undefined || price === null || isNaN(Number(price))) {
            return 'Price not available';
        }
        const numberPrice = Number(price);
        return numberPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handlerRefetchData = useCallback(async () => {
        setIsRefetching(true);
        try {
            await fetchUserData();
            await fetchProducts();
            setIsRefetching(false);
        } catch (error) {
            setIsRefetching(false);
        }
    }, [isRefetching, fetchProducts, fetchUserData]);

    const RefreshControlComponent = useMemo(() => {
        return (
            <RefreshControl
                refreshing={isRefetching}
                onRefresh={handlerRefetchData}
            />
        );
    }, [isRefetching, handlerRefetchData]);

    const addNewProduct = (newProduct) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
    };

    useEffect(
        React.useCallback(() => {
            const Refresh = navigation.addListener("focus", () => {
                fetchUserData();
                fetchProducts();
            });
            return Refresh;
        }, [navigation])
    );

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            fetchProducts();
        }
    }, [userData]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetailHome', { productId: item.id })}>
            <View style={styles.productContainer}>
                <Image source={{ uri: `http://192.168.154.23:8000/storage/${item.image}` }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productPrice}>Rp{formatPrice(item.price)}</Text>
                <Text style={styles.storeName}>{item.store.name}</Text>
                <TouchableOpacity style={styles.productButton} onPress={() => navigation.navigate('ProductDetailHome', { productId: item.id })}>
                    <Text style={styles.productButtonText}>Detail</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.searchBox}>
                    <Icon name="search-outline" size={24} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari..."
                        placeholderTextColor="#888"
                        value={searchQuery}
                        onChangeText={handleSearchInputChange}
                    />
                </View>
                <TouchableOpacity onPress={() => console.log('Notification icon pressed')}>
                    <Icon name="notifications-outline" size={30} color="#333" style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
                {carouselData.map((item) => (
                    <View key={item.id} style={styles.carouselItem}>
                        <Image source={item.imageUrl} style={styles.carouselImage} />
                    </View>
                ))}
            </ScrollView>

            <Picker
                selectedValue={selectedStore}
                onValueChange={(itemValue, itemIndex) => setSelectedStore(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Toko Pakaian" value="clothing" />
                <Picker.Item label="Toko Elektronik" value="electronics" />
                <Picker.Item label="Toko Roti" value="bakery" />
                <Picker.Item label="Toko Bangunan" value="materials" /> 
            </Picker>

            <FlatList
                data={filteredProducts}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No products found</Text>}
                contentContainerStyle={styles.productsList}
                refreshControl={RefreshControlComponent}
            />

            <BottomNavbar navigation={navigation} selectedNavItem={"home"} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    notificationIcon: {
        marginLeft: 8,
    },
    carouselContainer: {
        height: 280,
        marginBottom: 16,
    },
    carouselItem: {
        width: 370, 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    carouselImage: {
        width: 350,
        height: 170,
        borderRadius: 8,
    },
    picker: {
        marginBottom: 16,
        marginHorizontal: 8,
    },
    productsList: {
        paddingHorizontal: 8,
        paddingBottom: 80,
    },
    productItem: {
        flex: 1,
        margin: 4,
    },
    productContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        backgroundColor: '#fff',
        minHeight: 300,
        width: '100%',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
        textAlign: 'center',
    },
    storeName: { // Added this style
        fontSize: 16,
        color: '#00796B', // Set the desired color here
        marginBottom: 4,
        textAlign: 'center',
    },
    productButton: {
        backgroundColor: '#00796B',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginTop: 'auto',
    },
    productButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default HomeScreen;
