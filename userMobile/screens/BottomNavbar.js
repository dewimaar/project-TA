import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavbar = ({ navigation, selectedNavItem, handleNavItemClick }) => {
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
        style={[styles.bottomBarItem, selectedNavItem === 'home' && styles.selectedNavItem]}
        onPress={() => handleNavItemClick('home')}
      >
        <Icon name="home-outline" size={24} color={selectedNavItem === 'home' ? '#0AD127' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottomBarItem, selectedNavItem === 'market' && styles.selectedNavItem]}
        onPress={() => handleNavItemClick('market')}
      >
        <Icon name="storefront-outline" size={24} color={selectedNavItem === 'market' ? '#0AD127' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottomBarItem, selectedNavItem === 'profile' && styles.selectedNavItem]}
        onPress={() => handleNavItemClick('profile')}
      >
        <Icon name="person-outline" size={24} color={selectedNavItem === 'profile' ? '#0AD127' : '#333'} />
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
    paddingBottom: 20, // Ensure bottom padding to prevent overlap with bottom content
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

export default BottomNavbar;
