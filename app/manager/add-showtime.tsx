import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import FormField from '../../components/FormField';

const COLORS = {
  black: '#141414',
  red: '#E50914',
  white: '#FFFFFF',
};

export default function AddShowtime() {
  const [hallNumber, setHallNumber] = useState('');
  const [totalSeats, setTotalSeats] = useState('');

  const handleSetPrice = () => {
    router.push('/manager/manage-prices');
  };

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Showtime</Text>
        <View style={{ width: 20 }} />
      </View>

      <FormField label="Hall Number" placeholder="e.g. Hall 1" value={hallNumber} onChangeText={setHallNumber} />
      <FormField
        label="Total Seats"
        placeholder="e.g. 150"
        value={totalSeats}
        onChangeText={setTotalSeats}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.setPriceButton} onPress={handleSetPrice}>
        <Text style={styles.setPriceButtonText}>Set Price</Text>
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
  setPriceButton: { backgroundColor: COLORS.red, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  setPriceButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
