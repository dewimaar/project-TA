import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';

const TransactionsPaymentScreen = ({ navigation, route }) => {
    const { selectedItems } = route.params;
    const { control, handleSubmit } = useForm(); // Menggunakan useForm dari react-hook-form

    const [fullAddress, setFullAddress] = useState('');
    const [googleMapsLink, setGoogleMapsLink] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePayment = async (formData) => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const response = await axios.post(
                'http://192.168.173.23:8000/api/transactions',
                {
                    user_id: selectedItems[0].user_id,
                    items: selectedItems.map((item) => ({
                        variation_id: item.variation_id,
                        variation_name: item.variation_name,
                        variation_image: item.variation_image,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        total_price: item.total_price,
                    })),
                    full_address: formData.fullAddress,
                    google_maps_link: formData.googleMapsLink,
                    payment_method: formData.paymentMethod,
                    payment_proof: formData.payment_proof, // Tambahkan payment_proof dari UploadImages
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Gunakan application/json untuk content type
                    },
                }
            );

            console.log('Transaction saved:', response.data);
            Alert.alert('Success', 'Transaction saved successfully.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving transaction:', error);
            Alert.alert('Error', 'Failed to save transaction.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction Details</Text>
            {selectedItems.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Image
                        style={styles.itemImage}
                        source={{ uri: `http://192.168.173.23:8000/storage/${item.variation_image}` }}
                        resizeMode="contain"
                    />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.variation_name}</Text>
                        <Text style={styles.itemPrice}>Price: {item.unit_price}</Text>
                        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                        <Text style={styles.itemTotalPrice}>Total Price: {item.total_price}</Text>
                    </View>
                </View>
            ))}
            <Controller
                control={control}
                name="fullAddress"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Full Address"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="googleMapsLink"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Google Maps Link"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="paymentMethod"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Payment Method"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="payment_proof" // Sesuaikan dengan nama field
                defaultValue={[]} // Pastikan default valuenya sesuai dengan kebutuhan
                render={({ field: { onChange, value } }) => (
                    <UploadImages
                        name="payment_proof"
                        control={control}
                        uploadedImages={value}
                        onChange={onChange}
                    />
                )}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit(handlePayment)}>
                <Text style={styles.buttonText}>Submit Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#888',
    },
    itemTotalPrice: {
        fontSize: 16,
        color: '#888',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TransactionsPaymentScreen;
