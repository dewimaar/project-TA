import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import MainScreen from "./screens/MainScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import MarketScreen from "./screens/MarketScreen";
import CartScreen from "./screens/CartScreen";
import NotificationScreen from "./screens/NotificationScreen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StoreRegistration from "./screens/StoreRegistration";
import AddProductScreen from "./screens/AddProductScreen";
import MyProductsScreen from "./screens/MyProductsScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import ProductDetailHomeScreen from "./screens/ProductDetailHomeScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import TransactionMethodsScreen from "./screens/TransactionMethodsScreen";
import TransactionsPaymentScreen from "./screens/TransactionsPaymentScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";
import AboutAppScreen from "./screens/AboutAppScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import MyOrdersDetailScreen from "./screens/MyOrdersDetailScreen";
import StoreFinanceScreen from "./screens/StoreFinanceScreen";
import ShippingMethodsScreen from "./screens/ShippingMethodsScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerLeft: () => null, title: "Beranda" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerLeft: () => null, title: "Profil Saya" }}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Ubah Profil" }} />
        <Stack.Screen
          name="Market"
          component={MarketScreen}
          options={{ headerLeft: () => null, title: "Toko Saya" }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerLeft: () => null, title: "Keranjang Saya" }}
        />
        {/* <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerLeft: () => null }}
        /> */}
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerLeft: () => null, title: "Notifikasi" }}
        />
        <Stack.Screen name="StoreRegistration" component={StoreRegistration} options={{ title: "Pendaftaran Toko" }} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: "Tambah Produk" }} />
        <Stack.Screen name="MyProducts" component={MyProductsScreen} options={{ title: "Produk Saya" }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Detail Produk Saya" }}/>
        <Stack.Screen
          name="ProductDetailHome"
          component={ProductDetailHomeScreen} options={{ title: "Detail Produk" }}
        />
        <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: "Transaksi Toko Saya" }} />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen} options={{ title: "Detail Transaksi Toko Saya" }}
        />
        <Stack.Screen
          name="TransactionMethods"
          component={TransactionMethodsScreen} options={{ title: "Metode Transaksi Toko Saya" }}
        />
        <Stack.Screen
          name="TransactionsPayment"
          component={TransactionsPaymentScreen} options={{ title: "Checkout" }}
        />
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupportScreen}
          options={{ title: "Bantuan/Dukungan" }}
        />
        <Stack.Screen
          name="AboutApp"
          component={AboutAppScreen}
          options={{ title: "Tentang Aplikasi" }}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrdersScreen}
          options={{ title: "Pesanan Saya" }}
        />
        <Stack.Screen
          name="MyOrdersDetail"
          component={MyOrdersDetailScreen}
          options={{ title: "Detail Pesanan Saya" }}
        />
        <Stack.Screen
          name="StoreFinance"
          component={StoreFinanceScreen}
          options={{ title: "Keuangan Toko Saya" }}
        />
        <Stack.Screen
          name="ShippingMethods"
          component={ShippingMethodsScreen}
          options={{ title: "Metode Pengiriman" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
