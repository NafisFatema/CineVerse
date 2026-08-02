import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

const COLORS = {
  darkGray: '#1F1F1F',
  border: '#3A3A3A',
  white: '#FFFFFF',
  lightGray: '#B3B3B3',
};

interface FormFieldProps extends TextInputProps {
  label: string;
}

export default function FormField({ label, style, ...props }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={COLORS.lightGray}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: { color: COLORS.lightGray, fontSize: 13, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.white,
    fontSize: 15,
  },
});
