import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';

const COLORS = {
  black: '#141414',
  darkGray: '#1F1F1F',
  cardGray: '#2A2A2A',
  red: '#E50914',
  white: '#FFFFFF',
  lightGray: '#B3B3B3',
  border: '#3A3A3A',
};

const INITIAL_PRICES = [
  { id: 'regular', label: 'Regular', price: '400' },
  { id: 'student', label: 'Student', price: '350' },
  { id: 'child', label: 'Child (Below 12)', price: '300' },
  { id: 'vip', label: 'VIP', price: '600' },
  { id: 'couple', label: 'Couple', price: '750' },
];

export default function ManagePrices() {
  const [prices, setPrices] = useState(INITIAL_PRICES);

  const updatePrice = (id: string, value: string) => {
    setPrices((prev) => prev.map((p) => (p.id === id ? { ...p, price: value } : p)));
  };

  const handleUpdate = () => {
    router.push('/manager/manage-cinema');
  };

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ticket Prices</Text>
        <View style={{ width: 20 }} />
      </View>

      <Text style={styles.section}>Set Ticket Prices</Text>

      <View style={styles.priceBox}>
        {prices.map((item, index) => (
          <View key={item.id} style={[styles.priceRow, index !== prices.length - 1 && styles.priceRowBorder]}>
            <Text style={styles.priceLabel}>{item.label}</Text>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.currency}>৳</Text>
              <TextInput
                style={styles.priceInput}
                value={item.price}
                onChangeText={(v) => updatePrice(item.id, v)}
                keyboardType="number-pad"
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>ⓘ These prices will be applied to all showtimes unless changed.</Text>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Prices</Text>
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
  section: { color: COLORS.white, fontSize: 15, fontWeight: '700', marginBottom: 14 },
  priceBox: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  priceRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  priceLabel: { color: COLORS.white, fontSize: 14 },
  priceInputWrapper: { flexDirection: 'row', alignItems: 'center' },
  currency: { color: COLORS.lightGray, fontSize: 14, marginRight: 4 },
  priceInput: { color: COLORS.red, fontSize: 15, fontWeight: '700', minWidth: 40, textAlign: 'right' },
  noteBox: { backgroundColor: COLORS.cardGray, borderRadius: 8, padding: 14, marginBottom: 24 },
  noteText: { color: COLORS.lightGray, fontSize: 12, lineHeight: 18 },
  updateButton: { backgroundColor: COLORS.red, borderRadius: 6, paddingVertical: 15, alignItems: 'center' },
  updateButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
