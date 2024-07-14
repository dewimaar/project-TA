import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpSupportScreen = () => {
  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.content}>
        Jika Anda membutuhkan bantuan, silakan hubungi kami melalui email atau telepon:
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Icon name="mail-outline" size={20} color="#e74c3c" style={styles.icon} />
          <Text style={styles.tableHeader}>Email:</Text>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.indent}>
            <TouchableOpacity onPress={() => handleEmailPress('33421307.dewi@mhs.polines.ac.id')}>
              <Text style={styles.link}>33421307.dewi@mhs.polines.ac.id</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEmailPress('33421324.vannisa@mhs.polines.ac.id')}>
              <Text style={styles.link}>33421324.vannisa@mhs.polines.ac.id</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tableRow}>
          <Icon name="call-outline" size={20} color="#27ae60" style={styles.icon} />
          <Text style={styles.tableHeader}>Telepon:</Text>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.indent}>
            <TouchableOpacity onPress={() => handlePhonePress('085606990671')}>
              <Text style={styles.link}>085606990671</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePhonePress('082241744023')}>
              <Text style={styles.link}>082241744023</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'justify',
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginLeft: 10,
  },
  link: {
    fontSize: 16,
    color: '#3498db',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  indent: {
    marginLeft: 30,
  },
});

export default HelpSupportScreen;
