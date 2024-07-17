// screens/NotificationScreen.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const notifications = [
  { id: '1', title: 'Pesanan Dikirim', description: 'Pesanan Anda #1234 telah dikirim.' },
  { id: '2', title: 'Pesan Baru', description: 'Anda mendapatkan pesan baru dari John.' },
  { id: '3', title: 'Promosi', description: 'Dapatkan diskon 20% untuk pembelian selanjutnya!' },
  // Tambahkan notifikasi lainnya sesuai kebutuhan
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default NotificationScreen;
