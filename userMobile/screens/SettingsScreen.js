import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import BottomNavbar from './BottomNavbar';
import { Ionicons } from '@expo/vector-icons'; 

const SettingsScreen = ({ navigation }) => {
    const [isEmailOrderStatusEnabled, setEmailOrderStatusEnabled] = useState(false);
    const [isEmailPromotionEnabled, setEmailPromotionEnabled] = useState(false);
    const [isEmailSurveyEnabled, setEmailSurveyEnabled] = useState(false);
    const [isWhatsAppOrderStatusEnabled, setWhatsAppOrderStatusEnabled] = useState(false);
    const [isWhatsAppPromotionEnabled, setWhatsAppPromotionEnabled] = useState(false);

    const handleNavItemClick = (itemName) => {
        if (itemName === 'home') {
            navigation.navigate('Home');
        } else if (itemName === 'profile') {
            navigation.navigate('Profile');
        } else if (itemName === 'market') {
            navigation.navigate('Market');
        } else if (itemName === 'settings') {
            navigation.navigate('Settings');
        } else if (itemName === 'cart') {
            navigation.navigate('Cart');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.sectionTitle}>Notifikasi Email</Text>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Status Pesanan</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEmailOrderStatusEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setEmailOrderStatusEnabled(previousState => !previousState)}
                        value={isEmailOrderStatusEnabled}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Promosi</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEmailPromotionEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setEmailPromotionEnabled(previousState => !previousState)}
                        value={isEmailPromotionEnabled}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Survei Pembeli</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEmailSurveyEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setEmailSurveyEnabled(previousState => !previousState)}
                        value={isEmailSurveyEnabled}
                    />
                </View>

                <Text style={styles.sectionTitle}>Notifikasi WhatsApp</Text>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Pesanan</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isWhatsAppOrderStatusEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setWhatsAppOrderStatusEnabled(previousState => !previousState)}
                        value={isWhatsAppOrderStatusEnabled}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Promosi</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isWhatsAppPromotionEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setWhatsAppPromotionEnabled(previousState => !previousState)}
                        value={isWhatsAppPromotionEnabled}
                    />
                </View>
            </ScrollView>
            <BottomNavbar navigation={navigation} selectedNavItem={'settings'} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    settingText: {
        fontSize: 18,
    },
});

export default SettingsScreen;
