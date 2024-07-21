import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { apiUrl } from "../constant/common";

const ResetPasswordScreen = ({ route, navigation }) => {
    const { token } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleResetPassword = async () => {
        if (!email || !password || !passwordConfirmation) {
            Alert.alert('Validation Error', 'All fields are required.');
            return;
        }

        if (password !== passwordConfirmation) {
            Alert.alert('Validation Error', 'Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}api/reset-password`, { 
                token,
                email, 
                password,
                password_confirmation: passwordConfirmation
            });
            Alert.alert('Success', 'Password has been reset.');
            navigation.navigate('LoginScreen'); // Or any other screen
        } catch (error) {
            console.error('Error response:', error.response);
            Alert.alert('Error', error.response?.data?.message || 'Failed to reset password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
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
});

export default ResetPasswordScreen;
