import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { apiUrl } from "../constant/common";

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Kesalahan Validasi', 'Email diperlukan.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}api/forgot-password`, { email });
            Alert.alert('Sukses', response.data.message || 'Periksa email Anda untuk instruksi pengaturan ulang.');
            navigation.goBack();
        } catch (error) {
            console.error('Error response:', error.response);
            Alert.alert('Error', error.response?.data?.message || 'Gagal mengirim instruksi pengaturan ulang.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lupa Kata Sandi?</Text>
            <Text style={styles.subtitle}>Masukkan Email anda untuk reset kata sandi</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Reset Kata Sandi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
                <Text style={styles.linkText}>Kembali</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#DCD9CD',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00796B',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#000000',
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: '#D6E0D7',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
    },
    button: {
        height: 50,
        width: '90%',
        backgroundColor: '#00796B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: '#00796B',
        fontSize: 16,
    },
});

export default ForgotPasswordScreen;
