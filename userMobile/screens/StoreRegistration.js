import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const StoreRegistration = ({ navigation }) => {
    const [storeName, setStoreName] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.uri);
        }
    };

    const handleRegister = async () => {
        let formData = new FormData();
        formData.append('name', storeName);
        formData.append('category', category);
        formData.append('address', address);
        formData.append('description', description);

        if (photo) {
            let filename = photo.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            formData.append('photo', {
                uri: photo,
                name: filename,
                type: type,
            });
        }

        try {
            const response = await fetch('http://192.168.215.23:8000/api/stores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('storeId', data.id.toString());
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
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Text style={styles.imagePickerText}>Pilih Foto Toko</Text>
            </TouchableOpacity>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
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
    imagePicker: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        color: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
});

export default StoreRegistration;
