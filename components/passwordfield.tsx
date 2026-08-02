import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

type PasswordFieldProps = Omit<TextInputProps, "secureTextEntry"> & {
  error?: string;
};

export default function PasswordField({
  error,
  ...inputProps
}: PasswordFieldProps) {
  // Controls whether the password is shown as plain text or dots
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, error ? styles.inputRowError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#777"
          secureTextEntry={!isVisible} // flips based on eye icon state
          {...inputProps}
        />
        <Pressable
          onPress={() => setIsVisible((prev) => !prev)}
          style={styles.eyeButton}
          hitSlop={10}
        >
          <Ionicons
            name={isVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#9A9AA8"
          />
        </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 4 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  inputRowError: {
    borderColor: "#FF6B6B",
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 12,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
});
