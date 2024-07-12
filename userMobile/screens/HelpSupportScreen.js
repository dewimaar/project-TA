import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HelpSupportScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bantuan/Dukungan</Text>
      </View>
      <Text style={styles.content}>
        Jika Anda membutuhkan bantuan, silakan hubungi kami melalui email 33421307.dewi@mhs.polines.ac.id atau telepon di nomor +62 85606 990671.
      </Text>
      <Text style={styles.content}>
        Kami tersedia 24/7 untuk membantu Anda dengan masalah atau pertanyaan apa pun yang Anda miliki.
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

export default HelpSupportScreen;
