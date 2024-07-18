import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid, Image } from 'react-native';
import axios from 'axios';
import {apiUrl} from "../constant/common";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
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
            const response = await axios.post(`${apiUrl}api/register`, {
                name,
                email,
                noTelp,
                password,
            });
            ToastAndroid.show('Registration Successful', ToastAndroid.LONG);
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            ToastAndroid.show('Registration failed. Please try again.', ToastAndroid.LONG);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
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
});

export default RegisterScreen;
