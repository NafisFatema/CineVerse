import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check Admin Credentials
    if (cleanEmail === "admin@cineverse.com" && password === "admin123") {
      Alert.alert("Success", "Welcome, Admin!");
      router.replace("/admin/admindashboard"); // Navigate to Admin Dashboard
      return;
    }

    /* 2. Check Manager Credentials
    if (cleanEmail === "manager@cineverse.com" && password === "manager123") {
      Alert.alert("Success", "Welcome, Cinema Manager!");
      router.replace("/manager/manage-movies"); // Navigate to Manager Dashboard
      return;
    }

    // 3. Invalid Credentials
    Alert.alert("Login Failed", "Invalid email or password. Please try again.");
  };*/

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "#121212",
    },
    title: {
      fontSize: 28,
      color: "#fff",
      fontWeight: "bold",
      marginBottom: 24,
      textAlign: "center",
    },
    input: {
      backgroundColor: "#1E1E1E",
      color: "#fff",
      padding: 14,
      borderRadius: 8,
      marginBottom: 16,
    },
    button: {
      backgroundColor: "#E50914",
      padding: 14,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  });
}
