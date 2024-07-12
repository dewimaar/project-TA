import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutAppScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tentang Aplikasi</Text>
      </View>
      <Text style={styles.content}>
        Aplikasi ini dibuat untuk membantu pelaku usaha dalam mengelola inventory mereka. Dengan fitur-fitur yang mudah digunakan, Anda dapat dengan cepat menambahkan produk, mengelola stok, dan melacak penjualan Anda.
      </Text>
      <Text style={styles.content}>
        Versi Aplikasi: 1.0.0
      </Text>
      <Text style={styles.content}>
        Didesain dan dikembangkan oleh Dewi Maharani dan Vannisa Ardiani.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 10,
  },
});

export default AboutAppScreen;
