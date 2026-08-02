import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ManageCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
};

export default function ManageCard({
  title,
  subtitle,
  icon,
  color,
  onPress,
}: ManageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.iconBox, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#555" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.75,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9A9AA8",
    fontSize: 12,
    marginTop: 2,
  },
});
