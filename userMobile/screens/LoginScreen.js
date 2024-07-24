import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiUrl } from "../constant/common";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Kesalahan Validasi', 'Semua bidang diperlukan.');
            return;
        }
        console.log(apiUrl)
        try {
            const response = await axios.post(`${apiUrl}api/login`, {
                email,
                password,
            });
            console.log(response.data);

            if (response.data.access_token) {
                await AsyncStorage.setItem('auth_token', response.data.access_token);
                ToastAndroid.show('Berhasil Masuk', ToastAndroid.LONG);
                navigation.navigate('Home');
            } else {
                ToastAndroid.show('Salah username atau kata sandi', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error(error);
            setError('Login gagal. Silakan periksa kredensial Anda.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Masuk</Text>
            <Text style={styles.subtitle}>Silakan Masuk Dengan Akun Anda</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.linkText}>Lupa kata sandi?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.text}>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Daftar</Text>
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
        marginBottom: 20,
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
    error: {
        color: 'red',
        marginBottom: 12,
    },
    footer: {
        marginBottom: 20,
        alignItems: 'flex-end',
        width: '90%',
    },
    linkText: {
        color: '#00796B',
        fontSize: 16,
    },
});

export default LoginScreen;
