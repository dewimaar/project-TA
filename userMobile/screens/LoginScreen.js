import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid  } from 'react-native';
import axios from 'axios';

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
            const response = await axios.post('http://192.168.215.23:8000/api/login', {
                email,
                password,
            });
            console.log(response.data);
           if (response.data.token) {
ToastAndroid.show(
              'Salah username atau password',
              ToastAndroid.LONG,
            )
} else {
ToastAndroid.show(
              'Berhasil Login',
              ToastAndroid.LONG,
            )}
            navigation.navigate('Home'); // Navigate to HomeScreen
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <View style={styles.container}>
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