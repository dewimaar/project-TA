import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomNavbar from './BottomNavbar';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            console.log('Retrieved Token:', token);

            const response = await axios.get('http://192.168.92.23:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            Alert.alert('Error', 'Failed to fetch user data.');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserData();
        setRefreshing(false);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('auth_token');
            navigation.replace('Login');
        } catch (e) {
            console.error('Failed to logout:', e);
        }
    };

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

    const navigateToEditProfile = () => {
        navigation.navigate('EditProfile', { userData });
    };

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: userData.profile_photo ? `http://192.168.92.23:8000/storage/${userData.profile_photo}` : 'https://via.placeholder.com/150' }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                </View>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                        <Icon name="call-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Nomor Telepon</Text>
                        <Text style={styles.menuDetail}>{userData.noTelp}</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                        <Icon name="location-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Alamat</Text>
                        <Text style={styles.menuDetail}>{userData.address}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                        <Icon name="location-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Link Alamat</Text>
                        <Text style={styles.menuDetail}>{userData.google_maps_link}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                        <Icon name="calendar-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Tanggal Lahir</Text>
                        <Text style={styles.menuDetail}>{userData.birthdate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                        <Icon name="female-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Jenis Kelamin</Text>
                        <Text style={styles.menuDetail}>{userData.gender}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.menuItem} 
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('HelpSupport')}
                    >
                        <Icon name="help-circle-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Bantuan/Dukungan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.menuItem} 
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('AboutApp')}
                    >
                        <Icon name="information-circle-outline" size={20} color="#00796B" style={styles.menuIcon} />
                        <Text style={styles.menuText}>Tentang Aplikasi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editProfileButton} onPress={navigateToEditProfile}>
                        <Icon name="create-outline" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Edit Profil</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.editProfileButton, styles.logoutButton]} onPress={handleLogout}>
                    <Icon name="log-out-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomNavbar navigation={navigation} selectedNavItem={'profile'} handleNavItemClick={handleNavItemClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    header: {
        backgroundColor: 'transparent',  
        paddingVertical: 30,
        alignItems: 'center',
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10,
    },
    email: {
        fontSize: 14,
        color: '#000000',
    },
    storeInfo: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    storeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    storeDetail: {
        fontSize: 16,
        color: 'grey',
    },
    menu: {
        marginTop: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuIcon: {
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
        flex: 1,
    },
    menuDetail: {
        fontSize: 16,
        color: 'grey',
        flex: 1,
        textAlign: 'right',
    },
    editProfileButton: {
    backgroundColor: '#013B0A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
},
buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10, 
},
logoutButton: {
    backgroundColor: '#990000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
},
});

export default ProfileScreen;
