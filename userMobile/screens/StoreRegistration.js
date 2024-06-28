import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native';

const StoreRegistration = ({ navigation }) => {
    const [storeName, setStoreName] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.118.23:8000/api/stores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: storeName,
                    category: category,
                    address: address,
                    description: description,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                Alert.alert('Success', 'Store registered successfully');
                navigation.navigate('Market');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Pendaftaran Toko</Text>
            <TextInput
                style={styles.input}
                placeholder="Nama Toko"
                value={storeName}
                onChangeText={setStoreName}
            />
            <TextInput
                style={styles.input}
                placeholder="Kategori"
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                style={styles.input}
                placeholder="Alamat Lengkap Toko"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Deskripsi"
                value={description}
                onChangeText={setDescription}
            />
            {/* Tambahkan bidang lain yang diperlukan */}
            <Button title="Daftarkan Toko" onPress={handleRegister} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default StoreRegistration;
