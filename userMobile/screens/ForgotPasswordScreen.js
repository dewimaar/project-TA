import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { apiUrl } from "../constant/common";

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Validation Error', 'Email is required.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}api/forgot-password`, { email });
            Alert.alert('Success', response.data.message || 'Check your email for reset instructions.');
            navigation.goBack();
        } catch (error) {
            console.error('Error response:', error.response);
            Alert.alert('Error', error.response?.data?.message || 'Failed to send reset instructions.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Send Reset Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
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

export default ForgotPasswordScreen;
