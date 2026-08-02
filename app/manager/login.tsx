import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FormField from '../../components/FormField';

const COLORS = {
  black: '#141414',
  darkGray: '#1F1F1F',
  red: '#E50914',
  white: '#FFFFFF',
  lightGray: '#B3B3B3',
  border: '#3A3A3A',
};

export default function Login() {
  const [email, setEmail] = useState('manager@starcineplex.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // No verification for now - straight to Manage Movies.
    router.replace('/manager/manage-movies');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/branding/cinema-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brand}>CineVerse Manager</Text>
        <Text style={styles.subtitle}>Manager Login</Text>

        <FormField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordWrapper}>
          <FormField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{ paddingRight: 45 }}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((p) => !p)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.lightGray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe((r) => !r)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.black },
  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 60 },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 16,
  },
  brand: { color: COLORS.white, fontSize: 22, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: COLORS.lightGray, fontSize: 14, textAlign: 'center', marginTop: 4, marginBottom: 30 },
  passwordWrapper: { position: 'relative' },
  eyeButton: { position: 'absolute', right: 14, top: 38 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: COLORS.red, borderColor: COLORS.red },
  checkmark: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  rememberText: { color: COLORS.lightGray, fontSize: 13 },
  forgot: { color: COLORS.red, fontSize: 13, fontWeight: '600' },
  loginButton: { backgroundColor: COLORS.red, borderRadius: 8, paddingVertical: 15, alignItems: 'center', marginBottom: 24 },
  loginButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
