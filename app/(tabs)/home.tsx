import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CineVerse</Text>
      <Text style={styles.subtitle}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 18,
    marginTop: 10,
  },
});
