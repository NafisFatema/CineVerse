import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import FormField from '../../components/FormField';

const COLORS = {
  black: '#141414',
  darkGray: '#1F1F1F',
  red: '#E50914',
  white: '#FFFFFF',
  lightGray: '#B3B3B3',
};

const CINEMA_LOGO = require('../../assets/branding/cinema-logo.png');

export default function ManageCinema() {
  const [name, setName] = useState('Cineverse Multiplex');
  const [phone, setPhone] = useState('01711-123456');
  const [email, setEmail] = useState('info@cineversemultiplex.com');
  const [address, setAddress] = useState('Bashundhara City, Dhaka');
  const [about, setAbout] = useState(
    'Cineverse Multiplex is your ultimate destination for unforgettable movie experiences.'
  );

  const handleChangeLogo = () => {
    Alert.alert('Change Logo', 'Photo upload will be available soon.');
  };

  const handleSave = () => {
    router.push('/manager/manage-movies');
  };

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cinema Information</Text>
        <View style={{ width: 20 }} />
      </View>

      <Text style={styles.label}>Cinema Logo</Text>
      <View style={styles.logoRow}>
        <Image source={CINEMA_LOGO} style={styles.logo} />
        <TouchableOpacity style={styles.changeLogoButton} onPress={handleChangeLogo}>
          <Text style={styles.changeLogoText}>Change Logo</Text>
        </TouchableOpacity>
      </View>

      <FormField label="Cinema Name" value={name} onChangeText={setName} />
      <FormField label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <FormField label="Address" value={address} onChangeText={setAddress} />
      <FormField
        label="About Cinema"
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={4}
        style={{ height: 100, textAlignVertical: 'top' }}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Information</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.black },
  container: { paddingHorizontal: 20, paddingTop: 55, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  back: { color: COLORS.white, fontSize: 26 },
  title: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  label: { color: COLORS.lightGray, fontSize: 13, marginBottom: 8, fontWeight: '600' },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 16 },
  logo: { width: 64, height: 64, borderRadius: 12, backgroundColor: COLORS.darkGray },
  changeLogoButton: { borderWidth: 1, borderColor: COLORS.red, borderRadius: 6, paddingHorizontal: 14, paddingVertical: 9 },
  changeLogoText: { color: COLORS.red, fontSize: 13, fontWeight: '700' },
  saveButton: { backgroundColor: COLORS.red, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
