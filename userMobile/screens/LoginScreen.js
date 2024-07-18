import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../constant/common";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'All fields are required.');
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
                ToastAndroid.show('Berhasil Login', ToastAndroid.LONG);
                navigation.navigate('Home');
            } else {
                ToastAndroid.show('Salah username atau password', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Back to Register</Text>
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
        marginBottom: 20,
        color: '#00796B',
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
    error: {
        color: 'red',
        marginBottom: 12,
    },
});

export default LoginScreen;
