import BackButton from "@/components/backbutton";
import PasswordField from "@/components/passwordfield";
import { api } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmError("Passwords do not match");
      valid = false;
    } else {
      setConfirmError("");
    }

    return valid;
  }

  async function handleRegisterPress() {
    setFormError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Real POST to the database — creates an actual row in the users table
      await api.post("/users", {
        name: name.trim(),
        email: email.trim(),
        password,
        role: "registered",
      });

      Alert.alert("Registered", "Your account has been created.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    } catch (err: any) {
      const message =
        err?.response?.data?.error ??
        "Could not reach the server. Is it running?";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join CineVerse as a Registered User</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Full name"
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        accessibilityLabel="Email address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <PasswordField
        placeholder="Create a password"
        value={password}
        onChangeText={setPassword}
        error={passwordError}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <PasswordField
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={confirmError}
      />

      {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}

      <Pressable
        style={styles.button}
        onPress={handleRegisterPress}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityLabel="Register"
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: { fontSize: 26, color: "#FFFFFF", fontWeight: "bold", marginTop: 20 },
  subtitle: { fontSize: 14, color: "#BDBDBD", marginTop: 6, marginBottom: 26 },
  label: { color: "#BDBDBD", fontSize: 14, marginBottom: 6 },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: { color: "#FF6B6B", fontSize: 12, marginBottom: 12 },
  formErrorText: {
    color: "#FF6B6B",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#E50914",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
