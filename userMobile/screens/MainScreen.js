import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/mainlog.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
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
    logo: {
        width: 400,
        height: 400,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#00796B',
    },
    button: {
        height: 50,
        width: '90%',
        backgroundColor: '#00796B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MainScreen;
