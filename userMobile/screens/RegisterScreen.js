import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiUrl } from "../constant/common";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        let missingFields = [];
        if (!name) missingFields.push('Nama');
        if (!email) missingFields.push('Email');
        if (!noTelp) missingFields.push('NoTelp');
        if (!password) missingFields.push('Kata Sandi');

        if (missingFields.length > 0) {
            Alert.alert('Kesalahan Validasi', `Bidang berikut diperlukan: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}api/register`, {
                name,
                email,
                noTelp,
                password,
            });
            ToastAndroid.show('Pendaftaran Berhasil', ToastAndroid.LONG);
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            ToastAndroid.show('Pendaftaran gagal. Silakan coba lagi.', ToastAndroid.LONG);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daftar</Text>
            <Text style={styles.subtitle}>Masukkan Biodata Anda</Text>
            <TextInput
                style={styles.input}
                placeholder="Nama"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Nomor Telepon"
                value={noTelp}
                onChangeText={setNoTelp}
                keyboardType="phone-pad"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Kata Sandi Min 8 Karakter"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Daftar</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.text}>Sudah punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Masuk</Text>
                </TouchableOpacity>
            </View>
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '90%',
        borderColor: '#D6E0D7',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
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
    linkContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    text: {
        color: '#000000',
        fontSize: 16,
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: '#00796B',
        fontSize: 16,
    },
});

export default RegisterScreen;
