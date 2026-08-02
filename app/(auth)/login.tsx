import BackButton from "@/components/backbutton";
import PasswordField from "@/components/passwordfield";
import { useUsers } from "@/context/usercontext";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { findUserByCredentials } = useUsers();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    let valid = true;

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
    } else {
      setPasswordError("");
    }

    return valid;
  }

  function handleLoginPress() {
    setFormError("");
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const matchedUser = findUserByCredentials(email.trim(), password);

      if (!matchedUser) {
        setFormError("Invalid email or password");
        return;
      }

      if (matchedUser.role === "admin") {
        router.replace("/admin/admindashboard");
      } else if (matchedUser.role === "manager") {
        router.replace("./cinema-manager");
      } else {
        router.replace("./registered-user");
      }
    }, 600);
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Sign in to your CineVerse account</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <PasswordField
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        error={passwordError}
      />

      {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null}

      <Pressable style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </Text>
      </Pressable>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don&apos;t have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </View>
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
  subtitle: { fontSize: 14, color: "#BDBDBD", marginTop: 6, marginBottom: 30 },
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
    marginTop: 10,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  signupText: { color: "#BDBDBD", fontSize: 14 },
  signupLink: { color: "#E50914", fontSize: 14, fontWeight: "700" },
});
