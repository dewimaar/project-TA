import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log('Register button pressed'); // Log to verify function is called

        let missingFields = [];

        if (!name) missingFields.push('Name');
        if (!email) missingFields.push('Email');
        if (!noTelp) missingFields.push('NoTelp');
        if (!password) missingFields.push('Password');

        if (missingFields.length > 0) {
            Alert.alert('Validation Error', `The following fields are required: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await axios.post('http://192.168.248.23:8000/api/register', {
                name,
                email,
                noTelp,
                password,
            });
            console.log(response.data);
            ToastAndroid.show(
                'Registration Successful',
                ToastAndroid.LONG,
            );
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            ToastAndroid.show(
                'Registration failed. Please try again.',
                ToastAndroid.LONG,
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
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
                placeholder="Phone Number"
                value={noTelp}
                onChangeText={setNoTelp}
                keyboardType="phone-pad" 
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Back to Login</Text>
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
});

export default RegisterScreen;
