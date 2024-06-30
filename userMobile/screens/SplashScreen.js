import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
    // Automatically navigate to Main Screen after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 3000);

        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/splash_logo.png')} style={styles.image} resizeMode="cover" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D6E0D7',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default SplashScreen;
