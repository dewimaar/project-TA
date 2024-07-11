import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import MarketScreen from './screens/MarketScreen';
import CartScreen from './screens/CartScreen';
import SettingsScreen from './screens/SettingsScreen'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StoreRegistration from './screens/StoreRegistration';
import AddProductScreen from './screens/AddProductScreen';
import MyProductsScreen from './screens/MyProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductDetailHomeScreen from './screens/ProductDetailHomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import TransactionMethodsScreen from './screens/TransactionMethodsScreen';
import TransactionsPaymentScreen from './screens/TransactionsPaymentScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Market" component={MarketScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="StoreRegistration" component={StoreRegistration} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="MyProducts" component={MyProductsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductDetailHome" component={ProductDetailHomeScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="TransactionMethods" component={TransactionMethodsScreen} />
        <Stack.Screen name="TransactionsPayment" component={TransactionsPaymentScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ title: 'Bantuan/Dukungan' }} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} options={{ title: 'Tentang Aplikasi' }} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: 'Pesanan Saya' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
