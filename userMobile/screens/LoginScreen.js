import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'All fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.118.23:8000/api/login', {
                email,
                password,
            });
            console.log(response.data);

            if (response.data.access_token) {
                await AsyncStorage.setItem('auth_token', response.data.access_token);
                ToastAndroid.show('Berhasil Login', ToastAndroid.LONG);
                navigation.navigate('Home'); // Navigate to HomeScreen
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
            <Image source={require('../assets/marketplace.png')} style={styles.image} />
            <Text style={styles.title}>Login</Text>
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
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#333',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 16,
    },
    linkText: {
        color: '#007BFF',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});

export default LoginScreen;
