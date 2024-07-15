import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";
import UploadImages from "../components/UploadImages";
import { Picker } from '@react-native-picker/picker';

const TransactionsPaymentScreen = ({ navigation, route }) => {
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            fullAddress: '',
            googleMapsLink: '',
            paymentMethod: '',
            images: []
        }
    });
    const [userId, setUserId] = useState(null);
    const [banks, setBanks] = useState([]);
    const [store, setStore] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const selectedItems = route.params.selectedItems || [];
    const setResetCartItems = route.params.setResetCartItems || [];
console.log('id',selectedItems);
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                const response = await axios.get('http://192.168.154.23:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data;
                setUserId(userData.id);

                // Set the default values for the form fields
                setValue('fullAddress', userData.address || '');
                setValue('googleMapsLink', userData.google_maps_link || '');
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                Alert.alert('Error', 'Failed to fetch user data.');
            }
        };

        const fetchBankData = async () => {
            try {
                const response = await axios.get('http://192.168.154.23:8000/api/metodeTransaksi');
                setBanks(response.data);
            } catch (error) {
                console.error('Failed to fetch bank data:', error);
                Alert.alert('Error', 'Failed to fetch bank data.');
            }
        };

        fetchUserId();
        fetchBankData();
    }, []);

    const renderBankOptions = () => {
        return banks.map((bank) => (
            <Picker.Item key={bank.id} label={bank.bank_name} value={bank} />
        ));
    };

    const onBankChange = (itemValue) => {
        setSelectedBank(itemValue);
        setValue('paymentMethod', itemValue.bank_name); 
    };

    const confirmCheckout = async (data) => {
        if (!userId) {
            Alert.alert('Error', 'User ID not available.');
            return;
        }
    
        if (!selectedBank) {
            Alert.alert('Error', 'Please select a bank.');
            return;
        }
    
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('full_address', data.fullAddress);
        formData.append('google_maps_link', data.googleMapsLink);
        formData.append('payment_method', selectedBank.bank_name); 
    
        // Append username_pengguna and no_rekening to formData
        formData.append('username_pengguna', selectedBank.username_pengguna);
        formData.append('no_rekening', selectedBank.no_rekening);
    
        selectedItems.forEach((item, index) => {
            formData.append(`items[${index}][variation_id]`, item.variation_id);
            formData.append(`items[${index}][store_id]`, item.store.id);
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
            const response = await axios.post('http://192.168.154.23:8000/api/transactions', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
    
            console.log('Transaction saved:', response.data);
    
            // Delete items from the cart
            const deletePromises = selectedItems.map((item) => {
                return axios.delete(`http://192.168.154.23:8000/api/cart/${item.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(response => {
                    console.log(`Deleted item ${item.id} from cart`);
                }).catch(error => {
                    console.error(`Failed to delete item ${item.id} from cart:`, error);
                });
            });
    
            await Promise.all(deletePromises);
    
            Alert.alert('Success', 'Transaction saved successfully.', [
                {
                    text: 'OK',
                    onPress: () => {
                        setResetCartItems(true); 
                        navigation.navigate('MyOrders');
                    },
                },
            ]);
        } catch (error) {
            console.error('Error saving transaction:', error);
            Alert.alert('Error', 'Failed to save transaction.');
        }
    };
    
    const formatRupiah = (amount) => {
        return 'Rp ' + Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Item yang Dipilih:</Text>
            <FlatList
                data={selectedItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: `http://192.168.154.23:8000/storage/${item.variation_image}` }}
                            resizeMode="contain"
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.variation_name}</Text>
                            <Text style={styles.itemTitle}>{item.store.name}</Text>
                            <Text style={styles.itemQuantity}>Jumlah: {item.quantity}</Text>
                            <Text style={styles.itemPrice}>Harga Satuan: {formatRupiah(item.unit_price)}</Text>
                            <Text style={styles.itemTotalPrice}>Total Harga: {formatRupiah(item.total_price)}</Text>
                        </View>
                    </View>
                )}
            />
            <Text style={styles.label}>Alamat Lengkap:</Text>
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
            <Text style={styles.label}>Tautan Alamat:</Text>
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
            <Text style={styles.label}>Metode Pembayaran:</Text>
            <Picker
                selectedValue={selectedBank}
                onValueChange={(itemValue) => onBankChange(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Pilih Bank" value={null} />
                {renderBankOptions()}
            </Picker>
            {selectedBank && (
                <View>
                    <Text style={styles.label}>Username Pengguna:</Text>
                    <Text style={styles.value}>{selectedBank.username_pengguna}</Text>
                    <Text style={styles.label}>No. Rekening:</Text>
                    <Text style={styles.value}>{selectedBank.no_rekening}</Text>
                </View>
            )}
            <UploadImages
                name="images"
                control={control}
                label="Payment Proof"
                reqText="Required"
                error={watch("images") && watch("images").length === 0}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit(confirmCheckout)}>
                <Text style={styles.confirmButtonText}>Konfirmasi Pembayaran</Text>
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
    value: {
        fontSize: 16,
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
