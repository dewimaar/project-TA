import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavbar = ({ navigation, selectedNavItem, handleNavItemClick }) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('home')}
      >
        <Icon name="home-outline" size={24} color={selectedNavItem === 'home' ? '#098C1C' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('cart')}
      >
        <Icon name="cart-outline" size={24} color={selectedNavItem === 'cart' ? '#098C1C' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('market')}
      >
        <Icon name="storefront-outline" size={24} color={selectedNavItem === 'market' ? '#098C1C' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('settings')}
      >
        <Icon name="settings-outline" size={24} color={selectedNavItem === 'settings' ? '#098C1C' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomBarItem}
        onPress={() => handleNavItemClick('profile')}
      >
        <Icon name="person-outline" size={24} color={selectedNavItem === 'profile' ? '#098C1C' : '#333'} />
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
    paddingVertical: 8,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

export default BottomNavbar;
