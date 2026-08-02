import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export default function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 14,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  label: {
    color: "#9A9AA8",
    fontSize: 12,
    marginTop: 2,
  },
});
