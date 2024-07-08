import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";
import UploadImages from "../components/UploadImages";

const TransactionsPaymentScreen = ({ navigation, route }) => {
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            fullAddress: '',
            googleMapsLink: '',
            paymentMethod: '',
            images: []
        }
    });
    const [userId, setUserId] = useState(null);
    const selectedItems = route.params.selectedItems || [];

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                const response = await axios.get('http://192.168.173.23:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserId(response.data.id);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                Alert.alert('Error', 'Failed to fetch user data.');
            }
        };

        fetchUserId();
    }, []);

    const confirmCheckout = async (data) => {
        if (!userId) {
            Alert.alert('Error', 'User ID not available.');
            return;
        }

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('full_address', data.fullAddress);
        formData.append('google_maps_link', data.googleMapsLink);
        formData.append('payment_method', data.paymentMethod);

        selectedItems.forEach((item, index) => {
            formData.append(`items[${index}][variation_id]`, item.variation_id);
            formData.append(`items[${index}][variation_name]`, item.variation_name);
            formData.append(`items[${index}][variation_image]`, item.variation_image);
            formData.append(`items[${index}][quantity]`, item.quantity);
            formData.append(`items[${index}][unit_price]`, item.unit_price);
            formData.append(`items[${index}][total_price]`, item.total_price);
        });

        data.images.forEach((image, index) => {
            formData.append(`payment_proof[${index}]`, {
                uri: image.uri,
                type: image.type,
                name: image.name,
            });
        });

        try {
            const token = await AsyncStorage.getItem('auth_token');
            const response = await axios.post('http://192.168.173.23:8000/api/transactions', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log('Transaction saved:', response.data);
            navigation.navigate('TransactionsPayment', { selectedItems });
        } catch (error) {
            console.error('Error saving transaction:', error);
            Alert.alert('Error', 'Failed to save transaction.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Full Address:</Text>
            <Controller
                control={control}
                name="fullAddress"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter full address"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Text style={styles.label}>Google Maps Link:</Text>
            <Controller
                control={control}
                name="googleMapsLink"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Google Maps link"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Text style={styles.label}>Payment Method:</Text>
            <Controller
                control={control}
                name="paymentMethod"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter payment method"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Text style={styles.label}>Selected Items:</Text>
            <FlatList
                data={selectedItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: `http://192.168.173.23:8000/storage/${item.variation_image}` }}
                            resizeMode="contain"
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.variation_name}</Text>
                            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                            <Text style={styles.itemPrice}>Unit Price: {item.unit_price}</Text>
                            <Text style={styles.itemTotalPrice}>Total Price: {item.total_price}</Text>
                        </View>
                    </View>
                )}
            />
            <UploadImages
                name="images"
                control={control}
                label="Payment Proof"
                reqText="Required"
                error={watch("images") && watch("images").length === 0}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit(confirmCheckout)}>
                <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
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
    itemQuantity: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
    },
    itemTotalPrice: {
        fontSize: 16,
        color: '#888',
    },
    confirmButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TransactionsPaymentScreen;

