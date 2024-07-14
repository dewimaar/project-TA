import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavbar = ({ navigation, selectedNavItem, handleNavItemClick }) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('home')}
      >
        <Icon name="home-outline" size={20} color={selectedNavItem === 'home' ? '#098C1C' : '#333'} />
        <Text style={[styles.bottomBarText, { color: selectedNavItem === 'home' ? '#098C1C' : '#333' }]}>Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('cart')}
      >
        <Icon name="cart-outline" size={20} color={selectedNavItem === 'cart' ? '#098C1C' : '#333'} />
        <Text style={[styles.bottomBarText, { color: selectedNavItem === 'cart' ? '#098C1C' : '#333' }]}>Keranjang</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('market')}
      >
        <Icon name="storefront-outline" size={20} color={selectedNavItem === 'market' ? '#098C1C' : '#333'} />
        <Text style={[styles.bottomBarText, { color: selectedNavItem === 'market' ? '#098C1C' : '#333' }]}>Toko</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('settings')}
      >
        <Icon name="settings-outline" size={20} color={selectedNavItem === 'settings' ? '#098C1C' : '#333'} />
        <Text style={[styles.bottomBarText, { color: selectedNavItem === 'settings' ? '#098C1C' : '#333' }]}>Pengaturan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('profile')}
      >
        <Icon name="person-outline" size={20} color={selectedNavItem === 'profile' ? '#098C1C' : '#333'} />
        <Text style={[styles.bottomBarText, { color: selectedNavItem === 'profile' ? '#098C1C' : '#333' }]}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  bottomBarText: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default BottomNavbar;
