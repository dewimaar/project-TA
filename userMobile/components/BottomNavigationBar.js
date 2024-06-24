// components/BottomNavigationBar.js

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavigationBar = ({ navigation, selectedNavItem, handleNavItemClick, activeScreen, setActiveScreen }) => {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={[styles.bottomBarItem, selectedNavItem === 'cart' && styles.selectedNavItem]}
                onPress={() => handleNavItemClick('cart')}
            >
                <Icon name="cart-outline" size={24} color={selectedNavItem === 'cart' ? '#0AD127' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.bottomBarItem, selectedNavItem === 'settings' && styles.selectedNavItem]}
                onPress={() => handleNavItemClick('settings')}
            >
                <Icon name="settings-outline" size={24} color={selectedNavItem === 'settings' ? '#0AD127' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.bottomBarItem, activeScreen === 'Home' && styles.selectedNavItem]}
                onPress={() => {
                    navigation.navigate('Home');
                    setActiveScreen('Home');
                }}
            >
                <Icon name="home-outline" size={24} color={activeScreen === 'Home' ? '#0AD127' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.bottomBarItem, activeScreen === 'Market' && styles.selectedNavItem]}
                onPress={() => {
                    navigation.navigate('Market');
                    setActiveScreen('Market');
                }}
            >
                <Icon name="storefront-outline" size={24} color={activeScreen === 'Market' ? '#0AD127' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.bottomBarItem, activeScreen === 'Profile' && styles.selectedNavItem]}
                onPress={() => {
                    navigation.navigate('Profile');
                    setActiveScreen('Profile');
                }}
            >
                <Icon name="person-outline" size={24} color={activeScreen === 'Profile' ? '#0AD127' : '#333'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingBottom: 20,
    },
    bottomBarItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    selectedNavItem: {
        backgroundColor: '#EDEFF3',
    },
};

export default BottomNavigationBar;
