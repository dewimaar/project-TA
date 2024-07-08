import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionsPaymentScreen = ({ route, navigation }) => {
    const { selectedItems } = route.params;

    const handlePayment = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const response = await axios.post('http://192.168.195.23:8000/api/transactions', {
                items: selectedItems,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Alert.alert('Success', 'Your payment has been processed.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error processing payment:', error);
            Alert.alert('Error', 'Failed to process payment.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction Payment</Text>
            <FlatList
                data={selectedItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: `http://192.168.195.23:8000/storage/${item.variation_image}` }}
                            resizeMode="contain"
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.variation_name}</Text>
                            <Text style={styles.itemPrice}>{item.total_price}</Text>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                <Text style={styles.paymentButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    item: {
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
    },
    paymentButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TransactionsPaymentScreen;
