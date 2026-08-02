import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#9A9AA8" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 10,
  },
});
